import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getLandmarkBySvgId } from '../data/landmarks'
import type { Landmark } from '../types/landmark'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.25

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getLandmark(target: EventTarget) {
  if (!(target instanceof Element)) return undefined
  const svgId = target.closest('[data-landmark-id]')?.getAttribute('data-landmark-id')
  return svgId ? getLandmarkBySvgId(svgId) : undefined
}

function getMarkerLabel(target: EventTarget) {
  if (!(target instanceof Element)) return null
  const marker = target.closest('[data-landmark-id]')
  const landmark = marker ? getLandmark(marker) : undefined
  // Persona groups include invisible, unclipped artwork beyond the visible box.
  const labelAnchor = landmark?.kind === 'persona'
    ? marker?.querySelector(':scope > rect') ?? marker
    : marker
  const markerBounds = labelAnchor?.getBoundingClientRect()
  const mapBounds = marker?.closest('.map-art')?.getBoundingClientRect()
  if (!landmark || !markerBounds || !mapBounds?.width || !mapBounds.height) return null

  return {
    name: landmark.name,
    position: {
      left: `${((markerBounds.left + markerBounds.width / 2 - mapBounds.left) / mapBounds.width) * 100}%`,
      top: `${((markerBounds.top - mapBounds.top) / mapBounds.height) * 100}%`,
    },
  }
}

export function useInteractiveMap() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null)
  const [hoveredMarker, setHoveredMarker] = useState<ReturnType<typeof getMarkerLabel>>(null)
  const [focusedMarker, setFocusedMarker] = useState<ReturnType<typeof getMarkerLabel>>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const suppressClick = useRef(false)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ distance: number; zoom: number; x: number; y: number; panX: number; panY: number } | null>(null)
  const dragState = useRef({
    isDragging: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
  })

  const activeLabel = hoveredMarker ?? focusedMarker

  const viewport = () => mapRef.current?.closest<HTMLDivElement>('.map-viewport')

  const constrainPan = (nextPan: { x: number; y: number }, nextZoom = zoom) => {
    const element = viewport()
    const stage = mapRef.current?.closest<HTMLDivElement>('.map-stage')
    if (!element || !stage) return nextPan
    // Use the rendered artwork size: its sizing axis changes at each breakpoint.
    const scale = nextZoom / zoom
    const limitX = Math.max(0, (stage.offsetWidth * scale - element.clientWidth) / 2)
    const limitY = Math.max(0, (stage.offsetHeight * scale - element.clientHeight) / 2)
    return { x: clamp(nextPan.x, -limitX, limitX), y: clamp(nextPan.y, -limitY, limitY) }
  }

  useEffect(() => {
    const svg = mapRef.current?.querySelector('svg')
    svg?.setAttribute('aria-label', 'Illustrated map of Seaview, North Carolina')
    mapRef.current?.querySelectorAll('[data-landmark-id]').forEach((element) => {
      const landmark = getLandmarkBySvgId(element.getAttribute('data-landmark-id') ?? '')
      if (!landmark) return

      element.setAttribute('role', 'button')
      element.setAttribute('tabindex', '0')
      element.setAttribute('aria-label', `Show details for ${landmark.name}`)
      element.setAttribute('aria-pressed', String(landmark.id === selectedLandmark?.id))
    })
  }, [selectedLandmark])

  const setZoomLevel = (nextZoom: number, anchor = { x: 0, y: 0 }) => {
    const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
    setZoom(clampedZoom)
    const scale = clampedZoom / zoom
    setPan(constrainPan({
      x: anchor.x - (anchor.x - pan.x) * scale,
      y: anchor.y - (anchor.y - pan.y) * scale,
    }, clampedZoom))
  }

  const zoomBy = (amount: number) => {
    setZoomLevel(Math.round((zoom + amount) * 100) / 100)
  }

  // A native listener must be non-passive to prevent browser scrolling/pinch zoom.
  useEffect(() => {
    const element = viewport()
    if (!element) return
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const horizontalDelta = event.deltaX || (event.shiftKey ? event.deltaY : 0)
      if (window.matchMedia('(max-width: 920px)').matches && horizontalDelta !== 0 && !event.ctrlKey && !event.metaKey) {
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1
        setPan((current) => constrainPan({ x: current.x - horizontalDelta * unit, y: current.y }))
        return
      }
      const rect = element.getBoundingClientRect()
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1)
      setZoomLevel(zoom * Math.exp(-delta * 0.002), {
        x: event.clientX - rect.left - element.clientWidth / 2,
        y: event.clientY - rect.top - element.clientHeight / 2,
      })
    }
    element.addEventListener('wheel', handleWheel, { passive: false })
    const observer = new ResizeObserver(() => setPan((current) => {
      const next = constrainPan(current)
      return next.x === current.x && next.y === current.y ? current : next
    }))
    observer.observe(element)
    return () => {
      element.removeEventListener('wheel', handleWheel)
      observer.disconnect()
    }
  })

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || pointers.current.size >= 2) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    suppressClick.current = false
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const rect = event.currentTarget.getBoundingClientRect()
      pinch.current = {
        distance: Math.max(1, Math.hypot(b.x - a.x, b.y - a.y)), zoom,
        x: (a.x + b.x) / 2 - rect.left - event.currentTarget.clientWidth / 2,
        y: (a.y + b.y) / 2 - rect.top - event.currentTarget.clientHeight / 2,
        panX: pan.x, panY: pan.y,
      }
      suppressClick.current = true
      for (const id of pointers.current.keys()) event.currentTarget.setPointerCapture(id)
      return
    }
    dragState.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const initial = pinch.current
      const nextZoom = clamp(initial.zoom * Math.hypot(b.x - a.x, b.y - a.y) / initial.distance, MIN_ZOOM, MAX_ZOOM)
      const rect = event.currentTarget.getBoundingClientRect()
      const scale = nextZoom / initial.zoom
      setZoom(nextZoom)
      setPan(constrainPan({
        x: (a.x + b.x) / 2 - rect.left - event.currentTarget.clientWidth / 2 - (initial.x - initial.panX) * scale,
        y: (a.y + b.y) / 2 - rect.top - event.currentTarget.clientHeight / 2 - (initial.y - initial.panY) * scale,
      }, nextZoom))
      return
    }
    const drag = dragState.current

    if (!drag.isDragging || drag.pointerId !== event.pointerId) {
      return
    }

    if (!suppressClick.current && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 5) return
    suppressClick.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    setHoveredMarker(null)
    setPan(constrainPan({
      x: drag.panX + event.clientX - drag.startX,
      y: drag.panY + event.clientY - drag.startY,
    }))
  }

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId)
    pinch.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    const remaining = [...pointers.current.entries()][0]
    if (remaining) {
      dragState.current = { isDragging: true, pointerId: remaining[0], startX: remaining[1].x, startY: remaining[1].y, panX: pan.x, panY: pan.y }
      return
    }
    if (dragState.current.pointerId === event.pointerId) {
      dragState.current.isDragging = false
    }
  }

  const selectLandmarkWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const landmark = getLandmark(event.target)
    if (landmark && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      setSelectedLandmark(landmark)
    }
  }

  return {
    selectedLandmark,
    zoom,
    pan,
    isDraggable: true,
    activeLabel,
    mapRef,
    zoomIn: () => zoomBy(ZOOM_STEP),
    zoomOut: () => zoomBy(-ZOOM_STEP),
    resetZoom: () => { setZoom(MIN_ZOOM); setPan({ x: 0, y: 0 }) },
    viewportHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: stopDragging,
      onPointerCancel: stopDragging,
      onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) stopDragging(event)
      },
      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) return
        const step = 60
        const offsets: Record<string, { x: number; y: number }> = {
          ArrowLeft: { x: step, y: 0 }, ArrowRight: { x: -step, y: 0 },
          ArrowUp: { x: 0, y: step }, ArrowDown: { x: 0, y: -step },
        }
        const offset = offsets[event.key]
        if (offset) {
          event.preventDefault()
          setPan(constrainPan({ x: pan.x + offset.x, y: pan.y + offset.y }))
        }
      },
    },
    markerHandlers: {
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
        if (suppressClick.current && event.detail !== 0) return
        const landmark = getLandmark(event.target)
        if (landmark) setSelectedLandmark(landmark)
      },
      onKeyDown: selectLandmarkWithKeyboard,
      onPointerOver: (event: PointerEvent<HTMLDivElement>) => {
        setHoveredMarker(getMarkerLabel(event.target))
      },
      onPointerLeave: () => setHoveredMarker(null),
      onFocus: (event: React.FocusEvent<HTMLDivElement>) => {
        setFocusedMarker(getMarkerLabel(event.target))
      },
      onBlur: () => setFocusedMarker(null),
    },
  }
}

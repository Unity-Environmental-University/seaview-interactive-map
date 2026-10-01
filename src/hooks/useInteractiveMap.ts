import {
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getInitialLandmark, getLandmarkBySvgId } from '../data/landmarks'

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
  const [selectedLandmark, setSelectedLandmark] = useState(getInitialLandmark)
  const [hoveredMarker, setHoveredMarker] = useState<ReturnType<typeof getMarkerLabel>>(null)
  const [focusedMarker, setFocusedMarker] = useState<ReturnType<typeof getMarkerLabel>>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragState = useRef({
    isDragging: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
  })

  const activeLabel = hoveredMarker ?? focusedMarker

  useEffect(() => {
    const svg = mapRef.current?.querySelector('svg')
    svg?.setAttribute('aria-label', 'Illustrated map of Seaview, North Carolina')
    mapRef.current?.querySelectorAll('[data-landmark-id]').forEach((element) => {
      const landmark = getLandmarkBySvgId(element.getAttribute('data-landmark-id') ?? '')
      if (!landmark) return

      element.setAttribute('role', 'button')
      element.setAttribute('tabindex', '0')
      element.setAttribute('aria-label', `Show details for ${landmark.name}`)
      element.setAttribute('aria-pressed', String(landmark.id === selectedLandmark.id))
    })
  }, [selectedLandmark])

  const setZoomLevel = (nextZoom: number) => {
    const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)

    setZoom(clampedZoom)

    if (clampedZoom === MIN_ZOOM) {
      setPan({ x: 0, y: 0 })
    }
  }

  const zoomBy = (amount: number) => {
    setZoomLevel(Math.round((zoom + amount) * 100) / 100)
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    zoomBy(event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom === MIN_ZOOM) {
      return
    }

    if ((event.target as Element).closest('button, [data-landmark-id]')) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
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
    const drag = dragState.current

    if (!drag.isDragging || drag.pointerId !== event.pointerId) {
      return
    }

    setPan({
      x: drag.panX + event.clientX - drag.startX,
      y: drag.panY + event.clientY - drag.startY,
    })
  }

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
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
    isDraggable: zoom > MIN_ZOOM,
    activeLabel,
    mapRef,
    zoomIn: () => zoomBy(ZOOM_STEP),
    zoomOut: () => zoomBy(-ZOOM_STEP),
    resetZoom: () => setZoomLevel(MIN_ZOOM),
    viewportHandlers: {
      onWheel: handleWheel,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: stopDragging,
      onPointerCancel: stopDragging,
    },
    markerHandlers: {
      onClick: (event: React.MouseEvent<HTMLDivElement>) => {
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

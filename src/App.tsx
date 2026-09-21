import {
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import seaviewMap from './assets/Seaview Map Layers.svg?raw'
import './App.css'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.25

type Landmark = {
  id: string
  name: string
  description: string
  icon: string | null
  svgId: string
}

const landmarks: Landmark[] = [
  {
    id: 'hog-farm',
    name: 'Hog Farm',
    description:
      'A working farm area on the northwest side of Seaview, surrounded by open rural land.',
    icon: null,
    svgId: 'Hog Farm Marker',
  },
  {
    id: 'hardwood-forest',
    name: 'Hardwood Forest',
    description:
      'A large wooded tract that creates a natural edge between rural and residential areas.',
    icon: null,
    svgId: 'Forest Marker',
  },
  {
    id: 'rural-housing',
    name: 'Rural Housing',
    description:
      'A small residential pocket set away from downtown and the waterfront.',
    icon: null,
    svgId: 'Rural Housing Marker',
  },
  {
    id: 'abandoned-tobacco-farmland',
    name: 'Abandoned Tobacco Farmland',
    description:
      'Former agricultural land that now sits as an open inland parcel.',
    icon: null,
    svgId: 'Abandoned Tabacco Farmland Marker',
  },
  {
    id: 'municipal-landfill',
    name: 'Municipal Landfill',
    description:
      'The municipal landfill site located in the northern inland part of Seaview.',
    icon: null,
    svgId: 'Municipal Landfill Marker',
  },
  {
    id: 'aucummato-river',
    name: 'Aucummato River',
    description:
      'The river corridor running through the inland side of the Seaview map.',
    icon: null,
    svgId: 'River Marker',
  },
  {
    id: 'downtown',
    name: 'Downtown',
    description:
      'The town center, close to the restaurant district, public services, and waterfront access.',
    icon: null,
    svgId: 'Downtown Marker',
  },
  {
    id: 'beach-rd-baptist-church',
    name: 'Beach Rd. Baptist Church',
    description:
      'A church landmark along Beach Road near the coastline and beach access areas.',
    icon: null,
    svgId: 'Baptist Church Marker',
  },
  {
    id: 'wastewater-treatment-facility',
    name: 'Wastewater Treatment Facility',
    description:
      'A public utility facility serving wastewater treatment needs near the eastern side of town.',
    icon: null,
    svgId: 'Treatment Plant Marker',
  },
  {
    id: 'seaview-coastline',
    name: 'Seaview Coastline & Beaches',
    description:
      'The broad beach and coastline area that defines Seaview’s waterfront.',
    icon: null,
    svgId: 'Coastline and Beaches',
  },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

// This is a trusted, bundled SVG asset, not user-provided markup.
const mapMarkup = { __html: seaviewMap }
const landmarksBySvgId = new Map(landmarks.map((landmark) => [landmark.svgId, landmark]))

function getLandmark(target: EventTarget) {
  if (!(target instanceof Element)) return undefined
  const svgId = target.closest('[data-landmark-id]')?.getAttribute('data-landmark-id')
  return svgId ? landmarksBySvgId.get(svgId) : undefined
}

function getMarkerLabel(target: EventTarget) {
  if (!(target instanceof Element)) return null
  const marker = target.closest('[data-landmark-id]')
  const landmark = marker ? getLandmark(marker) : undefined
  const markerBounds = marker?.getBoundingClientRect()
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

function App() {
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0])
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
      const landmark = landmarksBySvgId.get(element.getAttribute('data-landmark-id') ?? '')
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

  return (
    <main className="map-page">
      <section className="map-shell" aria-labelledby="map-title">
        <header className="map-header">
          <div>
            <p className="eyebrow">Interactive Map</p>
            <h1 id="map-title">Seaview, North Carolina</h1>
          </div>
          <div className="zoom-controls" aria-label="Map zoom controls">
            <button
              type="button"
              onClick={() => zoomBy(-ZOOM_STEP)}
              aria-label="Zoom out"
            >
              -
            </button>
            <output aria-label="Current zoom">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              onClick={() => zoomBy(ZOOM_STEP)}
              aria-label="Zoom in"
            >
              +
            </button>
            <button type="button" onClick={() => setZoomLevel(1)}>
              Reset
            </button>
          </div>
        </header>

        <div className="map-layout">
          <div
            className={zoom > MIN_ZOOM ? 'map-viewport is-draggable' : 'map-viewport'}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <div
              className="map-stage"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              <div
                ref={mapRef}
                className="map-art"
                onClick={(event) => {
                  const landmark = getLandmark(event.target)
                  if (landmark) setSelectedLandmark(landmark)
                }}
                onKeyDown={selectLandmarkWithKeyboard}
                onPointerOver={(event) => {
                  setHoveredMarker(getMarkerLabel(event.target))
                }}
                onPointerLeave={() => setHoveredMarker(null)}
                onFocus={(event) => {
                  setFocusedMarker(getMarkerLabel(event.target))
                }}
                onBlur={() => setFocusedMarker(null)}
                dangerouslySetInnerHTML={mapMarkup}
              />
              {activeLabel && (
                <div className="landmark-label" style={activeLabel.position} aria-hidden="true">
                  {activeLabel.name}
                </div>
              )}
            </div>
          </div>

          <aside className="landmark-panel" aria-live="polite">
            <p className="panel-label">Selected Landmark</p>
            <h2 className="landmark-title">
              {selectedLandmark.icon ? (
                <img src={selectedLandmark.icon} alt="" aria-hidden="true" />
              ) : null}
              <span>{selectedLandmark.name}</span>
            </h2>
            <p>{selectedLandmark.description}</p>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App

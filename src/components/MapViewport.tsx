import type { CSSProperties, HTMLAttributes, Ref } from 'react'

type MapViewportProps = {
  zoom: number
  pan: { x: number; y: number }
  isDraggable: boolean
  activeLabel: { name: string; position: CSSProperties } | null
  mapRef: Ref<HTMLDivElement>
  mapMarkup: { __html: string }
  viewportHandlers: Pick<HTMLAttributes<HTMLDivElement>,
    'onPointerDown' | 'onPointerMove' | 'onPointerUp' | 'onPointerCancel' | 'onPointerLeave' | 'onKeyDown'>
  markerHandlers: Pick<HTMLAttributes<HTMLDivElement>,
    'onClick' | 'onKeyDown' | 'onPointerOver' | 'onPointerLeave' | 'onFocus' | 'onBlur'>
}

export function MapViewport({
  zoom, pan, isDraggable, activeLabel, mapRef, mapMarkup,
  viewportHandlers, markerHandlers,
}: MapViewportProps) {
  return (
    <div className="map-frame">
      <div
        className={isDraggable ? 'map-viewport is-draggable' : 'map-viewport'}
        role="region"
        aria-label="Seaview map. Drag or use arrow keys to pan. Scroll or pinch to zoom."
        tabIndex={0}
        style={{ '--map-zoom': zoom } as CSSProperties}
        {...viewportHandlers}
      >
        <div
          className="map-stage"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
          <div
            ref={mapRef}
            className="map-art"
            {...markerHandlers}
            dangerouslySetInnerHTML={mapMarkup}
          />
          {activeLabel && (
            <div className="landmark-label" style={activeLabel.position} aria-hidden="true">
              {activeLabel.name}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

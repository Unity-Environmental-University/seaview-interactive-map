import type { CSSProperties, HTMLAttributes, Ref } from 'react'

type MapViewportProps = {
  zoom: number
  pan: { x: number; y: number }
  isDraggable: boolean
  activeLabel: { name: string; position: CSSProperties } | null
  mapRef: Ref<HTMLDivElement>
  mapMarkup: { __html: string }
  viewportHandlers: Pick<HTMLAttributes<HTMLDivElement>,
    'onWheel' | 'onPointerDown' | 'onPointerMove' | 'onPointerUp' | 'onPointerCancel'>
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
        {...viewportHandlers}
      >
        <div
          className="map-stage"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
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

type ZoomControlsProps = {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="zoom-controls" aria-label="Map zoom controls">
      <button type="button" onClick={onZoomOut} aria-label="Zoom out">-</button>
      <output aria-label="Current zoom">{Math.round(zoom * 100)}%</output>
      <button type="button" onClick={onZoomIn} aria-label="Zoom in">+</button>
      <button type="button" onClick={onReset}>Reset</button>
    </div>
  )
}

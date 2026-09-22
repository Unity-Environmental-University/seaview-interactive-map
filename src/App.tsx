import { LandmarkPanel } from './components/LandmarkPanel'
import { MapViewport } from './components/MapViewport'
import { ZoomControls } from './components/ZoomControls'
import { mapMarkup } from './data/map'
import { useInteractiveMap } from './hooks/useInteractiveMap'
import './App.css'

function App() {
  const map = useInteractiveMap()

  return (
    <main className="map-page">
      <section className="map-shell" aria-labelledby="map-title">
        <header className="map-header">
          <div>
            <p className="eyebrow">Interactive Map</p>
            <h1 id="map-title">Seaview, North Carolina</h1>
          </div>
          <ZoomControls
            zoom={map.zoom}
            onZoomIn={map.zoomIn}
            onZoomOut={map.zoomOut}
            onReset={map.resetZoom}
          />
        </header>
        <div className="map-layout">
          <MapViewport
            zoom={map.zoom}
            pan={map.pan}
            isDraggable={map.isDraggable}
            activeLabel={map.activeLabel}
            mapRef={map.mapRef}
            mapMarkup={mapMarkup}
            viewportHandlers={map.viewportHandlers}
            markerHandlers={map.markerHandlers}
          />
          <LandmarkPanel landmark={map.selectedLandmark} />
        </div>
      </section>
    </main>
  )
}

export default App

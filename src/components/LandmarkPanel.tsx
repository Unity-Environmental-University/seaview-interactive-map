import type { Landmark } from '../types/landmark'

type LandmarkPanelProps = {
  landmark: Landmark
}

export function LandmarkPanel({ landmark }: LandmarkPanelProps) {
  return (
    <aside className="landmark-panel" aria-live="polite">
      <p className="panel-label">Selected Landmark</p>
      <div key={landmark.id} className="landmark-content">
        <h2 className="landmark-title">
          {landmark.icon ? (
            <img src={landmark.icon} alt="" aria-hidden="true" />
          ) : null}
          <span>{landmark.name}</span>
        </h2>
        <p>{landmark.description}</p>
      </div>
    </aside>
  )
}

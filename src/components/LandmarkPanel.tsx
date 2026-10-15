import type { Landmark } from '../types/landmark'

type LandmarkPanelProps = {
  landmark: Landmark | null
}

export function LandmarkPanel({ landmark }: LandmarkPanelProps) {
  if (!landmark) {
    return (
      <aside className="landmark-panel" aria-live="polite">
        <p className='landmark-selection-placeholder'>Select a landmark to learn about the places and people of Seaview.</p>
      </aside>
    )
  }

  return (
    <aside className="landmark-panel" aria-live="polite">
      <p className="panel-label">
        {landmark.kind === 'persona' ? 'Selected Persona' : 'Selected Landmark'}
      </p>
      <div
        key={landmark.id}
        className="landmark-content"
        role="region"
        aria-label={`${landmark.name} details`}
        tabIndex={0}
      >
        {landmark.kind === 'persona' && landmark.personaIcon ? (
          <img
            className="persona-portrait"
            src={landmark.personaIcon}
            alt={`${landmark.name} persona illustration`}
          />
        ) : null}
        <h2 className="landmark-title">
          <span>{landmark.name}</span>
          {landmark.image ? (
            <img src={landmark.image} alt="" aria-hidden="true" />
          ) : null}
        </h2>
        <div className="landmark-description">
          {landmark.description
            .trim()
            .split(/\r?\n\s*\r?\n/)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </aside>
  )
}

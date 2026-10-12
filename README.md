# Seaview Interactive Map

An interactive, illustrated map of Seaview, North Carolina, built for the EVPC490 project at Unity Environmental University. The app lets users explore local landmarks and fictional community personas to understand how environmental issues, land use, infrastructure, tourism, and community needs intersect.

## Features

- Explore 10 landmarks, including the hog farm, hardwood forest, Aucummato River, downtown, wastewater treatment facility, and coastline.
- Meet nine community personas through illustrated portraits and biographies.
- Select map markers to display descriptions and available images in a details panel.
- Use zoom controls, desktop mouse-wheel zoom, and drag to pan when zoomed in; reset to return to the initial view.
- Navigate markers with the keyboard and select them with Enter or Space. Marker labels appear on hover or focus.

## Technology

The app uses React 19, TypeScript, and Vite, with an SVG map and CSS. Map content and images are bundled with the app; no backend service is required.

## Local development

Install Node.js 20.19+ or 22.12+ and npm, then run these commands from the repository root:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite in your browser.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally after building. |
| `npm run lint` | Check the code with ESLint. |

## Project structure

- `src/App.tsx`: assembles the map, zoom controls, and details panel.
- `src/components/`: map viewport, landmark panel, and zoom controls.
- `src/hooks/useInteractiveMap.ts`: marker selection, labels, keyboard interaction, zoom, and panning.
- `src/data/landmarks.ts`: landmark definitions and their SVG marker IDs.
- `src/data/landmark-descriptions.ts`: descriptive text for each landmark.
- `src/data/personas.ts`: persona biographies and portrait associations.
- `src/data/map.ts`: loads the bundled SVG map.
- `src/assets/`: map artwork, persona portraits, and landmark imagery.


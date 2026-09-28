import type { Landmark } from '../types/landmark'
import { personas } from './personas'

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

const landmarksBySvgId = new Map(
  [...landmarks, ...personas].map((landmark) => [landmark.svgId, landmark]),
)

export function getInitialLandmark(): Landmark {
  return landmarks[0]
}

export function getLandmarkBySvgId(svgId: string): Landmark | undefined {
  return landmarksBySvgId.get(svgId)
}

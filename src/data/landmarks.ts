import type { Landmark } from '../types/landmark'
import { personas } from './personas'
import { hogFarmDesc, hardwoodForestDesc, ruralHousingDesc, abandonedTobaccoDesc, municipalLandfillDesc, aucummatoRiverDesc, downtownDesc, baptistChurchDesc, wastewaterTreatmentDesc, seaviewCoastlineDesc } from './landmark-descriptions'

const landmarks: Landmark[] = [
  {
    id: 'hog-farm',
    name: 'Hog Farm',
    description: hogFarmDesc,
    image: null,
    svgId: 'Hog Farm Marker',
  },
  {
    id: 'hardwood-forest',
    name: 'Hardwood Forest',
    description: hardwoodForestDesc,
    image: null,
    svgId: 'Forest Marker',
  },
  {
    id: 'rural-housing',
    name: 'Rural Housing',
    description: ruralHousingDesc,
    image: null,
    svgId: 'Rural Housing Marker',
  },
  {
    id: 'abandoned-tobacco-farmland',
    name: 'Abandoned Tobacco Farmland',
    description: abandonedTobaccoDesc,
    image: null,
    svgId: 'Abandoned Tabacco Farmland Marker',
  },
  {
    id: 'municipal-landfill',
    name: 'Municipal Landfill',
    description: municipalLandfillDesc,
    image: null,
    svgId: 'Municipal Landfill Marker',
  },
  {
    id: 'aucummato-river',
    name: 'Aucummato River',
    description: aucummatoRiverDesc,
    image: null,
    svgId: 'River Marker',
  },
  {
    id: 'downtown',
    name: 'Downtown',
    description: downtownDesc,
    image: null,
    svgId: 'Downtown Marker',
  },
  {
    id: 'beach-rd-baptist-church',
    name: 'Beach Rd. Baptist Church',
    description: baptistChurchDesc,
    image: null,
    svgId: 'Baptist Church Marker',
  },
  {
    id: 'wastewater-treatment-facility',
    name: 'Wastewater Treatment Facility',
    description: wastewaterTreatmentDesc,
    image: null,
    svgId: 'Treatment Plant Marker',
  },
  {
    id: 'seaview-coastline',
    name: 'Seaview Coastline & Beaches',
    description: seaviewCoastlineDesc,
    image: null,
    svgId: 'Coastline and Beaches',
  },
]

const landmarksBySvgId = new Map(
  [...landmarks, ...personas].map((landmark) => [landmark.svgId, landmark]),
)

export function getLandmarkBySvgId(svgId: string): Landmark | undefined {
  return landmarksBySvgId.get(svgId)
}

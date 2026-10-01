import type { Landmark } from '../types/landmark'
import { personas } from './personas'

const landmarks: Landmark[] = [
  {
    id: 'hog-farm',
    name: 'Hog Farm',
    description:
      'Hog farming is an important agricultural activity that takes place in the more rural inland areas to the west of the city. Hog farms often use lagoons and spray field methods for waste disposal, producing significant quantities of manure, which can overflow and contaminate water sources, including tributaries of the Aucummato River, which is the source of public water for Seaview and many surrounding towns. The hog farms are an economically and culturally important industry for Seaview. Additionally, many locals and tourists enjoy fresh pork products at a very reasonable price. The annual Pork BBQ Festival is a popular event for residents and attracts a lot of tourists at the end of the summer. Not all residents are keen on hog farming though, especially as the hog farms are concentrated animal feeding operations (CAFOs; large-scale animal feeding operations in a small area that often struggle to find a balance between animal welfare and profits). The odors and hazardous chemicals emitted from hog farms often cause respiratory issues and health problems among residents who live near the farms. These farms are also concentrated geographically in poor and minority communities, many of whom lack the political and economic power to demand safer regulations. However, hog farming employs many residents, providing wages that are higher than most other employment opportunities in the Seaview area.',
    icon: null,
    svgId: 'Hog Farm Marker',
  },
  {
    id: 'hardwood-forest',
    name: 'Hardwood Forest',
    description:
      'AThe entire protected area is a 1100-acre (1.7 mi2) plot of land, which was recently purchased by a land trust with the goal of providing recreational experiences for residents and visitors while also supporting sustainable development initiatives. Approximately 60% of the plot is forested with a mixed hardwood forest composition that provides a home to a variety of native flora and fauna.',
    icon: null,
    svgId: 'Forest Marker',
  },
  {
    id: 'rural-housing',
    name: 'Rural Housing',
    description:
      'Seaview has rural housing in both the eastern and western parts of town. These areas are generally occupied by lower income residents of Seaview and have fewer amenities close by such as grocery stories, making them food deserts. While there is a strong sense of community in these less densely populated areas of Seaview, there is also a sense that they are not top priority for the town.',
    icon: null,
    svgId: 'Rural Housing Marker',
  },
  {
    id: 'abandoned-tobacco-farmland',
    name: 'Abandoned Tobacco Farmland',
    description:
      'The remaining 40% of the protected area is currently abandoned farmlands. Driven by the 2004 federal buyout program, conventional large-scale tobacco farming ceased on these lands several years ago, in part because degraded soil and water scarcity made alternative crops unprofitable. One point to consider is that tobacco farming has historically been the work of enslaved African Americans. The land trust is concerned that this part of the protected area will not feel like an accessible space to residents and visitors who are members of BIPOC groups. The land trust is open to hearing a variety of development proposals for this plot of land that help Seaview promote sustainability and address local needs.',
    icon: null,
    svgId: 'Abandoned Tabacco Farmland Marker',
  },
  {
    id: 'municipal-landfill',
    name: 'Municipal Landfill',
    description:
      'The landfill is located only a few miles outside of Seaview to the west of the Aucummato River and north of Abbie’s hog farm. Town residents are concerned about potential contamination of the groundwater and river from the municipal landfill.',
    icon: null,
    svgId: 'Municipal Landfill Marker',
  },
  {
    id: 'aucummato-river',
    name: 'Aucummato River',
    description:
      'The Aucummato River and its tributaries are the source of public water for Seaview and many surrounding towns. Aucummato means "I remember" in the Woccon language, which was spoken by the Siouan Peoples of coastal NC. There are many threats to the quality of the water including runoff from the hog farm, waste from restaurants and hotels, and contamination from the landfill. ',
    icon: null,
    svgId: 'River Marker',
  },
  {
    id: 'downtown',
    name: 'Downtown',
    description:
      'Seaview occupies 29.3 square miles. The population of Seaview has grown in the last decade from 16,025 to over 22,000, outpacing the national average, in part because of the beauty and relative affordability of the area. Annually, Seaview sees 250,000 tourists. Their high season for tourism is from April through November. Due to its scenic location and affordability, Seaview is experiencing rapid population growth and development. This has resulted in the built environment (e.g., homes, roads, infrastructure) encroaching into natural areas both onshore and offshore. Wetlands, dunes, and other critical habitats are being replaced by buildings and roads, disrupting local wildlife and reducing the natural resilience of the coastline to environmental changes.',
    icon: null,
    svgId: 'Downtown Marker',
  },
  {
    id: 'beach-rd-baptist-church',
    name: 'Beach Rd. Baptist Church',
    description:
      'Walter is the pastor at this church, which is located in a rapidly gentrifying neighborhood of Seaview. The church is located in an historically Black neighborhood and the residents are not thrilled by the new condominium development that took out the local little league field. New development in Seaview has focused almost exclusively on tourism development and construction of luxury private residences, a point of tension with residents, like those in the Beach Road neighborhood who would like to see more development aimed at meeting the needs of the working and middle classes.',
    icon: null,
    svgId: 'Baptist Church Marker',
  },
  {
    id: 'wastewater-treatment-facility',
    name: 'Wastewater Treatment Facility',
    description:
      'The wastewater treatment facility is located on the shore of the Aucummato River near the municipal park. Updating the water and waste management systems is a priority for the Public Works Department where Ren works. Due to human resource and funding limitations, the Department of Public Works is unable to focus on updating the water and waste management systems, even though they feel it’s only a matter of time before there is a public health crisis. A  few years ago, Ren had to deal with a storm that breached the hog waste lagoons at the nearby farm, causing hog waste to spill into the river and be carried downstream. This contaminated local drinking water. The waste water facility treatment plant was overloaded. In an attempt to prevent total shutdown of the facility, partially treated effluent was released into the ocean. Several people became ill with cryptosporidiosis and the deaths of juvenile wildlife increased after the incident. Additionally, the shoreline was closed for several days and commercial operations (like fishing and tourism) were forced to suspend services. ',
    icon: null,
    svgId: 'Treatment Plant Marker',
  },
  {
    id: 'seaview-coastline',
    name: 'Seaview Coastline & Beaches',
    description:
      `Seaview has approximately 2.1 miles of coastline and a high level of marine diversity, making it a hotspot for fishing. Overfishing has now become a significant issue, depleting fish stocks and disrupting the marine ecosystem. This not only threatens the livelihood of local fishermen but also impacts the food chain and the overall health of the ocean. Climate change is impacting the marine food web as marine species shift north to escape rising ocean temperatures. Rising sea levels and increased storm frequency and intensity threaten the town's infrastructure (including roads, homes, and businesses) and natural habitats close to the shoreline. Coastal erosion, driven by higher sea levels and stronger storms, is already affecting the shoreline, leading to the loss of beaches and wetlands that serve as crucial buffers against storm surges.`,
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

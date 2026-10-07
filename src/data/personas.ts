import type { Landmark } from '../types/landmark'
import abbyPortrait from '../assets/Seaview_AIPs-Abby.svg'
import nevaehPortrait from '../assets/Seaview_AIPs-Nevaeh.svg'
import meeraPortrait from '../assets/Seaview_AIPs-Meera.svg'
import renPortrait from '../assets/Seaview_AIPs-Ren.svg'
import micahPortrait from '../assets/Seaview_AIPs-Micah.svg'
import walterPortrait from '../assets/Seaview_AIPs-Walter.svg'
import sullyPortrait from '../assets/Seaview_AIPs-Sully.svg'
import elenaPortrait from '../assets/Seaview_AIPs-Elena.svg'
import leePortrait from '../assets/Seaview_AIPs-Lee.svg'

// Fictional draft biographies; replace with the final persona text when available.
const biographies = [
  {
    name: 'Abby',
    description:
      'Abby, a college-educated white woman, recently inherited her family’s hog farm and is determined to transition from a CAFO model to a more sustainable, ethical approach. Balancing her environmental goals and animal welfare concerns with the need to remain profitable, she wants to change her business model by focusing on local sales and diversifying products, but isn’t quite sure how to. Abbie has a professional relationship with Micah, who also has a farming background, but she is wary of Sully, who has publicly criticized hog farming.',
    personaIcon: abbyPortrait,
  },
  {
    name: 'Nevaeh',
    description:
      'Nevaeh, a 32-year-old Black woman, owns Ocean Shore Landscaping in Seaview. While her business currently focuses on traditional landscaping, she is passionate about integrating more eco-friendly and regenerative practices, such as native plants and sustainable methods. Nevaeh works with Elena at the Tidewater Inn, providing landscaping services to the hotel. She aims to serve a diverse clientele through a sliding scale model, ensuring affordable, environmentally conscious services for all community members. Nevaeh hopes to build a future where Seaview’s natural spaces thrive alongside its human population.',
    personaIcon: nevaehPortrait,
  },
  {
    name: 'Meera',
    description:
      'Meera, a lead veterinarian at Seaview Veterinary Clinic, has over 20 years of experience working with animals. She sees many of the IAPs’ pets (dogs and cats primarily) as patients. She is board certified in animal behavior and has a deep commitment to improving animal welfare, both for wildlife and domestic animals. Meera is particularly concerned with the welfare of captive animals, including livestock and hogs, and believes in the importance of behavioral enrichment to reduce stress and promote healthy interactions. She has not been consulted on behavioral or welfare considerations for the hog farm. Meera’s ideal world is one where animals and humans coexist sustainably, with proper care and well-being for all species.',
    personaIcon: meeraPortrait,
  },
  {
    name: 'Ren',
    description:
      'Ren, a first-generation American and Public Works Engineer in Seaview, is dedicated to addressing the town’s growing infrastructure needs. His primary focus is improving water and waste management systems to avoid public health crises and environmental degradation. Ren is deeply concerned about the impacts of climate change on infrastructure, especially as urban sprawl and income inequality put pressure on affordable housing and sensitive natural areas along the coast. These areas serve as crucial buffers against rising sea levels, storm surges, and flooding, highlighting the need for sustainable development that balances growth with environmental preservation. He is aware of and curious about green infrastructure and how it can mimic environmental processes to provide ecosystem services to humans.',
    personaIcon: renPortrait,
  },
  {
    name: 'Micah',
    description:
      'Micah is a farmland development consultant hired on a five year contract by the land conservation that operates the protected area. He will oversee the redevelopment of the abandoned tobacco farmland and has experience in large-scale agricultural operations. His primary focus is on restoring the health of the soil in order to grow food on the land; he is open to cultivating food through both forestry and agricultural methods, and is not opposed to integrating livestock. Having experienced food insecurity himself, Micah is deeply passionate about improving access to nutritious, fresh food—especially in the food desert regions of Seaview’s outlying areas.',
    personaIcon: micahPortrait,
  },
  {
    name: 'Walter',
    description:
      'Walter, a 63-year-old pastor of Beach Road Baptist Church in Seaview, lives with his wife Maya, the Director of Food Services for the Seaview School District. Together, they advocate for equitable access to nutritious food and community resources. Walter’s aging congregation faces challenges like gentrification and rising costs. He’d like to see more emphasis put on higher paying jobs and incentives for Black owned businesses. An avid bird watcher, he observes climate change’s impacts, including declining bird populations. He champions intergenerational connections, green spaces, and equitable access to a new protected area.',
    personaIcon: walterPortrait,
  },
  {
    name: 'Sully',
    description:
      'Sully, a 50-year-old business owner in Seaview, runs Seaview Marine Tours, offering guided wildlife and scenic tours along the coast. Facing challenges of seasonality, Sully struggles with a decline in income during the fall and winter, relying on seasonal labor that lacks the necessary guiding and interpretive skills. Climate change and extreme weather events pose risks, including shoreline flooding that came close to damaging his business. Sully supports hog farming for its cultural and economic impact but is frustrated by hog waste runoff affecting his tours. He is open to collaboration with other tourism businesses, including Elena’s new hotel and restaurant, to diversify offerings and address these challenges. He’s not sure how to get involved in the fishing industry (but would like to) and has heard rumblings about aquaculture getting started in Seaview.',
    personaIcon: sullyPortrait,
  },
  {
    name: 'Elena',
    description:
      'Elena, new to Seaview, recently purchased the Tidewater Inn, a small occupancy franchised hotel she aims to transform into a boutique hotel with regenerative practices. While confident in hotel operations, she struggles with limited networking opportunities and feels some resistance from locals. Additionally, Elena is Latina and wonders if some of the aloofness to her presence is related to being a person of color. She doesn’t fully understand hog farming’s cultural importance to the area and is herself a vegetarian. She mostly views hog farming as a blight to Seaview. The hotel’s restaurant is currently closed because she needs a partner with expertise for this venture, but she is eager to create a sustainable and unique dining experience. She seeks partnerships and sustainable ventures that align with her vision of a cleaner, more attractive Seaview for tourists.',
    personaIcon: elenaPortrait,
  },
  {
    name: 'Lee',
    description:
      'Lee, hired as the head of interpretation at the visitor center in the protected area, is committed to creating an inclusive, accessible space that reflects the diverse history and community of Seaview. As a botanist with deep family roots in the area, Lee aims to highlight local heritage, including the history of slavery and the impacts of tobacco farming. They are focused on protecting endangered plants like the pondberry, ensuring visitors respect wildlife habitats, and learning how to communicate the importance of restoration work to visitors. Lee’s most pressing challenge is planning the landscaping around the visitor center to ensure it is ecologically sustainable, visually appealing, and educational. They also seek to attract BIPOC, LGBTQIA+, and differently abled visitors, ensuring the protected area is welcoming and accessible for all.',
    personaIcon: leePortrait,
  },
]

export const personas: Landmark[] = biographies.map(({ name, description, personaIcon }) => ({
  id: name,
  name,
  description,
  icon: null,
  personaIcon,
  svgId: name,
  kind: 'persona',
}))

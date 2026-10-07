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
      'Nevaeh is a student who spends free time exploring Seaview’s beaches and documenting local wildlife. Nevaeh organizes beach cleanups with friends and wants young people to have a voice in the town’s future.',
    personaIcon: nevaehPortrait,
  },
  {
    name: 'Meera',
    description:
      'Meera is a community volunteer who helps neighbors connect with local resources. Through conversations across Seaview, Meera has developed an interest in how clean water and healthy surroundings shape daily life.',
    personaIcon: meeraPortrait,
  },
  {
    name: 'Ren',
    description:
      'Ren is an artist inspired by Seaview’s wooded trails and waterfront. Ren brings neighbors together through creative projects that celebrate the places and stories they share.',
    personaIcon: renPortrait,
  },
  {
    name: 'Micah',
    description:
      'Micah enjoys repairing bicycles and helping neighbors get around Seaview. Micah would like to see safer routes connecting homes, schools, and the town center.',
    personaIcon: micahPortrait,
  },
  {
    name: 'Walter',
    description:
      'Walter is a longtime Seaview resident who remembers how the town’s farms and neighborhoods have changed. Walter enjoys sharing local history and listening to ideas about preserving the places that matter to residents.',
    personaIcon: walterPortrait,
  },
  {
    name: 'Sully',
    description:
      'Sully spends much of the week fishing and talking with neighbors along the waterfront. Sully cares about the health of Seaview’s river and coast and the livelihoods that depend on them.',
    personaIcon: sullyPortrait,
  },
  {
    name: 'Elena',
    description:
      'Elena runs a small business in Seaview and enjoys getting to know the people who stop by. Elena helps organize neighborhood events and wants downtown to remain a welcoming gathering place.',
    personaIcon: elenaPortrait,
  },
  {
    name: 'Lee',
    description:
      'Lee is an outdoor enthusiast who volunteers to maintain local walking trails. Lee enjoys introducing neighbors to Seaview’s natural spaces and encouraging their care for future generations.',
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

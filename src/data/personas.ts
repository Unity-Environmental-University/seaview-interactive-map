import type { Landmark } from '../types/landmark'

// Fictional draft biographies; replace with the final persona text when available.
const biographies = [
  {
    name: 'ABBY',
    description:
      'Abby is a Seaview resident who enjoys gardening and sharing homegrown food with neighbors. Abby hopes to help more families find space to grow fresh produce.',
  },
  {
    name: 'NEVAEH',
    description:
      'Nevaeh is a student who spends free time exploring Seaview’s beaches and documenting local wildlife. Nevaeh organizes beach cleanups with friends and wants young people to have a voice in the town’s future.',
  },
  {
    name: 'MEERA',
    description:
      'Meera is a community volunteer who helps neighbors connect with local resources. Through conversations across Seaview, Meera has developed an interest in how clean water and healthy surroundings shape daily life.',
  },
  {
    name: 'REN',
    description:
      'Ren is an artist inspired by Seaview’s wooded trails and waterfront. Ren brings neighbors together through creative projects that celebrate the places and stories they share.',
  },
  {
    name: 'MICAH',
    description:
      'Micah enjoys repairing bicycles and helping neighbors get around Seaview. Micah would like to see safer routes connecting homes, schools, and the town center.',
  },
  {
    name: 'WALTER',
    description:
      'Walter is a longtime Seaview resident who remembers how the town’s farms and neighborhoods have changed. Walter enjoys sharing local history and listening to ideas about preserving the places that matter to residents.',
  },
  {
    name: 'SULLY',
    description:
      'Sully spends much of the week fishing and talking with neighbors along the waterfront. Sully cares about the health of Seaview’s river and coast and the livelihoods that depend on them.',
  },
  {
    name: 'ELENA',
    description:
      'Elena runs a small business in Seaview and enjoys getting to know the people who stop by. Elena helps organize neighborhood events and wants downtown to remain a welcoming gathering place.',
  },
  {
    name: 'LEE',
    description:
      'Lee is an outdoor enthusiast who volunteers to maintain local walking trails. Lee enjoys introducing neighbors to Seaview’s natural spaces and encouraging their care for future generations.',
  },
]

export const personas: Landmark[] = biographies.map(({ name, description }) => ({
  id: name.toLowerCase(),
  name,
  description,
  icon: null,
  svgId: name,
  kind: 'persona',
}))

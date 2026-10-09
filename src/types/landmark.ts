export type Landmark = {
  id: string
  name: string
  description: string
  image: string | null
  personaIcon?: string | null
  svgId: string
  kind?: 'landmark' | 'persona'
}

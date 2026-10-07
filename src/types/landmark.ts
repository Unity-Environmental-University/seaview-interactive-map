export type Landmark = {
  id: string
  name: string
  description: string
  icon: string | null
  personaIcon?: string | null
  svgId: string
  kind?: 'landmark' | 'persona'
}

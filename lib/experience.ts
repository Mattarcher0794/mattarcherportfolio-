export interface ExperienceEntry {
  date: string
  role: string
  company: string
  projects: string[]
  /** Muted, single-line projects render with the `.empty` treatment */
  projectsMuted?: boolean
  current?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    date: 'Sept 2023 — Present',
    role: 'Principal Product Manager',
    company: 'AND Digital · London',
    projects: ['Lloyds Banking Group', 'Internal AI product-dev programme'],
    current: true,
  },
  {
    date: 'June 2018 — Aug 2023',
    role: 'Product Manager',
    company: 'AND Digital · London',
    projects: ['Wagamama', 'HCA Healthcare', 'Subway · British Airways · Thomas Cook'],
  },
  {
    date: 'July 2017 — June 2018',
    role: 'Product Owner',
    company: 'Meganexus · London',
    projects: ['— MoJ rehabilitation platform —'],
    projectsMuted: true,
  },
  {
    date: 'Aug 2016 — July 2017',
    role: 'Agile Business Analyst',
    company: 'Sopra Steria · London',
    projects: ['— Public sector delivery —'],
    projectsMuted: true,
  },
]

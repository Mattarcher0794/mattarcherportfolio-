export interface OutcomeStat {
  value: string
  label: string
}

export interface CaseStudy {
  slug: string
  company: string
  projectName: string
  logoPath: string
  tagline: string
  description: string
  stats: [OutcomeStat, OutcomeStat, OutcomeStat]
  tags: string[]
  challenge: string
  approach: string
  whatWeBuilt: string
  outcomes: string
  learnings: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'wagamama-soul-club',
    company: 'Wagamama',
    projectName: 'Soul Club',
    logoPath: '/logos/wagamama.svg',
    tagline: 'Building a loyalty programme that became a #1 app in a week.',
    description:
      'I led product and design for the launch of Wagamama Soul Club — a loyalty app and programme built from scratch. It became the #1 Food & Drink app on iOS in its first week and set a new benchmark for restaurant loyalty in the UK.',
    stats: [
      { value: '81k', label: 'signups in week one' },
      { value: '#1', label: 'iOS Food & Drink app' },
      { value: '£9M', label: 'projected annual revenue' },
    ],
    tags: ['Consumer', 'Loyalty', 'Mobile', 'iOS', 'Restaurant'],
    challenge:
      "Wagamama had no loyalty programme and a fragmented digital presence. The brief was to build one — fast. The challenge wasn't just the product, it was building a cross-functional capability while navigating the pressures of a hospitality business recovering post-COVID.",
    approach:
      'I started by understanding what loyalty meant to Wagamama customers — and it wasn\'t points. It was belonging. That insight shaped everything: the name "Soul Club", the onboarding experience, the reward mechanics. I ran rapid discovery sessions across customer segments, benchmarked against best-in-class programmes globally, and built a cross-functional team from scratch including engineering, design, CRM, and brand.',
    whatWeBuilt:
      'A native iOS and Android app with real-time reward tracking, personalised offers, and seamless POS integration across 130+ restaurants. A CRM infrastructure enabling personalised comms at scale. The app design felt distinctive — nothing like a typical loyalty app — using Wagamama\'s brand language in a digital context for the first time.',
    outcomes:
      '81,000 signups in the first seven days. #1 Food & Drink app on the iOS App Store. £9M projected annual revenue contribution from loyalty-driven incremental visits. The programme became a strategic asset and a proof point for digital investment across the wider group.',
    learnings:
      "Launching a loyalty programme is a cross-company transformation, not a product release. The hardest parts were internal — aligning ops, finance, and brand on what 'loyalty' means strategically. I'd do the stakeholder alignment work earlier and more explicitly if I were doing it again.",
  },
  {
    slug: 'hca-healthcare',
    company: 'HCA Healthcare',
    projectName: 'Patient Digital Experience',
    logoPath: '/logos/hca-healthcare.svg',
    tagline: 'Turning a 3.2-star experience into a 5-star one. In six months.',
    description:
      'HCA Healthcare UK had a broken patient digital journey — a 3.2-star app, confused booking flows, and no coherent product strategy. I joined as Principal PM to fix it. Six months later, the app was rated 5 stars and the business had unlocked £4–7M in new revenue.',
    stats: [
      { value: '3.2→5★', label: 'app store rating' },
      { value: '£4–7M', label: 'revenue unlocked' },
      { value: '6mo', label: 'delivery timeline' },
    ],
    tags: ['Healthcare', 'Mobile', 'B2C', 'UX Turnaround', 'Enterprise'],
    challenge:
      "HCA Healthcare UK runs 15 private hospitals and serves tens of thousands of patients annually. The digital experience was an afterthought — a legacy app with poor ratings and a booking journey that caused real patient frustration. The brief was broad: fix digital. The constraint was time and an organisation not built for product velocity.",
    approach:
      "I ran a rapid audit of the patient journey end to end — from search to discharge — and identified the highest-friction points. I built a prioritised backlog from patient feedback, NPS drivers, and revenue impact modelling. Then I worked with engineering to establish a delivery cadence the team hadn't had before, while managing upward to give the exec visibility without micromanagement.",
    whatWeBuilt:
      'A rebuilt appointment booking flow reducing drop-off by 40%. A new patient portal with test results, documents, and communication history in one place. Improved pre-admission and post-care digital touchpoints. A product roadmap the business could plan against for the first time.',
    outcomes:
      'App rating improved from 3.2 to 5 stars within six months. £4–7M in revenue unlocked through improved digital conversion and reduced admin overhead. The digital team grew in confidence and capability. The work became the blueprint for HCA\'s digital transformation strategy.',
    learnings:
      "Healthcare moves slower than consumer product, but the standards are higher — patients are anxious, not just impatient. That changes everything about how you prioritise. I learned to weight emotional friction alongside functional friction in the patient journey.",
  },
  {
    slug: 'subway',
    company: 'Subway',
    projectName: 'Digital Platform & Team Build',
    logoPath: '/logos/subway.svg',
    tagline:
      'Building the digital function — and the platform — for 1,800 UK stores.',
    description:
      'I was hired to build Subway UK\'s digital capability from the ground up — a 20+ person function, a new technology platform, and a 30% uplift in digital conversion. It was part product leadership, part organisational design.',
    stats: [
      { value: '30%', label: 'conversion uplift' },
      { value: '1,800', label: 'stores impacted' },
      { value: '20+', label: 'person team built' },
    ],
    tags: ['QSR', 'E-commerce', 'Team Building', 'Digital Transformation', 'Enterprise'],
    challenge:
      "Subway UK had no meaningful digital capability — no product team, no CX strategy, and a legacy ordering platform that was losing customers to competitors. I was brought in to build something that didn't exist: a product function, a technology roadmap, and a path to digital-first growth across 1,800 franchise locations.",
    approach:
      "I started with people. You can't build a platform without a team. I hired product managers, designers, and engineers over the first quarter while simultaneously defining the product strategy with the leadership team. The platform work ran in parallel — assessing the current stack, running an RFP for a new ordering platform, and establishing the architecture principles that would govern decisions for years.",
    whatWeBuilt:
      "A new digital ordering platform integrated with Subway's POS systems across all UK franchise locations. A loyalty and CRM infrastructure enabling personalised campaigns. A product team of 20+ people with clear ownership, roadmaps, and ways of working. Subway UK's first mobile app with strong conversion metrics from day one.",
    outcomes:
      '30% improvement in digital conversion within the first year. 1,800 stores on a new platform with significantly improved reliability. A 20+ person digital function that didn\'t exist two years prior. Subway UK positioned as a digital leader within the global Subway organisation.',
    learnings:
      "Building a digital function inside a franchise business is uniquely complex — you're not just serving customers, you're serving franchisees who have their own P&Ls and risk tolerances. The product strategy has to account for that second customer layer explicitly.",
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

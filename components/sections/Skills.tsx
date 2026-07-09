interface SkillColumn {
  heading: string
  skills: Array<{ label: string; ai?: boolean }>
}

const columns: SkillColumn[] = [
  {
    heading: 'Product craft',
    skills: [
      { label: 'Discovery & user research' },
      { label: 'Roadmapping' },
      { label: 'Experimentation & CRO' },
      { label: 'Agile delivery' },
      { label: 'Go-to-market' },
      { label: 'Stakeholder management' },
      { label: 'Coaching & mentoring' },
    ],
  },
  {
    heading: 'AI & methods',
    skills: [
      { label: 'GenAI product development', ai: true },
      { label: 'Spec-driven development' },
      { label: 'AI-assisted workflows' },
    ],
  },
  {
    heading: 'Industry',
    skills: [
      { label: 'Financial services' },
      { label: 'Retail & loyalty' },
      { label: 'Healthtech' },
      { label: 'QSR' },
      { label: 'Public sector' },
      { label: 'B2C & B2B' },
    ],
  },
]

export default function Skills() {
  return (
    <section className="section" id="skills" aria-label="Skills and expertise">
      <div className="wrap">
        <div className="section-num">[ 03 ] Skills &amp; Expertise</div>
        <h2 className="skills-h">
          What I do, and <em>where.</em>
        </h2>
        <div className="skills-grid">
          {columns.map((col) => (
            <div className="skill-col" key={col.heading}>
              <h4>{col.heading}</h4>
              <div className="skill-row">
                {col.skills.map((skill) => (
                  <span key={skill.label} className={skill.ai ? 'ai' : undefined}>
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

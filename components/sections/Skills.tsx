import { getSkills } from '@/lib/siteData'

export default async function Skills() {
  const columns = await getSkills()
  return (
    <section className="section" id="skills" aria-label="Skills and expertise">
      <div className="wrap">
        <div className="section-num">
          <span className="sn-num">03</span> Skills &amp; expertise
        </div>
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

import { Fragment } from 'react'
import { getExperience } from '@/lib/experience'

export default async function Timeline() {
  const experience = await getExperience()
  return (
    <section className="section" id="experience" aria-label="Experience">
      <div className="wrap">
        <div className="section-num">
          <span className="sn-num">04</span> Experience{' '}
          <span className="sn-sub">· nine years</span>
        </div>
        <h2 className="timeline-h">
          From analyst to <em>platform lead.</em>
        </h2>
        <div className="tl">
          <span className="tl-spine" aria-hidden="true" />
          <span className="tl-fill" aria-hidden="true" />
          {experience.map((entry) => {
            const [start, end] = entry.date.split(' – ')
            return (
              <div
                className={`tl-row${entry.current ? ' current' : ''}`}
                key={`${entry.role}-${entry.date}`}
              >
                <span className="tl-node" aria-hidden="true" />
                <div className="tl-date">
                  {start}
                  <br />– {end}
                </div>
                <div>
                  <h3 className="tl-role">{entry.role}</h3>
                  <div className="tl-company">{entry.company}</div>
                </div>
                <div className="tl-projects">
                  {entry.projects.map((project) => (
                    <Fragment key={project}>
                      <span className={entry.projectsMuted ? 'empty' : undefined}>
                        {project}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

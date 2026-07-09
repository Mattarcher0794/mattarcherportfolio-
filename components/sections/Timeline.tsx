import { Fragment } from 'react'
import { experience } from '@/lib/experience'

export default function Timeline() {
  return (
    <section className="section" id="experience" aria-label="Experience">
      <div className="wrap">
        <div className="section-num">[ 04 ] Experience · Nine years</div>
        <h2 className="timeline-h">
          From analyst to <em>platform lead.</em>
        </h2>
        <div className="tl">
          {experience.map((entry) => {
            const [start, end] = entry.date.split(' — ')
            return (
              <div
                className={`tl-row${entry.current ? ' current' : ''}`}
                key={`${entry.role}-${entry.date}`}
              >
                <div className="tl-date">
                  {start}
                  <br />— {end}
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

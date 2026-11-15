import { useEffect, useState } from 'react'
import { Routes, Route, Link, NavLink, useLocation, useParams } from 'react-router-dom'
import './casino.css'
import {
  profile,
  projects,
  experience,
  leadership,
  awards,
  education,
  skills,
  about,
  skillFilters,
  getProject,
  getNeighbors,
  filterProjects,
} from '../../content/portfolio'
import { usePage, useThemeClass, useSkillFilter, usePrefersReducedMotion, Ext } from '../shared'

const BASE = '/casino'

const SUITS = {
  spades: { glyph: '♠︎', label: 'Research', red: false },
  diamonds: { glyph: '♦︎', label: 'Data analysis', red: true },
  hearts: { glyph: '♥︎', label: 'LLM apps', red: true },
  clubs: { glyph: '♣︎', label: 'Teaching builds', red: false },
}

const NAV = [
  { to: BASE, label: 'Home', end: true },
  { to: `${BASE}/projects`, label: 'Projects' },
  { to: `${BASE}/experience`, label: 'Experience' },
  { to: `${BASE}/about`, label: 'About & Skills' },
  { to: `${BASE}/contact`, label: 'Contact' },
]

function CardIndex({ card, corner }) {
  const suit = SUITS[card.suit]
  return (
    <span className={`pc-index${corner === 'br' ? ' pc-index--br' : ''}`} aria-hidden="true">
      <b>{card.rank}</b>
      <i>{suit.glyph}</i>
    </span>
  )
}

function PlayingCard({ project, mini = false, className = '', style }) {
  const suit = SUITS[project.card.suit]
  return (
    <Link
      to={`${BASE}/projects/${project.slug}`}
      className={`pc${suit.red ? ' pc--red' : ''}${mini ? ' pc--mini' : ''} ${className}`}
      style={style}
    >
      <CardIndex card={project.card} />
      {!mini && (
        <span className={`pc-art pc-art--${project.imageKind}`}>
          <img src={project.image} alt="" loading="lazy" />
        </span>
      )}
      <span className="pc-body">
        <span className="pc-kind">{project.kind}</span>
        <span className="pc-title">{project.title}</span>
        {!mini && <span className="pc-sub">{project.subtitle}</span>}
        {project.award && <span className="pc-award">{project.award}</span>}
      </span>
      <CardIndex card={project.card} corner="br" />
    </Link>
  )
}

function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="cs">
      <a className="cs-skip" href="#main">
        Skip to content
      </a>
      <header className="cs-header">
        <div className="cs-wrap cs-header-row">
          <Link to={BASE} className="cs-brand">
            <span className="cs-brand-mark" aria-hidden="true">
              S<i>{SUITS.spades.glyph}</i>
            </span>
            <span>
              {profile.name}
              <small>AI/ML and software engineering</small>
            </span>
          </Link>
          <button
            type="button"
            className="cs-menu-btn"
            aria-expanded={open}
            aria-controls="cs-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span> Menu
          </button>
          <nav id="cs-nav" className={`cs-nav${open ? ' is-open' : ''}`} aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
            <a className="cs-nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
              Resume <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} key={pathname} className="cs-main">
        {children}
      </main>

      <footer className="cs-footer">
        <div className="cs-wrap cs-footer-row">
          <p>
            <strong>{profile.name}</strong>
            <br />
            Seeking {profile.seeking}.
          </p>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
            <li>
              <Ext href={profile.linkedin}>LinkedIn</Ext>
            </li>
            <li>
              <Ext href={profile.github}>GitHub</Ext>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div className="cs-compare">
          <div className="cs-wrap">
            Design preview A: Casino. <Link to="/diner">Open preview B: Diner</Link>
            <Link to="/preview">Compare both</Link>
            <a href="/">Original site</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ---------- Home ---------- */

function DealTable() {
  const reduced = usePrefersReducedMotion()
  const [dealt, setDealt] = useState(null)
  const [count, setCount] = useState(0)

  const deal = () => {
    const pool = projects.filter((p) => p.slug !== dealt?.slug)
    setDealt(pool[Math.floor(Math.random() * pool.length)])
    setCount((c) => c + 1)
  }

  return (
    <section className="cs-deal" aria-labelledby="deal-h">
      <div className="cs-deal-copy">
        <p className="cs-eyebrow">Optional</p>
        <h2 id="deal-h">Let the dealer pick</h2>
        <p>
          Short on time? Deal one project at random. Every project is also listed in full on the{' '}
          <Link to={`${BASE}/projects`}>Projects page</Link>.
        </p>
        <button type="button" className="cs-btn cs-btn--gold" onClick={deal}>
          {dealt ? 'Deal another' : 'Deal a project'}
        </button>
        <p className="sr-only" aria-live="polite">
          {dealt ? `Dealt: ${dealt.title}. ${dealt.summary}` : ''}
        </p>
      </div>

      <div className="cs-deal-table">
        <div className="cs-deck" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="cs-deal-slot">
          {dealt ? (
            <div key={count} className={`cs-dealt${reduced ? '' : ' is-animated'}`}>
              <PlayingCard project={dealt} />
              <div className="cs-dealt-info">
                <p>{dealt.summary}</p>
                <Link className="cs-textlink" to={`${BASE}/projects/${dealt.slug}`}>
                  Read the {dealt.title} case study
                </Link>
              </div>
            </div>
          ) : (
            <p className="cs-deal-empty">The card you draw lands here.</p>
          )}
        </div>
      </div>
    </section>
  )
}

function Home() {
  usePage(null)
  const hand = projects.slice(0, 3)
  return (
    <>
      <section className="cs-felt cs-hero">
        <div className="cs-hero-copy">
          <p className="cs-eyebrow">Seeking {profile.seeking}</p>
          <h1>{profile.name}</h1>
          <p className="cs-hero-role">{profile.role}</p>
          <p className="cs-hero-intro">{profile.intro}</p>
          <div className="cs-actions">
            <Link className="cs-btn cs-btn--gold" to={`${BASE}/projects`}>
              View projects
            </Link>
            <a className="cs-btn" href={profile.resume} target="_blank" rel="noreferrer">
              Resume (PDF)
            </a>
            <Link className="cs-btn cs-btn--ghost" to={`${BASE}/contact`}>
              Contact
            </Link>
          </div>
        </div>
        <div className="cs-fan" aria-label="Top three projects">
          {hand.map((p, i) => (
            <PlayingCard key={p.slug} project={p} mini className={`cs-fan-card cs-fan-card--${i}`} />
          ))}
        </div>
      </section>

      <section className="cs-section" aria-labelledby="record-h">
        <h2 id="record-h" className="cs-h2">
          The strongest hand
        </h2>
        <ol className="cs-record">
          <li>
            <span className="cs-record-num">5.9% → 14.0%</span>
            <p>{profile.highlights[0]}</p>
            <Link className="cs-textlink" to={`${BASE}/projects/ascend`}>
              ASCEND case study
            </Link>
          </li>
          <li>
            <span className="cs-record-num">30+ students</span>
            <p>{profile.highlights[1]}</p>
            <Link className="cs-textlink" to={`${BASE}/experience`}>
              Experience
            </Link>
          </li>
          <li>
            <span className="cs-record-num">4 awards</span>
            <p>{profile.highlights[2]}</p>
            <Link className="cs-textlink" to={`${BASE}/projects`}>
              All projects
            </Link>
          </li>
        </ol>
      </section>

      <DealTable />

      <section className="cs-section" aria-labelledby="deck-h">
        <h2 id="deck-h" className="cs-h2">
          The full deck
        </h2>
        <ul className="cs-list">
          {projects.map((p) => {
            const suit = SUITS[p.card.suit]
            return (
              <li key={p.slug}>
                <Link to={`${BASE}/projects/${p.slug}`}>
                  <span className={`cs-list-index${suit.red ? ' is-red' : ''}`} aria-hidden="true">
                    {p.card.rank}
                    {suit.glyph}
                  </span>
                  <span className="cs-list-title">{p.title}</span>
                  <span className="cs-list-kind">{p.kind}</span>
                  <span className="cs-list-award">{p.award || p.org}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

/* ---------- Projects ---------- */

function Chip({ label, pressed, onClick }) {
  return (
    <button type="button" className="cs-chip" aria-pressed={pressed} onClick={onClick}>
      <span className="cs-chip-disc" aria-hidden="true" />
      {label}
    </button>
  )
}

function Projects() {
  usePage('Projects')
  const { selected, toggle, clear } = useSkillFilter()
  const shown = filterProjects(selected)
  return (
    <>
      <header className="cs-pagehead">
        <p className="cs-eyebrow">Projects</p>
        <h1>The deck</h1>
        <p>
          Six projects: research, data analysis, and full-stack apps. Each card opens a full case study. The suit shows
          the kind of work.
        </p>
        <ul className="cs-legend" aria-label="What each suit means">
          {Object.entries(SUITS).map(([key, s]) => (
            <li key={key}>
              <span className={s.red ? 'is-red' : ''} aria-hidden="true">
                {s.glyph}
              </span>{' '}
              {s.label}
            </li>
          ))}
        </ul>
      </header>

      <section className="cs-felt cs-filter" aria-labelledby="filter-h">
        <h2 id="filter-h">Place a chip to filter by skill</h2>
        <div className="cs-chips">
          {skillFilters.map((s) => (
            <Chip key={s} label={s} pressed={selected.includes(s)} onClick={() => toggle(s)} />
          ))}
          {selected.length > 0 && (
            <button type="button" className="cs-clear" onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
        <p className="cs-filter-status" aria-live="polite">
          {selected.length === 0
            ? `Showing all ${projects.length} projects.`
            : `${shown.length} of ${projects.length} projects use ${selected.join(' + ')}.`}
        </p>
      </section>

      {shown.length > 0 ? (
        <ul className="cs-grid">
          {shown.map((p, i) => (
            <li key={p.slug} style={{ '--i': i }}>
              <PlayingCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="cs-empty">
          No single project uses all of those skills together. Remove a chip or{' '}
          <button type="button" className="cs-inline-btn" onClick={clear}>
            clear the filters
          </button>
          .
        </p>
      )}
    </>
  )
}

/* ---------- Case study ---------- */

function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  usePage(project ? project.title : 'Project not found')
  if (!project) return <NotFound />
  const suit = SUITS[project.card.suit]
  const { prev, next } = getNeighbors(slug)

  return (
    <article className="cs-case">
      <Link className="cs-back" to={`${BASE}/projects`}>
        ← All projects
      </Link>

      <header className={`cs-case-head${suit.red ? ' is-red' : ''}`}>
        <div className="cs-case-index" aria-hidden="true">
          <b>{project.card.rank}</b>
          <i>{suit.glyph}</i>
        </div>
        <div>
          <p className="cs-case-kind">
            {project.kind} · {project.org}
          </p>
          <h1>{project.title}</h1>
          <p className="cs-case-sub">{project.subtitle}</p>
          {project.award && <p className="cs-case-award">{project.award}</p>}
          {(project.links.demo || project.links.repo) && (
            <div className="cs-actions">
              {project.links.demo && (
                <Ext className="cs-btn cs-btn--dark" href={project.links.demo}>
                  Live demo
                </Ext>
              )}
              {project.links.repo && (
                <Ext className="cs-btn cs-btn--dark-ghost" href={project.links.repo}>
                  Code on GitHub
                </Ext>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="cs-case-grid">
        <div className="cs-case-body">
          <figure className={`cs-case-figure cs-case-figure--${project.imageKind}`}>
            <img src={project.image} alt={project.imageAlt} />
          </figure>

          <section>
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>What I built</h2>
            <ul className="cs-suitlist">
              {project.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
          {project.contribution && (
            <section>
              <h2>My part</h2>
              <p>{project.contribution}</p>
            </section>
          )}
          <section>
            <h2>Outcome</h2>
            <ul className="cs-suitlist">
              {project.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          {project.limitations && (
            <section>
              <h2>Limits</h2>
              <p>{project.limitations}</p>
            </section>
          )}
        </div>

        <aside className="cs-case-side" aria-label="Project summary">
          <div className="cs-pot">
            <span>{project.headline.value}</span>
            <p>{project.headline.label}</p>
          </div>
          <dl className="cs-facts">
            {project.date && (
              <>
                <dt>Timeline</dt>
                <dd>{project.date}</dd>
              </>
            )}
            {project.role && (
              <>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </>
            )}
            <dt>Built with</dt>
            <dd>
              <ul className="cs-stack">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
            <dt>Skills</dt>
            <dd>
              <ul className="cs-stack cs-stack--links">
                {project.tags.map((t) => (
                  <li key={t}>
                    <Link to={`${BASE}/projects?skill=${encodeURIComponent(t)}`}>{t}</Link>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </aside>
      </div>

      <nav className="cs-case-nav" aria-label="More projects">
        <Link to={`${BASE}/projects/${prev.slug}`}>
          <small>← Previous card</small>
          {prev.title}
        </Link>
        <Link to={`${BASE}/projects/${next.slug}`}>
          <small>Next card →</small>
          {next.title}
        </Link>
      </nav>
    </article>
  )
}

/* ---------- Experience ---------- */

function Experience() {
  usePage('Experience and Leadership')
  return (
    <>
      <header className="cs-pagehead">
        <p className="cs-eyebrow">Experience and leadership</p>
        <h1>At the table</h1>
        <p>Research, teaching, and the teams I have led.</p>
      </header>

      <section className="cs-section" aria-labelledby="exp-h">
        <h2 id="exp-h" className="cs-h2">
          Experience
        </h2>
        {experience.map((job) => (
          <article key={job.id} className="cs-job">
            <div className="cs-job-meta">
              <p className="cs-job-date">{job.date}</p>
              <img src={job.image} alt={job.imageAlt} loading="lazy" />
            </div>
            <div>
              <h3>{job.title}</h3>
              <p className="cs-job-org">{job.org}</p>
              <p>{job.summary}</p>
              <ul className="cs-suitlist">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              {job.note && <p className="cs-job-note">{job.note}</p>}
              <Link className="cs-textlink" to={`${BASE}/projects/${job.projectSlug}`}>
                Read the {getProject(job.projectSlug).title} case study
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="cs-section" aria-labelledby="lead-h">
        <h2 id="lead-h" className="cs-h2">
          Leadership
        </h2>
        <div className="cs-two">
          {leadership.map((role) => (
            <article key={role.id} className="cs-placard">
              <p className="cs-job-date">{role.date}</p>
              <h3>
                {role.title}, {role.org}
              </h3>
              <p>{role.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cs-felt cs-awards" aria-labelledby="awards-h">
        <h2 id="awards-h">Hackathon awards</h2>
        <ul>
          {awards.map((a) => (
            <li key={a.event}>
              <span className="cs-award-chip" aria-hidden="true" />
              <div>
                <strong>{a.place}</strong>, {a.event}
                {a.date ? ` (${a.date})` : ''}
                <br />
                <Link to={`${BASE}/projects/${a.slug}`}>{a.project}</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="cs-section" aria-labelledby="edu-h">
        <h2 id="edu-h" className="cs-h2">
          Education
        </h2>
        <article className="cs-placard">
          <p className="cs-job-date">{education.date}</p>
          <h3>
            {education.degree}, {education.school}
          </h3>
          <p>{education.details.join(' · ')}</p>
          <p>Coursework: {education.coursework.join(', ')}</p>
        </article>
      </section>
    </>
  )
}

/* ---------- About ---------- */

function About() {
  usePage('About and Skills')
  return (
    <>
      <header className="cs-pagehead">
        <p className="cs-eyebrow">About and skills</p>
        <h1>The player</h1>
      </header>

      <section className="cs-about">
        <div className="cs-about-text">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            <Link className="cs-textlink" to={`${BASE}/contact`}>
              Get in touch
            </Link>
          </p>
        </div>
        <div className="cs-photos">
          {about.photos.map((ph) => (
            <figure key={ph.alt}>
              <img src={ph.image} alt={ph.alt} loading="lazy" />
              <figcaption>
                {ph.caption}{' '}
                {ph.href && (
                  <Ext className="cs-textlink" href={ph.href}>
                    {ph.linkLabel}
                  </Ext>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cs-felt cs-skills" aria-labelledby="skills-h">
        <h2 id="skills-h">Skills</h2>
        <div className="cs-skill-racks">
          {skills.map((g) => (
            <div key={g.group}>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h3 className="cs-skills-sub">See a skill in use</h3>
        <div className="cs-chips">
          {skillFilters.map((s) => (
            <Link key={s} className="cs-chip" to={`${BASE}/projects?skill=${encodeURIComponent(s)}`}>
              <span className="cs-chip-disc" aria-hidden="true" />
              {s} projects
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- Contact ---------- */

function Contact() {
  usePage('Contact')
  return (
    <>
      <header className="cs-pagehead">
        <p className="cs-eyebrow">Contact</p>
        <h1>Deal me in</h1>
        <p>
          I am looking for {profile.seeking}. Based in {profile.location}. {profile.relocation}.
        </p>
      </header>

      <section className="cs-felt cs-contact">
        <ul>
          <li>
            <a href={`mailto:${profile.email}`}>
              <small>Email</small>
              <span>{profile.email}</span>
            </a>
          </li>
          <li>
            <Ext href={profile.linkedin}>
              <small>LinkedIn</small>
              <span>linkedin.com/in/sithranjansuresh</span>
            </Ext>
          </li>
          <li>
            <Ext href={profile.github}>
              <small>GitHub</small>
              <span>github.com/Sithranjan-Suresh</span>
            </Ext>
          </li>
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              <small>Resume</small>
              <span>Open the PDF</span>
            </a>
          </li>
        </ul>
        <p className="cs-contact-dl">
          <a className="cs-btn cs-btn--gold" href={profile.resume} download="Sithranjan_Suresh_Resume.pdf">
            Download resume
          </a>
        </p>
      </section>
    </>
  )
}

function NotFound() {
  usePage('Page not found')
  return (
    <header className="cs-pagehead">
      <p className="cs-eyebrow">404</p>
      <h1>No card at this seat</h1>
      <p>That page does not exist. Every project is on the Projects page.</p>
      <div className="cs-actions">
        <Link className="cs-btn cs-btn--gold" to={`${BASE}/projects`}>
          View projects
        </Link>
        <Link className="cs-btn" to={BASE}>
          Home
        </Link>
      </div>
    </header>
  )
}

export default function Casino() {
  useThemeClass('theme-casino')
  return (
    <Layout>
      <div className="cs-wrap">
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<CaseStudy />} />
          <Route path="experience" element={<Experience />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Layout>
  )
}

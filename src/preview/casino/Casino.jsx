import { useEffect, useRef, useState } from 'react'
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
  certifications,
  spokenLanguages,
  about,
  skillFilters,
  getProject,
  getNeighbors,
  filterProjects,
} from '../../content/portfolio'
import { usePage, useThemeClass, useSkillFilter, usePrefersReducedMotion, Ext } from '../shared'

const SUITS = {
  spades: { glyph: '♠︎', label: 'Research', red: false },
  diamonds: { glyph: '♦︎', label: 'Data analysis', red: true },
  hearts: { glyph: '♥︎', label: 'LLM apps', red: true },
  clubs: { glyph: '♣︎', label: 'Biotech Club ML', red: false },
}

// Each skill chip has its own clay color, like denominations in a chip rack.
const CHIP_COLORS = {
  Python: '#8f2a22',
  'Machine learning': '#1d3557',
  LLMs: '#1c1c1c',
  'Backend and APIs': '#5b2a66',
  React: '#0e5a52',
  'Data and statistics': '#9a6a12',
}

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/about', label: 'About & Skills' },
  { to: '/contact', label: 'Contact' },
]

const countFor = (skill) => projects.filter((p) => p.tags.includes(skill)).length

/* Fades a block up once when it scrolls into view. Content is visible without JS or motion. */
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !('IntersectionObserver' in window)) return
    el.classList.add('rv')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('rv-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

function SectionHead({ id, eyebrow, children }) {
  return (
    <div className="cs-shead">
      {eyebrow && <p className="cs-eyebrow">{eyebrow}</p>}
      <h2 id={id}>{children}</h2>
      <span className="cs-rule" aria-hidden="true">
        <i>{SUITS.diamonds.glyph}</i>
      </span>
    </div>
  )
}

function CardIndex({ card, corner }) {
  return (
    <span className={`pc-index${corner === 'br' ? ' pc-index--br' : ''}`} aria-hidden="true">
      <b>{card.rank}</b>
      <i>{SUITS[card.suit].glyph}</i>
    </span>
  )
}

function CardArt({ project }) {
  if (project.image) {
    return (
      <span className={`pc-art pc-art--${project.imageKind}`}>
        <img src={project.image} alt="" loading="lazy" />
      </span>
    )
  }
  // Projects without a screenshot get a traditional pip face instead of a fake preview.
  const glyph = SUITS[project.card.suit].glyph
  return (
    <span className="pc-art pc-art--pips" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <i key={i}>{glyph}</i>
      ))}
    </span>
  )
}

function PlayingCard({ project, variant = 'full', className = '' }) {
  const suit = SUITS[project.card.suit]
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`pc pc--${variant}${suit.red ? ' pc--red' : ''} ${className}`}
    >
      <CardIndex card={project.card} />
      {variant !== 'mini' && <CardArt project={project} />}
      {variant === 'mini' && (
        <span className="pc-pip" aria-hidden="true">
          {suit.glyph}
        </span>
      )}
      <span className="pc-body">
        <span className="pc-kind">{project.kind}</span>
        <span className="pc-title">{project.title}</span>
        {variant !== 'mini' && <span className="pc-sub">{variant === 'wide' ? project.summary : project.subtitle}</span>}
        <span className="pc-foot">
          <span className="pc-stat">
            <b>{project.headline.value}</b>
            {variant === 'wide' && <span>{project.headline.label}</span>}
          </span>
          {project.award && <span className="pc-award">{project.award}</span>}
        </span>
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
          <Link to="/" className="cs-brand">
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
            <span className="cs-menu-icon" aria-hidden="true" />
            {open ? 'Close' : 'Menu'}
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
        <div className="cs-wrap">
          <p className="cs-footer-suits" aria-hidden="true">
            {SUITS.spades.glyph} <span>{SUITS.hearts.glyph}</span> {SUITS.clubs.glyph} <span>{SUITS.diamonds.glyph}</span>
          </p>
          <div className="cs-footer-row">
            <p>
              <strong>{profile.name}</strong>
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
    <Reveal as="section" className="cs-deal" aria-labelledby="deal-h">
      <div className="cs-deal-copy">
        <p className="cs-eyebrow">Optional</p>
        <h2 id="deal-h">Let the dealer pick</h2>
        <p>
          Short on time? Draw one project at random. All {projects.length} are also listed on the{' '}
          <Link to="/projects">Projects page</Link>.
        </p>
        <button type="button" className="cs-btn cs-btn--gold" onClick={deal}>
          {dealt ? 'Deal another' : 'Deal a project'}
        </button>
        <p className="sr-only" aria-live="polite">
          {dealt ? `Dealt: ${dealt.title}. ${dealt.summary}` : ''}
        </p>
      </div>

      <div className="cs-deal-table">
        <button type="button" className="cs-deck" onClick={deal} aria-label="Deal a project from the deck">
          <span />
          <span />
          <span />
        </button>
        <div className="cs-deal-slot">
          {dealt ? (
            <div key={count} className={`cs-dealt${reduced ? '' : ' is-animated'}`}>
              <div className="cs-flip">
                <div className="cs-flip-inner">
                  <PlayingCard project={dealt} />
                  <span className="cs-flip-back" aria-hidden="true" />
                </div>
              </div>
              <div className="cs-dealt-info">
                <p>{dealt.summary}</p>
                <Link className="cs-textlink" to={`/projects/${dealt.slug}`}>
                  Read the {dealt.title} case study
                </Link>
              </div>
            </div>
          ) : (
            <p className="cs-deal-empty">Your card lands here.</p>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function Home() {
  usePage(null)
  const hand = projects.slice(0, 3)
  const featured = projects.slice(0, 2)
  return (
    <>
      <section className="cs-hero">
        <div className="cs-hero-lamp" aria-hidden="true" />
        <svg className="cs-hero-arc" viewBox="0 0 1200 130" aria-hidden="true">
          <path id="cs-arc" d="M70 122 Q600 22 1130 122" fill="none" />
          <path d="M20 122 Q600 -8 1180 122" fill="none" className="cs-hero-arc-line" />
          <text>
            <textPath href="#cs-arc" startOffset="50%" textAnchor="middle">
              AI / ML ENGINEERING {'♦'} SOFTWARE ENGINEERING {'♦'} SUMMER 2027 INTERNSHIPS
            </textPath>
          </text>
        </svg>

        <div className="cs-wrap cs-hero-grid">
          <div className="cs-hero-copy">
            <p className="cs-eyebrow">{profile.role}</p>
            <h1>
              Sithranjan <span>Suresh</span>
            </h1>
            <p className="cs-hero-intro">{profile.intro}</p>
            <p className="cs-hero-seeking">
              <span aria-hidden="true" />
              Seeking {profile.seeking}
            </p>
            <div className="cs-actions">
              <Link className="cs-btn cs-btn--gold" to="/projects">
                View projects
              </Link>
              <a className="cs-btn" href={profile.resume} target="_blank" rel="noreferrer">
                Resume (PDF)
              </a>
              <Link className="cs-btn cs-btn--ghost" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div className="cs-hand">
            <ul className="cs-fan" aria-label="Three featured projects">
              {hand.map((p, i) => (
                <li key={p.slug} className={`cs-fan-item cs-fan-item--${i}`}>
                  <PlayingCard project={p} variant="mini" />
                </li>
              ))}
            </ul>
            <div className="cs-stack" aria-hidden="true">
              <span style={{ '--chip': '#8f2a22' }} />
              <span style={{ '--chip': '#1c1c1c' }} />
              <span style={{ '--chip': '#c8a24c' }} />
            </div>
          </div>
        </div>
        <div className="cs-hero-rail" aria-hidden="true" />
      </section>

      <div className="cs-wrap">
        <Reveal className="cs-now">
          <span>Now</span>
          <p>{profile.now}</p>
          <Link className="cs-textlink" to="/experience">
            Experience
          </Link>
        </Reveal>

        <Reveal as="section" className="cs-section" aria-labelledby="record-h">
          <SectionHead id="record-h" eyebrow="Evidence">
            The strongest hand
          </SectionHead>
          <ol className="cs-ledger">
            <li>
              <span className="cs-ledger-num">5.9% → 14.0%</span>
              <p>{profile.highlights[0]}</p>
              <Link className="cs-textlink" to="/projects/ascend">
                ASCEND case study
              </Link>
            </li>
            <li>
              <span className="cs-ledger-num">30+ students</span>
              <p>{profile.highlights[1]}</p>
              <Link className="cs-textlink" to="/projects/athleteiq">
                AthleteIQ case study
              </Link>
            </li>
            <li>
              <span className="cs-ledger-num">4 awards</span>
              <p>{profile.highlights[2]}</p>
              <Link className="cs-textlink" to="/experience">
                Awards and experience
              </Link>
            </li>
          </ol>
        </Reveal>

        <Reveal as="section" className="cs-section" aria-labelledby="top-h">
          <SectionHead id="top-h" eyebrow="Featured work">
            Top of the deck
          </SectionHead>
          <div className="cs-wides">
            {featured.map((p) => (
              <PlayingCard key={p.slug} project={p} variant="wide" />
            ))}
          </div>
        </Reveal>

        <DealTable />

        <Reveal as="section" className="cs-section" aria-labelledby="deck-h">
          <SectionHead id="deck-h" eyebrow={`All ${projects.length} projects`}>
            The full deck
          </SectionHead>
          <ul className="cs-list">
            {projects.map((p) => {
              const suit = SUITS[p.card.suit]
              return (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`}>
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
        </Reveal>

        <Reveal as="section" className="cs-felt cs-cta" aria-labelledby="cta-h">
          <h2 id="cta-h">Deal me in</h2>
          <p>I am looking for {profile.seeking}.</p>
          <div className="cs-actions">
            <a className="cs-btn cs-btn--gold" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <Link className="cs-btn" to="/contact">
              All contact options
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}

/* ---------- Projects ---------- */

function Chip({ label, pressed, onClick, to }) {
  const inner = (
    <>
      <span className="cs-chip-disc" style={{ '--chip': CHIP_COLORS[label] }} aria-hidden="true">
        <b>{countFor(label)}</b>
      </span>
      <span className="cs-chip-label">
        {label}
        <small>
          {countFor(label)} {countFor(label) === 1 ? 'project' : 'projects'}
        </small>
      </span>
    </>
  )
  if (to)
    return (
      <Link className="cs-chip" to={to}>
        {inner}
      </Link>
    )
  return (
    <button type="button" className="cs-chip" aria-pressed={pressed} onClick={onClick}>
      {inner}
    </button>
  )
}

function Projects() {
  usePage('Projects')
  const { selected, toggle, clear } = useSkillFilter()
  const shown = filterProjects(selected)
  const filtering = selected.length > 0
  return (
    <div className="cs-wrap">
      <header className="cs-pagehead">
        <p className="cs-eyebrow">Projects</p>
        <h1>The deck</h1>
        <p>
          {projects.length} projects across research, data analysis, and LLM apps. Every card opens a full case study.
          The suit shows the kind of work.
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
        <div className="cs-filter-head">
          <h2 id="filter-h">Filter by skill</h2>
          <p className="cs-filter-status" aria-live="polite">
            {filtering
              ? `${shown.length} of ${projects.length} projects use ${selected.join(' + ')}.`
              : `Place a chip to narrow the deck. Showing all ${projects.length}.`}
          </p>
          {filtering && (
            <button type="button" className="cs-clear" onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
        <div className="cs-chips">
          {skillFilters.map((s) => (
            <Chip key={s} label={s} pressed={selected.includes(s)} onClick={() => toggle(s)} />
          ))}
        </div>
      </section>

      {shown.length === 0 && (
        <p className="cs-empty">
          No single project uses all of those skills together. Remove a chip or{' '}
          <button type="button" className="cs-inline-btn" onClick={clear}>
            clear the filters
          </button>
          .
        </p>
      )}

      {!filtering && (
        <section className="cs-section cs-section--tight" aria-labelledby="featured-h">
          <SectionHead id="featured-h" eyebrow="Featured work">
            Top of the deck
          </SectionHead>
          <div className="cs-wides">
            {shown.slice(0, 2).map((p) => (
              <PlayingCard key={p.slug} project={p} variant="wide" />
            ))}
          </div>
        </section>
      )}

      {shown.length > 0 && (
        <section className="cs-section cs-section--tight" aria-labelledby="rest-h">
          <SectionHead id="rest-h" eyebrow={filtering ? 'Matching projects' : 'More projects'}>
            {filtering ? 'Your hand' : 'The rest of the deck'}
          </SectionHead>
          <ul className="cs-grid" key={selected.join('|')}>
            {(filtering ? shown : shown.slice(2)).map((p, i) => (
              <li key={p.slug} style={{ '--i': i }}>
                <PlayingCard project={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
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
    <article className="cs-wrap cs-case">
      <Link className="cs-back" to="/projects">
        ← All projects
      </Link>

      <header className={`cs-case-head${suit.red ? ' is-red' : ''}`}>
        <span className="cs-case-watermark" aria-hidden="true">
          {suit.glyph}
        </span>
        <div className="cs-case-index" aria-hidden="true">
          <b>{project.card.rank}</b>
          <i>{suit.glyph}</i>
        </div>
        <div className="cs-case-title">
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
          {project.image && (
            <figure className={`cs-case-figure cs-case-figure--${project.imageKind}`}>
              <img src={project.image} alt={project.imageAlt} />
            </figure>
          )}
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
              <ul className="cs-tags">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
            <dt>Skills</dt>
            <dd>
              <ul className="cs-tags cs-tags--links">
                {project.tags.map((t) => (
                  <li key={t}>
                    <Link to={`/projects?skill=${encodeURIComponent(t)}`}>{t}</Link>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </aside>
      </div>

      <nav className="cs-case-nav" aria-label="More projects">
        {[
          [prev, '← Previous card'],
          [next, 'Next card →'],
        ].map(([p, label]) => (
          <Link key={label} to={`/projects/${p.slug}`} className={SUITS[p.card.suit].red ? 'is-red' : ''}>
            <span className="cs-case-nav-index" aria-hidden="true">
              {p.card.rank}
              {SUITS[p.card.suit].glyph}
            </span>
            <span>
              <small>{label}</small>
              {p.title}
            </span>
          </Link>
        ))}
      </nav>
    </article>
  )
}

/* ---------- Experience ---------- */

function Experience() {
  usePage('Experience and Leadership')
  return (
    <div className="cs-wrap">
      <header className="cs-pagehead">
        <p className="cs-eyebrow">Experience and leadership</p>
        <h1>At the table</h1>
        <p>Research, teaching, and the teams and programs I have led.</p>
      </header>

      <section className="cs-section cs-section--tight" aria-labelledby="exp-h">
        <SectionHead id="exp-h">Experience</SectionHead>
        <div className="cs-timeline">
          {experience.map((job) => (
            <Reveal as="article" key={job.id} className="cs-job">
              <p className="cs-job-date">{job.date}</p>
              <div className="cs-job-main">
                <h3>{job.title}</h3>
                <p className="cs-job-org">{job.org}</p>
                <p>{job.summary}</p>
                <ul className="cs-suitlist">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {job.projectSlug && (
                  <Link className="cs-textlink" to={`/projects/${job.projectSlug}`}>
                    Read the {getProject(job.projectSlug).title} case study
                  </Link>
                )}
              </div>
              {job.image && <img className="cs-job-photo" src={job.image} alt={job.imageAlt} loading="lazy" />}
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className="cs-felt cs-awards" aria-labelledby="awards-h">
        <h2 id="awards-h">Hackathon awards</h2>
        <ul>
          {awards.map((a) => (
            <li key={a.event}>
              <span className="cs-chip-disc cs-chip-disc--gold" aria-hidden="true">
                <b>{a.place.startsWith('1') ? '1' : a.place.startsWith('2') ? '2' : '★'}</b>
              </span>
              <div>
                <strong>{a.place}</strong>
                {a.event}
                {a.date ? `, ${a.date}` : ''}
                <br />
                <Link to={`/projects/${a.slug}`}>{a.project}</Link>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <section className="cs-section" aria-labelledby="lead-h">
        <SectionHead id="lead-h">Leadership and earlier work</SectionHead>
        <div className="cs-two">
          {leadership.map((role) => (
            <Reveal as="article" key={role.id} className="cs-placard">
              <p className="cs-job-date">{role.date}</p>
              <h3>{role.title}</h3>
              <p className="cs-job-org">{role.org}</p>
              <p>{role.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cs-section" aria-labelledby="edu-h">
        <SectionHead id="edu-h">Education</SectionHead>
        <article className="cs-placard cs-placard--wide">
          <p className="cs-job-date">{education.date}</p>
          <h3>{education.degree}</h3>
          <p className="cs-job-org">{education.school}</p>
          <p>{education.details.join(' · ')}</p>
          <p>Coursework: {education.coursework.join(', ')}</p>
        </article>
      </section>
    </div>
  )
}

/* ---------- About ---------- */

function About() {
  usePage('About and Skills')
  return (
    <div className="cs-wrap">
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
            <Link className="cs-textlink" to="/contact">
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

      <Reveal as="section" className="cs-felt cs-skills" aria-labelledby="skills-h">
        <h2 id="skills-h">Skills</h2>
        <div className="cs-skill-racks">
          {skills.map((g) => (
            <div key={g.group}>
              <h3>{g.group}</h3>
              <ul className="cs-tags">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3>Certifications</h3>
            <ul className="cs-tags">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Spoken languages</h3>
            <ul className="cs-tags">
              {spokenLanguages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <section className="cs-section" aria-labelledby="inuse-h">
        <SectionHead id="inuse-h" eyebrow="Proof">
          See a skill in use
        </SectionHead>
        <div className="cs-chips">
          {skillFilters.map((s) => (
            <Chip key={s} label={s} to={`/projects?skill=${encodeURIComponent(s)}`} />
          ))}
        </div>
      </section>
    </div>
  )
}

/* ---------- Contact ---------- */

function Contact() {
  usePage('Contact')
  const rows = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, suit: 'spades' },
    { label: 'LinkedIn', value: 'linkedin.com/in/sithranjansuresh', href: profile.linkedin, ext: true, suit: 'hearts' },
    { label: 'GitHub', value: 'github.com/Sithranjan-Suresh', href: profile.github, ext: true, suit: 'clubs' },
    { label: 'Resume', value: 'Open the PDF', href: profile.resume, newTab: true, suit: 'diamonds' },
  ]
  return (
    <div className="cs-wrap">
      <header className="cs-pagehead">
        <p className="cs-eyebrow">Contact</p>
        <h1>Deal me in</h1>
        <p>
          I am looking for {profile.seeking}. Based in {profile.location}. {profile.relocation}.
        </p>
      </header>

      <section className="cs-felt cs-contact" aria-label="Contact options">
        <ul>
          {rows.map((r) => {
            const suit = SUITS[r.suit]
            const body = (
              <>
                <span className={`cs-contact-suit${suit.red ? ' is-red' : ''}`} aria-hidden="true">
                  {suit.glyph}
                </span>
                <small>{r.label}</small>
                <span className="cs-contact-value">{r.value}</span>
              </>
            )
            return (
              <li key={r.label}>
                {r.ext ? (
                  <Ext href={r.href}>{body}</Ext>
                ) : (
                  <a href={r.href} {...(r.newTab ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {body}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
        <p className="cs-contact-dl">
          <a className="cs-btn cs-btn--gold" href={profile.resume} download="Sithranjan_Suresh_Resume.pdf">
            Download resume
          </a>
        </p>
      </section>
    </div>
  )
}

function NotFound() {
  usePage('Page not found')
  return (
    <div className="cs-wrap">
      <header className="cs-pagehead">
        <p className="cs-eyebrow">404</p>
        <h1>No card at this seat</h1>
        <p>That page does not exist. Every project is on the Projects page.</p>
        <div className="cs-actions">
          <Link className="cs-btn cs-btn--gold" to="/projects">
            View projects
          </Link>
          <Link className="cs-btn" to="/">
            Home
          </Link>
        </div>
      </header>
    </div>
  )
}

export default function Casino() {
  useThemeClass('theme-casino')
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<CaseStudy />} />
        <Route path="experience" element={<Experience />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, NavLink, useLocation, useParams } from 'react-router-dom'
import './diner.css'
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
import { usePage, useThemeClass, useSkillFilter, Ext } from '../shared'

const BASE = '/diner'

const COURSES = [
  { id: 'special', label: 'Chef’s specials', plain: 'Featured work' },
  { id: 'entree', label: 'Entrées', plain: 'Hackathon-winning apps' },
  { id: 'dessert', label: 'Desserts', plain: 'Smaller builds' },
]

const NAV = [
  { to: BASE, label: 'Home', end: true },
  { to: `${BASE}/projects`, label: 'Projects' },
  { to: `${BASE}/experience`, label: 'Experience' },
  { to: `${BASE}/about`, label: 'About & Skills' },
  { to: `${BASE}/contact`, label: 'Contact' },
]

/* ---------- Receipt ---------- */

function Receipt({ project, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      className="dn-receipt-dialog"
      aria-labelledby="receipt-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className="dn-printer" aria-hidden="true" />
      <div className="dn-receipt">
        <p className="dn-receipt-shop">{profile.name}</p>
        <p className="dn-receipt-center">Project receipt</p>
        <hr />
        <h2 id="receipt-title">{project.title}</h2>
        <dl>
          <div>
            <dt>Type</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt>For</dt>
            <dd>{project.org}</dd>
          </div>
          {project.date && (
            <div>
              <dt>Timeline</dt>
              <dd>{project.date}</dd>
            </div>
          )}
          {project.role && (
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
          )}
        </dl>
        <hr />
        <h3>Tech stack</h3>
        <ul className="dn-receipt-items">
          {project.stack.map((s) => (
            <li key={s}>
              <span>1 x</span> {s}
            </li>
          ))}
        </ul>
        <hr />
        <h3>Verified results</h3>
        <ul className="dn-receipt-results">
          {project.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <hr />
        <p className="dn-receipt-source">Source: {project.sources}</p>
        <div className="dn-receipt-actions">
          <Link className="dn-btn dn-btn--cherry" to={`${BASE}/projects/${project.slug}`} onClick={onClose}>
            Read the full case study
          </Link>
          <button type="button" className="dn-btn" onClick={() => ref.current.close()}>
            Close receipt
          </button>
        </div>
        <div className="dn-barcode" aria-hidden="true" />
        <p className="dn-receipt-center">Thank you for reading</p>
      </div>
    </dialog>
  )
}

function useReceipt() {
  const [project, setProject] = useState(null)
  const element = project ? <Receipt key={project.slug} project={project} onClose={() => setProject(null)} /> : null
  return { open: setProject, element }
}

/* ---------- Layout ---------- */

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
    <div className="dn">
      <a className="dn-skip" href="#main">
        Skip to content
      </a>
      <div className="dn-checker" aria-hidden="true" />
      <header className="dn-header">
        <div className="dn-wrap dn-header-row">
          <Link to={BASE} className="dn-brand">
            <span className="dn-brand-name">{profile.name}</span>
            <span className="dn-brand-tag">AI/ML and software engineering</span>
          </Link>
          <button
            type="button"
            className="dn-menu-btn"
            aria-expanded={open}
            aria-controls="dn-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="dn-nav" className={`dn-nav${open ? ' is-open' : ''}`} aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
            <a className="dn-nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
              Resume <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} key={pathname} className="dn-main">
        {children}
      </main>

      <footer className="dn-footer">
        <div className="dn-checker" aria-hidden="true" />
        <div className="dn-wrap dn-footer-row">
          <p>
            <strong>{profile.name}</strong>
            <br />
            Open for {profile.seeking}.
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
        <div className="dn-compare">
          <div className="dn-wrap">
            Design preview B: Diner. <Link to="/casino">Open preview A: Casino</Link>
            <Link to="/preview">Compare both</Link>
            <a href="/">Original site</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ---------- Home ---------- */

function Home() {
  usePage(null)
  const specials = projects.filter((p) => p.course === 'special')
  return (
    <>
      <section className="dn-cover">
        <div className="dn-cover-copy">
          <p className="dn-script">Now serving</p>
          <h1>{profile.name}</h1>
          <p className="dn-cover-role">{profile.role}</p>
          <p className="dn-cover-intro">{profile.intro}</p>
          <p className="dn-open">
            <span aria-hidden="true" /> Open for {profile.seeking}
          </p>
          <div className="dn-actions">
            <Link className="dn-btn dn-btn--cherry" to={`${BASE}/projects`}>
              See the menu (projects)
            </Link>
            <a className="dn-btn" href={profile.resume} target="_blank" rel="noreferrer">
              Resume (PDF)
            </a>
            <Link className="dn-btn dn-btn--plain" to={`${BASE}/contact`}>
              Contact
            </Link>
          </div>
        </div>

        <aside className="dn-board" aria-labelledby="specials-h">
          <h2 id="specials-h">
            <span className="dn-script">Chef’s</span> specials
          </h2>
          <ul>
            {specials.map((p) => (
              <li key={p.slug}>
                <Link to={`${BASE}/projects/${p.slug}`}>
                  <span className="dn-board-title">{p.title}</span>
                  <span className="dn-board-kind">
                    {p.kind} · {p.award || p.org}
                  </span>
                  <span className="dn-board-num">{p.headline.value}</span>
                  <span className="dn-board-label">{p.headline.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="dn-rail-section" aria-labelledby="orders-h">
        <h2 id="orders-h" className="dn-h2">
          <span className="dn-script">Orders up</span> What I have delivered
        </h2>
        <div className="dn-rail" aria-hidden="true" />
        <ul className="dn-tickets">
          <li>
            <span className="dn-ticket-num">5.9% → 14.0%</span>
            <p>{profile.highlights[0]}</p>
            <Link to={`${BASE}/projects/ascend`}>ASCEND case study</Link>
          </li>
          <li>
            <span className="dn-ticket-num">30+ students</span>
            <p>{profile.highlights[1]}</p>
            <Link to={`${BASE}/experience`}>Experience</Link>
          </li>
          <li>
            <span className="dn-ticket-num">4 awards</span>
            <p>{profile.highlights[2]}</p>
            <Link to={`${BASE}/projects`}>All projects</Link>
          </li>
        </ul>
      </section>

      <section className="dn-section" aria-labelledby="all-h">
        <h2 id="all-h" className="dn-h2">
          <span className="dn-script">On the menu</span> All projects
        </h2>
        <ul className="dn-leaders">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link to={`${BASE}/projects/${p.slug}`}>
                <span className="dn-leader-row">
                  <span className="dn-leader-name">{p.title}</span>
                  <span className="dn-leader-dots" aria-hidden="true" />
                  <span className="dn-leader-end">{p.award || p.org}</span>
                </span>
                <span className="dn-leader-desc">{p.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="dn-section dn-apps" aria-labelledby="apps-h">
        <h2 id="apps-h" className="dn-h2">
          <span className="dn-script">Appetizers</span> Skills
        </h2>
        <p>
          {skills
            .flatMap((g) => g.items)
            .slice(0, 14)
            .join(' · ')}
        </p>
        <Link className="dn-textlink" to={`${BASE}/about`}>
          Full skills list
        </Link>
      </section>
    </>
  )
}

/* ---------- Projects ---------- */

function MenuEntry({ project, onReceipt }) {
  const featured = project.course === 'special'
  return (
    <li className={`dn-entry${featured ? ' dn-entry--featured' : ''}`}>
      {featured && (
        <Link to={`${BASE}/projects/${project.slug}`} className="dn-entry-img" tabIndex={-1} aria-hidden="true">
          <img src={project.image} alt="" loading="lazy" />
        </Link>
      )}
      <div>
        <h3 className="dn-leader-row">
          <Link className="dn-leader-name" to={`${BASE}/projects/${project.slug}`}>
            {project.title}
          </Link>
          <span className="dn-leader-dots" aria-hidden="true" />
          <span className="dn-leader-end">{project.award || project.kind}</span>
        </h3>
        <p className="dn-entry-meta">
          {project.kind} · {project.org}
          {project.date ? ` · ${project.date}` : ''}
        </p>
        <p className="dn-entry-desc">{project.summary}</p>
        <ul className="dn-tags" aria-label="Skills used">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="dn-entry-actions">
          <button type="button" className="dn-btn dn-btn--small" onClick={() => onReceipt(project)}>
            View receipt<span className="sr-only"> for {project.title}</span>
          </button>
          <Link className="dn-textlink" to={`${BASE}/projects/${project.slug}`}>
            Full case study<span className="sr-only">: {project.title}</span> →
          </Link>
        </div>
      </div>
    </li>
  )
}

function Projects() {
  usePage('Projects')
  const { selected, toggle, clear } = useSkillFilter()
  const shown = filterProjects(selected)
  const receipt = useReceipt()

  return (
    <>
      <header className="dn-pagehead">
        <p className="dn-script">The menu</p>
        <h1>Projects</h1>
        <p>
          Six projects across research, data analysis, and full-stack apps. “View receipt” prints a one-page summary.
          Every dish also has a full case study.
        </p>
      </header>

      <section className="dn-filter" aria-labelledby="filter-h">
        <h2 id="filter-h">Filter by ingredient (skill)</h2>
        <div className="dn-filter-row">
          {skillFilters.map((s) => (
            <button
              key={s}
              type="button"
              className="dn-pill"
              aria-pressed={selected.includes(s)}
              onClick={() => toggle(s)}
            >
              {s}
            </button>
          ))}
          {selected.length > 0 && (
            <button type="button" className="dn-linkbtn" onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
        <p className="dn-filter-status" aria-live="polite">
          {selected.length === 0
            ? `Showing all ${projects.length} projects.`
            : `${shown.length} of ${projects.length} projects use ${selected.join(' + ')}.`}
        </p>
      </section>

      <div className="dn-menu">
        {shown.length === 0 && (
          <p className="dn-empty">
            No single project uses all of those skills together. Remove one or{' '}
            <button type="button" className="dn-linkbtn" onClick={clear}>
              clear the filters
            </button>
            .
          </p>
        )}
        {COURSES.map((course) => {
          const items = shown.filter((p) => p.course === course.id)
          if (!items.length) return null
          return (
            <section key={course.id} className="dn-course" aria-labelledby={`course-${course.id}`}>
              <h2 id={`course-${course.id}`}>
                <span className="dn-script">{course.label}</span>
                <small>{course.plain}</small>
              </h2>
              <ul>
                {items.map((p) => (
                  <MenuEntry key={p.slug} project={p} onReceipt={receipt.open} />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      {receipt.element}
    </>
  )
}

/* ---------- Case study ---------- */

function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  usePage(project ? project.title : 'Project not found')
  const receipt = useReceipt()
  if (!project) return <NotFound />
  const course = COURSES.find((c) => c.id === project.course)
  const { prev, next } = getNeighbors(slug)

  return (
    <article className="dn-case">
      <Link className="dn-back" to={`${BASE}/projects`}>
        ← Back to the menu (all projects)
      </Link>

      <header className="dn-case-head">
        <div>
          <p className="dn-script">{course.label}</p>
          <h1>{project.title}</h1>
          <p className="dn-case-sub">{project.subtitle}</p>
          <p className="dn-entry-meta">
            {project.kind} · {project.org}
            {project.date ? ` · ${project.date}` : ''}
          </p>
          <div className="dn-actions">
            {project.links.demo && (
              <Ext className="dn-btn dn-btn--cherry" href={project.links.demo}>
                Live demo
              </Ext>
            )}
            {project.links.repo && (
              <Ext className="dn-btn" href={project.links.repo}>
                Code on GitHub
              </Ext>
            )}
            <button type="button" className="dn-btn" onClick={() => receipt.open(project)}>
              View receipt
            </button>
          </div>
        </div>
        {project.award && (
          <p className="dn-stamp">
            <span>{project.award.split(', ')[0]}</span>
            {project.award.split(', ')[1]}
          </p>
        )}
      </header>

      <div className="dn-case-grid">
        <div className="dn-case-body">
          <figure className={`dn-case-figure dn-case-figure--${project.imageKind}`}>
            <img src={project.image} alt={project.imageAlt} />
          </figure>

          <section>
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>
              What I built <small>the method</small>
            </h2>
            <ol className="dn-steps">
              {project.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ol>
          </section>
          {project.contribution && (
            <section>
              <h2>My part</h2>
              <p>{project.contribution}</p>
            </section>
          )}
          <section>
            <h2>
              Outcome <small>what was served</small>
            </h2>
            <ul className="dn-checks">
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

        <aside className="dn-recipe" aria-label="Project summary">
          <p className="dn-recipe-num">{project.headline.value}</p>
          <p className="dn-recipe-label">{project.headline.label}</p>
          <h2>
            Ingredients <small>tech stack</small>
          </h2>
          <ul className="dn-recipe-list">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {project.role && (
            <>
              <h2>My role</h2>
              <p>{project.role}</p>
            </>
          )}
          {project.date && (
            <>
              <h2>Timeline</h2>
              <p>{project.date}</p>
            </>
          )}
          <h2>Skills</h2>
          <ul className="dn-recipe-links">
            {project.tags.map((t) => (
              <li key={t}>
                <Link to={`${BASE}/projects?skill=${encodeURIComponent(t)}`}>{t}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <nav className="dn-case-nav" aria-label="More projects">
        <Link to={`${BASE}/projects/${prev.slug}`}>
          <small>← Previous dish</small>
          {prev.title}
        </Link>
        <Link to={`${BASE}/projects/${next.slug}`}>
          <small>Next dish →</small>
          {next.title}
        </Link>
      </nav>
      {receipt.element}
    </article>
  )
}

/* ---------- Experience ---------- */

function Experience() {
  usePage('Experience and Leadership')
  return (
    <>
      <header className="dn-pagehead">
        <p className="dn-script">Kitchen history</p>
        <h1>Experience &amp; Leadership</h1>
        <p>Research, teaching, and the teams I have led.</p>
      </header>

      <section className="dn-section" aria-labelledby="exp-h">
        <h2 id="exp-h" className="dn-h2">
          <span className="dn-script">On the line</span> Experience
        </h2>
        {experience.map((job) => (
          <article key={job.id} className="dn-job">
            <div className="dn-job-side">
              <p className="dn-job-date">{job.date}</p>
              <img src={job.image} alt={job.imageAlt} loading="lazy" />
            </div>
            <div>
              <h3>{job.title}</h3>
              <p className="dn-entry-meta">{job.org}</p>
              <p>{job.summary}</p>
              <ul className="dn-checks">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              {job.note && <p className="dn-note">{job.note}</p>}
              <Link className="dn-textlink" to={`${BASE}/projects/${job.projectSlug}`}>
                Read the {getProject(job.projectSlug).title} case study →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="dn-section" aria-labelledby="lead-h">
        <h2 id="lead-h" className="dn-h2">
          <span className="dn-script">Front of house</span> Leadership
        </h2>
        <ul className="dn-leaders dn-leaders--static">
          {leadership.map((role) => (
            <li key={role.id}>
              <h3 className="dn-leader-row">
                <span className="dn-leader-name">
                  {role.title}, {role.org}
                </span>
                <span className="dn-leader-dots" aria-hidden="true" />
                <span className="dn-leader-end">{role.date}</span>
              </h3>
              <p className="dn-leader-desc">{role.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="dn-section" aria-labelledby="awards-h">
        <h2 id="awards-h" className="dn-h2">
          <span className="dn-script">Blue ribbons</span> Hackathon awards
        </h2>
        <ul className="dn-ribbons">
          {awards.map((a) => (
            <li key={a.event}>
              <span className="dn-ribbon">{a.place}</span>
              <p>
                <strong>{a.event}</strong>
                {a.date ? `, ${a.date}` : ''}
                <br />
                <Link className="dn-textlink" to={`${BASE}/projects/${a.slug}`}>
                  {a.project}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="dn-section" aria-labelledby="edu-h">
        <h2 id="edu-h" className="dn-h2">
          <span className="dn-script">Training</span> Education
        </h2>
        <div className="dn-edu">
          <h3 className="dn-leader-row">
            <span className="dn-leader-name">
              {education.degree}, {education.school}
            </span>
            <span className="dn-leader-dots" aria-hidden="true" />
            <span className="dn-leader-end">{education.date}</span>
          </h3>
          <p>{education.details.join(' · ')}</p>
          <p>Coursework: {education.coursework.join(', ')}</p>
        </div>
      </section>
    </>
  )
}

/* ---------- About ---------- */

function About() {
  usePage('About and Skills')
  return (
    <>
      <header className="dn-pagehead">
        <p className="dn-script">Meet the cook</p>
        <h1>About &amp; Skills</h1>
      </header>

      <section className="dn-about">
        <div className="dn-about-text">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link className="dn-textlink" to={`${BASE}/contact`}>
            Get in touch →
          </Link>
        </div>
        <div className="dn-polaroids">
          {about.photos.map((ph) => (
            <figure key={ph.alt}>
              <img src={ph.image} alt={ph.alt} loading="lazy" />
              <figcaption>
                {ph.caption}{' '}
                {ph.href && (
                  <Ext className="dn-textlink" href={ph.href}>
                    {ph.linkLabel}
                  </Ext>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="dn-section" aria-labelledby="skills-h">
        <h2 id="skills-h" className="dn-h2">
          <span className="dn-script">Appetizers</span> Skills
        </h2>
        <div className="dn-skills">
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
        <h3 className="dn-skills-sub">See a skill in a project</h3>
        <div className="dn-filter-row">
          {skillFilters.map((s) => (
            <Link key={s} className="dn-pill" to={`${BASE}/projects?skill=${encodeURIComponent(s)}`}>
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
      <header className="dn-pagehead">
        <p className="dn-script">Reservations</p>
        <h1>Contact</h1>
        <p>
          I am looking for {profile.seeking}. Based in {profile.location}. {profile.relocation}.
        </p>
      </header>

      <section className="dn-check" aria-label="Contact details">
        <p className="dn-check-head">
          <span>Guest check</span>
          <span>{profile.name}</span>
        </p>
        <ul>
          <li>
            <a href={`mailto:${profile.email}`}>
              <span>Email</span>
              <span>{profile.email}</span>
            </a>
          </li>
          <li>
            <Ext href={profile.linkedin}>
              <span>LinkedIn</span>
              <span>linkedin.com/in/sithranjansuresh</span>
            </Ext>
          </li>
          <li>
            <Ext href={profile.github}>
              <span>GitHub</span>
              <span>github.com/Sithranjan-Suresh</span>
            </Ext>
          </li>
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              <span>Resume</span>
              <span>Open the PDF</span>
            </a>
          </li>
        </ul>
        <p className="dn-check-foot">
          <a className="dn-btn dn-btn--cherry" href={profile.resume} download="Sithranjan_Suresh_Resume.pdf">
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
    <header className="dn-pagehead">
      <p className="dn-script">86’d</p>
      <h1>That page is off the menu</h1>
      <p>The page does not exist. Every project is on the Projects page.</p>
      <div className="dn-actions">
        <Link className="dn-btn dn-btn--cherry" to={`${BASE}/projects`}>
          View projects
        </Link>
        <Link className="dn-btn" to={BASE}>
          Home
        </Link>
      </div>
    </header>
  )
}

export default function Diner() {
  useThemeClass('theme-diner')
  return (
    <Layout>
      <div className="dn-wrap">
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

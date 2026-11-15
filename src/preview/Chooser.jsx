import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { openQuestions } from '../content/portfolio'

// Internal comparison page for choosing a direction. Not part of either design.
export default function Chooser() {
  useEffect(() => {
    document.title = 'Design previews | Sithranjan Suresh'
  }, [])
  const card = {
    display: 'block',
    padding: '1.5rem',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.25)',
    color: '#fff',
  }
  return (
    <main style={{ maxWidth: '52rem', margin: '0 auto', padding: '3rem 1.25rem', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Portfolio design previews</h1>
      <p style={{ marginTop: '0.5rem' }}>
        Two complete multipage versions built from the same content file. The original one-page site is unchanged at{' '}
        <a href="/" style={{ textDecoration: 'underline' }}>
          the home route
        </a>
        .
      </p>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', marginTop: '2rem' }}>
        <Link to="/casino" style={{ ...card, background: '#114534' }}>
          <strong style={{ fontSize: '1.3rem' }}>Version A: Casino</strong>
          <br />
          Projects as a deck of cards on green felt. Deal a random project, filter with skill chips.
        </Link>
        <Link to="/diner" style={{ ...card, background: '#b3202c' }}>
          <strong style={{ fontSize: '1.3rem' }}>Version B: Diner</strong>
          <br />
          Projects as a printed menu. Each dish prints a receipt with stack, role, timeline, and results.
        </Link>
      </div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '3rem' }}>Open questions before launch</h2>
      <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', listStyle: 'disc', display: 'grid', gap: '0.6rem' }}>
        {openQuestions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>
    </main>
  )
}

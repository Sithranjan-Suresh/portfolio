import { useEffect, useState, useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { skillFilters } from '../content/portfolio'

// Sets the tab title, and on each new page moves scroll and focus to the top
// so keyboard and screen reader users land on the new content.
export function usePage(title) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title ? `${title} | Sithranjan Suresh` : 'Sithranjan Suresh | Portfolio'
  }, [title])
  useEffect(() => {
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    if (main && document.activeElement && document.activeElement !== document.body) {
      main.focus({ preventScroll: true })
    }
  }, [pathname])
}

// Applies a class to <html> so the page background matches the active theme.
export function useThemeClass(name) {
  useEffect(() => {
    document.documentElement.classList.add(name)
    return () => document.documentElement.classList.remove(name)
  }, [name])
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Skill filter state lives in the URL (?skill=Python&skill=React) so a
// filtered view can be linked, refreshed, and reached with the back button.
export function useSkillFilter() {
  const [params, setParams] = useSearchParams()
  const selected = params.getAll('skill').filter((s) => skillFilters.includes(s))
  const toggle = useCallback(
    (skill) => {
      const next = selected.includes(skill) ? selected.filter((s) => s !== skill) : [...selected, skill]
      setParams(next.length ? { skill: next } : {}, { replace: true })
    },
    [selected, setParams],
  )
  const clear = useCallback(() => setParams({}, { replace: true }), [setParams])
  return { selected, toggle, clear }
}

export function Ext({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

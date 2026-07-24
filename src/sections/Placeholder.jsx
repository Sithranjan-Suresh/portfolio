function Placeholder({ id, number, label }) {
  return (
    <section id={id} className="min-h-[40vh] py-24">
      <span className="font-mono text-signal-amber text-sm">{number}</span>
      <p className="text-muted mt-2">{label} — not built yet</p>
    </section>
  )
}

export default Placeholder

const items = [
  { placement: '1st Place', rest: 'BeanHacks' },
  { placement: '2nd Place', rest: 'AQX Data Bowl (x2)' },
  { placement: null, rest: 'Mystery Award, Ctrl+V' },
  { placement: null, rest: 'Incoming CS Lead, UTD Biotech Club' },
]

function ProofStrip() {
  return (
    <section id="proof" className="py-8">
      <span className="font-mono text-signal-amber text-sm">02</span>
      <p className="font-mono text-sm sm:text-base uppercase tracking-wide text-muted mt-3 leading-relaxed">
        {items.map((item, index) => (
          <span key={item.rest}>
            {item.placement && <span className="text-signal-amber">{item.placement}</span>}
            {item.placement && ' '}
            {item.rest}
            {index < items.length - 1 && <span className="mx-3 text-muted/50">&middot;</span>}
          </span>
        ))}
      </p>
    </section>
  )
}

export default ProofStrip

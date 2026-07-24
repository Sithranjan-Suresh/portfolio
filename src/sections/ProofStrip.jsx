const items = [
  { placement: '1st Place', rest: 'BeanHacks', rotate: '-rotate-2' },
  { placement: '2nd Place', rest: 'AQX Data Bowl ×2', rotate: 'rotate-1' },
  { placement: 'Award', rest: 'Ctrl+V Hackathon', rotate: '-rotate-1' },
  { placement: null, rest: 'Incoming CS Lead, UTD Biotech Club', rotate: 'rotate-2' },
]

function ProofStrip() {
  return (
    <section id="proof" className="py-10 border-t border-b border-muted/15">
      <h2 className="sr-only">Proof Strip</h2>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {items.map((item) => (
          <div
            key={item.rest}
            className={`bg-panel border border-muted/20 px-4 py-2.5 shadow-md shadow-black/20 ${item.rotate} hover:rotate-0 transition-transform motion-reduce:transition-none`}
          >
            <p className="font-mono text-xs uppercase tracking-wide whitespace-nowrap">
              {item.placement && <span className="text-brass font-semibold">{item.placement} &middot; </span>}
              <span className="text-muted">{item.rest}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProofStrip

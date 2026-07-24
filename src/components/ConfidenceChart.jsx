// Leverage-tier confidence widening: illustrates that higher-leverage tiers
// carry smaller samples and therefore wider confidence intervals, which is
// exactly what the empirical Bayes shrinkage in Ice in His Veins corrects for.
const tiers = [
  { label: 'Tier 1', ciWidth: 14 },
  { label: 'Tier 2', ciWidth: 22 },
  { label: 'Tier 3', ciWidth: 34 },
  { label: 'Tier 4', ciWidth: 50 },
  { label: 'Tier 5', ciWidth: 72 },
]

const naive = 8.2
const corrected = 4.0
const maxValue = 10

function ConfidenceChart() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 320 220"
        role="img"
        aria-labelledby="confidence-chart-title confidence-chart-desc"
        className="w-full h-auto"
      >
        <title id="confidence-chart-title">
          Confidence-band correction across leverage tiers
        </title>
        <desc id="confidence-chart-desc">
          Five leverage tiers with widening confidence intervals at higher
          leverage, and the corrected clutch-spread estimate shrinking from a
          naive 8.2 points to 4.0 points after empirical Bayes shrinkage.
        </desc>

        {/* Tier confidence bands */}
        {tiers.map((tier, i) => {
          const y = 12 + i * 20
          const cx = 60
          return (
            <g key={tier.label}>
              <text x="0" y={y + 4} className="fill-muted" fontFamily="JetBrains Mono, monospace" fontSize="9">
                {tier.label}
              </text>
              <line
                x1={cx - tier.ciWidth / 2}
                x2={cx + tier.ciWidth / 2}
                y1={y}
                y2={y}
                stroke="#7FA8FF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={0.35 + i * 0.13}
              />
              <line x1={cx} x2={cx} y1={y - 4} y2={y + 4} stroke="#7FA8FF" strokeWidth="2" />
            </g>
          )
        })}

        {/* Naive vs corrected comparison */}
        <g transform="translate(150, 10)">
          <text x="0" y="6" className="fill-muted" fontFamily="JetBrains Mono, monospace" fontSize="9">
            HIGHEST-LEVERAGE TIER SPREAD
          </text>

          {/* Naive bar */}
          <rect x="0" y="20" width={(naive / maxValue) * 150} height="14" fill="#7FA8FF" opacity="0.35" />
          <text x="0" y="46" fontFamily="JetBrains Mono, monospace" fontSize="10" className="fill-muted">
            Naive: 8.2 pts
          </text>

          {/* Corrected bar */}
          <rect x="0" y="68" width={(corrected / maxValue) * 150} height="14" fill="#7FA8FF" />
          <text x="0" y="94" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#7FA8FF">
            Corrected: 4.0 pts
          </text>

          <text x="0" y="120" fontFamily="JetBrains Mono, monospace" fontSize="11" className="fill-brass" fontWeight="700">
            2.03x overstatement corrected
          </text>
        </g>
      </svg>
    </figure>
  )
}

export default ConfidenceChart

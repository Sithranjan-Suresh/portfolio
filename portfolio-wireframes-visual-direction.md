# Wireframes & Visual Direction

Personal portfolio, not a hackathon submission. No judging criteria to design around here, just recruiters and hiring managers.

## Grounding the design in the actual subject

Before picking colors, here's the thing I want the whole aesthetic to come from: you already built a project about correcting for false confidence in noisy data (Ice in His Veins), and your whole professional pitch is "AI systems that actually have to work." That's a specific, ownable world: dashboards, confidence intervals, telemetry, systems that report their own reliability. That's more interesting and more you than a generic "AI startup" look, so that's the world this design pulls from.

I'm explicitly steering away from the two looks every AI-generated portfolio defaults to right now: warm cream background with a terracotta accent, or near-black with a single neon accent and nothing else going on. Both are fine looks in general, neither is earned by your actual content, so neither is what's below.

---

## Design Plan, Pass 1

### Color

| Token | Hex | Role |
|---|---|---|
| `bg-base` | `#12141C` | Page background. Deep charcoal-navy, not pure black, warm enough to not feel cold |
| `bg-panel` | `#1B1E29` | Card/section panel background, one step lighter than base |
| `signal-amber` | `#F2A93C` | Primary accent. Used for CTAs, placements, the one "look here" color |
| `data-teal` | `#3ED9C7` | Secondary accent, used only for data visualization elements: confidence bands, chart lines, GitHub graph highlights. Never used for buttons or text, so it stays meaningful when it shows up |
| `text-primary` | `#F3F1EA` | Body and headline text. Warm off-white, not stark white |
| `text-muted` | `#878B9E` | Labels, captions, secondary text, dates |

The amber and teal both come from a dashboard reading: amber for "signal, pay attention," teal for "measured data." They're used for different jobs so they never compete, and neither is the terracotta-cream or neon-on-black cliché.

### Type

- **Display:** JetBrains Mono, bold/extrabold, used sparingly for the hero line, section numbers, and standalone stats. A monospace display face is unusual for a portfolio and it's the single typographic choice that says "this person thinks like an engineer" before a recruiter reads a word.
- **Body:** Inter, regular/medium, for all paragraph text. Clean, humanist, doesn't fight the mono display for attention.
- **Utility/data:** JetBrains Mono, small size, for tech stack tags, dates, and metric callouts (pass@1, GPA, placements). Same face as the display, different scale, so numbers and stats always read as "data" wherever they appear on the page.

### Layout Concept

One continuous scroll, dark throughout (no jarring light-to-dark section breaks), with a **persistent thin vertical signal line** running down the left edge of the content column on desktop. Small amber ticks mark each section as you reach it, like a progress readout on a dashboard. This is quiet, not decorative for its own sake, it reflects the actual subject (a page from someone who builds systems that report their own state).

Section numbers (01 through 11) are earned here, not decorative, since the page genuinely is a sequence a recruiter scrolls through in order, and the numbering doubles as a wayfinding device against the signal line.

### Signature Element

A **confidence band** motif: thin horizontal brackets with tick marks, visually borrowed from the leverage-tier chart you'd actually see in Ice in His Veins, used as section dividers instead of a plain horizontal rule. Reused once, boldly, in the Featured Project section as an actual mini data visualization sitting next to the "technical decisions" paragraph, rather than a generic screenshot. Everything else on the page stays quiet so this one recurring motif is what someone remembers.

---

## Self-critique before locking this in

Checking this against the generic defaults: it's not cream-terracotta, and while it is a dark background, it isn't "near-black plus one neon accent and nothing else," because the two accents have distinct jobs, the type pairing is unusual (monospace display is not a default choice), and the signature element is derived directly from your own project rather than a decoration bolted on. The one thing I revised while drafting this: I initially had the signal line pulse/animate constantly, cut that, since constant motion next to dense technical content reads as noisy and actually undercuts the "systems that work reliably" positioning. It's now static except for a quiet highlight as you scroll past each tick.

---

## Wireframes

Desktop-first throughout except where noted, since a recruiter's first click is very often from a laptop even when the discovery happened on mobile (LinkedIn, email).

### 1. Hero (desktop)

```
┌──────────────────────────────────────────────────────┐
│  │ 01                                                 │
│  │                                                     │
│  │   SITHRANJAN SURESH.                                │
│  │   I BUILD AI SYSTEMS THAT                          │
│  │   ACTUALLY HAVE TO WORK.        [mono, extrabold]  │
│  │                                                     │
│  │   CS student at UT Dallas. Four hackathons,        │
│  │   four placements, including 1st at BeanHacks.     │
│  │   Aiming for Summer 2027 AI/ML internships.         │
│  │                                                     │
│  │   [ See my work ]   [ Download resume ]            │
│  │                                                     │
└──────────────────────────────────────────────────────┘
```
Left signal line starts here at tick 01. Headline in mono, set large (72-96px desktop), tight leading, left-aligned, not centered, centered hero text is the single most common default and it's worth avoiding on principle. Subline in Inter, muted color, noticeably smaller so the headline dominates. Two CTAs, amber filled for primary, outline for secondary.

**Mobile:** signal line collapses (it's a desktop-only device, don't try to force it into a 380px viewport), headline drops to 36-40px, still left-aligned, CTAs stack full-width.

### 2. Proof Strip (desktop)

```
│ 02  1ST BeanHacks · 2ND AQX Data Bowl ×2 · Ctrl+V Award · Incoming CS Lead
```
One thin row, mono utility face, small caps or all-caps, muted text color with the placements (1ST, 2ND) picked out in amber. No cards, no icons, just a clean typographic line. This section's whole job is speed, it should take under a second to scan.

**Mobile:** wraps to two lines, still one continuous row, not separate stacked cards, keeps the "fast scan" quality.

### 3. Experience (desktop)

```
│ 03  EXPERIENCE
│
│  ┌─ ASCEND, ACM Research ─────────── Feb–Apr 2026 ─┐
│  │  Variant Generation Lead                         │
│  │  pass@1  5.9% → 14.0%   [2.4x]                    │
│  │  pass@10 6.0% → 16.0%                             │
│  │  Full description...                              │
│  └────────────────────────────────────────────────┘
│
│  ┌─ Biotech Club, UTD ─────────────── Mar–May 2026 ─┐
│  │  ML Workshop Instructor & Curriculum Designer     │
│  │  30+ students · AthleteIQ capstone                │
│  └────────────────────────────────────────────────┘
│
│  ┌─ AFA CyberPatriot ──────────────── Oct '23–Jan '25┐
│  │  Co-Captain · Top 200 of 3,000+ teams             │
│  └────────────────────────────────────────────────┘
```
Each role is a `bg-panel` card with the date in mono/muted at the top right, corner-anchored, not buried in prose. The headline metric (pass@1 2.4x) gets pulled out and set large in amber/mono above the paragraph, this is the "big number, small label" pattern the design brief for AI portfolios defaults to everywhere, but here it's justified because the number is real and specific, not decorative.

**Mobile:** cards stack full-width, pulled-out metric stays large and prominent since it's your fastest-scanning content on a small screen.

### 4. Featured Project: Ice in His Veins (desktop)

```
│ 04  FEATURED PROJECT
│
│  ICE IN HIS VEINS                    [2ND · AQX Data Bowl 2.0]
│
│  ┌────────────────────────┐   One-line pitch...
│  │  ⌐ ─ ─ ─ ─ ─ ─ ─ ─ ¬    │
│  │  confidence-band chart  │   The story paragraph...
│  │  (leverage tiers,       │
│  │   8.2 → 4.0 correction) │   Technical decisions paragraph...
│  │  ⌐ ─ ─ ─ ─ ─ ─ ─ ─ ¬    │
│  └────────────────────────┘   [Python · nflverse · pytest ...]
│                                 [ View dashboard ] [ View on GitHub ]
```
Two-column layout, chart/visual on the left (this is where the signature confidence-band motif becomes an actual small chart, not just a divider), copy on the right. This is the one section on the page that gets a real data visualization instead of a screenshot, since it's literally what the project is about.

**Mobile:** stacks, chart first (it's the fastest "wait, what is this" hook), then the copy underneath.

### 5. Other Hackathon Projects (desktop)

```
│ 05  MORE FROM THE HACKATHON CIRCUIT
│
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  │ UNDER PRESSURE │  │     VOCA       │  │    PALETTE     │
│  │ 2ND · AQX 1.0  │  │ Award · Ctrl+V │  │ 1ST · BeanHacks│
│  │                │  │                │  │                │
│  │ description... │  │ description... │  │ description... │
│  │                │  │                │  │                │
│  │ [ GitHub → ]   │  │ [ GitHub → ]   │  │ [ GitHub → ]   │
│  └───────────────┘  └───────────────┘  └───────────────┘
```
Three-column card grid, equal weight, so it reads as "more proof" without competing with the featured project above it. Each card gets its placement badge in the same amber-on-mono treatment as the proof strip, so the visual language stays consistent across the page.

**Mobile:** single column stack, in placement order (1st, then the 2nds, then the award).

### 6. Skills + Learning Path (desktop)

```
│ 06  STACK
│
│  BUILDING AI SYSTEMS      DATA & ML          INFRA
│  Python                   Pandas             FastAPI
│  Groq                     NumPy              Docker
│  LangChain                scikit-learn        ...
│  ...
│
│  ┌─ LEARNING PATH ─────────────────────────────────┐
│  │  PYTHON → NLP → ML → DL → GEN AI                 │
│  │  ●───────●───────●───────○───────○              │
│  │  solid   solid   solid   current   next          │
│  └──────────────────────────────────────────────────┘
```
Skills as plain grouped columns, mono utility face, no bars, no percentages, exactly what we already decided against. Learning path gets its own small panel below with a simple filled/hollow dot progression, honest about where you actually are (filled dots for ML/NLP, half or outline for DL, outline for Gen AI). This is a case where a small, honest visual actually helps, since it's a claim ("I'm still working on DL") that reads better shown than stated.

**Mobile:** columns stack vertically, learning path dots stay horizontal and scale down, it's a small enough element to survive a narrow viewport.

### 7. GitHub Activity (desktop)

```
│ 07  GITHUB
│
│  "I try to keep something in progress most weeks."
│
│  [ live contribution graph, full width, data-teal highlights ]
│
│  [ pinned repo card ]   [ pinned repo card ]
```
This is the one place `data-teal` gets to lead instead of support, since the whole section is literally data. Full-width graph, two pinned repo cards below it.

**Mobile:** graph becomes a simplified stat instead (total contributions, longest streak) since the full calendar grid is genuinely hard to read under 400px, pinned repos stack.

### 8. About (desktop)

```
│ 08  ABOUT
│
│         I got into computer science the hard way...
│         [body copy, Inter, generous line-height,       ]
│         [max-width capped around 65-70 characters       ]
│         [per line so it reads like a paragraph, not a   ]
│         [wall]
```
Narrower measure than the rest of the page here on purpose, this is the one section that's read start to finish rather than scanned, so it gets typography treatment closer to a magazine column. No card, no background panel, just quiet text on the base background, a deliberate contrast with every card-heavy section around it.

**Mobile:** same treatment, full width minus standard margins.

### 9. Education (desktop)

```
│ 09  EDUCATION
│  UT Dallas · B.S. CS · Dec 2028 · GPA 3.58 · Academic Excellence Scholar
```
One compact line, same mono/muted treatment as the proof strip. This section should visually whisper, it's a confirmation, not a moment.

### 10. Currently Building + Availability (desktop)

```
│ 10  RIGHT NOW
│
│  [ live status line, updates regularly ]
│
│  OPEN TO: Summer 2027 AI/ML & Data Engineering internships
│  Based in Texas · open to relocation
```
Small amber dot next to "RIGHT NOW" like a live/online indicator, ties back to the dashboard language of the rest of the page without being cute about it.

### 11. Contact (desktop)

```
│ 11  LET'S TALK
│
│  [ email ]  [ LinkedIn ]  [ GitHub ]  [ Download résumé ]
│
└─ end of signal line
```
The signal line terminates here, visually closing the loop it opened in the hero. Buttons in a simple row, amber for the primary (resume download), everything else as quiet text links.

---

## What I'd want your reaction on before this goes to code

1. The monospace-headline choice is the boldest call in this whole plan, it's unusual for a portfolio and it's doing a lot of work to make the page feel distinct. If it doesn't feel like you when you picture it, that's the one thing worth swapping before anything else.
2. The confidence-band chart in the Featured Project section needs your actual chart data (the leverage tiers, the 8.2 to 4.0 correction) to be real instead of illustrative, since a fake-looking chart would undercut the exact point the project is making.
3. Everything above is dark-mode throughout. If you want a light option too, that's a bigger conversation since the amber/teal pairing was picked to read well against `#12141C` specifically.

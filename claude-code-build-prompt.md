# Prompt for Claude Code

Copy everything in the code block below into Claude Code, in the same folder as `portfolio-content-draft.md` and `portfolio-wireframes-visual-direction.md` (make sure both files are actually in the project directory first, Claude Code needs to read them, not just be told about them).

```
Build my personal portfolio website as a React + Tailwind CSS site.

Read portfolio-content-draft.md and portfolio-wireframes-visual-direction.md
in this directory first, before writing any code. They contain the full copy
and the full design spec (colors, type, layout, wireframes per section) for
every section. Follow them exactly, don't invent new sections or cut ones
that are there.

Design tokens to implement as CSS variables / Tailwind theme extensions:
- bg-base: #12141C
- bg-panel: #1B1E29
- signal-amber: #F2A93C
- data-teal: #3ED9C7
- text-primary: #F3F1EA
- text-muted: #878B9E

Typography: JetBrains Mono for the display face (hero headline, section
numbers, standalone stats, tech tags) and Inter for body text. Load both
from Google Fonts. Dark mode only, no light theme toggle.

Build these sections in this exact order, matching the wireframes doc:
1. Hero
2. Proof Strip
3. Experience (including the Leadership & Activities content for
   Toastmasters and CyberPatriot)
4. Featured Project (Ice in His Veins, with the confidence-band chart
   described in the wireframes doc, built as a real small data
   visualization using the actual numbers from the content doc: the
   5-tier leverage model and the 8.2 to 4.0 point correction, not a
   placeholder image)
5. Other Hackathon Projects (Under Pressure, Voca, Palette, as a 3-column
   grid on desktop, single column on mobile)
6. Skills + Learning Path
7. GitHub Activity (embed a real GitHub contribution graph for
   github.com/Sithranjan-Suresh, with a simplified stat fallback for
   mobile screens under 400px)
8. About
9. Education
10. Currently Building + Availability
11. Contact

Implementation requirements:
- Fully responsive, with the specific desktop/mobile behavior called out
  per section in the wireframes doc (the persistent left signal line with
  section tick marks is desktop-only, collapse it entirely on mobile
  rather than trying to shrink it)
- Semantic HTML, proper heading hierarchy, visible keyboard focus states
- Respect prefers-reduced-motion, keep animation minimal per the design
  doc (the signal line is static except for a quiet highlight as you
  scroll past each section tick, nothing should pulse or loop continuously)
- Any content marked with [brackets] in the content draft (GitHub repo
  links, demo video links, Under Pressure's specific numbers, the
  Toastmasters detail) is a placeholder. Leave it as an obvious TODO
  comment in the code and a visible "add link" placeholder in the UI
  rather than a dead link or empty href
- Resume download button should link to a /resume.pdf path I'll drop in
  later, stub it now

Set up the project structure, install dependencies, and get it running
locally. Then walk me through what you built section by section so I can
react to it before we polish anything further.
```

A few notes before you run this:

- Drop your actual resume PDF into the project as `resume.pdf` so that button isn't broken from the start.
- Claude Code is going to hit every `[bracket placeholder]` in the content doc (GitHub links, Under Pressure's numbers, the Toastmasters detail, demo videos). Filling those in before you run this saves you a pass later, but the prompt is written so it won't break or fake anything if you don't.
- If you already have an existing portfolio repo, tell Claude Code to work inside that repo instead of starting fresh, so you don't end up with two separate projects.

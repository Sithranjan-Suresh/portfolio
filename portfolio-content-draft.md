# Portfolio Content Draft (revised)

Fixed based on your feedback: only the 4 hackathon-winning projects are in here now. PaperBridge is out since it isn't built yet, you can add it once it exists. CLAIRO and LeakScope are out too. Experience is moved up and given more room, since it's your strongest, most verifiable material right now.

---

## 1. Hero

**Headline options:**

> Sithranjan Suresh. I build AI systems that actually have to work.

> Sithranjan Suresh, building agentic AI systems, one real problem at a time.

**Subline:**
> CS student at UT Dallas. Four hackathons, four placements, including 1st at BeanHacks. Aiming for Summer 2027 AI/ML internships.

**CTA buttons:** "See my work" (scrolls to Experience) / "Download resume"

---

## 2. Proof Strip

> 1st Place, BeanHacks &nbsp;·&nbsp; 2nd Place, AQX Data Bowl (x2) &nbsp;·&nbsp; Mystery Award, Ctrl+V &nbsp;·&nbsp; Incoming CS Lead, UTD Biotech Club

---

## 3. Experience

This section leads because it's your strongest, most verifiable proof. Real roles, real responsibility, no asterisks.

> **Undergraduate AI Researcher, Variant Generation Lead, ASCEND (ACM Research, UTD)** — Feb 2026 to Apr 2026
> Led variant generation for a self-generated curriculum plus GRPO pipeline, fine-tuning a DeepSeek-Coder 1.3B model and raising pass@1 on Microsoft's P3 benchmark from 5.9% to 14.0%, a 2.4x improvement, with pass@10 climbing from 6.0% to 16.0%. Built a fault-tolerant pipeline with structured JSON schemas, retry logic, and regex-based recovery that eliminated malformed-output failures entirely, and iterated on error logs across a two-pass generation process with 4-bit quantized DeepSeek-Coder to improve variant accuracy by 15%. Automated preprocessing and designed the output schema the downstream RL training pipeline consumed, cutting manual data-prep effort by 50% for the 4-person research team.

> **ML Workshop Instructor and Curriculum Designer, Biotech Club, UTD** — Mar 2026 to May 2026 (incoming CS Lead, Aug 2026)
> Designed a 4-week applied ML curriculum for a non-technical audience and took 30+ students from zero ML background to independently deploying live FastAPI prediction apps. Built AthleteIQ, a full-stack injury-risk classification app with a FastAPI backend and a live SVG gauge frontend, as the capstone project the whole curriculum was built around.

> **Co-Captain, AFA CyberPatriot** — Oct 2023 to Jan 2025
> Led a 6-member team to a Top 200 finish nationally out of 3,000+ teams, owning system hardening across Windows, Linux, and Cisco networking environments.

---

## 3.5 Leadership & Activities

> **Member, Toastmasters**
> Working on public speaking deliberately, not just picking it up by accident. [fill in specifics once you have them: any role you've held, speech contests entered, or a specific speech/achievement, a concrete detail here beats a vague membership line]

CyberPatriot stays in the Experience section above since it's the meatier entry with a real result attached (Top 200 nationally). Put it here instead if you'd rather group all leadership together.

---

## 4. Featured Project

**Ice in His Veins** — 2nd Place, AQX Data Bowl 2.0

**One-line pitch:**
> A model that tells you which NFL quarterbacks actually get better under pressure, and by how much, instead of trusting the stat everyone already knows lies.

**The story:**
> "Clutch" stats in football get thrown around constantly, but the numbers behind them are usually built on tiny samples. A quarterback might only face a dozen truly high-pressure dropbacks in a season, so a couple of good throws can make him look elite and a couple of bad ones can make him look like he chokes, when really you're just looking at noise dressed up as signal. I wanted to build something that corrects for that instead of reporting the noise like it means something.

**Technical decisions:**
> I pulled 63,555 NFL QB dropbacks from 2023 to 2025 using nflverse and built a 5-tier leverage model that scores every play on how much pressure it actually carries: how close the game is, how tight the score is, urgency, and down-and-distance. Instead of trusting raw completion-percentage-over-expectation in the highest-leverage tier, which is exactly where the sample sizes are smallest and the noise is worst, I applied empirical Bayes shrinkage with 95% confidence intervals per tier. That correction is what mattered most: the raw "clutch" spread looked like an 8.2 point swing, but once you account for how little data actually backs the extreme cases, the real number shrinks to 4.0 points, a 2.03x overstatement in the naive version. I backed the whole analytics engine with an 8-test pytest suite before trusting any of it, then shipped a static React/Vite dashboard on Vercel with zero runtime dependencies so someone could actually explore the results themselves instead of just reading a write-up.

**Stack tags:** Python · nflverse · empirical Bayes · pytest · React · Vite · Vercel

**Demo:** [link to the live dashboard] · [link to the repo]

---

## 5. Other Hackathon Projects

The remaining three, given real weight, not shoved into a generic grid.

> **Under Pressure** — 2nd Place, AQX Data Bowl 1.0
> Modeled soccer players' resilience under pressure using real match data.
> [add the concrete numbers here the same way Ice in His Veins has them, once you have them handy]
> GitHub: [link to repo]

> **Voca** — Award Winner, Ctrl+V Hackathon
> Built for the 50M+ people worldwide living with aphasia. A tap on any of 49 concepts reconstructs into a full spoken sentence, powered by Llama 3.3 70B on Groq with sub-1-second first token, so the pause before a response doesn't break the conversation. Shipped as an installable, offline-capable PWA with service-worker emergency phrases, dual persona profiles, and a WCAG high-contrast mode, because a communication tool only matters if it works when the signal or the screen isn't cooperating.
> GitHub: [link to repo]

> **Palette** — 1st Place, BeanHacks
> Modeled flavor chemistry as a vector space and used deterministic grid search with greedy farthest-point batch coordination to regenerate optimized drink recipes in under 2 seconds per iteration. Replaced the usual heuristic pricing with a fully auditable costing pipeline, every number on screen traces back to explicit arithmetic, not a black box. Deployed on Linux via a Dockerized FastAPI/Uvicorn setup with Groq for inference.
> GitHub: [link to repo]

---

## 6. Skills / Tech Stack

Grouped by what you actually use them for:

**Building AI systems**
> Python, Groq, LangChain, RAG, LLMs, NLP, LLM quantization, model evaluation, prompt/context engineering

**Data & classical ML**
> Pandas, NumPy, scikit-learn, feature engineering, empirical Bayes methods, data pipelines

**Backend & infrastructure**
> FastAPI, Flask, Docker, REST APIs, SSE streaming, SQLite, Supabase, Vercel, Git, Linux

**Frontend**
> React, Vite, HTML/CSS, JavaScript

**Languages**
> Python, Java, C++, JavaScript, SQL

No percentage bars, no proficiency sliders. Just the list, grouped, done.

### Learning Path

> I'm working through this in order: Python, then NLP, then classical ML, then deep learning, then generative AI. Right now I'm strongest in ML and NLP, comfortable with Python for AI and actively sharpening it, currently going back through deep learning from the ground up, and refreshing my generative AI fundamentals. I'd rather show where I actually am in the stack than pretend I've mastered all of it at once.

---

## 7. GitHub Activity

Lead with the contribution graph. A line of framing above it:

> I try to keep something in progress most weeks. Below is what that actually looks like.

Pin whichever of your four hackathon repos has the cleanest README and commit history.

---

## 8. About

> I got into computer science the hard way. I failed the final in my first CS class freshman year. Not a close call, an actual fail. I could have taken that as a sign I picked the wrong major. Instead it became the thing that made me take the subject seriously for the first time, and it's still the story I tell when people ask why I do this.
>
> I'm working through the stack in order, on purpose: Python first, then NLP, then classical ML, then deep learning, then generative AI, each one a prerequisite for actually understanding the next instead of skipping ahead and faking it. I'm also part of Toastmasters, working on public speaking deliberately instead of hoping it improves on its own, because half of shipping a technical project is being able to explain it clearly to someone who wasn't in the room while you built it, whether that's a hackathon judge or an interviewer.
>
> I read a lot about discipline and habit-building, run a consistent morning routine, and try to ship something new most weeks. I'm not trying to collect a resume. I'm trying to get good enough at this that the resume stops being the interesting part.

(Trim if it runs long, but keep the CS I failure line, it's what makes this memorable instead of generic.)

---

## 9. Education

> **University of Texas at Dallas**
> B.S. Computer Science, expected December 2028
> Academic Excellence Scholar, full-ride scholarship, GPA 3.58
> Relevant coursework: Data Structures & Algorithms, Probability & Statistics

---

## 10. Currently Building + Availability

> **Right now:** [whatever you're actually actively building. Not PaperBridge until it exists. If nothing is mid-build right now, it's fine to leave this section out entirely until something is.]
>
> **Open to:** Summer 2027 AI/ML and Data Engineering internships. Based in Texas, open to relocation.

---

## 11. Contact / Resume

> Let's talk. [Email] · [LinkedIn] · [GitHub] · [Download resume, PDF]

No contact form. A direct email link converts better and costs a recruiter nothing.

---

## What changed from the last draft

Cut: PaperBridge (not built), CLAIRO (didn't win, dropped for now), LeakScope (not worth the space next to four real placements), theatre out of About entirely.
Moved up: Experience, now section 3, filled in with your actual ASCEND, Biotech Club, and CyberPatriot numbers from the resume.
Added: a Leadership & Activities section for Toastmasters, a dedicated Learning Path section (Python to NLP to ML to DL to Gen AI), and a GitHub link line under every project so nothing points nowhere.
Featured project locked in: Ice in His Veins, full deep-dive written from your real pipeline decisions.
Still needs your input: numbers for Under Pressure to match the other three, actual GitHub repo links for all four projects, any specifics from Toastmasters (role, contests, a speech that mattered), and the demo video/dashboard links.

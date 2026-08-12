# Boxed Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `index.html` into a bordered, sectioned "boxed" layout (vertical rails + full-width dividers between stacked sections) matching a reference screenshot's structure, while keeping this site's existing IBM Plex Mono font and terminal color palette unchanged.

**Architecture:** Single static site (`index.html` + Tailwind v4 source `src/input.css` compiled to `style.css`). No JS framework, no test runner. All work is direct HTML/CSS edits, each task independently buildable and visually verifiable.

**Tech Stack:** Tailwind CSS v4 (`@tailwindcss/cli`), plain HTML, IBM Plex Mono font. Build: `npm run build` (compiles `src/input.css` → `style.css`, minified). Dev watch: `npm run dev`.

## Global Constraints

- No font change — stays IBM Plex Mono throughout (per spec `docs/superpowers/specs/2026-08-12-boxed-layout-redesign-design.md`).
- No color palette change — stays dark terminal theme (`--color-bg`, `--color-surface`, `--color-border`, `--color-ink`, `--color-muted`, `--color-amber`, `--color-green`, and existing per-role accent hex values already used inline in `index.html`). No lavender/pastel colors.
- No change to existing text content (job bullets, project description, stack tags, etc.) except where a task explicitly adds new markup.
- This project has **no automated test suite**. "Testing" for every task below means: run `npm run build` (must exit 0, confirms Tailwind compiles the new classes with no errors) and then open `index.html` in a browser to visually confirm the change, at both desktop width and a narrow (~375px) mobile width.
- Follow existing code conventions: utility-first Tailwind classes inline in `index.html`; only extract a class into `src/input.css`'s `@layer components` when a pattern repeats 3+ times identically (matches how `.opt`, `.tag`, `.stack-tag` are already defined).
- Commit after each task with `git add index.html src/input.css style.css` (include `style.css` since it's the committed build output).

---

### Task 1: Layout shell — vertical rails + section dividers

**Files:**
- Modify: `index.html:16` (outer wrapper div)
- Modify: `index.html:18` (header)
- Modify: `index.html:63` (about section)
- Modify: `index.html:79` (stack section)
- Modify: `index.html:119` (experience section)
- Modify: `index.html:217` (contracts section)
- Modify: `index.html:245` (projects section)
- Modify: `index.html:283` (stats section)
- Modify: `index.html:304` (footer)

**Interfaces:**
- Produces: every top-level block (header, the 6 `<section>`s, footer) ends up with a bottom divider (`border-b border-border`) and `py-16` vertical rhythm, except footer which only gets `pt-16` (no border — it's the last block, closing the box). Later tasks (2–5) insert new content *inside* these same elements and must reuse this same `py-16 border-b border-border` pattern for anything they add as a new top-level section.
- Consumes: nothing (first task).

- [ ] **Step 1: Add side rails to the outer content column**

In `index.html:16`, change:
```html
<div class="max-w-[46rem] mx-auto px-6 pt-16 pb-24 sm:px-4 sm:pt-10 sm:pb-16">
```
to:
```html
<div class="max-w-[46rem] mx-auto px-6 pt-16 pb-24 sm:px-4 sm:pt-10 sm:pb-16 border-x border-border">
```

- [ ] **Step 2: Give the header a bottom divider instead of margin**

In `index.html:18`, change:
```html
<header class="mb-24">
```
to:
```html
<header class="pb-16 border-b border-border">
```

- [ ] **Step 3: Convert each section's bottom margin to padding + divider**

Apply this same replacement to all 6 sections — change `class="mb-24"` to `class="py-16 border-b border-border"` on each of:
- `index.html:63` — `<section class="mb-24" aria-labelledby="about-heading">`
- `index.html:79` — `<section class="mb-24" aria-labelledby="stack-heading">`
- `index.html:119` — `<section class="mb-24" aria-labelledby="experience-heading">`
- `index.html:217` — `<section class="mb-24" aria-labelledby="contracts-heading">`
- `index.html:245` — `<section class="mb-24" aria-labelledby="projects-heading">`
- `index.html:283` — `<section class="mb-24" aria-labelledby="stats-heading">`

Each becomes e.g. `<section class="py-16 border-b border-border" aria-labelledby="about-heading">`.

- [ ] **Step 4: Simplify the footer — divider now comes from the stats section above it**

In `index.html:304`, change:
```html
<footer class="mt-24 pt-6 border-t border-border">
```
to:
```html
<footer class="pt-16">
```

- [ ] **Step 5: Build and visually verify**

Run: `npm run build`
Expected: exits 0, `style.css` updates with no errors.

Open `index.html` in a browser. Confirm: a visible border runs down the left and right edge of the content column for the full page height, and a horizontal divider line separates every section (header/about/stack/experience/contracts/projects/stats/footer boundary). Check at both desktop and ~375px width — no horizontal scrollbar should appear.

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "Add bordered section dividers and side rails to layout shell"
```

---

### Task 2: Hero avatar placeholder

**Files:**
- Modify: `index.html:18-19` (inside `<header>`, before the prompt line)

**Interfaces:**
- Consumes: `<header class="pb-16 border-b border-border">` from Task 1.
- Produces: nothing consumed by later tasks — self-contained visual addition.

- [ ] **Step 1: Insert placeholder avatar as the first element in the header**

In `index.html`, immediately after the opening `<header class="pb-16 border-b border-border">` tag (line 18) and before the existing `<p class="prompt">...` line, insert:
```html
  <div class="w-16 h-16 rounded-full bg-surface border border-border" aria-hidden="true"></div>
```
So the header now starts:
```html
<header class="pb-16 border-b border-border">
  <div class="w-16 h-16 rounded-full bg-surface border border-border" aria-hidden="true"></div>
  <p class="prompt"><span class="prompt__user">ronssij</span>...
```

- [ ] **Step 2: Add spacing below the avatar**

Add `mt-6` to the prompt line so it doesn't sit flush against the avatar. Change:
```html
<p class="prompt">
```
to:
```html
<p class="prompt mt-6">
```

- [ ] **Step 3: Build and visually verify**

Run: `npm run build`
Expected: exits 0.

Open in browser: a 64px empty circle (dark surface, subtle border) appears above the `ronssij@github` prompt line, top-left of the header, with visible gap beneath it.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Add placeholder avatar circle to hero"
```

---

### Task 3: `whoami` section — two-column layout, placeholder image, repeated contacts

**Files:**
- Modify: `index.html:63-77` (the `about-heading` section)

**Interfaces:**
- Consumes: `<section class="py-16 border-b border-border" aria-labelledby="about-heading">` from Task 1. Reuses the `.opt` / `.opt__icon` classes already defined in `src/input.css` (no CSS changes needed).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Replace the about section body**

Replace `index.html:63-77` (the entire `about-heading` section, from `<section class="py-16 border-b border-border" aria-labelledby="about-heading">` through its closing `</section>`) with:

```html
    <section class="py-16 border-b border-border" aria-labelledby="about-heading">
      <p class="eyebrow">// about</p>
      <h2 id="about-heading" class="section__heading">whoami</h2>

      <div class="mt-6 grid gap-8 sm:grid-cols-[1fr_14rem] sm:items-start">
        <div>
          <p class="about mt-0">
            I'm a <span class="font-semibold text-[#e0a458]">Senior Full-Stack Developer</span> with <span class="font-semibold text-[#6fae82]">8+ years of experience</span> building scalable web
            applications and APIs. I specialize in PHP and Laravel, with strong experience in React,
            Vue.js, and modern web technologies.
          </p>
          <p class="about mt-4">
            I enjoy solving complex problems, designing scalable systems, refactoring legacy code, and
            turning ideas into reliable production-ready products. Over the years, I've worked with
            local and international teams, leading projects, mentoring developers, and contributing to
            everything from MVPs to enterprise applications.
          </p>

          <nav class="mt-6 flex flex-col gap-2" aria-label="Contact">
            <a class="opt [--icon-color:#e7e5df]" href="https://github.com/ronssij" target="_blank" rel="noopener">
              <span class="opt__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/></svg></span>
              --github
            </a>
            <a class="opt [--icon-color:#0A66C2]" href="https://www.linkedin.com/in/cj-ronxel/" target="_blank" rel="noopener">
              <span class="opt__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z"/></svg></span>
              --linkedin
            </a>
            <a class="opt [--icon-color:#EA4335]" href="mailto:ronssij@gmail.com">
              <span class="opt__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg></span>
              --email
            </a>
          </nav>
        </div>

        <div class="bg-surface border border-border rounded-md aspect-[4/3] w-full" aria-hidden="true"></div>
      </div>
    </section>
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Expected: exits 0.

Open in browser at desktop width: paragraphs + a `--github` / `--linkedin` / `--email` link list sit on the left, an empty bordered placeholder box sits on the right, roughly `14rem` wide. At ~375px width: image box stacks below the text (single column).

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "Add two-column layout with placeholder image and repeated contacts to whoami section"
```

---

### Task 4: Experience — compact 3-card summary row

**Files:**
- Modify: `src/input.css` (add `.icon-diamond` component)
- Modify: `index.html:121-123` (inside the `experience-heading` section, before the existing detailed list)

**Interfaces:**
- Consumes: `<section class="py-16 border-b border-border" aria-labelledby="experience-heading">` from Task 1. Reuses the per-role accent hex values already present in the detailed list below (`#e0a458` Webee Labs, `#6fae82` Appetiser Apps, `#6f9ceb` David Venne IT).
- Produces: `.icon-diamond` CSS class in `src/input.css`, available for reuse if a future section needs the same rotated-square icon shape.

- [ ] **Step 1: Add the `.icon-diamond` component to `src/input.css`**

In `src/input.css`, inside the `@layer components { ... }` block, add (e.g. after the `.pill--version` rule around line 72):
```css
  .icon-diamond {
    @apply inline-block w-9 h-9 rotate-45 rounded-md border-2;
  }
```

- [ ] **Step 2: Insert the summary row into the experience section**

In `index.html`, between the section heading and the existing detailed list — i.e. immediately after line 121 (`<h2 id="experience-heading" class="section__heading">log</h2>`) and before line 123 (`<ul class="mt-6 border-t border-border">`) — insert:

```html
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="border border-border rounded-md p-4">
          <span class="icon-diamond border-[#e0a458] text-[#e0a458]"></span>
          <p class="mt-4 font-semibold text-ink">Technical Architect</p>
          <p class="text-sm text-muted">Webee Labs</p>
          <p class="mt-2 text-xs text-muted">Nov 2025 – Mar 2026</p>
        </div>
        <div class="border border-border rounded-md p-4">
          <span class="icon-diamond border-[#6fae82] text-[#6fae82]"></span>
          <p class="mt-4 font-semibold text-ink">Full Stack Web Developer</p>
          <p class="text-sm text-muted">Appetiser Apps</p>
          <p class="mt-2 text-xs text-muted">Dec 2019 – Jul 2026</p>
        </div>
        <div class="border border-border rounded-md p-4">
          <span class="icon-diamond border-[#6f9ceb] text-[#6f9ceb]"></span>
          <p class="mt-4 font-semibold text-ink">Full Stack Web Developer</p>
          <p class="text-sm text-muted">David Venne IT</p>
          <p class="mt-2 text-xs text-muted">Jan 2021 – Apr 2021</p>
        </div>
      </div>
```

- [ ] **Step 3: Build and visually verify**

Run: `npm run build`
Expected: exits 0, `.icon-diamond` rule appears in compiled `style.css`.

Open in browser: 3 bordered cards in a row (desktop) each showing a small rotated-square outline icon (amber, green, blue matching each role's existing accent color), role title, company, and date range — with the existing detailed bulleted job list unchanged directly below. At ~375px width: cards stack to a single column.

- [ ] **Step 4: Commit**

```bash
git add index.html src/input.css style.css
git commit -m "Add compact 3-card experience summary row"
```

---

### Task 5: New "Knowledge & Growth" timeline section

**Files:**
- Modify: `index.html:300-302` (insert new `<section>` after the stats section, before `</main>`)

**Interfaces:**
- Consumes: the `py-16 border-b border-border` section pattern from Task 1.
- Produces: nothing consumed by later tasks (last content section).

- [ ] **Step 1: Insert the new section**

In `index.html`, immediately after the stats section's closing `</section>` (line 300) and before `</main>` (line 302), insert:

```html
    <section class="py-16 border-b border-border" aria-labelledby="growth-heading">
      <p class="eyebrow">// growth</p>
      <h2 id="growth-heading" class="section__heading">knowledge</h2>

      <ul class="mt-6 border-t border-border">
        <li class="py-4 border-b border-border flex items-baseline justify-between gap-4">
          <div>
            <p class="font-semibold text-ink">[Bachelor's Degree] — [Institution]</p>
            <p class="text-sm text-muted">[Major / field of study]</p>
          </div>
          <span class="text-muted text-sm shrink-0">[20XX – 20XX]</span>
        </li>
        <li class="py-4 border-b border-border flex items-baseline justify-between gap-4">
          <div>
            <p class="font-semibold text-ink">[Award / Recognition]</p>
            <p class="text-sm text-muted">[Short description]</p>
          </div>
          <span class="text-muted text-sm shrink-0">[20XX]</span>
        </li>
        <li class="py-4 flex items-baseline justify-between gap-4">
          <div>
            <p class="font-semibold text-ink">[Teaching / other role]</p>
            <p class="text-sm text-muted">[Short description]</p>
          </div>
          <span class="text-muted text-sm shrink-0">[20XX – 20XX]</span>
        </li>
      </ul>
    </section>
```

Note: the bracketed text (`[Bachelor's Degree]`, `[20XX – 20XX]`, etc.) is intentional placeholder content for the site owner to fill in with real education/award data later — it is not a plan gap.

- [ ] **Step 2: Build and visually verify**

Run: `npm run build`
Expected: exits 0.

Open in browser: a new "knowledge" section appears after "uptime" and before the footer, with 3 rows each showing bracketed placeholder title/subtitle on the left and a bracketed placeholder date right-aligned, divided by thin lines, with a full section divider above the footer.

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "Add placeholder Knowledge & Growth timeline section"
```

---

### Task 6: Final full-page pass

**Files:**
- None (verification only, plus opportunistic touch-ups if Task 1–5 review surfaces spacing issues)

**Interfaces:**
- Consumes: everything from Tasks 1–5.
- Produces: nothing (terminal task).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: exits 0, no warnings.

- [ ] **Step 2: Full-page visual review**

Open `index.html` in a browser. Scroll the entire page at desktop width, then at ~375px width. Confirm:
- Left/right rail borders run continuously from top of header to bottom of footer.
- A horizontal divider separates every block: header→about→stack→experience→contracts→projects→stats→knowledge→footer.
- Avatar placeholder, whoami image placeholder, experience summary cards, and knowledge section all render without layout overflow or horizontal scrollbars at either width.
- Existing typewriter animation and cursor blink in the header still play on load.
- All existing links (github/linkedin/sponsor/email in header and footer, repo/packagist/releases in the project card) are unchanged and still point to their original targets.

- [ ] **Step 3: Commit (only if touch-ups were needed)**

```bash
git add index.html src/input.css style.css
git commit -m "Fix spacing/overflow issues found in full-page review"
```

If no touch-ups were needed, skip this commit — Task 5's commit is the final state.

# Boxed layout redesign — design spec

Date: 2026-08-12

## Goal

Adopt the sectioned, bordered "boxed" layout structure from a reference portfolio screenshot (Bruno Cardozo's site) while keeping this site's existing visual identity: IBM Plex Mono, dark terminal palette, amber/green/per-role accent colors, prompt-style header/footer. Layout structure only — no font or color-system swap.

## Reference

Screenshot supplied by user: dark portfolio with a bordered content column (thin vertical rail lines left/right), full-width horizontal dividers between stacked sections, circular avatar, two-column bio block with side image, a compact 3-card "real world experience" row (icon + role + company + dates), project card grid, and a bottom timeline list (icon + title/subtitle + right-aligned date).

## Scope

### 1. Layout shell

- Content column keeps `max-w-[46rem] mx-auto` sizing.
- Add left/right vertical rail borders framing the column (new wrapper, e.g. `.shell` with `border-x border-border`).
- Each top-level `<section>` gets a full-width top divider (`border-t border-border`) and consistent vertical padding, producing the stacked-panel look from the screenshot. Header and footer participate in the same rail (already bordered via existing `mt-24 pt-6 border-t`).
- No change to `max-w`, breakpoints, or responsive behavior beyond padding adjustments needed for the rail.

### 2. Hero (header)

- Add a placeholder circular avatar (empty `div`, ~72px, `rounded-full bg-surface border border-border`) above the existing prompt line / typewriter name.
- All existing hero content (prompt line, name, titles, location, status tag, contact nav) unchanged in content and order.

### 3. `whoami` (about) section

- Becomes two-column on `sm+`: text (existing two paragraphs) on the left, a placeholder image block (`bg-surface border border-border rounded-md`, fixed aspect box) on the right. Single column stacked on mobile.
- Below the paragraphs, add a compact repeated contact list mirroring the screenshot's "Follow on GitHub / Follow on LinkedIn / dev@…" pattern — reuses the same `.opt`-style link markup already used in the header nav, just a second instance scoped to this section. Links: GitHub, LinkedIn, email (same targets as header).

### 4. `stack` section

- No content change. Gets the new section divider/padding treatment only.

### 5. `experience` (log) section

- New compact summary row inserted above the existing detailed list: 3 cards, each showing a small rotated-square/diamond icon (colored via the role's existing accent hex), role title, company, and date range. No bullets in these cards.
- Cards pull from the 3 most recent roles already in the markup: Webee Labs (Technical Architect, amber `#e0a458`), Appetiser Apps (Full Stack Web Developer, green `#6fae82`), David Venne IT (Full Stack Web Developer, blue `#6f9ceb`) — colors match what's already assigned to each role in the existing detailed list.
- Existing detailed bulleted list (all 7 roles) stays unchanged below the new summary row.

### 6. `contracts` section

- No content change. Divider/padding treatment only.

### 7. `projects` (shipped) section

- No content change. Keep the existing diff-line project card (more information-dense than the screenshot's plain description card) — do not switch to the screenshot's simpler 2-card grid. Divider/padding treatment only.

### 8. `stats` (uptime) section

- No content change. Divider/padding treatment only.

### 9. New: Knowledge & Growth section

- New section after `stats`, before footer. Timeline-style rows: icon + title + subtitle on the left, date right-aligned — matching the screenshot's education/achievement list.
- Content is placeholder, explicitly for the user to fill in later (no real education/award data exists in the current site):
  - "Bachelor's Degree — [Institution]" · [dates]
  - "[Award / Recognition]" · [date]
  - "[Teaching / other role]" · [dates]
- Placeholder text should read clearly as placeholder (bracketed fields) so it's obvious what needs editing, not mistaken for real content.

### 10. Footer

- No change.

## Out of scope

- No font change (stays IBM Plex Mono).
- No color palette change (stays amber/green/dark terminal theme, no lavender).
- No change to project card style (screenshot's simpler grid not adopted).
- No real education/award content — placeholder only.
- No JS behavior changes; purely HTML structure + CSS (Tailwind v4 via `src/input.css` → `style.css` build).

## Testing

- Visual check in browser at desktop and mobile (`sm`) breakpoints after build (`npm run build`).
- Confirm existing animations (typewriter, cursor blink) still fire.
- Confirm all existing links/hrefs unchanged.

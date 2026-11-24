# Trail × Topo Redesign — Design

Date: 2026-11-24

## Intent

Portfolio for CJ Ronxel Cabug-os (Senior Laravel / full-stack engineer, tech lead, 10 yrs).
**Audience: founders who need an MVP built.** CJ is actively looking for work.
After ~1 minute a founder should (1) believe CJ can take an idea to a shipped product and
(2) click "Let's build your MVP". The site itself should be the first proof: playful, polished,
animated, memorable ("impress me").

## Goals
- Availability impossible to miss: "Available for new projects" badge in hero + nav.
- One primary CTA everywhere: "Let's build your MVP" → contact (mailto + LinkedIn).
- Projects are the proof, so they sit right after the hero.
- New "How I'd build your MVP" process section that answers founders' fear of the process.
- Animation across every section and both pages, each with a reason tied to the concept.

## Non-goals
- No framework, no CMS, no build step beyond the existing Tailwind CLI.
- No new content invented (no fake testimonials, no fake metrics, no pricing).

## Anti-goals
- Gimmick that hides content or slows reading. Content must be readable with JS off and
  with `prefers-reduced-motion: reduce` (all motion disabled or reduced to fades).
- Jank on mobile. No scroll-jacking. Native scrolling only.

## Constraints
- Static GitHub Pages site: `index.html`, `projects.html`, `src/input.css` → `style.css` (Tailwind v4 CLI).
- Clean extensionless internal links (`/projects`) stay.
- All existing content kept (hero copy, about, 9 experience entries with logos, stack + years,
  all projects with links/store badges, contact links incl. GitHub Sponsors, Davao clock).

## Approaches considered
- **A. Nautical "I ship software"**: ocean metaphor. Dropped when the palette changed to earthy; CJ runs road and trail.
- **B. MVP blueprint lab**: schematics that draw themselves.
- **C. Current boxed/terminal layout re-skinned**: rejected, too safe.
- **Picked: Trail × Topo map** (A's playful journey re-themed to trail running, plus B).
  A topographic map is the blueprint of the terrain. Trail running is CJ's real hobby, and
  "idea → MVP → launch" maps naturally onto start line → climb → finish.

## Palette
Charcoal + clay (2c3639-3f4e4f-a27b5c-dcd7c9) was tried and reverted. Forest + sand below is current; light-mode pop is `#7D5A2D` for contrast.

Later changes: Kit list became three gear packs (Backend/Frontend/Tooling) with 10-segment year meters;
"Off the keyboard" became its own section (road strip + career-summary watch card holding the stats);
/projects became a "Race results" board (numbered rows, tally, filters, live count).

### Forest + sand (current)
| Token | Dark (default) | Light |
|---|---|---|
| bg | `#1A3636` forest | `#EFE5D3` sand-paper |
| surface | `#213F3E` | `#F8F2E7` |
| moss | `#40534C` | `#40534C` |
| sage | `#677D6A` | `#677D6A` |
| ink | `#F0E6D4` | `#1A3636` |
| muted | `#A9B7A4` | `#4A5E56` |
| pop (CTA, runner dot, stamps) | `#D6BD98` sand | `#A8783F` burnt sand |
Race-bib cards use paper `#F3EAD9` with forest ink in both themes.
Theme toggle and the "first visit fades light→dark" behavior are kept.

## Typography (builder's call)
Bricolage Grotesque for display and body. IBM Plex Mono for labels, KM markers, tags, and the clock.

## Page: index (section order)
1. **Nav**: mountain mark, name, links (Work, Process, About, Experience, Kit, Contact),
   pulsing "Available" pill, Davao clock, theme toggle. Compacts and blurs on scroll.
2. **Hero**: drifting topo contour lines (pointer parallax), headline words rise in, an elevation
   profile draws itself and a sand runner dot runs along it (START → MVP → LAUNCH). Footprints
   trail the cursor inside the hero (fine pointers only). Availability badge, CTA "Let's build your MVP",
   secondary "See finished races".
3. **Course gauge** (fixed right, desktop): marathon distance KM 0 → 42.2 tied to scroll,
   plus the current section label.
4. **Finished races (projects)**: race-bib cards (pin holes, bib number, brand-colored strip,
   "FINISHED ✓" stamp that slams in on reveal, pointer tilt). 6 featured, then a link to `/projects`.
5. **How I'd build your MVP (process)**: a dashed trail route draws with scroll through 4 stations:
   Start line (scope), Aid station (blueprint), The climb (build), Finish line (launch).
   Station icons draw in as the route reaches them.
6. **About, "Runner's log"**: the existing about copy, count-up stats (10+ yrs, 12 products shipped,
   9 teams), and a line about road and trail running.
7. **Experience, "Race history"**: the existing 9 entries as native `<details>` rows (open by default)
   that slide in on reveal.
8. **Stack, "Kit list"**: chips with year bars that fill on reveal and wiggle on hover.
9. **Contact, "Finish line"**: finish tape that snaps when it scrolls into view or on hover/tap,
   a big CTA, and email/LinkedIn/GitHub/Sponsor links. Footer with ©, Davao, and the clock.

## Page: projects
Same nav and footer. Header "Every finished race" with the contour band. All 12 projects as bib cards,
tech filter chips (`hidden` toggled, wrapped in `document.startViewTransition` when available).
Cross-document View Transitions between pages.

## Motion system
- One `IntersectionObserver` adds `.is-in` to `[data-reveal]` elements; CSS defines variants
  (`rise`, `slide-l`, `slide-r`, `draw`, `drop`) with `--i` stagger index.
- Scroll-linked effects (depth gauge, route path) use CSS `animation-timeline` with a JS
  fallback only if trivial; otherwise static in unsupported browsers.
- Pointer effects (wave parallax, card tilt) only on `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` → no transforms/loops; reveals become instant.
- Easing: one springy curve `cubic-bezier(.34,1.56,.64,1)` for playful pops, `ease-out` for reveals.

## Left to the builder
- Exact copy for process steps (short, founder-facing, factual).
- Responsive breakpoints details; mobile must stay single-column with no horizontal scroll.
- Removing now-unused CSS (amber, corner-mark, terminal styles).
- Exact SVG art (contours, profile, bib, tape, station icons): inline, hand-built.

## Verification
- `npm run build`, open both pages in browser at desktop + mobile widths, both themes,
  reduced-motion emulation; check no console errors and every link from the old site still present.

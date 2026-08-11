# Portfolio site design

## Purpose

A low-key personal/open-source presence for CJ Ronxel Cabug-os (GitHub: ronssij), deployed at `ronssij.github.io` via GitHub Pages. Not aimed at recruiters or clients — just a public dev identity that highlights open-source work, starting with `filament-simple-draft`.

## Stack

Plain static HTML + CSS. No build step, no JS framework, no CMS. GitHub Pages serves `index.html` from the repo root directly.

## Structure

Single page, four sections:

1. **Hero** — name, short tagline, links to GitHub profile and email.
2. **Projects** — card(s) for open-source work. Initially just `filament-simple-draft`: description, category tags (Forms, Action), links to the GitHub repo and Packagist page.
3. **About** — 2-3 sentence bio, low-key tone.
4. **Footer** — GitHub, email, GitHub Sponsors link.

## Visual direction

Dark, minimal, code-adjacent aesthetic (monospace accents for headings/tags) — matches the developer audience.

## Out of scope

Blog, CMS, contact form, analytics, build tooling, multi-page routing. Can be added later as separate specs if needed.

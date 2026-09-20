# SkillDNA Core — Step 2 Hardening Results

Date: 2026-09-20

## Changes made

- Rescaled each skill score against the actual reachable minimum/maximum of the 10-question signal system, removing the previous effective score floor.
- Switched career similarity to centered cosine similarity around the neutral 0.5 skill midpoint, combined with 35% profile proximity.
- Kept matching deterministic; no random jitter or LLM ranking.
- Added deterministic diversity constraints: top-3 results remain category-diverse and no more than two results share the same archetype.
- Added role-specific, explainable skill nudges for a broader set of careers, with extra differentiation for creative, people/education, domain, and built-environment roles.
- Replaced the invalid Architect `spatial` nudge with valid canonical skills.
- Hardened answer validation against non-string IDs, prototype-property inputs, and oversized answer arrays.
- Hardened career matching against missing/invalid/NaN/infinite/out-of-range skill scores and negative/non-integer limits.
- Updated the API contract and methodology description to match the implementation.

## Verification

- `npm test` — PASS
- `npm run acceptance` — PASS
- Acceptance suite — 57/57 tests passed
- Catalogue — 12 skills / 10 questions / 156 careers
- Career vectors — all canonical skill IDs and values in [0,1]
- Determinism — PASS
- Evidence — answer-linked and question IDs validated
- Default top-3 — distinct categories and at most two careers per archetype

## 3,000 randomized probe

A deterministic 3,000-answer-set probe was run after the Step 2 data/matching changes.

- Distinct careers observed as #1: 38/156
- Top-3 all-same-archetype cases: 0/3000

The displayed match percentage is rounded to one decimal place, so displayed-score ties can still occur even when the underlying career profiles differ. No random tie-breaking was introduced.

## Scope decision

The remaining career catalogue is intentionally deterministic and transparent. The project does not use arbitrary random jitter, hidden LLM ranking, or opaque personalization. Further career-vector refinement can be done later as a data-quality pass, but the core is ready for frontend integration.

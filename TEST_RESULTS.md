# TEST_RESULTS.md

Generated: 2026-09-20T06:57:03Z

## npm test (unit tests)

```
SkillDNA core tests: PASS
Skills: 12 | Questions: 10 | Careers: 156
Top matches: Clinical Data Manager (96.2) | Lab Manager (96.2) | Brand Strategist (94.1)
```

## npm run acceptance (acceptance tests)

```

[1] Catalogue integrity
  ✓ 12 skills defined
  ✓ SKILL_IDS matches SKILLS
  ✓ 10 questions defined
  ✓ QUESTION_MAP covers all question ids
  ✓ every question has ≥ 2 options
  ✓ every option has required fields
  ✓ every option signal references only known skill ids
  ✓ 156 careers defined
  ✓ every career has required fields
  ✓ career skill vectors only reference known skill ids
  ✓ career skill values are in [0,1]
  ✓ career ids are unique

[2] validateAnswers
  ✓ rejects non-array
  ✓ rejects empty array
  ✓ rejects unknown questionId
  ✓ rejects unknown optionId
  ✓ rejects duplicate questionId
  ✓ accepts a complete valid answer set

[3] scoreSkills
  ✓ throws on invalid answers
  ✓ returns scores for all 12 skills
  ✓ all scores are in [0, 100]
  ✓ rankedSkills contains all 12 skill ids
  ✓ rankedSkills is sorted descending by score
  ✓ answerBreakdown has one entry per question
  ✓ answerBreakdown entries have required fields
  ✓ different answer sets produce different score profiles

[4] matchCareers
  ✓ returns requested number of results
  ✓ returns 0 results when limit=0
  ✓ returns all 156 careers when limit exceeds catalogue
  ✓ results are sorted descending by matchScore
  ✓ matchScore is within [0, 100]
  ✓ matchComponents present and normalised
  ✓ diverse=true (default) returns at most one result per category
  ✓ diverse=false may return multiple from same category
  ✓ different answer sets yield different top-3 career sets

[5] buildEvidence
  ✓ returns one evidence block per career
  ✓ every evidence block has ≥ 1 evidence item
  ✓ evidence items have all required fields
  ✓ evidence questionIds reference actual answer ids
  ✓ no duplicate questionId within a single career evidence block
  ✓ supportingSkills are valid skill ids
  ✓ supportingSkills has ≥ 1 entry

[6] analyze (full pipeline)
  ✓ returns correct top-level shape
  ✓ version is 1.0.0
  ✓ methodology has required keys
  ✓ skillProfile has scores and rankedSkills
  ✓ returns 3 careers by default
  ✓ career objects have all contract-required fields
  ✓ default analyze returns 3 distinct categories
  ✓ analyze with diverse=false may bundle same category
  ✓ analyze with custom limit
  ✓ career evidence always has ≥ 1 item
  ✓ evidence items reference only answered questions
  ✓ no duplicate questions in one career evidence list
  ✓ matchScore decreasing or equal across result.careers
  ✓ throws on invalid answers
  ✓ deterministic: same answers always yield same result

──────────────────────────────────────────────
✓ All 57 acceptance tests passed.

```

## Summary

| Suite | Tests | Result |
|-------|-------|--------|
| Unit (test.js) | 7 assertions | ✅ PASS |
| Acceptance (acceptance.mjs) | 57 tests | ✅ PASS |

## What changed from the original

### src/matching.js
- Added `diverse` parameter (default `true`) to `matchCareers()`
- When `diverse=true`, enforces at most one result per career category in the
  returned top-N list. This prevents the frontend receiving three near-identical
  careers from the same domain (e.g. three Healthcare roles) when the skill
  profile closely matches one cluster.
- Falls back to same-category careers only if fewer than `limit` distinct
  categories exist in the full ranked list.
- Final selection is re-sorted by matchScore so the list remains descending.

### src/evidence.js
- Rewrote candidate selection to enforce **one evidence item per question**
  (previously the dedup guard could be bypassed when `selected.length < 2`).
- Now collects the single highest-contributing (signal × career-weight) skill
  per question, then selects the top-3 questions globally.
- Added progressive fallback thresholds (0.05 → 0.02 → 0.0) so every career
  always returns ≥ 1 evidence item regardless of answer profile.

### src/scoring.js
- No logic changes; improved inline documentation and formatting.

### src/analyze.js
- Now accepts an optional `options` object: `{ limit, diverse }`.
- Passes `diverse` through to `matchCareers()`.

### src/index.js
- Formatting only.

### package.json
- Added `"acceptance": "node test/acceptance.mjs"` to scripts.

### test/acceptance.mjs (new)
- 57 acceptance tests covering:
  - Catalogue integrity (skills, questions, careers)
  - `validateAnswers` error cases
  - `scoreSkills` output shape, bounds, and determinism
  - `matchCareers` limit, diversity, sorting, and bounds
  - `buildEvidence` completeness, dedup, and fallback
  - `analyze` full pipeline shape and contract compliance

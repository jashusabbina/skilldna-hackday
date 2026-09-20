# SkillDNA Core Engine

Hackathon-ready deterministic engine for **SkillDNA — Your Hidden Talent X-Ray**.

## What is included

- 12 hidden skills
- 10 situational questions with option-level skill signals
- deterministic 0–100 skill scoring
- 156 structured career profiles
- deterministic career ranking
- answer-linked evidence for the top 3 careers
- zero runtime dependencies
- simple API contract for a frontend/backend wrapper

## Run

```bash
npm test
```

## Use from JavaScript

```js
import { QUESTIONS, analyze } from './src/index.js';

const answers = QUESTIONS.map(q => ({
  questionId: q.id,
  optionId: q.options[0].id
}));

const result = analyze(answers);
console.log(result.careers);
```

## Scoring model

Each option contains signed signals for the skills it measures. The selected signal is normalized against the strongest available signal for that skill across the question's options. Skill scores are then mapped to 0–100 with a neutral midpoint of 50.

## Career matching model

User skill scores are normalized to 0–1. Every career contains a 12-dimensional skill profile. Matching uses:

`match = 0.65 × cosine_similarity + 0.35 × profile_proximity`

The top 3 are selected by deterministic descending score, with title as a stable tie-breaker.

## Evidence model

For each surfaced career, the evidence engine scores:

`answer contribution = selected answer signal × career skill weight`

It returns the strongest positive answer-to-skill links. This makes every recommendation traceable to the user's own responses.

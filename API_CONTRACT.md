# SkillDNA Analysis API Contract

## POST /api/analyze

### Request

```json
{
  "answers": [
    { "questionId": "q1", "optionId": "a" },
    { "questionId": "q2", "optionId": "b" },
    { "questionId": "q3", "optionId": "a" },
    { "questionId": "q4", "optionId": "d" },
    { "questionId": "q5", "optionId": "a" },
    { "questionId": "q6", "optionId": "d" },
    { "questionId": "q7", "optionId": "b" },
    { "questionId": "q8", "optionId": "a" },
    { "questionId": "q9", "optionId": "b" },
    { "questionId": "q10", "optionId": "d" }
  ]
}
```

Exactly one option must be selected for each of the 10 questions. Skill scores are deterministic 0–100 values rescaled against the reachable range of the question signals. Career matching uses centered cosine similarity plus profile proximity; the LLM does not rank careers.

### Response shape

```json
{
  "version": "1.0.0",
  "methodology": {
    "scoring": "deterministic weighted situational signals",
    "matching": "65% centered cosine similarity + 35% profile proximity; deterministic diversity constraints",
    "llmRole": "explanation only; does not determine scores or rankings"
  },
  "skillProfile": {
    "scores": {
      "analytical_thinking": 82.5
    },
    "rankedSkills": ["analytical_thinking"]
  },
  "careers": [
    {
      "id": "career_001",
      "title": "Data Scientist",
      "category": "Data & Analytics",
      "description": "...",
      "matchScore": 91.4,
      "matchComponents": {
        "cosineSimilarity": 0.923,
        "profileProximity": 0.882
      },
      "supportingSkills": ["analytical_thinking", "problem_solving"],
      "evidence": [
        {
          "questionId": "q5",
          "question": "...",
          "answer": "...",
          "evidence": "You chose to audit data quality, transformations, and assumptions.",
          "skill": "analytical_thinking",
          "userSkillScore": 82.5,
          "contribution": 0.92
        }
      ]
    }
  ]
}
```

## LLM boundary

Pass the deterministic response to the LLM and ask it only to:

- explain the already-computed result in natural language;
- summarize the strongest evidence;
- suggest learning/exploration actions tied to the surfaced career;
- answer follow-up questions without changing the career ranking.

The LLM must never receive permission to overwrite `skillProfile.scores`, `careers`, `matchScore`, or evidence.

import assert from 'node:assert/strict';
import { analyze, CAREER_COUNT, QUESTIONS, SKILLS, scoreSkills, matchCareers } from '../src/index.js';

assert.equal(SKILLS.length, 12, 'Expected 12 skills');
assert.equal(QUESTIONS.length, 10, 'Expected 10 questions');
assert.ok(CAREER_COUNT >= 150, `Expected 150+ careers, got ${CAREER_COUNT}`);

const answers = QUESTIONS.map((q, i) => ({
  questionId: q.id,
  optionId: q.options[i % q.options.length].id
}));

const scored = scoreSkills(answers);
assert.equal(Object.keys(scored.scores).length, 12);
for (const value of Object.values(scored.scores)) {
  assert.ok(value >= 0 && value <= 100, 'Skill score must be 0..100');
}

const matches = matchCareers(scored.scores, 3);
assert.equal(matches.length, 3);
assert.ok(matches[0].matchScore >= matches[1].matchScore);
assert.ok(matches[1].matchScore >= matches[2].matchScore);

const result = analyze(answers);
assert.equal(result.careers.length, 3);
for (const career of result.careers) {
  assert.ok(career.evidence.length >= 1, 'Each career needs answer-linked evidence');
  assert.ok(career.supportingSkills.length >= 1, 'Each career needs supporting skills');
}

console.log('SkillDNA core tests: PASS');
console.log(`Skills: ${SKILLS.length} | Questions: ${QUESTIONS.length} | Careers: ${CAREER_COUNT}`);
console.log('Top matches:', result.careers.map(c => `${c.title} (${c.matchScore})`).join(' | '));

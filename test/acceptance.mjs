/**
 * SkillDNA Core – Acceptance Tests
 *
 * Covers the full public API surface and the observable behaviour guaranteed
 * to frontend consumers by API_CONTRACT.md.
 *
 * Run with: node test/acceptance.mjs
 */

import assert from 'node:assert/strict';
import {
  SKILLS, SKILL_IDS,
  QUESTIONS, QUESTION_MAP,
  CAREERS, CAREER_COUNT,
  validateAnswers, scoreSkills,
  matchCareers, buildEvidence,
  analyze
} from '../src/index.js';

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failures.push({ name, message: err.message });
    failed++;
  }
}

// ─── helpers ───────────────────────────────────────────────────────────────

const allOptionAnswers = optIdx =>
  QUESTIONS.map(q => ({
    questionId: q.id,
    optionId: q.options[optIdx % q.options.length].id
  }));

const balancedAnswers = () =>
  QUESTIONS.map((q, i) => ({
    questionId: q.id,
    optionId: q.options[i % q.options.length].id
  }));

// ─── Catalogue integrity ───────────────────────────────────────────────────
console.log('\n[1] Catalogue integrity');

test('12 skills defined', () => {
  assert.equal(SKILLS.length, 12);
});

test('SKILL_IDS matches SKILLS', () => {
  assert.deepEqual(SKILL_IDS, SKILLS.map(s => s.id));
});

test('10 questions defined', () => {
  assert.equal(QUESTIONS.length, 10);
});

test('QUESTION_MAP covers all question ids', () => {
  for (const q of QUESTIONS) {
    assert.ok(QUESTION_MAP[q.id], `Missing QUESTION_MAP entry for ${q.id}`);
  }
});

test('every question has ≥ 2 options', () => {
  for (const q of QUESTIONS) {
    assert.ok(q.options.length >= 2, `${q.id} has ${q.options.length} options`);
  }
});

test('every option has required fields', () => {
  for (const q of QUESTIONS) {
    for (const o of q.options) {
      assert.ok(o.id,       `${q.id} option missing id`);
      assert.ok(o.text,     `${q.id}/${o.id} missing text`);
      assert.ok(o.evidence, `${q.id}/${o.id} missing evidence`);
      assert.ok(o.signals && typeof o.signals === 'object', `${q.id}/${o.id} missing signals`);
    }
  }
});

test('every option signal references only known skill ids', () => {
  const skillSet = new Set(SKILL_IDS);
  for (const q of QUESTIONS) {
    for (const o of q.options) {
      for (const key of Object.keys(o.signals)) {
        assert.ok(skillSet.has(key), `Unknown skill "${key}" in ${q.id}/${o.id}`);
      }
    }
  }
});

test('156 careers defined', () => {
  assert.equal(CAREER_COUNT, 156);
  assert.equal(CAREERS.length, 156);
});

test('every career has required fields', () => {
  for (const c of CAREERS) {
    assert.ok(c.id,          `Career missing id`);
    assert.ok(c.title,       `${c.id} missing title`);
    assert.ok(c.category,    `${c.id} missing category`);
    assert.ok(c.description, `${c.id} missing description`);
    assert.ok(c.skills && typeof c.skills === 'object', `${c.id} missing skills vector`);
  }
});

test('career skill vectors only reference known skill ids', () => {
  const skillSet = new Set(SKILL_IDS);
  for (const c of CAREERS) {
    for (const key of Object.keys(c.skills)) {
      assert.ok(skillSet.has(key), `Unknown skill "${key}" in career ${c.id}`);
    }
  }
});

test('career skill values are in [0,1]', () => {
  for (const c of CAREERS) {
    for (const [sk, val] of Object.entries(c.skills)) {
      assert.ok(val >= 0 && val <= 1, `${c.id}.${sk} = ${val} is outside [0,1]`);
    }
  }
});

test('career ids are unique', () => {
  const ids = CAREERS.map(c => c.id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate career ids found');
});

// ─── validateAnswers ──────────────────────────────────────────────────────
console.log('\n[2] validateAnswers');

test('rejects non-array', () => {
  assert.equal(validateAnswers(null).valid, false);
  assert.equal(validateAnswers('string').valid, false);
  assert.equal(validateAnswers(42).valid, false);
});

test('rejects empty array', () => {
  const r = validateAnswers([]);
  assert.equal(r.valid, false);
  assert.ok(r.issues.length > 0);
});

test('rejects unknown questionId', () => {
  const answers = allOptionAnswers(0);
  answers[0] = { questionId: 'q99', optionId: 'a' };
  const r = validateAnswers(answers);
  assert.equal(r.valid, false);
  assert.ok(r.issues.some(i => i.includes('q99')));
});

test('rejects unknown optionId', () => {
  const answers = allOptionAnswers(0);
  answers[0] = { questionId: 'q1', optionId: 'z' };
  const r = validateAnswers(answers);
  assert.equal(r.valid, false);
  assert.ok(r.issues.some(i => i.includes('z')));
});

test('rejects duplicate questionId', () => {
  const answers = allOptionAnswers(0);
  answers[1] = { ...answers[0] }; // duplicate q1
  const r = validateAnswers(answers);
  assert.equal(r.valid, false);
  assert.ok(r.issues.some(i => i.toLowerCase().includes('duplicate')));
});

test('accepts a complete valid answer set', () => {
  const r = validateAnswers(allOptionAnswers(0));
  assert.equal(r.valid, true);
  assert.equal(r.issues.length, 0);
});

// ─── scoreSkills ──────────────────────────────────────────────────────────
console.log('\n[3] scoreSkills');

test('throws on invalid answers', () => {
  assert.throws(() => scoreSkills([]), /Expected/);
});

test('returns scores for all 12 skills', () => {
  const { scores } = scoreSkills(allOptionAnswers(0));
  assert.equal(Object.keys(scores).length, 12);
  for (const id of SKILL_IDS) {
    assert.ok(id in scores, `Missing score for ${id}`);
  }
});

test('all scores are in [0, 100]', () => {
  for (let opt = 0; opt < 4; opt++) {
    const { scores } = scoreSkills(allOptionAnswers(opt));
    for (const [sk, val] of Object.entries(scores)) {
      assert.ok(val >= 0 && val <= 100, `opt${opt} ${sk}=${val} out of range`);
    }
  }
});

test('rankedSkills contains all 12 skill ids', () => {
  const { rankedSkills } = scoreSkills(allOptionAnswers(0));
  assert.equal(rankedSkills.length, 12);
  assert.deepEqual([...rankedSkills].sort(), [...SKILL_IDS].sort());
});

test('rankedSkills is sorted descending by score', () => {
  const { scores, rankedSkills } = scoreSkills(allOptionAnswers(0));
  for (let i = 0; i < rankedSkills.length - 1; i++) {
    assert.ok(
      scores[rankedSkills[i]] >= scores[rankedSkills[i + 1]],
      `rankedSkills[${i}] score < rankedSkills[${i+1}] score`
    );
  }
});

test('answerBreakdown has one entry per question', () => {
  const { answerBreakdown } = scoreSkills(balancedAnswers());
  assert.equal(answerBreakdown.length, QUESTIONS.length);
});

test('answerBreakdown entries have required fields', () => {
  const { answerBreakdown } = scoreSkills(balancedAnswers());
  for (const item of answerBreakdown) {
    assert.ok(item.questionId, 'missing questionId');
    assert.ok(item.question,   'missing question');
    assert.ok(item.optionId,   'missing optionId');
    assert.ok(item.answer,     'missing answer');
    assert.ok(item.evidence,   'missing evidence');
    assert.ok(item.signals,    'missing signals');
  }
});

test('different answer sets produce different score profiles', () => {
  const sA = scoreSkills(allOptionAnswers(0)).scores;
  const sB = scoreSkills(allOptionAnswers(1)).scores;
  const identical = SKILL_IDS.every(id => sA[id] === sB[id]);
  assert.ok(!identical, 'option-A and option-B produced identical scores');
});

// ─── matchCareers ─────────────────────────────────────────────────────────
console.log('\n[4] matchCareers');

const baseScores = scoreSkills(allOptionAnswers(0)).scores;

test('returns requested number of results', () => {
  assert.equal(matchCareers(baseScores, 3).length, 3);
  assert.equal(matchCareers(baseScores, 5).length, 5);
  assert.equal(matchCareers(baseScores, 1).length, 1);
});

test('returns 0 results when limit=0', () => {
  assert.equal(matchCareers(baseScores, 0).length, 0);
});

test('returns all 156 careers when limit exceeds catalogue', () => {
  assert.equal(matchCareers(baseScores, 200).length, 156);
});

test('results are sorted descending by matchScore', () => {
  const results = matchCareers(baseScores, 10, false); // no diversity, pure rank
  for (let i = 0; i < results.length - 1; i++) {
    assert.ok(
      results[i].matchScore >= results[i + 1].matchScore,
      `matchScore[${i}]=${results[i].matchScore} < matchScore[${i+1}]=${results[i+1].matchScore}`
    );
  }
});

test('matchScore is within [0, 100]', () => {
  const results = matchCareers(baseScores, 156, false);
  for (const c of results) {
    assert.ok(c.matchScore >= 0 && c.matchScore <= 100,
      `${c.title} matchScore=${c.matchScore} out of [0,100]`);
  }
});

test('matchComponents present and normalised', () => {
  const results = matchCareers(baseScores, 3);
  for (const c of results) {
    assert.ok('cosineSimilarity' in c.matchComponents);
    assert.ok('profileProximity' in c.matchComponents);
    assert.ok(c.matchComponents.cosineSimilarity >= 0 && c.matchComponents.cosineSimilarity <= 1);
    assert.ok(c.matchComponents.profileProximity >= 0 && c.matchComponents.profileProximity <= 1);
  }
});

test('diverse=true (default) returns at most one result per category', () => {
  for (let opt = 0; opt < 4; opt++) {
    const scores = scoreSkills(allOptionAnswers(opt)).scores;
    const results = matchCareers(scores, 3, true);
    const categories = results.map(c => c.category);
    assert.equal(
      new Set(categories).size,
      categories.length,
      `opt${opt}: duplicate categories ${categories}`
    );
  }
});

test('diverse=false may return multiple from same category', () => {
  // With a strongly analytical profile the top careers will cluster
  const analyticalScores = Object.fromEntries(
    SKILL_IDS.map(id => [id, id === 'analytical_thinking' ? 100 : 50])
  );
  const raw = matchCareers(analyticalScores, 5, false);
  // Just verify it runs and returns 5 without throwing
  assert.equal(raw.length, 5);
});

test('different answer sets yield different top-3 career sets', () => {
  const sA = scoreSkills(allOptionAnswers(0)).scores;
  const sB = scoreSkills(allOptionAnswers(2)).scores;
  const topA = matchCareers(sA, 3).map(c => c.id).join(',');
  const topB = matchCareers(sB, 3).map(c => c.id).join(',');
  assert.notEqual(topA, topB, 'option-A and option-C should surface different top careers');
});

// ─── buildEvidence ────────────────────────────────────────────────────────
console.log('\n[5] buildEvidence');

test('returns one evidence block per career', () => {
  const { scores, answerBreakdown } = scoreSkills(balancedAnswers());
  const topCareers = matchCareers(scores, 3);
  const ev = buildEvidence(topCareers, answerBreakdown, scores);
  assert.equal(ev.length, 3);
  for (const block of ev) {
    assert.ok(topCareers.some(c => c.id === block.careerId));
  }
});

test('every evidence block has ≥ 1 evidence item', () => {
  for (let opt = 0; opt < 4; opt++) {
    const { scores, answerBreakdown } = scoreSkills(allOptionAnswers(opt));
    const topCareers = matchCareers(scores, 3);
    const ev = buildEvidence(topCareers, answerBreakdown, scores);
    for (const block of ev) {
      assert.ok(
        block.evidence.length >= 1,
        `opt${opt} career ${block.careerId} has 0 evidence items`
      );
    }
  }
});

test('evidence items have all required fields', () => {
  const { scores, answerBreakdown } = scoreSkills(balancedAnswers());
  const topCareers = matchCareers(scores, 3);
  const ev = buildEvidence(topCareers, answerBreakdown, scores);
  for (const block of ev) {
    for (const item of block.evidence) {
      assert.ok(item.questionId,          'evidence missing questionId');
      assert.ok(item.question,            'evidence missing question');
      assert.ok(item.answer,              'evidence missing answer');
      assert.ok(item.evidence,            'evidence missing evidence text');
      assert.ok(item.skill,               'evidence missing skill');
      assert.ok(item.userSkillScore !== undefined, 'evidence missing userSkillScore');
      assert.ok(item.contribution !== undefined,   'evidence missing contribution');
    }
  }
});

test('evidence questionIds reference actual answer ids', () => {
  const answers = balancedAnswers();
  const { scores, answerBreakdown } = scoreSkills(answers);
  const usedQids = new Set(answers.map(a => a.questionId));
  const topCareers = matchCareers(scores, 3);
  const ev = buildEvidence(topCareers, answerBreakdown, scores);
  for (const block of ev) {
    for (const item of block.evidence) {
      assert.ok(usedQids.has(item.questionId),
        `evidence references question ${item.questionId} which was not answered`);
    }
  }
});

test('no duplicate questionId within a single career evidence block', () => {
  const { scores, answerBreakdown } = scoreSkills(balancedAnswers());
  const topCareers = matchCareers(scores, 3);
  const ev = buildEvidence(topCareers, answerBreakdown, scores);
  for (const block of ev) {
    const qids = block.evidence.map(i => i.questionId);
    assert.equal(new Set(qids).size, qids.length,
      `Career ${block.careerId} has duplicate question in evidence`);
  }
});

test('supportingSkills are valid skill ids', () => {
  const skillSet = new Set(SKILL_IDS);
  const { scores, answerBreakdown } = scoreSkills(balancedAnswers());
  const topCareers = matchCareers(scores, 3);
  const ev = buildEvidence(topCareers, answerBreakdown, scores);
  for (const block of ev) {
    for (const sk of block.supportingSkills) {
      assert.ok(skillSet.has(sk), `Unknown supportingSkill "${sk}"`);
    }
  }
});

test('supportingSkills has ≥ 1 entry', () => {
  const { scores, answerBreakdown } = scoreSkills(balancedAnswers());
  const topCareers = matchCareers(scores, 3);
  const ev = buildEvidence(topCareers, answerBreakdown, scores);
  for (const block of ev) {
    assert.ok(block.supportingSkills.length >= 1,
      `Career ${block.careerId} has no supportingSkills`);
  }
});

// ─── analyze (full pipeline) ──────────────────────────────────────────────
console.log('\n[6] analyze (full pipeline)');

test('returns correct top-level shape', () => {
  const result = analyze(balancedAnswers());
  assert.ok('version'      in result);
  assert.ok('methodology'  in result);
  assert.ok('skillProfile' in result);
  assert.ok('careers'      in result);
});

test('version is 1.0.0', () => {
  assert.equal(analyze(balancedAnswers()).version, '1.0.0');
});

test('methodology has required keys', () => {
  const { methodology } = analyze(balancedAnswers());
  assert.ok('scoring'  in methodology);
  assert.ok('matching' in methodology);
  assert.ok('llmRole'  in methodology);
});

test('skillProfile has scores and rankedSkills', () => {
  const { skillProfile } = analyze(balancedAnswers());
  assert.ok('scores'       in skillProfile);
  assert.ok('rankedSkills' in skillProfile);
});

test('returns 3 careers by default', () => {
  assert.equal(analyze(balancedAnswers()).careers.length, 3);
});

test('career objects have all contract-required fields', () => {
  const result = analyze(balancedAnswers());
  for (const career of result.careers) {
    assert.ok(career.id,               `career missing id`);
    assert.ok(career.title,            `career missing title`);
    assert.ok(career.category,         `career missing category`);
    assert.ok(career.description,      `career missing description`);
    assert.ok(typeof career.matchScore === 'number', `career missing matchScore`);
    assert.ok('matchComponents'   in career, `career missing matchComponents`);
    assert.ok('supportingSkills'  in career, `career missing supportingSkills`);
    assert.ok('evidence'          in career, `career missing evidence`);
  }
});

test('default analyze returns 3 distinct categories', () => {
  for (let opt = 0; opt < 4; opt++) {
    const result = analyze(allOptionAnswers(opt));
    const cats = result.careers.map(c => c.category);
    assert.equal(
      new Set(cats).size,
      cats.length,
      `opt${opt}: top 3 careers are all in the same category: ${cats[0]}`
    );
  }
});

test('analyze with diverse=false may bundle same category', () => {
  // Just ensure it runs without throwing
  const result = analyze(balancedAnswers(), { diverse: false });
  assert.equal(result.careers.length, 3);
});

test('analyze with custom limit', () => {
  const result = analyze(balancedAnswers(), { limit: 5 });
  assert.equal(result.careers.length, 5);
});

test('career evidence always has ≥ 1 item', () => {
  for (let opt = 0; opt < 4; opt++) {
    const result = analyze(allOptionAnswers(opt));
    for (const career of result.careers) {
      assert.ok(career.evidence.length >= 1,
        `opt${opt} ${career.title} has no evidence`);
    }
  }
});

test('evidence items reference only answered questions', () => {
  const answers = balancedAnswers();
  const usedQids = new Set(answers.map(a => a.questionId));
  const result = analyze(answers);
  for (const career of result.careers) {
    for (const item of career.evidence) {
      assert.ok(usedQids.has(item.questionId),
        `${career.title}: evidence references unanswered question ${item.questionId}`);
    }
  }
});

test('no duplicate questions in one career evidence list', () => {
  const result = analyze(balancedAnswers());
  for (const career of result.careers) {
    const qids = career.evidence.map(e => e.questionId);
    assert.equal(new Set(qids).size, qids.length,
      `${career.title} has duplicate question in evidence`);
  }
});

test('matchScore decreasing or equal across result.careers', () => {
  // With diverse=false results are re-sorted; with diverse=true they still should be
  const result = analyze(balancedAnswers(), { diverse: false });
  for (let i = 0; i < result.careers.length - 1; i++) {
    assert.ok(
      result.careers[i].matchScore >= result.careers[i + 1].matchScore,
      `careers[${i}].matchScore < careers[${i+1}].matchScore`
    );
  }
});

test('throws on invalid answers', () => {
  assert.throws(() => analyze([]), /Expected/);
  assert.throws(() => analyze(null), /answers must be an array/);
});

test('deterministic: same answers always yield same result', () => {
  const a1 = analyze(balancedAnswers());
  const a2 = analyze(balancedAnswers());
  assert.deepEqual(a1, a2, 'analyze is not deterministic');
});

// ─── Summary ──────────────────────────────────────────────────────────────

console.log('\n──────────────────────────────────────────────');
if (failed === 0) {
  console.log(`✓ All ${passed} acceptance tests passed.\n`);
} else {
  console.log(`✗ ${failed} test(s) failed, ${passed} passed.\n`);
  for (const f of failures) {
    console.error(`  FAILED: ${f.name}`);
    console.error(`    ${f.message}`);
  }
  console.log('');
  process.exit(1);
}

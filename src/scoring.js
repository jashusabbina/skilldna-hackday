import { QUESTIONS, QUESTION_MAP } from './questions.js';
import { SKILL_IDS } from './skills.js';

const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));

/**
 * Validate an answers array against the question catalogue.
 *
 * Returns { valid: boolean, issues: string[] }.
 * Accepts any iterable; rejects non-arrays, unknown ids, duplicate questions,
 * and incomplete answer sets.
 */
export function validateAnswers(answers) {
  const issues = [];
  if (!Array.isArray(answers)) {
    return { valid: false, issues: ['answers must be an array'] };
  }

  const seen = new Set();
  if (answers.length > QUESTIONS.length * 2) {
    issues.push(`Too many answers: maximum ${QUESTIONS.length * 2}.`);
  }

  for (const item of answers) {
    if (!item || typeof item !== 'object') {
      issues.push('Each answer must be an object with questionId and optionId.');
      continue;
    }

    if (typeof item.questionId !== 'string' || typeof item.optionId !== 'string') {
      issues.push('questionId and optionId must be strings.');
      continue;
    }

    const q = Object.hasOwn(QUESTION_MAP, item.questionId) ? QUESTION_MAP[item.questionId] : undefined;
    if (!q) {
      issues.push(`Unknown questionId: ${item.questionId}`);
    } else if (!q.options.some(o => o.id === item.optionId)) {
      issues.push(`Unknown optionId ${item.optionId} for ${item.questionId}`);
    }

    if (seen.has(item.questionId)) {
      issues.push(`Duplicate answer for ${item.questionId}`);
    }
    seen.add(item.questionId);
  }

  if (seen.size !== QUESTIONS.length) {
    issues.push(`Expected ${QUESTIONS.length} answered questions; received ${seen.size}.`);
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Convert a validated answers array into skill scores (0-100 each),
 * a ranked skill list, and a per-answer breakdown used by evidence.js.
 *
 * Throws if answers fail validation.
 */
export function scoreSkills(answers) {
  const validation = validateAnswers(answers);
  if (!validation.valid) throw new Error(validation.issues.join(' '));

  const numerator   = Object.fromEntries(SKILL_IDS.map(id => [id, 0]));
  const denominator = Object.fromEntries(SKILL_IDS.map(id => [id, 0]));
  const minNumerator = Object.fromEntries(SKILL_IDS.map(id => [id, 0]));
  const maxNumerator = Object.fromEntries(SKILL_IDS.map(id => [id, 0]));
  const answerBreakdown = [];

  for (const answer of answers) {
    const q        = QUESTION_MAP[answer.questionId];
    const selected = q.options.find(o => o.id === answer.optionId);

    for (const skill of SKILL_IDS) {
      const selectedSignal = selected.signals[skill] ?? 0;
      // Maximum absolute signal any option offers for this skill in this question.
      const maxAbs = Math.max(...q.options.map(o => Math.abs(o.signals[skill] ?? 0)), 0);
      if (maxAbs > 0) {
        numerator[skill]   += selectedSignal;
        denominator[skill] += maxAbs;
        minNumerator[skill] += Math.min(...q.options.map(o => o.signals[skill] ?? 0));
        maxNumerator[skill] += Math.max(...q.options.map(o => o.signals[skill] ?? 0));
      }
    }

    answerBreakdown.push({
      questionId: q.id,
      question:   q.text,
      optionId:   selected.id,
      answer:     selected.text,
      evidence:   selected.evidence,
      signals:    { ...selected.signals }
    });
  }

  // Rescale each skill against its actual reachable range in the question set.
  // This prevents the old ~50-point floor caused by mapping [-1,1] directly to [0,100].
  const scores = Object.fromEntries(SKILL_IDS.map(skill => {
    if (denominator[skill] === 0) return [skill, 50];
    const normalized = numerator[skill] / denominator[skill];
    const minReachable = minNumerator[skill] / denominator[skill];
    const maxReachable = maxNumerator[skill] / denominator[skill];
    const span = maxReachable - minReachable;
    const scaled = span === 0 ? 0.5 : (normalized - minReachable) / span;
    return [skill, Math.round(clamp(scaled, 0, 1) * 1000) / 10];
  }));

  const rankedSkills = [...SKILL_IDS]
    .sort((a, b) => scores[b] - scores[a] || a.localeCompare(b));

  return { scores, rankedSkills, answerBreakdown };
}

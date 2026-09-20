import { SKILL_IDS } from './skills.js';

/**
 * Build per-career evidence linking answer choices to match quality.
 *
 * Rules
 * -----
 * - Only answers whose signal × career-weight exceeds CONTRIBUTION_THRESHOLD
 *   are considered as evidence candidates.
 * - Each question may contribute AT MOST ONE evidence item per career
 *   (the highest-contributing skill for that question).
 * - We aim for 1-3 evidence items; if the threshold yields nothing we lower
 *   it progressively so every career always has ≥ 1 piece of evidence.
 * - supportingSkills are the top-4 skills from the selected evidence,
 *   ranked by the user's own skill score descending.
 */

const CONTRIBUTION_THRESHOLD = 0.05;
const FALLBACK_THRESHOLDS = [0.02, 0.0];

export function buildEvidence(topCareers, answerBreakdown, skillScores) {
  return topCareers.map(career => {
    const evidenceItems = selectEvidence(career, answerBreakdown, skillScores);

    const supportingSkills = [...new Set(evidenceItems.map(x => x.skill))]
      .sort((a, b) => (skillScores[b] - skillScores[a]) || a.localeCompare(b))
      .slice(0, 4);

    return {
      careerId: career.id,
      supportingSkills,
      evidence: evidenceItems.map(({ contribution, ...item }) => ({
        ...item,
        contribution: Math.round(contribution * 1000) / 1000
      }))
    };
  });
}

function selectEvidence(career, answerBreakdown, skillScores, threshold = CONTRIBUTION_THRESHOLD) {
  // Build one candidate per (question × skill) pair, keeping only the
  // best-contributing skill per question to avoid duplicate question entries.
  const bestPerQuestion = new Map();

  for (const answer of answerBreakdown) {
    let best = null;
    for (const skill of SKILL_IDS) {
      const signal = answer.signals[skill] ?? 0;
      const careerWeight = career.skills[skill] ?? 0;
      const contribution = signal * careerWeight;
      if (contribution > threshold && (best === null || contribution > best.contribution)) {
        best = {
          questionId: answer.questionId,
          question: answer.question,
          answer: answer.answer,
          evidence: answer.evidence,
          skill,
          userSkillScore: skillScores[skill],
          contribution
        };
      }
    }
    if (best !== null) {
      // Only keep the best candidate per question (highest contribution)
      const existing = bestPerQuestion.get(answer.questionId);
      if (!existing || best.contribution > existing.contribution) {
        bestPerQuestion.set(answer.questionId, best);
      }
    }
  }

  const candidates = [...bestPerQuestion.values()]
    .sort((a, b) => b.contribution - a.contribution || a.questionId.localeCompare(b.questionId));

  const selected = candidates.slice(0, 3);

  // If nothing passed the threshold, retry with a lower one
  if (selected.length === 0) {
    for (const fallback of FALLBACK_THRESHOLDS) {
      const retry = selectEvidence(career, answerBreakdown, skillScores, fallback);
      if (retry.length > 0) return retry;
    }
  }

  return selected;
}

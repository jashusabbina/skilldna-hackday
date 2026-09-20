import { scoreSkills } from './scoring.js';
import { matchCareers } from './matching.js';
import { buildEvidence } from './evidence.js';

/**
 * Full SkillDNA analysis pipeline.
 *
 * @param {Array<{questionId: string, optionId: string}>} answers
 * @param {{ limit?: number, diverse?: boolean }} [options]
 *   limit   – number of careers to return (default 3)
 *   diverse – enforce one career per category in top results (default true)
 * @returns {AnalysisResult}
 */
export function analyze(answers, { limit = 3, diverse = true } = {}) {
  const skillResult      = scoreSkills(answers);
  const topCareers       = matchCareers(skillResult.scores, limit, diverse);
  const evidenceByCareer = buildEvidence(topCareers, skillResult.answerBreakdown, skillResult.scores);
  const evidenceMap      = Object.fromEntries(evidenceByCareer.map(e => [e.careerId, e]));

  return {
    version: '1.0.0',
    methodology: {
      scoring:  'deterministic weighted situational signals',
      matching: '65% centered cosine similarity + 35% profile proximity; deterministic diversity constraints',
      llmRole:  'explanation only; does not determine scores or rankings'
    },
    skillProfile: {
      scores:       skillResult.scores,
      rankedSkills: skillResult.rankedSkills
    },
    careers: topCareers.map(career => ({
      id:              career.id,
      title:           career.title,
      category:        career.category,
      description:     career.description,
      matchScore:      career.matchScore,
      matchComponents: career.matchComponents,
      supportingSkills: evidenceMap[career.id].supportingSkills,
      evidence:         evidenceMap[career.id].evidence
    }))
  };
}

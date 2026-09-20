import { CAREERS } from './careers.js';
import { SKILL_IDS } from './skills.js';

function cosine(user, career) {
  // Center both profiles around the neutral midpoint so uniformly-high skill
  // vectors do not win simply because they have larger magnitude.
  const userCentered = SKILL_IDS.map(id => user[id] - 0.5);
  const careerCentered = SKILL_IDS.map(id => career.skills[id] - 0.5);
  const numerator = userCentered.reduce((sum, value, i) => sum + value * careerCentered[i], 0);
  const userMag = Math.sqrt(userCentered.reduce((sum, value) => sum + value ** 2, 0));
  const careerMag = Math.sqrt(careerCentered.reduce((sum, value) => sum + value ** 2, 0));
  if (userMag === 0 || careerMag === 0) return 0;
  return numerator / (userMag * careerMag);
}

function proximity(user, career) {
  const meanAbsError =
    SKILL_IDS.reduce((sum, id) => sum + Math.abs(user[id] - career.skills[id]), 0) / SKILL_IDS.length;
  return Math.max(0, 1 - meanAbsError);
}

/**
 * Match careers against a skill-score map.
 *
 * @param {Record<string,number>} skillScores  – scores in 0-100 range
 * @param {number} limit   – max results to return (default 3)
 * @param {boolean} diverse – when true (default), enforce at most one career per
 *                            category so the top-N list spans different fields.
 *                            When false, return the raw ranked list.
 */
export function matchCareers(skillScores, limit = 3, diverse = true) {
  if (!skillScores || typeof skillScores !== 'object') {
    throw new Error('skillScores must be an object.');
  }
  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error('limit must be a non-negative integer.');
  }
  for (const id of SKILL_IDS) {
    const value = skillScores[id];
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
      throw new Error(`Invalid skill score for ${id}: expected a finite number in [0,100].`);
    }
  }

  const userVector = Object.fromEntries(SKILL_IDS.map(id => [id, skillScores[id] / 100]));

  const ranked = CAREERS.map(career => {
    const cos = cosine(userVector, career);
    const prox = proximity(userVector, career);
    // Centered cosine is in [-1,1]; proximity is in [0,1]. Normalize the
  // combined signal back to a user-facing 0..100 match percentage.
  const score = 100 * (0.65 * ((cos + 1) / 2) + 0.35 * prox);
    return {
      ...career,
      matchScore: Math.round(score * 10) / 10,
      matchComponents: {
        cosineSimilarity: Math.round(((cos + 1) / 2) * 1000) / 1000,
        profileProximity: Math.round(prox * 1000) / 1000
      }
    };
  });

  ranked.sort((a, b) => b.matchScore - a.matchScore || a.title.localeCompare(b.title));

  if (!diverse || limit <= 0) {
    return ranked.slice(0, limit);
  }

  // Category-diverse selection: pick the highest-scoring career from each
  // distinct category until we have `limit` results.  If we exhaust
  // categories before reaching `limit`, fall back to the next-best career
  // regardless of category duplication.
  const seenCategories = new Set();
  const archetypeCounts = new Map();
  const selected = [];
  const overflow = [];

  for (const career of ranked) {
    const archetypeCount = archetypeCounts.get(career.archetype) ?? 0;
    if (!seenCategories.has(career.category) && archetypeCount < 2) {
      seenCategories.add(career.category);
      archetypeCounts.set(career.archetype, archetypeCount + 1);
      selected.push(career);
      if (selected.length === limit) break;
    } else {
      overflow.push(career);
    }
  }

  // Backfill if not enough distinct categories exist
  if (selected.length < limit) {
    for (const career of overflow) {
      selected.push(career);
      if (selected.length === limit) break;
    }
  }

  // Re-sort by matchScore so the list is still descending
  selected.sort((a, b) => b.matchScore - a.matchScore || a.title.localeCompare(b.title));

  return selected;
}

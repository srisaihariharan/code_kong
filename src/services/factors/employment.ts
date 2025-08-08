import { UserData, ScoreFactor } from '../../types';

export function calculateEmploymentScore(employmentHistory: UserData['employmentHistory']): ScoreFactor {
  const { currentJobMonths, totalWorkExperienceYears, employmentType } = employmentHistory;
  let score = 0;
  score += Math.min(Math.max(currentJobMonths, 0) / 24, 1) * 40;
  score += Math.min(Math.max(totalWorkExperienceYears, 0) / 10, 1) * 30;
  const typeMultipliers = {
    'full-time': 1.0,
    'part-time': 0.7,
    'contract': 0.8,
    'self-employed': 0.9
  } as const;
  score += 30 * (typeMultipliers[employmentType] ?? 0.7);
  return {
    category: 'Employment Stability',
    impact: Math.round(score),
    description: `${totalWorkExperienceYears} years experience, current role for ${currentJobMonths} months`,
    weight: 15
  };
}

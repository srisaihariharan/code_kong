import { UserData, ScoreFactor } from '../../types';

export function calculateUtilityScore(utilityHistory: UserData['utilityHistory']): ScoreFactor {
  const { utilityPeriodMonths, lateUtilityPayments, utilityTypes } = utilityHistory;
  let score = 0;
  if (utilityPeriodMonths > 0) {
    const safeLate = Math.min(lateUtilityPayments, utilityPeriodMonths);
    const onTimeRate = Math.max(0, (utilityPeriodMonths - safeLate) / utilityPeriodMonths);
    score += onTimeRate * 50;
  }
  score += Math.min(Math.max(utilityTypes.length, 0) / 4, 1) * 20;
  score += Math.min(Math.max(utilityPeriodMonths, 0) / 24, 1) * 30;
  return {
    category: 'Utility Payment History',
    impact: Math.round(score),
    description: `${utilityPeriodMonths} months of utility payments across ${utilityTypes.length} services`,
    weight: 20
  };
}

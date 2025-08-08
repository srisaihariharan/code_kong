import { UserData, ScoreFactor } from '../../types';

export function calculateRentScore(rentHistory: UserData['rentHistory']): ScoreFactor {
  const { rentPeriodMonths, latePayments, earlyPayments, landlordRating } = rentHistory;
  let score = 0;
  if (rentPeriodMonths > 0) {
    const safeLate = Math.min(latePayments, rentPeriodMonths);
    const onTimeRate = Math.max(0, (rentPeriodMonths - safeLate) / rentPeriodMonths);
    score += onTimeRate * 40;
    const safeEarly = Math.min(Math.max(earlyPayments, 0), rentPeriodMonths);
    const earlyPaymentBonus = Math.min((safeEarly / rentPeriodMonths) * 10, 10);
    score += earlyPaymentBonus;
  }
  score += Math.min(Math.max(rentPeriodMonths, 0) / 24, 1) * 20;
  score += (Math.min(Math.max(landlordRating, 0), 5) / 5) * 10;
  return {
    category: 'Rent Payment History',
    impact: Math.round(score),
    description: `${rentPeriodMonths} months of rent history with ${latePayments} late payments`,
    weight: 25
  };
}

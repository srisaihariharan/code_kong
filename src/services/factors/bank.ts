import { UserData, ScoreFactor } from '../../types';

export function calculateBankScore(bankData: UserData['bankData']): ScoreFactor {
  const { averageMonthlyIncome, averageMonthlyExpenses, savingsBalance, checkingBalance, overdrafts, accountAgeMonths } = bankData;
  let score = 0;
  const safeIncome = Math.max(averageMonthlyIncome, 0);
  const safeExpenses = Math.max(averageMonthlyExpenses, 0);
  const cashFlow = safeIncome - safeExpenses;
  const cashFlowRatio = safeIncome > 0 ? cashFlow / safeIncome : 0;
  score += Math.max(0, Math.min(cashFlowRatio * 30, 30));
  const safeSavings = Math.max(savingsBalance, 0) + Math.max(checkingBalance, 0);
  const monthsOfExpenses = safeExpenses > 0 ? safeSavings / safeExpenses : 0;
  score += Math.min(Math.max(monthsOfExpenses, 0) / 6, 1) * 25;
  score += Math.max(0, 25 - (Math.max(overdrafts, 0) * 5));
  score += Math.min(Math.max(accountAgeMonths, 0) / 24, 1) * 20;
  return {
    category: 'Banking Behavior',
    impact: Math.round(score),
    description: `${accountAgeMonths} months banking history with $${cashFlow.toFixed(0)} monthly cash flow`,
    weight: 30
  };
}

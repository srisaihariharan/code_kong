import { CreditScoringService } from './creditScoring';
import { createEmptyUserData } from '../utils/userDataFactory';

const service = new CreditScoringService();

describe('CreditScoringService', () => {
  it('produces a numeric score within 300-850', () => {
    const user = createEmptyUserData();
    // Fill minimal viable data to avoid zeros everywhere
    user.rentHistory = { monthlyRent: 1000, rentPeriodMonths: 12, latePayments: 1, earlyPayments: 2, landlordRating: 4 };
    user.utilityHistory = { averageMonthlyUtilities: 200, utilityPeriodMonths: 12, lateUtilityPayments: 0, utilityTypes: ['Electric','Water'] };
    user.bankData = { averageMonthlyIncome: 4000, averageMonthlyExpenses: 2500, savingsBalance: 6000, checkingBalance: 1200, overdrafts: 0, accountAgeMonths: 18 };
    user.employmentHistory = { currentJobTitle: 'Engineer', currentEmployerName: 'Company', currentJobMonths: 14, totalWorkExperienceYears: 5, industryType: 'Technology', employmentType: 'full-time' };
    user.educationHistory = { highestDegree: 'Bachelor\'s Degree', graduationYear: 2022, fieldOfStudy: 'Engineering', institutionName: 'Uni', hasStudentLoans: true, studentLoanBalance: 30000 };

    const result = service.calculateCreditScore(user);
    expect(result.score).toBeGreaterThanOrEqual(300);
    expect(result.score).toBeLessThanOrEqual(850);
    expect(result.factors.length).toBe(5);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('handles pathological negative values defensively', () => {
    const user = createEmptyUserData();
    user.bankData = { averageMonthlyIncome: -1000, averageMonthlyExpenses: -5000, savingsBalance: -100, checkingBalance: -50, overdrafts: -3, accountAgeMonths: -10 } as any;
    const result = service.calculateCreditScore(user);
    expect(result.score).toBeGreaterThanOrEqual(300); // Should clamp to base floor range
  });
});

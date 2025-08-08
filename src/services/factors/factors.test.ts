import { calculateRentScore } from './rent';
import { calculateUtilityScore } from './utility';
import { calculateBankScore } from './bank';
import { calculateEmploymentScore } from './employment';
import { calculateEducationScore } from './education';

// Minimal shaped objects matching expected slices

describe('factor calculators', () => {
  it('rent score increases with fewer late payments', () => {
    const base = calculateRentScore({ monthlyRent: 1000, rentPeriodMonths: 12, latePayments: 2, earlyPayments: 1, landlordRating: 4 });
    const improved = calculateRentScore({ monthlyRent: 1000, rentPeriodMonths: 12, latePayments: 0, earlyPayments: 1, landlordRating: 4 });
    expect(improved.impact).toBeGreaterThanOrEqual(base.impact);
  });

  it('utility score benefits from more diverse utilities', () => {
    const low = calculateUtilityScore({ averageMonthlyUtilities: 150, utilityPeriodMonths: 12, lateUtilityPayments: 0, utilityTypes: ['Electric'] });
    const high = calculateUtilityScore({ averageMonthlyUtilities: 150, utilityPeriodMonths: 12, lateUtilityPayments: 0, utilityTypes: ['Electric','Water','Gas','Internet'] });
    expect(high.impact).toBeGreaterThanOrEqual(low.impact);
  });

  it('bank score penalizes overdrafts', () => {
    const clean = calculateBankScore({ averageMonthlyIncome: 3000, averageMonthlyExpenses: 2000, savingsBalance: 4000, checkingBalance: 1000, overdrafts: 0, accountAgeMonths: 12 });
    const overdrafted = calculateBankScore({ averageMonthlyIncome: 3000, averageMonthlyExpenses: 2000, savingsBalance: 4000, checkingBalance: 1000, overdrafts: 5, accountAgeMonths: 12 });
    expect(clean.impact).toBeGreaterThan(overdrafted.impact);
  });

  it('employment score reflects tenure', () => {
    const short = calculateEmploymentScore({ currentJobTitle: 'Dev', currentEmployerName: 'Co', currentJobMonths: 3, totalWorkExperienceYears: 1, industryType: 'Technology', employmentType: 'full-time' });
    const long = calculateEmploymentScore({ currentJobTitle: 'Dev', currentEmployerName: 'Co', currentJobMonths: 18, totalWorkExperienceYears: 1, industryType: 'Technology', employmentType: 'full-time' });
    expect(long.impact).toBeGreaterThanOrEqual(short.impact);
  });

  it('education score rewards higher degrees', () => {
    const hs = calculateEducationScore({ highestDegree: 'High School', graduationYear: 2010, fieldOfStudy: 'General', institutionName: 'School', hasStudentLoans: false, studentLoanBalance: 0 });
    const masters = calculateEducationScore({ highestDegree: "Master's Degree", graduationYear: 2018, fieldOfStudy: 'Engineering', institutionName: 'Uni', hasStudentLoans: false, studentLoanBalance: 0 });
    expect(masters.impact).toBeGreaterThanOrEqual(hs.impact);
  });
});

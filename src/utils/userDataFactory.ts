import { UserData } from '../types';

export const createEmptyUserData = (): UserData => ({
  personalInfo: {
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', address: '', city: '', state: '', zipCode: ''
  },
  rentHistory: {
    monthlyRent: 0, rentPeriodMonths: 0, latePayments: 0, earlyPayments: 0, landlordRating: 0
  },
  utilityHistory: {
    averageMonthlyUtilities: 0, utilityPeriodMonths: 0, lateUtilityPayments: 0, utilityTypes: []
  },
  bankData: {
    averageMonthlyIncome: 0, averageMonthlyExpenses: 0, savingsBalance: 0, checkingBalance: 0, overdrafts: 0, accountAgeMonths: 0
  },
  employmentHistory: {
    currentJobTitle: '', currentEmployerName: '', currentJobMonths: 0, totalWorkExperienceYears: 0, industryType: '', employmentType: 'full-time'
  },
  educationHistory: {
    highestDegree: '', graduationYear: 0, fieldOfStudy: '', institutionName: '', hasStudentLoans: false, studentLoanBalance: 0
  }
});

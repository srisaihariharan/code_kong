export interface UserData {
  personalInfo: PersonalInfo;
  rentHistory: RentHistory;
  utilityHistory: UtilityHistory;
  bankData: BankData;
  employmentHistory: EmploymentHistory;
  educationHistory: EducationHistory;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface RentHistory {
  monthlyRent: number;
  rentPeriodMonths: number;
  latePayments: number;
  earlyPayments: number;
  landlordRating: number;
}

export interface UtilityHistory {
  averageMonthlyUtilities: number;
  utilityPeriodMonths: number;
  lateUtilityPayments: number;
  utilityTypes: string[];
}

export interface BankData {
  averageMonthlyIncome: number;
  averageMonthlyExpenses: number;
  savingsBalance: number;
  checkingBalance: number;
  overdrafts: number;
  accountAgeMonths: number;
}

export interface EmploymentHistory {
  currentJobTitle: string;
  currentEmployerName: string;
  currentJobMonths: number;
  totalWorkExperienceYears: number;
  industryType: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'self-employed';
}

export interface EducationHistory {
  highestDegree: string;
  graduationYear: number;
  fieldOfStudy: string;
  institutionName: string;
  hasStudentLoans: boolean;
  studentLoanBalance: number;
}

export interface CreditScore {
  score: number;
  grade: string;
  factors: ScoreFactor[];
  recommendations: Recommendation[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ScoreFactor {
  category: string;
  impact: number;
  description: string;
  weight: number;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedImpact: number;
}
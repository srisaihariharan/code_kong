import { z } from 'zod';

// Personal Info
export const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, 'First name required'),
  lastName: z.string().trim().min(1, 'Last name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().trim().min(7, 'Phone too short'),
  dateOfBirth: z.string().min(4, 'Date of birth required'),
  address: z.string().trim().min(3, 'Address required'),
  city: z.string().trim().min(2, 'City required'),
  state: z.string().trim().min(2, 'State required'),
  zipCode: z.string().trim().min(4, 'ZIP too short')
});

// Rent History
export const rentHistorySchema = z.object({
  monthlyRent: z.number({ invalid_type_error: 'Required' }).min(0, 'Must be ≥ 0'),
  rentPeriodMonths: z.number().int('Whole months').min(1, 'Must be ≥ 1'),
  latePayments: z.number().int().min(0, 'Must be ≥ 0'),
  earlyPayments: z.number().int().min(0, 'Must be ≥ 0'),
  landlordRating: z.number().int().min(1, '1-5').max(5, '1-5')
});

// Utility History
export const utilityHistorySchema = z.object({
  averageMonthlyUtilities: z.number().min(0, 'Must be ≥ 0'),
  utilityPeriodMonths: z.number().int().min(1, 'Must be ≥ 1'),
  lateUtilityPayments: z.number().int().min(0, 'Must be ≥ 0'),
  utilityTypes: z.array(z.string()).min(1, 'Select at least one utility')
});

// Bank Data
export const bankDataSchema = z.object({
  averageMonthlyIncome: z.number().min(0, 'Must be ≥ 0'),
  averageMonthlyExpenses: z.number().min(0, 'Must be ≥ 0'),
  savingsBalance: z.number().min(0, 'Must be ≥ 0'),
  checkingBalance: z.number().min(0, 'Must be ≥ 0'),
  overdrafts: z.number().int().min(0, 'Must be ≥ 0'),
  accountAgeMonths: z.number().int().min(1, 'Must be ≥ 1')
});

// Employment History
export const employmentHistorySchema = z.object({
  currentJobTitle: z.string().trim().min(1, 'Required'),
  currentEmployerName: z.string().trim().min(1, 'Required'),
  currentJobMonths: z.number().int().min(1, '≥ 1'),
  totalWorkExperienceYears: z.number().min(0, '≥ 0'),
  industryType: z.string().trim().min(1, 'Required'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'self-employed'], { errorMap: () => ({ message: 'Select type' }) })
});

// Education History
export const educationHistorySchema = z.object({
  highestDegree: z.string().trim().min(1, 'Required'),
  graduationYear: z.number().int().min(1950, 'Too early').max(new Date().getFullYear() + 10, 'Unrealistic'),
  fieldOfStudy: z.string().trim().min(1, 'Required'),
  institutionName: z.string().trim().min(1, 'Required'),
  hasStudentLoans: z.boolean(),
  studentLoanBalance: z.number().min(0, 'Must be ≥ 0')
}).superRefine((data, ctx) => {
  if (data.hasStudentLoans && data.studentLoanBalance <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Enter positive balance',
      path: ['studentLoanBalance']
    });
  }
  if (!data.hasStudentLoans && data.studentLoanBalance !== 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Should be 0 when no loans',
      path: ['studentLoanBalance']
    });
  }
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type RentHistoryInput = z.infer<typeof rentHistorySchema>;
export type UtilityHistoryInput = z.infer<typeof utilityHistorySchema>;
export type BankDataInput = z.infer<typeof bankDataSchema>;
export type EmploymentHistoryInput = z.infer<typeof employmentHistorySchema>;
export type EducationHistoryInput = z.infer<typeof educationHistorySchema>;

// Generic helper to run safeParse and return { errors, valid }
export function validateWithSchema<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  const result = schema.safeParse(data);
  if (result.success) return { valid: true, errors: {} as Record<string, string> };
  const errs: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !errs[key]) errs[key] = issue.message;
  }
  return { valid: false, errors: errs };
}

// Full user data schema (for persistence integrity checks)
export const userDataSchema = z.object({
  personalInfo: personalInfoSchema,
  rentHistory: rentHistorySchema,
  utilityHistory: utilityHistorySchema,
  bankData: bankDataSchema,
  employmentHistory: employmentHistorySchema,
  educationHistory: educationHistorySchema
});
export type UserDataInput = z.infer<typeof userDataSchema>;

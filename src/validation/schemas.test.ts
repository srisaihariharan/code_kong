import { personalInfoSchema, rentHistorySchema, educationHistorySchema } from './schemas';

describe('validation schemas', () => {
  it('validates a correct personal info object', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      dateOfBirth: '1990-01-01',
      address: '123 Street',
      city: 'Town',
      state: 'ST',
      zipCode: '12345'
    };
    expect(personalInfoSchema.parse(data)).toBeTruthy();
  });

  it('rejects invalid rent history', () => {
    const bad = { monthlyRent: -10, rentPeriodMonths: 0, latePayments: -1, earlyPayments: -2, landlordRating: 9 };
    const res = rentHistorySchema.safeParse(bad as any);
    expect(res.success).toBe(false);
  });

  it('education loan refinement enforces logic', () => {
    const res = educationHistorySchema.safeParse({
      highestDegree: 'Bachelor\'s Degree',
      graduationYear: 2022,
      fieldOfStudy: 'Engineering',
      institutionName: 'Uni',
      hasStudentLoans: true,
      studentLoanBalance: 0
    });
    expect(res.success).toBe(false);
  });
});

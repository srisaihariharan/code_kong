import { UserData, ScoreFactor } from '../../types';

export function calculateEducationScore(educationHistory: UserData['educationHistory']): ScoreFactor {
  const { highestDegree, hasStudentLoans, studentLoanBalance } = educationHistory;
  let score = 0;
  const degreeScores: Record<string, number> = {
    'High School': 30,
    'Associate Degree': 45,
    "Bachelor's Degree": 60,
    "Master's Degree": 75,
    'Doctoral Degree': 85
  };
  score += (degreeScores[highestDegree] || 20) * 0.6;
  if (hasStudentLoans) {
    if (studentLoanBalance < 0) {
      score += 35 * 0.4;
    } else if (studentLoanBalance < 50000) {
      score += 40 * 0.4;
    } else if (studentLoanBalance < 100000) {
      score += 30 * 0.4;
    } else {
      score += 20 * 0.4;
    }
  } else {
    score += 35 * 0.4;
  }
  return {
    category: 'Education Background',
    impact: Math.round(score),
    description: `${highestDegree}${hasStudentLoans ? ` with $${studentLoanBalance.toLocaleString()} in loans` : ''}`,
    weight: 10
  };
}

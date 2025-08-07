import { UserData, CreditScore, ScoreFactor, Recommendation } from '../types';

export class CreditScoringService {
  private calculateRentScore(rentHistory: UserData['rentHistory']): ScoreFactor {
    const { monthlyRent, rentPeriodMonths, latePayments, earlyPayments, landlordRating } = rentHistory;
    
    let score = 0;
    
    // Payment consistency (40% weight)
    if (rentPeriodMonths > 0) {
      const onTimeRate = (rentPeriodMonths - latePayments) / rentPeriodMonths;
      score += onTimeRate * 40;
      
      // Bonus for early payments
      const earlyPaymentBonus = Math.min((earlyPayments / rentPeriodMonths) * 10, 10);
      score += earlyPaymentBonus;
    }
    
    // Rent period stability (20% weight)
    const stabilityScore = Math.min(rentPeriodMonths / 24, 1) * 20;
    score += stabilityScore;
    
    // Landlord rating (10% weight)
    score += (landlordRating / 5) * 10;
    
    return {
      category: 'Rent Payment History',
      impact: Math.round(score),
      description: `${rentPeriodMonths} months of rent history with ${latePayments} late payments`,
      weight: 25
    };
  }

  private calculateUtilityScore(utilityHistory: UserData['utilityHistory']): ScoreFactor {
    const { averageMonthlyUtilities, utilityPeriodMonths, lateUtilityPayments, utilityTypes } = utilityHistory;
    
    let score = 0;
    
    // Payment consistency (50% weight)
    if (utilityPeriodMonths > 0) {
      const onTimeRate = (utilityPeriodMonths - lateUtilityPayments) / utilityPeriodMonths;
      score += onTimeRate * 50;
    }
    
    // Utility diversity bonus (20% weight)
    const diversityBonus = Math.min(utilityTypes.length / 4, 1) * 20;
    score += diversityBonus;
    
    // History length (30% weight)
    const historyScore = Math.min(utilityPeriodMonths / 24, 1) * 30;
    score += historyScore;
    
    return {
      category: 'Utility Payment History',
      impact: Math.round(score),
      description: `${utilityPeriodMonths} months of utility payments across ${utilityTypes.length} services`,
      weight: 20
    };
  }

  private calculateBankScore(bankData: UserData['bankData']): ScoreFactor {
    const { averageMonthlyIncome, averageMonthlyExpenses, savingsBalance, checkingBalance, overdrafts, accountAgeMonths } = bankData;
    
    let score = 0;
    
    // Cash flow stability (30% weight)
    const cashFlow = averageMonthlyIncome - averageMonthlyExpenses;
    const cashFlowRatio = cashFlow / averageMonthlyIncome;
    score += Math.max(0, Math.min(cashFlowRatio * 30, 30));
    
    // Savings buffer (25% weight)
    const monthsOfExpenses = (savingsBalance + checkingBalance) / averageMonthlyExpenses;
    const savingsScore = Math.min(monthsOfExpenses / 6, 1) * 25;
    score += savingsScore;
    
    // Account management (25% weight)
    const overdraftPenalty = Math.max(0, 25 - (overdrafts * 5));
    score += overdraftPenalty;
    
    // Account age (20% weight)
    const ageScore = Math.min(accountAgeMonths / 24, 1) * 20;
    score += ageScore;
    
    return {
      category: 'Banking Behavior',
      impact: Math.round(score),
      description: `${accountAgeMonths} months banking history with $${cashFlow.toFixed(0)} monthly cash flow`,
      weight: 30
    };
  }

  private calculateEmploymentScore(employmentHistory: UserData['employmentHistory']): ScoreFactor {
    const { currentJobMonths, totalWorkExperienceYears, employmentType } = employmentHistory;
    
    let score = 0;
    
    // Job stability (40% weight)
    const stabilityScore = Math.min(currentJobMonths / 24, 1) * 40;
    score += stabilityScore;
    
    // Total experience (30% weight)
    const experienceScore = Math.min(totalWorkExperienceYears / 10, 1) * 30;
    score += experienceScore;
    
    // Employment type (30% weight)
    const typeMultipliers = {
      'full-time': 1.0,
      'part-time': 0.7,
      'contract': 0.8,
      'self-employed': 0.9
    };
    score += 30 * typeMultipliers[employmentType];
    
    return {
      category: 'Employment Stability',
      impact: Math.round(score),
      description: `${totalWorkExperienceYears} years experience, current role for ${currentJobMonths} months`,
      weight: 15
    };
  }

  private calculateEducationScore(educationHistory: UserData['educationHistory']): ScoreFactor {
    const { highestDegree, hasStudentLoans, studentLoanBalance } = educationHistory;
    
    let score = 0;
    
    // Education level (60% weight)
    const degreeScores = {
      'High School': 30,
      'Associate Degree': 45,
      'Bachelor\'s Degree': 60,
      'Master\'s Degree': 75,
      'Doctoral Degree': 85
    };
    score += (degreeScores[highestDegree as keyof typeof degreeScores] || 20) * 0.6;
    
    // Student loan management (40% weight)
    if (hasStudentLoans) {
      // Reasonable loan balance gets points for education investment
      if (studentLoanBalance < 50000) {
        score += 40 * 0.4;
      } else if (studentLoanBalance < 100000) {
        score += 30 * 0.4;
      } else {
        score += 20 * 0.4;
      }
    } else {
      score += 35 * 0.4; // No debt is good
    }
    
    return {
      category: 'Education Background',
      impact: Math.round(score),
      description: `${highestDegree}${hasStudentLoans ? ` with $${studentLoanBalance.toLocaleString()} in loans` : ''}`,
      weight: 10
    };
  }

  private generateRecommendations(factors: ScoreFactor[], userData: UserData): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    // Analyze weak areas and provide targeted advice
    const weakestFactor = factors.reduce((min, factor) => factor.impact < min.impact ? factor : min);
    
    if (weakestFactor.category === 'Rent Payment History' && weakestFactor.impact < 70) {
      recommendations.push({
        title: 'Improve Rent Payment Consistency',
        description: 'Set up automatic payments for rent to avoid late fees and build positive payment history.',
        priority: 'High',
        estimatedImpact: 15
      });
    }
    
    if (weakestFactor.category === 'Banking Behavior' && weakestFactor.impact < 60) {
      recommendations.push({
        title: 'Build Emergency Savings',
        description: 'Aim to save 3-6 months of expenses to improve your financial stability score.',
        priority: 'High',
        estimatedImpact: 20
      });
    }
    
    if (userData.bankData.overdrafts > 3) {
      recommendations.push({
        title: 'Reduce Overdraft Frequency',
        description: 'Monitor account balances closely and consider overdraft protection to avoid fees.',
        priority: 'Medium',
        estimatedImpact: 12
      });
    }
    
    if (userData.employmentHistory.currentJobMonths < 12) {
      recommendations.push({
        title: 'Focus on Job Stability',
        description: 'Maintaining steady employment for 12+ months significantly improves creditworthiness.',
        priority: 'Medium',
        estimatedImpact: 10
      });
    }
    
    // Universal recommendations
    recommendations.push({
      title: 'Diversify Credit-Building Activities',
      description: 'Consider additional credit-building tools like secured credit cards or credit-builder loans.',
      priority: 'Low',
      estimatedImpact: 8
    });
    
    return recommendations;
  }

  public calculateCreditScore(userData: UserData): CreditScore {
    const factors = [
      this.calculateRentScore(userData.rentHistory),
      this.calculateUtilityScore(userData.utilityHistory),
      this.calculateBankScore(userData.bankData),
      this.calculateEmploymentScore(userData.employmentHistory),
      this.calculateEducationScore(userData.educationHistory)
    ];
    
    // Calculate weighted score
    const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
    const weightedScore = factors.reduce((sum, factor) => sum + (factor.impact * factor.weight), 0) / totalWeight;
    
    // Convert to standard credit score range (300-850)
    const score = Math.round(300 + (weightedScore / 100) * 550);
    
    // Determine grade and risk level
    let grade: string;
    let riskLevel: 'Low' | 'Medium' | 'High';
    
    if (score >= 750) {
      grade = 'A+';
      riskLevel = 'Low';
    } else if (score >= 700) {
      grade = 'A';
      riskLevel = 'Low';
    } else if (score >= 650) {
      grade = 'B+';
      riskLevel = 'Medium';
    } else if (score >= 600) {
      grade = 'B';
      riskLevel = 'Medium';
    } else if (score >= 550) {
      grade = 'C+';
      riskLevel = 'Medium';
    } else if (score >= 500) {
      grade = 'C';
      riskLevel = 'High';
    } else {
      grade = 'D';
      riskLevel = 'High';
    }
    
    const recommendations = this.generateRecommendations(factors, userData);
    
    return {
      score,
      grade,
      factors,
      recommendations,
      riskLevel
    };
  }
}
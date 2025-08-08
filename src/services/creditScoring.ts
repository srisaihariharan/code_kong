import { UserData, CreditScore, ScoreFactor, Recommendation } from '../types';
import { calculateRentScore } from './factors/rent';
import { calculateUtilityScore } from './factors/utility';
import { calculateBankScore } from './factors/bank';
import { calculateEmploymentScore } from './factors/employment';
import { calculateEducationScore } from './factors/education';

export class CreditScoringService {
  // Factor calculators are imported (single responsibility & testable)

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
      calculateRentScore(userData.rentHistory),
      calculateUtilityScore(userData.utilityHistory),
      calculateBankScore(userData.bankData),
      calculateEmploymentScore(userData.employmentHistory),
      calculateEducationScore(userData.educationHistory)
    ];
    
    // Calculate weighted score
    const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0);
  const weightedScore = totalWeight > 0 ? (factors.reduce((sum, factor) => sum + (factor.impact * factor.weight), 0) / totalWeight) : 0;
    
    // Convert to standard credit score range (300-850)
  const score = Math.round(300 + (Math.min(Math.max(weightedScore, 0), 100) / 100) * 550);
    
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
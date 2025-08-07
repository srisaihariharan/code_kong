import React from 'react';
import { CreditScore } from '../types';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Lightbulb } from 'lucide-react';

interface CreditScoreResultProps {
  creditScore: CreditScore;
  onRestart: () => void;
}

export default function CreditScoreResult({ creditScore, onRestart }: CreditScoreResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-green-500';
    if (score >= 600) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 700) return 'from-green-500 to-emerald-600';
    if (score >= 600) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'High': return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Score Display */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-white dark:bg-gray-800 shadow-2xl mb-8 relative">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getScoreGradient(creditScore.score)} opacity-10`} />
            <div className="text-center">
              <div className={`text-5xl font-bold ${getScoreColor(creditScore.score)} mb-2`}>
                {creditScore.score}
              </div>
              <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Grade {creditScore.grade}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Alternative Credit Score
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {getRiskIcon(creditScore.riskLevel)}
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {creditScore.riskLevel} Risk Profile
            </span>
          </div>
        </div>

        {/* Score Factors */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-blue-600" />
            Score Breakdown
          </h2>
          
          <div className="space-y-6">
            {creditScore.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {factor.category}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {factor.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 ml-6">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {factor.impact}/100
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Weight: {factor.weight}%
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                      style={{ width: `${factor.impact}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
            Personalized Recommendations
          </h2>
          
          <div className="grid gap-6">
            {creditScore.recommendations.map((recommendation, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {recommendation.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority} Priority
                    </span>
                    <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{recommendation.estimatedImpact}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {recommendation.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Calculate New Score
          </button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Your score can improve as you implement our recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
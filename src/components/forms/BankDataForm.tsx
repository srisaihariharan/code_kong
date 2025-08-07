import React from 'react';
import { BankData } from '../../types';

interface BankDataFormProps {
  data: BankData;
  onChange: (data: BankData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BankDataForm({ data, onChange, onNext, onBack }: BankDataFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (field: keyof BankData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Banking Information</h2>
        <p className="text-gray-600 dark:text-gray-300">Your banking behavior provides insights into financial stability and cash flow management.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Monthly Income ($)
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.averageMonthlyIncome || ''}
              onChange={(e) => handleChange('averageMonthlyIncome', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Monthly Expenses ($)
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.averageMonthlyExpenses || ''}
              onChange={(e) => handleChange('averageMonthlyExpenses', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Savings Account Balance ($)
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.savingsBalance || ''}
              onChange={(e) => handleChange('savingsBalance', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Checking Account Balance ($)
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.checkingBalance || ''}
              onChange={(e) => handleChange('checkingBalance', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Overdrafts (last 12 months)
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.overdrafts || ''}
              onChange={(e) => handleChange('overdrafts', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Account Age (months)
            </label>
            <input
              type="number"
              required
              min="1"
              value={data.accountAgeMonths || ''}
              onChange={(e) => handleChange('accountAgeMonths', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
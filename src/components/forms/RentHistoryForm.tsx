import React from 'react';
import { RentHistory } from '../../types';

interface RentHistoryFormProps {
  data: RentHistory;
  onChange: (data: RentHistory) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RentHistoryForm({ data, onChange, onNext, onBack }: RentHistoryFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleChange = (field: keyof RentHistory, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Rent Payment History</h2>
        <p className="text-gray-600 dark:text-gray-300">Tell us about your rental payment history to build your credit profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Monthly Rent Amount ($)
          </label>
          <input
            type="number"
            required
            min="0"
            value={data.monthlyRent || ''}
            onChange={(e) => handleChange('monthlyRent', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How many months have you been paying rent at this amount?
          </label>
          <input
            type="number"
            required
            min="1"
            value={data.rentPeriodMonths || ''}
            onChange={(e) => handleChange('rentPeriodMonths', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Late Payments
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.latePayments || ''}
              onChange={(e) => handleChange('latePayments', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Early Payments
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.earlyPayments || ''}
              onChange={(e) => handleChange('earlyPayments', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Landlord Rating (1-5 stars)
          </label>
          <select
            required
            value={data.landlordRating || ''}
            onChange={(e) => handleChange('landlordRating', parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select rating</option>
            <option value="5">5 - Excellent landlord</option>
            <option value="4">4 - Good landlord</option>
            <option value="3">3 - Average landlord</option>
            <option value="2">2 - Below average landlord</option>
            <option value="1">1 - Poor landlord</option>
          </select>
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
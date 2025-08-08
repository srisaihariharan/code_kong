import React, { useState, useEffect } from 'react';
import { UtilityHistory } from '../../types';
import { utilityHistorySchema, validateWithSchema } from '../../validation/schemas';

interface UtilityHistoryFormProps {
  data: UtilityHistory;
  onChange: (data: UtilityHistory) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function UtilityHistoryForm({ data, onChange, onNext, onBack }: UtilityHistoryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const runValidation = (next: UtilityHistory) => {
    const { valid, errors } = validateWithSchema(utilityHistorySchema, next);
    setErrors(errors);
    setIsValid(valid);
  };

  useEffect(() => {
    runValidation(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const utilityOptions = ['Electric', 'Gas', 'Water', 'Internet', 'Cable/TV', 'Trash', 'Sewer'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runValidation(data);
    if (isValid) onNext();
  };

  const handleChange = (field: keyof UtilityHistory, value: string | number | string[]) => {
    const next = { ...data, [field]: value };
    onChange(next);
    setTouched(t => ({ ...t, [field]: true }));
    runValidation(next);
  };

  const handleUtilityToggle = (utility: string) => {
    const newTypes = data.utilityTypes.includes(utility)
      ? data.utilityTypes.filter(type => type !== utility)
      : [...data.utilityTypes, utility];
    handleChange('utilityTypes', newTypes);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Utility Payment History</h2>
        <p className="text-gray-600 dark:text-gray-300">Utility payments show consistent financial responsibility and help build your credit profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Average Monthly Utility Costs ($)
          </label>
          <input
            type="number"
            required
            min="0"
            value={data.averageMonthlyUtilities || ''}
            onChange={(e) => handleChange('averageMonthlyUtilities', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {touched.averageMonthlyUtilities && errors.averageMonthlyUtilities && (
            <p className="mt-1 text-xs text-red-600">{errors.averageMonthlyUtilities}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How many months of utility payment history do you have?
          </label>
          <input
            type="number"
            required
            min="1"
            value={data.utilityPeriodMonths || ''}
            onChange={(e) => handleChange('utilityPeriodMonths', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {touched.utilityPeriodMonths && errors.utilityPeriodMonths && (
            <p className="mt-1 text-xs text-red-600">{errors.utilityPeriodMonths}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Late Utility Payments
          </label>
          <input
            type="number"
            required
            min="0"
            value={data.lateUtilityPayments || ''}
            onChange={(e) => handleChange('lateUtilityPayments', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {touched.lateUtilityPayments && errors.lateUtilityPayments && (
            <p className="mt-1 text-xs text-red-600">{errors.lateUtilityPayments}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Which utilities do you pay? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {utilityOptions.map((utility) => (
              <button
                key={utility}
                type="button"
                onClick={() => handleUtilityToggle(utility)}
                className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                  data.utilityTypes.includes(utility)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {utility}
              </button>
            ))}
          </div>
          {touched.utilityTypes && errors.utilityTypes && (
            <p className="mt-2 text-xs text-red-600">{errors.utilityTypes}</p>
          )}
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
            disabled={!isValid}
            className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValid ? 'Continue' : 'Fix errors'}
          </button>
        </div>
      </form>
    </div>
  );
}
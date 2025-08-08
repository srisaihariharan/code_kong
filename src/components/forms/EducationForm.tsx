import React, { useState, useEffect } from 'react';
import { EducationHistory } from '../../types';
import { educationHistorySchema, validateWithSchema } from '../../validation/schemas';

interface EducationFormProps {
  data: EducationHistory;
  onChange: (data: EducationHistory) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function EducationForm({ data, onChange, onNext, onBack }: EducationFormProps) {
  const degreeOptions = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree'
  ];

  const fieldOptions = [
    'Business', 'Engineering', 'Computer Science', 'Healthcare', 'Education',
    'Liberal Arts', 'Science', 'Social Sciences', 'Fine Arts', 'Other'
  ];

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const runValidation = (next: EducationHistory) => {
    const { valid, errors } = validateWithSchema(educationHistorySchema, next);
    setErrors(errors);
    setIsValid(valid);
  };

  useEffect(() => {
    runValidation(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runValidation(data);
    if (isValid) onNext();
  };

  const handleChange = (field: keyof EducationHistory, value: string | number | boolean) => {
    const next = { ...data, [field]: value };
    onChange(next);
    setTouched(t => ({ ...t, [field]: true }));
    runValidation(next);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Education History</h2>
        <p className="text-gray-600 dark:text-gray-300">Educational background can indicate future earning potential and financial responsibility.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Highest Degree Obtained
          </label>
          <select
            required
            value={data.highestDegree}
            onChange={(e) => handleChange('highestDegree', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select highest degree</option>
            {degreeOptions.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
          {touched.highestDegree && errors.highestDegree && (
            <p className="mt-1 text-xs text-red-600">{errors.highestDegree}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Graduation Year
            </label>
            <input
              type="number"
              required
              min="1950"
              max={new Date().getFullYear() + 10}
              value={data.graduationYear || ''}
              onChange={(e) => handleChange('graduationYear', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.graduationYear && errors.graduationYear && (
              <p className="mt-1 text-xs text-red-600">{errors.graduationYear}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Field of Study
            </label>
            <select
              required
              value={data.fieldOfStudy}
              onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select field of study</option>
              {fieldOptions.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
            {touched.fieldOfStudy && errors.fieldOfStudy && (
              <p className="mt-1 text-xs text-red-600">{errors.fieldOfStudy}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Institution Name
          </label>
          <input
            type="text"
            required
            value={data.institutionName}
            onChange={(e) => handleChange('institutionName', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {touched.institutionName && errors.institutionName && (
            <p className="mt-1 text-xs text-red-600">{errors.institutionName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Do you have student loans?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleChange('hasStudentLoans', true)}
              className={`flex-1 p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                data.hasStudentLoans
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                handleChange('hasStudentLoans', false);
                handleChange('studentLoanBalance', 0);
              }}
              className={`flex-1 p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                !data.hasStudentLoans && data.hasStudentLoans !== undefined
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {data.hasStudentLoans && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Student Loan Balance ($)
            </label>
            <input
              type="number"
              required
              min="0"
              value={data.studentLoanBalance || ''}
              onChange={(e) => handleChange('studentLoanBalance', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.studentLoanBalance && errors.studentLoanBalance && (
              <p className="mt-1 text-xs text-red-600">{errors.studentLoanBalance}</p>
            )}
          </div>
        )}

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
            {isValid ? 'Calculate Score' : 'Fix errors'}
          </button>
        </div>
      </form>
    </div>
  );
}
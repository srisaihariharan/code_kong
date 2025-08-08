import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '../../types';
import { personalInfoSchema } from '../../validation/schemas';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
}

export default function PersonalInfoForm({ data, onChange, onNext }: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const validate = (nextData: PersonalInfo) => {
    const res = personalInfoSchema.safeParse(nextData);
    if (res.success) {
      setErrors({});
      setIsValid(true);
    } else {
      const fieldErrors: Record<string, string> = {};
      res.error.issues.forEach(issue => {
        const key = issue.path[0];
        if (typeof key === 'string' && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsValid(false);
    }
  };

  useEffect(() => {
    validate(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validate(data);
    if (isValid) onNext();
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const next = { ...data, [field]: value };
    onChange(next);
    setTouched(t => ({ ...t, [field]: true }));
    validate(next);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Personal Information</h2>
        <p className="text-gray-600 dark:text-gray-300">Let's start with some basic information about you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              required
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.firstName && errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              required
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.lastName && errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            required
            value={data.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address
          </label>
          <input
            type="text"
            required
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          {touched.address && errors.address && (
            <p className="mt-1 text-xs text-red-600">{errors.address}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City
            </label>
            <input
              type="text"
              required
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.city && errors.city && (
              <p className="mt-1 text-xs text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State
            </label>
            <input
              type="text"
              required
              value={data.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.state && errors.state && (
              <p className="mt-1 text-xs text-red-600">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              required
              value={data.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {touched.zipCode && errors.zipCode && (
              <p className="mt-1 text-xs text-red-600">{errors.zipCode}</p>
            )}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValid ? 'Continue' : 'Fix highlighted fields'}
          </button>
        </div>
      </form>
    </div>
  );
}
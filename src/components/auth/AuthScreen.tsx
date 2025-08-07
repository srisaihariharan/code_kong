import React, { useState } from 'react';
import LoginForm from './LoginForm';
import OTPVerification from './OTPVerification';

export default function AuthScreen() {
  const [step, setStep] = useState<'login' | 'verify'>('login');
  const [email, setEmail] = useState('');

  const handleOTPSent = (userEmail: string) => {
    setEmail(userEmail);
    setStep('verify');
  };

  const handleBack = () => {
    setStep('login');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
          {step === 'login' ? (
            <LoginForm onOTPSent={handleOTPSent} />
          ) : (
            <OTPVerification email={email} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}
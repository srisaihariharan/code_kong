import { useState, useMemo, lazy, Suspense, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
// Auth removed (login page disabled)
import ThemeToggle from './components/ThemeToggle';
import UserProfile from './components/UserProfile';
import ProgressBar from './components/ProgressBar';
// import AuthScreen from './components/auth/AuthScreen';
import WelcomeScreen from './components/WelcomeScreen';
// Lazy-loaded heavier components
const PersonalInfoForm = lazy(() => import('./components/forms/PersonalInfoForm'));
const RentHistoryForm = lazy(() => import('./components/forms/RentHistoryForm'));
const UtilityHistoryForm = lazy(() => import('./components/forms/UtilityHistoryForm'));
const BankDataForm = lazy(() => import('./components/forms/BankDataForm'));
const EmploymentForm = lazy(() => import('./components/forms/EmploymentForm'));
const EducationForm = lazy(() => import('./components/forms/EducationForm'));
const CreditScoreResult = lazy(() => import('./components/CreditScoreResult'));
import { CreditScore } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CreditScoringService } from './services/creditScoring';
import { FORM_STEPS, FormStep, getStepIndex } from './constants/steps';
import { useCreditApplicationForm } from './hooks/useCreditApplicationForm';

function AppContent() {
  const [currentStep, setCurrentStep] = useState<FormStep>('welcome');
  const { userData, update, reset } = useCreditApplicationForm();

  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);
  const creditScoringService = useMemo(() => new CreditScoringService(), []);

  // Removed auth gating: always render the flow starting from welcome

  const getStepNumber = useCallback((step: FormStep) => getStepIndex(step), []);

  const handleNext = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('personal');
        break;
      case 'personal':
        setCurrentStep('rent');
        break;
      case 'rent':
        setCurrentStep('utility');
        break;
      case 'utility':
        setCurrentStep('bank');
        break;
      case 'bank':
        setCurrentStep('employment');
        break;
      case 'employment':
        setCurrentStep('education');
        break;
      case 'education':
        const score = creditScoringService.calculateCreditScore(userData);
        setCreditScore(score);
        setCurrentStep('result');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'personal':
        setCurrentStep('welcome');
        break;
      case 'rent':
        setCurrentStep('personal');
        break;
      case 'utility':
        setCurrentStep('rent');
        break;
      case 'bank':
        setCurrentStep('utility');
        break;
      case 'employment':
        setCurrentStep('bank');
        break;
      case 'education':
        setCurrentStep('employment');
        break;
    }
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
    setCreditScore(null);
  reset();
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      
      {currentStep === 'welcome' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <UserProfile />
            <WelcomeScreen onStart={handleNext} />
          </div>
        </div>
      )}

      {currentStep !== 'welcome' && currentStep !== 'result' && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <UserProfile />
            <ProgressBar currentStep={getStepNumber(currentStep)} totalSteps={FORM_STEPS.length - 1} />
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <Suspense fallback={<div className="py-12 text-center text-gray-600 dark:text-gray-300">Loading step...</div>}>
                {currentStep === 'personal' && (
                  <PersonalInfoForm
                    data={userData.personalInfo}
                    onChange={(data) => update({ type: 'personal', payload: data })}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 'rent' && (
                  <RentHistoryForm
                    data={userData.rentHistory}
                    onChange={(data) => update({ type: 'rent', payload: data })}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 'utility' && (
                  <UtilityHistoryForm
                    data={userData.utilityHistory}
                    onChange={(data) => update({ type: 'utility', payload: data })}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 'bank' && (
                  <BankDataForm
                    data={userData.bankData}
                    onChange={(data) => update({ type: 'bank', payload: data })}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 'employment' && (
                  <EmploymentForm
                    data={userData.employmentHistory}
                    onChange={(data) => update({ type: 'employment', payload: data })}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 'education' && (
                  <EducationForm
                    data={userData.educationHistory}
                    onChange={(data) => update({ type: 'education', payload: data })}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'result' && creditScore && (
        <Suspense fallback={<div className="p-8 text-center text-gray-600 dark:text-gray-300">Calculating score...</div>}>
          <CreditScoreResult creditScore={creditScore} onRestart={handleRestart} />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
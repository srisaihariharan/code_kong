import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ThemeToggle from './components/ThemeToggle';
import AuthScreen from './components/auth/AuthScreen';
import UserProfile from './components/UserProfile';
import WelcomeScreen from './components/WelcomeScreen';
import ProgressBar from './components/ProgressBar';
import PersonalInfoForm from './components/forms/PersonalInfoForm';
import RentHistoryForm from './components/forms/RentHistoryForm';
import UtilityHistoryForm from './components/forms/UtilityHistoryForm';
import BankDataForm from './components/forms/BankDataForm';
import EmploymentForm from './components/forms/EmploymentForm';
import EducationForm from './components/forms/EducationForm';
import CreditScoreResult from './components/CreditScoreResult';
import { UserData, CreditScore } from './types';
import { CreditScoringService } from './services/creditScoring';

type FormStep = 'welcome' | 'personal' | 'rent' | 'utility' | 'bank' | 'employment' | 'education' | 'result';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState<FormStep>('welcome');
  const [userData, setUserData] = useState<UserData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    rentHistory: {
      monthlyRent: 0,
      rentPeriodMonths: 0,
      latePayments: 0,
      earlyPayments: 0,
      landlordRating: 0
    },
    utilityHistory: {
      averageMonthlyUtilities: 0,
      utilityPeriodMonths: 0,
      lateUtilityPayments: 0,
      utilityTypes: []
    },
    bankData: {
      averageMonthlyIncome: 0,
      averageMonthlyExpenses: 0,
      savingsBalance: 0,
      checkingBalance: 0,
      overdrafts: 0,
      accountAgeMonths: 0
    },
    employmentHistory: {
      currentJobTitle: '',
      currentEmployerName: '',
      currentJobMonths: 0,
      totalWorkExperienceYears: 0,
      industryType: '',
      employmentType: 'full-time'
    },
    educationHistory: {
      highestDegree: '',
      graduationYear: 0,
      fieldOfStudy: '',
      institutionName: '',
      hasStudentLoans: false,
      studentLoanBalance: 0
    }
  });

  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);

  const creditScoringService = new CreditScoringService();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <ThemeToggle />
        <AuthScreen />
      </div>
    );
  }

  const getStepNumber = (step: FormStep): number => {
    const steps = ['welcome', 'personal', 'rent', 'utility', 'bank', 'employment', 'education', 'result'];
    return steps.indexOf(step);
  };

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
    setUserData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      },
      rentHistory: {
        monthlyRent: 0,
        rentPeriodMonths: 0,
        latePayments: 0,
        earlyPayments: 0,
        landlordRating: 0
      },
      utilityHistory: {
        averageMonthlyUtilities: 0,
        utilityPeriodMonths: 0,
        lateUtilityPayments: 0,
        utilityTypes: []
      },
      bankData: {
        averageMonthlyIncome: 0,
        averageMonthlyExpenses: 0,
        savingsBalance: 0,
        checkingBalance: 0,
        overdrafts: 0,
        accountAgeMonths: 0
      },
      employmentHistory: {
        currentJobTitle: '',
        currentEmployerName: '',
        currentJobMonths: 0,
        totalWorkExperienceYears: 0,
        industryType: '',
        employmentType: 'full-time'
      },
      educationHistory: {
        highestDegree: '',
        graduationYear: 0,
        fieldOfStudy: '',
        institutionName: '',
        hasStudentLoans: false,
        studentLoanBalance: 0
      }
    });
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
            <ProgressBar currentStep={getStepNumber(currentStep)} totalSteps={7} />
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              {currentStep === 'personal' && (
                <PersonalInfoForm
                  data={userData.personalInfo}
                  onChange={(data) => setUserData({ ...userData, personalInfo: data })}
                  onNext={handleNext}
                />
              )}

              {currentStep === 'rent' && (
                <RentHistoryForm
                  data={userData.rentHistory}
                  onChange={(data) => setUserData({ ...userData, rentHistory: data })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'utility' && (
                <UtilityHistoryForm
                  data={userData.utilityHistory}
                  onChange={(data) => setUserData({ ...userData, utilityHistory: data })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'bank' && (
                <BankDataForm
                  data={userData.bankData}
                  onChange={(data) => setUserData({ ...userData, bankData: data })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'employment' && (
                <EmploymentForm
                  data={userData.employmentHistory}
                  onChange={(data) => setUserData({ ...userData, employmentHistory: data })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 'education' && (
                <EducationForm
                  data={userData.educationHistory}
                  onChange={(data) => setUserData({ ...userData, educationHistory: data })}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {currentStep === 'result' && creditScore && (
        <CreditScoreResult creditScore={creditScore} onRestart={handleRestart} />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
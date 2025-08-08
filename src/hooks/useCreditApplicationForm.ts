import { useReducer, useCallback } from 'react';
import { UserData, PersonalInfo, RentHistory, UtilityHistory, BankData, EmploymentHistory, EducationHistory } from '../types';
import { createEmptyUserData } from '../utils/userDataFactory';

type Action =
  | { type: 'reset' }
  | { type: 'personal'; payload: PersonalInfo }
  | { type: 'rent'; payload: RentHistory }
  | { type: 'utility'; payload: UtilityHistory }
  | { type: 'bank'; payload: BankData }
  | { type: 'employment'; payload: EmploymentHistory }
  | { type: 'education'; payload: EducationHistory };

function reducer(state: UserData, action: Action): UserData {
  switch (action.type) {
    case 'reset':
      return createEmptyUserData();
    case 'personal':
      return { ...state, personalInfo: action.payload };
    case 'rent':
      return { ...state, rentHistory: action.payload };
    case 'utility':
      return { ...state, utilityHistory: action.payload };
    case 'bank':
      return { ...state, bankData: action.payload };
    case 'employment':
      return { ...state, employmentHistory: action.payload };
    case 'education':
      return { ...state, educationHistory: action.payload };
    default:
      return state;
  }
}

export function useCreditApplicationForm() {
  const [state, dispatch] = useReducer(reducer, undefined, createEmptyUserData);

  const update = useCallback((action: Exclude<Action, { type: 'reset' }>) => {
    dispatch(action as Action);
  }, []);

  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return {
    userData: state,
    update,
    reset,
  };
}

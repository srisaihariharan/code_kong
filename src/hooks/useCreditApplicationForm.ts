import { useReducer, useCallback, useEffect, useRef } from 'react';
import { UserData, PersonalInfo, RentHistory, UtilityHistory, BankData, EmploymentHistory, EducationHistory } from '../types';
import { createEmptyUserData } from '../utils/userDataFactory';
import { userDataSchema } from '../validation/schemas';

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

const STORAGE_KEY = 'codekong:userData:v1';

export function useCreditApplicationForm() {
  // Lazy initializer: attempt to hydrate from storage
  const initRef = useRef<boolean>(false);
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
            const result = userDataSchema.safeParse(parsed);
            if (result.success) {
              return result.data as UserData;
            }
        }
      } catch {
        // ignore corrupt data
      }
    }
    return createEmptyUserData();
  });

  // Persist on change (debounced via requestAnimationFrame batching)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!initRef.current) {
      initRef.current = true;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or blocked; ignore
    }
  }, [state]);

  const update = useCallback((action: Exclude<Action, { type: 'reset' }>) => {
    dispatch(action as Action);
  }, []);

  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  return { userData: state, update, reset };
}

export const FORM_STEPS = [
  'welcome',
  'personal',
  'rent',
  'utility',
  'bank',
  'employment',
  'education',
  'result'
] as const;

export type FormStep = typeof FORM_STEPS[number];

export const getStepIndex = (step: FormStep) => FORM_STEPS.indexOf(step);

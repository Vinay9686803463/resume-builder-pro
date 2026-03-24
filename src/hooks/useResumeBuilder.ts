import { useState, useCallback } from 'react';
import { ResumeData, defaultResumeData } from '@/types/resume';

export function useResumeBuilder() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [currentStep, setCurrentStep] = useState(0);

  const updatePersonal = useCallback((personal: Partial<ResumeData['personal']>) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, ...personal } }));
  }, []);

  const updateField = useCallback(<K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = useCallback(() => setCurrentStep(prev => Math.min(prev + 1, 6)), []);
  const prevStep = useCallback(() => setCurrentStep(prev => Math.max(prev - 1, 0)), []);
  const goToStep = useCallback((step: number) => setCurrentStep(step), []);

  const loadSample = useCallback((sample: ResumeData) => setData(sample), []);

  return { data, currentStep, updatePersonal, updateField, nextStep, prevStep, goToStep, loadSample, setData };
}

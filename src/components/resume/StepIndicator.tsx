import { motion } from 'framer-motion';
import { User, GraduationCap, Wrench, Briefcase, FolderOpen, Award } from 'lucide-react';

const steps = [
  { label: 'Personal', icon: User },
  { label: 'Education', icon: GraduationCap },
  { label: 'Skills', icon: Wrench },
  { label: 'Experience', icon: Briefcase },
  { label: 'Projects', icon: FolderOpen },
  { label: 'Certifications', icon: Award },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === currentStep;
        const isComplete = i < currentStep;
        return (
          <button
            key={step.label}
            onClick={() => onStepClick(i)}
            className="flex flex-col items-center gap-1.5 min-w-[72px] group"
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${isActive ? 'step-indicator-active' : isComplete ? 'step-indicator-complete' : 'step-indicator-inactive'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
            </motion.div>
            <span className={`text-xs font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

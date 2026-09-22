import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface StatusStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

interface StatusWorkflowProps {
  steps: StatusStep[];
}

export default function StatusWorkflow({ steps }: StatusWorkflowProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col items-center">
            {step.status === 'completed' && (
              <CheckCircle size={24} className="text-green-400" />
            )}
            {step.status === 'current' && (
              <div className="w-6 h-6 rounded-full bg-[#D4A853] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#0A0A0B] rounded-full animate-pulse" />
              </div>
            )}
            {step.status === 'pending' && (
              <Circle size={24} className="text-gray-600" />
            )}
            <span className={`
              text-xs mt-1 whitespace-nowrap
              ${step.status === 'completed' ? 'text-green-400' : ''}
              ${step.status === 'current' ? 'text-[#D4A853] font-semibold' : ''}
              ${step.status === 'pending' ? 'text-gray-500' : ''}
            `}>
              {step.label}
            </span>
            {step.date && (
              <span className="text-[10px] text-gray-600">{step.date}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <ArrowRight size={16} className="text-gray-600 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}

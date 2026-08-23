import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-safe-600 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0" />,
    danger: <XCircle className="w-5 h-5 text-danger-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-600 flex-shrink-0" />,
  };

  const borders = {
    success: 'border-safe-200 bg-safe-50/90 text-safe-900',
    warning: 'border-warning-200 bg-warning-50/90 text-warning-900',
    danger: 'border-danger-200 bg-danger-50/90 text-danger-900',
    info: 'border-brand-200 bg-brand-50/90 text-brand-900',
  };

  return (
    <div className={cn('fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md text-sm font-medium animate-slide-up', borders[type])}>
      {icons[type]}
      <p>{message}</p>
      <button onClick={onClose} className="p-1 hover:opacity-75 transition-opacity ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

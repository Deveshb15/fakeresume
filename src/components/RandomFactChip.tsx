
import React from 'react';
import { cn } from '@/lib/utils';

interface RandomFactChipProps {
  label: string;
  className?: string;
}

const RandomFactChip: React.FC<RandomFactChipProps> = ({ label, className }) => {
  return (
    <div className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      'bg-accent text-accent-foreground',
      'transition-all animate-slide-up',
      className
    )}>
      {label}
    </div>
  );
};

export default RandomFactChip;

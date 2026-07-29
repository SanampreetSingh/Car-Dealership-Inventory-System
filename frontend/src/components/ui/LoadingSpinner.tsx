import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const LoadingSpinner = ({
  size = 'md',
  fullScreen = false,
  label,
  className,
}: LoadingSpinnerProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={cn(sizeMap[size], 'animate-spin text-amber-500', className)} />
      {label && <p className="text-sm text-stone-400">{label}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
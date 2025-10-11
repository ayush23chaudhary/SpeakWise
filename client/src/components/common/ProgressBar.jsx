import React from 'react';

const ProgressBar = ({
  progress,
  size = 'md',
  color = 'primary',
  showPercentage = false,
  animated = false,
  striped = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
    info: 'bg-blue-600'
  };

  const animatedClass = animated ? 'animate-pulse' : '';
  const stripedClass = striped ? 'bg-stripes' : '';

  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${animatedClass} ${stripedClass} transition-all duration-300 ease-out ${sizeClasses[size]}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="mt-1 text-right">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {progressPercentage}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

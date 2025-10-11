import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = true,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };
  
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${roundedClass} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;

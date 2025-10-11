import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'default',
  shadow = 'default',
  border = true,
  hover = false,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };

  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl transition-all duration-300';
  
  const borderClasses = border 
    ? 'border border-gray-200 dark:border-gray-700' 
    : '';
  
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
    : '';

  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;

import React from 'react';
import { User } from 'lucide-react';

const GuestBadge = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full ${className}`}>
      <User className="w-3 h-3 mr-1" />
      Guest Mode
    </div>
  );
};

export default GuestBadge;

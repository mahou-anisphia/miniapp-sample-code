import React from 'react';

// Wrapper to fix react-icons TypeScript issues with React 18
export const Icon: React.FC<{
  icon: React.ComponentType<any>;
  className?: string;
}> = ({ icon: IconComponent, className }) => {
  return <IconComponent className={className} />;
};
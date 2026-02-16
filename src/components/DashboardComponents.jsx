import React from 'react';

// Minimal Card Component
export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
};

// Stat Card
export const StatCard = ({ label, value }) => {
  return (
    <Card>
      <div className="flex flex-col items-center space-y-2 text-center md:flex-col">
        <p className="text-gray-600 text-xs md:text-sm font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl md:text-4xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  );
};


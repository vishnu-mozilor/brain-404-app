import React from 'react';

const Card = ({ title, value, className = '', ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded p-4 ${className}`} {...props}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default Card; 
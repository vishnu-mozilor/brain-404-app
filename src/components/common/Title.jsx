import React from 'react';

const Title = ({ children, className = '', ...props }) => {
  return (
    <h1 className={`text-2xl font-bold mb-4 ${className}`} {...props}>
      {children}
    </h1>
  );
};

export default Title; 
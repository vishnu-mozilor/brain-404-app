import React from 'react';

const Textarea = ({ className = '', ...props }) => {
  return (
    <textarea
      className={`border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Textarea; 
import React from 'react';

const Button = ({ children, onClick, className = "", text="", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button; 
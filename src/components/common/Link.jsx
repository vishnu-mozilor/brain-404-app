import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children, className = '', ...props }) => {
  return (
    <RouterLink
      to={to}
      className={`text-blue-500 hover:underline ${className}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link; 
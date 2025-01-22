import React from 'react';

const Radio = ({ name, options, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="form-radio text-blue-500"
            {...props}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio; 
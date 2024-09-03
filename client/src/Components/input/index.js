import React from 'react';
import './index.css';

const Input = ({
  label = '',
  name = '',
  type = 'text',
  className = '',
  inputClassName = '',
  isRequired = true,
  placeholder = '',
  value='',
  onChange=()=>{},

}) => {
  return (
    <>
      <div className={`bdy-1 ${className}`}>
      <label htmlFor={name} className="lb-label">
        {label}
      </label>
      <input
        type={type}
        className={`lb-input ${inputClassName}`}
        id={name}
        placeholder={placeholder}
        required={isRequired} value={value} onChange={onChange}
      />
      </div>
    </>
  );
};

export default Input;
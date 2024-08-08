import React, { useState } from 'react';

const Input = ({id, type = 'text', label, placeholder, value,  classInput = '', onChange,  onBlur = null, errorMessage = '', validate, ...props}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');

     // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleBlur = (event) => {
        if (validate) {
          const validationError = validate(event.target.value);
          setError(validationError);
        }
        if (onBlur) {
          onBlur(event);
        }
      };
    
    return (
        <>
            {label && <label htmlFor={id} className={`${classInput}__label`}>{label}</label> }
            <input
                id={id}
                type={type === 'password' && isPasswordVisible ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className = {`${classInput}__input`}
                autocomplete = 'off'
            />
            {type === 'password' && (
                <button type="button" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
            )}
            {error && <span className={`${classInput}__error-message`}>{error}</span>}
        </>
    );
};

export default Input;
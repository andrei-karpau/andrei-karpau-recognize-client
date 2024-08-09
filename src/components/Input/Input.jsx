import React, { useState } from 'react';

import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import Button from '../Button/Button';

const Input = ({id, type = 'text', label, placeholder, value,  classInput = '', onChange, onBlur, error, ...props}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

     // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevIsPasswordVisiable => !prevIsPasswordVisiable);
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
                onBlur = {onBlur}
                className = {`${classInput}__input`}
                autoComplete = 'off'
            />
            {type === 'password' && (
                <Button handleOnClick={togglePasswordVisibility}>
                    {isPasswordVisible ? < MdOutlineVisibility/> : < MdOutlineVisibilityOff/>}
                </Button>
            )}
            {error && <span className={`${classInput}__error-message`}>{error}</span>}
        </>
    );
};

export default Input;
import React, { useState } from 'react';

import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import './Input.scss'
import Button from '../Button/Button';

const Input = ({id, type = 'text', label, placeholder, value,  classInput = '', onChange, onBlur, error, ...props}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

     // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevIsPasswordVisiable => !prevIsPasswordVisiable);
    };
    
    return (
        <div className='input__container'>
            {label && <label htmlFor={id} className={`label label__${classInput}`}>{label}</label> }
            <input
                id={id}
                type={type === 'password' && isPasswordVisible ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur = {onBlur}
                className = {`input input__${classInput}`}
                autoComplete = 'off'
            />
            {type === 'password' && (
                <Button handleOnClick={togglePasswordVisibility} className='icon'>
                    {isPasswordVisible ? < MdOutlineVisibility/> : < MdOutlineVisibilityOff/>}
                </Button>
            )}
            {error && <span className={`error-message error-message__${classInput}`}>{error}</span>}
        </div>
    );
};

export default Input;
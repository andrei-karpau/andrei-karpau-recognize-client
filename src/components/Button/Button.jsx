import React from 'react';

import './Button.scss';

const Button = ({ children, handleOnClick, type='button', disabled, className }) => {
    return (
        <button type={type} onClick = {handleOnClick} disabled={disabled} className={`button button__${className}`}>
            {children}
        </button>
    );
};

export default Button;
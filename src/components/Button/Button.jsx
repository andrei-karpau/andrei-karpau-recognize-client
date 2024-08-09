import React from 'react';

const Button = ({ children, handleOnClick, type='button', disabled }) => {
    return (
        <button type={type} onClick = {handleOnClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
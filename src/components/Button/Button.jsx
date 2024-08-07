import React from 'react';

const Button = ({ children, handleOnClick }) => {
    return (
        <button type='button' onClick = {handleOnClick}>
            {children}
        </button>
    );
};

export default Button;
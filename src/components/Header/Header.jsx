import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AUTH_MODES, LOGO_NAME, AUTH_TEXT_CAPTION, AUTH_BTN_CAPTION  } from '../../data/constants';

import './Header.scss'
import { AuthContext } from '../../helper/AuthContext';
import Button from '../Button/Button';


const Header = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { isAuth, authMode, userName } = authState;
    const navigateTo = useNavigate();

    const handleLogOut = () => {
        setAuthState((prevAuthState) => ({
            ...prevAuthState,
            authMode: AUTH_MODES.LOG_IN,
            isAuth: !prevAuthState.isAuth,
            userName: null,
            userId: null,
        }));

        localStorage.removeItem('storedUser'); 
        navigateTo('/'); 
    };

    const handleOnClick = () => {
        if(isAuth) {
            handleLogOut();
        } else {
            setAuthState((prevAuthState) => {
                const { authMode } = prevAuthState;
                const newAuthMode = authMode === AUTH_MODES.LOG_IN ? AUTH_MODES.SIGN_UP : AUTH_MODES.LOG_IN;

                return {
                    ...prevAuthState,
                    authMode: newAuthMode
                }
            })
        }
    };

    const textCaption = isAuth ? `Welcome, ${userName}`: (authMode === AUTH_MODES.LOG_IN ? AUTH_TEXT_CAPTION.SIGN_UP : AUTH_TEXT_CAPTION.LOG_IN);
    const btnCaption = isAuth ? AUTH_BTN_CAPTION.LOG_OUT : (authMode === AUTH_MODES.LOG_IN ? AUTH_BTN_CAPTION.SIGN_UP : AUTH_BTN_CAPTION.LOG_IN);

    return (
        <header className='header'>
            <p className='header__logo'>{LOGO_NAME.TEXT}</p>
            <div className='header__user'>
                <p className='header__text-caption'>{textCaption}</p>
                <Button handleOnClick={handleOnClick} className='primary'>{btnCaption}</Button>
            </div>
        </header>
    );
};

export default Header;
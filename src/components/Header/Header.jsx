import React, { useContext } from 'react';

import { AUTH_MODES, LOGO_NAME, AUTH_TEXT_CAPTION, AUTH_BTN_CAPTION  } from '../../data/constants';

import { AuthContext } from '../../helper/AuthContext';
import Button from '../Button/Button';


const Header = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { isAuth, authMode, userName } = authState;

    let textCaption;
    let btnCaption;

    if (isAuth) {
        textCaption = userName;
        btnCaption = AUTH_BTN_CAPTION.LOG_OUT;
    } else {
        textCaption = authMode === AUTH_MODES.LOG_IN
        ? AUTH_TEXT_CAPTION.SIGN_UP
        : AUTH_TEXT_CAPTION.LOG_IN;

        btnCaption = authMode === AUTH_MODES.LOG_IN
        ? AUTH_BTN_CAPTION.SIGN_UP
        : AUTH_BTN_CAPTION.LOG_IN;
    };

    const handleAuthMode = () => {
        setAuthState((prevAuthState) => {
            const { isAuth, authMode, userName, userId } = prevAuthState;

            let newAuthMode;
            let newIsAuth = isAuth;
            let newUserName = userName;
            let newUserId = userId;

            if (isAuth) {
                newAuthMode = AUTH_MODES.LOG_IN;
                newIsAuth = !isAuth;
                newUserName = null;
                newUserId = null;
            } else {
                if (authMode === AUTH_MODES.LOG_IN) {
                    newAuthMode = AUTH_MODES.SIGN_UP;
                } else {
                    newAuthMode = AUTH_MODES.LOG_IN;
                }
            }

            return {
                authMode: newAuthMode,
                isAuth: newIsAuth,
                userName: newUserName,
                userId: newUserId,
            };
        })
    }

    return (
        <header className='header'>
            <p className='header__logo'>{LOGO_NAME.TEXT}</p>
            <div className='header__user'>
                <p className='header__text-caption'>{textCaption}</p>
                <Button handleOnClick={handleAuthMode}>{btnCaption}</Button>
            </div>
        </header>
    );
};

export default Header;
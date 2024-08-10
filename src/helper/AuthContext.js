import { createContext, useState } from 'react';

import { AUTH_MODES } from '../data/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        authMode: AUTH_MODES.LOG_IN, // login, signup, null
        isAuth: false,
        userName: null,
        userId: null,
        email: null
      });
    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
};
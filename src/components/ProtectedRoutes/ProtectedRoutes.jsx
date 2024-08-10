import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from '../../helper/AuthContext';
import AuthPage from '../../pages/AuthPage/AuthPage';
import RecognizePage from '../../pages/RecognizePage/RecognizePage';

const ProtectedRoutes = () => {
    const { authState } = useContext(AuthContext);
    const { isAuth } = authState;


    return (
        <>
            <Routes>
                <Route
                    path="/recognize"
                    element={isAuth ? <RecognizePage /> : <Navigate to="/" />}
                />
                <Route
                    path="/"
                    element={!isAuth ? <AuthPage /> : <Navigate to="/recognize" />}
                />
                <Route path="*" element={<Navigate to={isAuth ? "/recognize" : "/"} />} />
            </Routes>
        </>
    );
};

export default ProtectedRoutes;
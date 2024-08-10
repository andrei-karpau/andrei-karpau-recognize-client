import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import { AuthProvider } from './helper/AuthContext';
import Header from './components/Header/Header';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <ProtectedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.scss';
import { AuthProvider } from './helper/AuthContext';
import Header from './components/Header/Header';
import AuthPage from './pages/AuthPage/AuthPage';
import RecognizePage from './pages/RecognizePage/RecognizePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<AuthPage />} /> 
          <Route path='/recognize' element={<RecognizePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

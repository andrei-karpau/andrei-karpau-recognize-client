import React, { useContext, useState } from 'react';
import { MdOutlineWavingHand } from "react-icons/md";


import { AuthContext } from '../../helper/AuthContext';
import { AUTH_MODES, AUTH_HEADING, VALIDATION_TYPE } from '../../data/constants';

import './AuthPage.scss';
import Input from '../../components/Input/Input';



const AuthPage = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { isAuth, authMode } = authState;
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
        username: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(id)
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

      const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Invalid email address';
      };

      const validatePassword = (value) => {
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      };

    const authSubmitHandler = (e) => {
        e.preventDefault();
        console.log('The form is submitted')
    }

    return (
        <section className='authpage'>
            <h1 className='authpage__heading'>{authMode === AUTH_MODES.SIGN_UP ? AUTH_HEADING.MAIN.SIGN_UP : AUTH_HEADING.MAIN.LOG_IN }</h1>
            <div classname='authpage__subheading-wrapper'>
                <MdOutlineWavingHand className='authpage__icon' title='waving hand' size='1.5rem'/>
                <p className='authpage__subheading'>{authMode === AUTH_MODES.SIGN_UP ? AUTH_HEADING.SUB.SIGN_UP : AUTH_HEADING.SUB.LOG_IN }</p>
            </div>
            <form>
                {authMode === AUTH_MODES.SIGN_UP && 
                <Input 
                    id='username' 
                    type='text' 
                    label='Full name' 
                    value={formData.username} 
                    classInput = 'authpage' 
                    onChange={handleChange}
                    validate={validateEmail}
                />}
                <Input 
                    id='email' 
                    type='email' 
                    label='Email' 
                    value={formData.email} 
                    classInput = 'authpage' 
                    onChange={handleChange }
                    validate={validateEmail}
                />
                <Input 
                    id='password' 
                    type='password'
                    label='Password' 
                    value={formData.password} 
                    classInput = 'authpage' 
                    onChange={handleChange}
                    validate={validatePassword}
                />
                <button onClick={authSubmitHandler}>Submit</button>
            </form>
        </section>
    );
};

export default AuthPage;
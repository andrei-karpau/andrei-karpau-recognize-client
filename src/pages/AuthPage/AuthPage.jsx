import React, { useContext, useState, useEffect } from 'react';

import { MdOutlineWavingHand } from "react-icons/md";
import { AuthContext } from '../../helper/AuthContext';
import { AUTH_MODES, AUTH_HEADING } from '../../data/constants';
import { validation } from '../../helper/validator.js';
import { login, signup } from '../../helper/api';

import './AuthPage.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';


const AuthPage = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { authMode } = authState;

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '',password: ''});


    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
        }));
    };

    const handleBlur = () => {
        // console.log(formData)
        // const validationErrors = validation(formData);
        // setErrors(validationErrors);
        // console.log(errors);
        // setIsValid(Object.keys(validationErrors).length === 0);
        if (authMode === AUTH_MODES.LOG_IN) {
            const { username, ...validationErrors } = validation(formData);
            setErrors(validationErrors);
            console.log(validationErrors)
            setIsValid(Object.keys(validationErrors).length === 0);
            console.log(isValid);
        } else if (authMode === AUTH_MODES.SIGN_UP) {
            const validationErrors = validation(formData);
            setErrors(validationErrors);
            setIsValid(Object.keys(validationErrors).length === 0);
        }
    };

    const loginHandler = async (email, password) => {
        setIsValid(false);
        console.log(email, password)
        try {
            const response = await login(email, password);
            console.log(response)
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    }

    const signupHandler = async (username, email, password) => {
        try {
            const response = await signup({ username, email, password });
            console.log(response.data)
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    }

    const authSubmitHandler = async (e) => {
        e.preventDefault(); 

        const validationErrors = validation(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (authMode === AUTH_MODES.LOG_IN) {

                loginHandler (formData.email, formData.password);

            } else if (authMode === AUTH_MODES.SIGN_UP) {
                signupHandler(formData.username, formData.email, formData.password);
            }
        }
    }

    return (
        <section className='authpage'>
            <h1 className='authpage__heading'>{authMode === AUTH_MODES.SIGN_UP ? AUTH_HEADING.MAIN.SIGN_UP : AUTH_HEADING.MAIN.LOG_IN }</h1>
            <div className='authpage__subheading-wrapper'>
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
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    error={errors.username}
                />}
                <Input 
                    id='email' 
                    type='email' 
                    label='Email' 
                    value={formData.email} 
                    classInput = 'authpage' 
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    error={errors.email}
                />
                <Input 
                    id='password' 
                    type='password'
                    label='Password' 
                    value={formData.password} 
                    classInput = 'authpage' 
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    error={errors.password}
                />
                <Button type='submit' handleOnClick={authSubmitHandler} disabled={!isValid}>Submit</Button>
            </form>
        </section>
    );
};

export default AuthPage;
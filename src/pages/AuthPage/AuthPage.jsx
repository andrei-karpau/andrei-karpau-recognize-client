import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formTouched, setFormTouched] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '',password: ''});

    const validationInputs  = (values, mode) => {
        const allErros = validation(values);
        let validationErrors;

        if (mode === AUTH_MODES.LOG_IN) {
            const { username, ...filtredErrors} = allErros;
            validationErrors = { ...filtredErrors};
        } else if (mode === AUTH_MODES.SIGN_UP) {
            validationErrors = {...allErros};
        }

        setErrors(validationErrors);

        setIsValid(prevIsValid => {
            const hasErrors = Object.keys(validationErrors).length > 0;
            return !hasErrors;
        });
    };

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: value}));
        setFormTouched(true);
    };

    const handleBlur = () => {
        validationInputs(formData, authMode);
    };

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        validationInputs(formData, authMode);

        if (!isValid) return;

        try {
            let response;
            if (authMode === AUTH_MODES.LOG_IN) {
                response = await login(formData.email, formData.password);
            } else {
                response =  await signup(formData.username, formData.email, formData.password);
            }
            const { userName, userId, email } = response.data;

            setAuthState((prevAuthState) => ({...prevAuthState, 
                authMode: null,
                isAuth: !prevAuthState.isAuth,
                userName,
                userId,
                email
            }));
            setFormData((prevFormData) => ({...prevFormData, username: '', email: '', password:''}));
            navigate('/recognize');
        } catch (error) {
            console.error('Authentication error:', error);
        }
    }

    useEffect(() => {
        if (formTouched) {
            validationInputs(formData, authMode);
        }
    }, [authMode, formTouched, formData]);

    return (
        <section className='authpage'>
            <h1 className='authpage__heading'>{authMode === AUTH_MODES.SIGN_UP ? AUTH_HEADING.MAIN.SIGN_UP : AUTH_HEADING.MAIN.LOG_IN }</h1>
            <div className='authpage__subheading-wrapper'>
                <MdOutlineWavingHand className='authpage__icon' title='waving hand' size='1.5rem'/>
                <p className='authpage__subheading'>{authMode === AUTH_MODES.SIGN_UP ? AUTH_HEADING.SUB.SIGN_UP : AUTH_HEADING.SUB.LOG_IN }</p>
            </div>
            <form className='authpage__form'>
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
                <Button type='submit' handleOnClick={authSubmitHandler} disabled={!isValid} className='secondary'>Submit</Button>
            </form>
        </section>
    );
};

export default AuthPage;
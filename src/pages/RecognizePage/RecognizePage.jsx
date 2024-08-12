import React, { useContext, useState } from 'react';

import { AuthContext } from '../../helper/AuthContext';
import { validationRecognize } from '../../helper/validator';
import { EDAN_PARAMETRS } from '../../data/constants';
import { edenRequest, createNewTask } from '../../helper/api';

import './RecognizePage.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';



const RecognizePage = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { userId } = authState;

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({ file: '', query: '' });

    const validationInput = (values) => {
        const errors = validationRecognize(values);
        setErrors(errors);

        setIsValid(prevIsValid => {
            const hasErrors = Object.keys(errors).length > 0;
            return !hasErrors;
        });
    }
    const handleOnChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: id === 'file' ? files[0] : value}));
    };

    const handleBlur = () => {
        validationInput(formData);
    };

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        validationInput(formData);

        if (!isValid) return;

        try {
            const formData = new FormData();
            formData.append('providers', EDAN_PARAMETRS.providers.amazon);
            formData.append('providers', EDAN_PARAMETRS.providers.extracta);
            formData.append("file", formData.file);
            formData.append("queries", JSON.stringify([{ query: `${formData.query}`, pages: EDAN_PARAMETRS.pages },]));
            
            const edenResponse = await edenRequest(formData);
            const newTaskResponse = await createNewTask({
                title: formData.query,
                userId: userId,
                error: edenResponse.error,
                public_id: edenResponse.public_id,
                status: edenResponse.status,
                fileName: formData.file
            });
            console.log(edenResponse)
            console.log(newTaskResponse)


      

          } catch (err) {
            console.log(err);
          }
    }

    return (
        <section className='recognize'>
            <h1 className='recognize__heading'>Recognize youe record</h1>
             <form className='recognize__form'>
                <Input 
                    id='file' 
                    type='file' 
                    accept='.pdf, .docx, .txt'
                    label='Please upload your file' 
                    classInput = 'recognize' 
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    error={errors.file}
                />
                <Input 
                    id='query' 
                    type='text' 
                    label='What do you want to detect?' 
                    value={formData.query}
                    placeholder='Type here your prompt'
                    classInput = 'recognize' 
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    error={errors.query}
                />
                 <Button 
                    type='submit' 
                    handleOnClick={onSubmitHandler}
                    disabled={!isValid} 
                    className='secondary'>
                    Launch
                </Button>
            </form>
             <div>
                <h2>Results</h2>
                <input type='text' placeholder='Search by name'/>
                <ul>
                    <li>
                        <div>Name</div>
                        <div>Status</div>
                        <button>Results</button>
                    </li>
                </ul>
             </div>

        </section>
    );
};

export default RecognizePage;
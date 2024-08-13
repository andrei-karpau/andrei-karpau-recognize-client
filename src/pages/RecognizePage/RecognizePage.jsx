import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../helper/AuthContext';
import { validationRecognize } from '../../helper/Validator';
import { EDAN_PARAMETRS, BTN_ACTION } from '../../data/constants';
import { edenRequest, edenResults, createNewQuery, getQueriesList, deleteQueryById, updateQuerieStatus } from '../../helper/api';
import { sortQueriesByStatus } from '../../helper/utils'

import './RecognizePage.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Navigation from '../../components/Navigation/Navigation';
import QueriesList from '../../components/QueriesList/QueriesList';

const RecognizePage = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const { userId } = authState;

    const [loadedQueries, setLoadedQueries] = useState([]);

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({ file: '', query: '' });
    const [inputKey, setInputKey] = useState();
    const [detected, setDetected] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const getLoadedQueriesList = async () => {
        try {
            const response = await getQueriesList(userId);
            const sortedQueries = sortQueriesByStatus(response.data.queries);
            setLoadedQueries(sortedQueries);
        } catch (err) {
            console.log(`Failed to load queries list: ${err}`);
        }
    };

    useEffect(() => {
        getLoadedQueriesList();
    }, []);

    const validationInput = (values) => {
        const errors = validationRecognize(values);
        setErrors(errors);
        setIsValid(prevIsValid => {
            const hasErrors = Object.keys(errors).length > 0;
            return !hasErrors;
        });
    };

    const resetsInputs = () => {
        let randomString = Math.random().toString(36);
        setInputKey(randomString);
        setFormData((prevFormData) => ({...prevFormData, file: '', query: ''}));
    };

    const handleOnChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prevFormData) => ({...prevFormData, [id]: id === 'file' ? files[0] : value}));
        validationInput(formData);
    };

    const handleBlur = () => {
        validationInput(formData);
    };

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        validationInput(formData);

        if (!isValid) return;

        try {
            const form = new FormData();
            form.append('providers', EDAN_PARAMETRS.providers.amazon);
            form.append('providers', EDAN_PARAMETRS.providers.extracta);
            form.append('file', formData.file);
            form.append('queries', JSON.stringify([{ query: `${formData.query}`, pages: EDAN_PARAMETRS.pages },]));
            
            const edenResponse = await edenRequest(form);

            if(edenResponse && !edenResponse.error) {
                const { public_id, status, error } = edenResponse.data;

                const newQueries = await createNewQuery({
                    title: formData.query,
                    userId: userId,
                    error,
                    public_id,
                    status,
                    fileName: formData.file.name
                });

                resetsInputs();
                const sortedQueries = sortQueriesByStatus(newQueries.data.queries);
                setLoadedQueries(sortedQueries);
            } else {
                console.error('Error in Eden response:', edenResponse.data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleStatusChange = (status) => {
        setStatusFilter(status);
    };

    const handleDeleteAll = () => {
        setLoadedQueries([]);
    };

    const handleResultQuery = async (qid, bid) => {
        try {
            const edenResultResponse = await edenResults(qid);

            if(edenResultResponse && !edenResultResponse.error) {
                if(bid === BTN_ACTION.UPDATE) {
                    const status = edenResultResponse.data.status;
                    const updateStatus = await updateQuerieStatus(qid, status);
                    getLoadedQueriesList();
                } else {
                    setDetected(edenResultResponse.data.results);
                    setIsOpenModal(prevIsModal => !prevIsModal);
                }
            } else {
                console.error('Error in Eden response:', edenResultResponse.data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteQuery = async (qid) => {
        const prevQueries = [...loadedQueries];
        const updatedQueries = prevQueries.filter(query => query.id !== qid);
        try {
            const deletedQuery = await deleteQueryById(qid, userId);
            setLoadedQueries(updatedQueries);
        } catch(err) {
            setLoadedQueries(prevQueries);
            console.error(`Failed to delete query with ID ${qid}: ${err.message}`);
        }
    };

    const closeModalHandle = () => {
        setIsOpenModal(prevIsModal => !prevIsModal);
    };

    return (
        <section className='recognize'>
            <h1 className='recognize__heading'>Recognize your record</h1>
             <form className='recognize__form'>
                <Input 
                    id='file' 
                    type='file' 
                    accept='.pdf, .jpg, .png'
                    label='Please upload your file' 
                    classInput = 'recognize' 
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    error={errors.file}
                    key={inputKey || '' }
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
            <div className='recognize__divider'></div>
            <div className='recognize__results-wrapper'>
                <h2 className='recognize__subheading'>Results</h2>
                {loadedQueries.length === 0 && (
                <div className='recognize__container-message'>
                    <p className='recognize__text-message'>Your Queries List is empty</p>
                </div>)}
                {loadedQueries.length !== 0 && 
                <>
                    {/* <Navigation 
                        onSearch={handleSearch} 
                        onStatusChange={handleStatusChange} 
                        onDeleteAll={handleDeleteAll}
                    /> */}
                    <QueriesList 
                        filtredQueries={loadedQueries} 
                        onResult={handleResultQuery} 
                        onDelete={handleDeleteQuery}
                        detected={detected}
                        isOpen={isOpenModal}
                        onClose={closeModalHandle}
                    />
                </>
                }
            </div>
        </section>
    );
};

export default RecognizePage;
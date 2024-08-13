import React from 'react';
import { useState } from 'react';

import './QueriesList.scss';
import Button from '../Button/Button';
import Modal from '../../components/Modal/Modal';

const QueriesList = ({filtredQueries, onResult,  onDelete, detected}) => {
    console.log('filtredQueries', filtredQueries);
    console.log(detected);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                modalIsOpen = {modalIsOpen}
                closeModal = {closeModal}
                detected = {detected}
                >
                <div className="modal-grid__content-header">
                    AMAZON
                </div>
                <div className="modal-grid__content--text">
                    <table className='recognize__queries-table'>
                        <thead className='recognize__heading-table'>
                            <tr className='recognize__row'>
                                <th className='recognize__title'>Page</th>
                                <th className='recognize__title'>Query</th>
                                <th className='recognize__title'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detected.amazon.items.map((result) => (
                                <tr className='recognize__row'>
                                    <td className='recognize__column name'>{result.page}</td>
                                    <td className='recognize__column name'>{result.query}</td>
                                    <td className='recognize__column name'>{result.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-grid__content-header">
                    EXTRACTA
                </div>
                <div className="modal-grid__content--text">
                    <table className='recognize__queries-table'>
                        <thead className='recognize__heading-table'>
                            <tr className='recognize__row'>
                                <th className='recognize__title'>Page</th>
                                <th className='recognize__title'>Query</th>
                                <th className='recognize__title'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detected.extracta.items.map((result) => (
                                <tr className='recognize__row'>
                                    <td className='recognize__column name'>{result.page}</td>
                                    <td className='recognize__column name'>{result.query}</td>
                                    <td className='recognize__column name'>{result.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
            <table className='recognize__queries-table'>
                <thead className='recognize__heading-table'>
                    <tr className='recognize__row'>
                        <th className='recognize__title'>Name</th>
                        <th className='recognize__title'>Status</th>
                        <th className='recognize__title'></th>
                    </tr>
                </thead>
                <tbody>
                    {filtredQueries.map((query) => (
                    <tr className='recognize__row' key={query.id}>
                        <td className='recognize__column name'>{`${query.title} in ${query.fileName}`}</td>
                        <td className={`recognize__column status ${query.status}`}><span className='recognize__tag'>{query.status}</span></td>
                        <td className='recognize__column btn'>
                            <Button className='primary' handleOnClick={() => {
                                onResult(query.public_id);
                                if(query.status === 'finished') {
                                    openModal();
                                } else {

                                } 
                            }}>Result</Button>
                            <Button className='delete' handleOnClick={() => onDelete(query.id)}>Delete</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default QueriesList;
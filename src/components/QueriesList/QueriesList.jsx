import React, { useState } from 'react';

import { TABLE_LABEL, TABLE_BTN_LABEL, QUERY_STATUS, BTN_ACTION } from '../../data/constants';

import './QueriesList.scss';
import Button from '../Button/Button';
import Modal from '../../components/Modal/Modal';

const QueriesList = ({filtredQueries, onResult,  onDelete, detected, isOpen, onClose}) => {

    let contentModal;

    if (detected.length !== 0) {
        contentModal = (
            <>
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
                                {detected.amazon.items.map((result, i) => (
                                    <tr className='recognize__row' key={i}>
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
                                {detected.extracta.items.map((result, i) => (
                                    <tr className='recognize__row' key={i}>
                                        <td className='recognize__column name'>{result.page}</td>
                                        <td className='recognize__column name'>{result.query}</td>
                                        <td className='recognize__column name'>{result.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </>
        )  
    }

    return (
        <>
             <Modal modalIsOpen = {isOpen} closeModal = {onClose} detected = {detected} >
                {contentModal}
            </Modal>
            <table className='recognize__queries-table'>
            <thead className='recognize__heading-table'>
                <tr className='recognize__row'>
                    <th className='recognize__title'>{TABLE_LABEL.NAME}</th>
                    <th className='recognize__title'>{TABLE_LABEL.STATUS}</th>
                    <th className='recognize__title'></th>
                </tr>
            </thead>
            <tbody>
                {filtredQueries.map((query) => (
                <tr className='recognize__row' key={query.id}>
                    <td className='recognize__column name'>{`${query.title} in ${query.fileName}`}</td>
                    <td className={`recognize__column status ${query.status}`}><span className='recognize__tag'>{query.status}</span></td>
                    <td className='recognize__column btn'>
                        <Button 
                            className='primary' 
                            id={query.status === QUERY_STATUS.FINISHED ? BTN_ACTION.RESULT :BTN_ACTION.UPDATE } 
                            handleOnClick={(e) => onResult(query.public_id, e.target.id)}
                            >
                                {query.status === QUERY_STATUS.FINISHED ? TABLE_BTN_LABEL.RESULT : TABLE_BTN_LABEL.UPDATE }
                            </Button>
                        <Button 
                            className='delete' 
                            handleOnClick={() => onDelete(query.id)}
                            >
                                {TABLE_BTN_LABEL.DELETE}
                        </Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};

export default QueriesList;
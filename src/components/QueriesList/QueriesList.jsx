import React from 'react';

import { TABLE_LABEL, TABLE_BTN_LABEL, QUERY_STATUS, BTN_ACTION } from '../../data/constants';

import './QueriesList.scss';
import Button from '../Button/Button';

const QueriesList = ({filtredQueries, onResult,  onDelete}) => {
    return (
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
    );
};

export default QueriesList;
import React from 'react';

import { RxCross2 } from "react-icons/rx";

import Button from '../Button/Button';

const QueriesList = ({filtredQueries, onClick, onDelete}) => {
    console.log('filtredQueries', filtredQueries)

    return (
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
                    <td className='recognize__column'>{`${query.title} in ${query.fileName}`}</td>
                    <td className='recognize__column'>{query.status}</td>
                    <td className='recognize__column btn'>
                        <Button className='primary'>Result</Button>
                        <Button className='icon'>
                            <RxCross2 />
                        </Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default QueriesList;
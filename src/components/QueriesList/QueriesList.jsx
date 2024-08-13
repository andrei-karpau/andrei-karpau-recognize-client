import React from 'react';

const QueriesList = ({filtredQueries}) => {
    console.log(filtredQueries)

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
                {filtredQueries.map((query) => {
                    <tr key={query.id}>
                    <td>{query.name}</td>
                    <td>{query.status}</td>
                    <td>
                        <button >Results</button>
                        <button >Delete</button>
                    </td>
                </tr>
                })}
            </tbody>
        </table>
    );
};

export default QueriesList;
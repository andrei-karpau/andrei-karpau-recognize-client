import React, { useState } from 'react';

import './Navigation.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Navigation = ({ onSearch, onStatusChange, onDeleteAll}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (onSearch) onSearch(term);
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setStatusFilter(status);
        if (onStatusChange) onStatusChange(status);
    };

    const handleDeleteAll = () => {
        if (onDeleteAll) onDeleteAll();
    };

    return (
        <nav className='recognize__nav'>
            <div className='recognize__nav-search'>
                <Input 
                    id='search' 
                    type='text'
                    placeholder='Search by Name'
                    value={searchTerm} 
                    classInput = 'nav' 
                    onChange={handleSearchChange}
                />
            </div>
            <div className='recognize__nav-filter'>
                <select value={statusFilter} onChange={handleStatusChange}>
                    <option value=''>All</option>
                    <option value='finished'>Finished</option>
                    <option value='processing'>Processing</option>
                    <option value='failed'>Failed</option>
                </select>
            </div>
            <Button type='button' onClick={handleDeleteAll} className='delete'>Delete All Queries</Button>
        </nav>
    );
};

export default Navigation;
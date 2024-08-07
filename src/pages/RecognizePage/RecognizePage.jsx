import React from 'react';

import './RecognizePage.scss'

const RecognizePage = () => {
    return (
        <section className='recognize'>
            <h1> Recognize Page is comming soon</h1>
             <form>
                <input
                type='file' 
                accept='.pdf, .docx, .txt'
                placeholder='Upload your file'
                />
                <input type='text' placeholder='Type your prompt here'/>
                <button type='submit'>Recognize</button>
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
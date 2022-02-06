import React from 'react';
import { useState } from 'react';

const SearchPage = () => {

    const [search, setSearch] = useState('');

    const handleSubmit = () => {
        console.log('clicked')
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        .then(response => console.log(response.json()))
    };

    return (
        <div>
            <p>Search</p>
            <input placeholder='Search'
                onChange={(event) => {
                    setSearch(event.target.value);
            }} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
export default SearchPage
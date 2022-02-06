import React from 'react';
import { useState } from 'react';

const SearchPage = () => {

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const bookShelf = document.getElementsByClassName('container');

    const handleSubmit = async () => {
        // clear the bookshelf each time
        bookShelf.innerHTML = null;

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        await setBooks(response.json());
        console.log(books)

        for(let i = 0; i < books.length; i++) {
            var bookTitle = document.createElement('p');
            bookTitle.textContent = null


        }
    };

    return (
        <div>
            <p>Search</p>
            <input placeholder='Search'
                onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button onClick={handleSubmit}>Submit</button>
            <div className='container'/>
        </div>
    );
};
export default SearchPage
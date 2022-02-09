import React from 'react';
import { useState } from 'react';

const SearchPage = () => {

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const bookShelf = document.getElementById('container');

    const handleSubmit = async () => {
        // clear the bookshelf each time
        bookShelf.innerHTML = null;

        // fetch books using search, then convert to JSON, then for the books object, access only the .items property containing book data, and call async await function that will wait for this to finish 
        const result = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
            .then((response) => response.json())
            .then((books) => {
                printResult();
                return books.items;
            });

        // this function prints the booksArray
        const printResult = async () => {
            const booksArray = await result;
            setBooks(booksArray);
            // console.log(booksArray);
            for(let i = 0; i < books.length; i++) {
                var bookTitle = document.createElement('p');
                bookTitle.textContent = books[i].volumeInfo.title;
                bookShelf.append(bookTitle);
                // console.log(books[i].volumeInfo.authors)
                // console.log(books[i].volumeInfo.description)
                // console.log(books[i].volumeInfo.imageLinks.smallThumbnail)
                // console.log(books[i].volumeInfo.imageLinks.thumbnail)
                // console.log(books[i].volumeInfo.previewLink)





            }
        };


    };

    return (
        <div>
            <p>Search</p>
            <input placeholder='Search'
                onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button onClick={handleSubmit}>Submit</button>
            <div id='container'/>
        </div>
    );
};
export default SearchPage
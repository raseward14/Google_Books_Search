import React, { useState, useEffect } from 'react';
import BooksList from '../components/BooksList';

const SearchPage = () => {

    const [search, setSearch] = useState('');
    const bookShelf = document.getElementById('container');
    const yourBooks = JSON.parse(localStorage.getItem('lastBookSearch'));
    const [books, setBooks] = useState(yourBooks || []);

    useEffect(() => {
        console.log('three', books);
    }, [])

    const handleSubmit = () => {
        // clear the bookshelf each time
        bookShelf.innerHTML = null;
        console.log('handleSubmit')
        // fetch books using search, then convert to JSON, then for the books object, access only the .items property containing book data, and call async function that will wait for this to finish 
        const result = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
            .then((response) => response.json())
            .then((books) => {
                callResult();
                return books.items;
            });
        // this function prints the booksArray
        const callResult = async () => {
            const booksArray = await result;
            setBooks(booksArray);
            localStorage.setItem('lastBookSearch', JSON.stringify(booksArray))
            printResult(books);
        };

    };

    document.addEventListener('DOMContentLoaded', function (event) {
        console.log('one', 'book state', books)
        printResult(books)
    })

    const printResult = (booksArray) => {
        console.log('two', booksArray.length)

        for (let i = 0; i < booksArray.length; i++) {
            var singleBook = document.createElement('div');
            singleBook.classList.add('book')
            var bookTitle = document.createElement('p');
            bookTitle.textContent = booksArray[i]?.volumeInfo?.title;
            var bookAuthors = document.createElement('p');
            bookAuthors.textContent = booksArray[i]?.volumeInfo?.authors;
            var bookDescription = document.createElement('p');
            bookDescription.textContent = booksArray[i]?.volumeInfo?.description;
            bookDescription.classList.add('book-content');
            var bookImage = document.createElement('img');
            bookImage.src = `${booksArray[i]?.volumeInfo?.imageLinks?.thumbnail}`;
            bookImage.classList.add('book-content');

            var bookLink = document.createElement('a');
            bookLink.href = `${booksArray[i]?.volumeInfo?.previewLink}`;
            bookLink.textContent = 'Learn more!'

            singleBook.append(bookTitle);
            singleBook.append(bookAuthors);
            singleBook.append(bookImage);
            singleBook.append(bookDescription);
            singleBook.append(bookLink);
            
            const bookShelf = document.getElementById('container');
            bookShelf.append(singleBook);
        }
    };

const loadHistory = async () => {
    const yourBooks = await JSON.parse(localStorage.getItem('lastBookSearch'));
    printResult(yourBooks);
};

loadHistory();

return (
    <div>
            <p>Search</p>
            <input placeholder='Search'
                onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button onClick={handleSubmit}>Submit</button>
            <div id='container' />
            <BooksList search={search} />
        </div>
    );
};

export default SearchPage;
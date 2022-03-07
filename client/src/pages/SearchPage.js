import React, { useState, useEffect } from 'react';
// import BooksList from '../components/BooksList';
import * as favoritesAPIFunctions from '../utils/FavoriteAPI';

const SearchPage = () => {

    const [search, setSearch] = useState('');
    const bookShelf = document.getElementById('container');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log('use effect fired books:', books);
        // on load, check if there are books on our shelf, if so, clear them and print the new books array, else return
        if(bookShelf !== null) {
            bookShelf.innerHTML = null;
            printResult(books);
        }
    }, [books])
    
    function favoriteBook() {
        // favoritesController.create({
        //     title: books.title,
        //     description: books.description,
        //     authors: books.authors,
        //     date: books.date
        // })
        // .then(() => {
        //     console.log('delete this book now!')
        // })
        console.log('favorited')
    };
    
    function addToLibrary() {

    };

    function addToRead() {

    };
    
    const printResult = (booksArray) => {
        console.log('printing this many books:', booksArray.length)
        
        for (let i = 0; i < booksArray.length; i++) {
            // once: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            // A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.
            const once = {
                once : true
            }
            
            var singleBook = document.createElement('div');
            var lineBreak = document.createElement('br');
            
            var headingContainer = document.createElement('div');

            var summaryContainer = document.createElement('div');
            var bookTitle = document.createElement('p');
            var bookAuthors = document.createElement('p');
            var bookLink = document.createElement('a');

            var buttonContainer = document.createElement('div');
            var favButton = document.createElement('button');
            var libraryButton = document.createElement('button');
            var toReadButton = document.createElement('button');

            bookTitle.textContent = booksArray[i]?.volumeInfo?.title;
            bookAuthors.textContent = booksArray[i]?.volumeInfo?.authors;
            bookLink.href = `${booksArray[i]?.volumeInfo?.previewLink}`;
            bookLink.textContent = 'Buy me!'
            favButton.textContent = 'FAVORITE';
            libraryButton.textContent = 'ADD TO YOUR LIBRARY';
            toReadButton.textContent = 'NEED TO READ';
            
            favButton.addEventListener('click', favoriteBook, once);
            libraryButton.addEventListener('click', addToLibrary, once);
            toReadButton.addEventListener('click', addToRead, once);
           
            headingContainer.classList.add('headingContainer');
            
            summaryContainer.append(bookTitle);
            summaryContainer.append(bookAuthors)
            summaryContainer.append(bookLink);

            buttonContainer.append(favButton);
            buttonContainer.append(libraryButton);
            buttonContainer.append(toReadButton);

            headingContainer.append(summaryContainer);
            headingContainer.append(buttonContainer);

            singleBook.append(headingContainer);
            
            var contentContainer = document.createElement('div');
            var bookDescription = document.createElement('p');
            var bookImage = document.createElement('img');
            
            bookDescription.textContent = booksArray[i]?.volumeInfo?.description;
            bookImage.src = `${booksArray[i]?.volumeInfo?.imageLinks?.thumbnail}`;

            buttonContainer.classList.add('button-container')
            contentContainer.classList.add('content-container');
            bookDescription.classList.add('book-content');
            bookImage.classList.add('book-content');
            bookLink.classList.add('book-link')
 
            singleBook.classList.add('single-book');       
            
            contentContainer.append(bookImage);
            contentContainer.append(bookDescription);
            singleBook.append(contentContainer);
            
            const bookShelf = document.getElementById('container');
            bookShelf.append(singleBook);
        }
    };



    const handleSubmit = () => {
        // clear the bookshelf each time
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
        };
    };

    // loaded last, grab books from localStorage, wait for them, then print them
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
        </div>
    );
};

export default SearchPage;
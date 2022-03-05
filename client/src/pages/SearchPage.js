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
            
            var singleBook = document.createElement('div');
            singleBook.classList.add('single-book');
            
            var lineBreak = document.createElement('br');
            
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
            
            var myLibrary = document.createElement('button');
            myLibrary.textContent = 'Add to Library';
            
            var contentContainer = document.createElement('div');
            contentContainer.classList.add('contentContainer');
            
            var headingContainer = document.createElement('div');
            headingContainer.classList.add('headingContainer');
            
            var bookLink = document.createElement('a');
            bookLink.href = `${booksArray[i]?.volumeInfo?.previewLink}`;
            bookLink.textContent = 'Buy me!'

            // once: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            // A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.
            const once = {
                once : true
            }

            var favButton = document.createElement('button');
            var libraryButton = document.createElement('button');
            var toReadButton = document.createElement('button');

            favButton.textContent = 'FAVORITE';
            libraryButton.textContent = 'ADD TO YOUR LIBRARY';
            toReadButton.textContent = 'NEED TO READ';

            favButton.addEventListener('click', favoriteBook, once);
            libraryButton.addEventListener('click', addToLibrary, once);
            toReadButton.addEventListener('click', addToRead, once);

            
            headingContainer.append(bookTitle);
            bookTitle.append(lineBreak);
            bookTitle.append(bookAuthors);
            bookAuthors.append(lineBreak);
            bookAuthors.append(bookLink);
            headingContainer.append(favButton);
            headingContainer.append(libraryButton);
            headingContainer.append(toReadButton);
            singleBook.append(headingContainer);
            
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
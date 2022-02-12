import React, { useState } from 'react';

const SearchPage = () => {

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const bookShelf = document.getElementById('container');

    const handleSubmit = () => {
        // clear the bookshelf each time
        bookShelf.innerHTML = null;
        console.log('one')

        // fetch books using search, then convert to JSON, then for the books object, access only the .items property containing book data, and call async await function that will wait for this to finish 
        const result = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
            .then((response) => response.json())
            .then((books) => {
                printResult();
                console.log('two')
                return books.items;
            });

        // this function prints the booksArray
        const printResult = async () => {
            const booksArray = await result;
            setBooks(booksArray);
            // console.log(booksArray);
            console.log(books)
            for(let i = 0; i < booksArray.length; i++) {
                var singleBook = document.createElement('div');
                var bookTitle = document.createElement('p');
                bookTitle.textContent = booksArray[i].volumeInfo.title;
                var bookAuthors = document.createElement('p');
                bookAuthors.textContent = booksArray[i].volumeInfo.authors;
                var bookDescription = document.createElement('p');
                bookDescription.textContent = booksArray[i].volumeInfo.description;
                var bookSmallImage = document.createElement('img');
                bookSmallImage.src = `${booksArray[i].volumeInfo.imageLinks.smallThumbnail}`;
                // var bookImage = document.createElement('p');
                // bookImage.textContent = booksArray[i].volumeInfo.imageLinks.thumbnail;
                var bookLink = document.createElement('a');
                bookLink.href = `${booksArray[i].volumeInfo.previewLink}`;
                var divide = document.createElement('hr');
                singleBook.append(bookTitle)
                singleBook.append(bookAuthors)
                singleBook.append(bookDescription)
                singleBook.append(bookSmallImage)
                singleBook.append(divide)


                bookShelf.append(singleBook);
                console.log('four')
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
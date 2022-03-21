import React, { useState, useEffect } from 'react';
// import BooksList from '../components/BooksList';
import * as favoritesAPIFunctions from '../utils/FavoriteAPI';

const SearchPage = () => {

    const [clickedFav, setClickedFav] = useState(false);
    const [clickedLib, setClickedLib] = useState(false);
    const [clickedNeed, setClickedNeed] = useState(false);

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);

    function favoriteBook(book) {
        // favoritesController.create({
        //     title: books.title,
        //     description: books.description,
        //     authors: books.authors,
        //     date: books.date
        // })
        // .then(() => {
        //     console.log('delete this book now!')
        // })
        favoritesAPIFunctions.saveFavorite({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            infoLink: book.volumeInfo.infoLink
        })
        console.log('favorited', book)
    };

    function clickedFavorite(book) {
        if (!clickedFav) {
            setClickedFav(true);
            favoriteBook(book);
        };
    };

    function addToLibrary() {
        console.log("added to the library of books you've read")
    };

    function clickedLibrary(e) {
        if (!clickedLib) {
            setClickedLib(true);
            addToLibrary(e);
        };
    };

    function addToRead() {
        console.log('added to need to read list')
    };

    function clickedRead(e) {
        if (!clickedNeed) {
            setClickedNeed(true);
            addToRead(e);
        };
    };

    const handleSubmit = () => {
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

    const loadHistory = async () => {
        const yourBooks = await JSON.parse(localStorage.getItem('lastBookSearch'));
        setBooks(yourBooks);
        console.log(yourBooks)
    };

    useEffect(() => {
        loadHistory()
    }, [])

    return (
        <div>
            <p>Search</p>
            <input placeholder='Search'
                onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button onClick={handleSubmit}>Submit</button>
            {books.length > 0 && (
                <div>
                    {books.map((book) => (
                        <div key={book.id} className='single-book'>
                            <div className='heading-container'>
                                <div>
                                    <p>{book.volumeInfo?.title}</p>
                                    <p>{book.volumeInfo?.authors}</p>
                                    <a href={book.volumeInfo?.infoLink} className='book-link'>Buy me!</a>
                                </div>
                                <div className='button-container'>
                                    <button onClick={() => clickedFavorite(book)}>FAVORITE</button>
                                    <button onClick={clickedLibrary}>ADD TO YOUR LIBRARY</button>
                                    <button onClick={clickedRead}>NEED TO READ</button>
                                </div>
                            </div>
                            <div className='content-container'>
                                <img src={book.volumeInfo?.imageLinks?.thumbnail} className='book-content' />
                                <p className='book-content'>{book.volumeInfo?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
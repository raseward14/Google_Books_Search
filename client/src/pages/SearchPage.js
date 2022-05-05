import React, { useState, useEffect } from 'react';
// import BooksList from '../components/BooksList';
import * as favoritesAPIFunctions from '../utils/FavoriteAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [maxResults, setMaxResults] = useState(10);
    let searchedBooks = [];
    let APIRead = [];
    let APIWant = [];
    let newSearchArray = [];

    // 2jdwvaw favorite book
    // function favoriteBook(book) {

    //     favoritesAPIFunctions.saveFavorite({
    //         title: book.volumeInfo.title,
    //         authors: book.volumeInfo.authors,
    //         description: book.volumeInfo.description,
    //         imageLink: book.volumeInfo.imageLinks.thumbnail,
    //         infoLink: book.volumeInfo.infoLink
    //     })
    // };

    // not favoriting from here yet
    // function clickedFavorite(book) {
    //     if (!clickedFav) {
    //         setClickedFav(true);
    //         favoriteBook(book);
    //     };
    // };

    // DELETE read -> use db query to GET by isbn13 before deleting
    async function deleteFromRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        console.log(thisIsbn13)
        let result = await readAPIFunctions.getReadByIsbn13(thisIsbn13);
        let readResult = result.data;
        readAPIFunctions.deleteRead(readResult[0]._id);
    };

    // POST read
    function addToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
        let thisIsbn13 = isbn13Array[0].identifier

        readAPIFunctions.saveRead({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            infoLink: book.volumeInfo.infoLink,
            isbn13: thisIsbn13
        })
        console.log("added to books you've read")
    };

    // flip .read, if true post to read, if false, delete all matching titles from read, replace newArray index with new book and setBooks - ternary operator will handle the button change
    function clickedRead(book, index) {
        if (book.read === true) {
            book.read = false;
            let newArr = [...books];
            newArr[index] = book;
            setBooks(newArr);
            deleteFromRead(book)
        } else {
            book.read = true;
            let newArr = [...books];
            newArr[index] = book;
            setBooks(newArr);
            addToRead(book);
        }
    };

    // DELETE want -> uses db query to GET by isbn13 before deleting
    async function deleteFromWant(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        let result = await wantToReadAPIFunctions.getWantToReadByIsbn13(thisIsbn13)
       let wantResult = result.data;
       wantToReadAPIFunctions.deleteWantToRead(wantResult[0]._id)
    };

    // POST want
    async function addWantToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
        let thisIsbn13 = isbn13Array[0].identifier

        await wantToReadAPIFunctions.saveWantToRead({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            infoLink: book.volumeInfo.infoLink,
            isbn13: thisIsbn13
        })
        console.log('added to want list')
    };

    // flip .want, if true post to want, if false, delete all matching titles from want, replace newArray index with new book and setBooks - ternary operator will handle the button change
    function clickedWantToRead(book, index) {
        if (book.want === true) {
            book.want = false;
            let newArr = [...books];
            newArr[index] = book;
            setBooks(newArr);
            deleteFromWant(book);
        } else {
            book.want = true;
            let newArr = [...books];
            newArr[index] = book;
            setBooks(newArr);
            addWantToRead(book);
        };
    };

    function paginate() {

    }

    const handleSubmit = () => {
        // fetch books using search, then convert to JSON, then for the books object, access only the .items property containing book data, and call async function that will wait for this to finish 
        const result = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${maxResults}`)
            .then((response) => response.json())
            .then((books) => {
                callResult();
                return books.items;
            });
        // this function prints the booksArray
        const callResult = async () => {
            newSearchArray = await result;
            checkIfRead(newSearchArray, APIRead);
            checkIfWant(newSearchArray, APIWant);
            setBooks(newSearchArray);
            localStorage.setItem('lastBookSearch', JSON.stringify(newSearchArray));
        };
    };

    // check if posted to read, add property book.read = true
    // if true, break looping through reads, move to next searchedBook
    function checkIfRead(arr1, arr2) {
        arr1.forEach((book) => {
            for (let obj of arr2) {
                // if obj.isbn13 === book.volumeInfo.industryIdentifiers[1].identifier
                if (obj.title === book?.volumeInfo?.title) {
                    book.read = true;
                    console.log('read books: ', obj, book)
                    break;
                } else {
                    book.read = false;
                };
            };
        });
        console.log(searchedBooks);
    };

    // check if posted to want, add property book.want = true
    // if true, break looping through wants, move to the next searchedBook
    function checkIfWant(arr1, arr2) {
        arr1.forEach((book) => {
            for (let obj of arr2) {
                // we need to get the isbn13 of the searched book, industry identifiers is an array, two objects each with two properties
                // if obj.isbn13 === book?.volumeInfo?.industryIdentifiers[1].identifier
                if (obj.title === book.volumeInfo.title) {
                    book.want = true;
                    console.log('want: ', obj, book)
                    break;
                } else {
                    book.want = false;
                };
            };
        });
        console.log(searchedBooks);
    };

    // pull search results from local storage for global searchedBooks array
    // get read from API
    // call function to add .read if a searched book is included in read
    // get want from API
    // call function to add .want if a searched book is included in want
    // setBooks with the searchedBooks containing updated properties on page load
    const loadHistory = async () => {
        searchedBooks = await JSON.parse(localStorage.getItem('lastBookSearch'));
        let read = await readAPIFunctions.getRead();
        APIRead = read.data;
        checkIfRead(searchedBooks, APIRead);
        let want = await wantToReadAPIFunctions.getWantToRead();
        APIWant = want.data;
        checkIfWant(searchedBooks, APIWant);
        setBooks(searchedBooks);
    };

    function consoleLogIsbn(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
        let isbn13 = isbn13Array[0].identifier
        console.log(isbn13)
    }

    // on page load, call loadHistory to load prior search, and add .read, .want properties 
    useEffect(() => {
        loadHistory();
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
                    {books.map((book, index) => (
                        <div key={book.id} className='single-book'>
                            <div className='heading-container'>
                                <div>
                                    <p>{book.volumeInfo?.title}</p>
                                    <p>{book.volumeInfo?.authors}</p>
                                    <a href={book.volumeInfo?.infoLink} className='book-link'>Buy me!</a>
                                </div>
                                <div className='button-container'>
                                    {/* <button onClick={() => clickedFavorite(book)}>FAVORITE</button> */}
                                    {book.read === true ?
                                        <button
                                            style={{ "background-color": "green" }}
                                            onClick={() => {
                                                clickedRead(book, index)
                                            }}>HAVE READ</button>
                                        : <button
                                            onClick={() => {
                                                clickedRead(book, index)
                                            }}>NOT READ</button>
                                    }
                                    {book.want === true ?
                                        <button
                                            style={{ "background-color": "red" }}
                                            onClick={() => clickedWantToRead(book, index)}>WANT TO READ</button>
                                        : <button 
                                            onClick={() => clickedWantToRead(book, index)}>ADD TO WANT</button>
                                    }
                                    {/* <button
                                    onClick={() => consoleLogIsbn(book)}
                                    >isbn</button> */}
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
            <button
            onClick={() => {
                if(startIndex >= 10) {
                    let newStart = startIndex - 10;
                    let newMax = maxResults - 10;
                    setStartIndex(newStart);
                    setMaxResults(newMax);
                    handleSubmit();
                } else {
                    return
                }
            }}
            >back</button>
            <button
            onClick={() => {
                let newStart = startIndex + 10;
                let newMax = maxResults + 10;
                setStartIndex(newStart);
                setMaxResults(newMax);
                handleSubmit();
            }}
            >next</button>
        </div>
    );
};

export default SearchPage;
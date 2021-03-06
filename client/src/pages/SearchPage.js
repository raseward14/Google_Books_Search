import React, { useState, useEffect } from 'react';
// import BooksList from '../components/BooksList';
import * as favoritesAPIFunctions from '../utils/FavoriteAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faSquareCheck, faBook, faQuestion, faThumbtack } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    const [pinned, setPinned] = useState(false);

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
        let result = await readAPIFunctions.getReadByIsbn13(thisIsbn13);
        let readResult = result.data;
        readAPIFunctions.deleteRead(readResult[0]._id);
    };

    // POST read
    function addToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;

        readAPIFunctions.saveRead({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            infoLink: book.volumeInfo.infoLink,
            isbn13: thisIsbn13
        });
        console.log("added to books you've read");
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
        };
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
            inProgress: false,
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

    // check if posted to read, add property book.read = true
    // if true, break looping through reads, move to next searchedBook
    function checkIfRead(arr1, arr2) {
        arr1.forEach((book) => {
            for (let obj of arr2) {
                // get isbn13 of searched book, industry identifiers is an array on some books
                // if obj.isbn13 === book.volumeInfo.industryIdentifiers[1].identifier
                let isbn13Array = book?.volumeInfo?.industryIdentifiers
                // account for books that do not have isbn13s
                if (isbn13Array !== undefined) {
                    // grab the object containing isbn13, not isbn10
                    const searchedIsbn13 = (isbn13Array || []).filter(isbn => isbn.type === 'ISBN_13');
                    // take the identifier property out of the object
                    const isbn13Value = searchedIsbn13[0]?.identifier;
                    if (obj.isbn13 === isbn13Value) {
                        book.read = true;
                        console.log('read book: ', obj, book)
                        break;
                    } else {
                        book.read = false;
                    };
                } else {
                    return;
                };
            };
        });
    };

    // check if posted to want, add property book.want = true
    // if true, break looping through wants, move to the next searchedBook
    function checkIfWant(arr1, arr2) {
        arr1.forEach((book) => {
            for (let obj of arr2) {
                // we need to get the isbn13 of the searched book, industry identifiers is an array, two objects each with two properties
                // if obj.isbn13 === book?.volumeInfo?.industryIdentifiers[1].identifier
                let isbn13Array = book?.volumeInfo?.industryIdentifiers
                // looks like some books do not have isbn13's
                if (isbn13Array !== undefined) {
                    // grab the object containing the isbn13, not isbn10
                    const searchedIsbn13 = (isbn13Array || []).filter(isbn => isbn.type === 'ISBN_13')
                    // take the identifier property out of the object
                    const isbn13Value = searchedIsbn13[0]?.identifier;
                    if (obj.isbn13 === isbn13Value) {
                        book.want = true;
                        console.log('want to read book: ', obj, book)
                        break;
                    } else {
                        book.want = false;
                    };
                } else {
                    return;
                };
            };
        });
    };

    // DEV-305    
    // const handleSubmit = () => {
    // fetch books using search, then convert to JSON, then for the books object, access only the .items property containing book data, and call async function that will wait for this to finish 
    //     const result = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${maxResults}`)
    //         .then((response) => response.json())
    //         .then((books) => {
    //             callResult();
    //             return books.items;
    //         });
    //     // this function prints the booksArray
    //     const callResult = async () => {
    //         const newSearchArray = await result;

    //         const read = await readAPIFunctions.getRead();
    //         const APIRead = read.data;
    //         checkIfRead(newSearchArray, APIRead);

    //         const want = await wantToReadAPIFunctions.getWantToRead();
    //         const APIWant = want.data;
    //         checkIfWant(newSearchArray, APIWant);

    //         setBooks(newSearchArray);
    //         localStorage.setItem('lastBookSearch', JSON.stringify(newSearchArray));
    //         handleSubmitRefactored()
    //     };
    // };

    async function handleSubmit() {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}`)
        const books = await response.json();
        let booksArray = books.items;

        const read = await readAPIFunctions.getRead();
        const APIRead = read.data;
        checkIfRead(booksArray, APIRead);

        const want = await wantToReadAPIFunctions.getWantToRead();
        const APIWant = want.data;
        checkIfWant(booksArray, APIWant);

        setBooks(booksArray);
        // set the last array of results
        localStorage.setItem('lastBookSearch', JSON.stringify(booksArray));
        // set the search term on click -> submit
        localStorage.setItem('lastSearchTerm', JSON.stringify(search));
    };

    // pull search results from local storage for global searchedBooks array
    // get read from API
    // call function to add .read if a searched book is included in read
    // get want from API
    // call function to add .want if a searched book is included in want
    // setBooks with the searchedBooks containing updated properties on page load
    const loadHistory = async () => {
        const lastTermSearched = await JSON.parse(localStorage.getItem('lastSearchTerm'));
        setSearch(lastTermSearched);
        const searchedBooks = await JSON.parse(localStorage.getItem('lastBookSearch'));
        const read = await readAPIFunctions.getRead();
        const APIRead = read.data;
        checkIfRead(searchedBooks, APIRead);
        const want = await wantToReadAPIFunctions.getWantToRead();
        const APIWant = want.data;
        checkIfWant(searchedBooks, APIWant);
        setBooks(searchedBooks);
        console.log('APIRead: ', APIRead);
        console.log('APIWant: ', APIWant);
        console.log('searched books: ', searchedBooks);
    };

    // function consoleLogIsbn(book) {
    //     let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
    //     let isbn13 = isbn13Array[0].identifier
    //     console.log(isbn13)
    // }

    useEffect(() => {
        if (search !== '') {
            handleSubmit()
        } else {
            return;
        };
    }, [startIndex])

    // on page load, call loadHistory to load prior search, and add .read, .want properties 
    useEffect(() => {
        loadHistory();
    }, [])

    return (
        <div>
            <h3>Search</h3>
            <input placeholder='Search'
                onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button onClick={handleSubmit}>Submit</button>
            <div className={pinned ? 'single-book-header sticky' : 'single-book-header'}>
                <FontAwesomeIcon
                    icon={faThumbtack}
                    className={pinned ? 'pinned' : 'not-pinned'}
                    onClick={() => {
                        if(pinned === false) {
                            setPinned(true)
                        } else {
                            setPinned(false)
                        }
                    }}
                />
                <div className='heading-container-header'>
                    <p>Read Books</p>
                    <p>Want to Read</p>
                </div>
            </div>
            {books.length > 0 && (
                <div>
                    {books.map((book, index) => (
                        <div key={book._id} className='single-book'>
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
                                            style={{ "backgroundColor": "green" }}
                                            onClick={() => {
                                                clickedRead(book, index)
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faSquareCheck}
                                                className='fa-2x'
                                            />
                                        </button>
                                        : <button
                                            onClick={() => {
                                                clickedRead(book, index)
                                            }}>
                                            <FontAwesomeIcon
                                                icon={faQuestion}
                                                className='fa-2x'
                                            />
                                        </button>
                                    }
                                    {book.want === true ?
                                        <button
                                            style={{ "backgroundColor": "green" }}
                                            onClick={() => clickedWantToRead(book, index)}>
                                            <FontAwesomeIcon
                                                icon={faBookBookmark}
                                                className='fa-2x' />
                                        </button>
                                        : <button
                                            onClick={() => clickedWantToRead(book, index)}>
                                            <FontAwesomeIcon
                                                icon={faBook}
                                                className='fa-2x' />
                                        </button>
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
                    if (startIndex >= 10) {
                        let newStart = startIndex - 10;
                        setStartIndex(newStart);
                    } else {
                        return
                    }
                }}
            >back</button>
            <button
                onClick={() => {
                    let newStart = startIndex + 10;
                    console.log(newStart,)
                    setStartIndex(newStart);
                }}
            >next</button>
        </div>
    );
};

export default SearchPage;
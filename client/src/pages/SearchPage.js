import React, { useState, useEffect, useRef } from 'react';
// import BooksList from '../components/BooksList';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faSquareCheck, faBook, faQuestion, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
// components
import Toggle from '../components/Toggle/toggle';

const SearchPage = ({ appReadCount, appWantCount, appFavCount }) => {

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [pinned, setPinned] = useState(false);

    // navBar count state variables
    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    const [favCount, setFavCount] = useState(null);

    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();
    //navigates to login, and then back to this location
    const navigate = useNavigate();
    const location = useLocation();

    //search toggles
    const [intitle, setIntitle] = useState(null);
    const [subject, setSubject] = useState(null);
    const [inauthor, setInauthor] = useState(null);

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
        let result = await readAPIFunctions.getReadByIsbn13(axiosPrivate, thisIsbn13, accessToken, userID);
        let readResult = result.data;
        readAPIFunctions.deleteRead(axiosPrivate, readResult[0]._id, accessToken);
        let favoriteResult = await favoriteAPIFunctions.getfavoriteByIsbn13(axiosPrivate, thisIsbn13, accessToken, userID);
        if (favoriteResult.data.length) {
            let favoriteResultData = favoriteResult.data;
            favoriteAPIFunctions.deleteFavorite(axiosPrivate, favoriteResultData[0]._id, accessToken);
            let fCount = await (favCount - 1)
            setFavCount(fCount);
        }
        let rCount = await (readCount - 1);
        setReadCount(rCount);
    };

    // POST read
    async function addToRead(book, index) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;

        if (book.want === true) {
            book.want = false;
            let newArr = [...books]
            newArr[index] = book;
            setBooks(newArr)
            deleteFromWant(book)
        }

        readAPIFunctions.saveRead(axiosPrivate, {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            infoLink: book.volumeInfo.infoLink,
            isbn13: thisIsbn13,
            user_id: userID
        }, accessToken);
        let rCount = await (readCount + 1);
        setReadCount(rCount);
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
            addToRead(book, index);
        };
    };

    // DELETE want -> uses db query to GET by isbn13 before deleting
    async function deleteFromWant(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        let result = await wantToReadAPIFunctions.getWantToReadByIsbn13(axiosPrivate, thisIsbn13, accessToken, userID)
        let wantResult = result.data;
        console.log('want result:', wantResult.length)
        if (wantResult.length > 0) {
            wantToReadAPIFunctions.deleteWantToRead(axiosPrivate, wantResult[0]._id, accessToken)
            let wCount = await (wantCount - 1);
            setWantCount(wCount)
        }
    };

    // POST want
    async function addWantToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
        let thisIsbn13 = isbn13Array[0].identifier

        await wantToReadAPIFunctions.saveWantToRead(axiosPrivate, {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            infoLink: book.volumeInfo.infoLink,
            inProgress: false,
            isbn13: thisIsbn13,
            user_id: userID
        }, accessToken)
        let wCount = await (wantCount + 1);
        setWantCount(wCount);

    };

    // flip .want, if true post to want, if false, delete all matching titles from want, replace newArray index with new book and setBooks - ternary operator will handle the button change
    function clickedWantToRead(book, index) {
        if (book.want === true) {
            console.log('clicked want'.book)
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
        try {
            console.log('search term: ', search)
            console.log('start Index:', startIndex)
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}`)
            const books = await response.json();
            let booksArray = books.items;

            const read = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
            const APIRead = read.data;
            checkIfRead(booksArray, APIRead);

            const want = await wantToReadAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
            const APIWant = want.data;
            checkIfWant(booksArray, APIWant);

            setBooks(booksArray);
            // set the last array of results
            localStorage.setItem(`lastBookSearchUserID:${userID}`, JSON.stringify(booksArray));
            // set the search term on click -> submit
            localStorage.setItem(`lastSearchTermUserID:${userID}`, JSON.stringify(search));
        } catch (err) {
            console.error(err)
            navigate('/login', { state: { from: location }, replace: true })
        }
    };

    // pull search results from local storage for global searchedBooks array
    // get read from API
    // call function to add .read if a searched book is included in read
    // get want from API
    // call function to add .want if a searched book is included in want
    // setBooks with the searchedBooks containing updated properties on page load
    const loadHistory = async () => {
        try {
            const lastTermSearched = await JSON.parse(localStorage.getItem(`lastSearchTermUserID:${userID}`));
            if (lastTermSearched) {
                setSearch(lastTermSearched)
            } else {
                setSearch('')
            }

            const searchedBooks = await JSON.parse(localStorage.getItem(`lastBookSearchUserID:${userID}`));
            if (searchedBooks) {
                const read = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
                const APIRead = read.data;
                checkIfRead(searchedBooks, APIRead);
                let rCount = await APIRead.length
                setReadCount(rCount);
                console.log('searchPage loadHistory readCount: ', rCount)

                const want = await wantToReadAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
                const APIWant = want.data;
                checkIfWant(searchedBooks, APIWant);
                let wCount = await APIWant.length
                setWantCount(wCount);
                console.log('searchPage loadHistory want count:', wCount)

                const fav = await favoriteAPIFunctions.getFavorites(axiosPrivate, accessToken, userID)
                let fCount = await fav.data.length
                setFavCount(fCount);
                console.log('searchPage loadHistory favCount: ', fCount);

                setBooks(searchedBooks)
            } else {
                setBooks([])
            }
        } catch (err) {
            console.error(err)
            navigate('/login', { state: { from: location }, replace: true })
        }
    };

    // function consoleLogIsbn(book) {
    //     let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
    //     let isbn13 = isbn13Array[0].identifier
    //     console.log(isbn13)
    // }

    useEffect(() => {
        console.log('inTitle', intitle)
    }, [intitle]);

    useEffect(() => {
        console.log('subject', subject)
    }, [subject]);

    useEffect(() => {
        console.log('inAuthor', inauthor)
    }, [inauthor]);

    // useEffect to load book count on page load, and any time want, read, or fav changes
    useEffect(() => {
        appReadCount(readCount)
    }, [readCount]);

    useEffect(() => {
        appWantCount(wantCount)
    }, [wantCount]);

    useEffect(() => {
        appFavCount(favCount)
    }, [favCount]);

    useEffect(() => {
        if (search !== '') {
            handleSubmit()
        } else {
            return;
        };
    }, [startIndex]);

    // on page load, call loadHistory to load prior search, and add .read, .want properties 
    useEffect(() => {
        loadHistory();
    }, []);

    return (
        <div>
            <h3>Search</h3>
            <span className='search_toggle'>In Title</span><Toggle toggle={setIntitle(value)} /><br/><br/>
            <span className='search_toggle'>In Author</span><Toggle toggle={setInauthor(value)} /><br/><br/>
            <span className='search_toggle'>Genre</span><Toggle toggle={setSubject(value)} /><br/>
            <input
                className='search'
                placeholder='General Search'
                onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button
                className='submit'
                onClick={handleSubmit}>Submit</button>
            <div className={pinned ? 'single-book-header sticky' : 'single-book-header'}>
                <FontAwesomeIcon
                    icon={faThumbtack}
                    className={pinned ? 'pin pinned' : 'pin not-pinned'}
                    onClick={() => {
                        if (pinned === false) {
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
                        <div key={index} className='single-book'>
                            <div className='heading-container'>
                                <div>
                                    <p>{book.volumeInfo?.title}</p>
                                    <p>{book.volumeInfo?.authors}</p>
                                    <a href={book.volumeInfo?.infoLink} className='book-link'>Buy me!</a>
                                </div>
                                <div key={index} className='button-container'>
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
                                        : book.read === true ?
                                            <FontAwesomeIcon
                                                icon={faBook}
                                                className='fa-2x' />
                                            :
                                            <button
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
                            {book.expand ? 
                            <div className='content-container' >
                                <img src={book.volumeInfo?.imageLinks?.thumbnail} className='book-content' />
                                <p className='book-content'>{book.volumeInfo?.description}</p>
                            </div>
                            : 
                            <div className='content-container fade shrink' >
                                <img src={book.volumeInfo?.imageLinks?.thumbnail} className='book-content' />
                                <p className='book-content'>{book.volumeInfo?.description}</p>
                            </div>
                            }
                            <div className='expand'
                                onClick={() => {
                                    if (book.expand) {
                                        book.expand = false;
                                        let newArr = [...books];
                                        newArr[index] = book;
                                        setBooks(newArr);
                                    } else {
                                        book.expand = true;
                                        let newArr = [...books];
                                        newArr[index] = book;
                                        setBooks(newArr);
                                    };                            
                                }}>Expand</div>
                        </div>
                    ))}
                </div>
            )}
            <button
                className='navButton'
                onClick={() => {
                    if (startIndex >= 10) {
                        let newStart = startIndex - 10;
                        setStartIndex(newStart);
                    } else {
                        return
                    }
                }}
            ><span className='back'>back</span></button>
            <button
                className='navButton'
                onClick={() => {
                    let newStart = startIndex + 10;
                    console.log(newStart)
                    setStartIndex(newStart);
                }}
            ><span className='next'>next</span></button>
        </div>
    );
};

export default SearchPage;
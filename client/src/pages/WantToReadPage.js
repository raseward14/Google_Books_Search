import React, { useState, useEffect } from 'react';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
import * as readAPIFunctions from '../utils/ReadAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBook, faCheck, faBookOpen, faThumbtack } from '@fortawesome/free-solid-svg-icons';

const WantToReadPage = () => {

    const [want, setWant] = useState([]);
    const [pinned, setPinned] = useState(false);
    let APIWant;

    const deleteFromRead = async (book) => {
        let readBook = await readAPIFunctions.getReadByIsbn13(book.isbn13);
        const readBookID = readBook.data[0]._id;
        readAPIFunctions.deleteRead(readBookID);
    };

    async function setInProgressToTrue(book) {
        console.log('book in progress: ', book)
        await wantToReadAPIFunctions.updateWantToRead(book._id, {
            inProgress: true
        });
    };

    async function setInProgressToFalse(book) {
        console.log('book not in progress: ', book);
        await wantToReadAPIFunctions.updateWantToRead(book._id, {
            inProgress: false
        });
    };

    function clickedInProgress(book, index) {
        console.log(book)
        if (book.inProgress === true) {
            book.inProgress = false;
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr)
            setInProgressToFalse(book)
        } else {
            book.inProgress = true;
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr);
            setInProgressToTrue(book)
        }
    }

    async function addToRead(book) {
        await readAPIFunctions.saveRead({
            title: book.title,
            authors: book.authors,
            description: book.description,
            imageLink: book.imageLink,
            infoLink: book.infoLink,
            isbn13: book.isbn13
        });
        console.log('added to read books!')
        removeFromWantToRead(book);
    };

    async function clickedRead(book, index) {
        if (book.read === true) {
            book.read = false
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr);
            deleteFromRead(book);
        } else {
            book.read = true;
            let newArr = [...want];
            newArr[index] = book;
            setWant(newArr);
            addToRead(book);
        };
    };

    async function removeFromWantToRead(book) {
        await wantToReadAPIFunctions.deleteWantToRead(book._id);
        setWant(want.filter(item => item._id !== book._id));
    };

    async function loadWant() {
        let result = await wantToReadAPIFunctions.getWantToRead();
        APIWant = result.data;
        console.log(APIWant)
        setWant(APIWant);
    };

    useEffect(() => {
        loadWant();
    }, []);

    return (
        <div>
            <h3>Books I want to read</h3>
            <div className={pinned ? 'single-book-header sticky' : 'single-book-header'}>
                <FontAwesomeIcon
                    icon={faThumbtack}
                    className={pinned ? 'pinned' : 'not-pinned'}
                    onClick={() => {
                        if (pinned === false) {
                            setPinned(true);
                        } else {
                            setPinned(false);
                        }
                    }}
                />
                <div className='heading-container-header'>
                    <p>In Progress</p>
                    <p>Complete</p>
                    <p>Remove</p>
                </div>
            </div>
            <div>
                {want.map((book, index) => (
                    <div key={book._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book?.title}</p>
                                <p>{book?.authors}</p>
                                <a href={book?.infoLink} className='book-link'>Buy me!</a>

                            </div>
                            <div className='button-container'>
                                {book.inProgress === true ?
                                    <button
                                        style={{ 'backgroundColor': 'green' }}
                                        onClick={() => {
                                            clickedInProgress(book, index)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faBookOpen}
                                            className='fa-2x' />
                                    </button>
                                    :
                                    <button
                                        onClick={() => {
                                            clickedInProgress(book, index)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faBook}
                                            className='fa-2x' />
                                    </button>

                                }
                                {book.read === true ?
                                    <button
                                        style={{ 'backgroundColor': 'green' }}
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className='fa-2x' />
                                    </button> :
                                    <button
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className='fa-2x' />
                                    </button>
                                }
                                <button
                                    onClick={() => {
                                        removeFromWantToRead(book);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className='fa-2x' />
                                </button>
                            </div>
                        </div>
                        <div className='content-container'>
                            <img src={book?.imageLink} className='book-content' />
                            <p className='book-content'>{book?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default WantToReadPage;
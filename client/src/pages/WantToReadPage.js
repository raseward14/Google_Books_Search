import React, { useState, useEffect } from 'react';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
import * as readAPIFunctions from '../utils/ReadAPI';

const WantToReadPage = () => {

    const [want, setWant] = useState([]);
    let APIWant;

    const deleteFromRead = async (book) => {
        let readBook = await readAPIFunctions.getReadByIsbn13(book.isbn13);
        const readBookID = readBook.data[0]._id;
        readAPIFunctions.deleteRead(readBookID);
    };

    async function addToRead(book) {
        readAPIFunctions.saveRead({
            title: book.title,
            authors: book.authors,
            description: book.description,
            imageLink: book.imageLink,
            infoLink: book.infoLink,
            isbn13: book.isbn13
        });
        console.log('added to read books!')
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
            <p>Books I want to read</p>
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
                                <button>In progress</button>
                                {book.read === true ?
                                    <button
                                    style={{ 'backgroundColor': 'green' }}
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                    >Completed!</button> :
                                    <button
                                        onClick={() => {
                                            clickedRead(book, index);
                                        }}
                                    >Still Reading.</button>
                                }
                                <button
                                    onClick={() => {
                                        removeFromWantToRead(book);
                                    }}
                                >Remove</button>
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
import React, { useState, useEffect } from 'react';
import * as wantToReadAPIFunctions from '../utils/WantToReadAPI';
import * as readAPIFunctions from '../utils/ReadAPI';

const WantToReadPage = () => {

    const [want, setWant] = useState([]);
    let APIWant;

    async function addToRead(book) {
        console.log(book.title);
        console.log(book.authors);
        console.log(book.description);
        console.log(book.imageLink);
        console.log(book.infoLink);
        console.log(book.isbn13);

        readAPIFunctions.saveRead({
                title: book.title,
                authors: book.authors,
                description: book.description,
                imageLink: book.imageLink,
                infoLink: book.infoLink,
                isbn13: book.isbn13
        });
        console.log('added to read books!')
    }

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
                {want.map((book) => (
                    <div key={book._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book?.title}</p>
                                <p>{book?.authors}</p>
                                <a href={book?.infoLink} className='book-link'>Buy me!</a>

                            </div>
                            <div className='button-container'>
                                <button>In progress</button>
                                <button
                                    onClick={() => {
                                        addToRead(book);
                                    }}
                                >Completed!</button>
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
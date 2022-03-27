import React, { useState, useEffect } from 'react';
import * as libraryAPIFunctions from '../utils/LibraryAPI';

const LibraryPage = () => {

    const [library, setLibrary] = useState([]);
    let APILibrary;

    async function loadLibrary() {
        let result = await libraryAPIFunctions.getLibrary();
        APILibrary = result.data;
        setLibrary(APILibrary);
    };

    useEffect(() => {
        loadLibrary();
    }, [])

    // i can favorite books from my library DEV-298

    return (
        <div>
            <p>Library of books I've read.</p>
            <div>
                {library.map((book) => (
                    <div key={book.id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book.title}</p>
                                <p>{book.authors}</p>
                                <a href={book.infoLink} className='book-link'>Buy me!</a>
                            </div>
                        </div>
                        <div className='content-container'>
                            <img src={book.imageLink} className='book-content' />
                            <p className='book-content'>{book.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default LibraryPage;
import React, { useState, useEffect } from 'react';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';

const LibraryPage = () => {
    
    const [read, setRead] = useState([]);
    let APIRead;
    
    // i can favorite books from my library DEV-298
    // function favoriteBook(book) {
    //     favoriteAPIFunctions.saveFavorite({
    //         title: book.title,
    //         authors: book.authors,
    //         description: book.description,
    //         imageLink: book.imageLink,
    //         infoLink: book.infoLink
    //     })
    //     .then((book) => {
    //         readAPIFunctions.updateRead(
    //             { id: book.id }, 
    //             { favorited: true }
    //         )
    //     })
    // };

    // DEV-298
    function favoriteBook(book) {
         readAPIFunctions.getReadByID(book._id)
         .then((response) => {
            console.log(response.data.favorited)
            if(response.data.favorited === true) {
                readAPIFunctions.updateRead(book._id, { "favorited": "false" })
                .then((response) => {
                    console.log(response.data.favorited)
                })
            } else {
                readAPIFunctions.updateRead(book._id, { "favorited": "true" })
                .then((response) => {
                    console.log(response.data.favorited)
                })
            }
         })
        .then((response) => {
            // post it to the favorites page
        })
    }

    // function clickedFavorite(book) {
    //     favoriteBook(book);
    // };

    async function loadRead() {
        let result = await readAPIFunctions.getRead();
        APIRead = result.data;
        console.log(APIRead)
        setRead(APIRead);
    };

    useEffect(() => {
        loadRead();
    }, []);


    return (
        <div>
            <p>Library of books I've read.</p>
            <div>
                {read.map((book) => (
                    <div key={book.id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book.title}</p>
                                <p>{book.authors}</p>
                                <a href={book.infoLink} className='book-link'>Buy me!</a>
                            </div>
                            <div className='button-container'>
                                <button onClick={() => {
                                        favoriteBook(book);
                                }}>Favorite</button>
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
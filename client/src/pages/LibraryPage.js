import React, { useState, useEffect } from 'react';
import * as readAPIFunctions from '../utils/ReadAPI';
import * as favoriteAPIFunctions from '../utils/FavoriteAPI';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const LibraryPage = () => {

    const [read, setRead] = useState([]);
    let APIRead;

    async function deleteFromFavorites(book) {
        let result = await favoriteAPIFunctions.getFavorites();
        let APIFavorites = result.data
        let suspects = APIFavorites.filter(favorite => favorite.title === book.title)
        suspects.map(suspect => {
            favoriteAPIFunctions.deleteFavorite(suspect._id);
        });
    };

    async function unFavoriteBook(book, index) {
        let response = await readAPIFunctions.updateRead(book._id, { "favorited": "false" });
        let newArr = [...read];
        newArr[index] = response.data;
        setRead(newArr);
        // now delete it from the favorites
        console.log('unfavorited');
        deleteFromFavorites(book);
    };

    async function removeFromRead(book) {
        await readAPIFunctions.deleteRead(book._id);
        setRead(read.filter(read => read._id !== book._id))
        deleteFromFavorites(book);
    };

    async function postFavorite(book) {
        let response = await favoriteAPIFunctions.saveFavorite({
            title: book.title,
            authors: book.authors,
            description: book.description,
            imageLink: book.imageLink,
            infoLink: book.infoLink,
        });
        // IF its not already in favorites
        // if .title === .title of the book we are favoriting
        // 'oops! looks like a book with this title has already been favorited!'
        // click here to keep both
        // click here to replace that book with this one
    };


    async function favoriteBook(book, index) {
        let response = await readAPIFunctions.updateRead(book._id, { "favorited": "true" });
        let newArr = [...read];
        newArr[index] = response.data;
        setRead(newArr);
        // POST to favorites 
        postFavorite(book);
    };

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
            <div className='single-book-header'>
                <div className='heading-container-header'>
                    <p>Favorite</p>
                    <p>Remove</p>
                </div>
            </div>
            <div>
                {read.map((book, index) => (
                    <div key={book._id} className='single-book'>
                        <div className='heading-container'>
                            <div>
                                <p>{book.title}</p>
                                <p>{book.authors}</p>
                                <a href={book.infoLink} className='book-link'>Buy me!</a>
                            </div>
                            <div className='button-container'>
                                {book.favorited === true ?
                                    <button style={{ "backgroundColor": "yellow" }} onClick={() => {
                                        unFavoriteBook(book, index);
                                    }}>
                                        <FontAwesomeIcon 
                                        icon={faStar}
                                        className='fa-2x' />
                                    </button>
                                    : <button 
                                    onClick={() => {
                                        favoriteBook(book, index);
                                    }}>
                                        <FontAwesomeIcon 
                                        icon={faStar}
                                        className='fa-2x' />
                                    </button>
                                }
                                <button
                                    onClick={() => {
                                        removeFromRead(book);
                                    }}
                                >
                                    <FontAwesomeIcon 
                                    icon={faTrashCan}
                                    className='fa-2x' />
                                </button>
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
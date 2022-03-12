import React, { useEffect, useState } from 'react';
import * as favoriteAPIFunctions from'../utils/FavoriteAPI';

const FavoritesPage = () => {

    const [favorites, setFavorites] = useState([]);
    const bookShelf = document.getElementById('bookshelf');

    useEffect(() => {
        // async function loadFavorites() {
            //     let result = await favoriteAPIFunctions.getFavorites();
            //     let favoritesArray = result.data;
            //     setFavorites(favoritesArray);
            if(favorites.length === 0) {
                console.log('favorites is empty')
                return
            } else {
                console.log('favorites have been set!', favorites)
            }
            // printFavorites(favoritesArray)
            // console.log('favorites array: ', favoritesArray)
            // console.log('favorites: ', favorites)
        // }

        // loadFavorites()
        // load your favorites on page load
        // favoriteAPIFunctions.getFavorites()
        // .then((res) => {
        //     let favoritesArray = res.data;
        //     setFavorites(favoritesArray);
        // })
        // .then(() => {
        //     console.log(favorites)
        //     printFavorites(favorites)
        // })
        // .catch((err) => console.log(err))
    }, []);

    const printFavorites = (favoritesArray) => {
        for (let i = 0; i < favoritesArray.length; i++) {
            // once: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            // A boolean value indicating that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked. If not specified, defaults to false.
            const once = {
                once : true
            }
            
            var singleBook = document.createElement('div');
            var lineBreak = document.createElement('br');
            
            var headingContainer = document.createElement('div');

            var summaryContainer = document.createElement('div');
            var bookTitle = document.createElement('p');
            var bookAuthors = document.createElement('p');
            var bookLink = document.createElement('a');

            var buttonContainer = document.createElement('div');
            // var favButton = document.createElement('button');
            // var libraryButton = document.createElement('button');
            // var toReadButton = document.createElement('button');

            bookTitle.textContent = favoritesArray[i]?.volumeInfo?.title;
            bookAuthors.textContent = favoritesArray[i]?.volumeInfo?.authors;
            bookLink.href = `${favoritesArray[i]?.volumeInfo?.previewLink}`;
            bookLink.textContent = 'Buy me!'
            // favButton.textContent = 'FAVORITE';
            // libraryButton.textContent = 'ADD TO YOUR LIBRARY';
            // toReadButton.textContent = 'NEED TO READ';
            
            // favButton.addEventListener('click', favoriteBook, once);
            // libraryButton.addEventListener('click', addToLibrary, once);
            // toReadButton.addEventListener('click', addToRead, once);
           
            headingContainer.classList.add('headingContainer');
            
            summaryContainer.append(bookTitle);
            summaryContainer.append(bookAuthors)
            summaryContainer.append(bookLink);

            // buttonContainer.append(favButton);
            // buttonContainer.append(libraryButton);
            // buttonContainer.append(toReadButton);

            headingContainer.append(summaryContainer);
            headingContainer.append(buttonContainer);

            singleBook.append(headingContainer);
            
            var contentContainer = document.createElement('div');
            var bookDescription = document.createElement('p');
            var bookImage = document.createElement('img');
            
            bookDescription.textContent = favoritesArray[i]?.volumeInfo?.description;
            bookImage.src = `${favoritesArray[i]?.volumeInfo?.imageLinks?.thumbnail}`;

            buttonContainer.classList.add('button-container')
            contentContainer.classList.add('content-container');
            bookDescription.classList.add('book-content');
            bookImage.classList.add('book-content');
            bookLink.classList.add('book-link')
 
            singleBook.classList.add('single-book');       
            
            contentContainer.append(bookImage);
            contentContainer.append(bookDescription);
            singleBook.append(contentContainer);
            
            // const bookShelf = document.getElementById('container');
            bookShelf.append(singleBook);
        }
    };

    async function loadFavorites() {
        let result = await favoriteAPIFunctions.getFavorites();
        let favoritesArray = result.data;
        // if(bookShelf.innerHTML !== null) {
            // bookShelf.innerHTML = null;
        // }
        console.log(favoritesArray)
        setFavorites(favoritesArray);
        // printFavorites(favoritesArray);
    };

    // loadFavorites();

    return (
        <div>
            <p>Favorites</p>
            <div id='bookshelf'></div>
        </div>
    );
};

export default FavoritesPage;
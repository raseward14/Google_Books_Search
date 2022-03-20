// import React, { useState, useEffect } from 'react';

// const BooksList = ({ search }) => {
//     const bookShelf = document.getElementById('container');
//     const yourBooks = JSON.parse(localStorage.getItem('lastBookSearch'));
//     // const [books, setBooks] = useState(yourBooks || []);

//     const handleSubmit = (search) => {
//         // clear the bookshelf each time
//         bookShelf.innerHTML = null;
//         console.log('handleSubmit')
//         // fetch books using search, then convert to JSON, then for the books object, access only the .items property containing book data, and call async function that will wait for this to finish 
//         const result = fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
//             .then((response) => response.json())
//             .then((books) => {
//                 callResult();
//                 return books.items;
//             });
//         // this function prints the booksArray
//         const callResult = async () => {
//             const booksArray = await result;
//             setBooks(booksArray);
//             localStorage.setItem('lastBookSearch', JSON.stringify(booksArray))
//             printResult(books);
//         };

//     };


//     return (
//         <div>
        
//         {books.length > 0 && (
//                 <div id='container'>
//                     {books.map((book) => (
//                         <div className='single-book' key={book.id}>
//                             <div className='heading-container'>
//                                 <div>
//                                     <p>{book.volumeInfo?.title}</p>
//                                     <p>{book.volumeInfo?.authors}</p>
//                                     <a href={book.volumeInfo?.previewLink} className='book-link'>Buy me!</a>
//                                 </div>
//                                 <div className='button-container'>
//                                     <button onClick={clickedFavorite}>FAVORITE</button>
//                                     <button onClick={clickedLibrary}>ADD TO YOUR LIBRARY</button>
//                                     <button onClick={clickedRead}>NEED TO READ</button>
//                                 </div>
//                             </div>
//                             <div className='content-container'>
//                                 <img src={book.volumeInfo?.imageLinks?.thumbnail} className='book-content' />
//                                 <p className='book-content'>{book.volumeInfo?.description}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}


//         </div>
//     )
// }
// export default BooksList;
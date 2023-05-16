import React, { useState, useEffect } from "react";
import './style.css'
// ------------------------------------------------
// CSS file for react tooltip
import 'react-tooltip/dist/react-tooltip.css'
// --------------------------------------------------

// importing the buttons
// import ReadButton from "../ReadButton";

// --------------------------------------------------------------------
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faSquareCheck, faBook, faQuestion, faThumbtack } from '@fortawesome/free-solid-svg-icons';
// api calls - read, want, and axiosPrivate
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import * as readAPIFunctions from '../../utils/ReadAPI';
import * as wantToReadAPIFunctions from '../../utils/WantToReadAPI';
import { Tooltip as ReactTooltip } from "react-tooltip";
// ------------------------------------------------------------------



const Modal = ({ state, callbackFunction, book }) => {
    // ---------------------------------------------------
    // navbar count state variables
    const [readCount, setReadCount] = useState(null);
    const [wantCount, setWantCount] = useState(null);
    // axiosPrivate, userID, and accessToken for api calls
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();
    // book state variable to handle button color changes onClick
    // this needs to be whatever the book prop is - going to set in a useEffect
    const [modalBook, setModalBook] = useState();
    // -----------------------------------------------------

    const myModal = document.getElementById("myModal");

    // -----------------------------------------
    // DELETE read -> use db query to GET by isbn13 before deleting
    async function deleteFromRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        let result = await readAPIFunctions.getReadByIsbn13(axiosPrivate, thisIsbn13, accessToken, userID);
        let readResult = result.data;
        readAPIFunctions.deleteRead(axiosPrivate, readResult[0]._id, accessToken);
        let rCount = await (readCount - 1);
        setReadCount(rCount);
    };
    // POST read
    async function addToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;

        if (book.want === true) {
            book.want = false;
            deleteFromWant(book)
        }
        readAPIFunctions.saveRead(axiosPrivate, {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            subject: book.volumeInfo.categories[0],
            infoLink: book.volumeInfo.infoLink,
            isbn13: thisIsbn13,
            user_id: userID
        }, accessToken);
        let rCount = await (readCount + 1);
        setReadCount(rCount);
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
        };
    };
    // flip .read, if true post to read, if false, delete all matching titles from read, will need to set a book state variable - ternary operator will handle the button change
    function clickedRead(clickedBook) {
        if (clickedBook.read === true) {
            clickedBook.read = false;
            setModalBook({ "read": false });
            // deleteFromRead(clickedBook);
        } else if (clickedBook.want === false) {
            clickedBook.read = true;
            setModalBook({ "read": true });
            // addToRead(clickedBook);
        } else {
            clickedBook.read = true;
            clickedBook.want = false;
            setModalBook({
                "read": true,
                "want": false
            })
        };
    };

    // flip .want
    function clickedWant(clickedBook) {
        if (clickedBook.want) {
            clickedBook.want = false;
            console.log('want is: ', clickedBook.want)
            setModalBook({ "want": false });
            // deletefromWant(clickedBook)
        } else {
            clickedBook.want = true;
            console.log('want is: ', clickedBook.want)
            setModalBook({ "want": true });
            // addToWant(clickedBook)
        };
    }




    const closeModal = () => {
        myModal.style.display = 'none';
        callbackFunction(false)
    };

    const toggleModal = async (index) => {
        if (index && myModal !== null) {
            myModal.style.display = 'block';
        }
    };

    useEffect(() => {
        setModalBook(book);
    });

    // any time the modalBook changes, console log it
    useEffect(() => {
        console.log('This book is in the modal', modalBook)
    }, [modalBook]);

    useEffect(() => {
        if (state !== null) {
            console.log('useEffect - modal state changed for this book:', book)
            toggleModal(state)
        };
    }, [state]);

    return (
        <div id="myModal" className="modal">
            <table className="modal-content">
                <tbody>
                    <tr>
                        {modalBook ? (
                            <tr>
                                <td className="recommended-box book-card">
                                    <p style={{ color: "white" }}>{book.volumeInfo.title}</p>
                                    <img src={book.volumeInfo?.imageLinks?.thumbnail} className="fade" />
                                </td>
                                <td >
                                    <ReactTooltip id="myTip" />
                                    <tr>
                                        {modalBook.read === true ?
                                            <button
                                                data-tooltip-id="myTip"
                                                data-tooltip-content="Remove from your read books!"
                                                style={{ "backgroundColor": "green" }}
                                                onClick={() => {
                                                    clickedRead(modalBook);
                                                }}><FontAwesomeIcon icon={faSquareCheck}
                                                    className='fa-2x' /></button>
                                            /* <ReadButton 
suggestionsArray={}
book={book}
index={}
appReadCount={}
suggestionsArrayCallback={} /> */
                                            :
                                            <button
                                                data-tooltip-id="myTip"
                                                data-tooltip-content="Add to your read books!"
                                                style={{ "backgroundColor": "revert" }}
                                                onClick={() => {
                                                    clickedRead(modalBook);
                                                }}><FontAwesomeIcon icon={faQuestion}
                                                    className='fa-2x' /></button>
                                        }
                                    </tr>

                                    <tr>{modalBook.want === true ?
                                        <button
                                            data-tooltip-id="myTip"
                                            data-tooltip-content="Remove from want to read list!"
                                            style={{ "backgroundColor": "green" }}
                                            onClick={() => {
                                                clickedWant(modalBook);
                                            }}><FontAwesomeIcon
                                                icon={faBookBookmark}
                                                className='fa-2x' /></button>
                                        : modalBook.read ?
                                            <FontAwesomeIcon
                                                icon={faBookBookmark}
                                                className='fa-2x' />
                                            :
                                            <button
                                                data-tooltip-id="myTip"
                                                data-tooltip-content="Add to want to read list!"
                                                style={{ "backgroundColor": "revert" }}
                                                onClick={() => {
                                                    clickedWant(modalBook);
                                                }}><FontAwesomeIcon
                                                    icon={faBook}
                                                    className='fa-2x' /></button>
                                    }
                                    </tr>

                                    <tr>

                                        <span className="close2"
                                            onClick={() => {
                                                closeModal();
                                            }}>&times;</span>
                                    </tr>
                                </td>
                            </tr>
                            // component for adding to read, and adding to want to read
                        )
                            :
                            <tr>
                                <td><p>Modal Content</p></td>
                                <td><span
                                    className="close"
                                    onClick={() => {
                                        closeModal();
                                    }}>&times;</span></td>
                            </tr>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Modal;
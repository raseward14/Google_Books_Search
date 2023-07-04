import React, { useState, useEffect } from "react";
import './style.css'
// CSS file for react tooltip
import 'react-tooltip/dist/react-tooltip.css'
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faSquareCheck, faBook, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

// api calls - read, want, and axiosPrivate
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import * as readAPIFunctions from '../../utils/ReadAPI';
import * as wantAPIFunctions from '../../utils/WantToReadAPI';
import { Tooltip as ReactTooltip } from "react-tooltip";

// receive the current index
const Modal = ({ state, callbackFunction, book, wantCount, readCount, reAddBook, removeBook }) => {
    // navbar count state variables
    const { auth } = useAuth();
    const [RCount, setRCount] = useState(null);
    const [WCount, setWCount] = useState(null);
    // axiosPrivate, userID, and accessToken for api calls
    const accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();
    // book state variable to handle button color changes onClick
    // this needs to be whatever the book prop is - going to set in a useEffect
    const [modalBook, setModalBook] = useState();

    const myModal = document.getElementById("myModal");

    // DELETE read -> use db query to GET by isbn13 before deleting
    async function deleteFromRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        let result = await readAPIFunctions.getReadByIsbn13(axiosPrivate, thisIsbn13, accessToken, userID);
        let readResult = result.data;
        readAPIFunctions.deleteRead(axiosPrivate, readResult[0]._id, accessToken);
        let rCount = await (RCount - 1);
        setRCount(rCount);
    };
    // POST read
    async function addToRead(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        console.log('made it here')
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
        let rCount = await (RCount + 1);
        setRCount(rCount);
    };
    // DELETE want -> uses db query to GET by isbn13 before deleting
    async function deleteFromWant(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13);
        let thisIsbn13 = isbn13Array[0].identifier;
        let result = await wantAPIFunctions.getWantToReadByIsbn13(axiosPrivate, thisIsbn13, accessToken, userID)
        let wantResult = result.data;
        console.log('want result:', wantResult.length)
        if (wantResult.length > 0) {
            wantAPIFunctions.deleteWantToRead(axiosPrivate, wantResult[0]._id, accessToken)
            let wCount = await (WCount - 1);
            setWCount(wCount)
        };
    };

    // POST want
    async function addToWant(book) {
        let isbn13Array = book.volumeInfo.industryIdentifiers.filter((isbn) => isbn.identifier.length === 13)
        let thisIsbn13 = isbn13Array[0].identifier

        await wantAPIFunctions.saveWantToRead(axiosPrivate, {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            imageLink: book.volumeInfo.imageLinks.thumbnail,
            subject: book.volumeInfo.categories[0],
            infoLink: book.volumeInfo.infoLink,
            inProgress: false,
            isbn13: thisIsbn13,
            user_id: userID
        }, accessToken)
        let wCount = await (WCount + 1);
        setWCount(wCount);
    };

    // flip .read, if true post to read, if false, delete all matching titles from read, will need to set a book state variable - ternary operator will handle the button change
    function clickedRead(clickedBook) {
        if (clickedBook.read === true) {
            // we need to add this book back to the suggestions array using its index - callback function - addBackToSuggestions
            reAddBook(clickedBook);
            clickedBook.read = false;
            setModalBook({ "read": false });
            deleteFromRead(clickedBook);
        } else if (clickedBook.want === false) {
            // we need to remove this book from the suggestions array using its index - callback function - removeFromSuggestions
            removeBook(clickedBook);
            clickedBook.read = true;
            setModalBook({ "read": true });
            addToRead(clickedBook);
        } else {
            clickedBook.read = true;
            // we need to remove this book from the suggestions array using its index - callback - removeFromSuggestions
            removeBook(clickedBook);
            clickedBook.want = false;
            setModalBook({
                "read": true,
                "want": false
            })
            addToRead(clickedBook);
            deleteFromWant(clickedBook);
        };
    };

    // flip .want
    function clickedWant(clickedBook) {
        if (clickedBook.want) {
            // we need to re-add this book to the suggestions array using its index - callback - addToSuggestions
            reAddBook(clickedBook);
            clickedBook.want = false;
            console.log('want is: ', clickedBook.want)
            setModalBook({ "want": false });
            deleteFromWant(clickedBook)
        } else {
            // we need to remove from the suggestions array using its index - callback - removeFromSuggestions
            removeBook(clickedBook);
            clickedBook.want = true;
            console.log('want is: ', clickedBook.want)
            setModalBook({ "want": true });
            addToWant(clickedBook)
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
        readCount(RCount);
    }, [RCount]);

    useEffect(() => {
        wantCount(WCount)
    }, [WCount]);

    useEffect(async () => {
        if (auth?.user) {
            let accessToken = await sessionStorage.getItem('accessToken');
            let userID = await sessionStorage.getItem('userID');

            const APIWant = await wantAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
            let wCount = APIWant.data.length;
            setWCount(wCount);

            const APIRead = await readAPIFunctions.getRead(axiosPrivate, accessToken, userID);
            let rCount = APIRead.data.length;
            setRCount(rCount);
        }
    });

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
            <table className="book-modal-content">
                <tbody>
                    <tr>
                        {modalBook ? (
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="recommended-box book-card">
                                            <p style={{ color: "white" }}>{book.volumeInfo.title}</p>
                                            <img src={book.volumeInfo?.imageLinks?.thumbnail} className="fade" />
                                        </td>
                                        <td className="modal-buttons-container" >
                                            <ReactTooltip id="myTip" />
                                            <tr className="modal-button">
                                                {modalBook.read === true ?
                                                    <FontAwesomeIcon
                                                        data-tooltip-id="myTip"
                                                        data-tooltip-content="Remove from your read books!"
                                                        style={{
                                                            color: "green",
                                                            width: "45px"
                                                        }}
                                                        onClick={() => {
                                                            clickedRead(modalBook);
                                                        }}
                                                        icon={icon({ name:"circle-check", style:"regular" })}
                                                        className='book-button' />
                                                    :
                                                    <FontAwesomeIcon
                                                        data-tooltip-id="myTip"
                                                        data-tooltip-content="Add to your read books!"
                                                        style={{
                                                            color: "revert",
                                                            width: "45px"
                                                        }}
                                                        onClick={() => {
                                                            clickedRead(modalBook);
                                                        }}
                                                        icon={icon({ name:"circle", style:"regular" })}
                                                        className='book-button' />
                                                }
                                            </tr>

                                            <tr className="modal-button">{modalBook.want === true ?
                                                <FontAwesomeIcon
                                                    data-tooltip-id="myTip"
                                                    data-tooltip-content="Remove from want to read list!"
                                                    style={{
                                                        color: "green",
                                                        width: "45px"
                                                    }}
                                                    onClick={() => {
                                                        clickedWant(modalBook);
                                                    }}
                                                    icon={icon({ name: "book-bookmark" })}
                                                    className='book-button' />
                                                : modalBook.read ?
                                                    <FontAwesomeIcon
                                                        icon={icon({ name: "book" })}
                                                        className='book-button' 
                                                        style={{
                                                            color: "revert",
                                                            width: "45px"
                                                        }}
                                                        />
                                                    :
                                                    <FontAwesomeIcon
                                                        data-tooltip-id="myTip"
                                                        data-tooltip-content="Add to want to read list!"
                                                        style={{
                                                            color: "revert",
                                                            width: "45px"
                                                        }}
                                                        onClick={() => {
                                                            clickedWant(modalBook);
                                                        }}
                                                        icon={icon({ name: "book" })}
                                                        className='book-button' />
                                            }
                                            </tr>

                                            <tr className="modal-button">
                                                <ReactTooltip id="closeBookTip" />
                                                <span
                                                    data-tooltip-id="closeBookTip"
                                                    data-tooltip-content="close"
                                                    className="book-modal-close"
                                                    onClick={() => {
                                                        closeModal();
                                                    }}>&times;</span>
                                            </tr>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            // component for adding to read, and adding to want to read
                        )
                            :
                            <table>
                                <tbody>
                                    <tr>
                                        <td><p>Modal Content</p></td>
                                        <td
                                            data-tooltip-id="closeBookTip"
                                            data-tooltip-content="close"
                                        >
                                            <span
                                                className="close"
                                                onClick={() => {
                                                    closeModal();
                                                }}>&times;</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Modal;
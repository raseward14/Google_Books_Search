import React, { useEffect } from "react";
import './style.css'

const Modal = ({ state, callbackFunction, book }) => {
    const myModal = document.getElementById("myModal");

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
        if (state !== null) {
            console.log(book)
            toggleModal(state)
        };
    }, [state]);

    return (
        <div id="myModal" className="modal">
            <table className="modal-content">
                <tbody>
                    <tr>
                        {book ? (
                            <tr>
                                <td className="button recommended-box book-card">
                                    <p style={{ color: "white" }}>{book.volumeInfo.title}</p>
                                    <img src={book.volumeInfo?.imageLinks?.thumbnail} className="fade" />
                                </td>
                                <td className="button"><span
                                    onClick={() => {
                                        closeModal();
                                    }}>&times;</span></td>
                            </tr>
                        )
                            :
                            <tr>
                                <td><p>Modal Content</p></td>
                                <td><span
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
import React, { useState, useEffect } from "react";

const Modal = ({ clickedBook, index }) => {

    const myModal = document.getElementById("myModal");

    const toggleModal = async (clickedBook) => {
        if(clickedBook.modal) {
            myModal.style.display = 'block';
        } else {
            myModal.style.display = 'none';
        };
    };

    return (
        <div>
            <table>
                <tr id="myModal">
                    <td><p>Modal Content</p></td>
                </tr>
            </table>
        </div>
    );
};

export default Modal;
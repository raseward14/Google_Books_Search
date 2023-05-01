import React, { useState, useEffect } from "react";
const Modal = ({ state }) => {

    const [modalState, setModalState] = useState(false);
    const modal = document.getElementbyID('myModal');

    const toggleModal = () => {
        if(modalState) {
            modal.style.display = 'block'
        } else {
            modal.style.display = 'none'
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
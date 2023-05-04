import React, { useState, useEffect } from "react";
import './style.css'

const Modal = ({ modalState, updateState }) => {

    const [thisModalState, setThisModalState] = useState(false);
    const myModal = document.getElementById("myModal");

    const closeModal = () => {
        myModal.style.display = 'none';
    };

    const toggleModal = async (state) => {
        if (state && myModal !== null) {
            myModal.style.display = 'block';
        } else if (myModal !== null) {
            myModal.style.display = 'none';
        } else {
            return;
        };
    };

    useEffect(() => {
        console.log('test', thisModalState);
        updateState(thisModalState);
    }, [thisModalState]);

    useEffect(() => {
        if(modalState !== null) {
            toggleModal(modalState)
        };
    }, [modalState]);

    return (
        <div id="myModal" className="modal">
            <table className="modal-content">
                <tbody>
                    <tr>
                        <td><p>Modal Content</p></td>
                        <td><span
                            onClick={() => {
                                // setThisModalState(false);
                                closeModal();
                                console.log('clicked the x')
                            }}>&times;</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Modal;
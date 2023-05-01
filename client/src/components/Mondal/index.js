import React, { useState, useEffect } from "react";
import './style.css'

const Modal = ({ modalState }) => {

    const [thisModalState, setThisModalState] = useState(false);
    const myModal = document.getElementById("myModal");

    const toggleModal = async (state) => {
        if (state) {
            myModal.style.display = 'block';
        } else {
            myModal.style.display = 'none';
        };
    };

    useEffect(() => {
        console.log('test', thisModalState)
        modalState(thisModalState)
    }, [thisModalState])

    useEffect(() => {
        toggleModal(modalState)
    }, [modalState])

    return (
        <div id="myModal" className="modal2">
            <table className="modal-content2">
                <tobdy>
                    <tr>
                        <td><p>Modal Content</p></td>
                        <td><span
                            onClick={() => {
                                setThisModalState(false);
                            }}>&times;</span></td>
                    </tr>
                </tobdy>
            </table>
        </div>
    );
};

export default Modal;
import React, { useState, useEffect } from "react";
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'


import './style.css';


const Dropdown = ({ datesRead, index }) => {
    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const [itemIndex, setItemIndex] = useState();

    const flipArrow = () => {
        if (arrow) {
            console.log(itemIndex)
            document.getElementById(`${itemIndex}`).classList.toggle("show-dates")
            setArrow(false);
        } else {
            console.log(itemIndex)
            document.getElementById(`${itemIndex}`).classList.toggle("show-dates")
            setArrow(true)
        }
    }

    const removeDate = async (date) => {
        let newArr = await datesReadArray.filter(originalDate => {
            return originalDate !== date
        })
        setDatesReadArray(newArr);
    }

    useEffect(() => {
        if (index !== undefined) {
            setItemIndex(index)
        }
    });

    useEffect(() => {
        if (datesRead !== undefined) {
            let dateArray = datesRead[0].split(', ');
            setDatesReadArray(dateArray);
        }
    }, [itemIndex])

    return (
        <div className="flatpickr-container">
            {arrow ?
                <div className="date-dropdown">
                    <button
                        className="date-arrow"
                        onClick={() => {
                            flipArrow();
                        }}>Dates Read
                        <i className="arrow up date-arrow" />
                    </button>
                    <div id={`${itemIndex}`} className='date-dropdown-content'>
                        {datesReadArray.map((date) => (
                            <div key={date[index]}>{date}
                                <FontAwesomeIcon
                                    className="remove-date-icon"
                                    onClick={() => {
                                        removeDate(date)
                                    }}
                                    icon={icon({ name: "rectangle-xmark", style: "regular" })} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div>
                    <button
                        className="date-arrow"
                        onClick={() => {
                            flipArrow();
                        }}>Dates Read
                        <i className="arrow down date-arrow" />
                    </button>
                    <div id={`${itemIndex}`}></div>
                </div>
            }
        </div>
    );
};

export default Dropdown;
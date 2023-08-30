import React, { useState, useEffect } from "react";
import './style.css';


const Dropdown = (datesRead, index) => {
    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const dropdownParent = document.getElementById(`${index}`);

    // const createDropdownElements = (array) => {
    //     Object.keys(array).forEach(date => {
    //         let dateString = JSON.stringify(date)
    //         let dateDiv = document.createElement('div');
    //         dateDiv.textContent(dateString);
    //         dropdownParent.append(dateDiv);
    //     })
    // }

    const flipArrow = () => {
        if (arrow) {
            setArrow(false);
        } else {
            setArrow(true)
        }
    }

    // useEffect(() => {
    //     if(datesReadArray !== undefined) {
    //         createDropdownElements(datesReadArray)
    //     }
    // }, [datesReadArray]);

    // useEffect(() => {
    //     setDatesReadArray(datesRead);
    // });

    useEffect(() => {
        if(datesRead !== undefined) {
            setDatesReadArray(datesRead)
            // console.log('existing dates read: ', Object.keys(datesReadArray))
        }
    })

    return (
        <div className="flatpickr-container">
            {arrow ?
            <>
                <button
                    className="date-arrow"
                    onClick={() => {
                        flipArrow();
                    }}>Dates Read
                    <i className="arrow up date-arrow" />
                </button>
                <div id={`${index}`}>
                    <div>date1</div>
                    <div>date2</div>
                    <div>date3</div>
                </div>
            </>
                :
                <button
                    className="date-arrow"
                    onClick={() => {
                        flipArrow();
                    }}>Dates Read
                    <i className="arrow down date-arrow" />
                </button>
            }
        </div>
    );
};

export default Dropdown;
import React, { useState, useEffect, useRef } from "react";

import * as readAPIFunctions from '../../utils/ReadAPI';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

// import flatpickr.js
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css"


import './style.css';

const Dropdown = ({ datesRead, index, id }) => {
    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const [itemIndex, setItemIndex] = useState();

    const axiosPrivate = useAxiosPrivate();
    let accessToken = sessionStorage.getItem('accessToken');

    // datepicker useRef
    const fp = useRef(null);


    async function setDatePicker(selectedDates, dateStr, instance, id) {
        console.log(selectedDates, dateStr, instance, id)
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: instance.element.value
        }, accessToken)
    };

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
    };

    const updateDatesRead = async (newDateString) => {
        // api call to update the dates read value in db
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: newDateString
        }, accessToken)
        console.log(newDateString)
    }

    const removeDate = async (date) => {
        console.log(datesReadArray)
        let newArr = await datesReadArray.filter(originalDate => {
            return originalDate !== date
        })
        // need to update the dates read in the db
        let newDateString = newArr.join(', ');
        updateDatesRead(newDateString);
        console.log(newArr);
        setDatesReadArray(newArr);
    };

    const updateDropdown = async (dateString) => {
        let newArr = [];
        newArr.push(dateString);
        let finalArray = await newArr[0].split(', ');
        setDatesReadArray(finalArray);
    };

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


            <div className="date-picker">
                <Flatpickr
                    placeholder="Calendar"
                    className='dates-read'
                    options={{
                        mode: "multiple",
                        dateFormat: "Y-m-d",
                        defaultDate: JSON.stringify(datesRead)
                    }}
                    ref={fp}
                    onChange={(selectedDates, dateStr, instance) => {
                        setDatePicker(selectedDates, dateStr, instance, id);
                        console.log(index)
                        updateDropdown(dateStr);
                    }} >
                </Flatpickr>
            </div>
        </div>
    );
};

export default Dropdown;
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
import flatpickr from "flatpickr";

// tooltip
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip as ReactTooltip } from "react-tooltip";

import './style.css';

const Dropdown = ({ datesRead, index, id, callback }) => {

    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const [itemIndex, setItemIndex] = useState();
    const [ID, setID] = useState();

    const axiosPrivate = useAxiosPrivate();
    let accessToken = sessionStorage.getItem('accessToken');

    // datepicker useRef
    const fp = useRef(null);

    async function myFunction(selectedDates, dateStr, instance) {
        // if ((selectedDates !== undefined) && (dateStr !== undefined) && (instance !== undefined)) {
        updateDatesRead(instance.element.value)
        updateDropdown(dateStr);
        console.log(itemIndex, selectedDates, dateStr, instance, id)
        console.log('made it here');
        // } else {
        // console.log('no dates read for this book yet')
        // }
    }


    const flipArrow = () => {
        if (arrow) {
            // document.getElementById(`${itemIndex}-${ID}`).classList.toggle("show-dates");
            setArrow(false);
            console.log(itemIndex, arrow)
        } else {
            // document.getElementById(`${itemIndex}-${ID}`).classList.toggle("show-dates");
            setArrow(true);
            console.log(itemIndex, arrow)
        }
    };

    const updateDatesRead = async (newDateString) => {
        // api call to update the dates read value in db
        console.log(newDateString)
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: newDateString
        }, accessToken)
    }


    const removeDate = async (date) => {
        console.log(date)
        let newArr = await datesReadArray.filter(originalDate => {
            return originalDate !== date;
        })

        // sets the state of the dates read for this book- updates the dropdowns 
        setDatesReadArray(newArr);

        // need to update the dates read in the db 
        let newDateString = newArr.join(', ');
        updateDatesRead(newDateString);

        // this removes the dropdown date from the flatpickr as well, in case its open
        let newArrayOfDates = await newArr.map((date) => new Date(`${date}`));
        console.log(newArrayOfDates)

        // this is the mistake
        // const fp = flatpickr(`#f-${itemIndex}`, {
        //     mode: "multiple",
        // })
        // fp.setDate(newArrayOfDates);
        // and here's how I fixed it
        const fp = document.querySelector(`#f-${itemIndex}`)._flatpickr;
        fp.setDate(newArrayOfDates);

    };

    const updateDropdown = async (dateString) => {
        console.log(dateString)
        let newArr = [];
        newArr.push(dateString);
        let finalArray = await newArr[0].split(', ');
        console.log(finalArray);
        setDatesReadArray(finalArray);
    };

    useEffect(() => {
        if (id !== undefined) {
            setID(id);
        }
    }, [id])

    useEffect(() => {
        console.log('this is the format I need:', datesRead)
    }, [datesRead])

    useEffect(() => {
        if (index !== undefined) {
            setItemIndex(index)
        }
    }, [index]);

    useEffect(() => {
        if (datesRead !== undefined) {
            let arrayINeed = Object.values(datesRead);
            let arrayINeedString = arrayINeed[0];
            if (arrayINeedString !== undefined) {
                let newArray = arrayINeedString.split(', ');
                setDatesReadArray(newArray)
            }
        }
    }, [itemIndex])

    return (
        <div className="flatpickr-container">
            <ReactTooltip id="flatTip" />

            {arrow ?
                <div className="date-dropdown">
                    <button
                        className="date-arrow"
                        onClick={() => {
                            console.log(`arrow: ${arrow} clicked`)
                            flipArrow();
                        }}>Dates Read
                        <i className="arrow up date-arrow" />
                    </button>
                    <div id={`${itemIndex}-${ID}`} className='date-dropdown-content'>
                        {datesReadArray.map((date, i) => (
                            <div key={i}>{date}
                                <FontAwesomeIcon
                                    className="remove-date-icon"
                                    onClick={() => {
                                        removeDate(date)
                                        console.log(date, index)
                                    }}
                                    icon={icon({ name: "rectangle-xmark", style: "regular" })} />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="date-dropdown">
                    <button
                        className="date-arrow"
                        onClick={() => {
                            console.log(`arrow: ${arrow} clicked`)
                            flipArrow();
                        }}>Dates Read
                        <i className="arrow down date-arrow" />
                    </button>
                    <div id={`${itemIndex}-${ID}`}></div>
                </div>
            }


            <div className="date-picker">
                <Flatpickr
                    id={`f-${itemIndex}`}
                    data-tooltip-id="flatTip"
                    data-tooltip-content="Open date picker!"
                    placeholder="Calendar"
                    className='dates-read'
                    options={{
                        mode: "multiple",
                        dateFormat: "M-d-Y",
                        defaultDate: JSON.stringify(datesRead)
                    }}
                    ref={fp}
                    // the flatpickr is undefined the second time
                    onChange={(selectedDates, dateStr, instance) => {
                        // updateDatesRead(instance.element.value)
                        // updateDropdown(dateStr);
                        // console.log(itemIndex, selectedDates)


                        if ((selectedDates !== undefined) && (dateStr !== undefined) && (instance !== undefined)) {
                            myFunction(selectedDates, dateStr, instance);
                        } else {
                            console.log(`flatpickr has undefined values`)
                        }
                    }}
                >
                </Flatpickr>
            </div>
        </div>
    );
};

export default Dropdown;
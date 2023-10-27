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

const Dropdown = ({ datesRead, index, id, callbackFunction }) => {

    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const [itemIndex, setItemIndex] = useState();

    const axiosPrivate = useAxiosPrivate();
    let accessToken = sessionStorage.getItem('accessToken');

    // datepicker useRef
    const fp = useRef(null);

    async function myFunction(selectedDates, dateStr, instance) {
        updateDatesRead(instance.element.value)
        updateDropdown(dateStr);
        console.log(itemIndex, selectedDates, dateStr, instance, id)
        console.log('made it here')
    }


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
        console.log(newDateString)
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: newDateString
        }, accessToken)
    }


    const removeDate = async (date, index) => {
        console.log(datesReadArray, date, itemIndex)
        let newArr = await datesReadArray.filter(originalDate => {
            return originalDate !== date
        })

        // sets the state of the dates read for this book - has nothing to do with the error
        console.log(newArr)
        setDatesReadArray(newArr);
        // need to update the dates read in the db - has nothing to do with the error
        let newDateString = newArr.join(', ');
        console.log([newDateString])
        updateDatesRead(newDateString);



        // this removes the dropdown date from the flatpickr as well, in case its open
        // the flatpickr becomes undefined for some reason
        let newArrayOfDates = await newArr.map((date) => new Date(`${date}`));
        console.log(newArrayOfDates)


        // this is where the error occurs - the second time I update the date pickr- same problem
        // f-itemIndex is undefined - seems I am trying to access a DOM element that does not exist for some reason
        // const fp = flatpickr(`#f-${itemIndex}`, {
        //         mode: "multiple",
        //         // dateFormat: "M-d-Y",
        //     })
        // fp.setDate(newArrayOfDates)


        const fp = flatpickr(`#f-${index}`, {
            mode: "multiple",
        })
        fp.setDate(newArrayOfDates)


        // this is where the error occurs - the second time I update the date pickr
        // flatpickr(`#f-${itemIndex}`
        // , {
        // options: {
        //     mode: "multiple",
        // dateFormat: "M-d-Y",
        // defaultDate: JSON.stringify(datesRead)
        // }
        // works once
        // }).setDate(newArrayOfDates);
        // }
        // the error occurs the second time I update the date picker, from the dropdown component
        // ).setDate(newArrayOfDates);

    };

    const updateDropdown = async (dateString) => {
        console.log(dateString)
        let newArr = [];
        newArr.push(dateString);
        let finalArray = await newArr[0].split(', ');
        setDatesReadArray(finalArray);
    };

    useEffect(() => {
        console.log('this is the format I need:', datesRead)
    }, [datesRead])

    useEffect(() => {
        if (index !== undefined) {
            setItemIndex(index)
        }
    });

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
                            flipArrow();
                        }}>Dates Read
                        <i className="arrow up date-arrow" />
                    </button>
                    <div id={`${itemIndex}`} className='date-dropdown-content'>
                        {datesReadArray.map((date) => (
                            <div>{date}
                                <FontAwesomeIcon
                                    className="remove-date-icon"
                                    onClick={() => {
                                        removeDate(date, index)
                                        console.log(index)
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
                        myFunction(selectedDates, dateStr, instance);
                    }}
                >
                </Flatpickr>
            </div>
        </div>
    );
};

export default Dropdown;
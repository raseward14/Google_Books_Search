import React, { useState, useEffect } from "react";

import * as readAPIFunctions from '../../utils/ReadAPI';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import './style.css';

const Dropdown = ({ datesRead, index, id, dateString, arrayOfDatesRead, theIndexClicked }) => {
    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const [itemIndex, setItemIndex] = useState();
    const [clickedItem, setClickedItem] = useState();

    const [arrayOfArrays, setArrayOfArrays] = useState([])
    let array = [];

    const axiosPrivate = useAxiosPrivate();
    let accessToken = sessionStorage.getItem('accessToken');


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

    const updateDatesRead = async (newDateString) => {
        // api call to update the dates read value in db
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: newDateString
        }, accessToken)
        console.log(newDateString)
    }

    const removeDate = async (date) => {
        let newArr = await datesReadArray.filter(originalDate => {
            return originalDate !== date
        })
        // need to update the dates read in the db
        let newDateString = newArr.join(', ');
        updateDatesRead(newDateString);
        setDatesReadArray(newArr);
    }

    const updateDateDropdowns = async () => {
        console.log()
    };

    // useEffect(() => {
    //     if(theIndexClicked !== undefined) {
    //         setClickedItem(theIndexClicked);
    //         console.log('the clicked index', theIndexClicked)
    //         // let updatedArrayOfArrays = [...arrayOfArrays];
    //         let updatedArrayOfArrays = [...arrayOfDatesRead];
    //         console.log(updatedArrayOfArrays)
    //         let stringToArray = dateString.split(", ")
    //         updatedArrayOfArrays[theIndexClicked] = stringToArray;
    //         console.log(updatedArrayOfArrays);
    //         // setDatesReadArray(updatedArrayOfArrays);
    //     }
    // }, [theIndexClicked]);

    useEffect(() => {
        console.log(arrayOfDatesRead)
        setArrayOfArrays(arrayOfDatesRead)
    }, [arrayOfDatesRead])

    useEffect(async () => {
        if(dateString !== null) {
            console.log(`dropdown component has dateStr ${dateString}`)
            let newArr = [];
            newArr.push(dateString);
            let finalArray = newArr[0].split(', ');
            console.log(finalArray);

            // updatedArrayOfArrays[clickedItem] = finalArray;
            // setArrayOfArrays(updatedArrayOfArrays);
            // setDatesReadArray(updatedArrayOfArrays)
            // this is the final array, but how do I only update a single row
            // a single useState variable is being used by all of the books
            // setDatesReadArray(finalArray)
        }
    }, [dateString]);



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
                        {/* {arrayOfArrays.forEach((array) => {
                            console.log(array);
                            let newArr = array.split(", ")
                            await newArr.map((date) => {
                                <div key={date[index]}>{date}
                                <FontAwesomeIcon
                                    className="remove-date-icon"
                                    onClick={() => {
                                        removeDate(date)
                                    }}
                                    icon={icon({ name: "rectangle-xmark", style: "regular" })} />
                            </div>

                              })
                        })} */}
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
import React, { useState, useEffect, useRef } from "react";

import * as readAPIFunctions from '../../utils/ReadAPI';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import './style.css';

const Dropdown = ({ datesRead, index, id, dateString, theIndexClicked }) => {
    const [arrow, setArrow] = useState(false);
    const [datesReadArray, setDatesReadArray] = useState();
    const [itemIndex, setItemIndex] = useState();
    const [state1, setState1] = useState();
    const [state2, setState2] = useState();

    const fpIndex = useRef(null);


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
        console.log(datesReadArray)
        let newArr = await datesReadArray.filter(originalDate => {
            return originalDate !== date
        })
        // need to update the dates read in the db
        let newDateString = newArr.join(', ');
        updateDatesRead(newDateString);
        console.log(newArr);
        setDatesReadArray(newArr);
    }


    // useEffect(() => {
    //     if(theIndexClicked !== undefined) {
    //         console.log(clickedItem)
    //         setClickedItem(theIndexClicked)
    //         console.log(theIndexClicked)
    //     }
    // }, [theIndexClicked]);


    // useEffect(async () => {
    //     if(dateString !== null) {
    //         // console.log(`dropdown component has dateStr ${dateString}`)
    //         let newArr = [];
    //         newArr.push(dateString);
    //         let finalArray = newArr[0].split(', ');
    //         console.log(finalArray);
    //         console.log(index, clickedItem);
    //         if(index === clickedItem) {
    //             setDatesReadArray(finalArray);
    //         }

    //     }
    // }, [dateString, clickedItem]);

    // const testFunction = async (clickedIndex, dateString) => {
    //     if((clickedIndex !== undefined) && (index === clickedIndex)) {
    //         console.log(index, clickedIndex, dateString)
    //         let newArr = [];
    //         newArr.push(dateString);
    //         let finalArray = newArr[0].split(', ');
    //         console.log(finalArray);
    //         setDatesReadArray(finalArray);
    //     }
    // }

    const testFunction = async (clickedIndex, dateString) => {
        if((clickedIndex !== undefined) && (itemIndex === clickedIndex)) {
            console.log(itemIndex, clickedIndex, dateString)
            // let newArr = [];
            // newArr.push(dateString);
            // let finalArray = newArr[0].split(', ');
            // console.log(finalArray);
            // setDatesReadArray(finalArray);
            // fpIndex.current = null;
            // console.log(fpIndex.current)
        }
    }


    useEffect(() => {
        // we need to above function to only run when 
        fpIndex.current = theIndexClicked
        console.log(theIndexClicked)
        // one of them changes first, and this causes the above condition to be satisfied before the index has a chance to change
        testFunction(fpIndex.current, dateString)
    }, [theIndexClicked, dateString])


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
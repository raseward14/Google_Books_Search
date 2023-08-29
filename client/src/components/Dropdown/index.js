import React, { useState, useRef } from "react";
import './style.css';
import * as readAPIFunctions from '../../utils/ReadAPI';

// import flatpickr.js
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css"
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Dropdown = (book, index) => {
    const [arrow, setArrow] = useState(false);

    let accessToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const axiosPrivate = useAxiosPrivate();
    const fp = useRef(null);

    const sharedOptions = {
        mode: "multiple",
        dateFormat: "Y-m-d"
    }

    const datePicker = document.getElementsByClassName('flatpickr-calendar');

    async function showDatePicker(selectedDates, dateStr, instance, id) {
        // if (datePicker) {
        //     setDatePicker(false);
        // } else {
        //     setDatePicker(true);
        // }
    
        // const fp = Flatpickr(`my-date-picker-${index}`, {
        //     mode: "multiple",
        //     dateFormat: "Y-m-d"
        // })
        // const fp = useRef(null);

        console.log('here', selectedDates, dateStr, instance);
        let dateArray = dateStr.split(',')
        let datesRead = [];
        datesRead.push(dateStr);
        await dateArray.forEach(date => { 
            let newDate = date.trim();
            datesRead.push(newDate);
        });
        console.log(datesRead);
        await readAPIFunctions.updateRead(axiosPrivate, id, {
            datesRead: datesRead
        }, accessToken)
        datesRead = [];
    }
    


    const flipArrow = (index) => {
        if (arrow) {
            setArrow(false);
        } else {
            setArrow(true)
        }
    }

    return (
        <div className="flatpickr-container">
            <Flatpickr
                placeholder="Dates Read"
                className='dates-read'
                options={sharedOptions}
                ref={fp}
                onChange={(selectedDates, dateStr, instance, index) => {
                    let id = book._id
                    showDatePicker(selectedDates, dateStr, instance, id)
                }} />
            {arrow ?
                <button
                    className="date-arrow"
                    onClick={(index) => {
                        flipArrow(index);
                    }}>
                    <i className="arrow up date-arrow" />
                </button>
                :
                <button
                    className="date-arrow"
                    onClick={() => {
                        flipArrow();
                    }}>
                    <i className="arrow down date-arrow" />
                </button>
            }
        </div>
    );
};

export default Dropdown;
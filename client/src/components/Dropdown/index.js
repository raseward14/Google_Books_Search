import React, { useState } from "react";
import './style.css';


const Dropdown = () => {
    const [arrow, setArrow] = useState(false);

    const flipArrow = (index) => {
        if (arrow) {
            setArrow(false);
        } else {
            setArrow(true)
        }
    }

    return (
        <div className="flatpickr-container">
            {arrow ?
                <button
                    className="date-arrow"
                    onClick={(index) => {
                        flipArrow(index);
                    }}>Dates Read
                    <i className="arrow up date-arrow" />
                </button>
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
import React, { useState } from "react";
import './style.css';

const Dropdown = () => {
    const [arrow, setArrow] = useState(false);

    const flipArrow = () => {
        if (arrow) {
            setArrow(false);
        } else {
            setArrow(true)
        }
    }

    return (
        <div>
            {arrow ?
                <button
                    className="date-arrow"
                    onClick={() => {
                        flipArrow();
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
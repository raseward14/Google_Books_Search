import React, { useState } from "react";

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
                    onClick={() => {
                        flipArrow();
                    }}>
                    <i className="arrow up" />
                </button>
                :
                <button
                    onClick={() => {
                        flipArrow();
                    }}>
                    <i className="arrow down" />
                </button>
            }
        </div>
    );
};

export default Dropdown;
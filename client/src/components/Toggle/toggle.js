import React, { useState, useEffect } from 'react';
import './style.css';

const Toggle = ({ toggle }) => {
    const [genToggle, setGenToggle] = useState(false);

    const handleClick = async () => {
        if (genToggle) {
            setGenToggle(false);
        } else {
            setGenToggle(true);
        };
    };

    useEffect(() => {
        toggle(genToggle)
    }, [genToggle])

    return (
        <div>
            <label className="switch">
                <input
                    type="checkbox"
                    onClick={handleClick}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}
export default Toggle;
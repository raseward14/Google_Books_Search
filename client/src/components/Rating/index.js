import React, { useState, useEffect } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import './style.css'

const Rating = ({ rating, updateRating, index }) => {
    // will need a state variable for a books rating
    // this will take in a book and an index, and depending on the book.rating value, render a different number of stars
    async function rateBook(value, index) {
        updateRating(value, index)
    };

    // useEffect will be called on load to retrieve the books rating, by its id, and then set the state of the var
    useEffect(() => {
        console.log(`the component received this rating: ${rating}`)
    }, [])

    return (
        <>
            {/* it will have to be a button container that is only clickable, and calls the onclick function on a fontAwesome icon, so the hover state will only apply to the icons themselves, and the onclick will only be in the icons */}
            {/* the value will apply to the button itself, and be determined by the book.rating */}
            <div>
                {rating === 5 ?
                    <div className="rating">
                        <FontAwesomeIcon
                            className="rating-star-selected"
                            icon={icon({ name: "star" })}
                            onClick={() => {
                                rateBook(4, index)
                            }} />
                        <FontAwesomeIcon
                            className="rating-star-selected"
                            icon={icon({ name: "star" })}
                            onClick={() => {
                                rateBook(4, index)
                            }} />
                        <FontAwesomeIcon
                            className="rating-star-selected"
                            icon={icon({ name: "star" })}
                            onClick={() => {
                                rateBook(3, index)
                            }} />
                        <FontAwesomeIcon
                            className="rating-star-selected"
                            icon={icon({ name: "star" })}
                            onClick={() => {
                                rateBook(2, index)
                            }} />
                        <FontAwesomeIcon
                            className="rating-star-selected"
                            icon={icon({ name: "star" })}
                            onClick={() => {
                                rateBook(1, index)
                            }} />
                    </div>
                    : rating === 4 ?
                    <div className="rating">
                            <FontAwesomeIcon
                                className="rating-star"
                                icon={icon({ name: "star" })}
                                onClick={() => {
                                    rateBook(5, index)
                                }} />
                                        <FontAwesomeIcon
                                            className="rating-star-selected"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(3, index)
                                            }} />
                                    <FontAwesomeIcon
                                        className="rating-star-selected"
                                        icon={icon({ name: "star" })}
                                        onClick={() => {
                                            rateBook(3, index)
                                        }} />
                                <FontAwesomeIcon
                                    className="rating-star-selected"
                                    icon={icon({ name: "star" })}
                                    onClick={() => {
                                        rateBook(2, index)
                                    }} />
                            <FontAwesomeIcon
                                className="rating-star-selected"
                                icon={icon({ name: "star" })}
                                onClick={() => {
                                    rateBook(1, index)
                                }} />
                        </div>
                        : rating === 3 ?
                            <div className="rating">
                                <FontAwesomeIcon
                                    className="rating-star"
                                    icon={icon({ name: "star" })}
                                    onClick={() => {
                                        rateBook(5, index)
                                    }} />
                                <FontAwesomeIcon
                                    className="rating-star"
                                    icon={icon({ name: "star" })}
                                    onClick={() => {
                                        rateBook(4, index)
                                    }} />
                                <FontAwesomeIcon
                                    className="rating-star-selected"
                                    icon={icon({ name: "star" })}
                                    onClick={() => {
                                        rateBook(2, index)
                                    }} />
                                <FontAwesomeIcon
                                    className="rating-star-selected"
                                    icon={icon({ name: "star" })}
                                    onClick={() => {
                                        rateBook(2, index)
                                    }} />
                                <FontAwesomeIcon
                                    className="rating-star-selected"
                                    icon={icon({ name: "star" })}
                                    onClick={() => {
                                        rateBook(1, index)
                                    }} />
                            </div>
                            : rating === 2 ?
                                <div className="rating">
                                    <FontAwesomeIcon
                                        className="rating-star"
                                        icon={icon({ name: "star" })}
                                        onClick={() => {
                                            rateBook(5, index)
                                        }} />
                                    <FontAwesomeIcon
                                        className="rating-star"
                                        icon={icon({ name: "star" })}
                                        onClick={() => {
                                            rateBook(4, index)
                                        }} />
                                    <FontAwesomeIcon
                                        className="rating-star"
                                        icon={icon({ name: "star" })}
                                        onClick={() => {
                                            rateBook(3, index)
                                        }} />
                                    <FontAwesomeIcon
                                        className="rating-star-selected"
                                        icon={icon({ name: "star" })}
                                        onClick={() => {
                                            rateBook(1, index)
                                        }} />
                                    <FontAwesomeIcon
                                        className="rating-star-selected"
                                        icon={icon({ name: "star" })}
                                        onClick={() => {
                                            rateBook(1, index)
                                        }} />
                                </div>
                                : rating === 1 ?
                                    <div className="rating">
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(5, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(4, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(3, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(2, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star-selected"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(0, index)
                                            }} />

                                    </div>
                                    : <div className="rating">
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(5, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(4, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(3, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(2, index)
                                            }} />
                                        <FontAwesomeIcon
                                            className="rating-star"
                                            icon={icon({ name: "star" })}
                                            onClick={() => {
                                                rateBook(1, index)
                                            }} />
                                    </div>}
            </div>
        </>
    )
};
export default Rating;
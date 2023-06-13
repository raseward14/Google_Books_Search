import React, { useState, useEffect } from "react";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import * as readAPIFunctions from '../../utils/ReadAPI'
import './style.css'

const Rating = (book, index) => {
    // will need a state variable for a books rating
    // this will take in a book and an index, and depending on the book.rating value, render a different number of stars
    const accessToken = sessionStorage.getItem('accessToken');

    async function rateBook(book, index) {

    }

    // will always render 5, but will change the background color depending on the score
    // on click will call the updateRead function from readAPI
    // similarly to favorited being true or false, will need to render

    // useEffect will be called on load to retrieve the books rating, by its id, and then set the state of the var
    return (
        <>
            {/* it will have to be a button container that is only clickable, and calls the onclick function on a fontAwesome icon, so the hover state will only apply to the icons themselves, and the onclick will only be in the icons */}
            {/* the value will apply to the button itself, and be determined by the book.rating */}
            <div>
                {book.rating === 5 ?
                    <div>
                        <FontAwesomeIcon icon={icon({ name: "star" })} />
                        <FontAwesomeIcon icon={icon({ name: "star" })} />
                        <FontAwesomeIcon icon={icon({ name: "star" })} />
                        <FontAwesomeIcon icon={icon({ name: "star" })} />
                        <FontAwesomeIcon icon={icon({ name: "star" })} />
                    </div>
                    : book.rating === 4 ?
                        <div>
                            <FontAwesomeIcon icon={icon({ name: "star" })} />
                            <FontAwesomeIcon icon={icon({ name: "star" })} />
                            <FontAwesomeIcon icon={icon({ name: "star" })} />
                            <FontAwesomeIcon icon={icon({ name: "star" })} />
                            <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                        </div>
                        : book.rating === 3 ?
                            <div>
                                <FontAwesomeIcon icon={icon({ name: "star" })} />
                                <FontAwesomeIcon icon={icon({ name: "star" })} />
                                <FontAwesomeIcon icon={icon({ name: "star" })} />
                                <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                            </div>
                            : book.rating === 2 ?
                                <div>
                                    <FontAwesomeIcon icon={icon({ name: "star" })} />
                                    <FontAwesomeIcon icon={icon({ name: "star" })} />
                                    <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                    <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                    <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                </div>
                                : book.rating === 1 ?
                                    <div>
                                        <FontAwesomeIcon icon={icon({ name: "star" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />

                                    </div>
                                    : <div>
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                        <FontAwesomeIcon icon={icon({ name: "star", style: "regular" })} />
                                    </div>}
            </div>
        </>
    )
};
export default Rating;
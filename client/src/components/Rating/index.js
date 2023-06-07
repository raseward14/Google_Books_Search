import React, { useState, useEffect } from "react";
// fontawesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircle } from '@fortawesome/free-solid-svg-icons';
// import 'font-awesome/css/font-awesome.min.css';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import * as readAPIFunctions from '../../utils/ReadAPI'
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <button>
                {book.rating === 5 ?
                    <button>5</button>
                    :
                    book.rating === 4 ?
                        <button>4</button>
                        : book.rating === 3 ?
                            <button>3</button>
                            : book.rating === 2 ?
                                <button>2</button>
                                : book.rating === 1 ?
                                    <button>1</button>
                                    : <button>
                                        <FontAwesomeIcon icon={icon({name: "circle", style: "regular"})}/>
                                        <FontAwesomeIcon icon={icon({name: "circle", style: "regular"})}/>
                                        <FontAwesomeIcon icon={icon({name: "circle", style: "regular"})}/>
                                        <FontAwesomeIcon icon={icon({name: "circle", style: "regular"})}/>
                                        <FontAwesomeIcon icon={icon({name: "circle", style: "regular"})}/>
                                            </button>}
            </button>
        </>
    )
};
export default Rating;
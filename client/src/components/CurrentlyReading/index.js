import React, { useState, useEffect } from "react";
import './style.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import * as wantAPIFunctions from '../../utils/WantToReadAPI';


const CurrentlyReading = () => {
    const axiosPrivate = useAxiosPrivate();
    const accessToken = sessionStorage.getItem("accessToken");
    const userID = sessionStorage.getItem("userID");
    // state variable to contain whats currently being read
    const [inProgress, setInProgress] = useState([]);

    async function loadInProgress() {
        // GET want to read - needs: axiosPrivate, accessToken and userID
        // axiosPrivate -> import from api Folder
        // accessToken -> actually session storage
        // userID also session storage
        let ipAPI = await wantAPIFunctions.getWantToRead(axiosPrivate, accessToken, userID);
        let ipArray = ipAPI.data;
        let booksInProgress = ipArray.filter(book => book.inProgress);
        console.log(booksInProgress);
        setInProgress(booksInProgress);
    }

    useEffect(() => {
        console.log(inProgress)
    }, [inProgress])

    // on page load, query want to read, and only return
    useEffect(async () => {
        loadInProgress();
    }, []);

    return (
        <div>
            {inProgress.length > 0 ?
            <div>
                {inProgress.map((book, index) => (
                    <div 
                    className="button recommended-box book-card"
                    key={index}>
                        <p style={{ color: "white" }}>{book.title}</p>
                        <img src={book.imageLink} className="fade"></img>
                    </div>
                ))}
            </div>
            :
            <div>Mark books in progress on the <b>Want to Read</b> page to see which books are in progress here.</div>
            }
        </div>
    )
};
export default CurrentlyReading;
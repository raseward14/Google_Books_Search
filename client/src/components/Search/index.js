import React, { useState, useEffect } from "react";
import './style.css';
const Search = ({ bookArray }) => {
    const [search, setSearch] = useState('');
    const [arrow, setArrow] = useState(false);

    const filterBooks = async (array) => {
        const regex = new RegExp(search, 'i');
        console.log(array)
        const newArray = await array.filter(book => {
            let bookTitle = book.title.toLowerCase();
            return regex.test(bookTitle)
        })
        console.log('the filter has kept: ', newArray)
    }

    useEffect(() => {
        console.log('search received this array: ', bookArray)
    }, [bookArray])

    useEffect(() => {
        console.log('arrow is: ', arrow);
    }, [arrow]);

    useEffect(() => {
        console.log('search term: ', search);
        filterBooks(bookArray)
    }, [search]);

    return (
        <div>
            <button
            className="button-filter"
            >
                {arrow ?
                <i 
                class="arrow up"
                onClick={() => {
                    setArrow(false);
                }}
                ></i>
                :
                <i 
                onClick={() => {
                    setArrow(true);
                }}
                class="arrow down"></i>
            }
            </button>
            <input
            className="page-filter"
            placeholder="Find book"
            onChange={(event) => {
                setSearch(event.target.value);
            }} />
        </div>
    )
}
export default Search;
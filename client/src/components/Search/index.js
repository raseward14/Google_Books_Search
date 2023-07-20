import React, { useState, useEffect } from "react";
import './style.css';
const Search = ({ bookArray, callback }) => {
    const [search, setSearch] = useState('');
    const [arrow, setArrow] = useState(false);
    const [searchProperty, setSearchProperty] = useState('title');

    const updateSearch = (text) => {
        setSearchProperty(text);
    };

    const toggleSearchOptions = (bool) => {
        console.log(bool)
        if (bool) {
            document.getElementById("my-search-dropdown").classList.toggle("show-search-options")
        } else {
            document.getElementById("my-search-dropdown").classList.toggle("show-search-options")
        };
    };

    const filterBooks = async (array) => {
        const regex = new RegExp(search, 'i');
        if (searchProperty === 'title') {
            const newArray = await array.filter(book => {
                let bookTitle = book.title.toLowerCase();
                return regex.test(bookTitle)
            })
            console.log('the filter has kept: ', newArray)
            callback(newArray)
        } else if (searchProperty === 'authors') {
            const newArray = await array.filter(book => {
                let bookAuthors = book.authors;
                let result;
                bookAuthors.some((author) => {
                    console.log(author.toLowerCase())
                    let testResult = regex.test(author.toLowerCase());
                    return testResult === true;
                })
            }
            )

            // let newArray = await array.forEach(book => {
            //     let bookAuthors = await JSON.stringify(book.authors)
            //     bookAuthors.forEach(author => {
            //         let updatedString = author.toLowerCase()
            //     })
            // })
            // not working yet!
            // const newArray = await array.filter(book => {
            //     let bookAuthor = book.authors.forEach(author => author.toLowerCase());
            //     return regex.test(bookAuthor)
            // })
            // console.log('the filter has kept: ', newArray)
            // callback(newArray)
        } else {
            const newArray = await array.filter(book => {
                let bookSubject = book.subject.toLowerCase();
                return regex.test(bookSubject)
            })
            console.log('the filter has kept: ', newArray)
            callback(newArray)
        }
    }

    useEffect(() => {
        console.log(`search property is: ${searchProperty}`)
    }, [searchProperty])

    useEffect(() => {
        console.log('search received this array: ', bookArray)
    }, [bookArray]);

    useEffect(() => {
        console.log('arrow is: ', arrow);
    }, [arrow]);

    useEffect(() => {
        console.log('search term: ', search);
        filterBooks(bookArray);
    }, [search]);

    return (
        <div>
            <div className="search-dropdown">
                <button className="button-filter">
                    {searchProperty === 'title' ? <span>Book Title</span> 
                    : searchProperty === 'authors' ? <span>Book Authors</span> 
                    : <span>Book Subject</span>}
                    {arrow ?
                        <i
                            class="arrow up"
                            onClick={() => {
                                setArrow(false);
                                toggleSearchOptions(false);
                            }}
                        ></i>
                        :
                        <i
                            onClick={() => {
                                setArrow(true);
                                toggleSearchOptions(true);
                            }}
                            class="arrow down"></i>
                    }
                </button>
                <div id="my-search-dropdown" className="dropdown-content">
                    <button
                        onClick={()=> {
                            updateSearch('title');
                        }}
                    >Book Title</button>
                    <button
                        onClick={() => {
                            updateSearch('authors');
                        }}
                    >Book Author</button>
                    <button
                        onClick={() => {
                            updateSearch('subject'); 
                        }}
                    >Book Subject</button> 
                </div>
            </div>
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
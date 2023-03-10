import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Toggle from '../Toggle/toggle';
import './style.css';

const Filter = ({ tText, aText, gText }) => {
    // toggle button state
    const [intitle, setIntitle] = useState(null);
    const [subject, setSubject] = useState(null);
    const [inauthor, setInauthor] = useState(null);

    // toggle inputs state
    const titleInput = document.getElementById('titleInput');
    const genreInput = document.getElementById('genreInput');
    const authorInput = document.getElementById('authorInput');

    // toggle input text state
    const [titleText, setTitleText] = useState(null);
    const [authorText, setAuthorText] = useState(null);
    const [genreText, setGenreText] = useState(null);

    const modal = document.getElementById("myModal");

    async function openFilter() {
        console.log('clicked filter')
        modal.style.display = "block";
    }

    async function closeFilter() {
        console.log('closed filter');
        modal.style.display = "none";
    }



    useEffect(() => {
        console.log('inTitle: ', intitle);
        console.log('title text: ', titleText);
        if (intitle) {
            titleInput.style.visibility = "visible";
            tText(titleText)
        } else if (intitle !== null) {
            titleInput.style.visibility = "hidden";
            titleInput.value = '';
            setTitleText(null);
            tText('');
        };
    }, [intitle, titleText]);

    useEffect(() => {
        console.log('subject: ', subject);
        console.log('genre text: ', genreText);
        if (subject) {
            genreInput.style.visibility = "visible";
            gText(genreText)
        } else if (subject !== null) {
            genreInput.style.visibility = "hidden";
            genreInput.value = '';
            setGenreText(null);
            gText('');
        };
    }, [subject, genreText]);

    useEffect(() => {
        console.log('inAuthor: ', inauthor)
        console.log('author text: ', authorText)
        if (inauthor) {
            authorInput.style.visibility = "visible";
            aText(authorText)
        } else if (inauthor !== null) {
            authorInput.style.visibility = "hidden";
            authorInput.value = '';
            setAuthorText(null);
            aText('');
        }
    }, [inauthor, authorText]);

    return (
        <div>
            <table>
                <th>
                    <td
                        onClick={openFilter}
                        id="button"
                        className="filter">
                        <FontAwesomeIcon
                            icon={faFilter} />
                    </td>
                </th>
                <div>

                </div>
                <tr id="myModal" className="modal">
                    <td className="modal-content">
                        <span className='search_toggle'>In Title</span><Toggle toggle={(value) => {
                            if (value !== undefined) {
                                setIntitle(value)
                            }
                        }} /><input
                            id='titleInput'
                            className='input'
                            placeholder='Book Title'
                            onChange={(event) => {
                                setTitleText(event.target.value);
                            }} /><br /><br />
                        <span className='search_toggle'>In Author</span><Toggle toggle={(value) => {
                            if (value !== undefined) {
                                setInauthor(value)
                            }
                        }} /><input
                            id='authorInput'
                            className='input'
                            placeholder='Book Author'
                            onChange={(event) => {
                                setAuthorText(event.target.value);
                            }} /><br /><br />
                        <span className='search_toggle'>Genre</span><Toggle toggle={(value) => {
                            if (value !== undefined) {
                                setSubject(value)
                            }
                        }} /><input
                            id='genreInput'
                            className='input'
                            placeholder='Genre'
                            onChange={(event) => {
                                setGenreText(event.target.value);
                            }} /><br />
                        <span
                            onClick={closeFilter}
                            class="close">&times;</span>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Filter;
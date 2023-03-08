import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Toggle from '../Toggle/toggle';
import './style.css';

const Filter = () => {
    const [intitle, setIntitle] = useState(null);
    const [subject, setSubject] = useState(null);
    const [inauthor, setInauthor] = useState(null);

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
        console.log('inTitle', intitle)
    }, [intitle]);

    useEffect(() => {
        console.log('subject', subject)
    }, [subject]);

    useEffect(() => {
        console.log('inAuthor', inauthor)
    }, [inauthor]);

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
                        }} /><input/><br /><br />
                        <span className='search_toggle'>In Author</span><Toggle toggle={(value) => {
                            if (value !== undefined) {
                                setInauthor(value)
                            }
                        }} /><input/><br /><br />
                        <span className='search_toggle'>Genre</span><Toggle toggle={(value) => {
                            if (value !== undefined) {
                                setSubject(value)
                            }
                        }} /><input/><br />
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
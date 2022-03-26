import axios from 'axios';

// get your library - eventually by user_id
const getLibrary = () => {
    return axios.get('/api/library');
};

// save new book to your library
// library books are title, authors, description, link, and image
const saveLibrary = (bookInfo) => {
    return axios.post('/api/library', bookInfo);
};

const deleteLibrary = (bookID) => {
    return axios.delete('/api/library/' + bookID);
};

export { getLibrary, saveLibrary, deleteLibrary };
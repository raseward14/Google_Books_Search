import axios from 'axios';

// get your library - eventually by user_id
const getRead = () => {
    return axios.get('/api/library');
};

// save new book to your library
// library books are title, authors, description, link, and image
const saveRead = (bookInfo) => {
    return axios.post(`/api/library/${id}`, bookInfo);
};

const updateRead = (bookInfo) => {
    return axios.put('/api/library', bookInfo)
}

const deleteRead = (bookID) => {
    return axios.delete('/api/library/' + bookID);
};

export { getRead, saveRead, deleteRead, updateRead };
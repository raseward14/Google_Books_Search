import axios from 'axios';

// get all your library - eventually by user_id
const getRead = () => {
    return axios.get('/api/library');
};

const getReadByID = (id) => {
    return axios.get(`/api/library/${id}`);
};

// save new book to your library
// library books are title, authors, description, link, and image
const saveRead = (bookInfo) => {
    return axios.post('/api/library', bookInfo);
};

// update favorited property
const updateRead = (id, body) => {
    return axios.put(`/api/library/${id}`, body);
};

const deleteRead = (id) => {
    return axios.delete(`/api/library/${id}`);
};

export { getRead, getReadByID, saveRead, deleteRead, updateRead };
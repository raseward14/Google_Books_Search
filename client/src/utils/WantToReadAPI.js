import axios from 'axios';

// get all books to read
const getWantToRead = () => {
    return axios.get('/api/read');
};

// get book, query by isbn13
const getWantToReadByIsbn13 = (isbn13) => {
    return axios.get(`/api/read/?isbn13=${isbn13}`);
};

// save a new book to read
// books are title, authors, description, imageLink, infoLink
const saveWantToRead = (bookInfo) => {
    return axios.post('/api/read', bookInfo);
};

const deleteWantToRead = (id) => {
    return axios.delete(`/api/read/${id}`);
};

const updateWantToRead = (id, body) => {
    return axios.put(`/api.read/${id}`, body)
}

export { getWantToRead, saveWantToRead, deleteWantToRead, getWantToReadByIsbn13, updateWantToRead };
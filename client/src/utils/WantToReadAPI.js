import axios from 'axios';

// get all books to read
const getWantToRead = (accessToken) => {
    return axios.get('/api/read', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

// get book, query by isbn13
const getWantToReadByIsbn13 = (isbn13, accessToken) => {
    return axios.get(`/api/read/?isbn13=${isbn13}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

// save a new book to read
// books are title, authors, description, imageLink, infoLink
const saveWantToRead = (bookInfo, accessToken) => {
    return axios.post('/api/read', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

const deleteWantToRead = (id, accessToken) => {
    return axios.delete(`/api/read/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

const updateWantToRead = (id, body, accessToken) => {
    return axios.put(`/api/read/${id}`, body, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
}

export { getWantToRead, saveWantToRead, deleteWantToRead, getWantToReadByIsbn13, updateWantToRead };
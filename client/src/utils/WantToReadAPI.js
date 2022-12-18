import axios from 'axios';

// get all books to read
const getWantToRead = (axiosPrivate, accessToken) => {
    return axiosPrivate.get('/api/read', {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// get book, query by isbn13
const getWantToReadByIsbn13 = (axiosPrivate, isbn13, accessToken) => {
    return axiosPrivate.get(`/api/read/?isbn13=${isbn13}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// save a new book to read
// books are title, authors, description, imageLink, infoLink
const saveWantToRead = (axiosPrivate, bookInfo, accessToken) => {
    return axiosPrivate.post('/api/read', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

const deleteWantToRead = (axiosPrivate, id, accessToken) => {
    return axiosPrivate.delete(`/api/read/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

const updateWantToRead = (axiosPrivate, id, body, accessToken) => {
    return axiosPrivate.put(`/api/read/${id}`, body, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
}

export { getWantToRead, saveWantToRead, deleteWantToRead, getWantToReadByIsbn13, updateWantToRead };
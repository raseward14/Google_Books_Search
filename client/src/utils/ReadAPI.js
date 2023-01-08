import axios from 'axios';

// get all your library - eventually by user_id
const getRead = (axiosPrivate, accessToken, userID) => {
    return axiosPrivate.get(`/api/library?user_id=${userID}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }, 
        withCredentials: true
    });
};

// GET library book by isbn13
const getReadByIsbn13 = (axiosPrivate, isbn13, accessToken) => {
    console.log(isbn13)
    return axiosPrivate.get(`/api/library/?isbn13=${isbn13}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
}

const getReadByID = (id, accessToken) => {
    return axios.get(`/api/library/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// save new book to your library
// library books are title, authors, description, link, and image
const saveRead = (axiosPrivate, bookInfo, accessToken) => {
    return axiosPrivate.post('/api/library', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// update favorited property
const updateRead = (axiosPrivate, id, body, accessToken) => {
    return axiosPrivate.put(`/api/library/${id}`, body, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

const deleteRead = (axiosPrivate, id, accessToken) => {
    return axiosPrivate.delete(`/api/library/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

export { getRead, getReadByID, saveRead, deleteRead, updateRead, getReadByIsbn13 };
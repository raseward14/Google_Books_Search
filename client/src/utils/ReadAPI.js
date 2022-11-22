import axios from 'axios';

// get all your library - eventually by user_id
const getRead = (accessToken) => {
    return axios.get('/api/library', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

// GET library book by isbn13
const getReadByIsbn13 = (isbn13, accessToken) => {
    console.log(isbn13)
    return axios.get(`/api/library/?isbn13=${isbn13}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
}

const getReadByID = (id, accessToken) => {
    return axios.get(`/api/library/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

// save new book to your library
// library books are title, authors, description, link, and image
const saveRead = (bookInfo, accessToken) => {
    return axios.post('/api/library', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
    });
};

// update favorited property
const updateRead = (id, body, accessToken) => {
    return axios.put(`/api/library/${id}`, body, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

const deleteRead = (id, accessToken) => {
    return axios.delete(`/api/library/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

export { getRead, getReadByID, saveRead, deleteRead, updateRead, getReadByIsbn13 };
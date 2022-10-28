import axios from 'axios';
let accessToken = sessionStorage.getItem('accessToken')

// get all your library - eventually by user_id
const getRead = () => {
    return axios.get('/api/library', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
};

// GET library book by isbn13
const getReadByIsbn13 = (isbn13) => {
    console.log(isbn13)
    return axios.get(`/api/library/?isbn13=${isbn13}`);
}

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

export { getRead, getReadByID, saveRead, deleteRead, updateRead, getReadByIsbn13 };
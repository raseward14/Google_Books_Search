import axios from 'axios';

import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import * as refreshTokenAPIFunctions from '../utils/RefreshTokenAPI';

// following here
const customAxios = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
const useAuth = () => {
    return useContext(AuthContext);
}
const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await refreshTokenAPIFunctions.getRefreshToken();
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log('ACCESSTOKEN', response.data.accessToken);

            return { ...prev, accessToken: response.data.accessToken }
        })
        // will call this function when our initial request fails, when our accessToken expires, will refresh, get a new token, then will retry the request
        return response.data.accessToken;
    }
    return refresh;
}
// request interceptor
customAxios.interceptors.request.use(
    config => {
        if(!config.headers['Authorization']) {
            const { auth } = useAuth();
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config
    }, (error) => {
        Promise.reject(error)
    }
);
// response interceptor
customAxios.interceptors.response.use(
    response => response, 
    async(error) => {
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await useRefreshToken();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return customAxios(prevRequest);
        }
        return Promise.reject(error);
    }
)





// get all your library - eventually by user_id
const getRead = (accessToken) => {
    return customAxios.get('/api/library', {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }, 
        withCredentials: true
    });
};

// GET library book by isbn13
const getReadByIsbn13 = (isbn13, accessToken) => {
    console.log(isbn13)
    return axios.get(`/api/library/?isbn13=${isbn13}`, {
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
const saveRead = (bookInfo, accessToken) => {
    return axios.post('/api/library', bookInfo, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

// update favorited property
const updateRead = (id, body, accessToken) => {
    return axios.put(`/api/library/${id}`, body, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

const deleteRead = (id, accessToken) => {
    return axios.delete(`/api/library/${id}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
};

export { getRead, getReadByID, saveRead, deleteRead, updateRead, getReadByIsbn13 };
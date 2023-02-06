import axios from 'axios';

let BASE_URL;

if (process.env.NODE_ENV === "production") {
    BASE_URL = "https://blurb-books.herokuapp.com"
} else {
    BASE_URL = 'http://localhost:3000'
}

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
import axios from "axios";

const saveUser = (userInfo) => {
    return axios.post('/api/register', userInfo)
};

const logout = () => {
    return axios.get('/api/logout')
};

export { saveUser, logout };
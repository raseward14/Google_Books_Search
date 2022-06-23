import axios from "axios";
const saveUser = (userInfo) => {
    return axios.post('/api/register', userInfo)
};
export {saveUser};
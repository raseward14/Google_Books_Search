import axios from 'axios';

// POST login
const postLogin = (userInfo) => {
        return axios.post('/api/auth', userInfo)
        // { 
        //     headers: { 'Content-type': 'application/json' }, 
        //     withCredentials: true
        // });
};
    
export { postLogin };
import axios from 'axios';

// POST login
const postLogin = (userInfo) => {

        // const axiosConfig = {
        //         withCredentials: true,
        //         credentials: 'include',
        //         headers: {
        //           Accept: 'application/json',
        //           'Content-Type': 'application/json'
        //         }
        //       };

        // return axios.post('/api/auth', userInfo, axiosConfig);        
        return axios.post('/api/auth', userInfo);        

};
    
export { postLogin };
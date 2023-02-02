import axios from 'axios';

// POST login
const postLogin = (userInfo) => {

        //BRING BACK
        const axiosConfig = {
                withCredentials: true,
                credentials: 'include',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              };

        //BRING BACK
        return axios.post('/api/auth', userInfo, axiosConfig);

        // return axios.post('/api/auth', userInfo);        

};
    
export { postLogin };
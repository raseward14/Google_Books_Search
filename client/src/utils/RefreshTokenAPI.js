import axios from 'axios';

// GET refresh token
const getRefreshToken = () => {

        return axios.get('/api/refresh',  
        {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true
        });
};
    
export { getRefreshToken };
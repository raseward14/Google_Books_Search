import axios from 'axios';

// GET refresh token
const getRefreshToken = () => {

    const axiosConfig = {
        withCredentials: true,
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };

        return axios.get('/api/refresh', axiosConfig) 
        // {
        //     headers: {
        //         'Content-type': 'application/json',
        //         withCredentials: true,
        //     }
        // }
};
    
export { getRefreshToken };
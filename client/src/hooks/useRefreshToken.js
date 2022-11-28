// import axios from '../api/axios';
import * as refreshTokenAPIFunctions from '../utils/RefreshTokenAPI';
import useAuth from './useAuth';


const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        // const response = await axios.get('/refresh', {
        //     withCredentials: true
        // });
        const response = refreshTokenAPIFunctions.getRefreshToken();
        setAuth(prev => {
            console.log(JSON.stringify(prev));

            // response = 401 Unauthorized -> cannot read property of undefined, reading 'accessToken'
            // console.log(response.data.accessToken);
            console.log(response);

            return { ...prev, accessToken: response.data.accessToken }
        });
        // will call this function when our initial request fails, when our accessToken expires, will refresh, get a new token, then will retry the request
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
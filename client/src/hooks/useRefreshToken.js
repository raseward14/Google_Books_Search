// import axios from '../api/axios';
import * as refreshTokenAPIFunctions from '../utils/RefreshTokenAPI';
import useAuth from './useAuth';


const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await refreshTokenAPIFunctions.getRefreshToken();
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log('ACCESSTOKEN', response.data.accessToken);

            return { ...prev, accessToken: response.data.accessToken }
        });
        // will call this function when our initial request fails, when our accessToken expires, will refresh, get a new token, then will retry the request
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
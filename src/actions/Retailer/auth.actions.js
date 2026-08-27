import axios from 'actions/axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from 'actionTypes/global.types';

export const signup = (data) => {
    return (dispatch) => {
        axios.post(`/retailer/signup`, data)
            .then(response => {
                if(response.data.success){
                    localStorage.setItem("auth", JSON.stringify(response.data.data));
                    /**
                     * set auth header
                     */
                    axios.defaults.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;

                    dispatch({
                        type: SIGNUP_SUCCESS,
                        payload: response.data.data
                    });
                }else{
                    dispatch({
                        type: SIGNUP_FAILURE,
                        payload: response.data.message
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const login = (data) => {
    return (dispatch) => {
        axios.post(`/retailer/auth/signin`, data)
            .then(response => {
                if(response.data.success){
                    localStorage.setItem("auth", JSON.stringify(response.data.data));
                    /**
                     * set auth header
                     */
                    axios.defaults.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;

                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: response.data.data
                    });
                }else{
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: response.data.message
                    });
                }
            })
            .catch(error => {
            })
    }
}

/**
 * Forgot password — ask the API to email a one-time reset link.
 * Promise-style (not redux) so the page owns its own success/error state.
 */
export const forgotPasswordSendLink = (data) => {
    return axios.post(`/retailer/auth/forgot-password-send-link`, data);
}

/**
 * Reset password using the token from the emailed link.
 */
export const resetPassword = (data) => {
    return axios.post(`/retailer/auth/reset-password`, data);
}

export const logout = () => {
    return (dispatch) => {
        axios.post(`/retailer/logout `)
        .then(response => {
            if(response.data.success){
                localStorage.removeItem("auth");
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: response.data.data
                });
            }else{
                dispatch({
                    type: LOGOUT_FAILURE,
                    payload: response.data.message
                });
            }
        })
        .catch(error => {
        })
    }
}



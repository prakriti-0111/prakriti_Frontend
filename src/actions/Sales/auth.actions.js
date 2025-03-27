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
        axios.post(`/sales-executive/signup`, data)
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
        axios.post(`/sales-executive/auth/signin`, data)
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

export const logout = () => {
    return (dispatch) => {
        axios.post(`/sales-executive/logout `)
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



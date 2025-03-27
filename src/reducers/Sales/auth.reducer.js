import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from 'actionTypes/Sales/auth.types';

let user = null;
try{
    let auth = localStorage.getItem('auth');
    if(auth){
        auth = JSON.parse(auth);
        user = 'user' in auth ? auth.user : null;
    }
}catch(err){ }
const initialState = user ? { isLoggedIn: true, user } : {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SIGNUP_SUCCESS:
            let signupData={
                ...state,
                isLoggedIn: true,
                user: payload.user
            }
            return signupData;
        case  SIGNUP_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginError: payload
            }
        case LOGIN_SUCCESS:
            let newState2 = {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                loginError: null
            }
            return newState2;
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginError: payload
            }
        case LOGOUT_SUCCESS:
            let newState = {
                ...state,
                logoutSuccess: true,
                isLoggedIn: false,
                user: null,
                logoutErr: null
            }
            return newState;
        case LOGOUT_FAILURE:
            return {
                ...state,
                logoutSuccess: false,
                logoutErr: payload
            }
        default:
            return state;
    }
}
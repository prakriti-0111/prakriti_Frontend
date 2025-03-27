import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    UPDATE_GLOBAL_AUTH,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from 'actionTypes/global.types';
import secureLocalStorage  from  "react-secure-storage";

let user = null;
try{
    let auth = secureLocalStorage.getItem('auth');
    if(auth){
        auth = JSON.parse(auth);
        user = 'user' in auth ? auth.user : null;
    }
}catch(err){ }
const initialState = user ? { isLoggedIn: true, user } : {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            let newState2 = {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                signupErr: null,
                logoutErr: null,
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
                signupErr: null,
                logoutErr: null,
                loginError: null
            }
            return newState;
        case LOGOUT_FAILURE:
            return {
                ...state,
                logoutSuccess: false,
                logoutErr: payload
            }
        case UPDATE_GLOBAL_AUTH:
            let auth = localStorage.getItem('auth');
            if(auth){
                auth = JSON.parse(auth);
                auth.user.name = payload.name;
                auth.user.mobile = payload.mobile;
                auth.user.email = payload.email;
                auth.user.image = payload.image;
                localStorage.setItem("auth", JSON.stringify(auth));
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload
                }
            }
        case SIGNUP_SUCCESS:
            let signupData = {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                signupErr: null,
                logoutErr: null,
                loginError: null
            }
            return signupData;
        case  SIGNUP_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                signupErr: payload
            }
        default:
            return state;
    }
}
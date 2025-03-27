import axios from "actions/axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "actionTypes/global.types";
import { Axios } from "axios";
import secureLocalStorage from "react-secure-storage";
import { GetCookieID, objectToQuery } from "src/helpers/helper";

export const signup = (data) => {
  data.cookie_id = GetCookieID();

  return (dispatch) => {
    console.log(data);
    axios
      .post(`/customer/signup`, data)
      .then((response) => {
        if (response.data.success) {
          secureLocalStorage.setItem(
            "auth",
            JSON.stringify(response.data.data)
          );
          /**
           * set auth header
           */
          axios.defaults.headers["Authorization"] =
            "Bearer " + response.data.data.access_token;

          dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: SIGNUP_FAILURE,
            payload: response.data.message,
          });
        }
      })
      .catch((error) => {});
  };
};

export const login = (data) => {
  data.cookie_id = GetCookieID();
  return (dispatch) => {
    axios
      .post(`/customer/auth/signin`, data)
      .then((response) => {
        if (response.data.success) {
          secureLocalStorage.setItem(
            "auth",
            JSON.stringify(response.data.data)
          );
          /**
           * set auth header
           */
          axios.defaults.headers["Authorization"] =
            "Bearer " + response.data.data.access_token;

          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data,
          });
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            payload: response.data.message,
          });
        }
      })
      .catch((error) => {});
  };
};

export const logout = () => {
  return (dispatch) => {
    secureLocalStorage.removeItem("auth");
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: {},
    });

    axios
      .post(`/customer/logout `)
      .then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            window.location.href = `https://prakriti.one/`;
          }, 500);
        } else {
          dispatch({
            type: LOGOUT_FAILURE,
            payload: response.data.message,
          });
        }
      })
      .catch((error) => {});
  };
};

export const existingUser = (data) => {
  return axios.post(`/customer/auth/existing-user`, data);
};

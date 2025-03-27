import axios from 'actions/axios';
import {
    SALES_UPDATE_PROFILE
} from 'actionTypes/Sales/profile.types';
import {objectToQuery} from 'src/helpers/helper';

export const ProfileUpdate = (data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/edit-profile`, data)
        .then(response => {
            dispatch({
                type: SALES_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getAttendence = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/sales-executive/attendence${params}`);
}
import axios from 'actions/axios';
import {
    CUSTOMER_UPDATE_PROFILE
} from 'actionTypes/Customer/profile.types';

export const ProfileUpdate = (data) => {
    return (dispatch) => {
        axios.post(`/customer/edit-profile`, data)
        .then(response => {
            dispatch({
                type: CUSTOMER_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}
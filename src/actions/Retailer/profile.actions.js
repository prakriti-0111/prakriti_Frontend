import axios from 'actions/axios';
import {
    RETAILER_UPDATE_PROFILE
} from 'actionTypes/Retailer/profile.types';

export const ProfileUpdate = (data) => {
    return (dispatch) => {
        axios.post(`/retailer/edit-profile`, data)
        .then(response => {
            dispatch({
                type: RETAILER_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}
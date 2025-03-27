import axios from 'actions/axios';
import {
    RETAILER_UPDATE_CHANGE_PASSWORD
} from 'actionTypes/Retailer/changePassword.types';

export const changePassword = (data) => {
    return (dispatch) => {
        axios.post(`/retailer/change-password `, data)
            .then(response => {
                dispatch({
                    type: RETAILER_UPDATE_CHANGE_PASSWORD,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}
import axios from 'actions/axios';
import {
    CUSTOMER_UPDATE_CHANGE_PASSWORD
} from 'actionTypes/Customer/changePassword.types';

export const changePassword = (data) => {
    return (dispatch) => {
        axios.post(`/customer/change-password `, data)
            .then(response => {
                dispatch({
                    type: CUSTOMER_UPDATE_CHANGE_PASSWORD,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}
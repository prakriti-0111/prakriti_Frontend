import axios from 'actions/axios';
import {
    SALES_UPDATE_CHANGE_PASSWORD
} from 'actionTypes/Sales/changePassword.types';

export const changePassword = (data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/change-password `, data)
            .then(response => {
                dispatch({
                    type: SALES_UPDATE_CHANGE_PASSWORD,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}
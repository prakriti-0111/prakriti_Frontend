import axios from 'actions/axios';
import {
    SALES_LIST_RETAILER 
} from 'actionTypes/Sales/user.types';

export const RetailerList = () => {
    return (dispatch) => {
        axios.get(`/sales-executive/user`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: SALES_LIST_RETAILER,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }
}
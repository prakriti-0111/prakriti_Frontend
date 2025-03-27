import axios from 'actions/axios';
import {
LIST_CHECKOUT
} from 'actionTypes/Sales/checkout.types';

export const checkoutList = () => {
    return (dispatch) => {
        axios.get(`/sales-executive/checkout`)
            .then(response => {
                if(response.data.success) {
                    dispatch({
                        type: LIST_CHECKOUT,
                        payload: response?.data?.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

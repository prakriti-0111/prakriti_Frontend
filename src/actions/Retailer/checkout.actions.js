import axios from 'actions/axios';
import {
LIST_CHECKOUT
} from 'actionTypes/Retailer/checkout.types';

export const checkoutList = () => {
    return (dispatch) => {
        axios.get(`/retailer/checkout`)
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

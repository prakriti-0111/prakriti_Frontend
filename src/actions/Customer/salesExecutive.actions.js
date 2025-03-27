import axios from 'actions/axios';
import {
    CUSTOMER_LIST_SALESEXECUTIVE
} from 'actionTypes/Customer/salesExecutive.types';
import {objectToQuery} from 'src/helpers/helper';

export const salesExecutiveList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/customer/sales-executive${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CUSTOMER_LIST_SALESEXECUTIVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

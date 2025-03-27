import axios from 'actions/axios';
import {
    CUSTOMER_LIST_RETAILER,
    CUSTOMER_ADD_RETAILER,
    CUSTOMER_UPDATE_RETAILER
} from 'actionTypes/Customer/retailer.types';
import {objectToQuery} from 'src/helpers/helper';

export const retailerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/customer/retailers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CUSTOMER_LIST_RETAILER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const retailerCreate = (data) => {
    return (dispatch) => {
        axios.post("/customer/retailers/store", data)
        .then(response => {
            dispatch({
                type: CUSTOMER_ADD_RETAILER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const retailerUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/customer/retailers/update/${id}`, data)
        .then(response => {
            dispatch({
                type: CUSTOMER_UPDATE_RETAILER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

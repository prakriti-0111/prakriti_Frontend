import axios from 'actions/axios';
import {
    LIST_ORDER,
    ADD_ORDER,
    GET_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER
} from 'actionTypes/Sales/order.types';
import {objectToQuery} from 'src/helpers/helper';

export const OrderCreate = (data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/place-order`, data)
            .then(response => {
                dispatch({
                    type: ADD_ORDER,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }

}

export const OrderList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        axios.get(`${process.env.API_URL}/api/sales-executive/orders${params}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: LIST_ORDER,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }

}

export const OrderFetch = (id) => {
    return (dispatch) => {
        axios.get(`${process.env.API_URL}/api/sales-executive/orders?order_id=${id}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: GET_ORDER,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const OrderUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`${process.env.API_URL}/api/sales-executive/address/update/${id}`, data)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: UPDATE_ORDER,
                        payload: response.data
                    });
                    dispatch({
                        type :START_NOTIFY,
                        payload : response.data
                    })
                }else{
                    dispatch({
                        type:ADDRESS_FAILURE,
                        payload:response.data
                    })
                    dispatch({
                        type :START_NOTIFY,
                        payload : response.data
                    })
                }
            })
            .catch(error => {
            })
    }
}

export const OrderDelete = (data) => {
    return (dispatch) => {
        axios.post(`${process.env.API_URL}/api/sales-executive/cancel-order`, data)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: DELETE_ORDER,
                        payload: response.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const OrderFetchRaw = (id) => {
    return axios.get(`${process.env.API_URL}/api/sales-executive/orders?order_id=${id}`)
}

export const OrderConfirmation = (data) => {
    return axios.post(`${process.env.API_URL}/api/sales-executive/orders/confirm-order`,data)
}

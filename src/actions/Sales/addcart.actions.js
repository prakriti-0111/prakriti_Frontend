import axios from 'actions/axios';
import {
    LIST_ADDCART ,
    ADD_ADDCART,
    GET_ADDCART,
    UPDATE_ADDCART,
    DELETE_ADDCART ,
} from 'actionTypes/Sales/addcart.types';

import {START_NOTIFY} from "actionTypes/notify.types";

export const CartList = () => {
    return (dispatch) => {
        axios.get(`/sales-executive/carts`)
            .then(response => {
                if(response.data.success) {
                    dispatch({
                        type: LIST_ADDCART,
                        payload: response?.data?.data
                    });
                }
            })
            .catch(error => {
            })
    }
}


export const AddToCart = (data) => {
    return (dispatch) => {
        axios.post(`/api/sales-executive/carts/store`,data)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: ADD_ADDCART,
                        payload: response.data
                    });
                    //  dispatch({
                    //     type :START_NOTIFY,
                    //     payload : response.data
                    // })
                }
            })
            .catch(error => {
            })
    }
}


export const AddFetch = (id) => {
    return (dispatch) => {
        axios.get(`/api/sales-executive/address/fetch/${id}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: GET_ADDCART,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const AddUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/api/sales-executive/carts/update/${id}`, data)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: UPDATE_ADDCART,
                        payload: response.data
                    });
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

export const CartDelete = (id) => {  //data
    return (dispatch) => {
        axios.delete(`/api/sales-executive/carts/delete/${id}`)
            .then(response => {
                dispatch({
                    type: DELETE_ADDCART,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

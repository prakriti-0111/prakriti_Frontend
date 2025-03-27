import axios from 'actions/axios';
import {
    LIST_ADDCART ,
    ADD_ADDCART,
    GET_ADDCART,
    UPDATE_ADDCART,
    DELETE_ADDCART ,
} from 'actionTypes/Retailer/addcart.types';

import {START_NOTIFY} from "actionTypes/notify.types";

export const CartList = () => {
    return (dispatch) => {
        axios.get(`/retailer/carts`)
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
        axios.post(`/retailer/carts/store`,data)
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
        axios.get(`/retailer/address/fetch/${id}`)
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
        axios.post(`/retailer/carts/update/${id}`, data)
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
        axios.delete(`/retailer/carts/delete/${id}`)
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

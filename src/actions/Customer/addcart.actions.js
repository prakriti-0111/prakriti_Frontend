import axios from 'actions/axios';
import {
    LIST_ADDCART ,
    ADD_ADDCART,
    GET_ADDCART,
    UPDATE_ADDCART,
    DELETE_ADDCART,
    UPDATE_ADDCART_SIZE_MATERIAL
} from 'actionTypes/Customer/addcart.types';
import {GetCookieID, objectToQuery} from 'src/helpers/helper';

export const CartList = () => {
    let params = objectToQuery({cookie_id: GetCookieID()}, true);
    return (dispatch) => {
        axios.get(`/customer/carts${params}`)
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
    data.cookie_id = GetCookieID();
    return (dispatch) => {
        axios.post(`/customer/carts/store`,data)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: ADD_ADDCART,
                        payload: response.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const AddToCartRaw = (data) => {
    data.cookie_id = GetCookieID();
    return axios.post(`/customer/carts/store`,data)
}


export const AddFetch = (id) => {
    return (dispatch) => {
        axios.get(`/customer/address/fetch/${id}`)
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

export const CartUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/customer/carts/update/${id}`, data)
            .then(response => {
                dispatch({
                    type: UPDATE_ADDCART,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const CartDelete = (id) => {  //data
    return (dispatch) => {
        axios.delete(`/customer/carts/delete/${id}`)
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

export const CartUpdateSizeMaterial = (id, data) => { 
    return (dispatch) => {
        axios.post(`/customer/carts/update-size-material/${id}`, data)
            .then(response => {
                dispatch({
                    type: UPDATE_ADDCART,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const CartApplyPromocode = (data) => { 
    return (dispatch) => {
        axios.post(`/customer/carts/apply-promocode`, data)
            .then(response => {
                dispatch({
                    type: UPDATE_ADDCART,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}



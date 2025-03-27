import axios from 'actions/axios';
import {
    LIST_WISHLIST ,
    ADD_WISHLIST,
    GET_WISHLIST,
    UPDATE_WISHLIST,
    DELETE_WISHLIST
} from 'actionTypes/Sales/wishlist.type';
//import {START_NOTIFY} from "actionTypes/notify.types";

export const WishListAdd = (data) => {
    return (dispatch) => {
        axios.post(`sales-executive/update-wishlist`, data)
            .then(response => {
                dispatch({
                    type: ADD_WISHLIST,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }

}
export const checkProductInWish = (data) => {
    return axios.post(`${process.env.API_URL}/api/sales-executive/check-wishlist`, data);
}
export const WishListData = () => {
    return (dispatch) => {
        axios.get(`${process.env.API_URL}/api/sales-executive/wishlists`)
            .then(response => {
                //console.log("wList",response.data.data.items)
                if(response.data.success){
                    dispatch({
                        type: GET_WISHLIST,
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
        axios.get(`${process.env.API_URL}/api/sales-executive/address/fetch/${id}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: GET_WISHLIST,
                        payload:response.data
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

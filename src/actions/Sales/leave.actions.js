import axios from 'actions/axios';
import {
    LIST_LEAVE ,
    ADD_LEAVE,
    GET_LEAVE,
    UPDATE_LEAVE,
    DELETE_LEAVE
} from 'actionTypes/Sales/leaves.types';
//import {START_NOTIFY} from "actionTypes/notify.types";

export const LeaveAdd = (data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/leaves/create`, data)
            .then(response => {
                dispatch({
                    type: ADD_LEAVE,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }

}

export const LeaveData = () => {
    return (dispatch) => {
        axios.get(`${process.env.API_URL}/api/sales-executive/leaves`)
            .then(response => {
                //console.log("wList",response.data.data)
                if(response.data.success){
                    dispatch({
                        type: LIST_LEAVE,
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
                        type: GET_LEAVE,
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
                        type: UPDATE_LEAVE,
                        payload: response.data
                    });
                    
                }
            })
            .catch(error => {
            })
    }
}

export const LeaveDelete = (data) => {
    return (dispatch) => {
        axios.post(`${process.env.API_URL}/api/sales-executive/leaves/delete`, data)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: DELETE_LEAVE,
                        payload: response.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

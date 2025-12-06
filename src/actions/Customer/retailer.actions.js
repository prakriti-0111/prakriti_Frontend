import axios from 'actions/axios';
import {
    CUSTOMER_LIST_RETAILER,
    CUSTOMER_ADD_RETAILER,
    CUSTOMER_UPDATE_RETAILER
} from 'actionTypes/Customer/retailer.types';
import {objectToQuery, isObject} from 'src/helpers/helper';

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

export const retailerFetch = async (data) => {
    if(!isObject(data)){
        data = {id: data}
    }
    data = objectToQuery(data, true);
    console.log("---------cokkie id in DAta  ",data);
    return await axios.get(`/customer/best-retailers/view${data}`);
}

export const retailerStateFetch = async (data) => {
    /* if(!isObject(data)){
        data = {id: data}
    }
    data = objectToQuery(data, true);
    console.log("---------cokkie id in DAta  ",data); */
    return await axios.get(`/customer/best-retailers/states`);
}

export const retailerCityFetch = async (data) => {
    /* if(!isObject(data)){
        data = {id: data}
    }
    data = objectToQuery(data, true);
    console.log("---------cokkie id in DAta  ",data); */
    console.log("retailerCityFetch data : ====================== ", data);
    let params = objectToQuery(data, true);
    console.log("retailerCityFetch params : ====================== ", params);
    return await axios.get(`/customer/best-retailers/cities${params}`);
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

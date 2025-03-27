import axios from 'actions/axios';
import {
    SALES_LIST_ADDRESS ,
    SALES_ADD_ADDRESS,
    SALES_GET_ADDRESS,
    SALES_UPDATE_ADDRESS,
    SALES_DELETE_ADDRESS
} from 'actionTypes/Sales/address.types';
import {objectToQuery} from 'src/helpers/helper';

export const AddressList = (id) => {
    return (dispatch) => {
        axios.get(`/sales-executive/address`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: SALES_LIST_ADDRESS,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const AddressCreate = (data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/address/store`, data)
            .then(response => {
                dispatch({
                    type: SALES_ADD_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }

}


export const AddressFetch = (id) => {
    return (dispatch) => {
        axios.get(`/sales-executive/address/fetch/${id}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: SALES_GET_ADDRESS,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }
}

export const AddressUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/address/update/${id}`, data)
            .then(response => {
                dispatch({
                    type: SALES_UPDATE_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const AddressDelete = (id) => {
    return (dispatch) => {
        axios.delete(`/sales-executive/address/delete/${id}`)
            .then(response => {
                dispatch({
                    type: SALES_DELETE_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const getCountries = async () => {
    return await axios.get(`/sales-executive/address/countries`);
}

export const getStates = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/sales-executive/address/states${params}`);
}

export const getDistricts = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/sales-executive/address/districts${params}`);
}

import axios from 'actions/axios';
import {
    CUSTOMER_LIST_ADDRESS ,
    CUSTOMER_ADD_ADDRESS,
    CUSTOMER_GET_ADDRESS,
    CUSTOMER_UPDATE_ADDRESS,
    CUSTOMER_DELETE_ADDRESS
} from 'actionTypes/Customer/address.types';
import {objectToQuery} from 'src/helpers/helper';

export const AddressList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        axios.get(`/customer/address${params}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: CUSTOMER_LIST_ADDRESS,
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
        axios.post(`/customer/address/store`, data)
            .then(response => {
                dispatch({
                    type: CUSTOMER_ADD_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }

}


export const AddressFetch = (id) => {
    return (dispatch) => {
        axios.get(`/customer/address/fetch/${id}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: CUSTOMER_GET_ADDRESS,
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
        axios.post(`/customer/address/update/${id}`, data)
            .then(response => {
                dispatch({
                    type: CUSTOMER_UPDATE_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const AddressDelete = (id) => {
    return (dispatch) => {
        axios.delete(`/customer/address/delete/${id}`)
            .then(response => {
                dispatch({
                    type: CUSTOMER_DELETE_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const getCountries = async () => {
    return await axios.get(`/customer/address/countries`);
}

export const getStates = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/customer/address/states${params}`);
}

export const getDistricts = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/customer/address/districts${params}`);
}

export const AddressListRaw = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/customer/address${params}`)
}

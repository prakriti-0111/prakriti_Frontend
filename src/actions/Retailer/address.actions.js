import axios from 'actions/axios';
import {
    RETAILER_LIST_ADDRESS ,
    RETAILER_ADD_ADDRESS,
    RETAILER_GET_ADDRESS,
    RETAILER_UPDATE_ADDRESS,
    RETAILER_DELETE_ADDRESS
} from 'actionTypes/Retailer/address.types';
import {objectToQuery} from 'src/helpers/helper';

export const AddressList = (id) => {
    return (dispatch) => {
        axios.get(`/retailer/address`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: RETAILER_LIST_ADDRESS,
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
        axios.post(`/retailer/address/store`, data)
            .then(response => {
                dispatch({
                    type: RETAILER_ADD_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }

}


export const AddressFetch = (id) => {
    return (dispatch) => {
        axios.get(`/retailer/address/fetch/${id}`)
            .then(response => {
                if(response.data.success){
                    dispatch({
                        type: RETAILER_GET_ADDRESS,
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
        axios.post(`/retailer/address/update/${id}`, data)
            .then(response => {
                dispatch({
                    type: RETAILER_UPDATE_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const AddressDelete = (id) => {
    return (dispatch) => {
        axios.delete(`/retailer/address/delete/${id}`)
            .then(response => {
                dispatch({
                    type: RETAILER_DELETE_ADDRESS,
                    payload: response.data
                });
            })
            .catch(error => {
            })
    }
}

export const getCountries = async () => {
    return await axios.get(`/retailer/address/countries`);
}

export const getStates = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/retailer/address/states${params}`);
}

export const getDistricts = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/retailer/address/districts${params}`);
}

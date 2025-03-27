import {
    RETAILER_LIST_ADDRESS ,
    RETAILER_ADD_ADDRESS,
    RETAILER_GET_ADDRESS,
    RETAILER_UPDATE_ADDRESS,
    RETAILER_DELETE_ADDRESS,
    RETAILER_ADDRESS_RESET,
} from 'actionTypes/Retailer/address.types';

const initialState = {
    items: [],
    total: 0,
    address: null,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case RETAILER_LIST_ADDRESS:
            return {
                ...state,
                ...payload
            }
        case RETAILER_ADD_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RETAILER_GET_ADDRESS:
            return {
                ...state,
                address: payload
            }
        case RETAILER_UPDATE_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RETAILER_DELETE_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RETAILER_ADDRESS_RESET:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                editSuccess: false,
                deleteSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}
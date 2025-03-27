import {
    CUSTOMER_LIST_ADDRESS ,
    CUSTOMER_ADD_ADDRESS,
    CUSTOMER_GET_ADDRESS,
    CUSTOMER_UPDATE_ADDRESS,
    CUSTOMER_DELETE_ADDRESS,
    CUSTOMER_ADDRESS_RESET,
} from 'actionTypes/Customer/address.types';

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
        case CUSTOMER_LIST_ADDRESS:
            return {
                ...state,
                ...payload
            }
        case CUSTOMER_ADD_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case CUSTOMER_GET_ADDRESS:
            return {
                ...state,
                address: payload
            }
        case CUSTOMER_UPDATE_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case CUSTOMER_DELETE_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case CUSTOMER_ADDRESS_RESET:
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
import {
    SALES_LIST_ADDRESS ,
    SALES_ADD_ADDRESS,
    SALES_GET_ADDRESS,
    SALES_UPDATE_ADDRESS,
    SALES_DELETE_ADDRESS,
    SALES_ADDRESS_RESET,
} from 'actionTypes/Sales/address.types';

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
        case SALES_LIST_ADDRESS:
            return {
                ...state,
                ...payload
            }
        case SALES_ADD_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SALES_GET_ADDRESS:
            return {
                ...state,
                address: payload
            }
        case SALES_UPDATE_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SALES_DELETE_ADDRESS:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case SALES_ADDRESS_RESET:
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
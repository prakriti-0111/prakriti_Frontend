
import {
    CUSTOMER_LIST_RETAILER,
    CUSTOMER_ADD_RETAILER,
    CUSTOMER_GET_RETAILER,
    CUSTOMER_UPDATE_RETAILER,
    CUSTOMER_DELETE_RETAILER,
    CUSTOMER_RESET_RETAILER,
    CUSTOMER_LIST_RETAILER_REVIEW
} from 'actionTypes/Customer/retailer.types';
const initialState = {
    items: [],
    total: 0,
    item: null,
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
        case CUSTOMER_LIST_RETAILER:
            return {
                ...state,
                ...payload
            }
        case CUSTOMER_ADD_RETAILER:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case CUSTOMER_GET_RETAILER:
            return {
                ...state,
                item: payload
            }
        case CUSTOMER_UPDATE_RETAILER:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
            case CUSTOMER_DELETE_RETAILER:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case CUSTOMER_RESET_RETAILER:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case CUSTOMER_LIST_RETAILER_REVIEW:
            return {
                ...state,
                reviews: payload.items,
                review_total: payload.total
            }
        default:
            return state;
    }
}
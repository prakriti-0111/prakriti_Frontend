import {
    SALES_LIST_RETAILER 
} from 'actionTypes/Sales/user.types';

const initialState = {
    items: [],
    total: 0,
    address: null,
    successMessage: null,
    errorMessage: null,
};
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SALES_LIST_RETAILER:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}
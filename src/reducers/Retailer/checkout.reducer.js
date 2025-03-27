import {
    LIST_CHECKOUT
} from 'actionTypes/Retailer/checkout.types';

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    successMessage: null,
    errorMessage: null,
    getItemsSuccess:false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_CHECKOUT:
            return {
                ...state,
                ...payload,
                getItemsSuccess:true
            }
        default:
            return state;
    }
}
import {
    SALES_LIST_PRODUCT,
    SALES_GET_PRODUCT,
    SALES_PRODUCT_PROCESSING
} from 'actionTypes/Sales/product.types';

const initialState = {
    items: [],
    total: 0,
    product: null,
    processing: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SALES_LIST_PRODUCT:
            return {
                ...state,
                ...payload,
                processing: false
            }
        case SALES_GET_PRODUCT:
            return {
                ...state,
                product: payload,
                processing: false
            }
        case SALES_PRODUCT_PROCESSING:
            return {
                ...state,
                processing: true
            }
        default:
            return state;
    }
}
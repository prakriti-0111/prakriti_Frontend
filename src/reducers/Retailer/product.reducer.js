import {
    RETAILER_LIST_PRODUCT,
    RETAILER_GET_PRODUCT,
    RETAILER_PRODUCT_PROCESSING
} from 'actionTypes/Retailer/product.types';

const initialState = {
    items: [],
    total: 0,
    product: null,
    processing: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case RETAILER_LIST_PRODUCT:
            return {
                ...state,
                ...payload,
                processing: false
            }
        case RETAILER_GET_PRODUCT:
            return {
                ...state,
                product: payload,
                processing: false
            }
        case RETAILER_PRODUCT_PROCESSING:
            return {
                ...state,
                processing: true
            }
        default:
            return state;
    }
}
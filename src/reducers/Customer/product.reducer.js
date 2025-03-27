import {
    CUSTOMER_LIST_PRODUCT,
    CUSTOMER_GET_PRODUCT,
    CUSTOMER_PRODUCT_PROCESSING,
    CUSTOMER_PRODUCT_WISHLIST_UPDATE
} from 'actionTypes/Customer/product.types';

const initialState = {
    items: [],
    total: 0,
    product: null,
    processing: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CUSTOMER_LIST_PRODUCT:
            return {
                ...state,
                ...payload,
                processing: false
            }
        case CUSTOMER_GET_PRODUCT:
            return {
                ...state,
                product: payload,
                processing: false
            }
        case CUSTOMER_PRODUCT_PROCESSING:
            return {
                ...state,
                processing: true
            }
        case CUSTOMER_PRODUCT_WISHLIST_UPDATE:
            return {
                ...state,
                product: state.product ? {
                    ...state.product,
                    has_wishlist: state.product.id == payload.product_id ? payload.status : state.product.has_wishlist
                } : null,
                items: state.items.map(item=> item.id === payload.product_id ? { ...item, has_wishlist: payload.status} : item)
            }
        default:
            return state;
    }
}
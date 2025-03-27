import {
    LIST_ORDER ,
    ADD_ORDER,
    GET_ORDER,
    UPDATE_ORDER,
    RESET_ORDER
} from 'actionTypes/Sales/order.types';
//import {SIGNUP_FAILURE} from "actionTypes/Customer/auth.types";

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    successMessage: null,
    errorMessage: null,
    order_id: ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_ORDER:
            return {
                ...state,
                ...payload,
                actionCalled: true,
                getSuccess:true
            }
        case ADD_ORDER:
            return {
                ...state,
                items:payload,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
                order_id: payload.success ? payload.data.order_id: ''
            }
        case GET_ORDER:
            return {
                ...state,
                items: payload
            }
        case UPDATE_ORDER:
            return {
                ...state,
                items: payload,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_ORDER:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                successMessage: null,
                errorMessage: null,
                order_id: ''
            }
        default:
            return state;
    }
}
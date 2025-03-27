import {
    LIST_ADDCART ,
    ADD_ADDCART,
    GET_ADDCART,
    UPDATE_ADDCART,
    DELETE_ADDCART,
    RESET_ADDCART,
} from 'actionTypes/Customer/addcart.types';

const initialState = {
    items: [],
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
    item_total: 0,
    item_total_display: 0,
    total_payable: 0,
    total_payable_display: 0,
    promocode: '',
    promocode_discount: 0,
    promocode_discount_display: 0,
};

export default function (state = initialState, action) {
    //console.log(action.payload)
    const { type, payload } = action;
    switch (type) {
        case LIST_ADDCART:
            return {
                ...state,
                ...payload,
                actionCalled: true
            }
        case ADD_ADDCART:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_ADDCART:
            return {
                ...state,
                items: payload
            }
        case UPDATE_ADDCART:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_ADDCART:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_ADDCART:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null,
            }
        default:
            return state;
    }
}
import {
    LIST_WISHLIST ,
    ADD_WISHLIST,
    GET_WISHLIST,
    UPDATE_WISHLIST,
    DELETE_WISHLIST,
    RESET_WISHLIST
} from 'actionTypes/Retailer/wishlist.type';
//import {SIGNUP_FAILURE} from "actionTypes/Customer/auth.types";

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    createSuccess: false,
    getSuccess:false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
    statusList:null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_WISHLIST:
            return {
                ...state,
                ...payload,
                actionCalled: true,
                getSuccess:true
            }
        case ADD_WISHLIST:
            
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
                statusList:payload.success ? payload?.data[0]?.status:null
            }
        case  GET_WISHLIST:
            return {
                ...state,
                items: payload,
                actionCalled: true,
                getSuccess:true
            }
        case UPDATE_WISHLIST:
            return {
                ...state,
                items: payload,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_WISHLIST:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_WISHLIST:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                successMessage: null,
                errorMessage: null,
            }
        default:
            return state;
    }
}
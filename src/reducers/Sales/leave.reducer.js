import {
    LIST_LEAVE ,
    ADD_LEAVE,
    GET_LEAVE,
    UPDATE_LEAVE,
    DELETE_LEAVE,
    LEAVE_RESET
} from 'actionTypes/Sales/leaves.types';

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
        case LIST_LEAVE:
            return {
                ...state,
                ...payload,
                actionCalled: true,
                getSuccess:true
            }
        case ADD_LEAVE:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case GET_LEAVE:
            return {
                ...state,
                leaves: payload
            }
        case UPDATE_LEAVE:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_LEAVE:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case LEAVE_RESET:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }    
        default:
            return state;
    }
}
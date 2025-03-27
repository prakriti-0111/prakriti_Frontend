import {
    CUSTOMER_UPDATE_CHANGE_PASSWORD,
    CUSTOMER_RESET_CHANGE_PASSWORD
} from 'actionTypes/Customer/changePassword.types';

const initialState = {
    actionCalled: false,
    changePasswordSuccess: false,
    successMessage: null,
    errorMessage: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CUSTOMER_UPDATE_CHANGE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null
            }
        case  CUSTOMER_RESET_CHANGE_PASSWORD:
            return {
                ...state,
                actionCalled: false,
                changePasswordSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}
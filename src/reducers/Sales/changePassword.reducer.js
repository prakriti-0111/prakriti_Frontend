import {
    SALES_UPDATE_CHANGE_PASSWORD,
    SALES_RESET_CHANGE_PASSWORD
} from 'actionTypes/Sales/changePassword.types';

const initialState = {
    actionCalled: false,
    changePasswordSuccess: false,
    successMessage: null,
    errorMessage: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SALES_UPDATE_CHANGE_PASSWORD:
            return {
                ...state,
                actionCalled: true,
                changePasswordSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null
            }
        case  SALES_RESET_CHANGE_PASSWORD:
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
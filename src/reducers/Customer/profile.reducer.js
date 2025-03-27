import {
    CUSTOMER_UPDATE_PROFILE,
    CUSTOMER_RESET_PROFILE,
} from 'actionTypes/Customer/profile.types';

const initialState = {
    image_url: null,
    actionCalled: false,
    editProfileSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CUSTOMER_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
                image_url: payload.data.image_url
            }
        case CUSTOMER_RESET_PROFILE:
            return {
                ...state,
                actionCalled: false,
                editProfileSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        default:
            return state;
    }
}
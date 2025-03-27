import {
    SALES_UPDATE_PROFILE,
    SALES_RESET_PROFILE,
} from 'actionTypes/Sales/profile.types';

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
        case SALES_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
                image_url: payload.data.image_url
            }
        case SALES_RESET_PROFILE:
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
import {
    RETAILER_UPDATE_PROFILE,
    RETAILER_RESET_PROFILE,
} from 'actionTypes/Retailer/profile.types';

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
        case RETAILER_UPDATE_PROFILE:
            return {
                ...state,
                actionCalled: true,
                editProfileSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
                image_url: payload.data.image_url
            }
        case RETAILER_RESET_PROFILE:
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
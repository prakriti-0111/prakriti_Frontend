import {
    CUSTOMER_LIST_SALESEXECUTIVE
} from 'actionTypes/Customer/salesExecutive.types';
const initialState = {
    items: [],
    total: 0,
    item: null,
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
        case CUSTOMER_LIST_SALESEXECUTIVE:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}
import {
    LIST_CATEGORIES
} from 'actionTypes/Customer/categories.types';

const initialState = {
    items: [],
    loading :false,
    total: 0,
    actionCalled: false,
    successMessage: null,
    errorMessage: null,
    getItemsSuccess:false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_CATEGORIES:
            return {
                ...state,
                ...payload,
                getItemsSuccess:true
            }
            /*case SHOW_LOADER:
                return {
                    ...state,
                    loading:true,
                    getItemsSuccess:false
                }*/
        default:
            return state;
    }
}
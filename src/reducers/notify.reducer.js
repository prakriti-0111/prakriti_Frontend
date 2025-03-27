import {
    START_NOTIFY,
    END_NOTIFY
}from "actionTypes/notify.types"

const initialState = {
    items: [],
    total: 0,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
};

export  const Notify_Reducer=(state = initialState, action)=> {
    const { type, payload } = action;
    switch (type) {
        case START_NOTIFY:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case END_NOTIFY:
            return {
                ...state,
                actionCalled: false,
                editSuccess: false,
                successMessage: false,
                errorMessage: false,
            }
        default:
            return state;
    }
}
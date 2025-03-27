import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
    DESTROY_SESSION
} from 'actionTypes/global.types';
import {CUSTOMER_REDUCER} from './Customer/index';
import {RETAILER_REDUCER} from './Retailer/index';
import {SALES_REDUCER} from './Sales/index';
import { Notify_Reducer } from "./notify.reducer"
import customizationReducer from 'src/store/customizationReducer';
import authReducer from './auth.reducer';

const appReducer = combineReducers({
    form: formReducer,
    customization: customizationReducer,
    customer: combineReducers({
        ...CUSTOMER_REDUCER
    }),
    /*retailer: combineReducers({
        ...RETAILER_REDUCER
    }),
    sales: combineReducers({
        ...SALES_REDUCER
    }),*/
    Notify: Notify_Reducer,
    auth: authReducer

});
const rootReducer = (state, action) => {
   if(action.type === DESTROY_SESSION)
      state = undefined;
   
   return appReducer(state, action);
};
export default rootReducer;
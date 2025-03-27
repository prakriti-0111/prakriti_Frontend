import { combineReducers } from 'redux';
// Reducers
//import authReducer from './auth.reducer';
import profileReducer from "./profile.reducer";
import addressReducer from "./address.reducer";
import changePasswordReducer from "./changePassword.reducer";
import categoriesReducer from "./categories.reducer"
import productReducer from "./product.reducer";
import cartReducer from "./cart.reducer";
import checkoutReducer from "./checkout.reducer";
import orderReducer from "./order.reducer";
import wishListReducer from "./wishlist.reducer";
import retailerReducer from "./retailer.reducer";
import leaveReducer from "./leave.reducer";

export const SALES_REDUCER = {
    //auth: authReducer,
    profile: profileReducer,
    address: addressReducer,
    changePassword: changePasswordReducer,
    categories: categoriesReducer,
    product: productReducer,
    cart: cartReducer,
    checkout:checkoutReducer,
    order: orderReducer,
    wishlist:wishListReducer,
    wishlist:wishListReducer,
    retailer:retailerReducer,
    leaveItem:leaveReducer,
}
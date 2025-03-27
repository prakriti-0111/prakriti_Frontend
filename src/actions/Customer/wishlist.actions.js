import axios from 'actions/axios';
import {
    LIST_WISHLIST ,
    ADD_WISHLIST,
    GET_WISHLIST,
    UPDATE_WISHLIST,
    DELETE_WISHLIST
} from 'actionTypes/Customer/wishlist.type';
import {
    CUSTOMER_PRODUCT_WISHLIST_UPDATE
} from 'actionTypes/Customer/product.types';

export const WishListAdd = (data) => {
    return axios.post(`customer/update-wishlist`, data);
}

export const WishListRemove = (id) => {
    return axios.post(`customer/remove-wishlist/${id}`);
}

export const WishListByNow = (id) => {
    return axios.post(`customer/wishlist-buy-now/${id}`,);
}

export const WishListData = () => {
    return (dispatch) => {
        axios.get(`customer/wishlists`)
            .then(response => {
                //console.log("wList",response.data.data.items)
                if(response.data.success){
                    dispatch({
                        type: GET_WISHLIST,
                        payload: response.data.data
                    });
                }
            })
            .catch(error => {
            })
    }

}


import axios from 'actions/axios';
import {
    CUSTOMER_LIST_PRODUCT,
    CUSTOMER_GET_PRODUCT,
    CUSTOMER_PRODUCT_PROCESSING
} from 'actionTypes/Customer/product.types';
import {objectToQuery, isObject, GetCookieID} from 'src/helpers/helper';

export const productList = (params) => {
    if(!isObject(params)){
        params = {slug: params}
    }
    params.cookie_id = GetCookieID();
    params = objectToQuery(params, true);
    // return (dispatch) => {
    //     dispatch({type: CUSTOMER_PRODUCT_PROCESSING});
    //     axios.get(`/customer/product${params}`)
    //     .then(response => {
    //         if(response.data.success){
    //             dispatch({
    //                 type: CUSTOMER_LIST_PRODUCT,
    //                 payload: response.data.data
    //             });
    //         }
    //     })
    //     .catch(error => {
    //     })
    // }
    return axios.get(`/customer/product${params}`)
}

export const productListRaw = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/customer/product${params}`)
}

export const productFetch = async (data) => {
    if(!isObject(data)){
        data = {slug: data}
    }
    data.cookie_id = GetCookieID();
    console.log("---------cokkie id ois ",data.cookie_id);
    data = objectToQuery(data, true);
    console.log("---------cokkie id ois DAta  ",data);
    return await axios.get(`/customer/product/view${data}`);
}

export const current_stock = async (params)=>{
    params = objectToQuery(params, true);
    return await axios.get(`/superadmin/stocks1${params}`)
}

export const recentlyViewCategories = async (slug) => {
    return await axios.get(`/customer/product/recently-view-categories`);
}



export const prodductAddReview = async (data) => {
    return await axios.post(`/customer/reviews/store`, data);
}

export const prodductReviews = async (params) => {
    params = objectToQuery(params, true);
    return await axios.get(`/customer/reviews${params}`);
}

import axios from 'actions/axios';
import {
    RETAILER_LIST_PRODUCT,
    RETAILER_GET_PRODUCT,
    RETAILER_PRODUCT_PROCESSING
} from 'actionTypes/Retailer/product.types';
import {objectToQuery} from 'src/helpers/helper';

export const productList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        dispatch({type: RETAILER_PRODUCT_PROCESSING});
        axios.get(`/retailer/product${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: RETAILER_LIST_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const productFetch = async (slug) => {
    return await axios.get(`/retailer/product/view?slug=${slug}`);
}

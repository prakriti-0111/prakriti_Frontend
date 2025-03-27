import axios from 'actions/axios';
import {
    SALES_LIST_PRODUCT,
    SALES_GET_PRODUCT,
    SALES_PRODUCT_PROCESSING
} from 'actionTypes/Sales/product.types';
import {objectToQuery} from 'src/helpers/helper';

export const productList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        dispatch({type: SALES_PRODUCT_PROCESSING});
        axios.get(`/sales-executive/product${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SALES_LIST_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const productFetch = async (slug) => {
    return await axios.get(`/sales-executive/product/view?slug=${slug}`);
}

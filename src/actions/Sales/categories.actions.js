import axios from 'actions/axios';
import {
LIST_CATEGORIES
} from 'actionTypes/Sales/categories.types';


export const categoryList = () => {
    return (dispatch) => {
        axios.get(`${process.env.API_URL}/sales-executive/categories`)
            .then(response => {
                if(response.data.success) {
                    dispatch({
                        type: LIST_CATEGORIES,
                        payload: response?.data?.data
                    });
                    
                }


            })
            .catch(error => {
            })
    }
}

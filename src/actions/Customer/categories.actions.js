import axios from 'actions/axios';
import {
LIST_CATEGORIES
} from 'actionTypes/Customer/categories.types';


export const categoryList = () => {
    return (dispatch) => {
        axios.get(`/customer/categories`)
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

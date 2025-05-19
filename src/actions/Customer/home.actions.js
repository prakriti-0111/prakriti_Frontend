import axios from 'actions/axios';
import {objectToQuery, isObject} from 'src/helpers/helper';

export const bannerList = () => {
    return axios.get(`/customer/banners`)
}

export const promocodeList = () => {
    return axios.get(`/customer/promocodes`)
}

export const bestRetailerList = async (params = {}) => {
    params = objectToQuery(params, true)
    console.log("bestRetailerList params : ", params);
    return await axios.get(`/customer/best-retailers${params}`)
}

export const allCounts = () => {
    return axios.get(`/customer/counts`)
}

export const getNextUserName = () => {
    return axios.get(`/customer/next-user-name`)
}

export const eventList = () => {
    return axios.get(`/customer/events`)
}

export const subscribersStore = (data) => {
    return axios.post(`/customer/subscribers/store`, data)
}

export const retailerRequest = (data) => {
    return axios.post(`/customer/retailer-request`, data)
}

export const newArrivalList = () => {
    return axios.get(`/customer/new-arrivals`)
}

export const festiveOfferList = () => {
    return axios.get(`/customer/festive-offers`)
}

export const stockProductList = () => {
    return axios.get(`/customer/stock-products-slider`)
}

export const homePageSetting = () => {
    return axios.get(`/customer/homepagesettings`)
}


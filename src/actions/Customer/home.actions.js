import axios from 'actions/axios';

export const bannerList = () => {
    return axios.get(`/customer/banners`)
}

export const promocodeList = () => {
    return axios.get(`/customer/promocodes`)
}

export const bestRetailerList = () => {
    return axios.get(`/customer/best-retailers`)
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




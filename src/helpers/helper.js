import secureLocalStorage  from  "react-secure-storage";
import { v4 as uuid } from 'uuid';

/**
 * get auth token
 */
 const getAuthData = (key, fromUser) => {
    let data = '';
    try{
        let auth = secureLocalStorage.getItem('auth');
        if(auth){
            auth = JSON.parse(auth);
            if(fromUser){
                const user = auth.user;
                data = key in user ? user[key] : '';
            }else{
                data = key in auth ? auth[key] : '';
            }
            
        }
    }catch(err){ }
    return data;
}

/**
 * get query params from object
 */
const objectToQuery = (obj, addQuestion) => {
    return obj ? (addQuestion ? '?' : '') + Object.keys(obj).map(key => key + '=' + obj[key]).join('&') : '';
}

/**
 * Get dashboard page route by role name
 */
const getUserDashboardRoute = (roleName) => {
    if(roleName == 'Customer'){
        return '/';
    }else if(roleName == 'Retailer'){
        return '/retailer';
    }else if(roleName == 'Sales Executive'){
        return '/salesExecutive';
    }

    return '/';
}

/**
 * convert obj to formdata
 */
const convertToFormData = (data, formData, parentKey) => {
    if(data === null || data === undefined) return null;
    formData = formData || new FormData();
    if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => 
        convertToFormData(data[key], formData, (!parentKey ? key : (data[key] instanceof File ? parentKey : `${parentKey}[${key}]`)))
      );
    } else {
      formData.append(parentKey, data);
    }
  
    return formData;
}

/**
 * Convert file to base64
 */
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

/**
 * get only values from array by specefic column
 */
const getValuesFromKey = (arr, col) => {
    let a = [];
    for(let i = 0; i < arr.length; i++){
        a.push(arr[i][col]);
    }
    return a;
}

const isEmpty = (value) => {
    return (
        // null or undefined
        (value == null) ||
        
        // 0 value
        //(value == 0) || 
    
        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||
    
        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
      )
}

const isObject = (arr) => {
    return Object.prototype.toString.call(arr).indexOf("Object")>-1;
}

const priceFormat = (p, removeBlankZero) => {
    if (typeof p !== 'undefined' && p !== null && p != '') {
      p = parseFloat(p).toFixed(2);
      p = parseFloat(p);
    }else{
      p = 0.00;
    }
    if(removeBlankZero){
      p = (p).toFixed(2).replace(/[.,]00$/, "");
      p = parseFloat(p);
    }
    return isNaN(p) ? 0 : p;
    
}

const displayAmount = (amount, currencyText, showCurrency) => {
    amount = amount === null ? 0 : amount;
    currencyText = currencyText === true ? 'Rs. ' : '₹';
    currencyText = showCurrency === false ? '' : currencyText;
    return currencyText + priceFormat(amount, true).toFixed(2);
}

const convertUnitToGram = (unit, weight) => {
    if(isEmpty(weight)){
        return 0;
    }
    unit = unit.toLowerCase();
    if(unit == "carat" || unit == "carats" || unit == "ct"){
        return weightFormat(parseFloat(weight) / 5);
    }else if(unit == "ratti"){
        return weightFormat(parseFloat(weight) * 0.182);
    }else if(unit == "cent"){
        return weightFormat(parseFloat(weight) / 500);
    }else{
        return weightFormat(weight);
    }
  }

const weightFormat = (p) => {
    if (typeof p !== 'undefined' && p !== null) {
      p = parseFloat(p).toFixed(3);
      p = parseFloat(p);
    }else{
      p = 0.00;
    }
    p = (p).toFixed(3).replace(/[.,]000$/, "");
    p = parseFloat(p);
    return isNaN(p) ? 0 : p;
}

const isCustomer = () => {
    let role = getAuthData('role_name', true);
    return role == "customer";
}

const isSalesExecutive = () => {
    let role = getAuthData('role_name', true);
    return role == "sales_executive";
}

const isRetailer = () => {
    let role = getAuthData('role_name', true);
    return role == "retailer";
}

const GetCookieID = () => {
    let cookieID = '';
    try{
        cookieID = secureLocalStorage.getItem('cookieID');
    }catch(err){ }
    if(!cookieID){
        cookieID = uuid();
        secureLocalStorage.setItem("cookieID", cookieID);
    }
    return cookieID;
}

const setLastVisitPage = (url) => {
    url = url === undefined ? window.location.href : url;
    secureLocalStorage.setItem("last_visit_page", url);
}

const getLastVisitPage = () => {
    return secureLocalStorage.getItem("last_visit_page", window.location.href) || '';
}

export {
    getAuthData,
    objectToQuery,
    getUserDashboardRoute,
    convertToFormData,
    toBase64,
    getValuesFromKey,
    isEmpty,
    priceFormat,
    displayAmount,
    convertUnitToGram,
    weightFormat,
    isSalesExecutive,
    isCustomer,
    isRetailer,
    GetCookieID,
    isObject,
    setLastVisitPage,
    getLastVisitPage
}
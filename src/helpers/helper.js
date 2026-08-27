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

/**
 * Parse the raw text of an IGI e-copy certificate PDF into structured JSON.
 */
const extractCertificateJSON = (rawText) => {
  const data = {
    report_type: null,
    report_number: null,
    issue_date: null,
    jewelry: {
      type: null,
      metal: null,
      color: null,
      finish: null,
      weight_grams: null
    },
    diamonds: {
      quantity: null,
      shape: null,
      cut: null,
      color_grade: null,
      clarity_grade: null,
      total_carat_weight: null,
      origin: null
    },
    comments: [],
    engraving: null,
    verification: {
      qr_code_present: null,
      website: null,
      certificate_url: null
    },
    disclaimer: null,
    raw_text: rawText
  };

  const lines = rawText.split('\n');
  let foundReportType = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    if (!foundReportType && (lowerLine.includes('e-copy') || lowerLine.includes('jewelry report'))) {
      data.report_type = 'E-COPY JEWELRY REPORT';
      foundReportType = true;
    }

    if (lowerLine.includes('report no')) {
      let reportNumber = null;
      if (line.includes(':')) {
        const match = line.match(/:\s*([0-9A-Z]+)/);
        if (match) reportNumber = match[1].trim();
      } else if (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        const match = nextLine.match(/:\s*([0-9A-Z]+)/);
        if (match) reportNumber = match[1].trim();
      }
      if (reportNumber) data.report_number = reportNumber;
    }

    if (lowerLine.includes('description')) {
      let descText = line.includes(':') ? line.substring(line.indexOf(':') + 1) : (lines[i + 1] || '');

      let j = i + 1;
      while (j < lines.length && !lines[j].trim().match(/^[A-Z][a-z]+\s+and/) && !lines[j].trim().match(/^Tot\.|^Color|^Clarity|^Comments/)) {
        if (lines[j].trim() && !line.includes('description')) {
          descText += ' ' + lines[j].trim();
        }
        j++;
      }

      descText = descText.trim();

      const typeMatch = descText.match(/One\s+([A-Za-z\s]+?)(?:,|weighing)/i);
      if (typeMatch) {
        data.jewelry.type = typeMatch[1].trim();
      }

      if (descText.toLowerCase().includes('yellow gold')) {
        data.jewelry.metal = 'Yellow Gold';
      } else if (descText.toLowerCase().includes('white gold')) {
        data.jewelry.metal = 'White Gold';
      } else if (descText.toLowerCase().includes('platinum')) {
        data.jewelry.metal = 'Platinum';
      } else if (descText.toLowerCase().includes('rose gold')) {
        data.jewelry.metal = 'Rose Gold';
      } else if (descText.toLowerCase().includes('silver')) {
        data.jewelry.metal = 'Silver';
      }

      const finishMatch = descText.match(/(Partly\s+[A-Za-z\s]+?)(,|weighing|$)/i);
      if (finishMatch) {
        data.jewelry.finish = finishMatch[1].trim();
      }

      const weightMatch = descText.match(/weighing\s+in\s+total\s+([\d.]+)\s*g/i);
      if (weightMatch) {
        data.jewelry.weight_grams = parseFloat(weightMatch[1]);
      }

      const diamondQtyMatch = descText.match(/\((\d+)\)\s+Natural\s+Diamonds/i);
      if (diamondQtyMatch) {
        data.diamonds.quantity = parseInt(diamondQtyMatch[1]);
      }
    }

    if (lowerLine.includes('shape and cut')) {
      const cutText = line.includes(':') ? line.substring(line.indexOf(':') + 1) : (lines[i + 1] || '');
      const match = cutText.match(/\((\d+)\)\s+([A-Za-z\s]+)/);
      if (match) {
        data.diamonds.quantity = parseInt(match[1]);
        const shapeAndCut = match[2].trim();
        const words = shapeAndCut.split(/\s+/);
        data.diamonds.shape = words[0];
        data.diamonds.cut = shapeAndCut;
      }
    }

    if (lowerLine.includes('tot. est. weight') || lowerLine.includes('total est. weight')) {
      let j = i + 1;
      let valueIdx = 0;

      while (j < lines.length && valueIdx < 3) {
        const currentLine = lines[j].trim();

        if (currentLine === '') {
          j++;
          continue;
        }

        if (currentLine.startsWith(':')) {
          const value = currentLine.substring(1).trim();

          if (valueIdx === 0) {
            const match = value.match(/([\d.]+)\s*(carat|ct)/i);
            if (match) {
              data.diamonds.total_carat_weight = parseFloat(match[1]);
            }
          } else if (valueIdx === 1) {
            if (!value.includes('Carat')) {
              data.diamonds.color_grade = value;
            }
          } else if (valueIdx === 2) {
            if (!value.includes('Carat')) {
              data.diamonds.clarity_grade = value;
            }
          }

          valueIdx++;
        }
        j++;
      }
    }

    if (lowerLine.includes('comments')) {
      let j = i + 1;
      let inComments = false;

      while (j < lines.length) {
        const currentLine = lines[j].trim();

        if (!inComments && currentLine.startsWith(':')) {
          const commentValue = currentLine.substring(1).trim();
          if (commentValue) {
            data.comments.push(commentValue);
            inComments = true;
          }
        } else if (inComments && currentLine && !currentLine.match(/^Important|^Note|^[A-Z][a-z]+\s*:/) && !currentLine.startsWith(':')) {
          data.comments.push(currentLine);
        } else if (inComments && (currentLine.match(/^Important|^Note/i) || !currentLine)) {
          break;
        }
        j++;
      }
    }

    if (lowerLine.includes('engraved')) {
      data.engraving = true;
    }
  }

  return data;
};

/**
 * Fetch and parse an IGI certificate (alphanumeric report no.) from its e-copy PDF.
 */
const fetchCertificateDetails = async (certificateNo) => {
  if (!certificateNo) {
    return "Invalid certificate number";
  }

  const certificateForPdf = certificateNo.slice(0, -2);
  const pdfUrl = `https://pdf.igi.org/${certificateForPdf}.pdf`;

  try {
    const response = await fetch(pdfUrl);

    if (response.status === 404) {
      return `Certificate #${certificateNo} not found in IGI database. Please verify the certificate number is correct.`;
    }

    if (!response.ok) {
      return `Error: Server returned status ${response.status}. Please try again later.`;
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return "Empty certificate data received from server";
    }

    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    const certificateData = extractCertificateJSON(fullText);

    return {
      success: true,
      data: arrayBuffer,
      certificateNo,
      certificateData,
      pageCount: pdf.numPages
    };
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return `Failed to fetch certificate: ${error.message}`;
  }
};

/**
 * Fetch and parse an IIGL certificate (numeric report no.) from its verify-report page.
 */
const fetchIIGLCertificateDetails = async (certificateNo) => {
  try {
    const url = `https://www.iigl.org/verify-report?_token=9qeXaecEEQxpc6lxgetMVYbRspPDeAI93byemKfw&report_no=${certificateNo}&mobile=9874445612`;
    const response = await fetch(url);
    const result = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');
    const table = doc.querySelector('table');

    if (table) {
      const rows = Array.from(table.rows).map((row) =>
        Array.from(row.cells).map((cell) => {
          const img = cell.querySelector('img');
          return img ? img.src : cell.textContent.trim();
        })
      );
      return { success: true, iiglData: rows };
    }
    return 'No certificate data found from IIGL';
  } catch (error) {
    console.error('Error fetching IIGL certificate:', error);
    return `Failed to fetch IIGL certificate: ${error.message}`;
  }
};

/**
 * Fetch certificate details for either an IGI (alphanumeric) or IIGL (numeric) report no.
 */
const fetchAnyCertificateDetails = async (certificateNo) => {
  const hasAlphabet = /[a-zA-Z]/.test(certificateNo);
  return hasAlphabet
    ? fetchCertificateDetails(certificateNo)
    : fetchIIGLCertificateDetails(certificateNo);
};

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
    getLastVisitPage,
    fetchAnyCertificateDetails
}
/*! For license information please see 5394.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5394],{53664:function(t,e,r){r.d(e,{AS:function(){return u},Fv:function(){return c},G4:function(){return a},NO:function(){return l},S1:function(){return s}});var n=r(69222),o=r(65870),i=r(57446),a=function(t){return function(e){n.Z.post("/sales-executive/place-order",t).then((function(t){e({type:o.UO,payload:t.data})})).catch((function(t){}))}},c=function(t){return t=(0,i.B7)(t,!0),function(e){n.Z.get("".concat("MISSING_ENV_VAR".API_URL,"/api/sales-executive/orders").concat(t)).then((function(t){t.data.success&&e({type:o.kY,payload:t.data.data})})).catch((function(t){}))}},s=function(t){return function(e){n.Z.post("".concat("MISSING_ENV_VAR".API_URL,"/api/sales-executive/cancel-order"),t).then((function(t){t.data.success&&e({type:o.je,payload:t.data})})).catch((function(t){}))}},u=function(t){return n.Z.get("".concat("MISSING_ENV_VAR".API_URL,"/api/sales-executive/orders?order_id=").concat(t))},l=function(t){return n.Z.post("".concat("MISSING_ENV_VAR".API_URL,"/api/sales-executive/orders/confirm-order"),t)}},5394:function(t,e,r){r.r(e);var n=r(27378),o=r(80754),i=r(87137),a=r(31993),c=r(18349),s=r(13040),u=r(80715),l=r(39482),f=r(45106),h=r(53664),d=r(66178),p=r(93395),v=r(57446),y=r(86910),m=r(24246);function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function x(){x=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new E(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=j(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function f(){}function h(){}function d(){}var p={};c(p,o,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(S([])));y&&y!==e&&r.call(y,o)&&(p=y);var m=d.prototype=f.prototype=Object.create(p);function w(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==g(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function j(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:N}}function N(){return{value:void 0,done:!0}}return h.prototype=d,c(m,"constructor",d),c(d,"constructor",h),h.displayName=c(d,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},w(b.prototype),c(b.prototype,i,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(m),c(m,a,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function w(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function j(t,e){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},j(t,e)}function O(t,e){if(e&&("object"===g(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return _(t)}function _(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function E(t){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},E(t)}function S(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var N=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&j(t,e)}(f,t);var e,r,n,s,u=(n=f,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(n);if(s){var r=E(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return O(this,t)});function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),S(_(e=u.call(this,t)),"loadOrder",function(){var t,r=(t=x().mark((function t(r){var n,o;return x().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(0,v.xb)(r)){t.next=5;break}window.location.href="MISSING_ENV_VAR".BASE_URL,console.log("okk"),t.next=9;break;case 5:return t.next=7,(0,h.AS)(r);case 7:(n=t.sent).data.success?(o=n.data.data.items,e.props.actions.CartList(),0==o.length?(y.Am.error("Order not found."),e.props.navigate("/sales-executive")):e.setState({order:o[0],loading:!1})):(y.Am.error("Order not found."),e.props.navigate("/sales-executive"));case 9:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){w(i,n,o,a,c,"next",t)}function c(t){w(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(t){return r.apply(this,arguments)}}()),S(_(e),"handleOrderPage",(function(){e.props.navigate("/sales-executive/orders")})),e.state={order:null,loading:!0},e}return e=f,(r=[{key:"componentDidMount",value:function(){var t=(new p.Z).get("order_id");this.loadOrder(t)}},{key:"render",value:function(){var t=this.state.order;return(0,m.jsx)(m.Fragment,{children:this.state.loading?(0,m.jsx)(l.Z,{}):(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{className:"order-successful",children:(0,m.jsxs)(o.Z,{children:[(0,m.jsx)("div",{className:"order-successful-image mt-5 mb-4 text-center",children:(0,m.jsx)("img",{src:a.Z,alt:""})}),(0,m.jsxs)("div",{className:"order-successful-content",children:[(0,m.jsx)("h2",{className:"text-center",children:"Your Order has been succesfully placed."}),(0,m.jsx)("p",{className:"text-center",children:"Your order will be delivered by 4th of March 2021."})]}),(0,m.jsx)("hr",{}),(0,m.jsx)("div",{className:"order-successful-wrapper",children:(0,m.jsxs)("ul",{children:[(0,m.jsxs)("li",{children:[(0,m.jsx)("p",{children:"Order ID"}),(0,m.jsx)("p",{children:t.order_no})]}),(0,m.jsxs)("li",{children:[(0,m.jsx)("p",{children:"Order Date"}),(0,m.jsx)("p",{children:t.order_date})]}),(0,m.jsxs)("li",{children:[(0,m.jsx)("p",{children:"Payment"}),(0,m.jsx)("p",{children:t.payment_mode})]}),(0,m.jsxs)("li",{children:[(0,m.jsx)("p",{children:"Address"}),(0,m.jsx)("p",{children:t.delivery_address})]})]})}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{className:"successful-wrapper-list",children:[(0,m.jsx)("ul",{children:(0,m.jsxs)("li",{children:[(0,m.jsx)("p",{children:"Sub Total"}),(0,m.jsx)("p",{children:t.sub_total})]})}),(0,m.jsx)("hr",{}),(0,m.jsxs)("div",{className:"successfull-total",children:[(0,m.jsx)("p",{children:"Total"}),(0,m.jsx)("p",{children:t.total_amount})]})]}),(0,m.jsx)("div",{className:"mobile-pay-noew",children:(0,m.jsx)(i.Z,{variant:"secondary",onClick:this.handleOrderPage,children:"GO TO ORDER"})})]})}),(0,m.jsxs)("div",{className:"order-successful-mobile mt-4",children:[(0,m.jsxs)("div",{className:"mobile-checkout-header mb-4",children:[(0,m.jsx)(c.siY,{})," ",(0,m.jsx)("h3",{children:"Order Success"})]}),(0,m.jsx)("div",{className:"order-successful-image mt-5 mb-4 text-center",children:(0,m.jsx)("img",{src:a.Z,alt:""})}),(0,m.jsxs)("div",{className:"order-successful-content",children:[(0,m.jsx)("h2",{className:"text-center",children:"Your Order has been succesfully placed."}),(0,m.jsx)("p",{className:"text-center",children:"Your order will be delivered by 4th of March 2021."})]}),(0,m.jsx)("div",{className:"order-successful-btn",children:(0,m.jsx)(i.Z,{variant:"primary",type:"submit",children:"VIEW MY ORDERS"})}),(0,m.jsx)("div",{className:"mobile-pay-now",children:(0,m.jsx)(i.Z,{variant:"primary",children:"BACK TO HOME"})})]})]})})}}])&&b(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),f}(n.Component);e.default=(0,s.Z)((0,u.$j)((function(t){return{}}),(function(t){return{actions:(0,f.DE)({CartList:d.AQ},t)}}))(N))},31993:function(t,e,r){e.Z=r.p+"assets/checked.png"},93395:function(t,e,r){r.d(e,{Z:function(){return a}});var n=r(27192);function o(t,e){void 0===e&&(e={});var r=function(t){return t&&"j"===t[0]&&":"===t[1]?t.substr(2):t}(t);if(function(t,e){return void 0===e&&(e=!t||"{"!==t[0]&&"["!==t[0]&&'"'!==t[0]),!e}(r,e.doNotParse))try{return JSON.parse(r)}catch(t){}return t}var i=function(){return i=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},i.apply(this,arguments)},a=function(){function t(t,e){var r=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(t,e){return"string"==typeof t?n.Q(t,e):"object"==typeof t&&null!==t?t:{}}(t,e),new Promise((function(){r.HAS_DOCUMENT_COOKIE="object"==typeof document&&"string"==typeof document.cookie})).catch((function(){}))}return t.prototype._updateBrowserValues=function(t){this.HAS_DOCUMENT_COOKIE&&(this.cookies=n.Q(document.cookie,t))},t.prototype._emitChange=function(t){for(var e=0;e<this.changeListeners.length;++e)this.changeListeners[e](t)},t.prototype.get=function(t,e,r){return void 0===e&&(e={}),this._updateBrowserValues(r),o(this.cookies[t],e)},t.prototype.getAll=function(t,e){void 0===t&&(t={}),this._updateBrowserValues(e);var r={};for(var n in this.cookies)r[n]=o(this.cookies[n],t);return r},t.prototype.set=function(t,e,r){var o;"object"==typeof e&&(e=JSON.stringify(e)),this.cookies=i(i({},this.cookies),((o={})[t]=e,o)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=n.q(t,e,r)),this._emitChange({name:t,value:e,options:r})},t.prototype.remove=function(t,e){var r=e=i(i({},e),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=i({},this.cookies),delete this.cookies[t],this.HAS_DOCUMENT_COOKIE&&(document.cookie=n.q(t,"",r)),this._emitChange({name:t,value:void 0,options:e})},t.prototype.addChangeListener=function(t){this.changeListeners.push(t)},t.prototype.removeChangeListener=function(t){var e=this.changeListeners.indexOf(t);e>=0&&this.changeListeners.splice(e,1)},t}()},27192:function(t,e){e.Q=function(t,e){if("string"!=typeof t)throw new TypeError("argument str must be a string");for(var n={},o=e||{},a=t.split(";"),c=o.decode||r,s=0;s<a.length;s++){var u=a[s],l=u.indexOf("=");if(!(l<0)){var f=u.substring(0,l).trim();if(null==n[f]){var h=u.substring(l+1,u.length).trim();'"'===h[0]&&(h=h.slice(1,-1)),n[f]=i(h,c)}}}return n},e.q=function(t,e,r){var i=r||{},a=i.encode||n;if("function"!=typeof a)throw new TypeError("option encode is invalid");if(!o.test(t))throw new TypeError("argument name is invalid");var c=a(e);if(c&&!o.test(c))throw new TypeError("argument val is invalid");var s=t+"="+c;if(null!=i.maxAge){var u=i.maxAge-0;if(isNaN(u)||!isFinite(u))throw new TypeError("option maxAge is invalid");s+="; Max-Age="+Math.floor(u)}if(i.domain){if(!o.test(i.domain))throw new TypeError("option domain is invalid");s+="; Domain="+i.domain}if(i.path){if(!o.test(i.path))throw new TypeError("option path is invalid");s+="; Path="+i.path}if(i.expires){if("function"!=typeof i.expires.toUTCString)throw new TypeError("option expires is invalid");s+="; Expires="+i.expires.toUTCString()}if(i.httpOnly&&(s+="; HttpOnly"),i.secure&&(s+="; Secure"),i.sameSite)switch("string"==typeof i.sameSite?i.sameSite.toLowerCase():i.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;case"none":s+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return s};var r=decodeURIComponent,n=encodeURIComponent,o=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function i(t,e){try{return e(t)}catch(e){return t}}}}]);
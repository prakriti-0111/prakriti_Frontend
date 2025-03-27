/*! For license information please see 2479.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2479],{89921:function(t,e,r){r.d(e,{AA:function(){return l},ID:function(){return p},Uu:function(){return u},g_:function(){return h},t7:function(){return f}});var n=r(69222),o=r(57446);function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function a(){a=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",c=n.asyncIterator||"@@asyncIterator",s=n.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=_(a,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=h(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===f)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var f={};function p(){}function d(){}function y(){}var v={};u(v,o,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(E([])));g&&g!==e&&r.call(g,o)&&(v=g);var w=y.prototype=p.prototype=Object.create(v);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,a,c,s){var u=h(t[o],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==i(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,c,s)}),(function(t){n("throw",t,c,s)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,s)}))}s(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function _(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=h(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return d.prototype=y,u(w,"constructor",y),u(y,"constructor",d),d.displayName=u(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,u(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(b.prototype),u(b.prototype,c,(function(){return this})),t.AsyncIterator=b,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new b(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),u(w,s,"Generator"),u(w,o,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function c(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function s(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){c(i,n,o,a,s,"next",t)}function s(t){c(i,n,o,a,s,"throw",t)}a(void 0)}))}}var u=function(t){return(0,o.Kn)(t)||(t={slug:t}),t.cookie_id=(0,o.M2)(),t=(0,o.B7)(t,!0),n.Z.get("/customer/product".concat(t))},l=function(t){return t=(0,o.B7)(t,!0),n.Z.get("/customer/product".concat(t))},h=function(){var t=s(a().mark((function t(e){return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(0,o.Kn)(e)||(e={slug:e}),e.cookie_id=(0,o.M2)(),e=(0,o.B7)(e,!0),t.next=5,n.Z.get("/customer/product/view".concat(e));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=function(){var t=s(a().mark((function t(e){return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.Z.post("/customer/reviews/store",e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=s(a().mark((function t(e){return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=(0,o.B7)(e,!0),t.next=3,n.Z.get("/customer/reviews".concat(e));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},22479:function(t,e,r){r.r(e);var n=r(27378),o=r(80754),i=r(75124),a=r(38472),c=r(16835),s=r(98539),u=r(33218),l=r(45106),h=r(39568),f=r(80715),p=r(89921),d=r(99157),y=r(13040),v=r(39482),m=r(9096),g=r(86910),w=r(24246);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function b(){b=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=_(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function h(){}function f(){}function p(){}var d={};c(d,o,(function(){return this}));var y=Object.getPrototypeOf,v=y&&y(y(E([])));v&&v!==e&&r.call(v,o)&&(d=v);var m=p.prototype=h.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==x(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(h).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function _(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:P}}function P(){return{value:void 0,done:!0}}return f.prototype=p,c(m,"constructor",p),c(p,"constructor",f),f.displayName=c(p,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),c(w.prototype,i,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function _(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function j(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function L(t,e){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},L(t,e)}function k(t,e){if(e&&("object"===x(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return E(t)}function E(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}function N(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&L(t,e)}(y,t);var e,r,n,l,f,d=(l=y,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=P(l);if(f){var r=P(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return k(this,t)});function y(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,y),N(E(e=d.call(this,t)),"handleSearchChange",(function(t){e.setState({search_inpt:t.target.value})})),N(E(e),"handleSearch",(function(){var t={category:e.props.query.get("category")||"",subcategory:e.props.query.get("subcategory")||"",search:e.state.search_inpt};e.props.actions.productList(t)})),N(E(e),"handlesortBy",(function(t){var r={category:e.props.query.get("category")||"",subcategory:e.props.query.get("subcategory")||"",search:e.state.search_inpt};e.props.actions.productList(r);var n=t.target.name,o="";"By_price"==n||("price_low_to_high"==n?o=e.state.products.sort((function(t,e){return t.total_price<e.total_price})):"price_high_to_low"==n&&(o=e.state.products.sort((function(t,e){return t.total_price>e.total_price})))),e.setState({products:o})})),N(E(e),"wishlistHandler",function(){var t,r=(t=b().mark((function t(r,n){var o,i;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,p.g_)(n);case 2:(o=t.sent).data.success&&(i=o.data.data,e.props.actions.WishListAdd({product_id:r,size_id:i.stocks[0].stock_id}));case 4:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){_(i,n,o,a,c,"next",t)}function c(t){_(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(t,e){return r.apply(this,arguments)}}()),N(E(e),"handleProductDetails",(function(t){e.props.navigate(t.slug)})),e.state={processing:e.props.processing,products:e.props.products,total:e.props.total,is_added_wishlist:"black",wl_actionCalled:e.props.wl_actionCalled,wl_createSuccess:e.props.wl_createSuccess,wl_successMessage:e.props.wl_successMessage,search_inpt:""},e}return e=y,n=[{key:"getDerivedStateFromProps",value:function(t,e){var r={};return t.processing!==e.processing&&(r.processing=t.processing),t.products!==e.products&&(r.products=t.products),t.total!==e.total&&(r.total=t.total),t.wl_actionCalled!==e.wl_actionCalled&&(r.wl_actionCalled=t.wl_actionCalled),t.wl_createSuccess!==e.wl_createSuccess&&(r.wl_createSuccess=t.wl_createSuccess),t.wl_successMessage!==e.wl_successMessage&&(r.wl_successMessage=t.wl_successMessage),r}}],(r=[{key:"componentDidMount",value:function(){var t={category:this.props.query.get("category")||"",subcategory:this.props.query.get("subcategory")||""};this.props.actions.productList(t)}},{key:"componentDidUpdate",value:function(t){this.state.wl_actionCalled&&this.state.wl_createSuccess&&g.Am.success(this.state.wl_successMessage)}},{key:"render",value:function(){var t=this;return(0,w.jsx)("div",{className:"search-wrapper",children:(0,w.jsxs)(o.Z,{children:[(0,w.jsx)("div",{className:"breadcrumb-wrapper",children:(0,w.jsxs)(h.Z,{children:[(0,w.jsx)(h.Z.Item,{href:"",children:"Search"}),(0,w.jsx)(h.Z.Item,{active:!0,children:"Pendants"})]})}),(0,w.jsxs)("div",{className:"search-area desktop-search",children:[(0,w.jsxs)(i.Z,{className:"",children:[(0,w.jsx)(a.Z.Control,{placeholder:"Search here...",name:"search",value:this.state.search_inpt,onChange:this.handleSearchChange}),(0,w.jsx)(i.Z.Text,{id:"basic-addon2",onClick:this.handleSearch,children:(0,w.jsx)(s.wnI,{})})]}),(0,w.jsx)("div",{className:"filter-button",children:(0,w.jsxs)(c.Z,{children:[(0,w.jsxs)(c.Z.Toggle,{variant:"primary",id:"dropdown-basic",className:"filter-icon",children:["Sort & Filter ",(0,w.jsx)(u.SVs,{})]}),(0,w.jsxs)(c.Z.Menu,{children:[(0,w.jsx)("h5",{children:"Filter"}),(0,w.jsx)(c.Z.Item,{href:"#/action-1",name:"By_price",onClick:function(e){return t.handlesortBy(e)},children:"By Price"}),(0,w.jsx)(c.Z.Item,{href:"#/action-2",name:"By_type",onClick:function(e){return t.handlesortBy(e)},children:"By Type"}),(0,w.jsx)(c.Z.Item,{href:"#/action-3",name:"By_metal",onClick:function(e){return t.handlesortBy(e)},children:"By Metal"}),(0,w.jsx)("h5",{children:"Sort By"}),(0,w.jsx)(c.Z.Item,{href:"#/action-1",name:"popular",onClick:function(e){return t.handlesortBy(e)},children:"Popular"}),(0,w.jsx)(c.Z.Item,{href:"#/action-2",name:"price_low_to_high",onClick:function(e){return t.handlesortBy(e)},children:"Price Low to High"}),(0,w.jsx)(c.Z.Item,{href:"#/action-3",name:"price_high_to_low",onClick:function(e){return t.handlesortBy(e)},children:"Price High to Low"})]})]})})]}),(0,w.jsx)("div",{className:"search_header"}),(0,w.jsx)("div",{className:"mobile-search",children:(0,w.jsxs)(i.Z,{className:"",children:[(0,w.jsx)(a.Z.Control,{placeholder:"Pendants","aria-label":"Pendants","aria-describedby":"basic-addon2"}),(0,w.jsx)(i.Z.Text,{id:"basic-addon2",children:(0,w.jsx)(s.wnI,{})})]})}),(0,w.jsx)("div",{className:"mobile-dropdown",children:(0,w.jsxs)("div",{className:"mobile-dropdown-wrapper",children:[(0,w.jsx)("h5",{children:"showing 564 results"}),(0,w.jsxs)(c.Z,{children:[(0,w.jsxs)(c.Z.Toggle,{variant:"primary",id:"dropdown-basic",className:"filter-icon",children:["Sort & Filter ",(0,w.jsx)(u.SVs,{})]}),(0,w.jsxs)(c.Z.Menu,{children:[(0,w.jsx)("h5",{children:"Filter"}),(0,w.jsx)(c.Z.Item,{href:"#/action-1",children:"By Price"}),(0,w.jsx)(c.Z.Item,{href:"#/action-2",children:"By Type"}),(0,w.jsx)(c.Z.Item,{href:"#/action-3",children:"By Metal"}),(0,w.jsx)("h5",{children:"Sort By"}),(0,w.jsx)(c.Z.Item,{href:"#/action-1",children:"Popular"}),(0,w.jsx)(c.Z.Item,{href:"#/action-2",children:"Price Low to High"}),(0,w.jsx)(c.Z.Item,{href:"#/action-3",children:"Price High to Low"})]})]})]})}),this.state.processing?(0,w.jsx)(v.Z,{}):(0,w.jsx)(w.Fragment,{children:0==this.state.products.length?(0,w.jsxs)("div",{className:"no-product mt-3",children:[(0,w.jsx)("img",{src:m.Z,alt:""}),(0,w.jsx)("h1",{className:"mb-0",children:"Products Not Found"})]}):(0,w.jsx)("div",{className:"search-slider mt-3",children:this.state.products.map((function(e,r){return(0,w.jsxs)("div",{className:"search-inner",children:[(0,w.jsxs)("div",{className:"s-slider-image",children:[(0,w.jsx)("img",{className:"swap-on-hover__front-image",src:e.images[0].path,alt:"feature product",onClick:function(){return t.handleProductDetails(e)}}),(0,w.jsxs)("div",{className:"swap-on-hover__back-image",children:[(0,w.jsx)("img",{src:e.images.length>1?e.images[1].path:e.images[0].path}),(0,w.jsx)("div",{className:"wishlist",children:(0,w.jsx)(s.kTx,{color:t.state.is_added_wishlist,onClick:function(){return t.wishlistHandler(e.id,e.slug)}})}),(0,w.jsx)("div",{className:"video_button",children:""!=e.video?(0,w.jsx)(u.mz0,{}):""})]})]}),(0,w.jsxs)("div",{className:"s-slider-content",onClick:function(){return t.handleProductDetails(e)},children:[(0,w.jsx)("h2",{children:e.name}),(0,w.jsx)("div",{className:"ring-price",children:(0,w.jsxs)("span",{className:"offer-price",children:[" ",e.stocks[0].total_price_display," "]})})]})]},r)}))})}),(0,w.jsx)("div",{})]})})}}])&&j(e.prototype,r),n&&j(e,n),Object.defineProperty(e,"prototype",{writable:!1}),y}(n.Component);e.default=(0,y.Z)((0,f.$j)((function(t){return{auth:t.auth,products:t.customer.product.items,total:t.customer.product.total,processing:t.customer.product.processing,wl_actionCalled:t.customer.wishlist.actionCalled,wl_createSuccess:t.customer.wishlist.createSuccess,wl_successMessage:t.customer.wishlist.successMessage}}),(function(t){return{actions:(0,l.DE)({productList:p.Uu,WishListAdd:d.XA},t)}}))(S))},9096:function(t,e,r){e.Z=r.p+"assets/no-product.png"},39568:function(t,e,r){r.d(e,{Z:function(){return f}});var n=r(60042),o=r.n(n),i=r(27378),a=r(28398),c=r(95796),s=r(24246);const u=i.forwardRef((({bsPrefix:t,active:e,children:r,className:n,as:i="li",linkAs:u=c.Z,linkProps:l,href:h,title:f,target:p,...d},y)=>{const v=(0,a.vE)(t,"breadcrumb-item");return(0,s.jsx)(i,{ref:y,...d,className:o()(v,n,{active:e}),"aria-current":e?"page":void 0,children:e?r:(0,s.jsx)(u,{...l,href:h,title:f,target:p,children:r})})}));u.displayName="BreadcrumbItem",u.defaultProps={active:!1,linkProps:{}};var l=u;const h=i.forwardRef((({bsPrefix:t,className:e,listProps:r,children:n,label:i,as:c="nav",...u},l)=>{const h=(0,a.vE)(t,"breadcrumb");return(0,s.jsx)(c,{"aria-label":i,className:e,ref:l,...u,children:(0,s.jsx)("ol",{...r,className:o()(h,null==r?void 0:r.className),children:n})})}));h.displayName="Breadcrumb",h.defaultProps={label:"breadcrumb",listProps:{}};var f=Object.assign(h,{Item:l})}}]);
/*! For license information please see 1322.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1322],{11322:function(e,t,r){r.r(t),r.d(t,{default:function(){return C}});var n=r(27378),o=r(45106),s=r(13040),a=r(80715),i=r(80754),c=r(57231),u=r(38472),l=r(87137),f=r(53738),h=r(69222),d=r(95644),p=function(e){return function(t){h.Z.post("/sales-executive/change-password ",e).then((function(e){t({type:d.f,payload:e.data})})).catch((function(e){}))}},y=r(86910),w=r(24246);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(){m=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",s=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function i(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{i({},"")}catch(e){i=function(e,t,r){return e[t]=r}}function c(e,t,r,n){var o=t&&t.prototype instanceof f?t:f,s=Object.create(o.prototype),a=new O(n||[]);return s._invoke=function(e,t,r){var n="suspendedStart";return function(o,s){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw s;return{value:void 0,done:!0}}for(r.method=o,r.arg=s;;){var a=r.delegate;if(a){var i=P(a,r);if(i){if(i===l)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=u(e,t,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(e,r,a),s}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var l={};function f(){}function h(){}function d(){}var p={};i(p,o,(function(){return this}));var y=Object.getPrototypeOf,w=y&&y(y(E([])));w&&w!==t&&r.call(w,o)&&(p=w);var g=d.prototype=f.prototype=Object.create(p);function b(e){["next","throw","return"].forEach((function(t){i(e,t,(function(e){return this._invoke(t,e)}))}))}function _(e,t){function n(o,s,a,i){var c=u(e[o],e,s);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==v(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,a,i)}),(function(e){n("throw",e,a,i)})):t.resolve(f).then((function(e){l.value=e,a(l)}),(function(e){return n("throw",e,a,i)}))}i(c.arg)}var o;this._invoke=function(e,r){function s(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(s,s):s()}}function P(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,P(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,l;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function x(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function E(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,s=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return s.next=s}}return{next:S}}function S(){return{value:void 0,done:!0}}return h.prototype=d,i(g,"constructor",d),i(d,"constructor",h),h.displayName=i(d,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,i(e,a,"GeneratorFunction")),e.prototype=Object.create(g),e},e.awrap=function(e){return{__await:e}},b(_.prototype),i(_.prototype,s,(function(){return this})),e.AsyncIterator=_,e.async=function(t,r,n,o,s){void 0===s&&(s=Promise);var a=new _(c(t,r,n,o),s);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},b(g),i(g,a,"Generator"),i(g,o,(function(){return this})),i(g,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=E,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],a=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var i=r.call(s,"catchLoc"),c=r.call(s,"finallyLoc");if(i&&c){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(i){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var s=o;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var a=s?s.completion:{};return a.type=e,a.arg=t,s?(this.method="next",this.next=s.finallyLoc,l):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),x(r),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:E(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},e}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){S(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _(e,t,r,n,o,s,a){try{var i=e[s](a),c=i.value}catch(e){return void r(e)}i.done?t(c):Promise.resolve(c).then(n,o)}function P(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function x(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return O(e)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(h,e);var t,r,n,o,s,a=(o=h,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(o);if(s){var r=E(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return x(this,e)});function h(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,h),S(O(t=a.call(this,e)),"handleChange",(function(e,r){var n=t.state.changePass;n.formValues[r]=e.target.value,t.setState({changePass:n})})),S(O(t),"onSubmit",function(){var e,r=(e=m().mark((function e(r){var n;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),t.p_formValidate()&&(n=b({},t.state.changePass.formValues),t.props.actions.changePassword(n));case 2:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){_(s,n,o,a,i,"next",e)}function i(e){_(s,n,o,a,i,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}()),S(O(t),"p_formValidate",(function(){var e=t.state.changePass,r=t.state.changePass.formValues,n=t.state.changePass.formErros,o=!1;return r.confirm_password?n.confirm_password=!1:(n.confirm_password=!0,o=!0),r.old_password?n.old_password=!1:(n.old_password=!0,o=!0),r.new_password?n.new_password=!1:(n.new_password=!0,o=!0),e.formValues=r,e.formErros=n,t.setState({changePass:e}),!o})),t.state={submitting:!1,changePass:{formValues:{confirm_password:"",old_password:"",new_password:""},formErros:{confirm_password:!1,old_password:!1,new_password:!1}},ch_actionCalled:t.props.ch_actionCalled,changePasswordSuccess:t.props.changePasswordSuccess,ch_successMessage:t.props.ch_successMessage,ch_errorMessage:t.props.ch_errorMessage},t}return t=h,n=[{key:"getDerivedStateFromProps",value:function(e,t){var r={};return e.ch_actionCalled!==t.ch_actionCalled&&(r.ch_actionCalled=e.ch_actionCalled),e.changePasswordSuccess!==t.changePasswordSuccess&&(r.changePasswordSuccess=e.changePasswordSuccess),e.ch_successMessage!==t.ch_successMessage&&(r.ch_successMessage=e.ch_successMessage),e.ch_errorMessage!==t.ch_errorMessage&&(r.ch_errorMessage=e.ch_errorMessage),r}}],(r=[{key:"componentDidUpdate",value:function(e){this.state.ch_actionCalled&&(this.state.changePasswordSuccess?(y.Am.success(this.state.ch_successMessage),this.setState({changePass:{formValues:{confirm_password:"",old_password:"",new_password:""},formErros:{confirm_password:!1,old_password:!1,new_password:!1}}})):y.Am.error(this.state.ch_errorMessage),this.props.dispatch({type:d.O}))}},{key:"render",value:function(){var e=this,t=this.state.changePass;return(0,w.jsx)("div",{className:"edit-profile-wrapper",children:(0,w.jsxs)(i.Z,{children:[(0,w.jsx)("h2",{className:"mb-4",children:"Change Password"}),(0,w.jsxs)(u.Z,{onSubmit:this.onSubmit,children:[(0,w.jsx)(i.Z,{children:(0,w.jsxs)(f.Z,{children:[(0,w.jsx)(c.Z,{xs:12,md:6,children:(0,w.jsxs)(u.Z.Group,{className:"mb-4 mt-0",controlId:"formEmailAddress",children:[(0,w.jsx)(u.Z.Label,{children:"Old Password : "}),(0,w.jsx)(u.Z.Control,{name:"old_password",className:t.formErros.old_password?"is-invalid":"",value:t.formValues.old_password,onChange:function(t){return e.handleChange(t,"old_password")},type:"password",placeholder:"Enter old password"}),(0,w.jsx)(u.Z.Control.Feedback,{type:"invalid",children:"Please provide a valid Old password."})]})}),(0,w.jsx)(c.Z,{xs:12,md:6,children:(0,w.jsxs)(u.Z.Group,{className:"mb-4 ",controlId:"formBasicPassword",children:[(0,w.jsx)(u.Z.Label,{children:"New Password : "}),(0,w.jsx)(u.Z.Control,{name:"new_password",className:t.formErros.new_password?"is-invalid":"",value:t.formValues.new_password,onChange:function(t){return e.handleChange(t,"new_password")},type:"password",placeholder:"Enter new password"}),(0,w.jsx)(u.Z.Control.Feedback,{type:"invalid",children:"Please provide a valid New password."})]})}),(0,w.jsx)(c.Z,{xs:12,md:6,children:(0,w.jsxs)(u.Z.Group,{className:"mb-4 ",controlId:"formBasicPassword",children:[(0,w.jsx)(u.Z.Label,{children:"Confirm Password : "}),(0,w.jsx)(u.Z.Control,{name:"confirm_password",className:t.formErros.confirm_password?"is-invalid":"",value:t.formValues.confirm_password,onChange:function(t){return e.handleChange(t,"confirm_password")},type:"password",placeholder:"Enter confirm password"}),(0,w.jsx)(u.Z.Control.Feedback,{type:"invalid",children:"Please provide a valid Confirm password."})]})})]})}),(0,w.jsx)("div",{className:"login-button",children:(0,w.jsx)(l.Z,{variant:"primary",type:"submit",children:"SAVE CHANGES"})})]})]})})}}])&&P(t.prototype,r),n&&P(t,n),Object.defineProperty(t,"prototype",{writable:!1}),h}(n.Component),C=(0,s.Z)((0,a.$j)((function(e){return{ch_actionCalled:e.sales.changePassword.actionCalled,changePasswordSuccess:e.sales.changePassword.changePasswordSuccess,ch_successMessage:e.sales.changePassword.successMessage,ch_errorMessage:e.sales.changePassword.errorMessage}}),(function(e){return{dispatch:e,actions:(0,o.DE)({changePassword:p},e)}}))(L))}}]);
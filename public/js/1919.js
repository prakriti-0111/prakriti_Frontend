"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1919],{91919:function(e,r,t){t.r(r);var n=t(27378),o=t(80754),i=t(53738),s=t(57231),a=t(63801),l=t(38472),c=t(87137),u=t(51876),d=t(45106),f=t(80715),p=t(13040),m=t(84493),h=t(86910),b=t(24246);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function y(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function j(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?y(Object(t),!0).forEach((function(r){C(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function v(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function w(e,r){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,r){return e.__proto__=r,e},w(e,r)}function x(e,r){if(r&&("object"===g(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return O(e)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}function C(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var P=function(e){!function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),r&&w(e,r)}(m,e);var r,t,n,d,f,p=(d=m,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=E(d);if(f){var t=E(this).constructor;e=Reflect.construct(r,arguments,t)}else e=r.apply(this,arguments);return x(this,e)});function m(e){var r;return function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,m),C(O(r=p.call(this,e)),"handleChange",(function(e){var t=e.target,n=t.name,o=t.value;r.setState({formValaues:j(j({},r.state.formValaues),{},C({},n,o))})})),C(O(r),"onSubmit",(function(e){e.preventDefault(),r.formValidate()&&r.props.actions.login(r.state.formValaues)})),C(O(r),"formValidate",(function(){var e=r.state.formValaues,t=r.state.formErrors,n=!1;return e.mobile?t.mobile=null:(t.mobile="Mobile # is required.",n=!0),e.password?t.password=null:(t.password="Password # is required.",n=!0),r.setState({formErrors:t}),!n})),r.state={loginError:r.props.loginError,isLoggedIn:r.props.isLoggedIn,formValaues:{mobile:"",password:""},formErrors:{mobile:null,password:null}},r}return r=m,n=[{key:"getDerivedStateFromProps",value:function(e,r){var t={};return e.auth!==r.auth&&(t.auth=e.auth),e.isLoggedIn!==r.isLoggedIn&&(t.isLoggedIn=e.isLoggedIn),e.loginError!==r.loginError&&(t.loginError=e.loginError),t}}],(t=[{key:"componentDidMount",value:function(){var e=this;this.state.isLoggedIn&&setTimeout((function(){e.props.navigate("/retailer")}))}},{key:"componentDidUpdate",value:function(e){!e.isLoggedIn&&this.state.isLoggedIn&&(h.Am.success("Login Successfully!"),window.location.href="MISSING_ENV_VAR".BASE_URL+"retailer")}},{key:"render",value:function(){var e=this,r=this.state,t=r.loginError,n=r.formValaues,d=r.formErrors;return(0,b.jsx)("div",{className:"login-wrapper",children:(0,b.jsx)(o.Z,{children:(0,b.jsxs)(i.Z,{children:[(0,b.jsxs)(s.Z,{xs:12,md:8,className:"d-none d-sm-block",children:[(0,b.jsx)("div",{className:"login-image",children:(0,b.jsx)("img",{src:u.Z,alt:""})}),(0,b.jsxs)("div",{className:"login-header",children:[(0,b.jsx)("h5",{children:"FLAT 40% OFF on Women’s Jewelry on AXIS Bank Debit & Credit Card"}),(0,b.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"})]})]}),(0,b.jsx)(s.Z,{xs:12,md:4,children:(0,b.jsxs)("div",{className:"login-form-wrapper",children:[(0,b.jsxs)("h2",{children:["Login ",(0,b.jsx)("span",{children:"Welcome Back"})]}),t?(0,b.jsx)(a.Z,{variant:"danger",children:t}):null,(0,b.jsxs)("form",{onSubmit:this.onSubmit,children:[(0,b.jsxs)(l.Z.Group,{className:"mb-4 mt-4",controlId:"formEmailAddress",children:[(0,b.jsx)(l.Z.Control,{name:"mobile",onChange:function(r){return e.handleChange(r)},value:n.mobile,type:"text",placeholder:"Enter Mobile Number",required:!0}),(0,b.jsxs)("span",{type:"invalid",style:{color:"red"},children:[" ",d.mobile," "]})]}),(0,b.jsxs)(l.Z.Group,{className:"mb-2",controlId:"formBasicPassword",children:[(0,b.jsx)(l.Z.Control,{name:"password",onChange:function(r){return e.handleChange(r)},value:n.password,type:"password",placeholder:"Enter Password",required:!0}),(0,b.jsxs)("span",{type:"invalid",style:{color:"red"},children:[" ",d.password," "]})]}),(0,b.jsxs)(l.Z.Group,{className:"mt-2 d-flex justify-content-between forgot-password",controlId:"formBasicCheckbox",children:[(0,b.jsx)(l.Z.Check,{type:"checkbox",label:"Remember Me"}),(0,b.jsx)("a",{href:"",children:"Forgot Password?"})]}),(0,b.jsx)("div",{className:"login-button mb-0 mt-4",children:(0,b.jsx)(c.Z,{variant:"primary",type:"submit",children:"LOGIN"})})]}),(0,b.jsx)("div",{className:"login-button-mob mb-4 mt-0",children:(0,b.jsx)(c.Z,{variant:"primary",href:"/signup",children:"CREATE ACCOUNT"})})]})})]})})})}}])&&v(r.prototype,t),n&&v(r,n),Object.defineProperty(r,"prototype",{writable:!1}),m}(n.Component);r.default=(0,p.Z)((0,f.$j)((function(e){return{auth:e.auth,isLoggedIn:"isLoggedIn"in e.auth&&e.auth.isLoggedIn,loginError:"loginError"in e.auth?e.auth.loginError:""}}),(function(e){return{actions:(0,d.DE)({login:m.x4},e)}}))(P))},51876:function(e,r,t){r.Z=t.p+"assets/login.png"},63801:function(e,r,t){var n=t(60042),o=t.n(n),i=t(27378),s=t(46189),a=t(4708),l=t(95796),c=t(28398),u=t(187),d=t(55541),f=t(25284),p=t(66014),m=t(24246);const h=(0,f.Z)("h4");h.displayName="DivStyledAsH4";const b=(0,p.Z)("alert-heading",{Component:h}),g=(0,p.Z)("alert-link",{Component:l.Z}),y={variant:"primary",show:!0,transition:u.Z,closeLabel:"Close alert"},j=i.forwardRef(((e,r)=>{const{bsPrefix:t,show:n,closeLabel:i,closeVariant:l,className:f,children:p,variant:h,onClose:b,dismissible:g,transition:y,...j}=(0,s.Ch)(e,{show:"onClose"}),v=(0,c.vE)(t,"alert"),w=(0,a.Z)((e=>{b&&b(!1,e)})),x=!0===y?u.Z:y,O=(0,m.jsxs)("div",{role:"alert",...x?void 0:j,ref:r,className:o()(f,v,h&&`${v}-${h}`,g&&`${v}-dismissible`),children:[g&&(0,m.jsx)(d.Z,{onClick:w,"aria-label":i,variant:l}),p]});return x?(0,m.jsx)(x,{unmountOnExit:!0,...j,ref:void 0,in:n,children:O}):n?O:null}));j.displayName="Alert",j.defaultProps=y,r.Z=Object.assign(j,{Link:g,Heading:b})}}]);
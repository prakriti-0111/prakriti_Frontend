"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4209],{75149:function(e,s){s.Z=[{id:1,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"},{id:2,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Diamond",price:"1899",discount_price:"1099"},{id:3,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"},{id:4,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"},{id:5,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"}]},34209:function(e,s,n){n.r(s),n.d(s,{default:function(){return Ne}});var i=n(27378),r=n(80715),t=n(84741),a=n(13040),c=n(80754),l=n(53738),o=n(57231),d=n(57987),m=n(16835),h=n(98539),x=n(97595),j=n(87137),p=n(30081),u=n(49158),f=n(93494),g=n(25829),v=n(48602),b=n(82912),N=n(6017),Z=n(72034),y=n(32854),w=n(11605),E=n(85437),O=n(3413),P=n(68095),I=n(80292),S=n(50450),C=n(46886),T=n(67572),k=n(32040),R=n(4377),A=n(59298),G=n(90986),K=n(62209),_=n(18149),L=n(75149),B=(n(39886),n(42010)),V=n(23615),F=n.n(V),D=n(46189),M=n(6305),W=n(54865),q=n(97958),$=function({children:e,in:s,mountOnEnter:n,unmountOnExit:r}){const t=(0,i.useRef)(s);return(0,i.useEffect)((()=>{s&&(t.current=!0)}),[s]),s?e:r||!t.current&&n?null:e},z=n(24246);const H=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],J=["activeKey","getControlledId","getControllerId"],X=["as"];function Q(e,s){if(null==e)return{};var n,i,r={},t=Object.keys(e);for(i=0;i<t.length;i++)n=t[i],s.indexOf(n)>=0||(r[n]=e[n]);return r}function U(e){let{active:s,eventKey:n,mountOnEnter:r,transition:t,unmountOnExit:a,role:c="tabpanel",onEnter:l,onEntering:o,onEntered:d,onExit:m,onExiting:h,onExited:x}=e,j=Q(e,H);const p=(0,i.useContext)(W.Z);if(!p)return[Object.assign({},j,{role:c}),{eventKey:n,isActive:s,mountOnEnter:r,transition:t,unmountOnExit:a,onEnter:l,onEntering:o,onEntered:d,onExit:m,onExiting:h,onExited:x}];const{activeKey:u,getControlledId:f,getControllerId:g}=p,v=Q(p,J),b=(0,q.h)(n);return[Object.assign({},j,{role:c,id:f(n),"aria-labelledby":g(n)}),{eventKey:n,isActive:null==s&&null!=b?(0,q.h)(u)===b:s,transition:t||v.transition,mountOnEnter:null!=r?r:v.mountOnEnter,unmountOnExit:null!=a?a:v.unmountOnExit,onEnter:l,onEntering:o,onEntered:d,onExit:m,onExiting:h,onExited:x}]}const Y=i.forwardRef(((e,s)=>{let{as:n="div"}=e,i=Q(e,X);const[r,{isActive:t,onEnter:a,onEntering:c,onEntered:l,onExit:o,onExiting:d,onExited:m,mountOnEnter:h,unmountOnExit:x,transition:j=$}]=U(i);return(0,z.jsx)(W.Z.Provider,{value:null,children:(0,z.jsx)(q.Z.Provider,{value:null,children:(0,z.jsx)(j,{in:t,onEnter:a,onEntering:c,onEntered:l,onExit:o,onExiting:d,onExited:m,mountOnEnter:h,unmountOnExit:x,children:(0,z.jsx)(n,Object.assign({},r,{ref:s,hidden:!t,"aria-hidden":!t}))})})})}));Y.displayName="TabPanel";const ee=e=>{const{id:s,generateChildId:n,onSelect:r,activeKey:t,defaultActiveKey:a,transition:c,mountOnEnter:l,unmountOnExit:o,children:d}=e,[m,h]=(0,D.$c)(t,a,r),x=(0,M.gP)(s),j=(0,i.useMemo)((()=>n||((e,s)=>x?`${x}-${s}-${e}`:null)),[x,n]),p=(0,i.useMemo)((()=>({onSelect:h,activeKey:m,transition:c,mountOnEnter:l||!1,unmountOnExit:o||!1,getControlledId:e=>j(e,"tabpane"),getControllerId:e=>j(e,"tab")})),[h,m,c,l,o,j]);return(0,z.jsx)(W.Z.Provider,{value:p,children:(0,z.jsx)(q.Z.Provider,{value:h||null,children:d})})};ee.Panel=Y;var se=ee,ne=n(187);function ie(e){return"boolean"==typeof e?e?ne.Z:$:e}const re=({transition:e,...s})=>(0,z.jsx)(se,{...s,transition:ie(e)});re.displayName="TabContainer";var te=re,ae=(0,n(66014).Z)("tab-content"),ce=n(60042),le=n.n(ce),oe=n(28398);const de=i.forwardRef((({bsPrefix:e,transition:s,...n},i)=>{const[{className:r,as:t="div",...a},{isActive:c,onEnter:l,onEntering:o,onEntered:d,onExit:m,onExiting:h,onExited:x,mountOnEnter:j,unmountOnExit:p,transition:u=ne.Z}]=U({...n,transition:ie(s)}),f=(0,oe.vE)(e,"tab-pane");return(0,z.jsx)(W.Z.Provider,{value:null,children:(0,z.jsx)(q.Z.Provider,{value:null,children:(0,z.jsx)(u,{in:c,onEnter:l,onEntering:o,onEntered:d,onExit:m,onExiting:h,onExited:x,mountOnEnter:j,unmountOnExit:p,children:(0,z.jsx)(t,{...a,ref:i,className:le()(r,f,c&&"active")})})})})}));de.displayName="TabPane";var me=de;const he={eventKey:F().oneOfType([F().string,F().number]),title:F().node.isRequired,disabled:F().bool,tabClassName:F().string,tabAttrs:F().object},xe=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};xe.propTypes=he;var je=Object.assign(xe,{Container:te,Content:ae,Pane:me});function pe(e){return pe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},pe(e)}function ue(e,s){for(var n=0;n<s.length;n++){var i=s[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function fe(e,s){return fe=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,s){return e.__proto__=s,e},fe(e,s)}function ge(e,s){if(s&&("object"===pe(s)||"function"==typeof s))return s;if(void 0!==s)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function ve(e){return ve=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},ve(e)}var be=function(e){!function(e,s){if("function"!=typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(s&&s.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),s&&fe(e,s)}(V,e);var s,n,i,r,a=(i=V,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,s=ve(i);if(r){var n=ve(this).constructor;e=Reflect.construct(s,arguments,n)}else e=s.apply(this,arguments);return ge(this,e)});function V(e){var s;return function(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}(this,V),(s=a.call(this,e)).state={slider:L.Z},s}return s=V,(n=[{key:"render",value:function(){return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("section",{className:"banner",children:(0,z.jsxs)(t.Z,{children:[(0,z.jsx)(t.Z.Item,{children:(0,z.jsx)("div",{className:"slider-banner",children:(0,z.jsx)("img",{className:"d-block w-100",src:u.Z,alt:""})})}),(0,z.jsx)(t.Z.Item,{children:(0,z.jsx)("div",{className:"slider-banner",children:(0,z.jsx)("img",{className:"d-block w-100",src:f.Z,alt:""})})}),(0,z.jsx)(t.Z.Item,{children:(0,z.jsx)("div",{className:"slider-banner",children:(0,z.jsx)("img",{className:"d-block w-100",src:p.Z,alt:""})})})]})}),(0,z.jsx)("section",{className:"ornament-slider",children:(0,z.jsx)(c.Z,{children:(0,z.jsxs)(d.tq,{spaceBetween:10,slidesPerView:3,onSwiper:function(e){return console.log(e)},onSlideChange:function(){return console.log("slide change")},children:[(0,z.jsx)(d.o5,{children:(0,z.jsx)("div",{className:"ornament-image",children:(0,z.jsxs)(m.Z,{children:[(0,z.jsx)("img",{src:I.Z,alt:""}),(0,z.jsx)(m.Z.Toggle,{variant:"success",id:"dropdown-basic",children:(0,z.jsx)("h4",{children:"Rings"})}),(0,z.jsxs)(m.Z.Menu,{children:[(0,z.jsx)(m.Z.Item,{href:"#/action-1",children:"Action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-2",children:"Another action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-3",children:"Something else"})]})]})})}),(0,z.jsx)(d.o5,{children:(0,z.jsx)("div",{className:"ornament-image",children:(0,z.jsxs)(m.Z,{children:[(0,z.jsx)("img",{src:S.Z,alt:""}),(0,z.jsx)(m.Z.Toggle,{variant:"success",id:"dropdown-basic",children:(0,z.jsx)("h4",{children:"Pendants"})}),(0,z.jsxs)(m.Z.Menu,{children:[(0,z.jsx)(m.Z.Item,{href:"#/action-1",children:"Action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-2",children:"Another action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-3",children:"Something else"})]})]})})}),(0,z.jsx)(d.o5,{children:(0,z.jsx)("div",{className:"ornament-image",children:(0,z.jsxs)(m.Z,{children:[(0,z.jsx)("img",{src:C.Z,alt:""}),(0,z.jsx)(m.Z.Toggle,{variant:"success",id:"dropdown-basic",children:(0,z.jsx)("h4",{children:"Earrings"})}),(0,z.jsxs)(m.Z.Menu,{children:[(0,z.jsx)(m.Z.Item,{href:"#/action-1",children:"Action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-2",children:"Another action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-3",children:"Something else"})]})]})})}),(0,z.jsx)(d.o5,{children:(0,z.jsx)("div",{className:"ornament-image",children:(0,z.jsxs)(m.Z,{children:[(0,z.jsx)("img",{src:T.Z,alt:""}),(0,z.jsx)(m.Z.Toggle,{variant:"success",id:"dropdown-basic",children:(0,z.jsx)("h4",{children:"Gold Coins"})}),(0,z.jsxs)(m.Z.Menu,{children:[(0,z.jsx)(m.Z.Item,{href:"#/action-1",children:"Action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-2",children:"Another action"}),(0,z.jsx)(m.Z.Item,{href:"#/action-3",children:"Something else"})]})]})})})]})})}),(0,z.jsx)("section",{className:"diamond-offer",children:(0,z.jsx)(c.Z,{className:"diamond-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative",children:(0,z.jsxs)("div",{className:"offer-header",children:[(0,z.jsx)("h2",{children:"Diamond Rings at 30% OFF"}),(0,z.jsx)("a",{href:"",className:"shop-now",children:"Shop Now"})]})})}),(0,z.jsx)("section",{className:"earring-offer",children:(0,z.jsx)(c.Z,{className:"earring-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative",children:(0,z.jsxs)("div",{className:"earring-header",children:[(0,z.jsx)("h2",{children:"Earrings at 40% OFF at AXIS Bank Debit & Credit Cards"}),(0,z.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"}),(0,z.jsxs)("a",{href:"",className:"shop-now",children:["Explore ",(0,z.jsx)(x.TtW,{})]})]})})}),(0,z.jsx)("section",{className:"pendant-offer",children:(0,z.jsx)(c.Z,{className:"pendant-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative",children:(0,z.jsxs)("div",{className:"pendant-header",children:[(0,z.jsx)("h2",{children:"Get Beautiful Pendants at only ₹8999"}),(0,z.jsx)("a",{href:"",className:"shop-now",children:"Shop Now"})]})})}),(0,z.jsx)("section",{className:"affordable-earring",children:(0,z.jsx)(c.Z,{className:"affordable-earring-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative",children:(0,z.jsxs)("div",{className:"affordable-earring-header",children:[(0,z.jsx)("h2",{children:"Affordable Earrings at ₹9,999"}),(0,z.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."}),(0,z.jsxs)("a",{href:"",className:"shop-now",children:["Explore ",(0,z.jsx)(x.TtW,{})]})]})})}),(0,z.jsx)("section",{className:"selling-product",children:(0,z.jsxs)(c.Z,{children:[(0,z.jsx)("div",{className:"selling-product-header",children:(0,z.jsx)("h1",{children:"Best Selling Products"})}),(0,z.jsx)(d.tq,{spaceBetween:20,onSlideChange:function(){return console.log("slide change")},onSwiper:function(e){return console.log(e)},breakpoints:{320:{width:320,slidesPerView:2},768:{width:768,slidesPerView:2},1024:{width:1024,slidesPerView:3},1440:{width:1440,slidesPerView:4}},children:this.state.slider&&this.state.slider.map((function(e){return(0,z.jsxs)(d.o5,{children:[(0,z.jsxs)("div",{className:"s-slider-image",children:[(0,z.jsx)("img",{src:e.image,alt:"selling product"}),(0,z.jsx)("div",{className:"wishlist",children:(0,z.jsx)(h.kTx,{})})]}),(0,z.jsxs)("div",{className:"s-slider-content",children:[(0,z.jsx)("h2",{children:e.title}),(0,z.jsxs)("div",{className:"ring-price",children:[(0,z.jsxs)("span",{className:"offer-price",children:["  ",e.discount_price," "]}),(0,z.jsxs)("span",{className:"item-price",children:["   ",e.price]})]})]})]},e.id)}))})]})}),(0,z.jsx)("div",{className:"gap-100"}),(0,z.jsx)("section",{className:"feature-product",children:(0,z.jsxs)(c.Z,{children:[(0,z.jsx)("div",{className:"feature-product-header",children:(0,z.jsx)("h1",{children:"Featured Products"})}),(0,z.jsxs)(d.tq,{spaceBetween:20,onSlideChange:function(){return console.log("slide change")},onSwiper:function(e){return console.log(e)},breakpoints:{320:{width:320,slidesPerView:2},768:{width:768,slidesPerView:2},1024:{width:1024,slidesPerView:3},1440:{width:1440,slidesPerView:4}},children:[(0,z.jsxs)(d.o5,{children:[(0,z.jsxs)("div",{className:"s-slider-image",children:[(0,z.jsx)("img",{src:g.Z,alt:"feature product"}),(0,z.jsx)("div",{className:"wishlist",children:(0,z.jsx)(h.kTx,{})})]}),(0,z.jsxs)("div",{className:"s-slider-content",children:[(0,z.jsx)("h2",{children:"Gold Plated Ring"}),(0,z.jsxs)("div",{className:"ring-price",children:[(0,z.jsx)("span",{className:"offer-price",children:" ₹2999 "}),(0,z.jsx)("span",{className:"item-price",children:" ₹2999 "})]})]})]}),(0,z.jsxs)(d.o5,{children:[(0,z.jsxs)("div",{className:"s-slider-image",children:[(0,z.jsx)("img",{src:g.Z,alt:"selling product"}),(0,z.jsx)("div",{className:"wishlist",children:(0,z.jsx)(h.kTx,{})})]}),(0,z.jsxs)("div",{className:"s-slider-content",children:[(0,z.jsx)("h2",{children:"Gold Plated Ring"}),(0,z.jsxs)("div",{className:"ring-price",children:[(0,z.jsx)("span",{className:"offer-price",children:" ₹2999 "}),(0,z.jsx)("span",{className:"item-price",children:" ₹2999 "})]})]})]}),(0,z.jsxs)(d.o5,{children:[(0,z.jsxs)("div",{className:"s-slider-image",children:[(0,z.jsx)("img",{src:g.Z,alt:"selling product"}),(0,z.jsx)("div",{className:"wishlist",children:(0,z.jsx)(h.kTx,{})})]}),(0,z.jsxs)("div",{className:"s-slider-content",children:[(0,z.jsx)("h2",{children:"Gold Plated Ring"}),(0,z.jsxs)("div",{className:"ring-price",children:[(0,z.jsx)("span",{className:"offer-price",children:" ₹2999 "}),(0,z.jsx)("span",{className:"item-price",children:" ₹2999 "})]})]})]}),(0,z.jsxs)(d.o5,{children:[(0,z.jsx)("div",{className:"s-slider-image",children:(0,z.jsx)("img",{src:g.Z,alt:"selling product"})}),(0,z.jsxs)("div",{className:"s-slider-content",children:[(0,z.jsx)("h2",{children:"Gold Plated Ring"}),(0,z.jsxs)("div",{className:"ring-price",children:[(0,z.jsx)("span",{className:"offer-price",children:" ₹2999 "}),(0,z.jsx)("span",{className:"item-price",children:" ₹2999 "})]})]})]}),(0,z.jsxs)(d.o5,{children:[(0,z.jsx)("div",{className:"s-slider-image",children:(0,z.jsx)("img",{src:g.Z,alt:"selling product"})}),(0,z.jsxs)("div",{className:"s-slider-content",children:[(0,z.jsx)("h2",{children:"Gold Plated Ring"}),(0,z.jsxs)("div",{className:"ring-price",children:[(0,z.jsx)("span",{className:"offer-price",children:" ₹2999 "}),(0,z.jsx)("span",{className:"item-price",children:" ₹2999 "})]})]})]})]})]})}),(0,z.jsx)("section",{className:"blue-pearl mt-3 mb-3 mt-md-5 mb-md-5",children:(0,z.jsx)(c.Z,{children:(0,z.jsxs)(l.Z,{children:[(0,z.jsx)(o.Z,{xs:4,md:4,children:(0,z.jsx)("div",{className:"blue-pearl-image",children:(0,z.jsx)("img",{src:v.Z,alt:""})})}),(0,z.jsx)(o.Z,{xs:8,md:8,children:(0,z.jsxs)("div",{className:"blue-pearl-inner position-relative",children:[(0,z.jsx)("img",{src:b.Z,alt:""}),(0,z.jsxs)("div",{className:"blue-pearl-content",children:[(0,z.jsx)("h2",{children:"Pearl Blue Diamond Earring"}),(0,z.jsx)("p",{children:"₹9,726 only"})]})]})})]})})}),(0,z.jsx)("section",{className:"promise",children:(0,z.jsxs)(c.Z,{children:[(0,z.jsx)("h2",{className:"text-center",children:"Our Promise"}),(0,z.jsx)("div",{className:"gap-40"}),(0,z.jsxs)(l.Z,{children:[(0,z.jsx)(o.Z,{xs:12,md:4,children:(0,z.jsxs)("div",{className:"promise-box",children:[(0,z.jsx)("img",{src:N.Z,alt:""}),(0,z.jsx)("div",{className:"promise-content",children:(0,z.jsx)("h4",{className:"text-center",children:"100% Certified Gems & Jewelry"})})]})}),(0,z.jsx)(o.Z,{xs:12,md:4,children:(0,z.jsxs)("div",{className:"promise-box",children:[(0,z.jsx)("img",{src:Z.Z,alt:""}),(0,z.jsx)("div",{className:"promise-content",children:(0,z.jsx)("h4",{className:"text-center",children:"100% Refund Policy"})})]})}),(0,z.jsx)(o.Z,{xs:12,md:4,children:(0,z.jsxs)("div",{className:"promise-box",children:[(0,z.jsx)("img",{src:y.Z,alt:""}),(0,z.jsx)("div",{className:"promise-content",children:(0,z.jsx)("h4",{className:"text-center",children:"Exchange & Buyback Guarantee"})})]})}),(0,z.jsx)(o.Z,{xs:12,md:4,children:(0,z.jsxs)("div",{className:"promise-box",children:[(0,z.jsx)("img",{src:w.Z,alt:""}),(0,z.jsx)("div",{className:"promise-content",children:(0,z.jsx)("h4",{className:"text-center",children:"Free Delivery"})})]})}),(0,z.jsx)(o.Z,{xs:12,md:4,children:(0,z.jsxs)("div",{className:"promise-box",children:[(0,z.jsx)("img",{src:E.Z,alt:""}),(0,z.jsx)("div",{className:"promise-content",children:(0,z.jsx)("h4",{className:"text-center",children:"Genuine Price"})})]})}),(0,z.jsx)(o.Z,{xs:12,md:4,children:(0,z.jsxs)("div",{className:"promise-box",children:[(0,z.jsx)("img",{src:O.Z,alt:""}),(0,z.jsx)("div",{className:"promise-content",children:(0,z.jsx)("h4",{className:"text-center",children:"Near By Store"})})]})})]})]})}),(0,z.jsx)("div",{className:"gap-100"}),(0,z.jsxs)("section",{className:"browse-rings position-relative",children:[(0,z.jsx)(c.Z,{fluid:!0,children:(0,z.jsxs)(l.Z,{children:[(0,z.jsx)(o.Z,{xs:6,md:4,children:(0,z.jsxs)("div",{className:"browse-ring-header",children:[(0,z.jsx)("h3",{children:"Browse all Rings"}),(0,z.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."}),(0,z.jsxs)("a",{href:"",className:"browse-now",children:["Explore ",(0,z.jsx)(x.TtW,{})]})]})}),(0,z.jsx)(o.Z,{xs:6,md:8})]})}),(0,z.jsx)("div",{className:"browse-rings-banner",children:(0,z.jsx)("img",{src:P.Z,alt:""})})]}),(0,z.jsx)("section",{className:"reviews",children:(0,z.jsxs)(c.Z,{children:[(0,z.jsx)("div",{className:"review-header",children:(0,z.jsx)("h3",{className:"text-center",children:"Our Reviews"})}),(0,z.jsx)(l.Z,{children:(0,z.jsx)(o.Z,{md:12,children:(0,z.jsx)(d.tq,{spaceBetween:0,slidesPerView:1,navigation:{clickable:!0},onSwiper:function(e){return console.log(e)},onSlideChange:function(){return console.log("slide change")},children:(0,z.jsxs)(d.o5,{className:"position-relative",children:[(0,z.jsxs)("div",{className:"client-area",children:[(0,z.jsxs)("div",{className:"client-content",children:[(0,z.jsx)("div",{className:"c-image",children:(0,z.jsx)("img",{src:k.Z,alt:""})}),(0,z.jsxs)("div",{className:"c-content",children:[(0,z.jsx)("h5",{children:"Maria Sarapavoo"}),(0,z.jsx)("h6",{children:"Senior Designer"})]})]}),(0,z.jsx)("p",{children:"The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using letters Ipsum is that it has a more-or-less normal distribution of letter."})]}),(0,z.jsx)("div",{className:"review-mark",children:(0,z.jsx)("img",{src:R.Z,alt:""})})]})})})})]})}),(0,z.jsx)("section",{className:"ratn-banner",children:(0,z.jsx)(c.Z,{children:(0,z.jsxs)("div",{className:"ratn-banner-image position-relative",children:[(0,z.jsx)("img",{src:A.Z,alt:""}),(0,z.jsxs)("div",{className:"banner-overlay",children:[(0,z.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"}),(0,z.jsx)("a",{href:"",className:"learn-more",children:"Learn More"})]})]})})}),(0,z.jsx)("section",{className:"address-map",children:(0,z.jsxs)(c.Z,{children:[(0,z.jsxs)("div",{className:"review-header",children:[(0,z.jsx)("h3",{className:"text-center",children:"The Prakriti Store"}),(0,z.jsx)("p",{children:"Our stores are cool and contemporary spaces that offer an immersive jewellery browsing and shopping experience, and encourage you to linger as long as you like."})]}),(0,z.jsx)(je.Container,{id:"left-tabs-example",defaultActiveKey:"first",children:(0,z.jsxs)(l.Z,{children:[(0,z.jsx)(o.Z,{sm:3,children:(0,z.jsxs)(B.Z,{variant:"pills",className:"flex-column",children:[(0,z.jsx)(B.Z.Item,{children:(0,z.jsx)(B.Z.Link,{eventKey:"first",children:"Patna"})}),(0,z.jsx)(B.Z.Item,{children:(0,z.jsx)(B.Z.Link,{eventKey:"second",children:"Kolkata"})})]})}),(0,z.jsx)(o.Z,{sm:9,children:(0,z.jsxs)(je.Content,{children:[(0,z.jsxs)(je.Pane,{eventKey:"first",children:[(0,z.jsxs)("div",{className:"map-wrapper-list",children:[(0,z.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin",width:"100%",height:"400",loading:"lazy"}),(0,z.jsxs)("div",{className:"list-wrapper",children:[(0,z.jsxs)("div",{className:"list-name",children:[(0,z.jsx)("h1",{children:" Shivranjani, Ahmedabad"}),(0,z.jsx)("p",{children:" Shop No G1,G2, Satguru Complex, Ground Floor, Shivranjani Cross Road, Satellite"})]}),(0,z.jsxs)("div",{className:"list-name",children:[(0,z.jsx)("p",{children:"  Store timings: 11am to 9pm "}),(0,z.jsx)("p",{children:"   Contact Number: 8976878928"})]}),(0,z.jsx)("div",{className:"list-name margin-right",children:(0,z.jsx)(j.Z,{variant:"primary",children:"GET DIRECTION"})})]})]}),(0,z.jsx)("div",{className:"map-wrapper-list",children:(0,z.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin",width:"100%",height:"400",loading:"lazy"})})]}),(0,z.jsx)(je.Pane,{eventKey:"second",children:(0,z.jsx)("div",{className:"map-wrapper-list",children:(0,z.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin",width:"100%",height:"400",loading:"lazy"})})})]})})]})})]})}),(0,z.jsx)("section",{className:"socialmedia-wrapper",children:(0,z.jsx)(c.Z,{children:(0,z.jsxs)("div",{className:"social-container-wrapper",children:[(0,z.jsxs)("div",{className:"social-single-container",children:[(0,z.jsxs)("div",{className:"social-single-header",children:[(0,z.jsx)("img",{src:K.Z,alt:""}),(0,z.jsx)("h4",{children:"Facebook"})]}),(0,z.jsx)("img",{src:G.Z,className:"fb_bg",alt:""})]}),(0,z.jsxs)("div",{className:"social-single-container",children:[(0,z.jsxs)("div",{className:"social-single-header",children:[(0,z.jsx)("img",{src:_.Z,alt:""}),(0,z.jsx)("h4",{children:"Instagram"})]}),(0,z.jsxs)("ul",{className:"social-info",children:[(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{}),(0,z.jsx)("li",{})]})]})]})})})]})}}])&&ue(s.prototype,n),Object.defineProperty(s,"prototype",{writable:!1}),V}(i.Component),Ne=(0,a.Z)((0,r.$j)((function(e){return{}}),(function(e){return{}}))(be))},59298:function(e,s,n){s.Z=n.p+"assets/banner.png"},30081:function(e,s,n){s.Z=n.p+"assets/banner1.png"},49158:function(e,s,n){s.Z=n.p+"assets/banner2.png"},93494:function(e,s,n){s.Z=n.p+"assets/banner3.png"},6017:function(e,s,n){s.Z=n.p+"assets/certificate.png"},32040:function(e,s,n){s.Z=n.p+"assets/client.png"},32854:function(e,s,n){s.Z=n.p+"assets/exchange.png"},62209:function(e,s,n){s.Z=n.p+"assets/facebook.png"},90986:function(e,s,n){s.Z=n.p+"assets/fb_bg.png"},18149:function(e,s,n){s.Z=n.p+"assets/insta.png"},85437:function(e,s,n){s.Z=n.p+"assets/jewelleryHome.png"},82912:function(e,s,n){s.Z=n.p+"assets/pearl-blue-earring.png"},48602:function(e,s,n){s.Z=n.p+"assets/pearl-blue.png"},3413:function(e,s,n){s.Z=n.p+"assets/physicalStore.png"},72034:function(e,s,n){s.Z=n.p+"assets/refund.png"},4377:function(e,s,n){s.Z=n.p+"assets/review-mark.png"},80292:function(e,s,n){s.Z=n.p+"assets/ring.png"},50450:function(e,s,n){s.Z=n.p+"assets/ring2.png"},46886:function(e,s,n){s.Z=n.p+"assets/ring3.png"},67572:function(e,s,n){s.Z=n.p+"assets/ring4.png"},68095:function(e,s,n){s.Z=n.p+"assets/rings.png"},25829:function(e,s,n){s.Z=n.p+"assets/s-product-1.png"},11605:function(e,s,n){s.Z=n.p+"assets/shipping.png"}}]);
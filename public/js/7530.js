"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7530],{7530:(e,s,i)=>{i.r(s),i.d(s,{default:()=>u}),i(63696);var a=i(81660),r=i(8427),t=i(47452),n=i(10890),o=i(58260),d=i(99304),c=i(86032),l=i(8590),m=i(62540);const u=()=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"support-wrapper",children:[(0,m.jsxs)("div",{className:"mobile-checkout-header mb-4",children:[(0,m.jsx)(l.rBg,{})," ",(0,m.jsx)("h3",{children:"Order Summary"})]}),(0,m.jsx)(a.A,{children:(0,m.jsxs)("div",{className:"support-content",children:[(0,m.jsx)("h4",{className:"mb-3",children:"How can we help you?"}),(0,m.jsxs)(t.A,{className:"",children:[(0,m.jsx)(r.A.Control,{placeholder:"Search anything for help...","aria-label":"Search anything for help...","aria-describedby":"basic-addon2"}),(0,m.jsx)(t.A.Text,{id:"basic-addon2",children:(0,m.jsx)(o.Jru,{})})]})]})})]}),(0,m.jsxs)("div",{className:"support-contact",children:[(0,m.jsx)("p",{children:"For any Queries Conatct Us @ "}),(0,m.jsxs)("p",{children:[(0,m.jsx)(d.dRU,{})," +91-7827293791 "]}),(0,m.jsxs)("p",{children:[(0,m.jsx)(c.mm2,{})," customer.support@prakriti.one "]})]}),(0,m.jsx)("div",{className:"faq-wrapper",children:(0,m.jsxs)(a.A,{children:[(0,m.jsx)("div",{className:"faq-header mt-5",children:(0,m.jsx)("h4",{children:"FAQs"})}),(0,m.jsxs)(n.A,{children:[(0,m.jsxs)(n.A.Item,{eventKey:"0",children:[(0,m.jsx)(n.A.Header,{children:"What is estimated delivery time?"}),(0,m.jsx)(n.A.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]}),(0,m.jsxs)(n.A.Item,{eventKey:"1",children:[(0,m.jsx)(n.A.Header,{children:"What is estimated delivery time?"}),(0,m.jsx)(n.A.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]}),(0,m.jsxs)(n.A.Item,{eventKey:"2",children:[(0,m.jsx)(n.A.Header,{children:"What is estimated delivery time?"}),(0,m.jsx)(n.A.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]}),(0,m.jsxs)(n.A.Item,{eventKey:"3",children:[(0,m.jsx)(n.A.Header,{children:"What is estimated delivery time?"}),(0,m.jsx)(n.A.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]}),(0,m.jsxs)(n.A.Item,{eventKey:"4",children:[(0,m.jsx)(n.A.Header,{children:"What is estimated delivery time?"}),(0,m.jsx)(n.A.Body,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."})]})]})]})})]})},10890:(e,s,i)=>{i.d(s,{A:()=>g});var a=i(71633),r=i.n(a),t=i(63696),n=i(61898),o=i(71971),d=i(63355);function c(e,s){return Array.isArray(e)?e.includes(s):e===s}const l=t.createContext({});l.displayName="AccordionContext";const m=l;var u=i(62540);const h=t.forwardRef((({as:e="div",bsPrefix:s,className:i,children:a,eventKey:n,...l},h)=>{const{activeEventKey:x}=(0,t.useContext)(m);return s=(0,o.oU)(s,"accordion-collapse"),(0,u.jsx)(d.A,{ref:h,in:c(x,n),...l,className:r()(i,s),children:(0,u.jsx)(e,{children:t.Children.only(a)})})}));h.displayName="AccordionCollapse";const x=h,p=t.createContext({eventKey:""});p.displayName="AccordionItemContext";const y=p,j=t.forwardRef((({as:e="div",bsPrefix:s,className:i,...a},n)=>{s=(0,o.oU)(s,"accordion-body");const{eventKey:d}=(0,t.useContext)(y);return(0,u.jsx)(x,{eventKey:d,children:(0,u.jsx)(e,{ref:n,...a,className:r()(i,s)})})}));j.displayName="AccordionBody";const v=j,f=t.forwardRef((({as:e="button",bsPrefix:s,className:i,onClick:a,...n},d)=>{s=(0,o.oU)(s,"accordion-button");const{eventKey:l}=(0,t.useContext)(y),h=function(e,s){const{activeEventKey:i,onSelect:a,alwaysOpen:r}=(0,t.useContext)(m);return t=>{let n=e===i?null:e;r&&(n=Array.isArray(i)?i.includes(e)?i.filter((s=>s!==e)):[...i,e]:[e]),null==a||a(n,t),null==s||s(t)}}(l,a),{activeEventKey:x}=(0,t.useContext)(m);return"button"===e&&(n.type="button"),(0,u.jsx)(e,{ref:d,onClick:h,...n,"aria-expanded":l===x,className:r()(i,s,!c(x,l)&&"collapsed")})}));f.displayName="AccordionButton";const A=f,N=t.forwardRef((({as:e="h2",bsPrefix:s,className:i,children:a,onClick:t,...n},d)=>(s=(0,o.oU)(s,"accordion-header"),(0,u.jsx)(e,{ref:d,...n,className:r()(i,s),children:(0,u.jsx)(A,{onClick:t,children:a})}))));N.displayName="AccordionHeader";const b=N,C=t.forwardRef((({as:e="div",bsPrefix:s,className:i,eventKey:a,...n},d)=>{s=(0,o.oU)(s,"accordion-item");const c=(0,t.useMemo)((()=>({eventKey:a})),[a]);return(0,u.jsx)(y.Provider,{value:c,children:(0,u.jsx)(e,{ref:d,...n,className:r()(i,s)})})}));C.displayName="AccordionItem";const K=C,w=t.forwardRef(((e,s)=>{const{as:i="div",activeKey:a,bsPrefix:d,className:c,onSelect:l,flush:h,alwaysOpen:x,...p}=(0,n.Zw)(e,{activeKey:"onSelect"}),y=(0,o.oU)(d,"accordion"),j=(0,t.useMemo)((()=>({activeEventKey:a,onSelect:l,alwaysOpen:x})),[a,l,x]);return(0,u.jsx)(m.Provider,{value:j,children:(0,u.jsx)(i,{ref:s,...p,className:r()(c,y,h&&`${y}-flush`)})})}));w.displayName="Accordion";const g=Object.assign(w,{Button:A,Collapse:x,Item:K,Header:b,Body:v})}}]);
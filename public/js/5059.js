"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5059],{10521:(e,s,t)=>{t.d(s,{F9:()=>l,QR:()=>d,VM:()=>o,jE:()=>n,kQ:()=>h,v7:()=>c});var a=t(80325),r=t(17942),i=t(45892);const n=e=>s=>{a.A.post("/customer/place-order",e).then((e=>{s({type:r.VN,payload:e.data})})).catch((e=>{}))},l=e=>(e=(0,i.x0)(e,!0),s=>{a.A.get("/customer/orders".concat(e)).then((e=>{e.data.success&&s({type:r.YE,payload:e.data.data})})).catch((e=>{}))}),d=e=>s=>{a.A.post("/customer/cancel-order",e).then((e=>{e.data.success&&s({type:r.jh,payload:e.data})})).catch((e=>{}))},c=e=>a.A.get("/customer/orders?order_id=".concat(e)),h=(e,s)=>a.A.post("/customer/return-request/".concat(e),s),o=e=>a.A.post("/customer/cancel-order",e)},57723:(e,s,t)=>{t.d(s,{KC:()=>i,jj:()=>c,x3:()=>d,y5:()=>n,yg:()=>l});var a=t(80325),r=t(45892);const i=e=>((0,r.Gv)(e)||(e={slug:e}),e.cookie_id=(0,r.Yt)(),e=(0,r.x0)(e,!0),a.A.get("/customer/product".concat(e))),n=e=>(e=(0,r.x0)(e,!0),a.A.get("/customer/product".concat(e))),l=async e=>((0,r.Gv)(e)||(e={slug:e}),e.cookie_id=(0,r.Yt)(),e=(0,r.x0)(e,!0),await a.A.get("/customer/product/view".concat(e))),d=async e=>await a.A.post("/customer/reviews/store",e),c=async e=>(e=(0,r.x0)(e,!0),await a.A.get("/customer/reviews".concat(e)))},55059:(e,s,t)=>{t.r(s),t.d(s,{default:()=>S});var a=t(63696),r=t(81660),i=t(49348),n=t(19211),l=t(99101),d=t(26692),c=t(8427),h=t(95851),o=t(22187),m=t(4295),x=(t(6045),t(13031),t(36054),t(10521)),u=t(57723),p=t(72446),j=t(50977),v=t(80249),g=t(5908),_=t(60552),A=t(35927),y=t(27397),w=t(45892),N=t(62540);function b(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}class C extends a.Component{constructor(e){super(e),b(this,"loadOrder",(()=>{this.props.actions.OrderList({order_id:this.props.params.id})})),b(this,"handleRateReview",(e=>{this.setState({reviewProduct:e,reviewDialog:!0})})),b(this,"handleReviewClose",(()=>{this.setState({reviewProduct:null,reviewDialog:!1})})),b(this,"onPointerMove",(e=>{this.setState({rating:e})})),b(this,"onReviewSubmit",(async()=>{if(this.state.rating){this.setState({processing:!0,rating_err:""});let e={review:this.state.review,rating:this.state.rating,product_id:this.state.reviewProduct.product_id},s=await(0,u.x3)(e);s.data.success?(y.oR.success(s.data.message),this.setState({processing:!1,reviewDialog:!1}),this.loadOrder()):(y.oR.error(s.data.message),this.setState({processing:!1}))}else this.setState({rating_err:"Required"})})),b(this,"handleCancel",(()=>{this.setState({cancelDialog:!0})})),b(this,"handleCancelClose",(()=>{this.setState({cancelDialog:!1})})),b(this,"handleCancelSubmit",(async()=>{let e=this.state.items.length?this.state.items[0]:null;if(this.isEmptyOrSpaces(this.state.reason))this.setState({reason_err:"Please write valid reason."});else{this.setState({reason_err:"",processing:!0});let s=await(0,x.VM)({order_id:e.id,cancel_reason:this.state.reason});s.data.success?(y.oR.success(s.data.message),this.setState({processing:!1,cancelDialog:!1}),this.loadOrder()):(y.oR.error(s.data.message),this.setState({processing:!1}))}})),b(this,"handleReturn",(()=>{let e=this.state.items.length?this.state.items[0]:null;this.props.navigate("/order-return/"+e.id)})),b(this,"handleReturnClose",(()=>{this.setState({returnDialog:!1})})),b(this,"handleReturnSubmit",(async()=>{let e=this.state.items.length?this.state.items[0]:null;if(this.isEmptyOrSpaces(this.state.reason))this.setState({reason_err:"Please write valid reason."});else{this.setState({reason_err:"",processing:!0});let s=await(0,x.kQ)(e.id,{notes:this.state.reason});s.data.success?(y.oR.success(s.data.message),this.setState({processing:!1,returnDialog:!1}),this.loadOrder()):(y.oR.error(s.data.message),this.setState({processing:!1}))}})),this.state={items:this.props.items,loading:!0,reviewProduct:null,reviewDialog:!1,rating:0,review:"",rating_err:"",processing:!1,reason:"",reason_err:"",returnDialog:!1,cancelDialog:!1}}componentDidMount(){this.loadOrder()}componentDidUpdate(e){e.params.id!=this.props.params.id&&this.loadOrder()}static getDerivedStateFromProps(e,s){let t={};return e.items!==s.items&&(t.items=e.items,t.loading=!1),t}isEmptyOrSpaces(e){return null===e||null!==e.match(/^ *$/)}render(){let e=this.state.items.length?this.state.items[0]:null;return(0,N.jsxs)(N.Fragment,{children:[this.state.loading?(0,N.jsx)(p.A,{}):(0,N.jsx)(N.Fragment,{children:e?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)("div",{className:"order-summary-wrapper desktop-summary-wrapper",children:(0,N.jsxs)(r.A,{children:[(0,N.jsxs)(m.A,{children:[(0,N.jsx)(m.A.Item,{href:"/",children:"My Account"}),(0,N.jsx)(m.A.Item,{href:"/orders",children:"My Orders"}),(0,N.jsx)(m.A.Item,{active:!0,children:"Order Summary"})]}),(0,N.jsxs)(n.A,{children:[(0,N.jsx)(l.A,{xs:12,md:8,children:(0,N.jsxs)("div",{className:"summary-content",children:[(0,N.jsxs)("h2",{className:"mb-1",children:[" #",e.order_no]}),(0,N.jsxs)("div",{className:"item-wrapper",children:[(0,N.jsx)("div",{className:"underline-hr"}),e.orderProducts.map(((e,s)=>(0,N.jsxs)("div",{className:"list-header",children:[(0,N.jsx)("div",{className:"item-header",children:(0,N.jsxs)("div",{className:"header-item-img d-flex gap-2",children:[(0,N.jsx)("span",{children:(0,N.jsx)("img",{src:e.image,alt:""})}),(0,N.jsxs)("span",{children:[(0,N.jsx)("h3",{children:(0,N.jsx)(i.N_,{to:"/products/"+e.product_slug,children:e.product_name})}),e.materials.map(((e,s)=>(0,N.jsxs)("h4",{children:[e.material_name,": ",e.quantity>0?e.quantity+" "+e.material_name+", ":""," ",e.purity_name,", ",e.weight," ",e.unit_name]},s))),(0,N.jsxs)("h5",{children:["Size: ",e.size_name]})]})]})}),(0,N.jsxs)("div",{className:"qty-header",children:[e.quantity," item(s)"]}),(0,N.jsxs)("div",{className:"price-header",children:[(0,N.jsx)("h3",{children:e.rate}),e.have_review?null:(0,N.jsx)("h6",{className:"rate_review",onClick:()=>this.handleRateReview(e),children:"Rate & Review"})]})]},s))),(0,N.jsxs)("div",{className:"header-price",children:[(0,N.jsxs)("ul",{children:[(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Sub Total"}),(0,N.jsx)("span",{children:e.sub_total})]}),e.promocode?(0,N.jsxs)("li",{children:[(0,N.jsxs)("span",{children:["Voucher code (",e.promocode,")"]}),(0,N.jsx)("span",{children:e.promocode_discount_display})]}):null,e.discount_amount?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Discount"}),(0,N.jsx)("span",{children:e.discount_amount})]}):null]}),(0,N.jsx)("div",{className:"underline-hr"}),(0,N.jsxs)("ul",{children:[(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Total"}),(0,N.jsx)("span",{children:e.total_amount})]}),e.paid_amount>0?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Paid Amount"}),(0,N.jsx)("span",{children:(0,w.Pt)(e.paid_amount)})]}):null]})]})]})]})}),(0,N.jsx)(l.A,{xs:12,sm:12,md:4,children:(0,N.jsx)("div",{className:"summary-content-right mb-4",children:(0,N.jsxs)("ul",{children:[(0,N.jsx)("li",{children:(0,N.jsx)("h5",{children:(0,N.jsx)("b",{children:e.status_display})})}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Name"}),(0,N.jsx)("span",{children:e.customer_name})]}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Ship to: "}),(0,N.jsx)("span",{children:e.delivery_address})]}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Payment Mode: "}),(0,N.jsx)("span",{children:e.payment_mode})]}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Date Ordered: "}),(0,N.jsx)("span",{children:e.order_date})]}),"delivered"==e.status?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Delivery Date: "}),(0,N.jsx)("span",{children:e.delivered_at})]}):null,"delivered"!=e.status&&"cancelled"!=e.status&&"return_request"!=e.status&&"picked_up"!=e.status?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Expected Delivery Date: "}),(0,N.jsx)("span",{children:e.expected_delivery_date})]}):null,(0,w.Im)(e.notes)?null:(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Notes: "}),(0,N.jsx)("span",{children:e.notes})]}),(0,w.Im)(e.image)?null:(0,N.jsxs)("li",{className:"image_link",children:[(0,N.jsx)("span",{children:"Image: "}),(0,N.jsx)("span",{children:(0,N.jsx)("a",{href:e.image,target:"_blank",children:"Click here"})})]}),"delivered"==e.status?(0,N.jsx)("li",{className:"place-order-button mt-4",children:(0,N.jsx)(o.A,{variant:"primary",className:"dark_button",onClick:this.handleReturn,children:"Return"})}):null,"pending"==e.status||"accepted"==e.status||"shipped"==e.status||"out_for_delivery"==e.status?(0,N.jsx)("li",{className:"place-order-button mt-4",children:(0,N.jsx)(o.A,{variant:"primary",className:"dark_button",onClick:this.handleCancel,children:"Cancel"})}):null]})})})]})]})}),(0,N.jsx)("div",{className:"order-summary-wrapper mobile-summary-wrapper",children:(0,N.jsxs)(r.A,{children:[(0,N.jsxs)(m.A,{children:[(0,N.jsx)(m.A.Item,{href:"/",children:"My Account"}),(0,N.jsx)(m.A.Item,{href:"/orders",children:"My Orders"}),(0,N.jsx)(m.A.Item,{active:!0,children:"Order Summary"})]}),(0,N.jsx)(n.A,{children:(0,N.jsx)(l.A,{xs:12,sm:12,md:8,children:(0,N.jsxs)("div",{className:"summary-content",children:[(0,N.jsxs)("h2",{className:"mb-2",children:["#",e.order_no]}),(0,N.jsx)("div",{className:"summary-content-right mb-2",children:(0,N.jsxs)("ul",{children:[(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Name"}),(0,N.jsx)("span",{children:e.customer_name})]}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Ship to"}),(0,N.jsx)("span",{children:e.delivery_address})]}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Payment Mode"}),(0,N.jsx)("span",{children:e.payment_mode})]}),(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Date Ordered"}),(0,N.jsx)("span",{children:e.order_date})]}),"delivered"==e.status?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Delivery Date: "}),(0,N.jsx)("span",{children:e.delivered_at})]}):null,"delivered"!=e.status&&"cancelled"!=e.status&&"return_request"!=e.status&&"picked_up"!=e.status?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Expected Delivery Date: "}),(0,N.jsx)("span",{children:e.expected_delivery_date})]}):null]})}),(0,N.jsx)("div",{className:"underline-hr"}),(0,N.jsxs)("div",{className:"item-wrapper",children:[(0,N.jsx)("h3",{children:"ITEMS"}),e.orderProducts.map(((e,s)=>(0,N.jsxs)("div",{className:"header-item-img",children:[(0,N.jsx)("span",{children:(0,N.jsx)("img",{src:e.image,alt:""})}),(0,N.jsxs)("span",{children:[(0,N.jsxs)("h3",{children:[(0,N.jsx)(i.N_,{to:"/products/"+e.product_slug,children:e.product_name})," ",(0,N.jsxs)("span",{className:"float-right",children:[e.quantity," item(s)"]})]}),e.materials.map(((e,s)=>(0,N.jsxs)("h4",{children:[e.material_name,": ",e.quantity>0?e.quantity+" "+e.material_name+", ":""," ",e.purity_name,", ",e.weight," ",e.unit_name]},s))),(0,N.jsxs)("span",{className:"s-footer-price",children:[e.size_name?(0,N.jsxs)("h4",{children:["Size: ",e.size_name]}):null,(0,N.jsx)("h5",{children:e.rate}),e.have_review?null:(0,N.jsx)("h6",{className:"rate_review",onClick:()=>this.handleRateReview(e),children:"Rate & Review"})]})]})]},s)))]}),(0,N.jsxs)("div",{className:"item-wrapper",children:[(0,N.jsx)("div",{className:"underline-hr"}),(0,N.jsxs)("div",{className:"header-price",children:[(0,N.jsxs)("ul",{children:[(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Sub Total"}),(0,N.jsx)("span",{children:e.sub_total})]}),e.promocode?(0,N.jsxs)("li",{children:[(0,N.jsxs)("span",{children:["Voucher code (",e.promocode,")"]}),(0,N.jsx)("span",{children:e.promocode_discount_display})]}):null,e.discount_amount?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Discount"}),(0,N.jsx)("span",{children:e.discount_amount})]}):null,e.promocode?(0,N.jsxs)("li",{children:[(0,N.jsxs)("span",{children:["Voucher code (",e.promocode,")"]}),(0,N.jsx)("span",{children:e.promocode_discount_display})]}):null]}),(0,N.jsx)("div",{className:"underline-hr"}),(0,N.jsxs)("ul",{children:[(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Total"}),(0,N.jsx)("span",{children:e.total_amount})]}),e.paid_amount>0?(0,N.jsxs)("li",{children:[(0,N.jsx)("span",{children:"Paid Amount"}),(0,N.jsx)("span",{children:(0,w.Pt)(e.paid_amount)})]}):null,"delivered"==e.status?(0,N.jsx)("li",{className:"place-order-button mt-4",children:(0,N.jsx)(o.A,{variant:"primary",className:"dark_button",onClick:this.handleReturn,children:"Return"})}):null,"pending"==e.status||"accepted"==e.status||"shipped"==e.status||"out_for_delivery"==e.status?(0,N.jsx)("li",{className:"place-order-button mt-4",children:(0,N.jsx)(o.A,{variant:"primary",className:"dark_button",onClick:this.handleCancel,children:"Cancel"})}):null]})]})]})]})})})]})})]}):(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)("div",{className:"no-product",children:[(0,N.jsx)("img",{src:_.A,alt:""}),(0,N.jsx)("h1",{className:"mb-0",children:"Order Not Found"})]})})}),(0,N.jsxs)(d.A,{show:this.state.reviewDialog,onHide:this.handleReviewClose,backdrop:"static",keyboard:!1,children:[(0,N.jsx)(d.A.Header,{closeButton:!0,children:(0,N.jsx)(d.A.Title,{children:"Rate & Review"})}),(0,N.jsx)(d.A.Body,{children:(0,N.jsxs)(n.A,{children:[(0,N.jsx)(l.A,{xs:12,md:12,children:(0,N.jsxs)(c.A.Group,{children:[(0,N.jsx)(c.A.Label,{children:"Rate this product"}),(0,N.jsx)("div",{className:this.state.rating_err?"is-invalid":"",children:(0,N.jsx)(A.G,{onPointerMove:this.onPointerMove})}),(0,N.jsx)(c.A.Control.Feedback,{type:"invalid",children:"Please rate."})]})}),(0,N.jsx)(l.A,{xs:12,md:12,className:"mt-3",children:(0,N.jsx)(c.A.Group,{children:(0,N.jsx)(h.A,{controlId:"floatingTextarea2",label:"Description",children:(0,N.jsx)(c.A.Control,{as:"textarea",style:{height:"100px"},onChange:e=>this.setState({review:e.target.value})})})})})]})}),(0,N.jsxs)(d.A.Footer,{children:[(0,N.jsx)(o.A,{variant:"secondary",onClick:this.handleReviewClose,children:"Close"}),(0,N.jsx)(o.A,{variant:"primary",onClick:this.onReviewSubmit,disabled:this.state.processing,children:"Submit"})]})]}),(0,N.jsxs)(d.A,{show:this.state.returnDialog,onHide:this.handleReturnClose,backdrop:"static",keyboard:!1,children:[(0,N.jsx)(d.A.Header,{closeButton:!0,children:(0,N.jsx)(d.A.Title,{children:"Return Order"})}),(0,N.jsx)(d.A.Body,{children:(0,N.jsx)(n.A,{children:(0,N.jsx)(l.A,{xs:12,md:12,className:"mt-3",children:(0,N.jsxs)(c.A.Group,{children:[(0,N.jsx)(h.A,{controlId:"floatingTextarea3",label:"Reason",className:this.state.reason_err?"is-invalid":"",children:(0,N.jsx)(c.A.Control,{as:"textarea",style:{height:"100px"},onChange:e=>this.setState({reason:e.target.value})})}),(0,N.jsx)(c.A.Control.Feedback,{type:"invalid",children:this.state.reason_err})]})})})}),(0,N.jsxs)(d.A.Footer,{children:[(0,N.jsx)(o.A,{variant:"secondary",onClick:this.handleReturnClose,children:"Close"}),(0,N.jsx)(o.A,{variant:"primary",onClick:this.handleReturnSubmit,disabled:this.state.processing,children:"Submit"})]})]}),(0,N.jsxs)(d.A,{show:this.state.cancelDialog,onHide:this.handleCancelClose,backdrop:"static",keyboard:!1,children:[(0,N.jsx)(d.A.Header,{closeButton:!0,children:(0,N.jsx)(d.A.Title,{children:"Cancel Order"})}),(0,N.jsx)(d.A.Body,{children:(0,N.jsxs)(n.A,{children:[(0,N.jsx)(l.A,{xs:12,md:12,className:"mt-3",children:"Are you sure want to cancel this order?"}),(0,N.jsx)(l.A,{xs:12,md:12,className:"mt-3",children:(0,N.jsxs)(c.A.Group,{children:[(0,N.jsx)(h.A,{controlId:"floatingTextarea3",label:"Reason",className:this.state.reason_err?"is-invalid":"",children:(0,N.jsx)(c.A.Control,{as:"textarea",style:{height:"100px"},onChange:e=>this.setState({reason:e.target.value})})}),(0,N.jsx)(c.A.Control.Feedback,{type:"invalid",children:this.state.reason_err})]})})]})}),(0,N.jsxs)(d.A.Footer,{children:[(0,N.jsx)(o.A,{variant:"secondary",onClick:this.handleCancelClose,children:"Close"}),(0,N.jsx)(o.A,{variant:"primary",onClick:this.handleCancelSubmit,disabled:this.state.processing,children:"Submit"})]})]})]})}}const S=(0,j.A)((0,v.Ng)((e=>({items:e.customer.order.items})),(e=>({dispatch:e,actions:(0,g.zH)({OrderList:x.F9},e)})))(C))},6045:(e,s,t)=>{t.p},36054:(e,s,t)=>{t.p},60552:(e,s,t)=>{t.d(s,{A:()=>a});const a=t.p+"assets/no-product.png"},13031:(e,s,t)=>{t.d(s,{A:()=>a});const a=t.p+"assets/order-item.png"}}]);
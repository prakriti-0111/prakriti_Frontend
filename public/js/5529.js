"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5529],{57723:(e,s,i)=>{i.d(s,{KC:()=>l,jj:()=>d,x3:()=>c,y5:()=>t,yg:()=>n});var a=i(80325),r=i(45892);const l=e=>((0,r.Gv)(e)||(e={slug:e}),e.cookie_id=(0,r.Yt)(),e=(0,r.x0)(e,!0),a.A.get("/customer/product".concat(e))),t=e=>(e=(0,r.x0)(e,!0),a.A.get("/customer/product".concat(e))),n=async e=>((0,r.Gv)(e)||(e={slug:e}),e.cookie_id=(0,r.Yt)(),e=(0,r.x0)(e,!0),await a.A.get("/customer/product/view".concat(e))),c=async e=>await a.A.post("/customer/reviews/store",e),d=async e=>(e=(0,r.x0)(e,!0),await a.A.get("/customer/reviews".concat(e)))},71345:(e,s,i)=>{i.d(s,{A:()=>a});const a=[{id:1,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"},{id:2,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Diamond",price:"1899",discount_price:"1099"},{id:3,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"},{id:4,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"},{id:5,image:"/static/media/s-product-1.128c2cd5ffadc548d1a5.png",title:"Gems",price:"1999",discount_price:"999"}]},65529:(e,s,i)=>{i.r(s),i.d(s,{default:()=>Y});var a=i(63696),r=i(80249),l=i(49348),t=i(57606),n=i(50977),c=i(81660),d=i(19211),o=i(99101),h=i(81421),m=i(45776),x=i(5908),p=i(99304),j=i(52575),u=i(69348),g=i(22187),v=(i(12152),i(74259),i(19050),i(40524),i(16090)),b=i(10827),y=i(95018),N=i(27257),f=i(98488),w=i(16729),A=i(61485),_=i(69973),k=i(40910),C=i(69937);i.p,i.p,i.p,i.p,i(13335),i(13838),i(28673),i(71026),i(91861);var P=i(2693),S=i(32549),I=i(89123),B=i(1398),R=i(71345),E=(i(67569),i(41796)),G=i(56518),F=i(1729),T=i(57723),O=i(67167),V=i(69194),D=i(66234),L=i(86575),z=i(45892),K=i(17243),H=i.n(K),q=i(56604),W=i(62540);function Q(e,s,i){return s in e?Object.defineProperty(e,s,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[s]=i,e}class M extends a.Component{constructor(e){super(e),Q(this,"loadData",(()=>{this.loadBestSellingProducts(),this.loadFeaturedProducts(),this.loadBanners(),this.loadPromocodes(),this.loadBestReatailers(),this.loadCounts()})),Q(this,"loadBestSellingProducts",(async()=>{let e=await(0,T.y5)({best_selling:1});e.data.success&&this.setState({best_selling_products:e.data.data.items})})),Q(this,"loadFeaturedProducts",(async()=>{let e=await(0,T.y5)({is_featured:1});e.data.success&&this.setState({featured_products:e.data.data.items})})),Q(this,"loadBanners",(async()=>{let e=await(0,O.Pk)();e.data.success&&this.setState({banners:e.data.data.items})})),Q(this,"loadPromocodes",(async()=>{let e=await(0,O.Bu)();e.data.success&&this.setState({promocodes:e.data.data.items})})),Q(this,"loadBestReatailers",(async()=>{let e=await(0,O.Nb)();e.data.success&&this.setState({bestRetailers:e.data.data})})),Q(this,"loadCounts",(async()=>{let e=await(0,O.CQ)();e.data.success&&this.setState({counts:e.data.data})})),Q(this,"handlePromise",(e=>{this.setState({promise_box:this.state.promise_box==e?"":e})})),Q(this,"getBannerLink",(e=>e.url.replace("https://ratanvihar.com/","/"))),Q(this,"wishlistHandler",(async e=>{if((0,z.Im)(this.state.auth))return(0,z.XL)(),void this.props.navigate("/login");let s=await(0,T.yg)(e.slug);if(s.data.success){let e=s.data.data,i=e.size_materials[0].materials,a=e.size_materials[0].size_id,r=e.size_materials[0].sale_price,l=0,t=[];for(let e=0;e<i.length;e++){let s=i[e],a=H().filter(s.purities,{is_selected:!0}),r=(0,z.Ax)(s.unit_name,s.weight);r=(0,z.sq)(r),l+=parseFloat(r),t.push({material_id:s.material_id,purity_id:a[0].id,weight:s.weight,unit_id:s.unit_id,quantity:s.quantity})}let n={product_id:e.id,stock_id:null,total_weight:l,size_id:"material"!=e.type?a:null,type:e.type,rate:r,materials:t},c=await(0,L.pQ)(n);if(c.data.success){let s=this.state.best_selling_products,i=this.state.featured_products;s=s.map((s=>s.id===e.id?{...s,has_wishlist:c.data.data.status}:s)),i=i.map((s=>s.id===e.id?{...s,has_wishlist:c.data.data.status}:s)),this.setState({best_selling_products:s,featured_products:i}),this.props.dispatch({type:D.k_,payload:c.data.data.total})}}})),this.state={slider:R.A,categories:this.props.categories,featured_products:[],best_selling_products:[],banners:[],promocodes:[],auth:this.props.auth,bestRetailers:[],counts:null,promise_box:""}}static getDerivedStateFromProps(e,s){let i={};return e.categories!==s.categories&&(i.categories=e.categories),e.auth!==s.auth&&(i.auth=e.auth),i}componentDidMount(){this.loadData()}render(){const{featured_products:e,best_selling_products:s,banners:i,promocodes:a,bestRetailers:r,counts:n}=this.state;return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)("section",{className:"banner pt-0",children:(0,W.jsxs)(c.A,{style:{padding:"0"},children:[(0,W.jsx)(t.A,{className:"rounded-4",children:i.map(((e,s)=>(0,W.jsx)(t.A.Item,{children:(0,W.jsx)(l.N_,{to:this.getBannerLink(e),children:(0,W.jsx)("div",{className:"slider-banner",children:(0,W.jsx)("img",{className:"d-block w-100",src:e.image,alt:""})})})},s)))}),i.length?null:(0,W.jsx)(u.A,{animation:"glow",children:(0,W.jsx)(u.A,{xs:12,className:"slider-banner"})})]})}),(0,W.jsx)("section",{className:"ornament-slider",children:(0,W.jsx)(c.A,{children:(0,W.jsx)(h.RC,{spaceBetween:10,slidesPerView:3,onSwiper:e=>console.log(e),onSlideChange:()=>console.log("slide change"),children:this.state.categories.map(((e,s)=>(0,W.jsx)(h.qr,{children:(0,W.jsx)(l.N_,{to:"/products?category="+e.slug,children:(0,W.jsx)("div",{className:"ornament-image",children:(0,W.jsxs)(m.A,{children:[(0,W.jsx)("img",{src:e.icon?e.icon:C.A,alt:""}),(0,W.jsx)(m.A.Toggle,{variant:"success",id:"dropdown-basic",children:(0,W.jsx)("h4",{children:e.name})})]})})})},s)))})})}),a.map(((e,s)=>(0,W.jsx)("section",{className:s%2==0?"diamond-offer":"pendant-offer",children:(0,W.jsxs)(l.N_,{to:(0,z.Im)(e.products)?"/products"+(0,z.x0)({category:e.category_slug,subcategory:e.sub_category_slug},!0):"/products?offer="+e.products,children:[(0,W.jsx)(c.A,{className:(s%2==0?"diamond-inner":"pendant-inner")+" mt-2 mb-3 mt-md-4 mb-md-2 position-relative rounded",style:{backgroundImage:"url(".concat(e.banner,") "),backgroundRepeat:"no-repeat",backgroundPosition:"right bottom",backgroundSize:"cover"}}),(0,W.jsx)(c.A,{style:{padding:0},className:"mt-3",children:(0,W.jsxs)("div",{className:"banner-heading-content text-primary-emphasis ",children:[(0,W.jsx)("h2",{className:"bg-light rounded px-xl-5",children:e.title}),(0,W.jsx)(l.N_,{className:"ratn-shop-now bg-primary-emphasis rounded",to:(0,z.Im)(e.products)?"/products"+(0,z.x0)({category:e.category_slug,subcategory:e.sub_category_slug},!0):"/products?offer="+e.products,children:"Shop Now"})]})})]})},s))),s.length?(0,W.jsx)("section",{className:"selling-product",children:(0,W.jsxs)(c.A,{children:[(0,W.jsx)("div",{className:"selling-product-header",children:(0,W.jsx)("h1",{children:"Best Selling Products"})}),(0,W.jsx)(h.RC,{spaceBetween:20,onSlideChange:()=>console.log("slide change"),onSwiper:e=>console.log(e),breakpoints:{320:{width:320,slidesPerView:2},768:{width:768,slidesPerView:2},1024:{width:1024,slidesPerView:3},1440:{width:1440,slidesPerView:4}},children:s.map(((e,s)=>(0,W.jsx)(h.qr,{children:(0,W.jsxs)("div",{className:"slide-swipe-inner rounded overflow-hidden",children:[(0,W.jsxs)("div",{className:"s-slider-image rounded-top",children:[(0,W.jsx)(l.N_,{to:"products/"+e.slug,children:(0,W.jsx)("img",{src:e.default_image,className:"rounded-top Scale_on_hover",alt:"selling product"})}),(0,W.jsx)("div",{className:"wishlist rounded-circle ",children:e.has_wishlist?(0,W.jsx)(V.z8S,{onClick:()=>this.wishlistHandler(e),className:"wishlist_active",role:"button"}):(0,W.jsx)(V.OxO,{onClick:()=>this.wishlistHandler(e),role:"button"})})]}),(0,W.jsxs)("div",{className:"s-slider-content rounded-bottom",children:[(0,W.jsx)("h2",{children:e.name}),(0,W.jsxs)("div",{className:"ring-price",children:[(0,W.jsxs)("span",{className:"offer-price",children:[" ",e.sale_price_display," "]}),e.have_offer?(0,W.jsxs)(W.Fragment,{children:[" ",(0,W.jsx)("span",{className:"me-2 text-danger",children:"Save"})," ",(0,W.jsxs)("span",{className:"item-price text-primary-emphasis",children:[" ",e.mrp_display," "]})]}):null]})]})]})},s)))})]})}):null,e.length?(0,W.jsx)("section",{className:"feature-product bg-light",children:(0,W.jsxs)(c.A,{children:[(0,W.jsx)("div",{className:"feature-product-header",children:(0,W.jsx)("h1",{style:{color:"#001e38"},children:"Featured Products"})}),(0,W.jsx)(h.RC,{spaceBetween:20,onSlideChange:()=>console.log("slide change"),onSwiper:e=>console.log(e),breakpoints:{320:{width:320,slidesPerView:2},768:{width:768,slidesPerView:2},1024:{width:1024,slidesPerView:3},1440:{width:1440,slidesPerView:4}},children:e.map(((e,s)=>(0,W.jsx)(h.qr,{className:" rounded",children:(0,W.jsxs)("div",{className:"slide-swipe-inner rounded overflow-hidden",children:[(0,W.jsxs)("div",{className:"s-slider-image rounded-top",children:[(0,W.jsx)(l.N_,{to:"products/"+e.slug,children:(0,W.jsx)("img",{src:e.default_image,className:"rounded-top Scale_on_hover",alt:"feature product"})}),(0,W.jsx)("div",{className:"wishlist rounded-circle ",children:e.has_wishlist?(0,W.jsx)(V.z8S,{onClick:()=>this.wishlistHandler(e),className:"wishlist_active",role:"button"}):(0,W.jsx)(V.OxO,{onClick:()=>this.wishlistHandler(e),role:"button"})})]}),(0,W.jsxs)("div",{className:"s-slider-content rounded-bottom",children:[(0,W.jsx)("h2",{children:e.name}),(0,W.jsxs)("div",{className:"ring-price",children:[(0,W.jsxs)("span",{className:"offer-price",children:[" ",e.sale_price_display," "]}),e.have_offer?(0,W.jsxs)("span",{children:[(0,W.jsx)("span",{className:"me-2 text-danger",children:"Save"}),(0,W.jsxs)("span",{className:"item-price text-primary-emphasis",children:[" ",e.mrp_display," "]})]}):null]})]})]})},s)))})]})}):null,(0,W.jsx)("section",{className:"blue-pearl mt-3 mb-3 mt-md-4 mb-md-4 position-relative",children:(0,W.jsx)(c.A,{children:(0,W.jsxs)(d.A,{children:[(0,W.jsx)(o.A,{xs:4,md:4,children:(0,W.jsx)("div",{className:"blue-pearl-image shadow rounded",children:(0,W.jsx)("img",{src:v.A,className:"rounded",alt:""})})}),(0,W.jsx)(o.A,{xs:8,md:8,children:(0,W.jsxs)("div",{id:"carouselExampleCaptions",class:"carousel slide",children:[(0,W.jsxs)("div",{class:"carousel-indicators",children:[(0,W.jsx)("button",{type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":"0",class:"active","aria-current":"true","aria-label":"Slide 1"}),(0,W.jsx)("button",{type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":"1","aria-label":"Slide 2"}),(0,W.jsx)("button",{type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":"2","aria-label":"Slide 3"})]}),(0,W.jsxs)("div",{class:"carousel-inner",children:[(0,W.jsxs)("div",{class:"carousel-item active",children:[(0,W.jsx)("img",{src:b.A,class:"d-block w-100",alt:"..."}),(0,W.jsxs)("div",{class:"carousel-caption d-none d-md-block",children:[(0,W.jsx)("h5",{children:"First slide label"}),(0,W.jsx)("p",{children:"Some representative placeholder content for the first slide."})]})]}),(0,W.jsxs)("div",{class:"carousel-item",children:[(0,W.jsx)("img",{src:b.A,class:"d-block w-100",alt:"..."}),(0,W.jsxs)("div",{class:"carousel-caption d-none d-md-block",children:[(0,W.jsx)("h5",{children:"Second slide label"}),(0,W.jsx)("p",{children:"Some representative placeholder content for the second slide."})]})]}),(0,W.jsxs)("div",{class:"carousel-item",children:[(0,W.jsx)("img",{src:b.A,class:"d-block w-100",alt:"..."}),(0,W.jsxs)("div",{class:"carousel-caption d-none d-md-block",children:[(0,W.jsx)("h5",{children:"Third slide label"}),(0,W.jsx)("p",{children:"Some representative placeholder content for the third slide."})]})]})]}),(0,W.jsxs)("button",{class:"carousel-control-prev",type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide":"prev",children:[(0,W.jsx)("span",{class:"carousel-control-prev-icon","aria-hidden":"true"}),(0,W.jsx)("span",{class:"visually-hidden",children:"Previous"})]}),(0,W.jsxs)("button",{class:"carousel-control-next",type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide":"next",children:[(0,W.jsx)("span",{class:"carousel-control-next-icon","aria-hidden":"true"}),(0,W.jsx)("span",{class:"visually-hidden",children:"Next"})]})]})})]})})}),(0,W.jsx)("section",{className:"promise promise-desktop bg-light",children:(0,W.jsxs)(c.A,{children:[(0,W.jsx)("h2",{className:"text-center ",children:"Our Promise"}),(0,W.jsxs)(d.A,{children:[(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"promise-box rounded-4",children:[(0,W.jsx)("img",{src:y.A,alt:""}),(0,W.jsx)("div",{className:"promise-content",children:(0,W.jsxs)("h4",{className:"text-center",children:["100% Certified ",(0,W.jsx)("br",{})," Jewellery"]})}),(0,W.jsxs)("div",{className:"promise-overlay-content",children:[(0,W.jsx)("h2",{children:"Certificate Authentication"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"Importance of Certification"}),(0,W.jsx)("p",{children:"The value of a precious stone or diamond is determined by its gemological makeup, natural rarity and cut quality. Diamonds and gems that look similar can vary greatly in value. Experts need high equipment to detect synthetics, remedies. A certificate clearly discloses the details of any item, providing confidence to both the buyer and the seller."}),(0,W.jsx)("p",{children:"Gemstones should be exchanged only if there is a certificate certifying the same. We provide reports from the few trusted labs."}),(0,W.jsxs)("ul",{children:[(0,W.jsx)("li",{children:" Committed to making your concerns understood "}),(0,W.jsx)("li",{children:" GIA Gemological Institute of America "}),(0,W.jsx)("li",{children:"IIGL Institute of International Gemological Laboratory"}),(0,W.jsx)("li",{children:"IGI international gemological institute"})]}),(0,W.jsx)("p",{children:"For more information visit their website:"}),(0,W.jsxs)("ul",{children:[(0,W.jsx)("li",{children:" https://www.gia.edu/gem-lab "}),(0,W.jsx)("li",{children:" https://www.iigl.org/ "}),(0,W.jsx)("li",{children:" https://www.igi.org/ "})]})]})]})}),(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"promise-box rounded-4",children:[(0,W.jsx)("img",{src:N.A,alt:""}),(0,W.jsx)("div",{className:"promise-content",children:(0,W.jsxs)("h4",{className:"text-center",children:["100% ",(0,W.jsx)("br",{}),"Refund Policy"]})}),(0,W.jsxs)("div",{className:"promise-overlay-content",children:[(0,W.jsx)("h2",{children:"100% Refund Policy"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"हमारा 7 दिन की वापसी निति के तहत,आप को वस्तु पसंद नहीं आने पर ,उचित कारण के साथ,आप उसे लौटा सकते हैं। जिसका 100% धन राशि आपके बैंक खता में 7 दिन के भीतर जमा कर दिया जाता हैं अगर कारण निराधार होने पर Making एवं संबधीत शुल्क लिया जायेगा। सभी प्रकार के धन वापसी आपके बैंक खाते में Trancefar के माध्यम से आपको संसाधित की जाएगी,अथवा, प्राप्त किया गया स्रोत द्वारा जमा कीया जाएगा ,अतिआवश्यक होने पर नगदी देने का प्रावधान भी हैं। वापस करने के सम्बन्ध में वापसी के लिए निवेदन करने के बाद Labaratory Report के साथ अपने गहनों का मूल पैकिंग सामग्री तैयार रखें पहचानपात्र के साथ गए हुए रत्नविहार के कर्मचारी द्वारा दिया हुआ प्रूफ पैकेट में अपने गहने कर्मचारी को दिखाकर सुरक्षित, इसे सील कर दें। एक बार पैकेट सील करने के बाद, पैकेट को तब तक नहीं खोला जा सकता जब तक कि उसे नष्ट न कर दिया जाए। पुस्टि होने और पावती लेने के बाद ही वापसी हेतु वस्तु प्रदान करें हमें वस्तु प्राप्त होने के उपरांत गुणवत्ता जांच के बाद 2 कार्य दिवसों भीतर आपकी धन वापसी कर दीया जाता हैं यह सर्ते केवल रत्न विहार द्वारा INVOICE बिल पर ही लागु हैं मान्य होगा।"})]})]})}),(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"promise-box rounded-4",children:[(0,W.jsx)("img",{src:f.A,alt:""}),(0,W.jsx)("div",{className:"promise-content",children:(0,W.jsx)("h4",{className:"text-center",children:"Free Trial"})}),(0,W.jsxs)("div",{className:"promise-overlay-content",children:[(0,W.jsx)("h2",{children:"Free Trial"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"Yes, PRAKRITI assures you that you can choose your favorite jewelry from anywhere and order it on time, for which you will not have to pay any charge, you can shop if you like, want to try? so contact now 98744 00341, Email: support@Prakriti.one :"})]})]})}),(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"promise-box rounded-4",children:[(0,W.jsx)("img",{src:w.A,alt:""}),(0,W.jsx)("div",{className:"promise-content",children:(0,W.jsxs)("h4",{className:"text-center",children:["Free ",(0,W.jsx)("br",{})," Delivery"]})}),(0,W.jsxs)("div",{className:"promise-overlay-content",children:[(0,W.jsx)("h2",{children:"Free Delivery"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"We ship for free on all items. 100% safe which is our responsibility to reach you safely from now on 100% Free Delivery"})]})]})}),(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"promise-box rounded-4",children:[(0,W.jsx)("img",{src:A.A,alt:""}),(0,W.jsx)("div",{className:"promise-content",children:(0,W.jsxs)("h4",{className:"text-center",children:["Genuine ",(0,W.jsx)("br",{}),"Price"]})}),(0,W.jsxs)("div",{className:"promise-overlay-content",children:[(0,W.jsx)("h2",{children:"Genuine Price"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"We feel immense pleasure in providing the goods to our customers at reasonable prices due to our bulk buying and low margins and removal of middlemen."})]})]})}),(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"promise-box rounded-4",children:[(0,W.jsx)("img",{src:_.A,alt:""}),(0,W.jsx)("div",{className:"promise-content",children:(0,W.jsxs)("h4",{className:"text-center",children:["Near ",(0,W.jsx)("br",{}),"By Store"]})}),(0,W.jsxs)("div",{className:"promise-overlay-content",children:[(0,W.jsx)("h2",{children:"Near By Store"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Corp. Office:"})}),(0,W.jsx)("p",{children:"P210 Strand Bank Road, East Bengal Market, Barabazar, Kolkata - 700 007"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Branch Office:"})}),(0,W.jsx)("p",{children:"3rd Floor - G100 PC colony Near (Sri Ram Hospital), Kankarbag Patna - 800 020"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Contact:"})}),(0,W.jsx)("p",{children:" +91 98744 45878"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Email:"})}),(0,W.jsx)("p",{children:"support@Prakriti.one"})]})]})})]})]})}),(0,W.jsx)("section",{className:"promise promise-mobile",children:(0,W.jsxs)(c.A,{children:[(0,W.jsx)("h2",{className:"text-center",children:"Our Promise"}),(0,W.jsxs)(d.A,{children:[(0,W.jsx)(o.A,{xs:12,children:(0,W.jsxs)("div",{className:"promise-box"+("gemsjewellry1"==this.state.promise_box?" active":""),onClick:()=>this.handlePromise("gemsjewellry1"),children:[(0,W.jsxs)("div",{className:"promise-mob-content",children:[(0,W.jsx)("img",{src:y.A,alt:""}),(0,W.jsxs)("h4",{className:"",children:["100% Certified ",(0,W.jsx)("br",{})," Jewellery"]}),(0,W.jsx)("span",{className:"pro-icon",children:(0,W.jsx)(E.eQr,{})})]}),(0,W.jsxs)("div",{className:"promise-overlay-mob",children:[(0,W.jsx)("h2",{children:"Certificate Authentication"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"Importance of Certification"}),(0,W.jsx)("p",{children:"The value of a precious stone or diamond is determined by its gemological makeup, natural rarity and cut quality. Diamonds and gems that look similar can vary greatly in value. Experts need high equipment to detect synthetics, remedies. A certificate clearly discloses the details of any item, providing confidence to both the buyer and the seller."}),(0,W.jsx)("p",{children:"Gemstones should be exchanged only if there is a certificate certifying the same. We provide reports from the few trusted labs."}),(0,W.jsxs)("ul",{children:[(0,W.jsx)("li",{children:" Committed to making your concerns understood "}),(0,W.jsx)("li",{children:" GIA Gemological Institute of America "}),(0,W.jsx)("li",{children:"IIGL Institute of International Gemological Laboratory"}),(0,W.jsx)("li",{children:"IGI international gemological institute"})]}),(0,W.jsx)("p",{children:"For more information visit their website:"}),(0,W.jsxs)("ul",{children:[(0,W.jsx)("li",{children:" https://www.gia.edu/gem-lab "}),(0,W.jsx)("li",{children:" https://www.iigl.org/ "}),(0,W.jsx)("li",{children:" https://www.igi.org/ "})]})]})]})}),(0,W.jsx)(o.A,{xs:12,children:(0,W.jsxs)("div",{className:"promise-box"+("gemsjewellry2"==this.state.promise_box?" active":""),onClick:()=>this.handlePromise("gemsjewellry2"),children:[(0,W.jsxs)("div",{className:"promise-mob-content",children:[(0,W.jsx)("img",{src:N.A,alt:""}),(0,W.jsxs)("h4",{className:"",children:["100% ",(0,W.jsx)("br",{}),"Refund Policy"]}),(0,W.jsx)("span",{className:"pro-icon",children:(0,W.jsx)(E.eQr,{})})]}),(0,W.jsx)("div",{className:"promise-overlay-mob",children:(0,W.jsx)("p",{children:"हमारा 7 दिन की वापसी निति के तहत,आप को वस्तु पसंद नहीं आने पर ,उचित कारण के साथ,आप उसे लौटा सकते हैं। जिसका 100% धन राशि आपके बैंक खता में 7 दिन के भीतर जमा कर दिया जाता हैं अगर कारण निराधार होने पर Making एवं संबधीत शुल्क लिया जायेगा। सभी प्रकार के धन वापसी आपके बैंक खाते में Trancefar के माध्यम से आपको संसाधित की जाएगी,अथवा, प्राप्त किया गया स्रोत द्वारा जमा कीया जाएगा ,अतिआवश्यक होने पर नगदी देने का प्रावधान भी हैं। वापस करने के सम्बन्ध में वापसी के लिए निवेदन करने के बाद Labaratory Report के साथ अपने गहनों का मूल पैकिंग सामग्री तैयार रखें पहचानपात्र के साथ गए हुए रत्नविहार के कर्मचारी द्वारा दिया हुआ प्रूफ पैकेट में अपने गहने कर्मचारी को दिखाकर सुरक्षित, इसे सील कर दें। एक बार पैकेट सील करने के बाद, पैकेट को तब तक नहीं खोला जा सकता जब तक कि उसे नष्ट न कर दिया जाए। पुस्टि होने और पावती लेने के बाद ही वापसी हेतु वस्तु प्रदान करें हमें वस्तु प्राप्त होने के उपरांत गुणवत्ता जांच के बाद 2 कार्य दिवसों भीतर आपकी धन वापसी कर दीया जाता हैं यह सर्ते केवल रत्न विहार द्वारा INVOICE बिल पर ही लागु हैं मान्य होगा।"})})]})}),(0,W.jsx)(o.A,{xs:12,children:(0,W.jsxs)("div",{className:"promise-box"+("gemsjewellry3"==this.state.promise_box?" active":""),onClick:()=>this.handlePromise("gemsjewellry3"),children:[(0,W.jsxs)("div",{className:"promise-mob-content",children:[(0,W.jsx)("img",{src:f.A,alt:""}),(0,W.jsx)("h4",{className:"",children:"Free Trial"}),(0,W.jsx)("span",{className:"pro-icon",children:(0,W.jsx)(E.eQr,{})})]}),(0,W.jsx)("div",{className:"promise-overlay-mob",children:(0,W.jsx)("p",{children:"Yes, PRAKRITI assures you that you can choose your favorite jewelry from anywhere and order it on time, for which you will not have to pay any charge, you can shop if you like, want to try? so contact now 98744 00341, Email: support@Prakriti.one :"})})]})}),(0,W.jsx)(o.A,{xs:12,children:(0,W.jsxs)("div",{className:"promise-box"+("gemsjewellry4"==this.state.promise_box?" active":""),onClick:()=>this.handlePromise("gemsjewellry4"),children:[(0,W.jsxs)("div",{className:"promise-mob-content",children:[(0,W.jsx)("img",{src:w.A,alt:""}),(0,W.jsxs)("h4",{className:"",children:["Free ",(0,W.jsx)("br",{})," Delivery"]}),(0,W.jsx)("span",{className:"pro-icon",children:(0,W.jsx)(E.eQr,{})})]}),(0,W.jsxs)("div",{className:"promise-overlay-mob",children:[(0,W.jsx)("h2",{children:"Free Delivery"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"We ship for free on all items. 100% safe which is our responsibility to reach you safely from now on 100% Free Delivery"})]})]})}),(0,W.jsx)(o.A,{xs:12,children:(0,W.jsxs)("div",{className:"promise-box"+("gemsjewellry5"==this.state.promise_box?" active":""),onClick:()=>this.handlePromise("gemsjewellry5"),children:[(0,W.jsxs)("div",{className:"promise-mob-content",children:[(0,W.jsx)("img",{src:A.A,alt:""}),(0,W.jsxs)("h4",{className:"",children:["Genuine ",(0,W.jsx)("br",{}),"Price"]}),(0,W.jsx)("span",{className:"pro-icon",children:(0,W.jsx)(E.eQr,{})})]}),(0,W.jsxs)("div",{className:"promise-overlay-mob",children:[(0,W.jsx)("h2",{children:"Genuine Price"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:"We feel immense pleasure in providing the goods to our customers at reasonable prices due to our bulk buying and low margins and removal of middlemen."})]})]})}),(0,W.jsx)(o.A,{xs:12,children:(0,W.jsxs)("div",{className:"promise-box"+("gemsjewellry6"==this.state.promise_box?" active":""),onClick:()=>this.handlePromise("gemsjewellry6"),children:[(0,W.jsxs)("div",{className:"promise-mob-content",children:[(0,W.jsx)("img",{src:_.A,alt:""}),(0,W.jsxs)("h4",{className:"",children:["Near ",(0,W.jsx)("br",{}),"By Store"]}),(0,W.jsx)("span",{className:"pro-icon",children:(0,W.jsx)(E.eQr,{})})]}),(0,W.jsxs)("div",{className:"promise-overlay-mob",children:[(0,W.jsx)("h2",{children:"Near By Store"}),(0,W.jsx)("div",{className:"overlay-underline"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Corp. Office:"})}),(0,W.jsx)("p",{children:"P210 Strand Bank Road, East Bengal Market, Barabazar, Kolkata - 700 007"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Branch Office:"})}),(0,W.jsx)("p",{children:"3rd Floor - G100 PC colony Near (Sri Ram Hospital), Kankarbag Patna - 800 020"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Contact:"})}),(0,W.jsx)("p",{children:" +91 98744 45878"}),(0,W.jsx)("p",{children:(0,W.jsx)("strong",{children:"Email:"})}),(0,W.jsx)("p",{children:"support@Prakriti.one"})]})]})})]})]})}),(0,W.jsxs)("section",{className:"browse-rings position-relative",children:[(0,W.jsx)(c.A,{fluid:!0,children:(0,W.jsxs)(d.A,{children:[(0,W.jsx)(o.A,{xs:6,md:4,children:(0,W.jsxs)("div",{className:"browse-ring-header",children:[(0,W.jsx)("h3",{style:{color:"#001e38"},children:"Browse all Rings"}),(0,W.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."}),(0,W.jsxs)("a",{href:"/products",className:"browse-now rounded",children:["Explore ",(0,W.jsx)(j.W84,{})]})]})}),(0,W.jsx)(o.A,{xs:6,md:8})]})}),(0,W.jsx)("div",{className:"browse-rings-banner rounded-start",children:(0,W.jsx)("img",{src:k.A,alt:"",className:"rounded-start"})})]}),r.length?(0,W.jsx)("section",{className:"feature-product best-retailer",children:(0,W.jsxs)(c.A,{children:[(0,W.jsx)("div",{className:"feature-product-header",children:(0,W.jsx)("h1",{children:"Best Retailers"})}),(0,W.jsx)(h.RC,{spaceBetween:20,onSlideChange:()=>console.log("slide change"),onSwiper:e=>console.log(e),breakpoints:{320:{width:320,slidesPerView:2},768:{width:768,slidesPerView:2},1024:{width:1024,slidesPerView:4},1440:{width:1440,slidesPerView:4}},children:r.map(((e,s)=>(0,W.jsx)(h.qr,{children:(0,W.jsxs)("div",{className:"slide-swipe-inner rounded overflow-hidden",children:[(0,W.jsx)("div",{className:"b-slider-image",children:(0,W.jsx)("img",{src:e.image,className:"",alt:"feature product"})}),(0,W.jsxs)("div",{className:"b-slider-content",children:[(0,W.jsx)("h2",{children:e.name}),(0,W.jsx)("span",{className:"seller-description",children:(0,W.jsxs)("ul",{children:[(0,W.jsx)("li",{children:(0,W.jsx)(p.vq8,{})}),(0,W.jsx)("li",{children:e.address})]})}),(0,W.jsx)("div",{className:"ring-price"})]})]})},s)))})]})}):null,(0,W.jsx)("section",{className:"ratn-banner",children:(0,W.jsx)(c.A,{children:(0,W.jsxs)("div",{className:"ratn-banner-image position-relative",children:[(0,W.jsx)("img",{src:P.A,alt:""}),(0,W.jsx)("div",{className:"banner-overlay",children:(0,W.jsx)("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been"})})]})})}),(0,W.jsx)("section",{className:"address-map",children:(0,W.jsxs)(c.A,{children:[(0,W.jsxs)("div",{className:"review-header",children:[(0,W.jsx)("h3",{className:"text-center",children:"The Prakriti Store"}),(0,W.jsx)("p",{children:"Our stores are cool and contemporary spaces that offer an immersive jewellery browsing and shopping experience, and encourage you to linger as long as you like."})]}),(0,W.jsx)(F.A.Container,{id:"left-tabs-example",defaultActiveKey:"first",children:(0,W.jsx)(d.A,{children:(0,W.jsxs)(o.A,{sm:12,children:[(0,W.jsxs)(G.A,{variant:"pills",className:"flex-row justify-content-center",children:[(0,W.jsx)(G.A.Item,{children:(0,W.jsx)(G.A.Link,{eventKey:"first",className:"rounded me-3",children:"Kolkata"})}),(0,W.jsx)(G.A.Item,{children:(0,W.jsx)(G.A.Link,{eventKey:"second",className:"rounded btn btn-outline-dark",children:"Patna"})})]}),(0,W.jsxs)(F.A.Content,{children:[(0,W.jsx)(F.A.Pane,{eventKey:"first",children:(0,W.jsx)(c.A,{children:(0,W.jsxs)(d.A,{children:[(0,W.jsx)(o.A,{xs:12,md:12,children:(0,W.jsxs)("div",{className:"map-wrapper-list rounded",children:[(0,W.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8728946666283!2d88.34720051427394!3d22.583856738250365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b918617de7%3A0xe6c77375f9def3eb!2sP-210%2C%20Strand%20Bank%20Rd%2C%20Fairley%20Place%2C%20B.B.D.%20Bagh%2C%20Kolkata%2C%20West%20Bengal%20700001!5e0!3m2!1sen!2sin!4v1675867314000!5m2!1sen!2sin",width:"100%",height:"100%",style:{border:"0"},allowFullScreen:!0,loading:"lazy"}),(0,W.jsxs)("div",{className:"list-wrapper",children:[(0,W.jsxs)("div",{className:"list-name",children:[(0,W.jsx)("h1",{children:" Corp. Office"}),(0,W.jsxs)("p",{children:[" ","P210 Strand Bank Road, East Bengal Market, Barabazar, Kolkata - 700 007"]}),(0,W.jsx)("p",{children:"Contact: +91 98744 00341, Email: support@Prakriti.one"})]}),(0,W.jsxs)("div",{className:"list-name right-para",children:[(0,W.jsx)("p",{children:" Store Timings: 11am to 9pm "}),(0,W.jsx)("p",{children:" Contact Number: 9874400341"}),(0,W.jsx)("div",{className:"list-name margin-right",children:(0,W.jsx)("a",{href:"https://goo.gl/maps/Lvo98VSdiUdkVWKA6",target:"_blank",children:(0,W.jsx)(g.A,{variant:"primary",className:"rounded",children:"GET DIRECTION"})})})]})]})]})}),(0,W.jsx)(o.A,{xs:12,md:12})]})})}),(0,W.jsx)(F.A.Pane,{eventKey:"second",children:(0,W.jsx)(c.A,{children:(0,W.jsxs)(d.A,{className:"overflow-tabs",children:[(0,W.jsx)(o.A,{xs:12,md:12,children:(0,W.jsxs)("div",{className:"map-wrapper-list",children:[(0,W.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.1377741388105!2d85.15243301433607!3d25.600337721510222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed597b97b8094b%3A0x4c2050111692585f!2sSpeckarts.com!5e0!3m2!1sen!2sin!4v1675866191579!5m2!1sen!2sin",width:"100%",height:"100%",style:{border:"0"},allowFullScreen:!0,loading:"lazy"}),(0,W.jsxs)("div",{className:"list-wrapper",children:[(0,W.jsxs)("div",{className:"list-name",children:[(0,W.jsx)("p",{children:"All types of gemstones, diamond jewelry, rudraksha, and sphatik are provided to retail our partners at wholesale rates. We assure you that we will deliver all your orders in a short period of time. There may be a difference in the current price from the order & catalog price, as per the current rate."}),(0,W.jsx)("h1",{children:" Branch Office"}),(0,W.jsxs)("p",{children:[" ","3rd Floor - G100 PC colony Near (Sri Ram Hospital), Kankarbag Patna - 800 020"," "]}),(0,W.jsx)("p",{children:"Contact: +91 98744 45878, Email: support@Prakriti.one"})]}),(0,W.jsxs)("div",{className:"list-name right-para",children:[(0,W.jsxs)("p",{children:[" ","WE PROVIDE THE SERVICE OF DISTRIBUTORSHIP TO YOU."," "]}),(0,W.jsx)("p",{children:"On order, we can make customized jewelry as per your designs. For all orders and inquiries, contact us."}),(0,W.jsx)("p",{children:" Store Timings: 11am to 9pm "}),(0,W.jsx)("p",{children:" WEBSITE: www.Prakriti.one "}),(0,W.jsx)("p",{children:" Contact Number: 9874445878"}),(0,W.jsx)("div",{className:"list-name margin-right",children:(0,W.jsx)("a",{href:"https://goo.gl/maps/6ZfV7dNiGwG6ZAJQ8",target:"_blank",children:(0,W.jsx)(g.A,{variant:"primary",children:"GET DIRECTION"})})})]})]})]})}),(0,W.jsx)(o.A,{xs:12,md:12})]})})})]})]})})})]})}),(0,W.jsx)("section",{className:"socialmedia-wrapper",children:(0,W.jsx)(c.A,{children:(0,W.jsxs)("div",{className:"social-container-wrapper",children:[(0,W.jsxs)("div",{className:"social-single-container",children:[(0,W.jsxs)("div",{className:"social-single-header",children:[(0,W.jsx)("img",{src:I.A,alt:""}),(0,W.jsx)("h4",{children:"Facebook"})]}),(0,W.jsx)("img",{src:S.A,className:"fb_bg",alt:""})]}),(0,W.jsxs)("div",{className:"social-single-container",children:[(0,W.jsxs)("div",{className:"social-single-header",children:[(0,W.jsx)("img",{src:B.A,alt:""}),(0,W.jsx)("h4",{children:"Instagram"})]}),(0,W.jsxs)("ul",{className:"social-info",children:[(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{}),(0,W.jsx)("li",{})]})]})]})})}),n?(0,W.jsx)("section",{className:"socialmedia-wrapper",children:(0,W.jsx)(c.A,{children:(0,W.jsxs)("ul",{id:"counter",children:[(0,W.jsxs)("li",{className:"rounded",children:[(0,W.jsx)("span",{className:"count percent",children:(0,W.jsx)(q.Ay,{end:n.products,suffix:"+",duration:5})}),(0,W.jsx)("div",{className:"counter_header",children:(0,W.jsx)("h1",{children:"Products"})})]}),(0,W.jsxs)("li",{className:"rounded",children:[(0,W.jsx)("span",{className:"count percent",children:(0,W.jsx)(q.Ay,{end:n.retailers,suffix:"+",duration:5})}),(0,W.jsx)("div",{className:"counter_header",children:(0,W.jsx)("h1",{children:"Retailers"})})]}),(0,W.jsxs)("li",{className:"rounded",children:[(0,W.jsx)("span",{className:"count percent",children:(0,W.jsx)(q.Ay,{end:n.team_members,suffix:"+",duration:5})}),(0,W.jsx)("div",{className:"counter_header",children:(0,W.jsx)("h1",{children:"Team Members"})})]})]})})}):null]})}}const Y=(0,n.A)((0,r.Ng)((e=>({categories:e.customer.categories.items,auth:e.auth})),(e=>({actions:(0,x.zH)({},e),dispatch:e})))(M))},2693:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/banner.png"},12152:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/banner1.png"},74259:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/banner2.png"},19050:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/banner3.png"},95018:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/certificate.png"},71026:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/client.png"},98488:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/exchange.png"},89123:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/facebook.png"},32549:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/fb_bg.png"},1398:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/insta.png"},61485:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/jewelleryHome.png"},10827:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/pearl-blue-earring.png"},16090:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/pearl-blue.png"},69973:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/physicalStore.png"},27257:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/refund.png"},91861:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/review-mark.png"},69937:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/ring.png"},13335:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/ring2.png"},13838:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/ring3.png"},28673:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/ring4.png"},40910:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/rings.png"},40524:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/s-product-1.png"},16729:(e,s,i)=>{i.d(s,{A:()=>a});const a=i.p+"assets/shipping.png"}}]);
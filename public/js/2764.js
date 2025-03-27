"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2764],{20735:(e,s,a)=>{a.d(s,{M:()=>o,R:()=>l});var i=a(80325),r=a(43737),t=a(45892);const l=e=>s=>{i.A.post("/sales-executive/edit-profile",e).then((e=>{s({type:r.T,payload:e.data})})).catch((e=>{}))},o=e=>(e=(0,t.x0)(e,!0),i.A.get("/sales-executive/attendence".concat(e)))},2764:(e,s,a)=>{a.r(s),a.d(s,{default:()=>C});var i=a(63696),r=a(5908),t=a(50977),l=a(80249),o=a(81660),n=a(99101),c=a(8427),p=a(22187),m=a(19211),h=a(49179),d=a(20735),u=a(27397),f=a(43737),g=a(42722),_=a(45892),b=a(62540);function x(e,s,a){return s in e?Object.defineProperty(e,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[s]=a,e}class j extends i.Component{constructor(e){super(e),x(this,"handleChangeImage",(e=>{let s=this.state.profile;s.formValues.profile_image=e.target.files[0],s.formValues.imageUrl=URL.createObjectURL(e.target.files[0]),this.setState({profile:s})})),x(this,"handleProfileChange",((e,s)=>{let a=this.state.profile;a.formValues[s]=e.target.value,this.setState({profile:a})})),x(this,"onSubmit",(async e=>{if(e.preventDefault(),this.p_formValidate()){let e={...this.state.profile.formValues};(0,_.Im)(e.profile_image)||(e.profile_image=await(0,_.nk)(e.profile_image)),this.props.actions.ProfileUpdate(e)}})),x(this,"p_formValidate",(()=>{let e=this.state.profile,s=this.state.profile.formValues,a=this.state.profile.formErros,i=!1;return s.name?a.name=!1:(a.name=!0,i=!0),s.mobile?a.mobile=!1:(a.mobile=!0,i=!0),e.formValues=s,e.formErros=a,this.setState({profile:e}),!i})),this.state={auth:this.props.auth,submitting:!1,new_image_url:this.props.new_image_url,profile:{formValues:{name:this.props.auth.user.name,mobile:this.props.auth.user.mobile,email:this.props.auth.user.email,profile_image:"",imageUrl:this.props.auth.user.image},formErros:{name:!1,mobile:!1}},p_actionCalled:this.props.p_actionCalled,editProfileSuccess:this.props.editProfileSuccess,p_successMessage:this.props.p_successMessage,p_errorMessage:this.props.p_errorMessage}}static getDerivedStateFromProps(e,s){let a={};return e.new_image_url!==s.new_image_url&&(a.new_image_url=e.new_image_url),e.p_actionCalled!==s.p_actionCalled&&(a.p_actionCalled=e.p_actionCalled),e.editProfileSuccess!==s.editProfileSuccess&&(a.editProfileSuccess=e.editProfileSuccess),e.p_successMessage!==s.p_successMessage&&(a.p_successMessage=e.p_successMessage),e.p_errorMessage!==s.p_errorMessage&&(a.p_errorMessage=e.p_errorMessage),a}componentDidUpdate(e){this.state.p_actionCalled&&(this.state.editProfileSuccess?(u.oR.success(this.state.p_successMessage),this.props.dispatch({type:g.Rq,payload:{name:this.state.profile.formValues.name,mobile:this.state.profile.formValues.mobile,email:this.state.profile.formValues.email,image:this.state.new_image_url}})):u.oR.error(this.state.p_errorMessage),this.props.dispatch({type:f.$}))}render(){const{profile:e}=this.state;return(0,b.jsx)("div",{className:"edit-profile-wrapper",children:(0,b.jsxs)(o.A,{children:[(0,b.jsx)("h2",{className:"mb-4",children:"My Account"}),(0,b.jsxs)("div",{className:"edit-profile-picture position-relative mt-5 mt-md-0",style:{backgroundImage:"url(".concat(e.formValues.imageUrl,")")},children:[(0,b.jsx)("div",{className:"camera-icon",children:(0,b.jsx)("label",{htmlFor:"files",children:(0,b.jsx)(h.Ejx,{})})}),(0,b.jsx)("input",{type:"file",id:"files",accept:"image/*",onChange:e=>this.handleChangeImage(e),style:{display:"none"}})]}),(0,b.jsxs)(c.A,{onSubmit:this.onSubmit,children:[(0,b.jsx)(o.A,{children:(0,b.jsxs)(m.A,{children:[(0,b.jsx)(n.A,{xs:6,children:(0,b.jsxs)(c.A.Group,{className:"mt-4",controlId:"formBasicPassword",children:[(0,b.jsx)(c.A.Label,{children:"Name : "}),(0,b.jsx)(c.A.Control,{name:"name",value:e.formValues.name,onChange:e=>this.handleProfileChange(e,"name"),type:"text",placeholder:"Enter Name",className:e.formErros.name?"is-invalid":""}),(0,b.jsx)(c.A.Control.Feedback,{type:"invalid",children:"Please provide a valid Name."})]})}),(0,b.jsx)(n.A,{xs:6,children:(0,b.jsxs)(c.A.Group,{className:"mt-4",controlId:"formBasicPassword",children:[(0,b.jsx)(c.A.Label,{children:"Mobile : "}),(0,b.jsx)(c.A.Control,{name:"mobile",value:e.formValues.mobile,className:e.formErros.mobile?"is-invalid":"",onChange:e=>this.handleProfileChange(e,"mobile"),type:"text",placeholder:"Enter Mobile"}),(0,b.jsx)(c.A.Control.Feedback,{type:"invalid",children:"Please provide a valid mobile."})]})}),(0,b.jsx)(n.A,{xs:6,children:(0,b.jsxs)(c.A.Group,{className:"mb-4 mt-4",controlId:"formEmailAddress",children:[(0,b.jsx)(c.A.Label,{children:"Email : "}),(0,b.jsx)(c.A.Control,{name:"email",value:e.formValues.email,onChange:e=>this.handleProfileChange(e,"email"),type:"email",placeholder:"Enter Email Address"})]})})]})}),(0,b.jsx)("div",{className:"login-button",children:(0,b.jsx)(p.A,{variant:"primary",type:"submit",children:"SAVE CHANGES"})})]})]})})}}const C=(0,t.A)((0,l.Ng)((e=>({auth:e.auth,p_actionCalled:e.sales.profile.actionCalled,editProfileSuccess:e.sales.profile.editProfileSuccess,p_successMessage:e.sales.profile.successMessage,p_errorMessage:e.sales.profile.errorMessage,new_image_url:e.sales.profile.image_url})),(e=>({dispatch:e,actions:(0,r.zH)({ProfileUpdate:d.R},e)})))(j))}}]);
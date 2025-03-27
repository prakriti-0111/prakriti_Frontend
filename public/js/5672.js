"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5672],{35672:(e,s,t)=>{t.r(s),t.d(s,{default:()=>y});var a=t(63696),l=t(5908),o=t(50977),i=t(80249),r=t(81660),n=t(99101),c=t(26692),d=t(8427),h=t(675),u=t(22187),v=t(19211),p=t(27397),g=t(80325),m=t(15036);const x=e=>s=>{g.A.post("/sales-executive/leaves/create",e).then((e=>{s({type:m.s$,payload:e.data})})).catch((e=>{}))},A=()=>e=>{g.A.get("".concat("http://localhost:8083","/api/sales-executive/leaves")).then((s=>{s.data.success&&e({type:m.fL,payload:s.data.data})})).catch((e=>{}))},j=e=>s=>{g.A.post("".concat("http://localhost:8083","/api/sales-executive/leaves/delete"),e).then((e=>{e.data.success&&s({type:m.QU,payload:e.data})})).catch((e=>{}))};var b=t(62540);function f(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}class _ extends a.Component{constructor(e){super(e),f(this,"loadListData",(()=>{this.props.actions.LeaveData(this.state.leave_queryParams)})),f(this,"handleChange",(e=>{console.log(e.target.value),this.setState({leave_reason:e.target.value})})),f(this,"onSubmit",(async e=>{e.preventDefault(),""==this.state.leave_reason?p.oR.error("Please provide a leave reason."):this.state.isEdit||this.props.actions.LeaveAdd({title:this.state.leave_reason,status:"pending",message:null})})),f(this,"hanldeDelete",(e=>{this.setState({deleteDialog:!0,actionRow:e})})),f(this,"hanldeAddNew",(()=>{this.setState({showDialog:!0,modalTitle:"Add New leave",isEdit:!1})})),f(this,"handleClose",(()=>{this.setState({showDialog:!1})})),f(this,"handleDeleteClose",(()=>{this.setState({deleteDialog:!1,actionRow:null})})),f(this,"hanldeDeleteSumit",(()=>{this.props.actions.LeaveDelete({id:this.state.actionRow.id})})),this.state={processing:!1,leaveList:this.props.leaveList,leaveListTotal:this.props.leaveListTotal,leave_queryParams:{page:1,limit:15},lvs_actionCalled:this.props.lvs_actionCalled,lvs_createSuccess:this.props.lvs_createSuccess,lvs_editSuccess:this.props.lvs_editSuccess,lvs_deleteSuccess:this.props.lvs_deleteSuccess,lvs_successMessage:this.props.lvs_successMessage,lvs_errorMessage:this.props.lvs_errorMessage,showDialog:!1,modalTitle:"",isEdit:!1,actionRow:null,deleteDialog:!1,leave_reason:""}}componentDidMount(){this.loadListData()}static getDerivedStateFromProps(e,s){let t={};return e.leaveList!==s.leaveList&&(t.leaveList=e.leaveList),e.leaveListTotal!==s.leaveListTotal&&(t.leaveListTotal=e.leaveListTotal),e.lvs_actionCalled!==s.lvs_actionCalled&&(t.lvs_actionCalled=e.lvs_actionCalled),e.lvs_createSuccess!==s.lvs_createSuccess&&(t.lvs_createSuccess=e.lvs_createSuccess),e.lvs_deleteSuccess!==s.lvs_deleteSuccess&&(t.lvs_deleteSuccess=e.lvs_deleteSuccess),e.lvs_successMessage!==s.lvs_successMessage&&(t.lvs_successMessage=e.lvs_successMessage),e.lvs_errorMessage!==s.lvs_errorMessage&&(t.lvs_errorMessage=e.lvs_errorMessage),t}componentDidUpdate(e){this.state.lvs_actionCalled&&(this.state.lvs_createSuccess?(p.oR.success(this.state.lvs_successMessage),this.setState({showDialog:!1,processing:!1}),this.loadListData(),this.props.dispatch({type:m.k1})):this.state.lvs_deleteSuccess&&(p.oR.success(this.state.lvs_successMessage),this.setState({deleteDialog:!1,processing:!1}),this.loadListData(),this.props.dispatch({type:m.k1})))}render(){return console.log(this.state.leaveList),(0,b.jsx)("div",{className:"edit-profile-wrapper",children:(0,b.jsxs)(r.A,{children:[(0,b.jsxs)("h2",{className:"mb-4",children:["My leave ",(0,b.jsx)(u.A,{variant:"primary",onClick:e=>this.hanldeAddNew(),children:"Add New"})]}),(0,b.jsx)(d.A,{onSubmit:this.onSubmit,children:(0,b.jsx)(r.A,{children:(0,b.jsx)(v.A,{children:(0,b.jsx)(n.A,{xs:12,md:12,children:(0,b.jsxs)(h.A,{striped:!0,bordered:!0,hover:!0,children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"Leave Reason"}),(0,b.jsx)("th",{children:"Status"}),(0,b.jsx)("th",{children:"Message"}),(0,b.jsx)("th",{children:"Action"})]})}),(0,b.jsxs)("tbody",{children:[0==this.state.leaveList.length?(0,b.jsx)("tr",{children:(0,b.jsxs)("td",{colSpan:9,children:[" ",(0,b.jsx)("p",{className:"text-center",children:"No leave found."})]})}):(0,b.jsx)(b.Fragment,{children:this.state.leaveList.map(((e,s)=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:e.title}),(0,b.jsx)("td",{children:e.status}),(0,b.jsx)("td",{children:e.message}),(0,b.jsxs)("td",{children:[" ",(0,b.jsx)(u.A,{variant:"danger",onClick:s=>this.hanldeDelete(e),children:"Delete"})]})]},s)))}),(0,b.jsx)("tr",{})]})]})})})})}),(0,b.jsxs)(c.A,{show:this.state.showDialog,onHide:this.handleClose,backdrop:"static",keyboard:!1,children:[(0,b.jsx)(c.A.Header,{closeButton:!0,children:(0,b.jsx)(c.A.Title,{children:this.state.modalTitle})}),(0,b.jsx)(c.A.Body,{children:(0,b.jsx)(v.A,{children:(0,b.jsx)(n.A,{xs:12,md:6,children:(0,b.jsxs)(d.A.Group,{children:[(0,b.jsx)(d.A.Label,{children:"Leave Reason : "}),(0,b.jsx)(d.A.Control,{className:"",name:"leave_reason",value:this.state.leave_reason,onChange:e=>this.handleChange(e),placeholder:"Enter leave reason*"})]})})})}),(0,b.jsxs)(c.A.Footer,{children:[(0,b.jsx)(u.A,{variant:"secondary",onClick:this.handleClose,children:"Close"}),(0,b.jsx)(u.A,{variant:"primary",onClick:this.onSubmit,children:"Save"})]})]}),(0,b.jsxs)(c.A,{show:this.state.deleteDialog,onHide:this.handleDeleteClose,children:[(0,b.jsx)(c.A.Header,{closeButton:!0,children:(0,b.jsx)(c.A.Title,{children:"Delete leave"})}),(0,b.jsx)(c.A.Body,{children:"Are you sure want delete this leave?"}),(0,b.jsxs)(c.A.Footer,{children:[(0,b.jsx)(u.A,{variant:"secondary",onClick:this.handleDeleteClose,children:"Close"}),(0,b.jsx)(u.A,{variant:"primary",onClick:this.hanldeDeleteSumit,children:"Yes"})]})]})]})})}}const y=(0,o.A)((0,i.Ng)((e=>({leaveList:e.sales.leaveItem.items,leaveListTotal:e.sales.leaveItem.total,lvs_actionCalled:e.sales.leaveItem.actionCalled,lvs_createSuccess:e.sales.leaveItem.createSuccess,lvs_editSuccess:e.sales.leaveItem.editSuccess,lvs_deleteSuccess:e.sales.leaveItem.deleteSuccess,lvs_successMessage:e.sales.leaveItem.successMessage,lvs_errorMessage:e.sales.leaveItem.errorMessage})),(e=>({dispatch:e,actions:(0,l.zH)({LeaveDelete:j,LeaveData:A,LeaveAdd:x},e)})))(_))},26692:(e,s,t)=>{t.d(s,{A:()=>I});var a,l=t(71633),o=t.n(l),i=t(89230),r=t(36016),n=t(9565),c=t(26991);function d(e){if((!a&&0!==a||e)&&r.A){var s=document.createElement("div");s.style.position="absolute",s.style.top="-9999px",s.style.width="50px",s.style.height="50px",s.style.overflow="scroll",document.body.appendChild(s),a=s.offsetWidth-s.clientWidth,document.body.removeChild(s)}return a}var h=t(32224),u=t(54803),v=t(76608),p=t(76445),g=t(40289),m=t(63696),x=t(21331),A=t(13769),j=t(14977),b=t(89161);const f=(0,b.A)("modal-body");var _=t(13359),y=t(71971),S=t(62540);const C=m.forwardRef((({bsPrefix:e,className:s,contentClassName:t,centered:a,size:l,fullscreen:i,children:r,scrollable:n,...c},d)=>{const h=`${e=(0,y.oU)(e,"modal")}-dialog`,u="string"==typeof i?`${e}-fullscreen-${i}`:`${e}-fullscreen`;return(0,S.jsx)("div",{...c,ref:d,className:o()(h,s,l&&`${e}-${l}`,a&&`${h}-centered`,n&&`${h}-scrollable`,i&&u),children:(0,S.jsx)("div",{className:o()(`${e}-content`,t),children:r})})}));C.displayName="ModalDialog";const w=C,D=(0,b.A)("modal-footer");var N=t(55617);const L=m.forwardRef((({bsPrefix:e,className:s,...t},a)=>(e=(0,y.oU)(e,"modal-header"),(0,S.jsx)(N.A,{ref:a,...t,className:o()(s,e)}))));L.displayName="ModalHeader",L.defaultProps={closeLabel:"Close",closeButton:!1};const k=L,M=(0,t(297).A)("h4"),$=(0,b.A)("modal-title",{Component:M}),R={show:!1,backdrop:!0,keyboard:!0,autoFocus:!0,enforceFocus:!0,restoreFocus:!0,animation:!0,dialogAs:w};function T(e){return(0,S.jsx)(j.A,{...e,timeout:null})}function E(e){return(0,S.jsx)(j.A,{...e,timeout:null})}const F=m.forwardRef((({bsPrefix:e,className:s,style:t,dialogClassName:a,contentClassName:l,children:j,dialogAs:b,"aria-labelledby":f,"aria-describedby":C,"aria-label":w,show:D,animation:N,backdrop:L,keyboard:k,onEscapeKeyDown:M,onShow:$,onHide:R,container:F,autoFocus:I,enforceFocus:P,restoreFocus:H,restoreFocusOptions:O,onEntered:U,onExit:B,onExiting:z,onEnter:W,onEntering:K,onExited:q,backdropClassName:G,manager:Q,...Y},J)=>{const[V,X]=(0,m.useState)({}),[Z,ee]=(0,m.useState)(!1),se=(0,m.useRef)(!1),te=(0,m.useRef)(!1),ae=(0,m.useRef)(null),[le,oe]=(0,h.A)(),ie=(0,v.A)(J,oe),re=(0,u.A)(R),ne=(0,y.Wz)();e=(0,y.oU)(e,"modal");const ce=(0,m.useMemo)((()=>({onHide:re})),[re]);function de(){return Q||(0,A.R)({isRTL:ne})}function he(e){if(!r.A)return;const s=de().getScrollbarWidth()>0,t=e.scrollHeight>(0,n.A)(e).documentElement.clientHeight;X({paddingRight:s&&!t?d():void 0,paddingLeft:!s&&t?d():void 0})}const ue=(0,u.A)((()=>{le&&he(le.dialog)}));(0,p.A)((()=>{(0,c.A)(window,"resize",ue),null==ae.current||ae.current()}));const ve=()=>{se.current=!0},pe=e=>{se.current&&le&&e.target===le.dialog&&(te.current=!0),se.current=!1},ge=()=>{ee(!0),ae.current=(0,g.A)(le.dialog,(()=>{ee(!1)}))},me=e=>{"static"!==L?te.current||e.target!==e.currentTarget?te.current=!1:null==R||R():(e=>{e.target===e.currentTarget&&ge()})(e)},xe=(0,m.useCallback)((s=>(0,S.jsx)("div",{...s,className:o()(`${e}-backdrop`,G,!N&&"show")})),[N,G,e]),Ae={...t,...V};return Ae.display="block",(0,S.jsx)(_.A.Provider,{value:ce,children:(0,S.jsx)(x.A,{show:D,ref:ie,backdrop:L,container:F,keyboard:!0,autoFocus:I,enforceFocus:P,restoreFocus:H,restoreFocusOptions:O,onEscapeKeyDown:e=>{k||"static"!==L?k&&M&&M(e):(e.preventDefault(),ge())},onShow:$,onHide:R,onEnter:(e,s)=>{e&&he(e),null==W||W(e,s)},onEntering:(e,s)=>{null==K||K(e,s),(0,i.Ay)(window,"resize",ue)},onEntered:U,onExit:e=>{null==ae.current||ae.current(),null==B||B(e)},onExiting:z,onExited:e=>{e&&(e.style.display=""),null==q||q(e),(0,c.A)(window,"resize",ue)},manager:de(),transition:N?T:void 0,backdropTransition:N?E:void 0,renderBackdrop:xe,renderDialog:t=>(0,S.jsx)("div",{role:"dialog",...t,style:Ae,className:o()(s,e,Z&&`${e}-static`),onClick:L?me:void 0,onMouseUp:pe,"aria-label":w,"aria-labelledby":f,"aria-describedby":C,children:(0,S.jsx)(b,{...Y,onMouseDown:ve,className:a,contentClassName:l,children:j})})})})}));F.displayName="Modal",F.defaultProps=R;const I=Object.assign(F,{Body:f,Header:k,Title:$,Footer:D,Dialog:w,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150})},675:(e,s,t)=>{t.d(s,{A:()=>n});var a=t(71633),l=t.n(a),o=t(63696),i=t(71971),r=t(62540);const n=o.forwardRef((({bsPrefix:e,className:s,striped:t,bordered:a,borderless:o,hover:n,size:c,variant:d,responsive:h,...u},v)=>{const p=(0,i.oU)(e,"table"),g=l()(s,p,d&&`${p}-${d}`,c&&`${p}-${c}`,t&&`${p}-${"string"==typeof t?`striped-${t}`:"striped"}`,a&&`${p}-bordered`,o&&`${p}-borderless`,n&&`${p}-hover`),m=(0,r.jsx)("table",{...u,className:g,ref:v});if(h){let e=`${p}-responsive`;return"string"==typeof h&&(e=`${e}-${h}`),(0,r.jsx)("div",{className:e,children:m})}return m}))}}]);
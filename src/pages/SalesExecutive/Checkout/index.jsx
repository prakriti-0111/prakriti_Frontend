import React from 'react'
import withRouter from "helpers/withRouter";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import Loader from '../Loader'
import cartImage from 'src/assets/images/cartImage.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import BeatLoader from "react-spinners/BeatLoader";
import {AddressFetch, AddressList, getCountries, getStates, getDistricts} from "actions/Sales/address.actions";
import {RetailerList} from "actions/Sales/user.actions";
import {checkoutList} from "actions/Sales/checkout.actions"
import {CartList} from "actions/Sales/addcart.actions";
import {AddressCreate} from "actions/Sales/address.actions";
import {OrderCreate} from "actions/Sales/placeOrder.actions";
import {toast} from "react-toastify";
import { SALES_ADDRESS_RESET } from 'actionTypes/Sales/address.types';
import { RESET_ORDER } from 'actionTypes/Sales/order.types';
import Cookies from 'universal-cookie';

class CheckoutPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            item_total: this.props.item_total,
            item_total_display: this.props.item_total_display,
            total_payable: this.props.total_payable,
            total_payable_display: this.props.total_payable_display,
            addressList: this.props.addressList,
            newAddress: false,
            addressForm: {
                name: '',
                contact: '',
                country_id: '',
                state_id: '',
                district_id: '',
                city: '',
                zipcode: '',
                landmark: '',
                type: ''
            },
            addressFormErrors: {
                name: false,
                contact: false,
                country_id: false,
                state_id: false,
                district_id: false,
                city: false,
                zipcode: false,
                landmark: false,
                type: false
            },
            countryList: [],
            stateList: [],
            districtList: [],
            adrs_actionCalled: this.props.adrs_actionCalled,
            adrs_createSuccess: this.props.adrs_createSuccess,
            adrs_editSuccess: this.props.adrs_editSuccess,
            adrs_deleteSuccess: this.props.adrs_deleteSuccess,
            adrs_successMessage: this.props.adrs_successMessage,
            adrs_errorMessage: this.props.adrs_errorMessage,
            order_actionCalled: this.props.order_actionCalled,
            order_createSuccess: this.props.order_createSuccess,
            order_successMessage: this.props.order_successMessage,
            order_errorMessage: this.props.order_errorMessage,
            order_id: this.props.order_id,
            address_submitting: false,
            payment_mode: 'cash',
            address_id: '',
            retailer_id:'',
            retailerList:this.props.RetailerList,
            processing: false
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        if(props.addressList !== state.addressList){
            update.addressList = props.addressList;
        }
        if(props.retailerList !== state.retailerList){
            update.retailerList = props.retailerList;
        }
        if(props.items !== state.items){
            update.items = props.items;
        }
        if(props.item_total !== state.item_total){
            update.item_total = props.item_total;
        }
        if(props.total_payable !== state.total_payable){
            update.total_payable = props.total_payable;
        }
        if(props.item_total_display !== state.item_total_display){
            update.item_total_display = props.item_total_display;
        }
        if(props.total_payable_display !== state.total_payable_display){
            update.total_payable_display = props.total_payable_display;
        }
        if (props.adrs_actionCalled !== state.adrs_actionCalled) {
            update.adrs_actionCalled = props.adrs_actionCalled;
        }
        if (props.adrs_createSuccess !== state.adrs_createSuccess) {
            update.adrs_createSuccess = props.adrs_createSuccess;
        }
        if (props.adrs_editSuccess !== state.adrs_editSuccess) {
            update.adrs_editSuccess = props.adrs_editSuccess;
        }
        if (props.adrs_deleteSuccess !== state.adrs_deleteSuccess) {
            update.adrs_deleteSuccess = props.adrs_deleteSuccess;
        }
        if (props.adrs_successMessage !== state.adrs_successMessage) {
            update.adrs_successMessage = props.adrs_successMessage;
        }
        if (props.adrs_errorMessage !== state.adrs_errorMessage) {
            update.adrs_errorMessage = props.adrs_errorMessage;
        }
        if (props.order_actionCalled !== state.order_actionCalled) {
            update.order_actionCalled = props.order_actionCalled;
        }
        if (props.order_createSuccess !== state.order_createSuccess) {
            update.order_createSuccess = props.order_createSuccess;
        }
        if (props.order_successMessage !== state.order_successMessage) {
            update.order_successMessage = props.order_successMessage;
        }
        if (props.order_errorMessage !== state.order_errorMessage) {
            update.order_errorMessage = props.order_errorMessage;
        }
        if (props.order_id !== state.order_id) {
            update.order_id = props.order_id;
        }
        return update;
    }

    componentDidUpdate(prevProps){
        if(this.state.adrs_actionCalled){
            if(this.state.adrs_createSuccess){
                toast.success(this.state.adrs_successMessage);
                this.setState({
                    addressForm: {
                        name: '',
                        contact: '',
                        country_id: '',
                        state_id: '',
                        district_id: '',
                        city: '',
                        zipcode: '',
                        landmark: '',
                        type: ''
                    },
                    addressFormErrors: {
                        name: false,
                        contact: false,
                        country_id: false,
                        state_id: false,
                        district_id: false,
                        city: false,
                        zipcode: false,
                        landmark: false,
                        type: false
                    },
                    address_submitting: false,
                    newAddress: false
                    
                });
                this.loadAddress();
            }else{
                toast.error(this.state.adrs_errorMessage);
                this.setState({
                    address_submitting: false
                })
            }
            this.props.dispatch({
                type: SALES_ADDRESS_RESET
            });
        }

        if(this.state.order_actionCalled){
            if(this.state.order_createSuccess){
                var date = new Date();
                date.setTime(date.getTime()+(5*60*1000));
                const cookies = new Cookies();
                cookies.set('order_id', this.state.order_id, { path: '/', expires: date });
                toast.success(this.state.order_successMessage);
                this.props.dispatch({
                    type: RESET_ORDER
                });
                this.setState({
                    processing: false
                });
                this.props.navigate('/sales-executive/order-success');
            }else{
                toast.error(this.state.order_errorMessage);
                this.setState({
                    processing: false
                })
                this.props.dispatch({
                    type: RESET_ORDER
                });
            }
            
        }
    }

    componentDidMount(){
        this.props.actions.CartList();
        this.loadAddress();
        this.loadCheckoutData();
        this.loadCountryList();
        this.loadRetailer();
        
    }

    loadAddress = () => {
        this.props.actions.AddressList();
    }

    loadRetailer(){
        
        this.props.actions.RetailerList();
    }

    loadCheckoutData = () => {

    }

    loadCountryList = async () => {
        const res = await getCountries();
        if(res.data.success){
            this.setState({
                countryList: res.data.data
            })
        }
    }

    handleNewAddress = () => {
        this.setState({
            newAddress: !this.state.newAddress
        })
    }

    handleChange = (e) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleAddressChange = async(event) => {
        const {name, value} = event.target;
        this.setState({
            addressForm: {
                ...this.state.addressForm,
                [name] : value
            }
        }, async() => {
            if(name == "country_id"){
                let stateList = [];
                if(value){
                    const res = await getStates({country_id: value});
                    if(res.data.success){
                        stateList = res.data.data;
                    }
                }
                this.setState({
                    stateList: stateList,
                    addressForm: {
                        ...this.state.addressForm,
                        state_id : '',
                        district_id : ''
                    }
                })
            }else if(name == "state_id"){
                let districtList = [];
                if(value){
                    const res = await getDistricts({state_id: value});
                    if(res.data.success){
                        districtList = res.data.data;
                    }
                }
                this.setState({
                    districtList: districtList,
                    addressForm: {
                        ...this.state.addressForm,
                        district_id : ''
                    }
                });
            }
        });
    }

    onAddressSubmit = (e) => {
        e.preventDefault();

        if(this.formValidate()){
            this.setState({
                address_submitting: true
            })
            this.props.actions.AddressCreate(this.state.addressForm);
        }
    }

    formValidate = () => {
        let hasErr = false;
        let addressForm = this.state.addressForm;
        let addressFormErrors = this.state.addressFormErrors;
        if(!addressForm.name){
            addressFormErrors.name = true;
            hasErr = true;
        }else{
            addressFormErrors.name = false;
        }
        if(!addressForm.contact){
            addressFormErrors.contact = true;
            hasErr = true;
        }else{
            addressFormErrors.contact = false;
        }
        if(!addressForm.country_id){
            addressFormErrors.country_id = true;
            hasErr = true;
        }else{
            addressFormErrors.country_id = false;
        }
        if(!addressForm.state_id){
            addressFormErrors.state_id = true;
            hasErr = true;
        }else{
            addressFormErrors.state_id = false;
        }
        if(!addressForm.district_id){
            addressFormErrors.district_id = true;
            hasErr = true;
        }else{
            addressFormErrors.district_id = false;
        }
        if(!addressForm.city){
            addressFormErrors.city = true;
            hasErr = true;
        }else{
            addressFormErrors.city = false;
        }
        if(!addressForm.zipcode){
            addressFormErrors.zipcode = true;
            hasErr = true;
        }else{
            addressFormErrors.zipcode = false;
        }
        if(!addressForm.type){
            addressFormErrors.type = true;
            hasErr = true;
        }else{
            addressFormErrors.type = false;
        }
        this.setState({
            addressFormErrors: addressFormErrors
        })
        console.log(addressFormErrors)
        return !hasErr;
    }

    cancelAddressCreate = () => {
        this.setState({
            newAddress: false
        })
    }
    handleRetailerOnchange = (e) => {
         const {name, value} = e.target;
        this.setState({
            retailer_id:value
        })
    }
    handlePlaceOrder = () => {
        if(!this.state.address_id){
            toast.error("Please select address.");
            return;
        }
        if(!this.state.retailer_id){
            toast.error("Please select Retailer.");
            return;
        }
        this.setState({
            processing: true
        })
        let data = {
            sub_total: this.state.item_total,
            discount_amount: 0,
            total_amount: this.state.total_payable,
            payment_mode: this.state.payment_mode,
            delivery_address: this.state.address_id,
            retailer_id: this.state.retailer_id
        }
        this.props.actions.OrderCreate(data);
    }

    render(){
        const {newAddress, addressForm, addressFormErrors, addressList, countryList, stateList, districtList,retailerList} = this.state;
        const cartList = this.state.items;
        return (
            <div className='checkout-wrapper checkout-desktop'>
                <Container>
                    <div className='breadcrumb-wrapper'>
                        <Breadcrumb>
                            <Breadcrumb.Item href=''>Home</Breadcrumb.Item>
                            <Breadcrumb.Item href=''>Cart</Breadcrumb.Item>
                            <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className='checkout-header'>
                            <h3>Checkout</h3>
                        </div>
                    </div>
                    <div className='wrapper-checkout'>
                        <div className='checkout-single-wrapper bg-white me-md-5'>
                            <div className='c-address-area'>
                                <div className='header mb-3'>
                                    {/* <h4>Delivery Address</h4> */}
                                    <h5>Select an Address</h5>
                                </div>
                                {
                                    addressList.map((item, key) => (
                                        <div className='single-address' key={key}>
                                            <div className='single-address-header'>
                                                <div className='address-radio'>
                                                    <Form.Check 
                                                        type="radio"
                                                        name="address_id"
                                                        value={item.id}
                                                        onChange={(e)=>this.handleChange(e)}
                                                    />
                                                    <span>{item.name}</span>
                                                    <span> {item.contact} </span>
                                                </div>
                                                <div className='address-edit'> {/*<strong> EDIT </strong>*/}</div>
                                            </div>
                                            <p>{item.formated_address}</p>
                                        </div>
                                    ))
                                }
                                <hr />
                                <div className='add-address' onClick={this.handleNewAddress}>
                                    {newAddress ? <AiOutlineMinus />:<AiOutlinePlus/>}
                                     ADD NEW ADDRESS
                                </div>
                                <hr/>
                                {newAddress &&
                                    <Form onSubmit={this.onAddressSubmit}>
                                        <Form.Group className="mb-4">
                                            <Row>
                                                <Col xs={12} md={12}>
                                                    <Form.Label>Name : </Form.Label>
                                                    <Form.Control name='name' value={addressForm.name}
                                                                  onChange={(e) => this.handleAddressChange(e)}
                                                                  placeholder="Enter your Name"
                                                                  className={addressFormErrors.name ? 'is-invalid' : ''}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a name.
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Phone : </Form.Label>
                                            <Form.Control name='contact' value={addressForm.contact}
                                                          onChange={(e) => this.handleAddressChange(e)}
                                                          placeholder="Phone Number" className={addressFormErrors.contact ? 'is-invalid' : ''}/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid mobile number.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Country : </Form.Label>
                                            <Form.Select 
                                                name='country_id' value={addressForm.country_id}
                                                onChange={(e) => this.handleAddressChange(e)}
                                                className={addressFormErrors.country_id ? 'is-invalid' : ''}
                                            >
                                                <option value=''>select country</option>
                                                {
                                                    countryList.map((item, key) => (
                                                        <option value={item.id} key={key}>{item.name}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please select country.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>State : </Form.Label>
                                            <Form.Select 
                                                name='state_id' value={addressForm.state_id}
                                                onChange={(e) => this.handleAddressChange(e)}
                                                className={addressFormErrors.state_id ? 'is-invalid' : ''}
                                            >
                                                <option value=''>select state</option>
                                                {
                                                    stateList.map((item, key) => (
                                                        <option value={item.id} key={key}>{item.name}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please select state.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>District : </Form.Label>
                                            <Form.Select 
                                                name='district_id' value={addressForm.district_id}
                                                onChange={(e) => this.handleAddressChange(e)}
                                                className={addressFormErrors.district_id ? 'is-invalid' : ''}
                                            >
                                                <option value=''>select district</option>
                                                {
                                                    districtList.map((item, key) => (
                                                        <option value={item.id} key={key}>{item.name}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please select district.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Town/City : </Form.Label>
                                            <Form.Control name='city' value={addressForm.city}
                                                          onChange={(e) => this.handleAddressChange(e)}
                                                          placeholder="Town/ City" 
                                                          className={addressFormErrors.city ? 'is-invalid' : ''}
                                                    />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a Town/city.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>PIN Code : </Form.Label>
                                            <Form.Control name='zipcode' value={addressForm.zipcode}
                                                          onChange={(e) => this.handleAddressChange(e)}
                                                          placeholder="PIN Code" 
                                                          className={addressFormErrors.zipcode ? 'is-invalid' : ''}
                                                          />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a Pin code.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Landmark : </Form.Label>
                                            <Form.Control name='landmark' value={addressForm.landmark}
                                                          onChange={(e) => this.handleAddressChange(e)}
                                                          placeholder="landmark"  />
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Select Type : </Form.Label>
                                            <Form.Select name='type' value={addressForm.type}
                                                onChange={(e) => this.handleAddressChange(e)}
                                                className={addressFormErrors.type ? 'is-invalid' : ''}
                                            >
                                                <option value=''>Select type</option>
                                                <option value="Office">Office</option>
                                                <option value="Home">Home</option>
                                                <option value="Other">Other</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a type.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className='address-btn'>
                                            <Button variant="primary" type="submit">SAVE & CONTINUE</Button>
                                            <Button variant="default" type="button" onClick={this.cancelAddressCreate}>CANCEL</Button>
                                        </div>
                                    </Form>
                                }
                                </div>
                                <div className="c-address-area">
                                    <select className="form-select" name="retailer_name" value={this.state.retailer_id} onChange={(e) => this.handleRetailerOnchange(e)}>
                                        <option value="">Select Retailer</option>
                                        {
                                            retailerList.map((item, key) => (
                                                <option value={item.id} key={key}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                        </div>
                        <div className='checkout-single-wrapper'>
                            <div className='checkout-summary-area'>
                                <div className='checkout-s-header'>
                                    <h3>Order Summary</h3>
                                </div>
                                <hr />


                                {cartList.map((item, index)=>
                                    <div key={index}>
                                        <div className='checkout-single-item'>
                                            <div className='checkout-item-image'>
                                                <img src={item.product_image} alt='' />
                                            </div>
                                            <div className='checkout-item-content d-flex justify-content-between align-items-center'>
                                                <div>
                                                    <h2>{item.product_name}</h2>
                                                    {
                                                        item.cart_material.map((val, key) => (
                                                            <h5 key={key}>{val.material}: {val.quantity > 0 ? (val.quantity + ' ' + val.material + ', ') : ''} {val.purity_name}, {val.weight} {val.unit_name}</h5>
                                                        ))
                                                    }
                                                    <p>Size: <span> {item.size_name} </span></p>
                                                    <p>Qty: <span> {item.quantity} </span></p>
                                                </div>
                                                <div className='checkout-price'>
                                                    <h4> {item.total_price_display}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            index < (cartList.length-1) ? 
                                            <hr className="w-100" />
                                            : null
                                        }
                                    </div>
                                )}
                                <hr />
                                <div className='checkout-total d-flex justify-content-between mb-2'>
                                    <span className='total'> Total ({cartList.length}) Items </span>
                                    {/* <span className='d-flex align-items-center gap-3'> */}
                                        {/*<p className='total-save'>You saved ₹{checkout?.display_discount || 0}</p>*/}
                                        <span className='total-price' style={{color:"black"}}> {this.state.total_payable_display } </span>
                                    {/* </span> */}
                                </div>



                                <hr />
                                <div className='promo-code'>
                                    <p>I have a promo code </p>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Enter Promocode"
                                            aria-label="Enter Promocode"
                                            aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Text id="basic-addon2">APPLY</InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <div className='payment-method'>
                                    <h5 className='mb-3'>Payments</h5>
                                    {/*<span className='online-payment d-flex gap-2 mb-2'>
                                        <Form.Check
                                            // name={'payment_mode'} value={'online'} onChange={(e)=>handleGetData(e)}
                                            type="radio" aria-label="radio 1" disabled={true} />
                                       <span >  Online Payment  </span> 
                                    </span>*/}
                                    <span className='place-order d-flex gap-2 mb-4'>
                                        <Form.Check type="radio" aria-label="radio 1" name={'payment_mode'} defaultChecked={true} value={'cash'}  label={'Cash on Delivery'}/>
                                        {/*Cash on Delivery*/}
                                    </span>
                                    <Button variant="primary" onClick={this.handlePlaceOrder} disabled={this.state.processing}>
                                        {
                                            this.state.processing ?
                                            "PROCESSING..."
                                            :
                                            "PLACE ORDER"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div> 
        )
    }

}


const mapStateToProps = (state) => ({
    addressList: state.sales.address.items,
    items: state.sales.cart.items,
    item_total: state.sales.cart.item_total,
    item_total_display: state.sales.cart.item_total_display,
    total_payable: state.sales.cart.total_payable,
    total_payable_display: state.sales.cart.total_payable_display,
    adrs_actionCalled: state.sales.address.actionCalled,
    adrs_createSuccess: state.sales.address.createSuccess,
    adrs_editSuccess: state.sales.address.editSuccess,
    adrs_deleteSuccess: state.sales.address.deleteSuccess,
    adrs_successMessage: state.sales.address.successMessage,
    adrs_errorMessage: state.sales.address.errorMessage,
    order_actionCalled: state.sales.order.actionCalled,
    order_createSuccess: state.sales.order.createSuccess,
    order_successMessage: state.sales.order.successMessage,
    order_errorMessage: state.sales.order.errorMessage,
    order_id: state.sales.order.order_id,
    retailerList: state.sales.retailer.items
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ AddressList, checkoutList, CartList, OrderCreate, AddressCreate,RetailerList}, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage));
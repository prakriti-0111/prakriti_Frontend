import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlinePlus } from "react-icons/ai";
import cartImage from 'src/assets/images/cartImage.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import withRouter from "helpers/withRouter";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {AddressCreate} from "actions/Retailer/address.actions";
import { toast } from 'react-toastify';

const AddAddress = (props) => {
    const address = useSelector((state) => state.retailer.address)
const navigate =useNavigate();
    // const access_token= localStorage.getItem('auth')
    // let userToken=JSON.parse(access_token).access_token

const [userAddress,setUserAddress]=React.useState({
    name:"",
    landmark:"",
    street:"",
    city:"",
    state:"",
    country:"",
    zipcode:"",
    contact:"",
    email:"",
    type:''
})

const [userAddressError,setUserAddressError]=React.useState({})
const [validated, setValidated] = React.useState(false);
const [checkAddressCall,setCheckAddressCall]=React.useState({})

const handleAddressChange=(e)=>{
const {name,value}=e.target;
setUserAddress({...userAddress,[name]:value})
}

    const ValidationAddress = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) {
                    return "'Please input name!'"
                } else {
                    return '';
                }
            case 'lastName':
                if (!value) {
                    return "'Please input lastName!'"
                } else {
                    return '';
                }
            case 'landmark':
                if (!value) {
                    return "'Please input landmark!'"
                } else {
                    return '';
                }
            case 'street':
                if (!value) {
                    return "'Please input street!'"
                } else {
                    return '';
                }
            case 'city':
                if (!value) {
                    return "'Please input City!'"
                } else {
                    return '';
                }
            case 'state':
                if (!value) {
                    return "'Please input state!'"
                } else {
                    return '';
                }
            case 'country':
                if (!value) {
                    return "'Please input Country!'"
                } else {
                    return '';
                }
            case 'zipcode':
                if (!value) {
                    return "'Please input ZipCode!'"
                } else {
                    return '';
                }
            case 'contact':
                if (!value) {
                    return "'Please input Contact!'"
                } else {
                    return '';
                }
            case 'email':
                if (!value) {
                    return "'Please input email!'"
                } else {
                    return '';
                }
            case 'type':
                if (!value) {
                    return "'Please input type!'"
                } else {
                    return '';
                }
            default: {
                return null;
            }
        }
    }

    useEffect(()=>{
        if(address.createSuccess){
            toast.success(address?.successMessage)
            setValidated(false)
                    setUserAddress({
                        name:"",
                        lastName:"",
                        landmark:"",
                        street:"",
                        city:"",
                        state:"",
                        country:"",
                        zipcode:"",
                        contact:"",
                        email:"",
                        type:''
                    })
        }else{
            toast.error(address?.errorMessage)
        }
    },[address])

const onSubmit=async(e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else{
        setValidated(true)
        let  allErrors={}
        Object.keys(userAddress).forEach(key => {
            const error = ValidationAddress(key, userAddress[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setUserAddressError(allErrors)
        }
        else{
        props.actions.AddressCreate(userAddress)
    }
}
}
const onReset=()=>{
    setUserAddress({
        name:"",
        landmark:"",
        street:"",
        city:"",
        state:"",
        country:"",
        zipcode:"",
        contact:"",
        email:"",
        type:''
    })
    setValidated(false)
}
    return (
        <>
            <div className='checkout-wrapper add-address-desktop'>
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
                                    <h4>Delivery Address</h4>
                                    <h5 className='mb-4'><HiArrowNarrowLeft onClick={()=>navigate('/checkout')}/> Address New Address</h5>
                                </div>
                                <Form noValidate validated={validated}>
                                <Form.Group className="mb-4">
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Form.Label>Name : </Form.Label>
                                            <Form.Control required name='name' value={userAddress.name} onChange={(e)=>handleAddressChange(e)} placeholder="Enter your Name*" controlId="validationCustom01" />
                                            <Form.Control.Feedback type="invalid">
                                                 Please provide a name.
                                           </Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Landmark : </Form.Label>
                                    <Form.Control required name='landmark' value={userAddress.landmark} onChange={(e)=>handleAddressChange(e)} placeholder="landmark. *" controlId="validationCustom03"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a landmark, Suite, House No.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Street : </Form.Label>
                                    <Form.Control required name='street' value={userAddress.street} onChange={(e)=>handleAddressChange(e)} placeholder="Street Address*" controlId="validationCustom04"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a Street Address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Town/City : </Form.Label>
                                    <Form.Control required name='city' value={userAddress.city} onChange={(e)=>handleAddressChange(e)} placeholder="Town/ City*" controlId="validationCustom05"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a Town/city.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>State : </Form.Label>
                                    <Form.Control required name='state' value={userAddress.state} onChange={(e)=>handleAddressChange(e)} placeholder="state*" controlId="validationCustom06"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>country : </Form.Label>
                                    <Form.Control required name='country' value={userAddress.country} onChange={(e)=>handleAddressChange(e)} placeholder="country **" controlId="validationCustom07"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a country.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>ZipCode : </Form.Label>
                                    <Form.Control required name='zipcode' value={userAddress.zipcode} onChange={(e)=>handleAddressChange(e)} placeholder="PIN Code*" controlId="validationCustom08"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a Pin code.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>PhoneNumber : </Form.Label>
                                    <Form.Control required name='contact' value={userAddress.contact} onChange={(e)=>handleAddressChange(e)} placeholder="Phone Number*" controlId="validationCustom09"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a valid mobile Number.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Email : </Form.Label>
                                    <Form.Control required name='email' value={userAddress.email} onChange={(e)=>handleAddressChange(e)} placeholder="Email Address" controlId="validationCustom010"/>
                                    <Form.Control.Feedback type="invalid">
                                                 Please provide a Valid Email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Select Type : </Form.Label>
                                    <Form.Select required name='type'  value={userAddress.type} onChange={(e)=>handleAddressChange(e)} aria-label="Default select example" controlId="validationCustom11">
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
                                    <Button variant="primary" onClick={onSubmit}>SAVE & CONTINUE</Button>
                                    <Button variant="default" onClick={onReset}>CANCEL</Button>
                                </div>
                                </Form>
                            </div>
                        </div>
                        <div className='checkout-single-wrapper'>
                            <div className='checkout-summary-area'>
                                <div className='checkout-s-header'>
                                    <h3>Order Summary</h3>
                                </div>
                                <hr />
                                <div className='checkout-single-item'>
                                    <div className='checkout-item-image'>
                                        <img src={cartImage} alt='' />
                                    </div>
                                    <div className='checkout-item-content d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h2>Gold Plated Ring</h2>
                                            <h5>Metal: 18Kt Gold, 3.50 gram..</h5>
                                            <p>Size: <span>14</span></p>
                                            <p>Qty: <span>1</span></p>
                                        </div>
                                        <div className='checkout-price'>
                                            <h4>₹6999</h4>
                                        </div>
                                    </div>

                                </div>
                                <hr />
                                <div className='checkout-total d-flex justify-content-between mb-5'>
                                    <span className='total'> Total</span>
                                    <span className='d-flex align-items-center gap-3'>
                                        <p className='total-save'>You saved ₹2000</p>
                                        <span className='total-price'> ₹12999 </span>
                                    </span>
                                </div>
                                <hr />
                                <div className='gap-30'></div>
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
                                <div className='gap-30'></div>
                                <div className='payment-method'>
                                    <h5 className='mb-3'>Payments</h5>
                                    <span className='online-payment d-flex gap-2 mb-4'>
                                        <Form.Check type="radio" aria-label="radio 1" />
                                        Online Payment
                                    </span>
                                    <span className='place-order d-flex gap-2 mb-4'>
                                        <Form.Check type="radio" aria-label="radio 1" />
                                        Cash on Delivery
                                    </span>
                                    <Button variant="primary">PLACE ORDER</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <div className='checkout-wrapper add-address-mobile'>
                <Container>
                    <div className='mobile-checkout-header mb-4'>
                        <HiArrowNarrowLeft /> <h3>Checkout</h3>
                    </div>
                    <div className='wrapper-checkout'>
                        <div className='checkout-single-wrapper'>
                            <div className='checkout-summary-area'>
                                <div className='checkout-s-header'>
                                    <h3>ESTIMATED DELIVERY DATE</h3>
                                </div>
                                <div className='checkout-single-wrapper bg-white me-md-5'>
                                    <div className='c-address-area mb-3'>
                                        <div className='single-address'>
                                            <div className='single-address-header'>
                                                <div className='address-radio'>
                                                    <Form.Check type="radio" aria-label="radio 1" />
                                                    <span>Abhijit Kumar</span>
                                                    <span> 7250064535 </span>
                                                </div>
                                                <div className='address-edit'> <strong> EDIT </strong></div>
                                            </div>
                                            <p>407, Trident Heights, Phase 4, Sector 87, Gurugram, Haryana- 182021</p>


                                        </div>
                                        <hr />
                                        <div className='add-address'>
                                        <Button variant="primary">
                                        <AiOutlinePlus /> ADD NEW ADDRESS
                                      </Button>
                         
                                        </div>
                                    </div>
                                </div>
                                <div className='checkout-single-item mb-3'>
                                    <div className='checkout-item-image'>
                                        <img src={cartImage} alt='' />
                                    </div>
                                    <div className='checkout-item-content d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h2>Gold Plated Ring</h2>
                                            <h5>Tue Feb 24</h5>
                                        </div>
                                    </div>

                                </div>

                                <div className='mob-order-summary'>
                                    <h3>ORDER SUMMARY</h3>
                                    <div className='summary-total-area'>
                                        <div>
                                            <p>Total (2) Item</p>
                                            <p>₹12999</p>
                                        </div>
                                        <div>
                                            <p>Total</p>
                                            <p>₹12999</p>
                                        </div>
                                        <div className='border-bottom mb-1'></div>
                                        <p className='order-save'>Your Total Savings on this order is ₹499.</p>
                                    </div>
                                </div>
                                <div className='promo-code'>
                                    <p className='mt-4 mb-4'>I have a promo code </p>

                                </div>
                                <div className='payment-method mb-5'>
                                    <span className='online-payment d-flex gap-2 mb-4'>
                                        <Form.Check type="radio" aria-label="radio 1" />
                                        Online Payment
                                    </span>
                                    <span className='place-order d-flex gap-2 '>
                                        <Form.Check type="radio" aria-label="radio 1" />
                                        Cash on Delivery
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='mobile-pay-now'>
                            <Button variant="primary">PLACE ORDER</Button>
                        </div>
                    </div>
                    <div className='address-bottom-popup'>
                            <Form.Group className="mb-4">
                                <div className='bottom-popup-wrapper'>
                                    <Col xs={12} md={6}>
                                        <Form.Control placeholder="First Name*" />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Control placeholder="Last Name*" />
                                    </Col>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control placeholder="landmark, Suite, House No. *" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control placeholder="Street Address*" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control placeholder="Town/ City*" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control placeholder="PIN Code*" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control placeholder="Phone Number*" />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control placeholder="Email Address" />
                            </Form.Group>
                            <div className='address-btn'>
                                <Button variant="primary">SAVE</Button>
                                <Button variant="default">CANCEL</Button>
                            </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    items: state.retailer.address.items,
    total: state.retailer.address.total,
    actionCalled: state.retailer.address.actionCalled,
    createSuccess: state.retailer.address.createSuccess,
    editSuccess: state.retailer.address.editSuccess,
    deleteSuccess: state.retailer.address.deleteSuccess,
    successMessage: state.retailer.address.successMessage,
    errorMessage: state.retailer.address.errorMessage
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({AddressCreate}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAddress));

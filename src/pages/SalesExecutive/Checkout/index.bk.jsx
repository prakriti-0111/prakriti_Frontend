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
import {AddressFetch} from "actions/Customer/address.actions";
import {checkoutList} from "actions/Customer/checkout.actions"
import {CartList} from "actions/Customer/addcart.actions";
import {AddressCreate} from "actions/Customer/address.actions";
import {OrderCreate} from "actions/Customer/placeOrder.actions";
import {toast} from "react-toastify";



const Checkout = (props) => {
    const [load, setLoad] = useState(true);
    const authId= useSelector((state)=>state.auth)
    const customerAddress= useSelector((state)=>state.address)
    const checkoutLists =useSelector((state)=>state.checkout)
    const cartLength =useSelector((state)=>state.addCart.items.length)
    const [userAddressData,setUserAddressData]=React.useState({})
    const address = useSelector((state) => state.address)
    const [checkout,setCheckout] = useState([])
    const [validated, setValidated] = React.useState(false);
    const[openAddress,setOpenAddress]=useState(false)
    const[userData,setUserData]=React.useState({
        address:'',
        payment_mode: ''
    })
    const [userAddressError,setUserAddressError]=React.useState({})
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
    const handleGetData=(e)=>{
        const {name,value}=e.target
        setUserData({...userData,[name]:value})
    }
    var navigate= useNavigate();
    const handleAddressChange=(e)=>{
        const {name,value}=e.target;
        setUserAddress({...userAddress,[name]:value})
    }
    const onEditMove=()=>{
        setLoad(true)
        navigate('/edit-profile')
    }
    const onAddressMove=()=>{

        setOpenAddress(!openAddress)
        setLoad(true)
        navigate('/add-address')
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

    useEffect(()=>{
        if(customerAddress?.getSuccess){
            setUserAddressData(customerAddress?.items)
        }

    },[customerAddress?.getSuccess])
    useEffect(()=>{
        setLoad(false)
        props.actions.AddressFetch(authId.user.id)
        props.actions.CartList();
    },[])


    useEffect(()=>{
        if(checkoutLists?.getItemsSuccess){
            setCheckout(checkoutLists.items)
        }else{

            setCheckout([])
        }
    },[checkoutLists])

    const getCheckoutList=async()=>{
        setLoad(false)
        props.actions.checkoutList();
 }


 React.useEffect(()=>{
    setLoad(true)
    getCheckoutList();
    },[])


    const warn = () =>{
        toast.warn("Currently We are Accepting Cash on Delivery!")
    }

    const onPlaceOrder=()=>{
        const data={
            delivery_address:userData?.address||userAddressData.type+','+userAddressData.street+','+userAddressData.landmark+','+userAddressData.country+','+userAddressData.city+','+userAddressData.state+'-'+userAddressData.zipcode ,
           sub_total: checkout.display_price || 2999,
           discount_amount: checkout.display_discount || 2999,
           total_amount :checkout.display_total || 2999,
           payment_mode:userData?.payment_mode|| "cash"
        }
        setLoad(false)
        props.actions.OrderCreate(data);
        toast.success("Order place successfully!")
        setLoad(true)
         navigate('/order-success')
}

   //Loader......

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
                setLoad(false)
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
{load?<Loader/>:

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
                                    <h4>Delivery Address</h4>
                                    <h5>Select an Address</h5>
                                </div>
                                <div className='single-address'>
                                    <div className='single-address-header'>
                                        <div className='address-radio'>
                                            <Form.Check type="radio"
                                                        aria-label="radio 1"
                                                        // defaultChecked={true}
                                                        name={'address'}
                                                        value={userAddressData.type+','+userAddressData.street+','+userAddressData.landmark+','+userAddressData.country+','+userAddressData.city+','+userAddressData.state+'-'+userAddressData.zipcode}
                                                        onChange={(e)=>handleGetData(e)}
                                            />
                                            <span>{userAddressData.name}</span>
                                            <span> {userAddressData.contact} </span>
                                        </div>
                                        <div className='address-edit' onClick={onEditMove}> <strong> EDIT </strong></div>
                                    </div>
                                    <p> { userAddressData.type} , {userAddressData.street} , {userAddressData.landmark} , {userAddressData.country} , {userAddressData.city} , {userAddressData.state} - {userAddressData.zipcode} </p>
                                </div>
                                <hr />
                                <div className='add-address' onClick={onAddressMove}>
                                    {openAddress ? <AiOutlineMinus />:<AiOutlinePlus/>}
                                     ADD NEW ADDRESS
                                </div>
                                <hr/>
                                {openAddress &&
                                    <Form noValidate validated={validated}>
                                        <Form.Group className="mb-4">
                                            <Row>
                                                <Col xs={12} md={12}>
                                                    <Form.Label>Name : </Form.Label>
                                                    <Form.Control required name='name' value={userAddress.name}
                                                                  onChange={(e) => handleAddressChange(e)}
                                                                  placeholder="Enter your Name*"
                                                                  controlId="validationCustom01"/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a name.
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Landmark : </Form.Label>
                                            <Form.Control required name='landmark' value={userAddress.landmark}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="landmark. *" controlId="validationCustom03"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a landmark, Suite, House No.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Street : </Form.Label>
                                            <Form.Control required name='street' value={userAddress.street}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="Street Address*" controlId="validationCustom04"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a Street Address.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Town/City : </Form.Label>
                                            <Form.Control required name='city' value={userAddress.city}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="Town/ City*" controlId="validationCustom05"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a Town/city.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>State : </Form.Label>
                                            <Form.Control required name='state' value={userAddress.state}
                                                          onChange={(e) => handleAddressChange(e)} placeholder="state*"
                                                          controlId="validationCustom06"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a state.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>country : </Form.Label>
                                            <Form.Control required name='country' value={userAddress.country}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="country **" controlId="validationCustom07"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a country.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>ZipCode : </Form.Label>
                                            <Form.Control required name='zipcode' value={userAddress.zipcode}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="PIN Code*" controlId="validationCustom08"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a Pin code.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>PhoneNumber : </Form.Label>
                                            <Form.Control required name='contact' value={userAddress.contact}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="Phone Number*" controlId="validationCustom09"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid mobile Number.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Email : </Form.Label>
                                            <Form.Control required name='email' value={userAddress.email}
                                                          onChange={(e) => handleAddressChange(e)}
                                                          placeholder="Email Address" controlId="validationCustom010"/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a Valid Email.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Select Type : </Form.Label>
                                            <Form.Select required name='type' value={userAddress.type}
                                                         onChange={(e) => handleAddressChange(e)}
                                                         aria-label="Default select example"
                                                         controlId="validationCustom11">
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
                                }
                                </div>
                        </div>
                        <div className='checkout-single-wrapper'>
                            <div className='checkout-summary-area'>
                                <div className='checkout-s-header'>
                                    <h3>Order Summary</h3>
                                </div>
                                <hr />


                                {checkout.map((list,index)=>
                            <div key={index}>
                                <div className='checkout-single-item'  key={list.id}>
                                    <div className='checkout-item-image'>
                                        <img src={list?.default_image||cartImage} alt='' />
                                    </div>
                                    <div className='checkout-item-content d-flex justify-content-between align-items-center'>
                                      
                                        <div>
                                            <h2>{list.productName}</h2>
                                            <h5>{list.cartMaterial.material}: {list?.cartMaterial.purity_id || "18Kt Gold"}, {list?.cartMaterial.weight ||"3.50 gram.."}</h5>
                                            <p>Size: <span> {list.sizeName} </span></p>
                                            <p>Qty: <span> {list.quantity} </span></p>
                                        </div>
                                        <div className='checkout-price'>
                                            <h4> {list.display_price}</h4>
                                        </div>

                                    </div>

                                </div>                              
                             </div>
                                  )}
                                <hr />
                                <div className='checkout-total d-flex justify-content-between mb-5'>
                                    <span className='total'> Total ({cartLength}) Items </span>
                                    {/* <span className='d-flex align-items-center gap-3'> */}
                                        <p className='total-save'>You saved ₹{checkout?.display_discount || 0}</p>
                                        <span className='total-price' style={{color:"black"}}> {checkout.display_total } </span>
                                    {/* </span> */}
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
                                        <Form.Check
                                            // name={'payment_mode'} value={'online'} onChange={(e)=>handleGetData(e)}
                                            type="radio" aria-label="radio 1" disabled={true} />
                                       <span onClick={warn}>  Online Payment  </span> 
                                    </span>
                                    <span className='place-order d-flex gap-2 mb-4'>
                                        <Form.Check type="radio" aria-label="radio 1" name={'payment_mode'} value={'cash'} onChange={(e)=>handleGetData(e)} label={'Cash on Delivery'}/>
                                        {/*Cash on Delivery*/}
                                    </span>
                                    <Button variant="primary" onClick={onPlaceOrder}>PLACE ORDER</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div> 
}          

        </>
    )
}

const mapStateToProps = (state) => ({
    address: state.address,
    items: state.address.items,
    total: state.address.total,
    checkout:state.checkout,
    placeorder:state.placeorder,

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ AddressFetch ,checkoutList, CartList, OrderCreate,AddressCreate}, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
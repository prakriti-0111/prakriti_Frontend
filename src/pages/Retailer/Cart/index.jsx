import React, { useEffect,useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import cartImage from 'src/assets/images/cartImage.png';
import { MdOutlineDelete } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { CartList, CartDelete } from "actions/Retailer/addcart.actions";
import {checkoutList} from 'actions/Retailer/checkout.actions'
import { ToastContainer, toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";
import Modal from 'react-bootstrap/Modal';
import Loader from '../Loader';
import {RESET_ADDCART} from 'actionTypes/Retailer/addcart.types';

class CartPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            item_total_display: this.props.item_total_display,
            total_payable_display: this.props.total_payable_display,
            removeDialog: false,
            removingItem: null,
            actionCalled: this.props.actionCalled,
            deleteSuccess: this.props.deleteSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        if(props.items !== state.items){
            update.items = props.items;
        }
        if(props.item_total_display !== state.item_total_display){
            update.item_total_display = props.item_total_display;
        }
        if(props.total_payable_display !== state.total_payable_display){
            update.total_payable_display = props.total_payable_display;
        }
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.deleteSuccess !== state.deleteSuccess){
            update.deleteSuccess = props.deleteSuccess;
        }
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }

        return update;
    }

    componentDidUpdate(prevProps){
        if(this.state.actionCalled){
            if(this.state.deleteSuccess){
                toast.success(this.state.successMessage);
                this.setState({
                    removeDialog: false
                })
                this.props.dispatch({
                    type: RESET_ADDCART
                });
                this.props.actions.CartList();
            }else{
                toast.error(this.state.errorMessage);
                this.props.dispatch({
                    type: RESET_ADDCART
                });
            }
        }
    }

    removeConfirm = (item) => {
        this.setState({
            removeDialog: true,
            removingItem: item
        })
    }

    handleRemoveDialogClose = () => {
        this.setState({
            removeDialog: false
        })
    }

    handleCartRemove = () => {
        this.props.actions.CartDelete(this.state.removingItem.id)
    }

    handlePlaceOrder = () => {
        this.props.navigate('/retailer/checkout');
    }

    render() {
        const cartList = this.state.items;
        return (
            <>

            <div>
                <Modal show={this.state.removeDialog} onHide={this.handleRemoveDialogClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove From Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you want to remove this product from cart ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleRemoveDialogClose}>
                            No
                        </Button>
                        <Button variant="danger" onClick={this.handleCartRemove}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

            <div className='cart-wrapper desktop-cart'>
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Cart</Breadcrumb.Item>
                    </Breadcrumb>
                    <h3>My Shopping Cart</h3>
                    <Row >
                        <Col xs={12} md={8}>
                            {cartList.length > 0 ?
                                cartList.map((val, index) => (
                                    <React.Fragment key={index}>
                                    <div>
                                        <div className='cart-inner-wrapper' key={index}>
                                            <div className='cart-inner'>
                                                <div className='cart-image'>
                                                    <img src={val.product_image} alt='' />
                                                </div>
                                                <div className='cart-image-content'>
                                                    <div>
                                                        <div className='cart-image-title'>
                                                            <h2>{val.product_name}</h2>
                                                            <p>Product Code : <span>{val.product_code}</span></p>
                                                        </div>
                                                        <div className='cart-select'>
                                                            <Form.Group>
                                                                <Form.Label>Ring Size:</Form.Label>
                                                                {/*<Form.Select>
                                                                    <option>12</option>
                                                                    <option>13 </option>
                                                                    <option>14 </option>
                                                                    <option>15 </option>
                                                                    <option>16 </option>
                                                                </Form.Select>*/}
                                                                {val.size_name}
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Form.Label>Quantity:</Form.Label>
                                                                {/*<Form.Select>
                                                                    <option>1</option>
                                                                    <option>2 </option>
                                                                    <option>3 </option>
                                                                    <option>4 </option>
                                                                    <option>5 </option>
                                                                </Form.Select>*/}
                                                                {val.quantity}
                                                            </Form.Group>
                                                        </div>
                                                        {
                                                            val.cart_material.map((item, key) => (
                                                                <p className='mb-1' key={key}>{item.material}: <span>{item.quantity > 0 ? (item.quantity + ' ' + item.material + ', ') : ''} {item.purity_name}, {item.weight} {item.unit_name}</span></p>
                                                            ))
                                                        }
                                                        <div className='cart-icons mt-3'>
                                                            <h4 onClick={() => this.removeConfirm(val)}> <MdOutlineDelete /> Remove</h4>
                                                            {/*<h4>Move To Wishlist</h4>*/}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='price-wrapper'>
                                                            {/*<div className='cart-original-price'>
                                                                <span className='strikethrough'>₹8999</span>
                                                            </div>*/}
                                                            <div className='cart-discount-price'>
                                                                <span className='price'>{val.total_price_display}</span>
                                                            </div>
                                                        </div>
                                                        {/*<p className='making-charge'>(0% MAKING CHARGE)</p>*/}
                                                    </div>
                                                </div>

                                            </div>
                                            <hr />
                                            {
                                                index == (cartList.length-1) ? 
                                                <div className='cart-notes mt-4' style={{ width: "100%", bottom: "300px" }}>
                                                    <ul>
                                                        <li><HiCheckCircle /> 30 Day Money Back</li>
                                                        <li><HiCheckCircle /> Eligible for Lifetime exchange & Buy back</li>
                                                        <li><HiCheckCircle /> FREE & Insured Delivery</li>
                                                    </ul>
                                                </div>
                                                :  null
                                            }

                                        </div>
                                    </div>
                                    </React.Fragment>
                                ))
                                :
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <h5>Cart is empty !</h5>
                                </div>

                            }
                        </Col>
                        {/* {cartItem?.length > 0 &&
                            checkout?.map((item,index)=>( */}
                                <Col xs={12} md={4}>
                                    <div className='cart-right-sidebar'>
                                        <div className='order-summary-header'>
                                            <h4>ORDER SUMMARY</h4>
                                        </div>
                                        <div className='summary-items'>
                                            <p>Total ( <span>{cartList.length} </span> Items )</p>
                                            <p>{this.state.item_total_display}</p>
                                        </div>
                                        <div className='summary-t-payable'>
                                            <p><strong>Total Payable </strong></p>
                                            <p><strong>{this.state.total_payable_display}</strong></p>
                                        </div>
                                        {/*<div className='summary-save'>
                                            <p className='orange'>You Save <span>₹899 </span></p>
                                        </div>*/}
                                        {/*<div className='gift-card'>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="Gift Message (Optional)"
                                                    aria-label="Gift Message (Optional)"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Text id="basic-addon2"> <MdOutlineCardGiftcard /> ADD
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </div>*/}
                                        {
                                            cartList.length ?
                                            <>
                                                <div className='place-order-button mt-5'>
                                                    <Button variant="primary" onClick={this.handlePlaceOrder}>PLACE ORDER</Button>
                                                    <p className='mt-3'>I have a voucher code/ gift card</p>
                                                </div>
                                                <div className='gap-30'></div>
                                                <p className='queries'><span>Any Questions?</span> Please call us at 1800-419-0066
                                                    or Chat with us</p>
                                            </>
                                            : null
                                        }
                                    </div>
                                </Col>
                            {/* ))
                        } */}
                    </Row>



                </Container>
            </div>
            <div className='cart-wrapper mobile-cart'>
                <div className='mobile-cart-header mb-4'>
                    <HiArrowNarrowLeft /> <h3><a href="/">Cart</a></h3>
                </div>
                {/*---- <Container>
                    <Row>
                        <Col xs={12} md={9}>
                            <div className='cart-inner-wrapper'>
                                <div className='cart-inner'>
                                    <div className='cart-image'>
                                        <img src={cartImage} alt='' />
                                    </div>
                                    <div className='cart-image-content'>
                                        <div>
                                            <div className='cart-image-title'>
                                                <div>
                                                    <h2>Gold Plated Ring</h2>
                                                    <p>Product Code : <span>289828490189210</span></p>
                                                </div>
                                                <div className='cart-discount-price'>
                                                    <span className='price'>₹6999</span>
                                                </div>
                                            </div>
                                            <p className='p-variant'>Metal: <span> 18Kt Gold, 3.50 gram </span></p>
                                            <p className='p-variant'>Stone: <span> 37 Diamond, 0.2380 Carat, SI IJ </span></p>



                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </div>
                                <div className='cart-select mt-2'>
                                    <Form.Group>
                                        <Form.Label>Ring Size</Form.Label>
                                        <Form.Select>
                                            <option>12</option>
                                            <option>13 </option>
                                            <option>14 </option>
                                            <option>15 </option>
                                            <option>16 </option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Select>
                                            <option>1</option>
                                            <option>2 </option>
                                            <option>3 </option>
                                            <option>4 </option>
                                            <option>5 </option>
                                        </Form.Select>
                                    </Form.Group>
                                    <div className='cart-icons'>
                                        <Button variant="primary"> Remove</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='summary-save mt-4'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="I have a promo code"
                                        aria-label="I have a promo code"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2"> You saved ₹2000 </InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='gift-card'>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Gift Message (Optional)"
                                        aria-label="Gift Message (Optional)"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2"> <MdOutlineCardGiftcard /> ADD </InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='place-order-button mt-5'>
                                <div><h3> <span>Total</span>₹10000 </h3> </div>
                                <Button variant="primary">CHECKOUT</Button>

                            </div>

                        </Col>
                    </Row>
                    </Container> -----*/}
            </div>
  </div>


        </>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.retailer.cart.items,
    item_total_display: state.retailer.cart.item_total_display,
    total_payable_display: state.retailer.cart.total_payable_display,
    actionCalled: state.retailer.cart.actionCalled,
    deleteSuccess: state.retailer.cart.deleteSuccess,
    successMessage: state.retailer.cart.successMessage,
    errorMessage: state.retailer.cart.errorMessage
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ CartList, CartDelete, checkoutList }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage));
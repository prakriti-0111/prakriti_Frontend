import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { BiDownload } from "react-icons/bi";
import bag from 'src/assets/images/bag.png';
import orderItem from 'src/assets/images/order-item.png';
import flatImage from 'src/assets/images/flat-off.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsStarFill } from "react-icons/bs";
import {OrderList, OrderDelete,OrderConfirmation} from "actions/Sales/placeOrder.actions";
import Loader from '../../Loader';
import withRouter from "helpers/withRouter";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import NoProduct from 'src/assets/images/no-product.png';
import orderReducer from '../../../../reducers/Sales/order.reducer';
import {toast} from "react-toastify";

class OrderSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            loading: true
        }
    }

    componentDidMount(){
        this.loadOrder();
    }

    loadOrder = () => {
        this.props.actions.OrderList({order_id: this.props.params.id});
    }

    confirmOrder = async (id) => {
        console.log(id);

        let statuschange = await OrderConfirmation({order_id: this.props.params.id});
        if(statuschange){
            toast.success("Order Status Changed Successfully.");
            this.props.navigate('/sales-executive/orders');
        }else{
            toast.error("Order not found.");
            this.props.navigate('/sales-executive/orders/'+this.props.params.id);
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        if(props.items !== state.items){
            update.items = props.items;
            update.loading = false;
        }
        return update;
    }

    render(){
        let order = this.state.items.length ? this.state.items[0] : null;
        return (
            <>
                {
                    this.state.loading ? 
                    <Loader />
                    :
                    <>
                        {
                            !order ?
                            <>
                                <div className='no-product'>
                                    <img src={NoProduct} alt='' />
                                    <h1 className='mb-0'>Order Not Found</h1>
                                </div>
                            </>
                            :
                            <>
                                <div className='order-summary-wrapper desktop-summary-wrapper'>
                                    <Container>
                                        {/*<div className='summary-download-btn d-flex justify-content-end'>
                                            <Button variant="primary">DOWNLOAD INVOICE <BiDownload /></Button>
                                        </div>
                                        <div className='summary-order-image'>
                                            <img src={bag} alt='' />
                                            <h1>Your Order has been Successfully delivered!</h1>
                                            <h4>Thank you for Shopping with us.</h4>
                                            <Button variant="primary" className='mb-4'>RATE ORDER</Button>
                                        </div>*/}
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <div className='summary-content'>
                                                    <h2 className='mb-5'>Order ID: #{order.order_no}</h2>
                                                    <div className='item-wrapper'>
                                                        <div className='header'>
                                                            <div className='item-header'>Items</div>
                                                            <div className='qty-header'>Quantity</div>
                                                            <div className='price-header'>Price</div>
                                                        </div>
                                                        <div className='underline-hr'></div>
                                                        {
                                                            order.orderProducts.map((item, index) => (
                                                            <div className='list-header' key={index}>
                                                                <div className='item-header'>
                                                                    <div className='header-item-img d-flex gap-3'>
                                                                        <span>
                                                                            <img src={item.image} alt='' />
                                                                        </span>
                                                                        <span>
                                                                            <h3>{item.product_name}</h3>
                                                                            {
                                                                                item.materials.map((val, key) => (
                                                                                    <h4 key={key}>{val.material_name}: {val.quantity > 0 ? (val.quantity + ' ' + val.material_name + ', ') : ''} {val.purity_name}, {val.weight} {val.unit_name}</h4>
                                                                                ))
                                                                            }
                                                                            <h5>Size: {item.size_name}</h5>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='qty-header'>{item.quantity}</div>
                                                                <div className='price-header'><h3>{item.rate}</h3></div>
                                                            </div>
                                                            ))
                                                        }
                                                        <div className='underline-hr'></div>
                                                        <div className='header-price'>
                                                            <ul>
                                                                <li>
                                                                    <span>Sub Total</span>
                                                                    <span>{order.sub_total}</span>
                                                                </li>
                                                                {/*<li>
                                                                    <span>Shipping Charges</span>
                                                                    <span>₹121</span>
                                                                </li>
                                                                <li>
                                                                    <span>Taxes</span>
                                                                    <span>₹58</span>
                                                                </li>
                                                                <li>
                                                                    <span>Packaging Charges</span>
                                                                    <span>₹50</span>
                                                                </li>
                                                                <li>
                                                                    <span>Coupon <span>AXISBANK500</span></span>
                                                                    <span>-₹400</span>
                                                                </li>*/}
                                                            </ul>
                                                            <div className='underline-hr'></div>
                                                            <ul>
                                                                <li>
                                                                    <span>Total</span>
                                                                    <span>{order.total_amount}</span>
                                                                </li>
                                                            </ul>
                                                        </div>


                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div className='summary-content-right mb-4'>
                                                    <ul>
                                                        <li>
                                                            <span>Ship to</span>
                                                            <span>{order.delivery_address}</span>
                                                        </li>
                                                        <li>
                                                            <span>Payment Mode</span>
                                                            <span>{order.payment_mode}</span>
                                                        </li>
                                                        <li>
                                                            <span>Date Ordered</span>
                                                            <span>{order.order_date}</span>
                                                        </li>
                                                        {/*<li>
                                                            <span>Date Delivered</span>
                                                            <span>4 July 2021</span>
                                                        </li>*/}
                                                    </ul>
                                                </div>
                                                {(order.status == 'pending')?(<Button variant="success" className='mb-4' onClick={()=>this.confirmOrder(order.id)}>Confirm Order</Button>) :('')}
                                                

                                                {/*<div className='flat-off-image'>
                                                    <img src={flatImage} alt='' />
                                                    <div className='overlay'>
                                                        <h2> FLAT 50% OFF on Kotak
                                                            Credit Cards
                                                        </h2>
                                                        <Button variant="primary" className='mt-3'>SHOP NOW</Button>
                                                    </div>
                                                </div>*/}
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <div className='order-summary-wrapper mobile-summary-wrapper'>
                                    <div className='mobile-checkout-header mb-4'>
                                        <HiArrowNarrowLeft /> <h3>Order Summary</h3>
                                    </div>
                                    <Container>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <div className='summary-content'>
                                                    <h2 className='mb-2'>Order ID: #{order.order_no}</h2>
                                                    { order.orderProducts.map((item1, index) => (
                                                    item1.materials.map((val, key) => (
                                                            <h3 className='s-sub-content' key={key}>{val.material_name}: {val.quantity > 0 ? (val.quantity + ' ' + val.material_name + ', ') : ''} {val.purity_name}, {val.weight} {val.unit_name}</h3>
                                                        ))
                                                    )) }
                                                    <div className='order-summary-statue mb-2'>
                                                        Order Status: {order.status}
                                                    </div>
                                                    <div className='summary-order-image'>
                                                    <Button variant="primary" className='mb-4'>RATE ORDER</Button>
                                                    </div>
                                                    <div className='summary-content-right mb-4'>
                                                        <ul>
                                                            <li>
                                                                <span>Ship to</span>
                                                                <span>{order.delivery_address}</span>
                                                            </li>
                                                            <li>
                                                                <span>Paid via</span>
                                                                <span>{order.payment_mode}</span>
                                                            </li>
                                                            <li>
                                                                <span>Date Ordered</span>
                                                                <span>{order.order_date}</span>
                                                            </li>
                                                            {/* <li>
                                                                <span>Date Delivered</span>
                                                                <span>4 July 2021</span>
                                                            </li> */}
                                                        </ul>
                                                    </div>
                                                    <div className='underline-hr'></div>
                                                    <div className='item-wrapper'>
                                                        <h3>ITEMS</h3>
                                                        { order.orderProducts.map((item, index) => (
                                                        <div className='header-item-img d-flex gap-3' key={index}>
                                                            <span>
                                                                <img src={item.image} alt='' />
                                                            </span>
                                                            <span>
                                                                <h3>{item.product_name} </h3>
                                                                <h4>QTY:{item.quantity}</h4>
                                                                <h5>{item.rate}</h5>
                                                            </span>
                                                        </div>
                                                        )) }
                                                    </div>
                                                    <div className='item-wrapper'>
                                                        <div className='underline-hr'></div>
                                                        <div className='header-price'>
                                                            <ul>
                                                                <li>
                                                                    <span>Sub Total</span>
                                                                    <span>{order.sub_total}</span>
                                                                </li>
                                                                {/* <li>
                                                                    <span>Order Total</span>
                                                                    <span>₹12,876</span>
                                                                </li>
                                                                <li>
                                                                    <span>Shipping Charges</span>
                                                                    <span>₹121</span>
                                                                </li>
                                                                <li>
                                                                    <span>Taxes</span>
                                                                    <span>₹58</span>
                                                                </li>
                                                                <li>
                                                                    <span>Packaging Charges</span>
                                                                    <span>₹50</span>
                                                                </li>
                                                                <li>
                                                                    <span>Coupon <span>AXISBANK500</span></span>
                                                                    <span>-₹400</span>
                                                                </li> */}
                                                            </ul>
                                                            <div className='underline-hr'></div>
                                                            <ul>
                                                                <li>
                                                                    <span>Total</span>
                                                                    <span>{order.total_amount}</span>
                                                                </li>
                                                            </ul>
                                                        </div>


                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                {/*<div className='summary-modal'>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        size="xl"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        className='modal-inner desktop-modal'
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">Rate your Order <span>Order ID: #3892924242942</span></Modal.Title>

                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <div className='item-header'>
                                                    <div className='header-item-img d-flex gap-3'>
                                                        <span>
                                                            <img src={orderItem} alt='' />
                                                        </span>
                                                        <span>
                                                            <h3>Gold Plated Ring</h3>
                                                            <h4>Metal: 18Kt Gold, 3.50 gram..</h4>
                                                            <h5>Size: 14</h5>
                                                        </span>
                                                    </div>
                                                    <div className='rate-wrapper'>
                                                        <ul>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                        </ul>

                                                    </div>

                                                </div>
                                                <Form.Group
                                                    className="mb-3 mt-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                >

                                                    <Form.Control as="textarea" placeholder='Any other comment...' rows={3} />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <div className='modal-feedback-btn'>
                                            <Button variant="primary">SUBMIT FEEDBACK</Button>
                                        </div>
                                    </Modal>
                                </div>
                                <div className='summary-modal'>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        size="xl"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        className='modal-inner mobile-modal'
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">Rate Order </Modal.Title>

                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <div className='item-header'>
                                                    <div className='header-item-img d-flex gap-3'>
                                                        <span>
                                                            <img src={orderItem} alt='' />
                                                        </span>
                                                        <span>
                                                            <h3>Gold Plated Ring</h3>
                                                            <h4>QTY: 1</h4>
                                                            <h5>₹6999</h5>
                                                        </span>
                                                    </div>
                                                    <h6 className='mb-0'>RATE THIS PRODUCT</h6>
                                                    <div className='rate-wrapper'>
                                                        <ul>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                            <li>
                                                                <BsStarFill />
                                                            </li>
                                                        </ul>

                                                    </div>

                                                </div>
                                                <Form.Group
                                                    className="mb-3 mt-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                >

                                                    <Form.Control as="textarea" placeholder='Any other comment...' rows={5} />
                                                </Form.Group>
                                            </Form>
                                            <div className='modal-feedback-btn mt-2'>
                                            <Button variant="primary">SUBMIT FEEDBACK</Button>
                                        </div>
                                        </Modal.Body>
                                    
                                    </Modal>
                                </div>*/}
                            </>
                        }
                        
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.sales.order.items
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ OrderList,OrderConfirmation }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSummary));
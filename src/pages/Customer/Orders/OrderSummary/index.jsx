import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Row, Col, Modal, Form, FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { BiDownload } from "react-icons/bi";
import bag from 'src/assets/images/bag.png';
import orderItem from 'src/assets/images/order-item.png';
import flatImage from 'src/assets/images/flat-off.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsStarFill } from "react-icons/bs";
import { OrderList, OrderDelete, OrderReturnRequest, OrderCancel } from "actions/Customer/placeOrder.actions";
import { prodductAddReview } from "actions/Customer/product.actions";
import Loader from '../../Loader';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import NoProduct from 'src/assets/images/no-product.png';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { displayAmount } from "helpers/helper";
import { isEmpty } from '../../../../helpers/helper';

class OrderSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            loading: true,
            reviewProduct: null,
            reviewDialog: false,
            rating: 0,
            review: '',
            rating_err: '',
            processing: false,
            reason: '',
            reason_err: '',
            returnDialog: false,
            cancelDialog: false
        }
    }

    componentDidMount() {
        this.loadOrder();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.id != this.props.params.id) {
            this.loadOrder();
        }
    }

    loadOrder = () => {
        this.props.actions.OrderList({ order_id: this.props.params.id });
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
        if (props.items !== state.items) {
            update.items = props.items;
            update.loading = false;
        }
        return update;
    }

    handleRateReview = (item) => {
        this.setState({
            reviewProduct: item,
            reviewDialog: true
        })
    }

    handleReviewClose = () => {
        this.setState({
            reviewProduct: null,
            reviewDialog: false
        })
    }

    onPointerMove = (number) => {
        this.setState({
            rating: number
        })
    }

    onReviewSubmit = async () => {
        if (!this.state.rating) {
            this.setState({
                rating_err: 'Required'
            })
        } else {
            this.setState({
                processing: true,
                rating_err: ''
            })
            let data = { review: this.state.review, rating: this.state.rating, product_id: this.state.reviewProduct.product_id };
            let res = await prodductAddReview(data);
            if (res.data.success) {
                toast.success(res.data.message);
                this.setState({
                    processing: false,
                    reviewDialog: false
                })
                this.loadOrder();
            } else {
                toast.error(res.data.message);
                this.setState({
                    processing: false
                })
            }
        }

    }

    handleCancel = () => {
        this.setState({
            cancelDialog: true
        })
    }

    handleCancelClose = () => {
        this.setState({
            cancelDialog: false
        })
    }

    handleCancelSubmit = async () => {
        let order = this.state.items.length ? this.state.items[0] : null;
        if (!this.isEmptyOrSpaces(this.state.reason)) {
            this.setState({
                reason_err: "",
                processing: true
            })
            let res = await OrderCancel({ order_id: order.id, cancel_reason: this.state.reason });
            if (res.data.success) {
                toast.success(res.data.message);
                this.setState({
                    processing: false,
                    cancelDialog: false
                })
                this.loadOrder();
            } else {
                toast.error(res.data.message);
                this.setState({
                    processing: false
                })
            }
        } else {
            this.setState({
                reason_err: "Please write valid reason."
            })
        }
    }

    handleReturn = () => {
        let order = this.state.items.length ? this.state.items[0] : null;
        this.props.navigate('/order-return/' + order.id);
    }

    handleReturnClose = () => {
        this.setState({
            returnDialog: false
        })
    }

    isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }

    handleReturnSubmit = async () => {
        let order = this.state.items.length ? this.state.items[0] : null;
        if (!this.isEmptyOrSpaces(this.state.reason)) {
            this.setState({
                reason_err: "",
                processing: true
            })
            let res = await OrderReturnRequest(order.id, { notes: this.state.reason });
            if (res.data.success) {
                toast.success(res.data.message);
                this.setState({
                    processing: false,
                    returnDialog: false
                })
                this.loadOrder();
            } else {
                toast.error(res.data.message);
                this.setState({
                    processing: false
                })
            }
        } else {
            this.setState({
                reason_err: "Please write valid reason."
            })
        }
    }

    render() {
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
                                                <Breadcrumb>
                                                    <Breadcrumb.Item href='/'>My Account</Breadcrumb.Item>
                                                    <Breadcrumb.Item href='/orders'>My Orders</Breadcrumb.Item>
                                                    <Breadcrumb.Item active>Order Summary</Breadcrumb.Item>
                                                </Breadcrumb>
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
                                                            <h2 className='mb-1'> #{order.order_no}</h2>
                                                            <div className='item-wrapper'>
                                                                {/*<div className='header'>
                                                            <div className='item-header'>Items</div>
                                                            <div className='qty-header'>Quantity</div>
                                                            <div className='price-header'>Price</div>
                                    </div>*/}
                                                                <div className='underline-hr'></div>
                                                                {
                                                                    order.orderProducts.map((item, index) => (
                                                                        <div className='list-header' key={index}>
                                                                            <div className='item-header'>
                                                                                <div className='header-item-img d-flex gap-2'>
                                                                                    <span>
                                                                                        <img src={item.image} alt='' />
                                                                                    </span>
                                                                                    <span>
                                                                                        <h3><Link to={"/products/" + item.product_slug}>{item.product_name}</Link></h3>
                                                                                        {
                                                                                            item.materials.map((val, key) => (
                                                                                                <h4 key={key}>{val.material_name}: {val.quantity > 0 ? (val.quantity + ' ' + val.material_name + ', ') : ''} {val.purity_name}, {val.weight} {val.unit_name}</h4>
                                                                                            ))
                                                                                        }
                                                                                        <h5>Size: {item.size_name}</h5>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className='qty-header'>{item.quantity} item(s)</div>
                                                                            <div className='price-header'>
                                                                                <h3>{item.rate}</h3>
                                                                                {
                                                                                    !item.have_review ?
                                                                                        <h6 className='rate_review' onClick={() => this.handleRateReview(item)}>Rate & Review</h6>
                                                                                        : null
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                                {/*<div className='underline-hr'></div> */}
                                                                <div className='header-price'>
                                                                    <ul>
                                                                        <li>
                                                                            <span>Sub Total</span>
                                                                            <span>{order.sub_total}</span>
                                                                        </li>
                                                                        {
                                                                            order.promocode ?
                                                                                <li>
                                                                                    <span>Voucher code ({order.promocode})</span>
                                                                                    <span>{order.promocode_discount_display}</span>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            order.discount_amount ?
                                                                                <li>
                                                                                    <span>Discount</span>
                                                                                    <span>{order.discount_amount}</span>
                                                                                </li>
                                                                                : null
                                                                        }
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
                                                                        {
                                                                            order.paid_amount > 0 ?
                                                                                <li>
                                                                                    <span>Paid Amount</span>
                                                                                    <span>{displayAmount(order.paid_amount)}</span>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                    </ul>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={4}>
                                                        <div className='summary-content-right mb-4'>
                                                            <ul>
                                                                <li>
                                                                    <h5><b>{order.status_display}</b></h5>
                                                                </li>
                                                                <li>
                                                                    <span>Name</span>
                                                                    <span>{order.customer_name}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Ship to: </span>
                                                                    <span>{order.delivery_address}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Payment Mode: </span>
                                                                    <span>{order.payment_mode}</span>
                                                                </li>
                                                                <li>
                                                                    <span>Date Ordered: </span>
                                                                    <span>{order.order_date}</span>
                                                                </li>
                                                                {
                                                                    order.status == "delivered" ?
                                                                        <li>
                                                                            <span>Delivery Date: </span>
                                                                            <span>{order.delivered_at}</span>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {
                                                                    order.status != "delivered" && order.status != "cancelled" && order.status != "return_request" && order.status != "picked_up" ?
                                                                        <li>
                                                                            <span>Expected Delivery Date: </span>
                                                                            <span>{order.expected_delivery_date}</span>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {
                                                                    !isEmpty(order.notes) ?
                                                                        <li>
                                                                            <span>Notes: </span>
                                                                            <span>{order.notes}</span>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {
                                                                    !isEmpty(order.image) ?
                                                                        <li className='image_link'>
                                                                            <span>Image: </span>
                                                                            <span><a href={order.image} target="_blank">Click here</a></span>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {
                                                                    order.status == "delivered" ?
                                                                        <li className='place-order-button mt-4'>
                                                                            <Button variant="primary" className='dark_button' onClick={this.handleReturn}>Return</Button>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {
                                                                    (order.status == "pending" || order.status == "accepted" || order.status == "shipped" || order.status == "out_for_delivery") ?
                                                                        <li className='place-order-button mt-4'>
                                                                            <Button variant="primary" className='dark_button' onClick={this.handleCancel}>Cancel</Button>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {/*<li>
                                                            <span>Date Delivered</span>
                                                            <span>4 July 2021</span>
                                                        </li>*/}
                                                            </ul>
                                                        </div>
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
                                            {/*<div className='mobile-checkout-header mb-4'>
                                        <HiArrowNarrowLeft /> <h3>Order Summary</h3>
                                            </div> */}
                                            <Container>
                                                <Breadcrumb>
                                                    <Breadcrumb.Item href='/'>My Account</Breadcrumb.Item>
                                                    <Breadcrumb.Item href='/orders'>My Orders</Breadcrumb.Item>
                                                    <Breadcrumb.Item active>Order Summary</Breadcrumb.Item>
                                                </Breadcrumb>
                                                <Row>
                                                    <Col xs={12} sm={12} md={8}>
                                                        <div className='summary-content'>
                                                            <h2 className='mb-2'>#{order.order_no}</h2>
                                                            {/* <h3 className='s-sub-content'>Gold Plated Ring + 1 Item</h3>
                                                   <div className='order-summary-statue mb-2'>
                                                        Order Status: Delivered
                                        </div> */}
                                                            {/*<div className='summary-order-image'>
                                                    <Button variant="primary" className='mb-4'>RATE ORDER</Button>
                                    </div>*/}
                                                            <div className='summary-content-right mb-2'>
                                                                <ul>
                                                                    <li>
                                                                        <span>Name</span>
                                                                        <span>{order.customer_name}</span>
                                                                    </li>
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
                                                                    {
                                                                        order.status == "delivered" ?
                                                                            <li>
                                                                                <span>Delivery Date: </span>
                                                                                <span>{order.delivered_at}</span>
                                                                            </li>
                                                                            : null
                                                                    }
                                                                    {
                                                                        order.status != "delivered" && order.status != "cancelled" && order.status != "return_request" && order.status != "picked_up" ?
                                                                            <li>
                                                                                <span>Expected Delivery Date: </span>
                                                                                <span>{order.expected_delivery_date}</span>
                                                                            </li>
                                                                            : null
                                                                    }
                                                                </ul>
                                                            </div>
                                                            <div className='underline-hr'></div>
                                                            <div className='item-wrapper'>
                                                                <h3>ITEMS</h3>
                                                                {
                                                                    order.orderProducts.map((item, index) => (
                                                                        <div className='header-item-img' key={index}>
                                                                            <span>
                                                                                <img src={item.image} alt='' />
                                                                            </span>
                                                                            <span>
                                                                                <h3><Link to={"/products/" + item.product_slug}>{item.product_name}</Link> <span className='float-right'>{item.quantity} item(s)</span></h3>
                                                                                {
                                                                                    item.materials.map((val, key) => (
                                                                                        <h4 key={key}>{val.material_name}: {val.quantity > 0 ? (val.quantity + ' ' + val.material_name + ', ') : ''} {val.purity_name}, {val.weight} {val.unit_name}</h4>
                                                                                    ))
                                                                                }
                                                                                <span className='s-footer-price'>
                                                                                    {
                                                                                        item.size_name ?
                                                                                            <h4>Size: {item.size_name}</h4>
                                                                                            : null
                                                                                    }
                                                                                    <h5>
                                                                                        {item.rate}
                                                                                    </h5>
                                                                                    {
                                                                                        !item.have_review ?
                                                                                            <h6 className='rate_review' onClick={() => this.handleRateReview(item)}>Rate & Review</h6>
                                                                                            : null
                                                                                    }
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                            <div className='item-wrapper'>
                                                                <div className='underline-hr'></div>
                                                                <div className='header-price'>
                                                                    <ul>
                                                                        <li>
                                                                            <span>Sub Total</span>
                                                                            <span>{order.sub_total}</span>
                                                                        </li>
                                                                        {
                                                                            order.promocode ?
                                                                                <li>
                                                                                    <span>Voucher code ({order.promocode})</span>
                                                                                    <span>{order.promocode_discount_display}</span>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            order.discount_amount ?
                                                                                <li>
                                                                                    <span>Discount</span>
                                                                                    <span>{order.discount_amount}</span>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            order.promocode ?
                                                                                <li>
                                                                                    <span>Voucher code ({order.promocode})</span>
                                                                                    <span>{order.promocode_discount_display}</span>
                                                                                </li>
                                                                                : null
                                                                        }
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
                                                                        {
                                                                            order.paid_amount > 0 ?
                                                                                <li>
                                                                                    <span>Paid Amount</span>
                                                                                    <span>{displayAmount(order.paid_amount)}</span>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            order.status == "delivered" ?
                                                                                <li className='place-order-button mt-4'>
                                                                                    <Button variant="primary" className='dark_button' onClick={this.handleReturn}>Return</Button>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            (order.status == "pending" || order.status == "accepted" || order.status == "shipped" || order.status == "out_for_delivery") ?
                                                                                <li className='place-order-button mt-4'>
                                                                                    <Button variant="primary" className='dark_button' onClick={this.handleCancel}>Cancel</Button>
                                                                                </li>
                                                                                : null
                                                                        }
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

                <Modal
                    show={this.state.reviewDialog}
                    onHide={this.handleReviewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Rate & Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={12}>
                                <Form.Group>
                                    <Form.Label>Rate this product</Form.Label>
                                    <div className={this.state.rating_err ? 'is-invalid' : ''}>
                                        <Rating
                                            onPointerMove={this.onPointerMove}
                                        />
                                    </div>

                                    <Form.Control.Feedback type="invalid">
                                        Please rate.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={12} className="mt-3">
                                <Form.Group>
                                    <FloatingLabel controlId="floatingTextarea2" label="Description">
                                        <Form.Control
                                            as="textarea"
                                            style={{ height: '100px' }}
                                            onChange={(e) => this.setState({
                                                review: e.target.value
                                            })}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleReviewClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onReviewSubmit} disabled={this.state.processing}>Submit</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.returnDialog}
                    onHide={this.handleReturnClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Return Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={12} className="mt-3">
                                <Form.Group>
                                    <FloatingLabel controlId="floatingTextarea3" label="Reason" className={this.state.reason_err ? 'is-invalid' : ''}>
                                        <Form.Control
                                            as="textarea"
                                            style={{ height: '100px' }}
                                            onChange={(e) => this.setState({
                                                reason: e.target.value
                                            })}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.reason_err}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleReturnClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleReturnSubmit} disabled={this.state.processing}>Submit</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.cancelDialog}
                    onHide={this.handleCancelClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} md={12} className="mt-3">
                                Are you sure want to cancel this order?
                            </Col>
                            <Col xs={12} md={12} className="mt-3">
                                <Form.Group>
                                    <FloatingLabel controlId="floatingTextarea3" label="Reason" className={this.state.reason_err ? 'is-invalid' : ''}>
                                        <Form.Control
                                            as="textarea"
                                            style={{ height: '100px' }}
                                            onChange={(e) => this.setState({
                                                reason: e.target.value
                                            })}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.reason_err}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancelClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleCancelSubmit} disabled={this.state.processing}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.customer.order.items
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ OrderList }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSummary));
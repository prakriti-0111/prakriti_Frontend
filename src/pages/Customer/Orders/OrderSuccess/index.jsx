import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import orderSuccessImage from 'src/assets/images/tickcircle.png';
import ratnBanner from 'src/assets/images/ratn_banner.png';
import Sproduct from 'src/assets/images/s-product-1.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router";
import withRouter from "helpers/withRouter";
import { connect } from "react-redux";
import Loader from '../../Loader';
import { bindActionCreators } from "redux";
import { OrderFetchRaw } from "actions/Customer/placeOrder.actions";
import { CartList } from "actions/Customer/addcart.actions";
import Cookies from 'universal-cookie';
import { isEmpty } from 'src/helpers/helper';
import { toast } from "react-toastify";
import { ProfileUpdate } from "actions/Customer/profile.actions";
import { eventList, subscribersStore } from "actions/Customer/home.actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formValues } from 'redux-form';

class OrderSuccessful extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: null,
            loading: true,
            p_actionCalled: this.props.p_actionCalled,
            editProfileSuccess: this.props.editProfileSuccess,
            p_successMessage: this.props.p_successMessage,
            p_errorMessage: this.props.p_errorMessage,
            eventList: [],
            formValues: {
                name: '',
                email: '',
                mobile: '',
                date: '',
                event: '',
            },
            formErros: {
                name: '',
                email: '',
                mobile: '',
                date: '',
                event: '',
            },
            submitting: false
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        let order_id = cookies.get('order_id');
        this.loadOrder(order_id);
        this.loadEvents(order_id);
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
        if (props.p_actionCalled !== state.p_actionCalled) {
            update.p_actionCalled = props.p_actionCalled;
        }
        if (props.editProfileSuccess !== state.editProfileSuccess) {
            update.editProfileSuccess = props.editProfileSuccess;
        }
        if (props.p_successMessage !== state.p_successMessage) {
            update.p_successMessage = props.p_successMessage;
        }
        if (props.p_errorMessage !== state.p_errorMessage) {
            update.p_errorMessage = props.p_errorMessage;
        }
        
        return update;
    }

    componentDidUpdate(prevProps){
        if(this.state.p_actionCalled){
            if(this.state.editProfileSuccess){
                toast.success("Updated successfully.");
            }
        }
    }

    loadEvents = async() => {
        let res = await eventList();
        if(res.data.success){
            this.setState({
                eventList: res.data.data
            })
        }
    }

    loadOrder = async (order_id) => {
        if (isEmpty(order_id)) {
            window.location.href = process.env.BASE_URL;
        } else {
            let res = await OrderFetchRaw(order_id);
            if (res.data.success) {
                let items = res.data.data.items;
                this.props.actions.CartList();
                if (items.length == 0) {
                    toast.error("Order not found.");
                    this.props.navigate('/');
                } else {
                    this.setState({
                        order: items[0],
                        loading: false
                    })
                }
            } else {
                toast.error("Order not found.");
                this.props.navigate('/');
            }
        }
    }

    handleOrderPage = () => {
        this.props.navigate('/orders');
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            formValues: {
                ...this.state.formValues,
                [name]: value
            }
        })
    }

    handleDate = (date) => {
        this.setState({
            formValues: {
                ...this.state.formValues,
                date: date
            }
        })
    }

    handleSave = async() => {
        if(this.formValidate()){
            this.setState({
                submitting: true
            })
            let res = await subscribersStore(this.state.formValues);
            if(res.data.success){
                toast.success(res.data.message);
            }
            this.setState({
                submitting: false
            })
        }
    }

    formValidate = () => {
        let hasErr = false;
        let formValaues = this.state.formValues;
        let formErros = this.state.formErros;
        if(!formValaues.name){
            formErros.name = "Required.";
            hasErr = true;
        }else{
            formErros.name = "";
        }
        if(!formValaues.mobile){
            formErros.mobile = "Required.";
            hasErr = true;
        }else{
            formErros.mobile = "";
        }
        this.setState({
            formErros: formErros
        })
        return !hasErr;
    }

    render() {
        const { order, formValues, formErros } = this.state;
        return (
            <>
                {
                    this.state.loading ?
                        <Loader />
                        :
                        <div>
                            {/*<div className='order-successful'>
                                <Container>
                                    <div className='order-successful-image mt-5 mb-4 text-center'>
                                        <img src={orderSuccessImage} alt='' />
                                    </div>
                                    <div className='order-successful-content'>
                                        <h2 className='text-center'>Your Order has been succesfully placed.</h2>
                                        <p className='text-center'>Your order will be delivered by 4th of March 2021.</p>
                                    </div>
                                    <hr />
                                    <div className='order-successful-wrapper'>
                                        <ul>
                                            <li>
                                                <p>Order ID</p>
                                                <p>{order.order_no}</p>
                                            </li>
                                            <li>
                                                <p>Order Date</p>
                                                <p>{order.order_date}</p>
                                            </li>
                                            <li>
                                                <p>Payment</p>
                                                <p>{order.payment_mode}</p>
                                            </li>
                                            <li>
                                                <p>Address</p>
                                                <p>{order.delivery_address}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div className='successful-wrapper-list'>
                                        <ul>
                                            <li>
                                                <p>Sub Total</p>
                                                <p>{order.sub_total}</p>
                                            </li>

                                        </ul>
                                        <hr />
                                        <div className='successfull-total'>
                                            <p>Total</p>
                                            <p>{order.total_amount}</p>
                                        </div>
                                    </div>
                                    <div className='mobile-pay-noew'>
                                        <Button variant="secondary" onClick={this.handleOrderPage}>GO TO ORDER</Button>
                                    </div>
                                </Container>
                </div> */}
                            <div className='order-success'>
                                <Container>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <div className='order-success-wrapper'>
                                                <div className='order-success-title'>
                                                    <span className='title-icon'><img src={orderSuccessImage} alt='' /></span> <h1>Congratulations!</h1>

                                                </div>
                                                <p className='order-success-para'>Your order for the following has been successfully placed with us. <Link to={`/orders`} className="text_link">Track Order</Link></p>
                                                <Table striped bordered hover className='order_success_table rounded'>
                                                    <thead className='rounded-top'>
                                                        <tr>
                                                            <th>Order Number : {order.order_no}</th>
                                                            <th>Order Date: {order.order_date}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            order.orderProducts.map((item, key) => (
                                                            <tr key={key}>
                                                                <td colSpan={2}>
                                                                    <div className='order-success-product-images'>
                                                                        <div><img src={item.image} alt='' /></div>
                                                                        <div className='order-success-inner'>
                                                                            <span><p>Product Details: </p> <p>{item.product_name}</p></span>
                                                                            <span><p>Expected Delivery Date: </p> <p>{order.expected_delivery_date}</p></span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>
                                                <img src={ratnBanner} alt='' />
                                            </div>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <div className='order-success-right'>
                                                <div className='title'>
                                                    <h1>Let Us Surprise You</h1>
                                                    <p>Kindly enter your details for serving you better.</p>
                                                    <Row>
                                                        <Col xs={12} md={12}>
                                                            <FloatingLabel
                                                                controlId="Name"
                                                                label="Name"
                                                                className={"mb-3" + (formErros.name ? ' error_input' : '')}
                                                            >
                                                                <Form.Control type="text" onChange={this.handleChange} name="name"
                                                                value={formValues.name} />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <FloatingLabel
                                                                label="Mobile"
                                                                controlId="Mobile"
                                                                className={"mb-3" + (formErros.mobile ? ' error_input' : '')}
                                                                
                                                            >
                                                                <Form.Control type="text" onChange={this.handleChange} name="mobile"
                                                                value={formValues.mobile} />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <FloatingLabel
                                                                label="Email"
                                                                controlId="Email"
                                                                className={"mb-3" + (formErros.email ? ' error_input' : '')}
                                                                
                                                            >
                                                                <Form.Control type="text" onChange={this.handleChange} name="email"
                                                                value={formValues.email} />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <div className={"mb-3 form-floating" + (formErros.date ? ' error_input' : '')}>
                                                                <DatePicker selected={formValues.date} onChange={(date) => this.handleDate(date)} className="form-control" placeholderText='Date' />
                                                            </div>
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <FloatingLabel
                                                                label="Event"
                                                                controlId="Event"
                                                                className={"mb-3" + (formErros.event ? ' error_input' : '')}
                                                            >
                                                                <Form.Select 
                                                                    value={formValues.event}
                                                                    name="event"
                                                                    onChange={this.handleChange}
                                                                >
                                                                    <option value=""></option>
                                                                    {
                                                                        this.state.eventList.map((item, index) => {
                                                                            return <option value={item.name} key={index}>{item.name}</option>
                                                                        })
                                                                    }
                                                                </Form.Select>
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>
                                                    <Button variant="primary" className='success-button' onClick={this.handleSave} disabled={this.state.submitting}>Save Details</Button>

                                                </div>
                                            </div>

                                        </Col>
                                        {/*<div className='order-successful-btn mt-3 text-center'>
                                            <Button variant="primary" type="submit">
                                                VIEW MY ORDERS
                                            </Button>
                                                    </div>*/}
                                    </Row>
                                </Container>

                            </div>
                            <div className='order-successful-mobile mt-4'>
                                {/* <div className='mobile-checkout-header mb-4'>
                                    <HiArrowNarrowLeft /> <h3>Order Success</h3>
                                </div>
                                                    */}
                                {/*
                                <div className='order-successful-image mt-5 mb-4 text-center'>
                                    <img src={orderSuccessImage} alt='' />
                                </div>
                                <div className='order-successful-content'>
                                    <h2 className='text-center'>Your Order has been succesfully placed.</h2>
                                    <p className='text-center'>Your order will be delivered by 4th of March 2021.</p>
                                                </div>*/}

                                {/*<div className='mobile-pay-now'>
                                    <Button variant="primary">BACK TO HOME</Button>
                                                </div>*/}
                            </div>
                        </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    p_actionCalled: state.customer.profile.actionCalled,
    editProfileSuccess: state.customer.profile.editProfileSuccess,
    p_successMessage: state.customer.profile.successMessage,
    p_errorMessage: state.customer.profile.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ CartList, ProfileUpdate }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSuccessful));

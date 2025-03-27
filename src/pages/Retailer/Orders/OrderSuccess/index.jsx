import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import orderSuccessImage from 'src/assets/images/checked.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import {useNavigate} from "react-router";
import withRouter from "helpers/withRouter";
import {connect} from "react-redux";
import Loader from '../../Loader';
import {bindActionCreators} from "redux";
import { OrderFetchRaw } from "actions/Retailer/placeOrder.actions";
import { CartList } from "actions/Retailer/addcart.actions";
import Cookies from 'universal-cookie';
import { isEmpty } from 'src/helpers/helper';
import {toast} from "react-toastify";

class OrderSuccessful extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            order: null,
            loading: true
        }
    }

    componentDidMount(){
        const cookies = new Cookies();
        let order_id = cookies.get('order_id');
        this.loadOrder(order_id);
    }

    loadOrder = async(order_id) => {
        if(isEmpty(order_id)){
            window.location.href = process.env.BASE_URL;
            console.log('okk')
        }else{
            let res = await OrderFetchRaw(order_id);
            if(res.data.success){
                let items = res.data.data.items;
                this.props.actions.CartList();
                if(items.length == 0){
                    toast.error("Order not found.");
                    this.props.navigate('/retailer');
                }else{
                    this.setState({
                        order: items[0],
                        loading: false
                    })
                }
            }else{
                toast.error("Order not found.");
                this.props.navigate('/retailer');
            }
        }
    }

    handleOrderPage = () => {
        this.props.navigate('/retailer/orders');
    }

    render(){
        const {order} = this.state;
        return (
            <>
                {
                    this.state.loading ? 
                    <Loader/>
                    :
                    <div>
                        <div className='order-successful'>
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
                                        {/*<li>
                                            <p>Taxes</p>
                                            <p>₹58</p>
                                        </li>
                                        <li>
                                            <p>Packaging Charges</p>
                                            <p>₹50</p>
                                        </li>
                                        <li>
                                            <p>Coupon <span>AXISBANK500</span> </p>
                                            <p>{getUserOrder?.discount_amount||'-₹400'}</p>
                                        </li>*/}
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
                        </div>
                        <div className='order-successful-mobile mt-4'>
                            <div className='mobile-checkout-header mb-4'>
                                <HiArrowNarrowLeft /> <h3>Order Success</h3>
                            </div>
                            <div className='order-successful-image mt-5 mb-4 text-center'>
                                <img src={orderSuccessImage} alt='' />
                            </div>
                            <div className='order-successful-content'>
                                <h2 className='text-center'>Your Order has been succesfully placed.</h2>
                                <p className='text-center'>Your order will be delivered by 4th of March 2021.</p>
                            </div>
                            <div className='order-successful-btn'>
                                <Button variant="primary" type="submit">
                                VIEW MY ORDERS
                                </Button>
                            </div>
                            <div className='mobile-pay-now'>
                            <Button variant="primary">BACK TO HOME</Button>
                            </div>
                        </div>
            </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({CartList }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSuccessful));

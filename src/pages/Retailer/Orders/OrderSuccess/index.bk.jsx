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
import { OrderFetch} from "actions/Customer/placeOrder.actions";

const OrderSuccessful = (props) => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const [getUserOrder,setGetuserOrder]=React.useState({})
    const onOrder=()=>{
        setLoad(true)
        // navigate('/orders')
        window.location.href='/orders'
    }
    useEffect(()=>{
    if(props?.userOrder?.success){
        setGetuserOrder(props?.userOrder?.data)
    }
    },[props?.userOrder?.success])
    useEffect(()=>{
        setLoad(false)
        props.actions.OrderFetch(props?.userOrder?.data?.user_id)
    },[])


    return (
        <>
        {load?<Loader/>:

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
                                <p>{getUserOrder?.order_no||'RTN87483729'}</p>
                            </li>
                            <li>
                                <p>Order Date</p>
                                <p>{getUserOrder?.order_date||'23rd March 2021'}</p>
                            </li>
                            <li>
                                <p>Payment</p>
                                <p>{getUserOrder?.payment_mode||'Mastercard-9803'}</p>
                            </li>
                            <li>
                                <p>Address</p>
                                <p>{getUserOrder?.delivery_address?.substring(0, 15) + "..."||"428, MG Road"}</p>
                            </li>
                            <li>
                                <p>Coupon</p>
                                <p>AXISBANK500</p>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className='successful-wrapper-list'>
                        <ul>
                            <li>
                                <p>Order Total</p>
                                <p>{getUserOrder?.sub_total||'₹6999'}</p>
                            </li>
                            <li>
                                <p>Shipping Charges</p>
                                <p>₹121</p>
                            </li>
                            <li>
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
                            </li>
                        </ul>
                        <hr />
                        <div className='successfull-total'>
                            <p>Total</p>
                            <p>{getUserOrder?.total_amount||'₹7892'}</p>
                        </div>
                    </div>
                    <div className='mobile-pay-noew'>
                        <Button variant="secondary" onClick={onOrder}>GO TO ORDER</Button>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    userOrder:state.customer.placeorder.items
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ OrderFetch }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSuccessful));
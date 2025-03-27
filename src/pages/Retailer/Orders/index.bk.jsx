import React from 'react'
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import { HiArrowNarrowLeft } from "react-icons/hi";
import {useNavigate} from "react-router";
import {bindActionCreators} from "redux";
import {OrderList,OrderDelete} from "actions/Customer/placeOrder.actions";
import withRouter from "helpers/withRouter";
import {connect, useSelector} from "react-redux";
import {toast} from "react-toastify";

const Orders = (props) => {
    const navigate = useNavigate();
    const orderList =useSelector((state)=>state.customer.placeorder)
    const [orderDetail,setOrderDetail]=React.useState([])
    const onTrack=()=>{
        navigate('/')
    }

    React.useEffect(()=>{
        if(orderList?.deleteSuccess){
            toast.success(orderList?.successMessage)
            setTimeout(()=>{
                window.location.reload();
            },1000)
        }
    },[orderList?.deleteSuccess])

    const onCanelOrder=(id)=>{
        const data={
        order_id:id
    }
        props.actions.OrderDelete(data)
    }

    React.useEffect(()=>{
        if(orderList?.getSuccess){
            setOrderDetail(orderList?.data?.items)
        }
    },[orderList.getSuccess])
    React.useEffect(()=>{
        props.actions.OrderList()
    },[])
    return (
        <>
            <div className='my-order order-desktop'>
            <Container>
                <div className='breadcrumb-wrapper'>
                    <Breadcrumb>
                        <Breadcrumb.Item href=''>My Account</Breadcrumb.Item>
                        <Breadcrumb.Item active>My Orders</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className='my-order-header position-relative'>
                    <h1 className=''>My Orders</h1>
                </div>
                {orderDetail?.length>0?
                    orderDetail?.map((item,index)=>(
                        <div key={index}>
                            <div className='my-order-wrapper mb-3'>
                                <div className='order-id mb-2'>
                                    <div className='id-no'>
                                        <h2 className='mb-0'>Order ID :<span>{item?.order_no}</span></h2>
                                        {/*<h3>Gold Plated Ring + 1 Item</h3>*/}
                                    </div>
                                    <div className='tracker'>
                                        
                                        <div className='order-status'>
                                            <h4>Order Status: <span> {item?.status}</span></h4>
                                        </div>
                                    </div>

                                </div>
                                <div className='my-order-footer d-flex justify-content-between'>
                                    <div className='total'>
                                        <h5>Total:<span> {item.total_amount} </span></h5>
                                    </div>
                                    <div className='order-address d-flex gap-5'>
                                        <h6>Order Date :<span>{item?.order_date}</span></h6>
                                        <h6>Address <span>{item?.delivery_address.substring(0, 15) + "..."}</span></h6>
                                    </div>
                                </div>
                              
                                <div className='tracker'>
                                <Button variant="primary" onClick={onTrack}>TRACK ORDER</Button>
                                    <Button variant="primary" className='mb-0' onClick={()=>onCanelOrder(item.id)}>CANCEL ORDER</Button>
                                </div>
                                {/*<Container>*/}
                                {/*    <div className='mobile-checkout-header mb-4'>*/}
                                {/*        <HiArrowNarrowLeft /> <h3>Forgot Password</h3>*/}
                                {/*    </div>*/}
                                {/*    <div className='my-order-wrapper mb-3'>*/}
                                {/*        <div className='order-id'>*/}
                                {/*            <div className='id-no'>*/}
                                {/*                <h2 className='mb-1'>Order ID <span>#RTN3893890230</span></h2>*/}
                                {/*                <h3>Gold Plated Ring + 1 Item</h3>*/}
                                {/*            </div>*/}
                                {/*            <div className='order-address d-flex justify-content-end'>*/}
                                {/*                <h6><span>23rd March 2021</span></h6>*/}
                                {/*            </div>*/}
                                {/*            <div className='tracker d-flex justify-content-between align-items-end'>*/}
                                {/*                <div className='total'>*/}
                                {/*                    <h5>Total:<span> ₹6999 </span></h5>*/}
                                {/*                </div>*/}
                                {/*                <div className='order-status'>*/}
                                {/*                    <h4>Out for Delivery</h4>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</Container>*/}
                            </div>

                        </div>
                    ))
                    :
                    <center>
                        <h4>No Any Order !</h4>
                    </center>
                }
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    categoryList:state.customer.categories,
    productList: state.customer.product,

    addCart: state.customer.addCart
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ OrderList,OrderDelete }, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));

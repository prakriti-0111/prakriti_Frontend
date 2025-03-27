import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { BiShoppingBag } from "react-icons/bi";
import { FcAlarmClock } from "react-icons/fc";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { MdOutlineInventory2 } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Track from 'src/assets/images/track.png';
const TrackOrder = () => {
    return (
        <>
            <div className='track-order desktop-track-order'>
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href=''>My Account</Breadcrumb.Item>
                        <Breadcrumb.Item href=''>My Orders</Breadcrumb.Item>
                        <Breadcrumb.Item active>Track Order</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='track-header-wrapper'>
                        <h1>Track Order <span>Estimated Delivery: 7-10 July 20222</span></h1>

                    </div>
                    <div className='p-order mt-3 mb-5'>
                        Order ID : #RTN3893890230
                    </div>
                    <div className='vertical timeline'>
                        <div className='steps'>
                            <div className='step'>
                                <span className='icon'><BiShoppingBag /></span>
                                <div><h1>Order Awaiting Approval<span className='timer'> <FcAlarmClock /> Usually takes 30-40 mins</span></h1> <h3>2 July 2022</h3></div>

                            </div>
                            <div className='step'>
                                <span className='icon'><MdOutlineInventory2 /> </span>
                                <div>  <h1> Order Shipped </h1></div>

                            </div>
                            <div className='step'>
                                <span className='icon'><BsTruck /> </span>
                                <div>  <h1> Order Out for Delivery</h1></div>

                            </div>
                            <div className='step'>
                                <span className='icon'><TiTick /> </span>
                                <div>  <h1> Order Delivered </h1></div>

                            </div>
                        </div>
                        <div className='line'>

                        </div>
                    </div>
                    <div className='track-order-footer mt-5 d-flex justify-content-between'>
                        <div className='track-f-content'>
                            <h3>Have Issues? Need Help?</h3>
                            <p>Lord Ipsum sed non diam eget lord molestie facilisis. Fusce rutrum, arcu eu dignissim malesuada, massa eli</p>
                            <Button variant="primary">VISIT HELP CENTER</Button>
                        </div>
                        <div className='track-f-image'>
                            <img src={Track} alt='' />
                        </div>
                    </div>
                </Container>
            </div>
            <div className='track-order mobile-track-order'>
                <Container>
                    <div className='mobile-checkout-header mb-2'>
                        <HiArrowNarrowLeft /> <h3>Order Summary</h3>
                    </div>
                    <div className='p-order mb-2'>
                        Order ID : #RTN3893890230
                    </div>
                    <div className='track-header-wrapper mb-3'>
                        <h1> <span>Estimated Delivery: 7-10 July 20222</span></h1>

                    </div>

                    <div className='vertical timeline'>
                        <div className='steps'>
                            <div className='step'>
                                <span className='icon'><BiShoppingBag /></span>
                                <div><div className='line-heading mb-3'>Order Awaiting for  Approval <h3 className='mb-3'>2 July 2022</h3><span className='timer'> <FcAlarmClock /> Usually takes 30-40 mins</span></div> </div>

                            </div>
                            <div className='step'>
                                <span className='icon'><MdOutlineInventory2 /> </span>
                                <div>  <div className='line-heading'> Order Shipped </div></div>

                            </div>
                            <div className='step'>
                                <span className='icon'><BsTruck /> </span>
                                <div>  <div className='line-heading'> Order Out for Delivery</div></div>

                            </div>
                            <div className='step'>
                                <span className='icon'><TiTick /> </span>
                                <div>  <h1> Order Delivered </h1></div>

                            </div>
                        </div>
                        <div className='line'>

                        </div>
                    </div>
                    <div className='track-order-footer mt-5 d-flex justify-content-between'>
                        <div className='track-f-content'>
                            <h3>Have Issues? Need Help?</h3>
                            <p>Lord Ipsum sed non diam eget lord molestie facilisis. Fusce rutrum, arcu eu dignissim malesuada, massa eli</p>
                            <Button variant="primary">VISIT HELP CENTER</Button>
                        </div>
                        <div className='track-f-image'>
                            <img src={Track} alt='' />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default TrackOrder
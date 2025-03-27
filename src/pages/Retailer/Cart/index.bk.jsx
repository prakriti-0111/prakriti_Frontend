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
import { CartList } from "actions/Customer/addcart.actions";
import { CartDelete } from 'actions/Customer/addcart.actions';
import {checkoutList} from 'actions/Customer/checkout.actions'
import { ToastContainer, toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";
import Modal from 'react-bootstrap/Modal';
import Loader from '../Loader';

const Cart = (props) => {

    const cartLength = useSelector((state) => state.customer.cart.items.length)
    const navigate = useNavigate();
    const addCartList = useSelector((state) => state.customer.cart)
    const checkoutLists =useSelector((state)=>state.checkout)
    const [load, setLoad] = useState(true);
    const [cartItem, setCartItem] = React.useState([])
    const [checkout,setCheckout] = useState([])
    const [show, setShow] = React.useState(false);
    const [removeId,setRemoveId]=React.useState(null)
    const onOrder = () => {
        //setLoad(true)
        navigate('/checkout')
    }
    useEffect(() => {
        if (addCartList.getSuccess) {
            setCartItem(addCartList?.items)
        } else {
            setCartItem([])
        }
    }, [addCartList])
    useEffect(()=>{
        if(checkoutLists?.getItemsSuccess){
            setCheckout(checkoutLists.items)
        }else{
            setCheckout([])
        }
    },[checkoutLists])

    useEffect(() => {
        props.actions.CartList()
        props.actions.checkoutList();
    }, [])

    //remove item--------
    useEffect(() => {
        if (addCartList.deleteSuccess) {
            toast.success("Deleted Successfully!")
            // setTimeout(()=>{
            //     window.location.reload();
            // },1000)
        }

    }, [addCartList])
    const handleClose = () => setShow(false);

    const onRemove = (index) => {
        /////setLoad(false)
            props.actions.CartDelete(index);
            setRemoveId(index)
            setShow(true)
            // props.actions.CartDelete(index);


    }
    const handleDelete=()=>{
        //  setLoad(false)
        props.actions.CartDelete(removeId);
        setShow(false)
    }


    return (
        <>


            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove From Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you want to Remove this Product from Cart ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
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
                            {cartItem.length > 0 ?
                                cartItem && cartItem.map((val, index) => (
                                    <>
                                    <div>
                                        <div className='cart-inner-wrapper' key={index}>
                                            <div className='cart-inner'>
                                                <div className='cart-image'>
                                                    <img src={cartImage} alt='' />
                                                </div>
                                                <div className='cart-image-content'>
                                                    <div>
                                                        <div className='cart-image-title'>
                                                            <h2>{val?.productName}</h2>
                                                            <p>Product Code : <span>{val.product_id || 289828490189210}</span></p>
                                                        </div>
                                                        <div className='cart-select'>
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
                                                        </div>
                                                        <p className='p-variant'>Metal: <span> {val.weight || '18Kt Gold, 3.50 gram'} </span></p>
                                                        <p className='p-variant'>Stone: <span> 37 Diamond, 0.2380 Carat, SI IJ </span></p>
                                                        <div className='cart-icons'>
                                                            <h4 onClick={() => onRemove(val.id)}> <MdOutlineDelete /> Remove</h4>
                                                            <h4>Move To Wishlist</h4>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='price-wrapper'>
                                                            <div className='cart-original-price'>
                                                                <span className='strikethrough'>₹8999</span>
                                                            </div>
                                                            <div className='cart-discount-price'>
                                                                <span className='price'>₹6999</span>
                                                            </div>
                                                        </div>
                                                        <p className='making-charge'>(0% MAKING CHARGE)</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='cart-notes mt-4' style={{ width: "100%", bottom: "300px" }}>
                                                <ul>
                                                    <li><HiCheckCircle /> 30 Day Money Back</li>
                                                    <li><HiCheckCircle /> Eligible for Lifetime exchange & Buy back</li>
                                                    <li><HiCheckCircle /> FREE & Insured Delivery</li>
                                                </ul>
                                            </div>
                                            <hr />

                                        </div>
                                    </div>
                                    </>
                                ))
                                :
                                <div style={{display:'flex', justifyContent:'end'}}>
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
                                            <p>Total ( <span>{cartLength} </span> Items )</p>
                                            <p>₹13999</p>
                                        </div>
                                        <div className='summary-t-payable'>
                                            <p><strong>Total Payable </strong></p>
                                            <p><strong>₹13999</strong></p>
                                        </div>
                                        <div className='summary-save'>
                                            <p className='orange'>You Save <span>₹899 </span></p>
                                        </div>
                                        <div className='gift-card'>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="Gift Message (Optional)"
                                                    aria-label="Gift Message (Optional)"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Text id="basic-addon2"> <MdOutlineCardGiftcard /> ADD
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </div>
                                        <div className='place-order-button mt-5'>
                                            <Button variant="primary" onClick={onOrder}>PLACE ORDER</Button>
                                            <p className='mt-3'>I have a voucher code/ gift card</p>
                                        </div>
                                        <div className='gap-30'></div>
                                        <p className='queries'><span>Any Questions?</span> Please call us at 1800-419-0066
                                            or Chat with us</p>
                                    </div>
                                </Col>
                            {/* ))
                        } */}
                    </Row>



                </Container>
            </div>
            <div className='cart-wrapper mobile-cart'>
                <div className='mobile-cart-header mb-4'>
                    <HiArrowNarrowLeft /> <h3>Cart</h3>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    addCart: state.addCart

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ CartList, CartDelete, checkoutList }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
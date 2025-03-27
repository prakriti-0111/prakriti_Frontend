import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import cartImage from "src/assets/images/cartImage.png";
import { MdClose } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { CartList } from "actions/Retailer/addcart.actions";
import BeatLoader from "react-spinners/BeatLoader";
import Loader from "../Loader";
import { WishListData, WishListAdd } from "actions/Retailer/wishlist.actions";
import { ToastContainer, toast } from "react-toastify";

const Wishlist = (props) => {
  const [load, setLoad] = useState(true);
  const wishtlist = useSelector((state) => state.customer.wishlist);
  const navigate = useNavigate();
  const addCartList = useSelector((state) => state.customer.addCart);
  const [cartItem, setCartItem] = React.useState([]);
  const [wishListItem, setWishListItem] = React.useState([]);
  const onOrder = () => {
    setLoad(true);
    navigate("/retailer/checkout");
  };
  useEffect(() => {
    if (wishtlist?.getSuccess) {
      setWishListItem(wishtlist.items.items);
    }
  }, [wishtlist?.getSuccess]);

  useEffect(() => {
    onRemove();
    props.actions.WishListData();
  }, []);

  //remove item--------
  useEffect(() => {
    if (wishtlist?.createSuccess) {
      // setLoad(false)
      toast.success(wishtlist?.successMessage);
      props.actions.CartList();
      // window.location.reload();
    }
  }, [wishtlist?.createSuccess]);

  const onRemove = (index, size) => {
    let data = {
      product_id: index,
      //size_id: parseInt(size) || null
    };
    //setLoad(false)
    props.actions.WishListAdd(data);
    props.actions.WishListData();
  };

  return (
    <>
      <div className="cart-wrapper desktop-cart">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Cart</Breadcrumb.Item>
          </Breadcrumb>
          <h3> Wishlist Items </h3>

          <Row>
            <Col xs={12} md={12}>
              <div className="ratn-wishlist ">
                {wishListItem.length > 0 ? (
                  wishListItem &&
                  wishListItem.map((val, index) => (
                    <div className="cart-inner-wrapper rounded" key={index}>
                      <div className="heading align-items-center rounded-3">
                        <div className="cart-image-title">
                          <h2>{val?.product_name}</h2>
                        </div>
                        <div className="cart-icons">
                          <h4 onClick={() => onRemove(val.product_id)}>
                            {" "}
                            <MdClose />{" "}
                          </h4>
                        </div>
                      </div>
                      <div className="cart-inner px-0 ">
                        <div className="cart-image rounded">
                          <img src={val.default_image || cartImage} alt="" />
                        </div>
                        <div className="cart-image-content">
                          <div>
                            <div className="cart-image-title">
                              <p>
                                Product Code :{" "}
                                <span>
                                  {val.product_code || 289828490189210}
                                </span>
                              </p>
                            </div>
                            <div>
                              <div className="price-wrapper">
                                <div className="cart-original-price">
                                  <span className="strikethrough">
                                    {val.display_discount || "₹8999"}
                                  </span>
                                </div>
                                <div className="cart-discount-price">
                                  <span className="price">
                                    {val.display_price || "₹6999"}
                                  </span>
                                </div>
                              </div>
                              <p className="making-charge">
                                (0% MAKING CHARGE)
                              </p>
                            </div>
                            <div className="p_description">
                              <h4>
                                Diamond PreSet Solitaire Ring In 18Kt Yellow
                                Gold (3.77 gram) with 0.129 carats
                              </h4>
                            </div>
                            {/*
                                                                <div className='cart-select'>
                                                                    <Form.Group>
                                                                        <Form.Label>Ring Size</Form.Label>
                                                                        <Form.Select>
                                                                            <option>{val.size}</option>
          
                                                                            </Form.Select>
                                                                    </Form.Group>
                                                                    <Form.Group>
                                                                        <Form.Label>Quantity</Form.Label>
                                                                        <Form.Select>
                                                                            <option>{val.quantity}</option>
                                                                        </Form.Select>
                                                                    </Form.Group>
                                                                </div>
                                                                <p className='p-variant'>Metal: <span>
                                                                    {val?.all_materials?.map((item, index) => (
                                                                        item?.name
                                                                    ))}</span></p>*/}
                            {/*{val.weight ||'18Kt Gold, 3.50 gram'}*/}

                            {/*<p className='p-variant'>Stone: <span>
                                                                    {val?.all_materials.map((item, id) => (
                                                                        item?.purities.map((value, key) => (
                                                                            value?.name
                                                                        ))

                                                                        </span> </p>))}*/}
                            {/*37 Diamond, 0.2380 Carat, SI IJ*/}
                            <div className="wishlist-buttons">
                              <Button
                                variant="default"
                                className="rounded"
                                onClick={() => {
                                  navigate(
                                    `/product-details/${val.product_id}`
                                  );
                                }}
                              >
                                Open Product
                              </Button>
                              <Button variant="primary"
                              className="rounded"
                              >Buy Now</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <center>
                    <h5>Wishlist have no Products !</h5>
                  </center>
                )}
              </div>
            </Col>
          </Row>

          {/* <Row style={{position:"relative",left:"80%",bottom:"400px"}}>
                                <Col xs={12} md={3}>
                                    <div className='order-summary-header'>
                                        <h4>PRODUCT SUMMARY</h4>
                                    </div> 
                                     <div className='summary-items'>
                                        <p> Whistlist ( <span>{cartLength} </span> Items )</p>
                                        <p>₹13999</p>
                                    </div>
                                </Col>
                            </Row> */}
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  addCart: state.addCart,
  wishList: state.wishList,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { CartList, WishListAdd, WishListData },
    dispatch
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Wishlist)
);

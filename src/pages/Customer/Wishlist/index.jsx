import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
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
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { CartList } from "actions/Customer/addcart.actions";
import BeatLoader from "react-spinners/BeatLoader";
import Loader from "../Loader";
import {
  WishListData,
  WishListAdd,
  WishListRemove,
  WishListByNow,
} from "actions/Customer/wishlist.actions";
import { ToastContainer, toast } from "react-toastify";
import { UPDATE_WISHLIST_COUNT } from "actionTypes/Customer/wishlist.type";
import NoProduct from "src/assets/images/no-product.png";

const Wishlist = (props) => {
  const [load, setLoad] = useState(true);
  const wishtlist = useSelector((state) => state.customer.wishlist);
  const navigate = useNavigate();
  const [wishListItem, setWishListItem] = React.useState([]);
  const dispatch = useDispatch();
  const onOrder = () => {
    setLoad(true);
    navigate("/checkout");
  };
  useEffect(() => {
    if (wishtlist?.getSuccess) {
      setLoad(false);
      setWishListItem(wishtlist.items);
    }
  }, [wishtlist?.getSuccess]);

  useEffect(() => {
    setLoad(true);
    props.actions.WishListData();
  }, []);

  const onRemove = async (id, index) => {
    let res = await WishListRemove(id);
    if (res.data.success) {
      wishListItem.splice(index, 1);
      setWishListItem(wishListItem);
      dispatch({ type: UPDATE_WISHLIST_COUNT, payload: res.data.data.total });
    }
  };

  const onByNow = async (id) => {
    let res = await WishListByNow(id);
    if (res.data.success) {
      props.actions.CartList();
      navigate("/cart");
    }
  };

  console.log("load", load);

  return (
    <>
      {!load && !wishListItem.length ? (
        <div className="no-product">
          <img src={NoProduct} alt="" />
          <h1 className="mb-0">Wishlist have no Products !</h1>
        </div>
      ) : null}
      <div className="cart-wrapper desktop-cart">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xs={12} md={12}>
              {load ? (
                <Loader />
              ) : (
                <div className="ratn-wishlist ">
                  {wishListItem.length > 0
                    ? wishListItem &&
                      wishListItem.map((val, index) => (
                        <div className="cart-inner-wrapper rounded border" key={index}>
                          <div className="heading align-items-center rounded-3">
                            <div className="cart-image-title">
                              <h2>{val?.product_name}</h2>
                            </div>
                            <div className="cart-icons">
                              <h4 onClick={() => onRemove(val.id, index)}>
                                {" "}
                                <MdClose />{" "}
                              </h4>
                            </div>
                          </div>
                          <div className="cart-inner px-0 ">
                                  <div className="cart-image rounded">
                                      <img src={val.current_image == null ? val.product_image : val.current_image} alt="" />
                            </div>
                            <div className="cart-image-content">
                              <div>
                                <div className="cart-image-title">
                                  <p>
                                    Product Code :{" "}
                                    <span>{val.product_code}</span>
                                  </p>
                                </div>
                                <div>
                                  <div className="price-wrapper">
                                    {val.have_offer ? (
                                      <div className="cart-original-price">
                                        <span className="strikethrough">
                                          {val.total_price_without_dis_display}
                                        </span>
                                      </div>
                                    ) : null}
                                    <div className="cart-discount-price">
                                      <span className="price">
                                        {val.total_price_display}
                                      </span>
                                    </div>
                                  </div>
                                  {val.making_charge_dis_percent > 0 ? (
                                    <p className="making-charge">
                                      ({val.making_charge_dis_percent}% MAKING
                                      CHARGE OFF)
                                    </p>
                                  ) : null}
                                </div>
                                <div className="p_description">
                                  <h4>
                                    {val.wishlist_material.map((item, key) => (
                                      <p className="mb-1" key={key}>
                                        {item.material}:{" "}
                                        <span>
                                          {item.quantity > 0
                                            ? item.quantity +
                                              " " +
                                              item.material +
                                              ", "
                                            : ""}{" "}
                                          {item.purity_name}, {item.weight}{" "}
                                          {item.unit_name}
                                        </span>
                                      </p>
                                    ))}
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
                                      navigate(`/products/${val.product_slug}`);
                                    }}
                                  >
                                    Open Product
                                  </Button>
                                  <Button
                                    variant="primary"
                                    className="rounded"
                                    onClick={() => onByNow(val.id)}
                                  >
                                    Buy Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              )}
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
      <div className="cart-wrapper mobile-cart">
        <Container className="mb-3">
          {wishListItem.length ? <h3>Wishlist</h3> : null}
          <Row className="mb-3">
            {wishListItem.map((val, index) => (
              <Col xs={12} md={9} key={index} className="mb-3">
                <div className="cart-inner-wrapper border rounded">
                  <div className="cart-inner">
                    <div className="cart-image border">
                      <img src={val.product_image} alt="" width={50} />
                    </div>
                    <div className="cart-image-content">
                      <div>
                        <div className="cart-image-title">
                          <div>
                            <h2>
                              <Link to={"/products/" + val.product_slug}>
                                {val.product_name}
                              </Link>
                            </h2>
                            <p>
                              Product Code : <span>{val.product_code}</span>
                            </p>
                          </div>
                          <div className="cart-discount-price">
                            {val.have_offer ? (
                              <span className="strikethrough">
                                {val.total_price_without_dis_display}
                              </span>
                            ) : null}
                            <span className="price">
                              {val.total_price_display}
                            </span>
                          </div>
                        </div>
                        {/*<p className='p-variant'>Metal: <span> 18Kt Gold, 3.50 gram </span></p>
                                                                <p className='p-variant'>Stone: <span> 37 Diamond, 0.2380 Carat, SI IJ </span></p>*/}
                      </div>
                      <div className="p_description cart-image-title">
                        {val.wishlist_material.map((item, key) => (
                          <p className="mb-1" key={key}>
                            {item.material}:{" "}
                            <span>
                              {item.quantity > 0
                                ? item.quantity + " " + item.material + ", "
                                : ""}{" "}
                              {item.purity_name}, {item.weight} {item.unit_name}
                            </span>
                          </p>
                        ))}
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="cart-icons">
                    <Button
                      // variant="primary"
                      className="bg-danger text-light rounded p-2 py-1 "
                      onClick={() => onRemove(val.id, index)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="primary"
                      className="bg-warning  rounded p-3"
                      onClick={() => {
                        navigate(`/products/${val.product_slug}`);
                      }}
                    >
                      Open
                    </Button>
                    <Button
                      variant="primary"
                      className="rounded"
                      onClick={() => onByNow(val.id)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
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

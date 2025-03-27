import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Row, Col } from "react-bootstrap";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoDiamondOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { BiHeart, BiShareAlt } from "react-icons/bi";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
// import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import dollar from "src/assets/images/dollar.png";
import currency from "src/assets/images/currency.png";
import membership from "src/assets/images/membership.png";
import certify from "src/assets/images/cert-sprite.png";
import discount from "src/assets/images/discount.png";
import sImage from "src/assets/images/s-product-1.png";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productFetch } from "actions/Sales/product.actions";
import { AddToCart, CartList } from "actions/Sales/addcart.actions";
import { WishListAdd } from "actions/Sales/wishlist.actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toast } from "react-toastify";
import Loader from "../Loader";
import NoProduct from "src/assets/images/no-product.png";
import videoThumb from "src/assets/images/video-icon.jpg";
import { isEmpty, priceFormat, displayAmount } from "src/helpers/helper";
import _ from "lodash";
import { RESET_WISHLIST } from "actionTypes/Sales/wishlist.type";
import { RESET_ADDCART } from "actionTypes/Sales/addcart.types";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      processing: true,
      product: null,
      imageIndex: 0,
      play_video: true,
      stockIndex: 0,
      stock_id: 0,
      size_name: "",
      wl_actionCalled: this.props.wl_actionCalled,
      wl_createSuccess: this.props.wl_createSuccess,
      wl_successMessage: this.props.wl_successMessage,
      c_actionCalled: this.props.c_actionCalled,
      c_createSuccess: this.props.c_createSuccess,
      c_successMessage: this.props.c_successMessage,
    };

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    let response = await productFetch(this.props.params.slug);
    if (response.data.success) {
      let stock_id = 0,
        size_name = "",
        product = response.data.data;
      if (product.type != "material") {
        stock_id = product.stocks[0].stock_id;
        size_name = product.stocks[0].size_name;
      }
      this.setState({
        product: response.data.data,
        processing: false,
        stock_id: stock_id,
        size_name: size_name,
      });
    } else {
      this.setState({
        processing: false,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.product && prevProps.product != this.props.product) {
      setTimeout(() => {
        if (this.videoRef) {
          this.videoRef.current?.load();
        }
      }, 200);
    }
    if (this.state.wl_actionCalled) {
      if (this.state.wl_createSuccess) {
        toast.success(this.state.wl_successMessage);
      }
      this.props.dispatch({
        type: RESET_WISHLIST,
      });
    }
    if (this.state.c_actionCalled) {
      if (this.state.c_createSuccess) {
        toast.success(this.state.c_successMessage);
        this.props.actions.CartList();
      }
      this.props.dispatch({
        type: RESET_ADDCART,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    if (props.wl_actionCalled !== state.wl_actionCalled) {
      update.wl_actionCalled = props.wl_actionCalled;
    }
    if (props.wl_createSuccess !== state.wl_createSuccess) {
      update.wl_createSuccess = props.wl_createSuccess;
    }
    if (props.wl_successMessage !== state.wl_successMessage) {
      update.wl_successMessage = props.wl_successMessage;
    }
    if (props.c_actionCalled !== state.c_actionCalled) {
      update.c_actionCalled = props.c_actionCalled;
    }
    if (props.c_createSuccess !== state.c_createSuccess) {
      update.c_createSuccess = props.c_createSuccess;
    }
    if (props.c_successMessage !== state.c_successMessage) {
      update.c_successMessage = props.c_successMessage;
    }

    return update;
  }

  changeSliderImage = (index) => {
    this.setState({
      imageIndex: index,
      play_video: false,
    });
  };

  playVideo = () => {
    this.setState(
      {
        play_video: true,
      },
      () => {
        setTimeout(() => {
          if (this.videoRef) {
            this.videoRef.current?.load();
          }
        }, 200);
      }
    );
  };

  handleSizeChange = (id) => {
    let stockIndex = this.state.stockIndex,
      size_name = "";
    for (let i = 0; i < this.state.product.stocks.length; i++) {
      if (this.state.product.stocks[i].stock_id == id) {
        stockIndex = i;
        size_name = this.state.product.stocks[i].size_name;
        break;
      }
    }
    this.setState({
      stock_id: id,
      size_name: size_name,
      stockIndex: stockIndex,
    });
  };

  handlePurityChange = (material_id, purity_id) => {
    let product = this.state.product;
    let stock = this.state.product.stocks[this.state.stockIndex];
    let materialIndex = _.findIndex(stock.materials, function (item) {
      return item.id == material_id;
    });
    let purityIndex = _.findIndex(
      stock.materials[materialIndex].purities,
      function (item) {
        return item.id == purity_id;
      }
    );
    for (let i = 0; i < stock.materials[materialIndex].purities.length; i++) {
      stock.materials[materialIndex].purities[i].is_selected = false;
      if (i == purityIndex) {
        stock.materials[materialIndex].purities[i].is_selected = true;
      }
    }
    stock.materials[materialIndex].price =
      stock.materials[materialIndex].purities[purityIndex].price;
    stock.materials[materialIndex].price_display = displayAmount(
      stock.materials[materialIndex].purities[purityIndex].price
    );
    let total_price = 0;
    for (let i = 0; i < stock.materials.length; i++) {
      let m = _.filter(stock.materials[i].purities, { is_selected: true });
      total_price += parseFloat(m[0].price);
    }

    stock.price = priceFormat(total_price);
    stock.total_price = priceFormat(
      parseFloat(stock.making_charge) + total_price
    );
    stock.total_price_display = displayAmount(
      priceFormat(parseFloat(stock.making_charge) + total_price)
    );
    product.stocks[this.state.stockIndex] = stock;
    this.setState({
      product: product,
    });
  };

  handleWishlist = () => {
    let data = {
      product_id: this.state.product.id,
      size_id: this.state.product.stocks[this.state.stockIndex].size_id,
    };
    this.props.actions.WishListAdd(data);
  };

  handleAddToCart = () => {
    if (isEmpty(this.state.auth)) {
      this.props.navigate("/login");
      return;
    }
    const { product, stockIndex } = this.state;
    let materials = [];
    for (let i = 0; i < product.stocks[stockIndex].materials.length; i++) {
      let thisM = product.stocks[stockIndex].materials[i];
      let m = _.filter(thisM.purities, { is_selected: true });
      materials.push({
        material_id: thisM.id,
        purity_id: m[0].id,
        weight: thisM.weight,
        unit_id: thisM.unit_id,
        quantity: thisM.quantity,
      });
    }
    let data = {
      product_id: product.id,
      stock_id: product.stocks[stockIndex].stock_id,
      total_weight: product.stocks[stockIndex].total_weight,
      size_id: product.stocks[stockIndex].size_id,
      type: product.type,
      materials: materials,
    };
    this.props.actions.AddToCart(data);
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        {this.state.processing ? (
          <Loader />
        ) : (
          <>
            {!product ? (
              <>
                <div className="no-product">
                  <img src={NoProduct} alt="" />
                  <h1 className="mb-0">Products Not Found</h1>
                  <Button variant="primary" className="mt-3">
                    BACK
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="product-details-wrapper desktop-view">
                  <Container>
                    <div className="breadcrumb-wrapper">
                      <Breadcrumb>
                        <Breadcrumb.Item href="">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                          {product.category_name}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <Row>
                      <Col xs={12} md={5}>
                        <div className="product-slider">
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                            }}
                            spaceBetween={10}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            <SwiperSlide
                              className="p_details_slider_wrapper"
                              style={{ maxHeight: "100px" }}
                            >
                              {this.state.play_video && product.video != "" ? (
                                <video
                                  style={{ objectFit: "contain" }}
                                  controls
                                  loop
                                  ref={this.videoRef}
                                >
                                  <source src={product.video} />
                                </video>
                              ) : (
                                <img
                                  className="p_details_slider"
                                  src={
                                    product.images[this.state.imageIndex].path
                                  }
                                />
                              )}
                            </SwiperSlide>
                          </Swiper>
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation={true}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                            onSwiper={this.setThumbsSwiper}
                          >
                            {product.video != "" ? (
                              <SwiperSlide className="slider-thumbnail">
                                <img
                                  className="thumnail-slider"
                                  src={videoThumb}
                                  onClick={() => this.playVideo()}
                                />
                              </SwiperSlide>
                            ) : null}
                            {product.images.map((item, key) => (
                              <SwiperSlide
                                className="slider-thumbnail"
                                key={key}
                              >
                                <img
                                  className="thumnail-slider"
                                  src={item.path}
                                  onClick={() => this.changeSliderImage(key)}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        <div className="gap-30"></div>
                        <div className="price-breakup">
                          <h2>Price Breakup</h2>
                          <div className="underline"></div>
                          <div className="breakup-content">
                            {product.stocks[
                              this.state.stockIndex
                            ].materials.map((item, key) => (
                              <div className="breakup-item" key={key}>
                                <span>{item.name}</span>{" "}
                                <span>{item.price_display}</span>
                              </div>
                            ))}

                            <div className="breakup-item">
                              <span>Making Charge</span>{" "}
                              <span>
                                {
                                  product.stocks[this.state.stockIndex]
                                    .making_charge_display
                                }
                              </span>
                            </div>
                            {/*<div className='breakup-item'>
                                                            <span>GST</span>  <span>₹6770</span>
                                                        </div>*/}
                            <hr style={{ margin: "8px 0" }} />
                            <div className="breakup-item">
                              <span>
                                <strong>Total</strong>{" "}
                              </span>{" "}
                              <span>
                                <strong>
                                  {
                                    product.stocks[this.state.stockIndex]
                                      .total_price_display
                                  }
                                </strong>{" "}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-customize-design-product product-details-items">
                          <Accordion defaultActiveKey="0" alwaysOpen>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <div className="header">
                                  <h2>Product Details</h2>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="product-details-items-content">
                                  <div className="product-details-items-item">
                                    <span>Product Code</span>{" "}
                                    <span>{product.product_code}</span>
                                  </div>
                                  {/*<div className='product-details-items-item'>
                                                                            <span>Height</span>  <span>16.2mm</span>
                                                                        </div>
                                                                        <div className='product-details-items-item'>
                                                                            <span>Width</span>  <span>16.2mm</span>
                                                                        </div>*/}
                                  <div className="product-details-items-item">
                                    <span>Product Weight</span>{" "}
                                    <span>
                                      {
                                        product.stocks[this.state.stockIndex]
                                          .total_weight
                                      }{" "}
                                      gram
                                    </span>
                                  </div>
                                  {product.stocks[
                                    this.state.stockIndex
                                  ].materials.map((item, key) => (
                                    <React.Fragment key={key}>
                                      <div className="product-details-items-item details-header">
                                        <span>
                                          {item.name.toUpperCase()} DETAILS
                                        </span>
                                      </div>
                                      <div className="product-details-items-item">
                                        <span>Total Weight</span>{" "}
                                        <span>{item.total_gram} gram</span>
                                      </div>
                                      {!isEmpty(item.quantity) ? (
                                        <div className="product-details-items-item">
                                          <span>
                                            Total No of{" "}
                                            {item.name.toUpperCase()}
                                          </span>{" "}
                                          <span>{item.quantity}</span>
                                        </div>
                                      ) : null}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      </Col>
                      <Col xs={12} md={7}>
                        <div className="product-details-container">
                          <div className="righ-side-wrapper">
                            <div className="p-container-header">
                              <span>
                                <h3>{product.name}</h3>
                                <div>{product.description}</div>
                                <div>
                                  <ul>
                                    <li>
                                      {" "}
                                      <BsStarFill />
                                    </li>
                                    <li>
                                      {" "}
                                      <BsStarFill />
                                    </li>
                                    <li>
                                      {" "}
                                      <BsStarFill />
                                    </li>
                                    <li>
                                      {" "}
                                      <BsStarFill />
                                    </li>
                                    <li className="blank-star">
                                      {" "}
                                      <BsStarFill />
                                    </li>
                                    <li className="rating"> 4.5</li>
                                  </ul>
                                </div>
                              </span>
                              <span className="share-icons">
                                <p>
                                  <BiHeart onClick={this.handleWishlist} />{" "}
                                </p>
                                <p>
                                  {" "}
                                  <BiShareAlt />
                                </p>
                              </span>
                            </div>
                            {/*<div className='p-headder-offer-price'>
                                                            <span> <h2> {productDetail?.display_price}</h2></span>
                                                            <span className='disc'><img src={discount} alt='discount' /> <strong>{productDetail?.display_discount || '30% OFF'}</strong></span>
                                                        </div>*/}
                            <div className="p-item-delivery">
                              <h4> Check Delivery</h4>
                              <Form.Control
                                placeholder="Enter PIN Code"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                              <Button variant="primary">Check</Button>
                            </div>
                            <div className="delivery-date">
                              <p>Usually Delivered in 7 days</p>
                            </div>
                            <div className="p-customize-design mb-4">
                              <Accordion defaultActiveKey="0" alwaysOpen>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>
                                    Customize this Design
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    {product.type != "material" ? (
                                      <div className="p-size">
                                        <span>Select Size :</span>
                                        <DropdownButton
                                          title={this.state.size_name}
                                          name="size"
                                          key={"Secondary"}
                                          id={`dropdown-variants-Secondary`}
                                          variant={"Secondary"}
                                        >
                                          {product.stocks.map((item, index) => (
                                            <div key={index}>
                                              <Dropdown.Item
                                                onClick={() =>
                                                  this.handleSizeChange(
                                                    item.stock_id
                                                  )
                                                }
                                              >
                                                {item.size_name}
                                              </Dropdown.Item>
                                            </div>
                                          ))}
                                        </DropdownButton>
                                      </div>
                                    ) : null}
                                    {product.stocks[
                                      this.state.stockIndex
                                    ].materials.map((item, key) => (
                                      <div className="p-purity" key={key}>
                                        <span>
                                          {item.name}:
                                          <Form>
                                            <div key={`inline-radio`}>
                                              {item.purities.map((val, i) => (
                                                <Form.Check
                                                  key={i}
                                                  inline
                                                  label={val.name}
                                                  name={item.name}
                                                  checked={val.is_selected}
                                                  type={"radio"}
                                                  onChange={() =>
                                                    this.handlePurityChange(
                                                      item.id,
                                                      val.id
                                                    )
                                                  }
                                                />
                                              ))}
                                            </div>
                                          </Form>
                                        </span>
                                      </div>
                                    ))}

                                    {/*<div className='p-variant'>
                                                                            <span><h2><IoDiamondOutline />Diamond:</h2>
                                                                                <Form>
                                                                                    {['radio'].map((type) => (
                                                                                        <div key={`inline-${type}`}>
                                                                                            <Form.Check
                                                                                                inline
                                                                                                label="1SI IJ"
                                                                                                name="group1"
                                                                                                type={type}
                                                                                                id={`inline-${type}-1`}
                                                                                            />
                                                                                            <Form.Check
                                                                                                inline
                                                                                                label="SI GH"
                                                                                                name="group1"
                                                                                                type={type}
                                                                                                id={`inline-${type}-2`}
                                                                                            />
                                                                                            <Form.Check
                                                                                                inline
                                                                                                label="VS GH"
                                                                                                name="group1"
                                                                                                type={type}
                                                                                                id={`inline-${type}-3`}
                                                                                            />
                                                                                            <Form.Check
                                                                                                inline
                                                                                                label="VVS EF"
                                                                                                name="group1"
                                                                                                type={type}
                                                                                                id={`inline-${type}-4`}
                                                                                            />
                                                                                        </div>
                                                                                    ))}
                                                                                </Form>
                                                                            </span>
                                                                        </div>*/}
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </div>
                          <div className="product-buttons">
                            <Button
                              variant="secondary"
                              onClick={this.handleAddToCart}
                            >
                              ADD to cart
                            </Button>
                          </div>
                          <div className="p-policy mt-4 p-3 mb-3">
                            <ul>
                              <li>
                                {" "}
                                <img src={dollar} alt="" /> 30 Day Money Back
                              </li>
                              <li>
                                {" "}
                                <img src={currency} alt="" /> 30 Day Money Back
                              </li>
                              <li>
                                {" "}
                                <img src={membership} alt="" /> Certified
                                Jewellery
                              </li>
                            </ul>
                            <p className="mt-2 m-0 text-center">
                              Any Questions? Please feel free to reach us at:
                              1800 641 0327
                            </p>
                          </div>
                          <div className="p-authenticity p-4">
                            <h4 className="text-center">
                              CERTIFICATE OF AUTHENTICITY
                            </h4>
                            <p className="mt-2 m-0 text-center">
                              Every piece of jewellery that we make is certified
                              for authenticity by third-party international
                              laboratories like SGL, IGI, BIS, GIA, and HKD.
                            </p>
                          </div>
                          <div className="p-certified p-2 text-center">
                            CERTIFIED BY <img src={certify} alt="" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="product-details-wrapper mobile-view">
                  <Container>
                    <div className="p-mobile-search">
                      <InputGroup>
                        <HiArrowNarrowLeft />
                        <Form.Control
                          placeholder="Gold Plated 24 carat Ri.."
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">
                          <BiSearchAlt2 />
                        </InputGroup.Text>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              <BiShareAlt /> Share
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </InputGroup>
                    </div>
                    <Row>
                      <Col xs={12} md={5}>
                        <div className="product-slider">
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                            }}
                            loop={true}
                            spaceBetween={10}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            {product.images.map((item, key) => (
                              <SwiperSlide key={key}>
                                <img src={item.path} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <Swiper
                            spaceBetween={10}
                            navigation={true}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                          >
                            {product.images.map((item, key) => (
                              <SwiperSlide key={key}>
                                <img src={item.path} />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        <div className="gap-30"></div>
                        <div className="righ-side-wrapper">
                          <div className="p-container-header">
                            <span>
                              <h3>Gold Plated 24 carat Ring</h3>
                              <div>
                                <ul>
                                  <li>
                                    {" "}
                                    <BsStarFill />
                                  </li>
                                  <li>
                                    {" "}
                                    <BsStarFill />
                                  </li>
                                  <li>
                                    {" "}
                                    <BsStarFill />
                                  </li>
                                  <li>
                                    {" "}
                                    <BsStarFill />
                                  </li>
                                  <li className="blank-star">
                                    {" "}
                                    <BsStarFill />
                                  </li>
                                  <li className="rating"> 4.5</li>
                                </ul>
                              </div>
                            </span>
                          </div>
                          <div className="p-header-price">
                            <h3>₹ 11,199</h3>
                          </div>
                          {/*<div className='p-headder-offer-price'>
                                                        <span> <h2>₹ 9,999</h2></span>
                                                        <span className='disc'><img src={discount} alt='discount' /> <strong>{productDetail?.display_discount}</strong></span>
                                                    </div>*/}
                          <div className="p-item-delivery">
                            <h4> Check Delivery</h4>
                            <Form.Control
                              placeholder="Enter PIN Code"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                            <Button variant="primary">Check</Button>
                          </div>
                          <div className="delivery-date">
                            <p>Usually Delivered in 7 days</p>
                          </div>
                          <div className="p-customize-design mb-4">
                            <Accordion defaultActiveKey="0" alwaysOpen>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                  Customize this Design
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="p-size">
                                    <span>
                                      Select Size
                                      <Form.Select aria-label="Default select example">
                                        <option>12</option>
                                        <option value="1">14</option>
                                        <option value="2">16</option>
                                        <option value="3">13</option>
                                      </Form.Select>
                                    </span>
                                    <span className="gold-type">
                                      Gold Type
                                      <Form.Select aria-label="Default select example">
                                        <option value="1">Yellow Gold</option>
                                        <option value="2">Yellow Gold</option>
                                        <option value="3">Yellow Gold</option>
                                      </Form.Select>
                                    </span>
                                    <span>
                                      Gold Purity
                                      <Form.Select aria-label="Default select example">
                                        <option value="1">14kt</option>
                                        <option value="2">18kt</option>
                                        <option value="3">22kt</option>
                                      </Form.Select>
                                    </span>
                                    <span>
                                      Diamond
                                      <Form.Select aria-label="Default select example">
                                        <option value="1">1SI IJ</option>
                                        <option value="2">SI GH</option>
                                        <option value="3">VS GH</option>
                                        <option value="3">VVS EF</option>
                                      </Form.Select>
                                    </span>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        </div>
                        <div className="price-breakup">
                          <h2>Price Breakup</h2>
                          <div className="underline"></div>
                          <div className="breakup-content">
                            <div className="breakup-item">
                              <span>Gold</span> <span>₹6770</span>
                            </div>
                            <div className="breakup-item">
                              <span>Diamond</span> <span>₹6770</span>
                            </div>
                            <div className="breakup-item">
                              <span>Making Charge</span> <span>₹6770</span>
                            </div>
                            <div className="breakup-item">
                              <span>GST</span> <span>₹6770</span>
                            </div>
                            <hr style={{ margin: "8px 0" }} />
                            <div className="breakup-item">
                              <span>
                                <strong>Total</strong>{" "}
                              </span>{" "}
                              <span>
                                <strong>₹6770</strong>{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="product-details-items mt-4 rounded">
                          <div className="header">
                            <h2>Product Details</h2>
                            <a href="">
                              <MdKeyboardArrowDown />
                            </a>
                          </div>
                          <div className="underline"></div>
                          <div className="product-details-items-content">
                            <div className="product-details-items-item">
                              <span>Product Code</span>{" "}
                              <span>{product.product_code}</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Height</span> <span>16.2mm</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Width</span> <span>16.2mm</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Product Weight</span>{" "}
                              <span>4.1453 gram</span>
                            </div>
                            <div className="product-details-items-item details-header">
                              <span>DIAMOND DETAILS</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Total Weight</span> <span>0.244 ct</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Total No of Diamonds</span> <span>34</span>
                            </div>
                            <div className="product-details-items-item details-header">
                              <span>METAL DETAILS</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Total Weight</span> <span>0.244 ct</span>
                            </div>
                            <div className="product-details-items-item">
                              <span>Total No of Diamonds</span> <span>34</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} md={7}>
                        <div className="product-details-container">
                          <div className="p-policy mt-4 p-3 mb-3">
                            <ul>
                              <li>
                                {" "}
                                <img src={dollar} alt="" /> 30 Day Money Back
                              </li>
                              <li>
                                {" "}
                                <img src={currency} alt="" /> 30 Day Money Back
                              </li>
                              <li>
                                {" "}
                                <img src={membership} alt="" /> Certified
                                Jewellery
                              </li>
                            </ul>
                            <p className="mt-2 m-0 text-center">
                              Any Questions? Please feel free to reach us at:
                              1800 641 0327
                            </p>
                          </div>
                          <div className="p-certified p-2 text-center">
                            CERTIFIED BY <img src={certify} alt="" />
                          </div>
                          <div className="similar-product-slider">
                            <h4>You may also like</h4>
                            <Swiper
                              slidesPerView={1}
                              spaceBetween={20}
                              onSlideChange={() => console.log("slide change")}
                              onSwiper={(swiper) => console.log(swiper)}
                            >
                              <SwiperSlide className="similar-slider-inner">
                                <div className="s-slider-image">
                                  <img src={sImage} alt="selling product" />
                                </div>
                                <div className="s-slider-content">
                                  <div className="similar-slider-header">
                                    <h2>Gold Plated Ring</h2>
                                    <div className="wishlist">
                                      <BiHeart />
                                    </div>
                                  </div>
                                  <div className="p-header-price">
                                    <h3>₹ 11,199</h3>
                                  </div>
                                  <div className="p-headder-offer-price">
                                    <span>
                                      {" "}
                                      <h2>₹ 9,999</h2>
                                    </span>
                                    <span className="disc">
                                      <img src={discount} alt="discount" />{" "}
                                      <strong>66</strong>
                                    </span>
                                  </div>
                                  <span className="rating-wrapper">
                                    <ul>
                                      <li>
                                        {" "}
                                        <BsStarFill />
                                      </li>
                                      <li>
                                        {" "}
                                        <BsStarFill />
                                      </li>
                                      <li>
                                        {" "}
                                        <BsStarFill />
                                      </li>
                                      <li>
                                        {" "}
                                        <BsStarFill />
                                      </li>
                                      <li className="blank-star">
                                        {" "}
                                        <BsStarFill />
                                      </li>
                                      <li className="rating"> 4.5</li>
                                    </ul>
                                  </span>
                                </div>
                              </SwiperSlide>
                            </Swiper>
                          </div>
                          <div className="gap-70"></div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <div className="product-float-buttons">
                    <BiHeart />
                    <Button variant="success">Try at home</Button>
                    <Button variant="secondary">ADD to cart</Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //product: state.sales.product.product,
  //processing: state.sales.product.processing,
  auth: state.auth,
  wl_actionCalled: state.sales.wishlist.actionCalled,
  wl_createSuccess: state.sales.wishlist.createSuccess,
  wl_successMessage: state.sales.wishlist.successMessage,

  c_actionCalled: state.sales.cart.actionCalled,
  c_createSuccess: state.sales.cart.createSuccess,
  c_successMessage: state.sales.cart.successMessage,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    { productFetch, WishListAdd, AddToCart, CartList },
    dispatch
  ),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import au1 from "src/assets/images/au-1.png";
import au2 from "src/assets/images/au-2.png";
import au3 from "src/assets/images/au-3.png";
import au4 from "src/assets/images/au-4.png";
import au5 from "src/assets/images/au-5.png";
import jewelleryHome from "src/assets/images/jewelleryHome.png";
import refund from "src/assets/images/refund.png";
import exchange from "src/assets/images/exchange.png";
import shipping from "src/assets/images/shipping.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoDiamondOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { BsHeartFill, BsHeart } from "react-icons/bs";
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
import cert from "src/assets/images/cert-1.png";
import cert2 from "src/assets/images/cert-2.png";
import cert3 from "src/assets/images/cert-3.png";
import cert4 from "src/assets/images/cert-4.png";
import cert5 from "src/assets/images/cert-5.png";
import discount from "src/assets/images/discount.png";
import sImage from "src/assets/images/s-product-1.png";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  productFetch,
  recentlyViewCategories,
  prodductReviews,
} from "actions/Customer/product.actions";
import {
  AddToCart,
  CartList,
  AddToCartRaw,
} from "actions/Customer/addcart.actions";
import { WishListAdd } from "actions/Customer/wishlist.actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toast } from "react-toastify";
import Loader from "../Loader";
import NoProduct from "src/assets/images/no-product.png";
import videoThumb from "src/assets/images/video-icon.jpg";
import {
  isEmpty,
  priceFormat,
  displayAmount,
  convertUnitToGram,
  weightFormat,
  setLastVisitPage,
} from "src/helpers/helper";
import _ from "lodash";
import { RESET_WISHLIST } from "actionTypes/Customer/wishlist.type";
import { RESET_ADDCART } from "actionTypes/Customer/addcart.types";
import { UPDATE_WISHLIST_COUNT } from "actionTypes/Customer/wishlist.type";
import { Helmet } from "react-helmet";
import ReactPaginate from "react-paginate";
import { RWebShare } from "react-web-share";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      processing: true,
      product: null,
      imageIndex: 0,
      play_video: true,
      sizeMaterialIndex: 0,
      wl_actionCalled: this.props.wl_actionCalled,
      wl_createSuccess: this.props.wl_createSuccess,
      wl_successMessage: this.props.wl_successMessage,
      c_actionCalled: this.props.c_actionCalled,
      c_createSuccess: this.props.c_createSuccess,
      c_successMessage: this.props.c_successMessage,
      c_errorMessage: this.props.c_errorMessage,
      page: 1,
      limit: 10,
      review_data: null,
      qty: "",
      weight: "",
      weight_err: "",
      qty_err: "",
    };

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProductReviews = async (product_id) => {
    let res = await prodductReviews({
      page: this.state.page,
      size: this.state.limit,
      product_id: product_id,
    });
    if (res.data.success) {
      let review_data =
        this.state.page == 1
          ? res.data.data
          : { ...this.state.review_data, ...res.data.data };
      this.setState({
        review_data: review_data,
      });
    }
  };

  loadProduct = async () => {
    let response = await productFetch({
      slug: this.props.params.slug,
      recently_view: 1,
    });
    if (response.data.success) {
      this.setState({
        product: response.data.data,
        processing: false,
        sizeMaterialIndex: 0,
      });
      this.loadProductReviews(response.data.data.id);
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
      // else {
      //     console.log("ok")
      //     toast.error(this.state.c_errorMessage);
      // }
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
    if (props.c_errorMessage !== state.c_errorMessage) {
      update.c_errorMessage = props.c_errorMessage;
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

  handleSizeChange = (index) => {
    this.setState({
      sizeMaterialIndex: index,
    });
  };

  handlePurityChange = (material_id, purity_id) => {
    let product = this.state.product;
    let sizeMaterial = product.size_materials[this.state.sizeMaterialIndex];
    let materialIndex = _.findIndex(sizeMaterial.materials, function (item) {
      return item.material_id == material_id;
    });
    let purityIndex = _.findIndex(
      sizeMaterial.materials[materialIndex].purities,
      function (item) {
        return item.id == purity_id;
      }
    );
    for (
      let i = 0;
      i < sizeMaterial.materials[materialIndex].purities.length;
      i++
    ) {
      sizeMaterial.materials[materialIndex].purities[i].is_selected = false;
      if (i == purityIndex) {
        sizeMaterial.materials[materialIndex].purities[i].is_selected = true;
        sizeMaterial.materials[materialIndex].discount_percent =
          sizeMaterial.materials[materialIndex].purities[i].discount_percent;
      }
    }

    sizeMaterial.materials[materialIndex].price =
      sizeMaterial.materials[materialIndex].purities[purityIndex].price;
    sizeMaterial.materials[materialIndex].mrp_price =
      sizeMaterial.materials[materialIndex].purities[purityIndex].mrp_price;
    let total_mrp_price = 0,
      total_sale_price = 0,
      total_gst = 0;
    for (let i = 0; i < sizeMaterial.materials.length; i++) {
      let m = _.filter(sizeMaterial.materials[i].purities, {
        is_selected: true,
      });
      total_mrp_price += parseFloat(m[0].mrp_price);
      total_sale_price += parseFloat(m[0].price);
    }

    total_mrp_price += parseFloat(sizeMaterial.making_charge_mrp);
    total_sale_price += parseFloat(sizeMaterial.making_charge);

    if (product.tax_info) {
      let igst = 0;
      let cgst = !isEmpty(product.tax_info.cgst)
        ? priceFormat(
            (total_sale_price * parseFloat(product.tax_info.cgst)) / 100,
            true
          )
        : 0;
      let sgst = !isEmpty(product.tax_info.sgst)
        ? priceFormat(
            (total_sale_price * parseFloat(product.tax_info.sgst)) / 100,
            true
          )
        : 0;
      let cgst_m = !isEmpty(product.tax_info.cgst)
        ? priceFormat(
            (total_mrp_price * parseFloat(product.tax_info.cgst)) / 100,
            true
          )
        : 0;
      let sgst_m = !isEmpty(product.tax_info.sgst)
        ? priceFormat(
            (total_mrp_price * parseFloat(product.tax_info.sgst)) / 100,
            true
          )
        : 0;
      total_mrp_price += igst + cgst_m + sgst_m;
      total_sale_price += igst + cgst + sgst;
      total_gst = priceFormat(igst + cgst + sgst);
    }

    let discount_percent =
      total_mrp_price > total_sale_price
        ? Math.round(
            priceFormat(
              ((total_mrp_price - total_sale_price) / total_mrp_price) * 100
            )
          )
        : 0;

    sizeMaterial.mrp_price = priceFormat(total_mrp_price);
    sizeMaterial.sale_price = priceFormat(total_sale_price);
    sizeMaterial.discount_percent = discount_percent;
    sizeMaterial.total_gst = total_gst;
    sizeMaterial.have_offer = total_mrp_price > total_sale_price ? true : false;
    product.size_materials[this.state.sizeMaterialIndex] = sizeMaterial;

    this.setState({
      product: product,
    });
  };

  handleWishlist = async () => {
    // if (isEmpty(this.state.auth)) {
    //   setLastVisitPage();
    //   this.props.navigate("/login");
    //   return;
    // }

    const { product } = this.state;
    if (!product) {
      return;
    }

    let selected_materials = product.size_materials[0].materials;
    let size_id = product.size_materials[0].size_id;
    let rate = product.size_materials[0].sale_price;
    let total_weight = 0;
    let materials = [];

    for (let i = 0; i < selected_materials.length; i++) {
      let thisM = selected_materials[i];
      let m = _.filter(thisM.purities, { is_selected: true });

      let total_gram = convertUnitToGram(thisM.unit_name, thisM.weight);
      total_gram = weightFormat(total_gram);
      total_weight += parseFloat(total_gram);

      materials.push({
        material_id: thisM.material_id,
        purity_id: m[0].id,
        weight: thisM.weight,
        unit_id: thisM.unit_id,
        quantity: thisM.quantity,
      });
    }

    let data = {
      product_id: product.id,
      stock_id: null,
      total_weight: total_weight,
      size_id: product.type != "material" ? size_id : null,
      type: product.type,
      rate: rate,
      materials: materials,
    };

    let res = await WishListAdd(data);
    if (res.data.success) {
      this.setState({
        product: {
          ...this.state.product,
          has_wishlist: res.data.data.status,
        },
      });
      this.props.dispatch({
        type: UPDATE_WISHLIST_COUNT,
        payload: res.data.data.total,
      });
    }
  };

  handleAddToCart = async () => {
    /*if (isEmpty(this.state.auth)) {
            this.props.navigate('/login');
            return;
        }*/
    const { product } = this.state;
    let weight = null,
      quantity = 1,
      is_manual = 0;
    if (product && !product.certified && product.type == "material") {
      let hasErr = false;
      if (parseFloat(this.state.weight) > 0) {
        this.setState({
          weight_err: "",
        });
      } else {
        this.setState({
          weight_err: "Required.",
        });
        hasErr = true;
      }
      if (parseInt(this.state.qty) > 0) {
        this.setState({
          qty_err: "",
        });
      } else {
        this.setState({
          qty_err: "Required.",
        });
        hasErr = true;
      }
      if (hasErr) {
        return;
      } else {
        weight = parseFloat(this.state.weight);
        quantity = parseInt(this.state.qty);
        is_manual = 1;
      }
    }

    let selected_materials = product
      ? product.size_materials[this.state.sizeMaterialIndex].materials
      : [];
    let size_id = product
      ? product.size_materials[this.state.sizeMaterialIndex].size_id
      : null;
    let rate = product
      ? product.size_materials[this.state.sizeMaterialIndex].sale_price
      : null;
    let total_weight = 0;
    let materials = [];

    for (let i = 0; i < selected_materials.length; i++) {
      let thisM = selected_materials[i];
      let m = _.filter(thisM.purities, { is_selected: true });

      let total_gram = convertUnitToGram(
        thisM.unit_name,
        weight ? weight : thisM.weight
      );
      total_gram = weightFormat(total_gram); //(product.type == 'material') ? weightFormat(total_gram / parseInt(thisM.quantity)) : weightFormat(total_gram);
      total_weight += parseFloat(total_gram);

      materials.push({
        material_id: thisM.material_id,
        purity_id: m[0].id,
        weight: weight ? weight : thisM.weight,
        unit_id: thisM.unit_id,
        quantity: weight ? quantity : thisM.quantity,
      });
    }

  

    let data = {
      product_id: product.id,
      stock_id: null,
      total_weight: total_weight,
      size_id: product.type != "material" ? size_id : null,
      type: product.type,
      rate: rate,
      materials: materials,
      certificate_no: product.certificate_no,
      quantity: quantity,
      is_manual: is_manual,
    };

    console.log("-------------- Data of cart items ", data);
    let res = await AddToCartRaw(data);
    if (res.data.success) {
      toast.success(res.data.message);
      this.props.actions.CartList();
      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }

    //this.props.actions.AddToCart(data);
  };

  handleOrderNow = async () => {
    let res = await this.handleAddToCart();
    if (res) {
      this.props.navigate("/cart");
    }
  };

  handlePageClick = (event) => {
    this.setState(
      {
        page: parseInt(event.selected) + 1,
      },
      () => {
        this.loadProductReviews(this.state.product.id);
      }
    );
  };

  handleWeight = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || e.target.value.match(/^\d{1,}(\.\d{0,3})?$/)) {
      this.setState({ weight: e.target.value });
    }
  };

  handleQty = (e) => {
    const re = /^[0-9\b]+$/;
    let value = e.target.value;
    if (value === "" || re.test(value)) {
      /*if (value != "") {
                let max = 100;
                value = Math.max(Number(0), Math.min(Number(max), Number(value)));
            }*/
      this.setState({ qty: value });
    }
  };

  getSelectedVal = (arr) => {
    let id = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].is_selected == true) {
        id = arr[i].id;
        break;
      }
    }
    return id;
  };

  render() {
    const { product, review_data } = this.state;
    const sizeMaterial = product
      ? product.size_materials[this.state.sizeMaterialIndex]
      : null;
    const totalPage = review_data
      ? Math.ceil(review_data.total / this.state.limit)
      : 1;
    let cartWeight = this.state.weight ? parseFloat(this.state.weight) : 1;
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
                <Helmet>
                  {!isEmpty(product.meta_title) ? (
                    <title>{product.meta_title}</title>
                  ) : null}
                  {!isEmpty(product.short_desc) ? (
                    <meta name="description" content={product.short_desc} />
                  ) : null}
                  {!isEmpty(product.keywords) ? (
                    <meta name="keywords" content={product.keywords} />
                  ) : null}
                </Helmet>
                <div className="product-details-wrapper desktop-view">
                  <Container>
                    <div className="breadcrumb-wrapper">
                      <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item
                          href={
                            "/products?category=" +
                            product.category_slug +
                            "&subcategory=" +
                            product.sub_category_slug
                          }
                        >
                          {product.sub_category}
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
                            // loop={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            <SwiperSlide
                              className="p_details_slider_wrapper border rounded"
                              style={{ maxHeight: "100px" }}
                            >
                              {this.state.play_video && product.video != "" ? (
                                <video
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "385px",
                                  }}
                                  controls
                                  autoPlay
                                  loop
                                  ref={this.videoRef}
                                >
                                  <source src={product.video} />
                                </video>
                              ) : (
                                <img
                                  className="p_details_slider rounded"
                                  src={product.images[this.state.imageIndex]}
                                />
                              )}
                            </SwiperSlide>
                          </Swiper>
                          <Swiper
                            spaceBetween={10}
                            // loop={true}
                            slidesPerView={4}
                            navigation={true}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                            onSwiper={this.setThumbsSwiper}
                          >
                            {product.video != "" ? (
                              <SwiperSlide className="slider-thumbnail border rounded">
                                <img
                                  className="thumnail-slider rounded"
                                  src={videoThumb}
                                  onClick={() => this.playVideo()}
                                />
                              </SwiperSlide>
                            ) : null}
                            {product.images.map((item, key) => (
                              <SwiperSlide
                                className="slider-thumbnail border rounded"
                                key={key}
                              >
                                <img
                                  className="thumnail-slider rounded"
                                  src={item}
                                  onClick={() => this.changeSliderImage(key)}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>

                        <div className="p-customize-design-product product-details-items rounded bg-light">
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
                                  <div className="product-details-items-item">
                                    <span>Product Weight</span>{" "}
                                    <span>
                                      {sizeMaterial.product_weight_display}
                                    </span>
                                  </div>
                                  {sizeMaterial.materials.map((item, key) => (
                                    <React.Fragment key={key}>
                                      <div className="product-details-items-item details-header">
                                        <span>
                                          {item.material_name.toUpperCase()}{" "}
                                          DETAILS
                                        </span>
                                      </div>
                                      <div className="product-details-items-item">
                                        <span>Total Weight</span>{" "}
                                        <span>
                                          {item.weight} {item.unit_name}
                                        </span>
                                      </div>
                                      {!isEmpty(item.quantity) &&
                                      parseInt(item.quantity) > 0 ? (
                                        <div className="product-details-items-item">
                                          <span>
                                            Total No of{" "}
                                            {item.material_name.toUpperCase()}
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
                      <Col xs={12} md={7} className="rounded bg-light p-4">
                        <div className="product-details-container">
                          <div className="righ-side-wrapper">
                            <div className="p-container-header">
                              <span>
                                <h3>{product.name}</h3>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: product.description,
                                  }}
                                ></div>
                                <div>
                                  <ul>
                                    {[...Array(5).keys()].map((x, i) => (
                                      <li
                                        className={
                                          product.rating < x + 1
                                            ? "blank-star"
                                            : ""
                                        }
                                        key={i}
                                      >
                                        <BsStarFill />
                                      </li>
                                    ))}
                                    <li className="rating">
                                      {" "}
                                      {product.rating.toFixed(2)}
                                    </li>
                                  </ul>
                                </div>
                              </span>
                              <span className="share-icons">
                                <p>
                                  {product.has_wishlist ? (
                                    <BsHeartFill
                                      onClick={this.handleWishlist}
                                      className={"wishlist_active"}
                                    />
                                  ) : (
                                    <BsHeart onClick={this.handleWishlist} />
                                  )}
                                </p>
                                <p>
                                  <RWebShare
                                    data={{
                                      text: "",
                                      url: window.location.href,
                                      title: product.name,
                                    }}
                                  >
                                    <BiShareAlt />
                                  </RWebShare>
                                </p>
                              </span>
                            </div>
                            <div className="p-header-price">
                              {sizeMaterial.discount_percent > 0 ? (
                                <h5>
                                  {" "}
                                  <span className="text-primary">
                                    {displayAmount(sizeMaterial.mrp_price)}{" "}
                                  </span>
                                  {sizeMaterial.discount_percent > 0 ? (
                                    <sup className="discount text-danger">
                                      {" "}
                                      {sizeMaterial.discount_percent}% OFF{" "}
                                    </sup>
                                  ) : null}{" "}
                                </h5>
                              ) : null}
                              <h2>
                                {displayAmount(sizeMaterial.sale_price)}
                                {!product.certified &&
                                product.type == "material"
                                  ? " / " + sizeMaterial.materials[0].unit_name
                                  : ""}
                              </h2>
                            </div>
                            <div className="price-breakup mt-3 rounded bg-white shadow">
                              <h2>Price Breakup</h2>
                              <div className="underline"></div>
                              <div className="breakup-content">
                                {sizeMaterial.materials.map((item, key) => (
                                  <div className="breakup-item" key={key}>
                                    <span>
                                      {item.material_name} &nbsp;&nbsp;&nbsp;{" "}
                                      {/* {item.discount_percent > 0
                                        ? item.discount_percent + "% OFF"
                                        : ""} */}
                                    </span>{" "}
                                    <span>
                                      {item.mrp_price > item.price ? (
                                        <span className="line-through">
                                          {displayAmount(item.mrp_price)}
                                        </span>
                                      ) : null}
                                      {displayAmount(item.price)}
                                    </span>
                                  </div>
                                ))}

                                <div className="breakup-item">
                                  <span>
                                    Making Charge{" "}
                                    {sizeMaterial.making_charge_dis_percent > 0
                                      ? sizeMaterial.making_charge_dis_percent +
                                        "% OFF"
                                      : ""}
                                  </span>{" "}
                                  <span>
                                    {sizeMaterial.making_charge_mrp >
                                    sizeMaterial.making_charge ? (
                                      <span className="line-through">
                                        {displayAmount(
                                          sizeMaterial.making_charge_mrp
                                        )}
                                      </span>
                                    ) : null}
                                    {displayAmount(sizeMaterial.making_charge)}
                                  </span>
                                </div>
                                <div className="breakup-item">
                                  <span>GST</span>{" "}
                                  <span>
                                    {displayAmount(sizeMaterial.total_gst)}
                                  </span>
                                </div>
                                <hr style={{ margin: "8px 0" }} />
                                <div className="breakup-item">
                                  <span className="total">Total</span>{" "}
                                  <span className="total">
                                    {displayAmount(
                                      sizeMaterial.sale_price * cartWeight
                                    )}{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="p-customize-design mb-4">
                              <Accordion defaultActiveKey="0" alwaysOpen>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>
                                    Customize Your Product
                                  </Accordion.Header>
                                  <Accordion.Body className="shadow">
                                    {product.type != "material" ? (
                                      <div className="p-size ">
                                        <span>Select Size :</span>
                                        <DropdownButton
                                          title={sizeMaterial.size_name}
                                          name="size"
                                          key={"Secondary"}
                                          id={`dropdown-variants-Secondary`}
                                          variant={"Secondary"}
                                        >
                                          {product.size_materials.map(
                                            (item, index) => (
                                              <div key={index}>
                                                <Dropdown.Item
                                                  onClick={() =>
                                                    this.handleSizeChange(index)
                                                  }
                                                >
                                                  {item.size_name}
                                                </Dropdown.Item>
                                              </div>
                                            )
                                          )}
                                        </DropdownButton>
                                      </div>
                                    ) : null}
                                    {sizeMaterial.materials.map((item, key) => (
                                      <div className="p-purity" key={key}>
                                        <span>
                                          {sizeMaterial.materials.length > 1
                                            ? item.material_name
                                            : "Purity"}
                                          :
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
                                                      item.material_id,
                                                      val.id
                                                    )
                                                  }
                                                  id={"p-" + val.id}
                                                />
                                              ))}
                                            </div>
                                          </Form>
                                        </span>
                                      </div>
                                    ))}
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </div>
                          {!product.certified && product.type == "material" ? (
                            <div>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Weight</Form.Label>
                                    <InputGroup
                                      className={
                                        this.state.weight_err
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    >
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter weight"
                                        value={this.state.weight}
                                        onChange={this.handleWeight}
                                      />
                                      <InputGroup.Text>
                                        {sizeMaterial.materials[0].unit_name}
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                      {this.state.weight_err}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter quantity"
                                      value={this.state.qty}
                                      onChange={this.handleQty}
                                      className={
                                        this.state.qty_err
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {this.state.qty_err}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </div>
                          ) : null}
                          <div className="product-buttons">
                            <Button
                              variant="danger"
                              onClick={this.handleAddToCart}
                              className="rounded"
                            >
                              <i class="bi bi-cart-plus me-4"></i>ADD TO CART
                            </Button>
                            <Button
                              variant="primary"
                              onClick={this.handleOrderNow}
                              className="rounded"
                            >
                              ORDER NOW
                            </Button>
                          </div>
                          {/*<div className='p-item-delivery'>
                                                                <h4> Check Delivery</h4>
                                                                <Form.Control
                                                                    placeholder="Enter PIN Code"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                />
                                                                <Button variant="primary">Check</Button>
                                                        </div>
                                                            <div className='delivery-date'>
                                                                <p>Usually Delivered in 7 days</p>
                                                            </div>*/}
                          {/*<div className='p-policy mt-3 p-3 mb-3'>
                                                                <ul>
                                                                    <li> <img src={refund} alt='' /> 100% Certified </li>
                                                                    <li> <img src={exchange} alt='' /> 7 Days Money Back </li>
                                                                    <li> <img src={shipping} alt='' /> Free Delivery </li>
                                                                    <li> <img src={jewelleryHome} alt='' /> Genuine Price </li>
                                                                </ul>

                                                        </div>*/}

                          <div className="p-authenticity p-4 mt-3 p-details-authenticity rounded bg-white">
                            {product.certificates.length ? (
                              <>
                                <h4 className="text-center">
                                  CERTIFICATE OF AUTHENTICITY
                                </h4>
                                <ul className="authenticity_list justify-content-center">
                                  {product.certificates.map((item, k) => (
                                    <a
                                      href={item.website}
                                      target="_blank"
                                      key={k}
                                    >
                                      <li className="rounded bg-light ">
                                        <img src={item.logo} alt="" />
                                      </li>
                                    </a>
                                  ))}
                                </ul>
                              </>
                            ) : null}
                            <ul className="cart-authenticity">
                              <li className="">
                                {" "}
                                <img src={refund} alt="" /> 100% Certified{" "}
                              </li>
                              <li className="">
                                {" "}
                                <img src={shipping} alt="" /> Free Delivery{" "}
                              </li>
                              <li className="">
                                {" "}
                                <img src={jewelleryHome} alt="" /> Genuine Price{" "}
                              </li>
                            </ul>

                            {/*<h4 className='text-center'>CERTIFICATE OF AUTHENTICITY</h4>
                                                                <p className='mt-2 m-0 text-center'>Every piece of jewellery that we make is certified for authenticity by third-party international laboratories like SGL, IGI, BIS, GIA, and HKD.</p>
                                                                <div className='p-certified p-2 text-center'>
                                                                    <span>CERTIFIED BY </span> 
                                                                    <ul className='certified_images'>
                                                                        {
                                                                            product.certificates.map((item, c_k) => (
                                                                                <li key={c_k}>
                                                                                    <OverlayTrigger
                                                                                        placement="bottom"
                                                                                        overlay={<Tooltip>{item.name}</Tooltip>}
                                                                                    >
                                                                                        <a href={item.website} target="_blank"><img src={item.logo} alt='' height="24px" width="24px" /></a>
                                                                                    </OverlayTrigger>
                                                                                </li>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                    
                                                                    </div>*/}
                          </div>
                          <a href="tel:+91 98744 45878">
                            {" "}
                            <p className="mt-2 m-0 text-center reach-us">
                              Any Questions? Please feel free to reach us at:{" "}
                              <span> +91 98744 45878 </span>
                            </p>{" "}
                          </a>

                          {review_data ? (
                            <>
                              {review_data.total > 0 ? (
                                <div className="rating_sec bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                                  <h5 className="mb-0 mb-4">
                                    Ratings and Reviews
                                  </h5>
                                  <div className="graph-star-rating-header">
                                    <div className="star-rating">
                                      {" "}
                                      <a href="#">
                                        <i className="icofont-ui-rating active"></i>
                                      </a>{" "}
                                      <a href="#">
                                        <i className="icofont-ui-rating active"></i>
                                      </a>{" "}
                                      <a href="#">
                                        <i className="icofont-ui-rating active"></i>
                                      </a>{" "}
                                      <a href="#">
                                        <i className="icofont-ui-rating active"></i>
                                      </a>{" "}
                                      <a href="#">
                                        <i className="icofont-ui-rating"></i>
                                      </a>{" "}
                                      <b className="text-black ml-2">
                                        {review_data.total}
                                      </b>
                                    </div>
                                    <p className="text-black mb-4 mt-2">
                                      Rated {product.rating} out of 5
                                    </p>
                                  </div>
                                  <div className="graph-star-rating-body">
                                    <div className="rating-list">
                                      <div className="rating-list-left text-black">
                                        {" "}
                                        5 Star
                                      </div>
                                      <div className="rating-list-center">
                                        <div className="progress">
                                          <div
                                            style={{
                                              width: `${review_data.total_5}%`,
                                            }}
                                            aria-valuemax="5"
                                            aria-valuemin="0"
                                            aria-valuenow="5"
                                            role="progressbar"
                                            className="progress-bar bg-primary"
                                          >
                                            {" "}
                                            <span className="sr-only"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="rating-list-right text-black">
                                        {review_data.total_5}%
                                      </div>
                                    </div>
                                    <div className="rating-list">
                                      <div className="rating-list-left text-black">
                                        {" "}
                                        4 Star
                                      </div>
                                      <div className="rating-list-center">
                                        <div className="progress">
                                          <div
                                            style={{
                                              width: `${review_data.total_4}%`,
                                            }}
                                            aria-valuemax="5"
                                            aria-valuemin="0"
                                            aria-valuenow="5"
                                            role="progressbar"
                                            className="progress-bar bg-primary"
                                          >
                                            {" "}
                                            <span className="sr-only"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="rating-list-right text-black">
                                        {review_data.total_4}%
                                      </div>
                                    </div>
                                    <div className="rating-list">
                                      <div className="rating-list-left text-black">
                                        {" "}
                                        3 Star
                                      </div>
                                      <div className="rating-list-center">
                                        <div className="progress">
                                          <div
                                            style={{
                                              width: `${review_data.total_3}%`,
                                            }}
                                            aria-valuemax="5"
                                            aria-valuemin="0"
                                            aria-valuenow="5"
                                            role="progressbar"
                                            className="progress-bar bg-primary"
                                          >
                                            {" "}
                                            <span className="sr-only"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="rating-list-right text-black">
                                        {review_data.total_3}%
                                      </div>
                                    </div>
                                    <div className="rating-list">
                                      <div className="rating-list-left text-black">
                                        {" "}
                                        2 Star
                                      </div>
                                      <div className="rating-list-center">
                                        <div className="progress">
                                          <div
                                            style={{
                                              width: `${review_data.total_2}%`,
                                            }}
                                            aria-valuemax="5"
                                            aria-valuemin="0"
                                            aria-valuenow="5"
                                            role="progressbar"
                                            className="progress-bar bg-primary"
                                          >
                                            {" "}
                                            <span className="sr-only"></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="rating-list-right text-black">
                                        {review_data.total_5}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}

                              <div className="rating_sec bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                                <h5 className="mb-1">
                                  {review_data.total > 0
                                    ? "All Ratings and Reviews"
                                    : "This is newly launched product, currently we do not have any rating for this."}
                                </h5>
                                {review_data.items.map((item, index) => (
                                  <React.Fragment key={index}>
                                    <div className="reviews-members pt-4 pb-4">
                                      <div className="media">
                                        {" "}
                                        <a href="#">
                                          <img
                                            src={item.user_image}
                                            className="mr-3 rounded-pill"
                                          />
                                        </a>
                                        <div className="media-body">
                                          <div className="reviews-members-header">
                                            {" "}
                                            <span className="star-rating float-right">
                                              {" "}
                                              <a href="#">
                                                <i className="icofont-ui-rating active"></i>
                                              </a>{" "}
                                              <a href="#">
                                                <i className="icofont-ui-rating active"></i>
                                              </a>{" "}
                                              <a href="#">
                                                <i className="icofont-ui-rating active"></i>
                                              </a>{" "}
                                              <a href="#">
                                                <i className="icofont-ui-rating active"></i>
                                              </a>{" "}
                                              <a href="#">
                                                <i className="icofont-ui-rating"></i>
                                              </a>{" "}
                                            </span>
                                            <h6 className="mb-1">
                                              <a
                                                className="text-black"
                                                href="#"
                                              >
                                                {item.user_name}
                                              </a>
                                            </h6>
                                            <p className="text-gray">
                                              {item.created_at}
                                            </p>
                                          </div>
                                          <div className="reviews-members-body">
                                            <p>{item.review}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {index + 1 < review_data.items.length ? (
                                      <hr />
                                    ) : null}
                                  </React.Fragment>
                                ))}
                                <div className="text-center w-100 d-block mt-4 font-weight-bold">
                                  <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={this.handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPage}
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                  />
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="product-details-wrapper mobile-view">
                  <Container>
                    <div className="breadcrumb-wrapper">
                      <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                          {product.category}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    {/*<div className='p-mobile-search'>
                                                    <InputGroup>
                                                       <a href="/products"> <HiArrowNarrowLeft /> </a>
                                                        <Form.Control
                                                            placeholder="Gold Plated 24 carat Ri.."
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <InputGroup.Text id="basic-addon2"><FiSearch /></InputGroup.Text>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                <BsThreeDotsVertical />
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1"><BiShareAlt /> Share</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </InputGroup>
                                                                            </div>*/}
                    <Row>
                      <Col xs={12} md={5}>
                        <div className="product-slider">
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                            }}
                            spaceBetween={10}
                            // loop={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            {product.images.map((image, index) => (
                              <SwiperSlide
                                key={index}
                                className="p_details_slider_wrapper border rounded"
                                style={{ maxHeight: "100px" }}
                              >
                                {this.state.play_video &&
                                product.video != "" ? (
                                  <video
                                    style={{
                                      objectFit: "contain",
                                      width: "100%",
                                      height: "300px",
                                    }}
                                    controls
                                    autoPlay
                                    loop
                                    ref={this.videoRef}
                                  >
                                    <source src={product.video} />
                                  </video>
                                ) : (
                                  <img
                                    className="p_details_slider rounded"
                                    src={image}
                                  />
                                )}
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <Swiper
                            spaceBetween={10}
                            // loop={true}
                            slidesPerView={4}
                            navigation={true}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                            onSwiper={this.setThumbsSwiper}
                          >
                            {product.video != "" ? (
                              <SwiperSlide className="slider-thumbnail border rounded">
                                <img
                                  className="thumnail-slider rounded"
                                  src={videoThumb}
                                  onClick={() => this.playVideo()}
                                />
                              </SwiperSlide>
                            ) : null}
                            {product.images.map((item, key) => (
                              <SwiperSlide
                                className="slider-thumbnail border rounded"
                                key={key}
                              >
                                <img
                                  className="thumnail-slider rounded"
                                  src={item}
                                  onClick={() => this.changeSliderImage(key)}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <span className="share-icon">
                            {product.has_wishlist ? (
                              <BsHeartFill
                                onClick={this.handleWishlist}
                                className={"wishlist_active"}
                              />
                            ) : (
                              <BsHeart onClick={this.handleWishlist} />
                            )}
                          </span>
                          <span className="wish-icon">
                            <RWebShare
                              data={{
                                text: "",
                                url: window.location.href,
                                title: product.name,
                              }}
                            >
                              <BiShareAlt />
                            </RWebShare>
                          </span>
                        </div>

                        <div className="righ-side-wrapper">
                          <div className="p-container-header">
                            <span>
                              <div className="p-name-wrapper">
                                <h3>{product.name}</h3>

                                <div className="p-header-price">
                                  {sizeMaterial.discount_percent > 0 ? (
                                    <h6>
                                      {" "}
                                      <span>
                                        {displayAmount(sizeMaterial.mrp_price)}{" "}
                                      </span>
                                      {sizeMaterial.discount_percent > 0 ? (
                                        <sup className="discount text-danger">
                                          {" "}
                                          {sizeMaterial.discount_percent}% OFF{" "}
                                        </sup>
                                      ) : null}{" "}
                                    </h6>
                                  ) : null}
                                </div>
                              </div>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: product.description,
                                }}
                              ></div>
                              <div className="rating-wrapper">
                                <ul>
                                  {[...Array(5).keys()].map((x, i) => (
                                    <li
                                      className={
                                        product.rating < x + 1
                                          ? "blank-star"
                                          : ""
                                      }
                                      key={i}
                                    >
                                      {" "}
                                      <BsStarFill />
                                    </li>
                                  ))}
                                  <li className="rating">
                                    {" "}
                                    {product.rating.toFixed(2)}
                                  </li>
                                </ul>
                                <div className="p-header-price">
                                  <h2 className="fw-bold">
                                    {displayAmount(sizeMaterial.sale_price)}
                                  </h2>
                                </div>
                              </div>
                            </span>
                            {/*<span className='share-icons'>
                                                                    <span>
                                                                        {
                                                                            product.has_wishlist ?
                                                                                <BsHeartFill onClick={this.handleWishlist} className={'wishlist_active'} />
                                                                                :
                                                                                <BsHeart onClick={this.handleWishlist} />

                                                                        }
                                                                    </span>
                                                                    <span style={{ marginLeft: '20px' }}>
                                                                        <RWebShare
                                                                            data={{
                                                                                text: "",
                                                                                url: window.location.href,
                                                                                title: product.name,
                                                                            }}
                                                                        >
                                                                            <BiShareAlt />
                                                                        </RWebShare>
                                                                    </span>
                                                                        </span> */}
                          </div>

                          <div className="price-breakup mt-3 rounded bg-light shadow">
                            <h2>Price Breakup</h2>
                            <div className="underline"></div>
                            <div className="breakup-content">
                              {sizeMaterial.materials.map((item, key) => (
                                <div className="breakup-item" key={key}>
                                  <span>
                                    {item.material_name} &nbsp;&nbsp;&nbsp;{" "}
                                    {/* {item.discount_percent > 0
                                      ? item.discount_percent + "% OFF"
                                      : ""} */}
                                  </span>{" "}
                                  <span>
                                    {item.mrp_price > item.price ? (
                                      <span className="line-through">
                                        {displayAmount(item.mrp_price)}
                                      </span>
                                    ) : null}
                                    {displayAmount(item.price)}
                                  </span>
                                </div>
                              ))}

                              <div className="breakup-item">
                                <span>
                                  Making Charge{" "}
                                  {sizeMaterial.making_charge_dis_percent > 0
                                    ? sizeMaterial.making_charge_dis_percent +
                                      "% OFF"
                                    : ""}
                                </span>{" "}
                                <span>
                                  {sizeMaterial.making_charge_mrp >
                                  sizeMaterial.making_charge ? (
                                    <span className="line-through">
                                      {displayAmount(
                                        sizeMaterial.making_charge_mrp
                                      )}
                                    </span>
                                  ) : null}
                                  {displayAmount(sizeMaterial.making_charge)}
                                </span>
                              </div>
                              <div className="breakup-item">
                                <span>GST</span>
                                <span>
                                  {displayAmount(sizeMaterial.total_gst)}
                                </span>
                              </div>
                              <hr style={{ margin: "8px 0" }} />
                              <div className="breakup-item">
                                <span className="total">Total </span>{" "}
                                <span className="total">
                                  {displayAmount(
                                    sizeMaterial.sale_price * cartWeight
                                  )}{" "}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-customize-design mb-4">
                            <Accordion defaultActiveKey="0" alwaysOpen>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                  Customize Your Product
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="p-size">
                                    {product.type != "material" ? (
                                      <span>
                                        Select Size
                                        <Form.Select
                                          onChange={(e) =>
                                            this.handleSizeChange(
                                              e.target.value
                                            )
                                          }
                                        >
                                          {product.size_materials.map(
                                            (item, index) => (
                                              <option value={index} key={index}>
                                                {item.size_name}
                                              </option>
                                            )
                                          )}
                                        </Form.Select>
                                      </span>
                                    ) : null}
                                    {sizeMaterial.materials.map((item, key) => (
                                      <span className="gold-type" key={key}>
                                        {sizeMaterial.materials.length > 1
                                          ? item.material_name
                                          : "Purity"}
                                        <Form.Select
                                          onChange={(e) =>
                                            this.handlePurityChange(
                                              item.material_id,
                                              e.target.value
                                            )
                                          }
                                          value={this.getSelectedVal(
                                            item.purities
                                          )}
                                        >
                                          {item.purities.map((val, i) => (
                                            <option value={val.id} key={i}>
                                              {val.name}
                                            </option>
                                          ))}
                                        </Form.Select>
                                      </span>
                                    ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                          {!product.certified && product.type == "material" ? (
                            <div>
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Weight</Form.Label>
                                    <InputGroup
                                      className={
                                        this.state.weight_err
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    >
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter weight"
                                        value={this.state.weight}
                                        onChange={this.handleWeight}
                                      />
                                      <InputGroup.Text>
                                        {sizeMaterial.materials[0].unit_name}
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">
                                      {this.state.weight_err}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter quantity"
                                      value={this.state.qty}
                                      onChange={this.handleQty}
                                      className={
                                        this.state.qty_err
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {this.state.qty_err}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </div>
                          ) : null}
                          {/*<div className='p-item-delivery'>
                                                                <h4> Check Delivery</h4>
                                                                <Form.Control
                                                                    placeholder="Enter PIN Code"
                                                                    aria-label="Username"
                                                                    aria-describedby="basic-addon1"
                                                                />
                                                                <Button variant="primary">Check</Button>
                                                            </div>
                                                            <div className='delivery-date'>
                                                                <p>Usually Delivered in 7 days</p>
                                                        </div>*/}
                        </div>

                        <div className="product-details-items mt-2 rounded">
                          <Accordion alwaysOpen>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                <div className="header">
                                  <h2 style={{ marginBottom: "0px" }}>
                                    Product Details
                                  </h2>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="product-details-items-content">
                                  <div className="product-details-items-item">
                                    <span>Product Code</span>{" "}
                                    <span>{product.product_code}</span>
                                  </div>
                                  <div className="product-details-items-item">
                                    <span>Product Weight</span>{" "}
                                    <span>
                                      {sizeMaterial.product_weight_display}
                                    </span>
                                  </div>
                                  {sizeMaterial.materials.map((item, key) => (
                                    <React.Fragment key={key}>
                                      <div className="product-details-items-item details-header">
                                        <span>
                                          {item.material_name.toUpperCase()}{" "}
                                          DETAILS
                                        </span>
                                      </div>
                                      <div className="product-details-items-item">
                                        <span>Total Weight</span>{" "}
                                        <span>
                                          {item.weight} {item.unit_name}
                                        </span>
                                      </div>
                                      {!isEmpty(item.quantity) &&
                                      parseInt(item.quantity) > 0 ? (
                                        <div className="product-details-items-item">
                                          <span>
                                            Total No of{" "}
                                            {item.material_name.toUpperCase()}
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
                        <div className="product-buttons">
                          <Button
                            variant="danger"
                            onClick={this.handleAddToCart}
                            className="rounded"
                          >
                            <i class="bi bi-cart-plus me-3"></i> ADD TO CART
                          </Button>
                          <Button variant="primary" className="rounded">
                            ORDER NOW
                          </Button>
                        </div>
                      </Col>
                      <Col xs={12} md={7} className="rounded bg-light p-4">
                        <div className="product-details-container">
                          <div className="p-authenticity p-4 mt-3 p-details-authenticity rounded">
                            {product.certificates.length ? (
                              <>
                                <h4 className="text-center">
                                  CERTIFICATE OF AUTHENTICITY
                                </h4>
                                <ul className="authenticity_list">
                                  {product.certificates.map((item, k) => (
                                    <a
                                      href={item.website}
                                      target="_blank"
                                      key={k}
                                    >
                                      <li>
                                        <img src={item.logo} alt="" />
                                      </li>
                                    </a>
                                  ))}
                                </ul>
                              </>
                            ) : null}
                            <ul className="cart-authenticity">
                              <li>
                                {" "}
                                <img src={refund} alt="" /> 100% Certified{" "}
                              </li>
                              <li>
                                {" "}
                                <img src={shipping} alt="" /> Free Delivery{" "}
                              </li>
                              <li>
                                {" "}
                                <img src={jewelleryHome} alt="" /> Genuine Price{" "}
                              </li>
                            </ul>

                            {/*<h4 className='text-center'>CERTIFICATE OF AUTHENTICITY</h4>
                                                            <p className='mt-2 m-0 text-center'>Every piece of jewellery that we make is certified for authenticity by third-party international laboratories like SGL, IGI, BIS, GIA, and HKD.</p>
                                                            <div className='p-certified p-2 text-center'>
                                                                <span>CERTIFIED BY </span> 
                                                                <ul className='certified_images'>
                                                                    {
                                                                        product.certificates.map((item, c_k) => (
                                                                            <li key={c_k}>
                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={<Tooltip>{item.name}</Tooltip>}
                                                                                >
                                                                                    <a href={item.website} target="_blank"><img src={item.logo} alt='' height="24px" width="24px" /></a>
                                                                                </OverlayTrigger>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                                
                                                                </div>*/}
                          </div>

                          {/*<div className='p-policy mt-2 p-2 mb-2'>
                                                                <ul>
                                                                <li> <img src={refund} alt='' /> 100% Certified </li>
                                                                <li> <img src={exchange} alt='' /> 7 Days Money Back </li>
                                                                <li> <img src={shipping} alt='' /> Free Delivery </li>
                                                                <li> <img src={jewelleryHome} alt='' /> Genuine Price </li>
                                                                </ul>

                                                                <div className='p-certified p-2 text-center'>
                                                                <span>CERTIFIED BY </span> 
                                                                    <ul className='certified_images'>
                                                                    {
                                                                        product.certificates.map((item, c_k) => (
                                                                            <li key={c_k}>
                                                                                <OverlayTrigger
                                                                                    placement="bottom"
                                                                                    overlay={<Tooltip>{item.name}</Tooltip>}
                                                                                >
                                                                                    <a href={item.website} target="_blank"><img src={item.logo} alt='' height="24px" width="24px" /></a>
                                                                                </OverlayTrigger>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                    </ul>
                                                                </div>

                                                                </div>*/}
                          <a href="tel:+91 98744 45878">
                            {" "}
                            <p className="mt-2 m-0 text-center reach-us">
                              Any Questions? Please feel free to reach us at:{" "}
                              <span> +91 98744 45878 </span>
                            </p>{" "}
                          </a>
                          {/*<div className='similar-product-slider'>
                                                                <h4>You may also like</h4>
                                                                <Swiper
                                                                    slidesPerView={1}
                                                                    spaceBetween={20}
                                                                    onSlideChange={() => console.log('slide change')}
                                                                    onSwiper={(swiper) => console.log(swiper)}
                                                                >
                                                                    <SwiperSlide className='similar-slider-inner'>
                                                                        <div className='s-slider-image'>
                                                                            <img src={sImage} alt='selling product' />

                                                                        </div>
                                                                        <div className='s-slider-content'>
                                                                            <div className='similar-slider-header'>
                                                                                <h2>Gold Plated Ring</h2>
                                                                                <div className='wishlist'>
                                                                                    <BiHeart />
                                                                                </div>
                                                                            </div>
                                                                            <div className='like-wrapper'>
                                                                                <div className="p-header-price"><h3>₹ 11,199</h3></div>
                                                                                <div className="p-headder-offer-price"><span> <h2>₹ 9,999 <sup>20%</sup></h2></span><span className=""> </span></div>
                                                                            </div>
                                                                            <span className='rating-wrapper'>
                                                                                <ul>
                                                                                    <li> <BsStarFill /></li>
                                                                                    <li> <BsStarFill /></li>
                                                                                    <li> <BsStarFill /></li>
                                                                                    <li> <BsStarFill /></li>
                                                                                    <li className='blank-star'> <BsStarFill /></li>
                                                                                    <li className='rating'> 4.5</li>
                                                                                </ul>

                                                                            </span>
                                                                        </div>
                                                                    </SwiperSlide>


                                                                </Swiper>
                                                            </div>*/}
                          <div className="gap-70"></div>
                        </div>
                      </Col>

                      {review_data ? (
                        <Col xs={12} md={7}>
                          {review_data.total > 0 ? (
                            <div className="rating_sec bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                              <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                              <div className="graph-star-rating-header">
                                <div className="star-rating">
                                  {" "}
                                  <a href="#">
                                    <i className="icofont-ui-rating active"></i>
                                  </a>{" "}
                                  <a href="#">
                                    <i className="icofont-ui-rating active"></i>
                                  </a>{" "}
                                  <a href="#">
                                    <i className="icofont-ui-rating active"></i>
                                  </a>{" "}
                                  <a href="#">
                                    <i className="icofont-ui-rating active"></i>
                                  </a>{" "}
                                  <a href="#">
                                    <i className="icofont-ui-rating"></i>
                                  </a>{" "}
                                  <b className="text-black ml-2">
                                    {review_data.total}
                                  </b>
                                </div>
                                <p className="text-black mb-4 mt-2">
                                  Rated {product.rating} out of 5
                                </p>
                              </div>
                              <div className="graph-star-rating-body">
                                <div className="rating-list">
                                  <div className="rating-list-left text-black">
                                    {" "}
                                    5 Star
                                  </div>
                                  <div className="rating-list-center">
                                    <div className="progress">
                                      <div
                                        style={{
                                          width: `${review_data.total_5}%`,
                                        }}
                                        aria-valuemax="5"
                                        aria-valuemin="0"
                                        aria-valuenow="5"
                                        role="progressbar"
                                        className="progress-bar bg-primary"
                                      >
                                        {" "}
                                        <span className="sr-only"></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rating-list-right text-black">
                                    {review_data.total_5}%
                                  </div>
                                </div>
                                <div className="rating-list">
                                  <div className="rating-list-left text-black">
                                    {" "}
                                    4 Star
                                  </div>
                                  <div className="rating-list-center">
                                    <div className="progress">
                                      <div
                                        style={{
                                          width: `${review_data.total_4}%`,
                                        }}
                                        aria-valuemax="5"
                                        aria-valuemin="0"
                                        aria-valuenow="5"
                                        role="progressbar"
                                        className="progress-bar bg-primary"
                                      >
                                        {" "}
                                        <span className="sr-only"></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rating-list-right text-black">
                                    {review_data.total_4}%
                                  </div>
                                </div>
                                <div className="rating-list">
                                  <div className="rating-list-left text-black">
                                    {" "}
                                    3 Star
                                  </div>
                                  <div className="rating-list-center">
                                    <div className="progress">
                                      <div
                                        style={{
                                          width: `${review_data.total_3}%`,
                                        }}
                                        aria-valuemax="5"
                                        aria-valuemin="0"
                                        aria-valuenow="5"
                                        role="progressbar"
                                        className="progress-bar bg-primary"
                                      >
                                        {" "}
                                        <span className="sr-only"></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rating-list-right text-black">
                                    {review_data.total_3}%
                                  </div>
                                </div>
                                <div className="rating-list">
                                  <div className="rating-list-left text-black">
                                    {" "}
                                    2 Star
                                  </div>
                                  <div className="rating-list-center">
                                    <div className="progress">
                                      <div
                                        style={{
                                          width: `${review_data.total_2}%`,
                                        }}
                                        aria-valuemax="5"
                                        aria-valuemin="0"
                                        aria-valuenow="5"
                                        role="progressbar"
                                        className="progress-bar bg-primary"
                                      >
                                        {" "}
                                        <span className="sr-only"></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rating-list-right text-black">
                                    {review_data.total_5}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <div className="rating_sec bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                            <h5 className="mb-1">
                              {review_data.total > 0
                                ? "All Ratings and Reviews"
                                : "This is newly launched product, currently we do not have any rating for this."}
                            </h5>
                            {review_data.items.map((item, index) => (
                              <React.Fragment key={index}>
                                <div className="reviews-members pt-4 pb-4">
                                  <div className="media">
                                    {" "}
                                    <a href="#">
                                      <img
                                        src={item.user_image}
                                        className="mr-3 rounded-pill"
                                      />
                                    </a>
                                    <div className="media-body">
                                      <div className="reviews-members-header">
                                        {" "}
                                        <span className="star-rating float-right">
                                          {" "}
                                          <a href="#">
                                            <i className="icofont-ui-rating active"></i>
                                          </a>{" "}
                                          <a href="#">
                                            <i className="icofont-ui-rating active"></i>
                                          </a>{" "}
                                          <a href="#">
                                            <i className="icofont-ui-rating active"></i>
                                          </a>{" "}
                                          <a href="#">
                                            <i className="icofont-ui-rating active"></i>
                                          </a>{" "}
                                          <a href="#">
                                            <i className="icofont-ui-rating"></i>
                                          </a>{" "}
                                        </span>
                                        <h6 className="mb-1">
                                          <a className="text-black" href="#">
                                            {item.user_name}
                                          </a>
                                        </h6>
                                        <p className="text-gray">
                                          {item.created_at}
                                        </p>
                                      </div>
                                      <div className="reviews-members-body">
                                        <p>{item.review}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {index + 1 < review_data.items.length ? (
                                  <hr />
                                ) : null}
                              </React.Fragment>
                            ))}
                            <div className="text-center w-100 d-block mt-4 font-weight-bold">
                              <ReactPaginate
                                nextLabel=">"
                                onPageChange={this.handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                              />
                            </div>
                          </div>
                        </Col>
                      ) : null}
                    </Row>
                  </Container>
                  {/* <div className='product-float-buttons'>
                                                <BiHeart />
                                                <Button variant="success">ADD TO CART</Button>
                                                <Button variant="secondary">ORDER NOW</Button>

                                                        </div>*/}
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
  //product: state.customer.product.product,
  //processing: state.customer.product.processing,
  auth: state.auth,
  wl_actionCalled: state.customer.wishlist.actionCalled,
  wl_createSuccess: state.customer.wishlist.createSuccess,
  wl_successMessage: state.customer.wishlist.successMessage,

  c_actionCalled: state.customer.cart.actionCalled,
  c_createSuccess: state.customer.cart.createSuccess,
  c_successMessage: state.customer.cart.successMessage,
  c_errorMessage: state.customer.cart.c_errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({ productFetch, AddToCart, CartList }, dispatch),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import cartImage from "src/assets/images/cartImage.png";
import { MdOutlineDelete } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { HiArrowNarrowLeft } from "react-icons/hi";
import cert from "src/assets/images/cert-1.png";
import cert2 from "src/assets/images/cert-2.png";
import cert3 from "src/assets/images/cert-3.png";
import cert4 from "src/assets/images/cert-4.png";
import cert5 from "src/assets/images/cert-5.png";
import au1 from "src/assets/images/au-1.png";
import au2 from "src/assets/images/au-2.png";
import au3 from "src/assets/images/au-3.png";
import au4 from "src/assets/images/au-4.png";
import au5 from "src/assets/images/au-5.png";
import { useNavigate } from "react-router";
import jewelleryHome from "src/assets/images/jewelleryHome.png";
import refund from "src/assets/images/refund.png";
import exchange from "src/assets/images/exchange.png";
import shipping from "src/assets/images/shipping.png";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  CartList,
  CartDelete,
  CartUpdate,
  CartUpdateSizeMaterial,
  CartApplyPromocode,
} from "actions/Customer/addcart.actions";
import { checkoutList } from "actions/Customer/checkout.actions";
import { ToastContainer, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader";
import { RESET_ADDCART } from "actionTypes/Customer/addcart.types";
import _ from "lodash";
import {
  isEmpty,
  priceFormat,
  displayAmount,
  convertUnitToGram,
  weightFormat,
  isSalesExecutive,
  isRetailer,
  setLastVisitPage,
} from "src/helpers/helper";
import { promocodeList } from "actions/Customer/home.actions";
import { WishListAdd } from "actions/Customer/wishlist.actions";
import { UPDATE_WISHLIST_COUNT } from "actionTypes/Customer/wishlist.type";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      item_total_display: this.props.item_total_display,
      total_payable_display: this.props.total_payable_display,
      promocode: this.props.promocode,
      promocode_discount: this.props.promocode_discount,
      promocode_discount_display: this.props.promocode_discount_display,
      removeDialog: false,
      removingItem: null,
      actionCalled: this.props.actionCalled,
      deleteSuccess: this.props.deleteSuccess,
      successMessage: this.props.successMessage,
      errorMessage: this.props.errorMessage,
      hold_size: {},
      loading: false,
      code: "",
      code_err: "",
      showPromocode: true,
      offerDialog: false,
      promocodes: [],
      weight_errrs: {},
      qty_errrs: {},
      isLoggedIn: this.props.isLoggedIn,
    };
    this.isSalesExecutive = isSalesExecutive();
    this.isRetailer = isRetailer();
  }

  componentDidMount() {
    this.loadPromocodes();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }
    if (props.item_total_display !== state.item_total_display) {
      update.item_total_display = props.item_total_display;
    }
    if (props.total_payable_display !== state.total_payable_display) {
      update.total_payable_display = props.total_payable_display;
    }
    if (props.promocode !== state.promocode) {
      update.promocode = props.promocode;
    }
    if (props.promocode_discount !== state.promocode_discount) {
      update.promocode_discount = props.promocode_discount;
    }
    if (props.promocode_discount_display !== state.promocode_discount_display) {
      update.promocode_discount_display = props.promocode_discount_display;
    }
    if (props.actionCalled !== state.actionCalled) {
      update.actionCalled = props.actionCalled;
    }
    if (props.deleteSuccess !== state.deleteSuccess) {
      update.deleteSuccess = props.deleteSuccess;
    }
    if (props.successMessage !== state.successMessage) {
      update.successMessage = props.successMessage;
    }
    if (props.errorMessage !== state.errorMessage) {
      update.errorMessage = props.errorMessage;
    }
    if (props.isLoggedIn !== state.isLoggedIn) {
      update.isLoggedIn = props.isLoggedIn;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.state.actionCalled) {
      if (this.state.successMessage) {
        toast.success(this.state.successMessage);
        this.setState({
          removeDialog: false,
          loading: false,
          code: "",
          showPromocode: false,
          offerDialog: false,
        });
        this.props.dispatch({
          type: RESET_ADDCART,
        });
        this.props.actions.CartList();
      } else if (this.state.errorMessage) {
        this.setState({
          loading: false,
        });
        toast.error(this.state.errorMessage);
        this.props.dispatch({
          type: RESET_ADDCART,
        });
      }
    }
  }

  removeConfirm = (item) => {
    this.setState({
      removeDialog: true,
      removingItem: item,
    });
  };

  handleRemoveDialogClose = () => {
    this.setState({
      removeDialog: false,
    });
  };

  handleCartRemove = () => {
    this.setState({
      loading: true,
    });
    this.props.actions.CartDelete(this.state.removingItem.id);
  };

  handlePlaceOrder = () => {
    this.props.navigate("/checkout");
  };

  handleQtyChange = (cartId, qty) => {
    this.setState({
      loading: true,
    });
    this.props.actions.CartUpdate(cartId, { quantity: qty });
  };

  handleSizeChange = (item, sizeId) => {
    let sizeMaterial = _.filter(item.size_materials, function (s) {
      return s.size_id == sizeId;
    });
    sizeMaterial = sizeMaterial[0];
    let data = null;
    for (let i = 0; i < item.cart_material.length; i++) {
      let material = _.filter(sizeMaterial.materials, function (s) {
        return s.material_id == item.cart_material[i].material_id;
      });
      material = material[0];
      let purity = _.filter(material.purities, function (s) {
        return s.id == item.cart_material[i].purity_id;
      });
      if (purity.length > 0) {
        let total_weight = 0;
        let materials = [];
        for (let i = 0; i < sizeMaterial.materials.length; i++) {
          let thisM = sizeMaterial.materials[i];
          let cartMaterial = _.filter(item.cart_material, function (s) {
            return s.material_id == thisM.material_id;
          });
          let m = _.filter(thisM.purities, function (s) {
            return s.id == cartMaterial[0].purity_id;
          });
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
        data = {
          total_weight: total_weight,
          size_id: sizeMaterial.size_id,
          materials: materials,
        };
      }
    }

    if (data) {
      this.setState({
        loading: true,
      });
      this.props.actions.CartUpdateSizeMaterial(item.id, data);
    }
  };

  handlPurityChange = (cartId, materialId, purityId) => {
    this.setState({
      loading: true,
    });
    this.props.actions.CartUpdateSizeMaterial(cartId, {
      material_id: materialId,
      purity_id: purityId,
    });
  };

  updateCartMaterials = (sizeMaterial) => {
    let total_weight = 0;
    let materials = [];

    for (let i = 0; i < sizeMaterial.length; i++) {
      let thisM = selected_materials[i];
      let m = _.filter(thisM.purities, { is_selected: true });

      let total_gram = convertUnitToGram(thisM.unit_name, thisM.weight);
      total_gram = weightFormat(total_gram); //(product.type == 'material') ? weightFormat(total_gram / parseInt(thisM.quantity)) : weightFormat(total_gram);
      total_weight += parseFloat(total_gram);

      materials.push({
        material_id: thisM.material_id,
        purity_id: m[0].id,
        weight: thisM.weight,
        unit_id: thisM.unit_id,
        quantity: thisM.quantity,
      });
    }
  };

  getSizeMaterial = (item) => {
    if (item.product_type == "material") {
      return item.size_materials[0];
    } else {
      let sizeMaterial = _.filter(item.size_materials, function (s) {
        return s.size_id == item.size_id;
      });
      return sizeMaterial[0];
    }
  };

  getSelectedPurity = (item, materialId) => {
    let cartMaterial = _.filter(item.cart_material, function (s) {
      return s.material_id == materialId;
    });
    let val = cartMaterial.length > 0 ? cartMaterial[0].purity_id : "";
    return val;
  };

  applyPromocode = () => {
    if (isEmpty(this.state.code)) {
      this.setState({
        code_err: "Required",
      });
    } else {
      this.setState({
        code_err: "",
        loading: true,
      });
      this.props.actions.CartApplyPromocode({ promocode: this.state.code });
    }
  };

  handleOfferClose = () => {
    this.setState({
      offerDialog: false,
    });
  };

  loadPromocodes = async () => {
    let res = await promocodeList();
    if (res.data.success) {
      this.setState({
        promocodes: res.data.data.items,
      });
    }
  };

  handleCodeApply = (item) => {
    this.props.actions.CartApplyPromocode({ promocode: item.code });
  };

  handleMoveToWishlist = async (cart) => {
    if (!this.state.isLoggedIn) {
      setLastVisitPage();
      this.props.navigate("/login");
      return;
    }
    let total_weight = 0;
    let materials = [];
    for (let i = 0; i < cart.cart_material.length; i++) {
      let thisM = cart.cart_material[i];
      let total_gram = thisM.weight_in_gram;
      total_weight += parseFloat(total_gram);
      materials.push({
        material_id: thisM.material_id,
        purity_id: thisM.purity_id,
        weight: thisM.weight,
        unit_id: thisM.unit_id,
        quantity: thisM.quantity,
      });
    }

    let data = {
      product_id: cart.product_id,
      stock_id: null,
      total_weight: total_weight,
      size_id: cart.product_type != "material" ? cart.size_id : null,
      type: cart.product_type,
      materials: materials,
      from_cart: 1,
    };

    let res = await WishListAdd(data);
    if (res.data.success) {
      this.props.dispatch({
        type: UPDATE_WISHLIST_COUNT,
        payload: res.data.data.total,
      });
      this.props.actions.CartDelete(cart.id);
    }
  };

  handleWeight = (e, index) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || e.target.value.match(/^\d{1,}(\.\d{0,3})?$/)) {
      let items = this.state.items;
      items[index].manual_weight = e.target.value;
      this.setState({ items: items });
    }
  };

  handleQty = (e, index) => {
    const re = /^[0-9\b]+$/;
    let value = e.target.value;
    if (value === "" || re.test(value)) {
      /*if (value != "") {
                let max = 100;
                value = Math.max(Number(0), Math.min(Number(max), Number(value)));
            }*/
      let items = this.state.items;
      items[index].manual_qty = value;
      this.setState({ items: items });
    }
  };

  handleManulUpdate = (index) => {
    let items = this.state.items;
    let weight_errrs = this.state.weight_errrs;
    let qty_errrs = this.state.qty_errrs;
    let w_k = "weight_err_" + index;
    let q_k = "qty_err_" + index;
    let hasErr = false;
    if (parseFloat(items[index].manual_weight) > 0) {
      delete weight_errrs[w_k];
    } else {
      weight_errrs[w_k] = "Required.";
      hasErr = true;
    }
    if (parseInt(items[index].manual_qty) > 0) {
      delete qty_errrs[q_k];
    } else {
      qty_errrs[q_k] = "Required.";
      hasErr = true;
    }
    this.setState({
      weight_errrs: weight_errrs,
      qty_errrs: qty_errrs,
    });
    if (!hasErr) {
      this.setState({
        loading: true,
      });
      this.props.actions.CartUpdate(items[index].id, {
        weight: items[index].manual_weight,
        quantity: items[index].manual_qty,
        unit_name: items[index].cart_material[0].unit_name,
      });
    }
  };

  getManualErr = (index, type) => {
    let weight_errrs = this.state.weight_errrs;
    let qty_errrs = this.state.qty_errrs;
    let w_k = "weight_err_" + index;
    let q_k = "qty_err_" + index;
    if (type == "weight" && w_k in weight_errrs) {
      return weight_errrs[w_k];
    } else if (type == "qty" && q_k in qty_errrs) {
      return qty_errrs[q_k];
    }
    return "";
  };

  render() {
    const cartList = this.state.items;
    return (
      <>
        <LoadingOverlay active={this.state.loading} spinner text="">
          <div>
            <Modal
              className="delete-popup"
              show={this.state.removeDialog}
              onHide={this.handleRemoveDialogClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Remove From Cart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you want to remove this product from cart ?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="close-btn"
                  onClick={this.handleRemoveDialogClose}
                >
                  No
                </Button>
                <Button
                  variant="danger"
                  className="delete-btn"
                  onClick={this.handleCartRemove}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="cart-wrapper desktop-cart">
              <Container>
                {/*<Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>*/}
                <h3>My Shopping Cart</h3>
                <Row>
                  <Col xs={12} md={7} lg={8}>
                    {cartList.length > 0 ? (
                      cartList.map((val, index) => (
                        <React.Fragment key={index}>
                          <div>
                            <div
                              className="cart-inner-wrapper border mb-3 rounded shadow bg-light"
                              key={index}
                            >
                              <div className="cart-inner">
                                <div className="cart-image">
                                  <Link to={"/products/" + val.product_slug}>
                                                  <img
                                                      src={val.current_image == null ? val.product_image : val.current_image}
                                      className="rounded "
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="cart-image-content">
                                  <div>
                                    <div className="cart-price-title-wrapper">
                                      <div className="cart-image-title">
                                        <h2>
                                          <Link
                                            to={"/products/" + val.product_slug}
                                          >
                                            {val.product_name}
                                          </Link>
                                        </h2>
                                        <p>
                                          Product Code :{" "}
                                          <span>{val.product_code}</span>
                                        </p>
                                                      </div>
                                                      <div className="d-flex align-items-center">
                                                
                                      <div className="price-wrapper">
                                        <div className="cart-original-price">
                                          {val.have_offer ? (
                                            <span className="strikethrough">
                                              {
                                                val.total_price_without_dis_display
                                              }
                                            </span>
                                          ) : null}
                                        </div>
                                        <div className="cart-discount-price">
                                          <span className="price">
                                            {val.total_price_display}
                                          </span>
                                        </div>
                                                          </div>
                                                          <Col style={{ width: "150px" }} className="ms-3">
                                                              {val.product_type !=
                                                                  "material" ? (
                                                                      <Form.Group className="d-flex align-items-center">
                                                                          <Form.Label className="me-2">Size</Form.Label>
                                                                      <Form.Select
                                                                          value={val.size_id}
                                                                          className="rounded"
                                                                          onChange={(e) =>
                                                                              this.handleSizeChange(
                                                                                  val,
                                                                                  e.target.value
                                                                              )
                                                                          }
                                                                      >
                                                                          {val.size_materials.map(
                                                                              (i, k) => (
                                                                                  <option
                                                                                      value={i.size_id}
                                                                                      key={k}
                                                                                  >
                                                                                      {i.size_name}
                                                                                  </option>
                                                                              )
                                                                          )}
                                                                      </Form.Select>
                                                                  </Form.Group>
                                                              ) : null}
                                                          </Col>
                                                      </div>
                                      {/*<p className='making-charge'>(0% MAKING CHARGE)</p>*/}
                                    </div>
                                    <div className="purity-wrapper">
                                      <Form.Group>
                                        {this.getSizeMaterial(
                                          val
                                        ).materials.map((item, key) => (
                                          <Row key={key}>
                                            <Col>
                                              <Form.Label>
                                                {this.getSizeMaterial(val)
                                                  .materials.length > 1
                                                  ? item.material_name
                                                  : "Purity"}
                                                :
                                              </Form.Label>
                                                    <Form.Select 
                                                value={this.getSelectedPurity(
                                                  val,
                                                  item.material_id
                                                )}
                                                onChange={(e) =>
                                                  this.handlPurityChange(
                                                    val.id,
                                                    item.material_id,
                                                    e.target.value
                                                  )
                                                }
                                                className={
                                                  this.getSelectedPurity(
                                                    val,
                                                    item.material_id
                                                  ) == ""
                                                    ? "error_input"
                                                    : "" + "rounded"
                                                }
                                              >
                                                {this.getSelectedPurity(
                                                  val,
                                                  item.material_id
                                                ) == "" ? (
                                                  <option value=""></option>
                                                ) : null}
                                                {item.purities.map((i, k) => (
                                                  <option value={i.id} key={k}>
                                                    {i.name}
                                                    {/*{!val.is_manual ? <>, {item.weight} {item.unit_name}</> : null}*/}
                                                  </option>
                                                ))}
                                              </Form.Select>
                                            </Col>
                                            <Col>
                                              <Form.Group>
                                                <Form.Label>
                                                  Quantity:
                                                </Form.Label>
                                                <Form.Select
                                                  className="rounded"
                                                  value={val.quantity}
                                                  onChange={(e) =>
                                                    this.handleQtyChange(
                                                      val.id,
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  {[...Array(10).keys()].map(
                                                    (i, k) => (
                                                      <option
                                                        value={i + 1}
                                                        key={k}
                                                      >
                                                        {i + 1}
                                                      </option>
                                                    )
                                                  )}
                                                </Form.Select>
                                                {/*{val.quantity}*/}
                                              </Form.Group>
                                            </Col>
                                            
                                          </Row>
                                        ))}
                                                          
                                      </Form.Group>
                                    </div>
                                    {!val.is_manual ? (
                                      <Row
                                        style={{ alignItems: "center" }}
                                        className="justify-content-end mt-3"
                                      >
                                        <Col xs={6}>
                                          <div className="cart-icons justify-content-end">
                                            <Button
                                              variant="primary"
                                              className="rounded text-bg-danger"
                                              onClick={() =>
                                                this.removeConfirm(val)
                                              }
                                            >
                                              {" "}
                                              <i class="bi bi-trash3 me-2"></i>{" "}
                                              Remove
                                            </Button>
                                            <Button
                                              variant="primary"
                                              className="rounded border"
                                              onClick={() =>
                                                this.handleMoveToWishlist(val)
                                              }
                                            >
                                              {" "}
                                              Move To Wishlist
                                            </Button>
                                          </div>
                                          {/*<div className='cart-icons'>
                                                                            <h4 onClick={() => this.removeConfirm(val)}> Remove</h4>
                                                                            <h4 onClick={() => this.handleMoveToWishlist(val)} role="button">Move To Wishlist</h4>
                                                                        </div>*/}
                                        </Col>
                                      </Row>
                                    ) : null}

                                    {val.is_manual ? (
                                      <div>
                                        <Row>
                                          <Col xs={6}>
                                            <Form.Group className="mb-3">
                                              <Form.Label>Weight</Form.Label>
                                              <InputGroup
                                                className={
                                                  this.getManualErr(
                                                    index,
                                                    "weight"
                                                  )
                                                    ? "is-invalid error_input"
                                                    : ""
                                                }
                                              >
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Enter weight rounded-start"
                                                  value={val.manual_weight}
                                                  onChange={(e) =>
                                                    this.handleWeight(e, index)
                                                  }
                                                />
                                                <InputGroup.Text>
                                                  {
                                                    val.cart_material[0]
                                                      .unit_name
                                                  }
                                                </InputGroup.Text>
                                              </InputGroup>
                                              <Form.Control.Feedback type="invalid">
                                                {this.getManualErr(
                                                  index,
                                                  "weight"
                                                )}
                                              </Form.Control.Feedback>
                                            </Form.Group>
                                          </Col>
                                          <Col xs={6}>
                                            <Form.Group className="mb-3">
                                              <Form.Label>Quantity</Form.Label>
                                              <span className="qty-update">
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Enter quantity"
                                                  value={val.manual_qty}
                                                  onChange={(e) =>
                                                    this.handleQty(e, index)
                                                  }
                                                  className={
                                                    this.getManualErr(
                                                      index,
                                                      "qty rounded-end"
                                                    )
                                                      ? "is-invalid error_input"
                                                      : ""
                                                  }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                  {this.getManualErr(
                                                    index,
                                                    "qty"
                                                  )}
                                                </Form.Control.Feedback>
                                                <Form.Label>&nbsp;</Form.Label>
                                                <Button
                                                  variant="primary"
                                                  className="dark_button"
                                                  onClick={() =>
                                                    this.handleManulUpdate(
                                                      index
                                                    )
                                                  }
                                                >
                                                  Update
                                                </Button>
                                              </span>
                                            </Form.Group>
                                          </Col>
                                          <Col>
                                            <div className="cart-icons justify-content-end ">
                                              <Button
                                                variant="primary"
                                                className="rounded text-bg-danger"
                                                onClick={() =>
                                                  this.removeConfirm(val)
                                                }
                                              >
                                                {" "}
                                                Remove
                                              </Button>
                                              <Button
                                                variant="primary "
                                                className="rounded"
                                                onClick={() =>
                                                  this.handleMoveToWishlist(val)
                                                }
                                              >
                                                {" "}
                                                Move To Wishlist
                                              </Button>
                                            </div>
                                          </Col>
                                        </Row>
                                      </div>
                                    ) : null}

                                    {/*{
                                                                        val.cart_material.map((item, key) => (
                                                                            <p className='mb-1' key={key}>{item.material}: <span>{item.quantity > 0 ? (item.quantity + ' ' + item.material + ', ') : ''} {item.purity_name}, {item.weight} {item.unit_name}</span></p>
                                                                        ))
                                                                    }*/}
                                  </div>
                                </div>
                              </div>

                              {/*{
                                                            index == (cartList.length - 1) ?
                                                                <div className='cart-notes mt-4' style={{ width: "100%", bottom: "300px" }}>
                                                                    <ul>
                                                                        <li><HiCheckCircle /> 30 Day Money Back</li>
                                                                        <li><HiCheckCircle /> Eligible for Lifetime exchange & Buy back</li>
                                                                        <li><HiCheckCircle /> FREE & Insured Delivery</li>
                                                                    </ul>
                                                                </div>
                                                                : null
                                                        }*/}
                            </div>
                          </div>
                        </React.Fragment>
                      ))
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h5>Cart is empty !</h5>
                      </div>
                    )}
                  </Col>
                  {/* {cartItem?.length > 0 &&
                            checkout?.map((item,index)=>( */}
                  <Col xs={12} md={5} lg={4} className="rounded">
                    <div className="cart-right-sidebar rounded bg-light">
                      <div className="order-summary-header">
                        <h4>ORDER SUMMARY</h4>
                      </div>
                      <div className="summary-items">
                        <p>
                          Total ( <span>{cartList.length} </span> Items )
                        </p>
                        <p>{this.state.item_total_display}</p>
                      </div>
                      {!isEmpty(this.state.promocode) ? (
                        <div className="summary-items">
                          <p>
                            Voucher code ( <span>{this.state.promocode} </span>{" "}
                            )
                          </p>
                          <p>{this.state.promocode_discount_display}</p>
                        </div>
                      ) : null}
                      <div className="summary-t-payable">
                        <p>
                          <strong>Total Payable </strong>
                        </p>
                        <p>
                          <strong>{this.state.total_payable_display}</strong>
                        </p>
                      </div>
                      {/*<div className='summary-save'>
                                            <p className='orange'>You Save <span>₹899 </span></p>
                                        </div>*/}
                      {/*<div className='gift-card'>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="Gift Message (Optional)"
                                                    aria-label="Gift Message (Optional)"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <InputGroup.Text id="basic-addon2"> <MdOutlineCardGiftcard /> ADD
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </div>*/}
                      {cartList.length ? (
                        <>
                          <div className="place-order-button my-2">
                            <Button
                              variant="primary"
                              className="rounded"
                              onClick={this.handlePlaceOrder}
                            >
                              CHECKOUT
                            </Button>
                            {!this.isRetailer && !this.isSalesExecutive ? (
                              <>
                                <div className="voucher-wrapper">
                                  <p
                                    className=""
                                    onClick={() =>
                                      this.setState({
                                        showPromocode:
                                          !this.state.showPromocode,
                                      })
                                    }
                                    role="button"
                                  >
                                    I have a voucher code/ gift card
                                  </p>
                                  <p
                                    className="show-offer"
                                    onClick={() =>
                                      this.setState({ offerDialog: true })
                                    }
                                  >
                                    {" "}
                                    View Offers{" "}
                                  </p>
                                </div>
                              </>
                            ) : null}
                          </div>
                          {this.state.showPromocode ? (
                            <div className="promo-code">
                              <InputGroup
                                className={
                                  "mb-0" +
                                  (this.state.code_err ? " error_input" : "")
                                }
                              >
                                <Form.Control
                                  placeholder="Enter Promo Code"
                                  value={this.state.code}
                                  onChange={(e) =>
                                    this.setState({ code: e.target.value })
                                  }
                                />
                                <InputGroup.Text
                                  onClick={this.applyPromocode}
                                  role="button"
                                >
                                  APPLY
                                </InputGroup.Text>
                              </InputGroup>
                              {/*<div className='view-offer' onClick={() => this.setState({ offerDialog: true })}>
                                                                        <button variant='primary'> View Offer </button>
                                                        </div>*/}
                            </div>
                          ) : null}

                          {/*<div className='p-policy mt-3 p-1 mb-3'>
                                                                <ul>
                                                                    <li> <img src={refund} alt='' /> 100% Certified </li>
                                                                    <li> <img src={exchange} alt='' /> 7 Days Money Back </li>
                                                                    <li> <img src={shipping} alt='' /> Free Delivery </li>
                                                                    <li> <img src={jewelleryHome} alt='' /> Genuine Price </li>
                                                                </ul>

                                                    </div>*/}

                          <div className="p-authenticity p-2 mt-3 rounded">
                            <h4 className="text-center">
                              CERTIFICATE OF AUTHENTICITY
                            </h4>
                            <ul className="authenticity_list m-3 justify-content-between">
                              <li className="rounded">
                                <img src={au1} alt="" />
                              </li>
                              <li className="rounded">
                                <img src={au2} alt="" />
                              </li>
                              <li className="rounded">
                                <img src={au3} alt="" />
                              </li>
                              <li className="rounded">
                                <img src={au4} alt="" />
                              </li>
                              {/* <li className="rounded">
                                <img src={au5} alt="" />
                              </li> */}
                            </ul>
                            <ul className="cart-authenticity justify-content-center">
                              <li>
                                {" "}
                                <img src={shipping} alt="" /> Free Delivery{" "}
                              </li>
                              <li>
                                {" "}
                                <img src={jewelleryHome} alt="" /> Genuine Price{" "}
                              </li>
                            </ul>
                            {/* <p className='mt-2 m-0 text-center'>Every piece of jewellery
                                                                 that we make is certified for authenticity by third-party 
                                                                 international laboratories like SGL, IGI, BIS, GIA, 
                                                    and HKD.</p>*/}
                            {/* <div className='p-certified p-2 text-center'>
                                                                <span>CERTIFIED BY </span> 
                                                                <ul className='certified_images'>
                                                                <li><a href=''><img src={cert} alt='' /></a></li>
                                                                <li><a href=''><img src={cert2} alt='' /></a></li>
                                                                <li><a href=''><img src={cert3} alt='' /></a></li>
                                                                <li><a href=''><img src={cert4} alt='' /></a></li>
                                                                <li><a href=''><img src={cert5} alt='' /></a></li>
                                                                </ul>
                                                </div>*/}
                          </div>
                          <p className="queries h7  px-4">
                            <span className="text-primary d-inline">
                              Any Questions?
                            </span>{" "}
                            Please call us at
                            <span className="text-primary d-inline">
                              {" "}
                              +91 98744 45878
                            </span>{" "}
                            or Chat with us
                          </p>
                        </>
                      ) : null}
                    </div>
                  </Col>
                  {/* ))
                        } */}
                </Row>
              </Container>
            </div>
            <div className="cart-wrapper mobile-cart">
              <Container>
                <h3>My Shopping Cart</h3>
                <Row>
                  {cartList.map((val, index) => (
                    <Col xs={12} md={9} key={index}>
                      <div className="cart-inner-wrapper rounded shadow-none border mb-3">
                        <div className="cart-inner">
                          <div className="cart-image">
                            <Link to={"/products/" + val.product_slug}>
                              <img src={val.product_image} alt="" className="rounded"/>
                            </Link>
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
                                    Product Code :{" "}
                                    <span>{val.product_code}</span>
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
                            <div></div>
                          </div>
                        </div>
                        {!val.is_manual ? (
                          <div className="cart-select mt-3 mb-2">
                            {val.product_type != "material" ? (
                              <Form.Group>
                                <Form.Label>Size:</Form.Label>
                                <Form.Select
                                  value={val.size_id}
                                  onChange={(e) =>
                                    this.handleSizeChange(val, e.target.value)
                                  }
                                >
                                  {val.size_materials.map((i, k) => (
                                    <option value={i.size_id} key={k}>
                                      {i.size_name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            ) : null}
                            <Form.Group>
                              <Form.Label>Quantity</Form.Label>
                              <Form.Select
                                value={val.quantity}
                                onChange={(e) =>
                                  this.handleQtyChange(val.id, e.target.value)
                                }
                              >
                                {[...Array(10).keys()].map((i, k) => (
                                  <option value={i + 1} key={k}>
                                    {i + 1}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        ) : null}
                        <div className="purity-wrapper">
                          <Form.Group>
                            {this.getSizeMaterial(val).materials.map(
                              (item, key) => (
                                <Row key={key} className="justify-content-between" >
                                  <Col xs={4} md={4}>
                                    <Form.Label>
                                      {this.getSizeMaterial(val).materials
                                        .length > 1
                                        ? item.material_name
                                        : "Purity"}
                                      :
                                    </Form.Label>
                                  </Col>
                                  <Col xs={4} md={4}>
                                    <Form.Select
                                      value={this.getSelectedPurity(
                                        val,
                                        item.material_id
                                      )}
                                      onChange={(e) =>
                                        this.handlPurityChange(
                                          val.id,
                                          item.material_id,
                                          e.target.value
                                        )
                                      }
                                      className={
                                        this.getSelectedPurity(
                                          val,
                                          item.material_id
                                        ) == ""
                                          ? "error_input"
                                          : ""
                                      }
                                    >
                                      {this.getSelectedPurity(
                                        val,
                                        item.material_id
                                      ) == "" ? (
                                        <option value=""></option>
                                      ) : null}
                                      {item.purities.map((i, k) => (
                                        <option value={i.id} key={k}>
                                          {i.name}
                                          {/*, {item.weight} {item.unit_name}*/}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                </Row>
                              )
                            )}
                          </Form.Group>
                        </div>
                        {val.is_manual ? (
                          <div>
                            <Row>
                              <Col xs={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Weight</Form.Label>
                                  <InputGroup
                                    className={
                                      this.getManualErr(index, "weight")
                                        ? "is-invalid error_input"
                                        : "" + " rounded-start "
                                    }
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter weight"
                                      value={val.manual_weight}
                                      className="rounded"
                                      onChange={(e) =>
                                        this.handleWeight(e, index)
                                      }
                                    />
                                    <InputGroup.Text>
                                      {val.cart_material[0].unit_name}
                                    </InputGroup.Text>
                                  </InputGroup>
                                  <Form.Control.Feedback type="invalid">
                                    {this.getManualErr(index, "weight")}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col xs={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Quantity</Form.Label>
                                  <span className="qty-update">
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter quantity"
                                      value={val.manual_qty}
                                      onChange={(e) => this.handleQty(e, index)}
                                      className={
                                        this.getManualErr(index, "qty")
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      {this.getManualErr(index, "qty")}
                                    </Form.Control.Feedback>
                                    <Form.Label>&nbsp;</Form.Label>
                                    <Button
                                      variant="primary"
                                      className="dark_button"
                                      onClick={() =>
                                        this.handleManulUpdate(index)
                                      }
                                    >
                                      Update
                                    </Button>
                                  </span>
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        ) : null}

                        <div className="cart-icons ">
                          <Button
                            variant="primary"
                            className="rounded text-bg-danger"
                            onClick={() => this.removeConfirm(val)}
                          >
                            {" "}
                            Remove
                          </Button>
                          <Button
                            variant="primary"
                            className="rounded"
                            onClick={() => this.handleMoveToWishlist(val)}
                          >
                            {" "}
                            Move To Wishlist
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
                  <Col xs={12} md={3}>
                    <div className="order-summary-header">
                      <h4 className="text-primary-emphasis">ORDER SUMMARY</h4>
                    </div>
                    <div className="cart-right-sidebar rounded">
                      <div className="summary-items">
                        <p>
                          Total ( <span>{cartList.length} </span> Items )
                        </p>
                        <p>{this.state.item_total_display}</p>
                      </div>
                      {!isEmpty(this.state.promocode) ? (
                        <div className="summary-items">
                          <p>
                            Voucher code ( <span>{this.state.promocode} </span>{" "}
                            )
                          </p>
                          <p>{this.state.promocode_discount_display}</p>
                        </div>
                      ) : null}
                      <div className="summary-t-payable">
                        <p>
                          <strong>Total Payable </strong>
                        </p>
                        <p>
                          <strong>{this.state.total_payable_display}</strong>
                        </p>
                      </div>
                    </div>
                    {/*<div className='place-order-button mt-2'>
                                            <Button variant="primary" onClick={this.handlePlaceOrder}>CHECKOUT</Button>

                    </div>*/}
                    {cartList.length ? (
                      <>
                        <div className="place-order-button my-2">
                          <Button
                            variant="primary"
                            onClick={this.handlePlaceOrder}
                            className="rounded"
                          >
                            CHECKOUT
                          </Button>
                          {!this.isRetailer && !this.isSalesExecutive ? (
                            <>
                              <div className="voucher-wrapper">
                                <p
                                  className=""
                                  onClick={() =>
                                    this.setState({
                                      showPromocode: !this.state.showPromocode,
                                    })
                                  }
                                  role="button"
                                >
                                  I have a voucher code/ gift card
                                </p>
                                <p
                                  className="show-offer"
                                  onClick={() =>
                                    this.setState({ offerDialog: true })
                                  }
                                >
                                  {" "}
                                  View Offers{" "}
                                </p>
                              </div>
                            </>
                          ) : null}
                        </div>
                        {this.state.showPromocode ? (
                          <div className="promo-code rounded">
                            <InputGroup
                              className={
                                "mb-0 rounded" +
                                (this.state.code_err ? " error_input" : "")
                              }
                            >
                              <Form.Control
                                placeholder="Enter Promo Code"
                                value={this.state.code}
                                onChange={(e) =>
                                  this.setState({ code: e.target.value })
                                }
                              />
                              <InputGroup.Text
                                onClick={this.applyPromocode}
                                role="button"
                              >
                                APPLY
                              </InputGroup.Text>
                            </InputGroup>
                            {/* <div className='view-offer' onClick={() => this.setState({ offerDialog: true })}>
                                                                    <button variant='primary'> View Offer </button>
                                                    </div>*/}
                          </div>
                        ) : null}

                        <div className="p-authenticity p-2 rounded">
                          <h4 className="text-center">
                            CERTIFICATE OF AUTHENTICITY
                          </h4>
                          <ul className="authenticity_list">
                            <li>
                              <img src={au1} alt="" />
                            </li>
                            <li>
                              <img src={au2} alt="" />
                            </li>
                            <li>
                              <img src={au3} alt="" />
                            </li>
                            <li>
                              <img src={au4} alt="" />
                            </li>
                            <li>
                              <img src={au5} alt="" />
                            </li>
                          </ul>
                          <ul className="cart-authenticity">
                            <li>
                              {" "}
                              <img src={shipping} alt="" /> Free Delivery{" "}
                            </li>
                            <li>
                              {" "}
                              <img src={jewelleryHome} alt="" /> Genuine Price{" "}
                            </li>
                          </ul>
                        </div>
                        <p className="queries">
                          <span>Any Questions?</span> Please call us at +91
                          98744 45878 or Chat with us
                        </p>
                      </>
                    ) : null}
                    {/*<p className='mt-3'>I have a voucher code/ gift card</p>
                                        <p className='queries'><span>Any Questions?</span> Please call us at +91 98744 45878
                                            or Chat with us</p>*/}
                    {/*<div className='summary-save mt-4'>
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
                </div>*/}
                    {/* <div className='place-order-button mt-5'>
                                <div><h3> <span>Total</span>₹10000 </h3> </div>
                                <Button variant="primary">CHECKOUT</Button>
                </div>*/}
                  </Col>
                </Row>
              </Container>
            </div>
          </div>

          <Modal
            show={this.state.offerDialog}
            onHide={this.handleOfferClose}
            centered
            className="popup-offers"
          >
            <h1 className="coupon-heading">Best Promo Codes</h1>
            <Modal.Body>
              <div className="coupon-outer-wrapper">
                {this.state.promocodes.map((item, key) => (
                  <div className="coupon-wrapper" key={key}>
                    <div className="coupon-offer">
                      <span> {item.discount_display} OFF </span>
                    </div>

                    <div className="coupon-offer-content">
                      <div className="coupon-title">
                        <h2>{item.code}</h2>
                        <button
                          variant="primary"
                          onClick={() => this.handleCodeApply(item)}
                        >
                          APPLY
                        </button>
                      </div>
                      <span className="save-offer">{item.title}</span>
                      <div className="underline_offer"></div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <span className="close-popup" onClick={this.handleOfferClose}>
                X
              </span>
            </Modal.Body>
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  items: state.customer.cart.items,
  item_total_display: state.customer.cart.item_total_display,
  total_payable_display: state.customer.cart.total_payable_display,
  promocode: state.customer.cart.promocode,
  promocode_discount: state.customer.cart.promocode_discount,
  promocode_discount_display: state.customer.cart.promocode_discount_display,
  actionCalled: state.customer.cart.actionCalled,
  deleteSuccess: state.customer.cart.deleteSuccess,
  successMessage: state.customer.cart.successMessage,
  errorMessage: state.customer.cart.errorMessage,
  isLoggedIn: "isLoggedIn" in state.auth ? state.auth.isLoggedIn : false,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      CartList,
      CartUpdate,
      CartDelete,
      checkoutList,
      CartUpdateSizeMaterial,
      CartApplyPromocode,
    },
    dispatch
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);

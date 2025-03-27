import React from "react";
import withRouter from "helpers/withRouter";
import {
  isSalesExecutive,
  isRetailer,
  isEmpty,
  isCustomer,
  isObject,
  displayAmount,
  priceFormat,
  toBase64,
} from "helpers/helper";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "../Loader";
import cartImage from "src/assets/images/cartImage.png";
import { HiArrowNarrowLeft } from "react-icons/hi";
import BeatLoader from "react-spinners/BeatLoader";
import {
  AddressFetch,
  AddressListRaw,
  getCountries,
  getStates,
  getDistricts,
} from "actions/Customer/address.actions";
import { checkoutList } from "actions/Customer/checkout.actions";
import { CartList } from "actions/Customer/addcart.actions";
import { AddressCreate } from "actions/Customer/address.actions";
import { OrderCreate } from "actions/Customer/placeOrder.actions";
import { retailerList } from "actions/Customer/retailer.actions";
import { salesExecutiveList } from "actions/Customer/salesExecutive.actions";
import { toast } from "react-toastify";
import { CUSTOMER_ADDRESS_RESET } from "actionTypes/Customer/address.types";
import { RESET_ORDER } from "actionTypes/Customer/order.types";
import Cookies from "universal-cookie";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { login, existingUser, signup } from "actions/Customer/auth.actions";
import { BsPhone } from "react-icons/bs";
import Select from "react-select";

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Password: `password`,
      PasswordIcon: `bi-eye-slash`,
      items: this.props.items,
      item_total: this.props.item_total,
      item_total_display: this.props.item_total_display,
      total_payable: this.props.total_payable,
      total_payable_display: this.props.total_payable_display,
      promocode: this.props.promocode,
      promocode_discount: this.props.promocode_discount,
      promocode_discount_display: this.props.promocode_discount_display,
      original_price: this.props.original_price,
      total_discount: this.props.total_discount,
      addressList: [],
      newAddress: false,
      addressForm: {
        name: "",
        contact: "",
        country_id: "",
        state_id: "",
        district_id: "",
        city: "",
        zipcode: "",
        landmark: "",
        type: "",
      },
      addressFormErrors: {
        name: false,
        contact: false,
        country_id: false,
        state_id: false,
        district_id: false,
        city: false,
        zipcode: false,
        landmark: false,
        type: false,
      },
      countryList: [],
      stateList: [],
      districtList: [],
      adrs_actionCalled: this.props.adrs_actionCalled,
      adrs_createSuccess: this.props.adrs_createSuccess,
      adrs_editSuccess: this.props.adrs_editSuccess,
      adrs_deleteSuccess: this.props.adrs_deleteSuccess,
      adrs_successMessage: this.props.adrs_successMessage,
      adrs_errorMessage: this.props.adrs_errorMessage,
      order_actionCalled: this.props.order_actionCalled,
      order_createSuccess: this.props.order_createSuccess,
      order_successMessage: this.props.order_successMessage,
      order_errorMessage: this.props.order_errorMessage,
      order_id: this.props.order_id,
      address_submitting: false,
      payment_mode: "select mode",
      address_id: "",
      processing: false,
      retailerList: this.props.retailerList,
      salesExecutiveList: this.props.salesExecutiveList,
      user_id: "",
      auth: this.props.auth,
      loginError: this.props.loginError,
      isLoggedIn: this.props.isLoggedIn,
      formValaues: {
        mobile: "",
        password: "",
        email: "",
        name: "",
      },
      formErrors: {
        mobile: null,
        password: null,
        email: null,
        name: "",
      },
      login_step: 0,
      promocode: "",
      payment_mode_err: "",
      discount_amount: "",
      cheque_no: "",
      image_file: null,
      notes: "",
    };

    this.isSalesExecutive = isSalesExecutive();
    this.isRetailer = isRetailer();
    this.isCustomer = isCustomer();
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
    }
    if (props.item_total !== state.item_total) {
      update.item_total = props.item_total;
    }
    if (props.total_payable !== state.total_payable) {
      update.total_payable = props.total_payable;
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
    if (props.original_price !== state.original_price) {
      update.original_price = props.original_price;
    }
    if (props.total_discount !== state.total_discount) {
      update.total_discount = props.total_discount;
    }
    if (props.adrs_actionCalled !== state.adrs_actionCalled) {
      update.adrs_actionCalled = props.adrs_actionCalled;
    }
    if (props.adrs_createSuccess !== state.adrs_createSuccess) {
      update.adrs_createSuccess = props.adrs_createSuccess;
    }
    if (props.adrs_editSuccess !== state.adrs_editSuccess) {
      update.adrs_editSuccess = props.adrs_editSuccess;
    }
    if (props.adrs_deleteSuccess !== state.adrs_deleteSuccess) {
      update.adrs_deleteSuccess = props.adrs_deleteSuccess;
    }
    if (props.adrs_successMessage !== state.adrs_successMessage) {
      update.adrs_successMessage = props.adrs_successMessage;
    }
    if (props.adrs_errorMessage !== state.adrs_errorMessage) {
      update.adrs_errorMessage = props.adrs_errorMessage;
    }
    if (props.order_actionCalled !== state.order_actionCalled) {
      update.order_actionCalled = props.order_actionCalled;
    }
    if (props.order_createSuccess !== state.order_createSuccess) {
      update.order_createSuccess = props.order_createSuccess;
    }
    if (props.order_successMessage !== state.order_successMessage) {
      update.order_successMessage = props.order_successMessage;
    }
    if (props.order_errorMessage !== state.order_errorMessage) {
      update.order_errorMessage = props.order_errorMessage;
    }
    if (props.order_id !== state.order_id) {
      update.order_id = props.order_id;
    }
    if (props.retailerList !== state.retailerList) {
      update.retailerList = props.retailerList;
    }
    if (props.salesExecutiveList !== state.salesExecutiveList) {
      update.salesExecutiveList = props.salesExecutiveList;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    if (props.loginError !== state.loginError) {
      update.loginError = props.loginError;
    }
    if (props.isLoggedIn !== state.isLoggedIn) {
      update.isLoggedIn = props.isLoggedIn;
    }
    return update;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      window.location.reload();
      this.loadAddress();
      this.loadCountryList();
      if (this.isRetailer) {
        this.props.actions.salesExecutiveList();
      } else if (this.isSalesExecutive) {
        this.props.actions.retailerList();
      }
    }

    if (
      prevProps.retailerList !== this.props.retailerList &&
      this.props.retailerList.length &&
      this.props.query.get("new_created") == 1
    ) {
      let arr = this.props.retailerList.sort((a, b) => a.id > b.id);
      setTimeout(() => {
        this.retailerChange(arr[0].id);
      }, 200);
    }

    if (this.state.adrs_actionCalled) {
      if (this.state.adrs_createSuccess) {
        toast.success(this.state.adrs_successMessage);
        this.setState({
          addressForm: {
            name: "",
            contact: "",
            country_id: "",
            state_id: "",
            district_id: "",
            city: "",
            zipcode: "",
            landmark: "",
            type: "",
          },
          addressFormErrors: {
            name: false,
            contact: false,
            country_id: false,
            state_id: false,
            district_id: false,
            city: false,
            zipcode: false,
            landmark: false,
            type: false,
          },
          address_submitting: false,
          newAddress: false,
        });
        this.loadAddress();
      } else {
        toast.error(this.state.adrs_errorMessage);
        this.setState({
          address_submitting: false,
        });
      }

      this.props.dispatch({
        type: CUSTOMER_ADDRESS_RESET,
      });
    }

    if (this.state.order_actionCalled) {
      if (this.state.order_createSuccess) {
        var date = new Date();
        date.setTime(date.getTime() + 5 * 60 * 1000);
        const cookies = new Cookies();
        cookies.set("order_id", this.state.order_id, {
          path: "/",
          expires: date,
        });
        toast.success(this.state.order_successMessage);
        this.props.dispatch({
          type: RESET_ORDER,
        });
        this.setState({
          processing: false,
        });
        this.props.navigate("/order-success");
      } else {
        toast.error(this.state.order_errorMessage);
        this.setState({
          processing: false,
        });
        this.props.dispatch({
          type: RESET_ORDER,
        });
      }
    }
  }

  componentDidMount() {
    this.props.actions.CartList();
    // if(this.state.isLoggedIn){
    //     this.loadAddress();
    // }
    this.loadAddress();
    this.loadCountryList();
    if (this.isRetailer) {
      this.props.actions.salesExecutiveList();
    } else if (this.isSalesExecutive) {
      this.props.actions.retailerList();
    }
  }

  loadAddress = () => {
    let params = "";
    if (this.isSalesExecutive) {
      params = this.state.user_id ? { user_id: this.state.user_id } : "";
      if (!params) {
        return;
      }
    }
    this.setState({
      address_id: "",
    });
    AddressListRaw(params).then((res) => {
      if (res.data.success) {
        this.setState({
          addressList: res.data.data.items,
        });
        if (res.data.data.items.length == 1) {
          this.setState({
            address_id: res.data.data.items[0].id,
          });
        }
      }
    });
  };

  loadCountryList = async () => {
    const res = await getCountries();
    if (res.data.success) {
      this.setState({
        countryList: res.data.data,
      });
    }
  };

  handleNewAddress = () => {
    this.setState({
      newAddress: !this.state.newAddress,
      addressForm: {
        ...this.state.addressForm,
        name: this.state.auth.user.name,
        contact: this.state.auth.user.mobile,
      },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAddressChange = async (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        addressForm: {
          ...this.state.addressForm,
          [name]: value,
        },
      },
      async () => {
        if (name == "country_id") {
          let stateList = [];
          if (value) {
            const res = await getStates({ country_id: value });
            if (res.data.success) {
              stateList = res.data.data;
            }
          }
          this.setState({
            stateList: stateList,
            addressForm: {
              ...this.state.addressForm,
              state_id: "",
              district_id: "",
            },
          });
        } else if (name == "state_id") {
          let districtList = [];
          if (value) {
            const res = await getDistricts({ state_id: value });
            if (res.data.success) {
              districtList = res.data.data;
            }
          }
          this.setState({
            districtList: districtList,
            addressForm: {
              ...this.state.addressForm,
              district_id: "",
            },
          });
        }
      }
    );
  };

  onAddressSubmit = (e) => {
    e.preventDefault();

    if (this.formValidate()) {
      this.setState({
        address_submitting: true,
      });
      let data = { ...this.state.addressForm, user_id: this.state.user_id };
      this.props.actions.AddressCreate(data);
    }
  };

  formValidate = () => {
    let hasErr = false;
    let addressForm = this.state.addressForm;
    let addressFormErrors = this.state.addressFormErrors;
    if (!addressForm.name) {
      addressFormErrors.name = true;
      hasErr = true;
    } else {
      addressFormErrors.name = false;
    }
    if (!addressForm.contact) {
      addressFormErrors.contact = true;
      hasErr = true;
    } else {
      addressFormErrors.contact = false;
    }
    if (!addressForm.country_id) {
      addressFormErrors.country_id = true;
      hasErr = true;
    } else {
      addressFormErrors.country_id = false;
    }
    if (!addressForm.state_id) {
      addressFormErrors.state_id = true;
      hasErr = true;
    } else {
      addressFormErrors.state_id = false;
    }
    if (!addressForm.district_id) {
      addressFormErrors.district_id = true;
      hasErr = true;
    } else {
      addressFormErrors.district_id = false;
    }
    if (!addressForm.city) {
      addressFormErrors.city = true;
      hasErr = true;
    } else {
      addressFormErrors.city = false;
    }
    if (!addressForm.zipcode) {
      addressFormErrors.zipcode = true;
      hasErr = true;
    } else {
      addressFormErrors.zipcode = false;
    }
    if (!addressForm.type) {
      addressFormErrors.type = true;
      hasErr = true;
    } else {
      addressFormErrors.type = false;
    }
    this.setState({
      addressFormErrors: addressFormErrors,
    });
    return !hasErr;
  };

  cancelAddressCreate = () => {
    this.setState({
      newAddress: false,
    });
  };

  handlePlaceOrder = async () => {
    if (!this.state.isLoggedIn) {
      return;
    }
    let hasErr = false;
    if (!this.state.address_id) {
      toast.error("Please select address.");
      hasErr = true;
    }
    if (this.isSalesExecutive) {
      if (!this.state.user_id) {
        toast.error("Please select retailer.");
        hasErr = true;
      }
      if (this.state.paid_amount && !this.state.payment_mode) {
        toast.error("Please select payment mode.");
        this.setState({
          payment_mode_err: "Required.",
        });
        hasErr = true;
      } else {
        this.setState({
          payment_mode_err: "",
        });
      }
    }
    if (hasErr) {
      return;
    }

    this.setState({
      processing: true,
    });
    let data = {
      sub_total: this.state.item_total,
      discount_amount: this.state.discount_amount,
      total_amount: this.state.discount_amount
        ? priceFormat(this.state.total_payable - this.state.discount_amount)
        : this.state.total_payable,
      payment_mode: this.state.payment_mode,
      delivery_address: this.state.address_id,
      user_id: this.state.user_id,
      paid_amount: this.state.paid_amount,
      cheque_no: this.state.cheque_no,
      notes: this.state.notes,
      image_file: this.state.image_file
        ? await toBase64(this.state.image_file)
        : "",
    };
    this.props.actions.OrderCreate(data);
  };

  retailerChange = (v) => {
    v = isObject(v) ? v.value : v;
    this.setState(
      {
        user_id: v,
      },
      () => {
        if (this.isSalesExecutive) {
          this.loadAddress();
        }
      }
    );
    console.log(v);
  };

  handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValaues: {
        ...this.state.formValaues,
        [name]: value,
      },
    });
  };

  handleLoginReset = () => {
    this.setState({
      login_step: 0,
    });
  };

  onLoginSubmit = async (event) => {
    event.preventDefault();

    let formValaues = this.state.formValaues;
    if (this.loginFormValidate()) {
      if (this.state.login_step == 0) {
        let res = await existingUser({ mobile: formValaues.mobile });
        if (res.data.success) {
          this.setState({
            login_step: 1,
          });
        } else {
          this.setState({
            login_step: 2,
          });
        }
      } else if (this.state.login_step == 1) {
        this.props.actions.login(this.state.formValaues);
      } else {
        this.props.actions.signup(this.state.formValaues);
      }
    }
  };

  loginFormValidate = () => {
    let formValaues = this.state.formValaues;
    let formErrors = this.state.formErrors;
    let hasErr = false;
    if (!formValaues.mobile) {
      formErrors.mobile = "Mobile # is required.";
      hasErr = true;
    } else if (formValaues.mobile.length != 10) {
      formErrors.mobile = "Invalid mobile #";
      hasErr = true;
      toast.error("Invalid mobile #");
    } else {
      formErrors.mobile = null;
    }
    if (this.state.login_step != 0 && !formValaues.password) {
      formErrors.password = "Password # is required.";
      hasErr = true;
    } else {
      formErrors.password = null;
    }
    if (this.state.login_step == 2 && !formValaues.name) {
      formErrors.name = "Name is required.";
      hasErr = true;
    } else {
      formErrors.name = null;
    }
    this.setState({
      formErrors: formErrors,
    });
    return !hasErr;
  };

  applyPromocode = () => {};

  addNewRetailer = () => {
    this.props.navigate("/retailers/create");
  };

  getReatilerOptions = () => {
    let data = [];
    for (let i = 0; i < this.state.retailerList.length; i++) {
      data.push({
        value: this.state.retailerList[i].id,
        label: `${this.state.retailerList[i].company_name}, ${this.state.retailerList[i].city}, ${this.state.retailerList[i].pincode}`,
      });
    }
    return data;
  };

  handleCashDiscount = (e) => {
    if (e.target.value === "" || e.target.value.match(/^\d{1,}(\.\d{0,3})?$/)) {
      this.setState({
        discount_amount: e.target.value,
      });
    }
  };

  handleImage = (e) => {
    this.setState({
      image_file: e.target.files[0],
    });
  };

  render() {
    const {
      newAddress,
      addressForm,
      addressFormErrors,
      addressList,
      countryList,
      stateList,
      districtList,
      loginError,
      formValaues,
      formErrors,
    } = this.state;
    const cartList = this.state.items;
    return (
      <div className="checkout-wrapper checkout-desktop pb-3 mb-0">
        <div className="wrapper-checkout">
          <div className="container">
            <div className="breadcrumb-wrapper">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
                <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
              </Breadcrumb>
              {/*<div className='checkout-header'>
                            <h3>Checkout</h3>
        </div>*/}
            </div>
            <Row>
              <Col xs={12} md={7} className="order ">
                <div className="checkout-single-wrapper bg-white border-right rounded">
                  <hr />
                  <div className="c-address-area ">
                    <div className="header ">
                      {/* <h4>Delivery Details</h4> */}
                      {this.state.isLoggedIn && !this.isSalesExecutive ? (
                        <>
                          <h5>Address</h5>
                        </>
                      ) : null}

                      {/* {!this.state.isLoggedIn ? (
                        <>
                          <h5>
                            Your Details{" "}
                            <span>
                              Required to Save Cart and Send Order Updates
                            </span>
                          </h5>
                          <div className="login-address-details">
                            {loginError ? (
                              <Alert variant="danger">{loginError}</Alert>
                            ) : null}
                            <Form onSubmit={this.onLoginSubmit}>
                              <Row>
                                <Col xs={12} md={6}>
                                  <InputGroup
                                    className={
                                      "mb-3 rounded-3" +
                                      (formErrors.mobile ? " error_input" : "")
                                    }
                                  >
                                    <InputGroup.Text id="basic-addon1">
                                      <BsPhone />
                                    </InputGroup.Text>
                                    <FloatingLabel
                                      label="Mobile #"
                                      className=""
                                    >
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter mobile number"
                                        name="mobile"
                                        className="rounded-3"
                                        onChange={(e) =>
                                          this.handleLoginFormChange(e)
                                        }
                                        value={formValaues.mobile}
                                        disabled={
                                          this.state.login_step != 0
                                            ? true
                                            : false
                                        }
                                      />
                                    </FloatingLabel>
                                  </InputGroup>
                                </Col>
                                {this.state.login_step == 2 ? (
                                  <Col xs={12} md={6}>
                                    <InputGroup
                                      className={
                                        "mb-3 rounded-3" +
                                        (formErrors.email ? " error_input" : "")
                                      }
                                    >
                                      <InputGroup.Text id="basic-addon1">
                                        <AiOutlineMail />
                                      </InputGroup.Text>
                                      <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email"
                                        className=""
                                      >
                                        <Form.Control
                                          type="text"
                                          placeholder="Email"
                                          name="email"
                                          onChange={(e) =>
                                            this.handleLoginFormChange(e)
                                          }
                                          value={formValaues.email}
                                        />
                                      </FloatingLabel>
                                    </InputGroup>
                                  </Col>
                                ) : null}
                                {this.state.login_step == 2 ? (
                                  <Col xs={12} md={6}>
                                    <InputGroup
                                      className={
                                        "mb-3 rounded-3" +
                                        (formErrors.name ? " error_input" : "")
                                      }
                                    >
                                      <InputGroup.Text id="basic-addon1">
                                        <AiOutlineUser />
                                      </InputGroup.Text>
                                      <FloatingLabel
                                        controlId="floatingInput"
                                        label="Name"
                                        className=""
                                      >
                                        <Form.Control
                                          type="text"
                                          placeholder="Name"
                                          name="name"
                                          onChange={(e) =>
                                            this.handleLoginFormChange(e)
                                          }
                                          value={formValaues.name}
                                        />
                                      </FloatingLabel>
                                    </InputGroup>
                                  </Col>
                                ) : null}
                                {this.state.login_step != 0 ? (
                                  <Col xs={12} md={6}>
                                    <InputGroup
                                      className={
                                        "mb-3 rounded-3" +
                                        (formErrors.password
                                          ? " error_input"
                                          : "")
                                      }
                                    >
                                      <InputGroup.Text id="basic-addon1">
                                        <AiOutlineLock />
                                      </InputGroup.Text>
                                      <FloatingLabel
                                        controlId="floatingInput"
                                        label="Password"
                                        className="rounded d-flex align-items-center"
                                      >
                                        <Form.Control
                                          type={this.state.Password}
                                          className="rounded"
                                          placeholder="Password"
                                          name="password"
                                          onChange={(e) =>
                                            this.handleLoginFormChange(e)
                                          }
                                          value={formValaues.password}
                                        />
                                        <i
                                          class={`bi ${this.state.PasswordIcon} fs-4 me-2`}
                                          onClick={() => {
                                            this.state.Password == `password`
                                              ? this.setState({
                                                  Password: `text`,
                                                  PasswordIcon: `bi-eye`,
                                                })
                                              : this.setState({
                                                  Password: `password`,
                                                  PasswordIcon: `bi-eye-slash`,
                                                });
                                          }}
                                        ></i>
                                      </FloatingLabel>
                                    </InputGroup>
                                  </Col>
                                ) : null}
                                <Col xs={12}>
                                  {this.state.login_step != 0 ? (
                                    <Button
                                      variant="primary"
                                      className="add_submit rounded"
                                      type="button"
                                      onClick={this.handleLoginReset}
                                    >
                                      RESET
                                    </Button>
                                  ) : null}
                                  &nbsp;
                                  <Button
                                    variant="primary"
                                    className="add_submit rounded"
                                    type="submit"
                                  >
                                    CONTINUE
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </>
                      ) : null} */}
                    </div>

                    {this.isRetailer && this.state.isLoggedIn ? (
                      <div style={{ flexGrow: 1 }}>
                        <Form.Group>
                          <Form.Label className="se_heading">
                            Sales Executive
                          </Form.Label>
                          <Form.Select
                            onChange={(e) =>
                              this.retailerChange(e.target.value)
                            }
                            value={this.state.user_id}
                          >
                            <option value=""></option>
                            {this.state.salesExecutiveList.map(
                              (item, index) => (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Form.Group>
                      </div>
                    ) : null}
                  </div>
                  {this.state.isLoggedIn ? (
                    <>
                      {addressList.map((item, key) => (
                        <div
                          className="single-address my-2 border rounded p-2"
                          key={key}
                        >
                          <div className="single-address-header">
                            <div className="address-radio">
                              <Form.Check
                                type="radio"
                                name="address_id"
                                value={item.id}
                                onChange={(e) => this.handleChange(e)}
                                checked={
                                  this.state.address_id == item.id
                                    ? true
                                    : false
                                }
                              />
                              <span>{item.name}</span>
                              <span> {item.contact} </span>
                            </div>
                            <div className="address-edit">
                              {" "}
                              {/*<strong> EDIT </strong>*/}
                            </div>
                          </div>
                          <p>{item.formated_address}</p>
                        </div>
                      ))}
                    </>
                  ) : null}

                                <hr />
                   {newAddress && (
                        <Form
                          onSubmit={this.onAddressSubmit}
                          className="login-address-details"
                        >
                          <Form.Group>
                            <Row>
                              <Col xs={12} md={12}>
                                {/* <Form.Label>Name : </Form.Label> */}
                                <div className="form-inner-control mb-2 mt-2">
                                  <InputGroup
                                    className={
                                      addressFormErrors.name
                                        ? " error_input"
                                        : ""
                                    }
                                  >
                                    <InputGroup.Text id="basic-addon1">
                                      <AiOutlineUser />
                                    </InputGroup.Text>
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Enter your Name"
                                      className=""
                                    >
                                      <Form.Control
                                        name="name"
                                        value={addressForm.name}
                                        onChange={(e) =>
                                          this.handleAddressChange(e)
                                        }
                                        placeholder="Enter your Name"
                                        className={
                                          addressFormErrors.name
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                    </FloatingLabel>
                                  </InputGroup>
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a name.
                                  </Form.Control.Feedback>
                                </div>

                                {/*<Form.Control name='name' value={addressForm.name}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            placeholder="Enter your Name"
                                                            className={addressFormErrors.name ? 'is-invalid' : ''}
                                    />*/}
                              </Col>
                            </Row>
                          </Form.Group>
                          <Form.Group>
                            <Row>
                              <Col xs={12} md={6}>
                                <div className="form-inner-control mb-2">
                                  <InputGroup
                                    className={
                                      addressFormErrors.contact
                                        ? " error_input"
                                        : ""
                                    }
                                  >
                                    <InputGroup.Text id="basic-addon1">
                                      <BsPhone />
                                    </InputGroup.Text>
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Phone Number"
                                      className=""
                                    >
                                      <Form.Control
                                        name="contact"
                                        value={addressForm.contact}
                                        onChange={(e) =>
                                          this.handleAddressChange(e)
                                        }
                                        placeholder="Phone Number"
                                        className={
                                          addressFormErrors.contact
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                    </FloatingLabel>
                                  </InputGroup>
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid mobile number.
                                  </Form.Control.Feedback>
                                </div>

                                {/*<Form.Label>Phone : </Form.Label>
                                                        <Form.Control name='contact' value={addressForm.contact}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            placeholder="Phone Number" className={addressFormErrors.contact ? 'is-invalid' : ''} />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid mobile number.
                                    </Form.Control.Feedback>*/}
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="form-inner-control mb-2">
                                  <InputGroup
                                    className={
                                      addressFormErrors.zipcode
                                        ? " error_input"
                                        : ""
                                    }
                                  >
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="PIN Code"
                                      className=""
                                    >
                                      <Form.Control
                                        name="zipcode"
                                        value={addressForm.zipcode}
                                        onChange={(e) =>
                                          this.handleAddressChange(e)
                                        }
                                        placeholder="PIN Code"
                                        className={
                                          addressFormErrors.zipcode
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                    </FloatingLabel>
                                  </InputGroup>
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a Pin code.
                                  </Form.Control.Feedback>
                                </div>

                                {/*<Form.Label>PIN Code : </Form.Label>
                                                        <Form.Control name='zipcode' value={addressForm.zipcode}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            placeholder="PIN Code"
                                                            className={addressFormErrors.zipcode ? 'is-invalid' : ''}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Pin code.
                                    </Form.Control.Feedback>*/}
                              </Col>
                            </Row>
                          </Form.Group>
                          <Form.Group className="">
                            <Row>
                              <Col xs={12} md={6}>
                                <div className="form-inner-control mb-2">
                                  <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Country"
                                  >
                                    <Form.Select
                                      name="country_id"
                                      value={addressForm.country_id}
                                      onChange={(e) =>
                                        this.handleAddressChange(e)
                                      }
                                      className={
                                        addressFormErrors.country_id
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    >
                                      <option value="">select country</option>
                                      {countryList.map((item, key) => (
                                        <option value={item.id} key={key}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </FloatingLabel>
                                  <Form.Control.Feedback type="invalid">
                                    Please select country.
                                  </Form.Control.Feedback>
                                </div>

                                {/*<Form.Label>Country : </Form.Label>
                                                        <Form.Select
                                                            name='country_id' value={addressForm.country_id}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            className={addressFormErrors.country_id ? 'is-invalid' : ''}
                                                        >
                                                            <option value=''>select country</option>
                                                            {
                                                                countryList.map((item, key) => (
                                                                    <option value={item.id} key={key}>{item.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please select country.
                                                        </Form.Control.Feedback>*/}
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="form-inner-control mb-2">
                                  <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="State"
                                  >
                                    <Form.Select
                                      name="state_id"
                                      value={addressForm.state_id}
                                      onChange={(e) =>
                                        this.handleAddressChange(e)
                                      }
                                      className={
                                        addressFormErrors.state_id
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    >
                                      <option value="">select state</option>
                                      {stateList.map((item, key) => (
                                        <option value={item.id} key={key}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </FloatingLabel>
                                  <Form.Control.Feedback type="invalid">
                                    Please select state.
                                  </Form.Control.Feedback>
                                </div>

                                {/*<Form.Label>State : </Form.Label>
                                                        <Form.Select
                                                            name='state_id' value={addressForm.state_id}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            className={addressFormErrors.state_id ? 'is-invalid' : ''}
                                                        >
                                                            <option value=''>select state</option>
                                                            {
                                                                stateList.map((item, key) => (
                                                                    <option value={item.id} key={key}>{item.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please select state.
                                                        </Form.Control.Feedback>*/}
                              </Col>
                            </Row>
                          </Form.Group>

                          <Form.Group className="">
                            <Row>
                              <Col xs={12} md={6}>
                                <div className="form-inner-control mb-2">
                                  <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="District"
                                  >
                                    <Form.Select
                                      name="district_id"
                                      value={addressForm.district_id}
                                      onChange={(e) =>
                                        this.handleAddressChange(e)
                                      }
                                      className={
                                        addressFormErrors.district_id
                                          ? "is-invalid error_input"
                                          : ""
                                      }
                                    >
                                      <option value="">select district</option>
                                      {districtList.map((item, key) => (
                                        <option value={item.id} key={key}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </FloatingLabel>
                                  <Form.Control.Feedback type="invalid">
                                    Please select district.
                                  </Form.Control.Feedback>
                                </div>

                                {/*} <Form.Label>District : </Form.Label>
                                                        <Form.Select
                                                            name='district_id' value={addressForm.district_id}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            className={addressFormErrors.district_id ? 'is-invalid' : ''}
                                                        >
                                                            <option value=''>select district</option>
                                                            {
                                                                districtList.map((item, key) => (
                                                                    <option value={item.id} key={key}>{item.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please select district.
                                                        </Form.Control.Feedback>*/}
                              </Col>
                              <Col xs={12} md={6}>
                                <div className="form-inner-control mb-2">
                                  <InputGroup
                                    className={
                                      addressFormErrors.city
                                        ? " error_input"
                                        : ""
                                    }
                                  >
                                    <InputGroup.Text id="basic-addon1">
                                      <AiOutlineMail />
                                    </InputGroup.Text>
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Town/ City"
                                      className=""
                                    >
                                      <Form.Control
                                        name="city"
                                        value={addressForm.city}
                                        onChange={(e) =>
                                          this.handleAddressChange(e)
                                        }
                                        placeholder="Town/ City"
                                        className={
                                          addressFormErrors.city
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                    </FloatingLabel>
                                  </InputGroup>
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a Town/city.
                                  </Form.Control.Feedback>
                                </div>

                                {/*<Form.Label>Town/City : </Form.Label>
                                                        <Form.Control name='city' value={addressForm.city}
                                                            onChange={(e) => this.handleAddressChange(e)}
                                                            placeholder="Town/ City"
                                                            className={addressFormErrors.city ? 'is-invalid' : ''}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a Town/city.
                                                    </Form.Control.Feedback>*/}
                              </Col>
                            </Row>
                          </Form.Group>

                          <Form.Group className="">
                            <div className="form-inner-control mb-2">
                              <InputGroup className="">
                                <FloatingLabel
                                  controlId="floatingInput"
                                  label="Landmark"
                                  className=""
                                >
                                  <Form.Control
                                    name="landmark"
                                    value={addressForm.landmark}
                                    onChange={(e) =>
                                      this.handleAddressChange(e)
                                    }
                                    placeholder="landmark"
                                  />
                                </FloatingLabel>
                              </InputGroup>
                            </div>

                            {/*} <Form.Label>Landmark : </Form.Label>
                                                <Form.Control name='landmark' value={addressForm.landmark}
                                                    onChange={(e) => this.handleAddressChange(e)}
                                                placeholder="landmark" />*/}
                          </Form.Group>
                          <Form.Group className="">
                            <div className="form-inner-control mb-2">
                              <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Select Type"
                              >
                                <Form.Select
                                  name="type"
                                  value={addressForm.type}
                                  onChange={(e) => this.handleAddressChange(e)}
                                  className={
                                    addressFormErrors.type
                                      ? "is-invalid error_input"
                                      : ""
                                  }
                                >
                                  <option value="">Select type</option>
                                  <option value="Office">Office</option>
                                  <option value="Home">Home</option>
                                  <option value="Other">Other</option>
                                </Form.Select>
                              </FloatingLabel>
                              <Form.Control.Feedback type="invalid">
                                Please provide a type.
                              </Form.Control.Feedback>
                            </div>

                            {/* <Form.Label>Select Type : </Form.Label>
                                                <Form.Select name='type' value={addressForm.type}
                                                    onChange={(e) => this.handleAddressChange(e)}
                                                    className={addressFormErrors.type ? 'is-invalid' : ''}
                                                >
                                                    <option value=''>Select type</option>
                                                    <option value="Office">Office</option>
                                                    <option value="Home">Home</option>
                                                    <option value="Other">Other</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a type.
                                            </Form.Control.Feedback>*/}
                          </Form.Group>
                          <div className="address-btn">
                            <Button
                              variant="primary"
                              type="submit"
                              className="rounded"
                            >
                              SAVE & CONTINUE
                            </Button>
                            <Button
                              variant="default"
                              className="rounded"
                              type="button"
                              onClick={this.cancelAddressCreate}
                            >
                              CANCEL
                            </Button>
                          </div>
                        </Form>
                      )}
                </div>
              </Col>
              <Col xs={12} md={5} className="">
                <div className="checkout-single-wrapper padding-left">
                  <div className="checkout-summary-area rounded">
                    <div className="checkout-s-header">
                      <h3>Order Summary</h3>
                    </div>
                    <div
                      style={{
                        display: "block",
                        height: "1px",
                        width: "100%",
                        background: "#cdcdcd",
                        margin: "5px 0  ",
                      }}
                    ></div>
                    {cartList.map((item, index) => (
                      <div key={index}>
                        <div className="checkout-single-item my-2">
                          <div className="checkout-item-image ">
                            <img
                              src={item.current_image==null?item.product_image:item.current_image}
                              alt=""
                              className="rounded"
                            />
                          </div>
                          <div className="checkout-item-content justify-content-between ">
                            <div>
                              <div className="checkout_price_header justify-content-between d-flex">
                                <h2>{item.product_name}</h2>
                                <div className="checkout-price">
                                  <h4>
                                    {item.have_offer ? (
                                      <span className="strikethrough">
                                        {item.total_price_without_dis_display}
                                      </span>
                                    ) : null}
                                    &nbsp; {item.total_price_display}
                                  </h4>
                                </div>
                              </div>
                              {item.cart_material.map((val, key) => (
                                <h6
                                  key={key}
                                  className="d-flex justify-content-between"
                                >
                                  <span
                                    className="fw-semibold"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {val.material}:
                                  </span>
                                  <span
                                    className=""
                                    style={{ fontSize: "12px" }}
                                  >
                                    {val.quantity > 0
                                      ? val.quantity.toFixed(2) + ", "
                                      : ""}{" "}
                                    {val.purity_name},{" "}
                                    {Number(val.weight).toFixed(2)}{" "}
                                    {val.unit_name}
                                  </span>
                                </h6>
                              ))}
                              <div
                                style={{
                                  display: "flex",
                                  justifyItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div style={{ display: "flex", gap: "10px" }}>
                                  <p
                                    className="fw-semibold"
                                    style={{ fontStyle: "14px" }}
                                  >
                                    Size: <span> {item.size_name} </span>
                                  </p>
                                  <p>
                                    Qty: <span> {item.quantity} </span>
                                  </p>
                                </div>
                                <div>
                                  <Button
                                    variant=""
                                    className=""
                                    onClick={() => this.removeConfirm(val)}
                                  >
                                    {" "}
                                    <i class="bi bi-trash3 me-2 bg-danger text-white p-2 rounded"></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < cartList.length - 1 ? (
                          <div
                            style={{
                              display: "block",
                              height: "1px",
                              width: "100%",
                              background: "#cdcdcd",
                              margin: "5px 0  ",
                            }}
                          ></div>
                        ) : null}
                      </div>
                    ))}
                    <div
                      style={{
                        display: "block",
                        height: "1px",
                        width: "100%",
                        background: "#cdcdcd",
                        margin: "5px 0  ",
                      }}
                    ></div>
                    <div className="checkout-total d-flex justify-content-between mb-2 align-items-center">
                      <span>
                        <h6>Total Amount </h6>{" "}
                      </span>
                      <span tyle="color: black;">
                        <h6> {this.state.original_price} </h6>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "block",
                        height: "1px",
                        width: "100%",
                        background: "#cdcdcd",
                        margin: "5px 0  ",
                      }}
                    ></div>
                    <div className="checkout-total d-flex justify-content-between mb-2 align-items-center">
                      <span>
                        <h6>Discount </h6>{" "}
                      </span>
                      <span tyle="color: black;">
                        <h6> {this.state.total_discount} </h6>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "block",
                        height: "1px",
                        width: "100%",
                        background: "#cdcdcd",
                        margin: "5px 0  ",
                      }}
                    ></div>
                    {!isEmpty(this.state.promocode) ? (
                      <>
                        <div className="checkout-total d-flex justify-content-between mb-2 align-items-center">
                          <span>
                            <h6>Voucher code ( {this.state.promocode} ) </h6>{" "}
                          </span>
                          <span tyle="color: black;">
                            <h6> {this.state.promocode_discount_display} </h6>
                          </span>
                        </div>
                        <div
                          style={{
                            display: "block",
                            height: "1px",
                            width: "100%",
                            background: "#cdcdcd",
                            margin: "5px 0  ",
                          }}
                        ></div>
                      </>
                    ) : null}
                    {this.isSalesExecutive ? (
                      <div className="checkout-total d-flex justify-content-between mb-2 align-items-center">
                        <span className="total"> Cash Discount </span>
                        <span
                          className="total-price w-25"
                          style={{ color: "black" }}
                        >
                          <InputGroup>
                            <Form.Control
                              name="discount_amount"
                              value={this.state.discount_amount}
                              onChange={this.handleCashDiscount}
                            />
                          </InputGroup>
                        </span>
                      </div>
                    ) : null}
                    <div className="checkout-total d-flex justify-content-between mb-2 align-items-center">
                      <span className="total">
                        {" "}
                        Total ({cartList.length}) Items{" "}
                      </span>
                      {/* <span className='d-flex align-items-center gap-3'> */}
                      {/*<p className='total-save'>You saved ₹{checkout?.display_discount || 0}</p>*/}
                      <span className="total-price fs-4" style={{ color: "black" }}>
                        {" "}
                        {this.state.discount_amount
                          ? displayAmount(
                              this.state.total_payable -
                                this.state.discount_amount
                            )
                          : this.state.total_payable_display}{" "}
                      </span>
                      {/* </span> */}
                    </div>
                    <div
                      style={{
                        display: "block",
                        height: "1px",
                        width: "100%",
                        background: "#cdcdcd",
                        margin: "5px 0  ",
                      }}
                    ></div>
                    {/*{
                                            !this.isRetailer && !this.isSalesExecutive ?  
                                            <div className='promo-code'>
                                                <p>I have a promo code </p>
                                                <InputGroup className="mb-2">
                                                    <Form.Control
                                                        placeholder="Enter Promocode"
                                                        onChange={(e) => this.setState({promocode: e.target.value})}
                                                    />
                                                    <InputGroup.Text onClick={this.applyPromocode}>APPLY</InputGroup.Text>
                                                </InputGroup>
                                            </div>
                                            : null
                                        }*/}
                    {/* // !this is a checking this work or not */}
                    <div className="c-address-area bg-transparent my-2">
                      <div
                        className={`header ${
                          this.state.isLoggedIn ? "d-flex" : null
                        } justify-content-between`}
                      >
                        {/* <h4>Delivery Details</h4> */}
                        {this.state.isLoggedIn && !this.isSalesExecutive ? (
                          <>
                            <h5>Add New Address</h5>
                          </>
                        ) : null}
                        {this.state.isLoggedIn && !this.isSalesExecutive ? (
                          <>
                            <div
                              className="add-address rounded bg-primary font-bold p-1 px-4"
                              onClick={this.handleNewAddress}
                            >
                              {newAddress ? (
                                <AiOutlineMinus />
                              ) : (
                                <AiOutlinePlus />
                              )}
                              ADD
                            </div>
                          </>
                        ) : null}

                        {!this.state.isLoggedIn ? (
                          <>
                            <h5>
                              Your Details{" "}
                              <span>
                                Required to Save Cart and Send Order Updates
                              </span>
                            </h5>
                            <div className="login-address-details">
                              {loginError ? (
                                <Alert variant="danger">{loginError}</Alert>
                              ) : null}
                              <Form onSubmit={this.onLoginSubmit}>
                                <Row>
                                  <Col xs={12} md={6}>
                                    <InputGroup
                                      className={
                                        "mb-3 rounded-3" +
                                        (formErrors.mobile
                                          ? " error_input"
                                          : "")
                                      }
                                    >
                                      <InputGroup.Text id="basic-addon1">
                                        <BsPhone />
                                      </InputGroup.Text>
                                      <FloatingLabel
                                        label="Mobile #"
                                        className=""
                                      >
                                        <Form.Control
                                          type="text"
                                          placeholder="Enter mobile number"
                                          name="mobile"
                                          className="rounded-3"
                                          onChange={(e) =>
                                            this.handleLoginFormChange(e)
                                          }
                                          value={formValaues.mobile}
                                          disabled={
                                            this.state.login_step != 0
                                              ? true
                                              : false
                                          }
                                        />
                                      </FloatingLabel>
                                    </InputGroup>
                                  </Col>
                                  {this.state.login_step == 2 ? (
                                    <Col xs={12} md={6}>
                                      <InputGroup
                                        className={
                                          "mb-3 rounded-3" +
                                          (formErrors.email
                                            ? " error_input"
                                            : "")
                                        }
                                      >
                                        <InputGroup.Text id="basic-addon1">
                                          <AiOutlineMail />
                                        </InputGroup.Text>
                                        <FloatingLabel
                                          controlId="floatingInput"
                                          label="Email"
                                          className=""
                                        >
                                          <Form.Control
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            onChange={(e) =>
                                              this.handleLoginFormChange(e)
                                            }
                                            value={formValaues.email}
                                          />
                                        </FloatingLabel>
                                      </InputGroup>
                                    </Col>
                                  ) : null}
                                  {this.state.login_step == 2 ? (
                                    <Col xs={12} md={6}>
                                      <InputGroup
                                        className={
                                          "mb-3 rounded-3" +
                                          (formErrors.name
                                            ? " error_input"
                                            : "")
                                        }
                                      >
                                        <InputGroup.Text id="basic-addon1">
                                          <AiOutlineUser />
                                        </InputGroup.Text>
                                        <FloatingLabel
                                          controlId="floatingInput"
                                          label="Name"
                                          className=""
                                        >
                                          <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            onChange={(e) =>
                                              this.handleLoginFormChange(e)
                                            }
                                            value={formValaues.name}
                                          />
                                        </FloatingLabel>
                                      </InputGroup>
                                    </Col>
                                  ) : null}
                                  {this.state.login_step != 0 ? (
                                    <Col xs={12} md={6}>
                                      <InputGroup
                                        className={
                                          "mb-3 rounded-3" +
                                          (formErrors.password
                                            ? " error_input"
                                            : "")
                                        }
                                      >
                                        <InputGroup.Text id="basic-addon1">
                                          <AiOutlineLock />
                                        </InputGroup.Text>
                                        <FloatingLabel
                                          controlId="floatingInput"
                                          label="Password"
                                          className="rounded d-flex align-items-center"
                                        >
                                          <Form.Control
                                            type={this.state.Password}
                                            className="rounded"
                                            placeholder="Password"
                                            name="password"
                                            onChange={(e) =>
                                              this.handleLoginFormChange(e)
                                            }
                                            value={formValaues.password}
                                          />
                                          <i
                                            class={`bi ${this.state.PasswordIcon} fs-4 me-2`}
                                            onClick={() => {
                                              this.state.Password == `password`
                                                ? this.setState({
                                                    Password: `text`,
                                                    PasswordIcon: `bi-eye`,
                                                  })
                                                : this.setState({
                                                    Password: `password`,
                                                    PasswordIcon: `bi-eye-slash`,
                                                  });
                                            }}
                                          ></i>
                                        </FloatingLabel>
                                      </InputGroup>
                                    </Col>
                                  ) : null}
                                  <Col xs={12}>
                                    {this.state.login_step != 0 ? (
                                      <Button
                                        variant="primary"
                                        className="add_submit rounded"
                                        type="button"
                                        onClick={this.handleLoginReset}
                                      >
                                        RESET
                                      </Button>
                                    ) : null}
                                    &nbsp;
                                    <Button
                                      variant="primary"
                                      className="add_submit rounded"
                                      type="submit"
                                    >
                                      CONTINUE
                                    </Button>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </>
                        ) : null}
                      </div>
                     
                      {/*{this.isRetailer && this.state.isLoggedIn ? (*/}
                      {/*  <div style={{ flexGrow: 1 }}>*/}
                      {/*    <Form.Group>*/}
                      {/*      <Form.Label className="se_heading">*/}
                      {/*        Sales Executive*/}
                      {/*      </Form.Label>*/}
                      {/*      <Form.Select*/}
                      {/*        onChange={(e) =>*/}
                      {/*          this.retailerChange(e.target.value)*/}
                      {/*        }*/}
                      {/*        value={this.state.user_id}*/}
                      {/*      >*/}
                      {/*        <option value=""></option>*/}
                      {/*        {this.state.salesExecutiveList.map(*/}
                      {/*          (item, index) => (*/}
                      {/*            <option value={item.id} key={index}>*/}
                      {/*              {item.name}*/}
                      {/*            </option>*/}
                      {/*          )*/}
                      {/*        )}*/}
                      {/*      </Form.Select>*/}
                      {/*    </Form.Group>*/}
                      {/*  </div>*/}
                      {/*) : null}*/}

                      {this.isSalesExecutive && this.state.isLoggedIn ? (
                        <div style={{ flexGrow: 1 }}>
                          <Form.Group>
                            <Form.Label className="retailer_heading">
                              Retailer List
                              <span
                                className="add_new_rtlr"
                                onClick={this.addNewRetailer}
                              >
                                Add New
                              </span>
                            </Form.Label>
                            <Select
                              defaultValue={this.state.user_id}
                              onChange={this.retailerChange}
                              options={this.getReatilerOptions()}
                            />
                            {/*<Form.Select onChange={this.retailerChange} value={this.state.user_id}>
                                                            <option value=""></option>
                                                            {
                                                                this.state.retailerList.map((item, index) => (
                                                                    <option value={item.id} key={index}>{item.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>*/}
                          </Form.Group>
                        </div>
                      ) : null}
                    </div>
                    <div className="payment-method">
                      {this.isSalesExecutive ? (
                        <div className="d-flex justify-content-between mb-3">
                          <h5 className="mb-2">Payments</h5>
                          <Col xs={6} md={4}>
                            <InputGroup>
                              {/* <FloatingLabel
                                controlId="floatingInput2"
                                label="Payment Mode"
                                className={
                                  "mb-3" +
                                  (this.state.payment_mode_err
                                    ? " error_input"
                                    : "")
                                }
                              > */}
                              <Form.Select
                                value={this.state.payment_mode}
                                onChange={(e) =>
                                  this.setState({
                                    payment_mode: e.target.value,
                                  })
                                }
                              >
                                <option value="mode">select mode</option>
                                <option value="cash">Cash</option>
                                <option value="cheque">Cheque</option>
                                <option value="imps_neft">NEFT/IMPS/UPI</option>
                                <option value="online">Online</option>
                              </Form.Select>
                              {/* </FloatingLabel> */}
                            </InputGroup>
                          </Col>
                        </div>
                      ) : null}
                      {/*<span className='online-payment d-flex gap-2 mb-2'>
                                            <Form.Check
                                                // name={'payment_mode'} value={'online'} onChange={(e)=>handleGetData(e)}
                                                type="radio" aria-label="radio 1" disabled={true} />
                                        <span >  Online Payment  </span> 
                                        </span>*/}
                      {this.isCustomer ? (
                        <span className="place-order d-flex gap-2 mb-2">
                          <Form.Check
                            type="radio"
                            aria-label="radio 1"
                            name={"payment_mode"}
                            defaultChecked={true}
                            value={"cash"}
                            label={"Cash on Delivery"}
                          />
                          Cash on Delivery
                        </span>
                      ) : null}

                      {this.isSalesExecutive ? (
                        <span className="place-order gap-2 mb-2">
                          <Row>
                            {this.isSalesExecutive ? (
                              <>
                                <Col
                                  xs={6}
                                  md={
                                    this.state.payment_mode == "cheque" ? 6 : 6
                                  }
                                  className=""
                                >
                                  <Form.Group controlId="formFile">
                                    <Form.Control
                                      type="file"
                                      onChange={this.handleImage}
                                      accept="image/*"
                                      className="p-3"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs={6} md={6} className="mb-2">
                                  <InputGroup>
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Advance "
                                      className="font-1"
                                    >
                                      <Form.Control
                                        name="paid_amount"
                                        value={this.state.paid_amount}
                                        onChange={(e) =>
                                          this.setState({
                                            paid_amount: e.target.value,
                                          })
                                        }
                                        placeholder="Advance Amount"
                                      />
                                    </FloatingLabel>
                                  </InputGroup>
                                </Col>
                                {this.state.payment_mode == "cheque" ? (
                                  <Col xs={12} md={6}>
                                    <InputGroup>
                                      <FloatingLabel
                                        controlId="floatingInput"
                                        label="Cheque #"
                                        className=""
                                      >
                                        <Form.Control
                                          name="cheque_no"
                                          value={this.state.cheque_no}
                                          onChange={(e) =>
                                            this.setState({
                                              cheque_no: e.target.value,
                                            })
                                          }
                                          placeholder="Cheque #"
                                        />
                                      </FloatingLabel>
                                    </InputGroup>
                                  </Col>
                                ) : null}
                              </>
                            ) : null}

                            <Col xs={12} md={12}>
                              <Form.Group className="mb-3 mt-3">
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  placeholder="Write notes..."
                                  value={this.state.notes}
                                  onChange={(e) =>
                                    this.setState({ notes: e.target.value })
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </span>
                      ) : null}

                      {this.state.isLoggedIn ? (
                        <Button
                          variant="primary"
                          className="col-12 rounded mt-4"
                          onClick={this.handlePlaceOrder}
                          disabled={
                            this.state.processing || !this.state.isLoggedIn
                          }
                        >
                          {this.state.processing
                            ? "PROCESSING..."
                            : "PLACE ORDER"}
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="p-1">
          <p className="mb-1
           text-black-50 d-flex justify-content-between mx-2 ">
            {" "}
            <span>Any query ?</span> <span> Please contact us</span>
          </p>
          <p className="mb-1 text-black-50 mx-2 d-flex justify-content-between ">
            <span className="text-primary mb-0 ">support@prakriti.one</span>
            <span className="text-primary mb-0 ">9874445612</span>
          </p>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  items: state.customer.cart.items,
  item_total: state.customer.cart.item_total,
  item_total_display: state.customer.cart.item_total_display,
  total_payable: state.customer.cart.total_payable,
  total_payable_display: state.customer.cart.total_payable_display,
  promocode: state.customer.cart.promocode,
  promocode_discount: state.customer.cart.promocode_discount,
  promocode_discount_display: state.customer.cart.promocode_discount_display,
  original_price: state.customer.cart.original_price,
  total_discount: state.customer.cart.total_discount,
  adrs_actionCalled: state.customer.address.actionCalled,
  adrs_createSuccess: state.customer.address.createSuccess,
  adrs_editSuccess: state.customer.address.editSuccess,
  adrs_deleteSuccess: state.customer.address.deleteSuccess,
  adrs_successMessage: state.customer.address.successMessage,
  adrs_errorMessage: state.customer.address.errorMessage,
  order_actionCalled: state.customer.order.actionCalled,
  order_createSuccess: state.customer.order.createSuccess,
  order_successMessage: state.customer.order.successMessage,
  order_errorMessage: state.customer.order.errorMessage,
  order_id: state.customer.order.order_id,
  retailerList: state.customer.retailer.items,
  salesExecutiveList: state.customer.salesExecutive.items,
  auth: state.auth,
  isLoggedIn: "isLoggedIn" in state.auth ? state.auth.isLoggedIn : false,
  loginError: "loginError" in state.auth ? state.auth.loginError : "",
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators(
    {
      checkoutList,
      CartList,
      OrderCreate,
      AddressCreate,
      retailerList,
      salesExecutiveList,
      login,
      signup,
    },
    dispatch
  ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
);

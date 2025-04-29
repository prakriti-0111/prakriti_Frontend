import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col, Alert } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoginImage from "src/assets/images/login.png";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import withRouter from "src/helpers/withRouter";
import Loader from "./Loader";
import { forgotPassword } from "actions/Customer/auth.actions";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { getLastVisitPage, setLastVisitPage } from "src/helpers/helper";

import jwtDecode from "jwt-decode";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forgotError: this.props.forgotError,
      isLoggedIn: this.props.isLoggedIn,
      formValaues: {
        mobile: "",
        //password: "",
      },
      formErrors: {
        mobile: null,
        //password: null,
      },
      //passwordShow: false,
      //googleBtnTxt: "LOGIN WITH GOOGLE",
    };
  }

  componentDidMount() {
    if (this.state.isLoggedIn) {
      setTimeout(() => {
        this.props.navigate("/");
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};

    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }

    if (props.isLoggedIn !== state.isLoggedIn) {
      update.isLoggedIn = props.isLoggedIn;
    }

    if (props.forgotError !== state.forgotError) {
      update.forgotError = props.forgotError;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (this.state.forgotSuccess) {
      //let lastVisitPage = getLastVisitPage();
      toast.success(this.state.forgotSuccess);
      // setLastVisitPage("");
      // let url = lastVisitPage
      //   ? lastVisitPage.replace(process.env.BASE_URL, "/")
      //   : "/";
      // let startFirstTwo = url.substring(0, 2);
      // url =
      //   startFirstTwo == "//" || startFirstTwo == "///" ? url.substr(1) : url;
      // console.log("url", url);
      // this.props.navigate(url);
      this.props.navigate("/login");
      //window.location.href = process.env.BASE_URL;
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValaues: {
        ...this.state.formValaues,
        [name]: value,
      },
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.formValidate()) {
      this.props.actions.forgotPassword(this.state.formValaues);
    }
  };

  formValidate = () => {
    let formValaues = this.state.formValaues;
    let formErrors = this.state.formErrors;
    let hasErr = false;
    if (!formValaues.mobile) {
      formErrors.mobile = "Mobile # is required.";
      hasErr = true;
    } else {
      formErrors.mobile = null;
    }
    
    this.setState({
      formErrors: formErrors,
    });
    return !hasErr;
  };

  render() {
    const { forgotError, formValaues, formErrors, passwordShow } = this.state;
    console.log("forgotError", forgotError);
    return (
      <div className="login-wrapper pt-0">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="d-none d-sm-block pt-0">
              <div className="login-image shadow">
                <span className="login-pro-inner">
                  {" "}
                  <img
                    src={LoginImage}
                    className="login-profile rounded"
                    alt=""
                  />
                </span>
                <div className="login-header">
                  <h5 className="text-primary">Mission</h5>
                  <p>
                    Ratnavihar is especially known as a wholesaler.Ratnavihar
                    has a distinct identity in the world of Diamond Jewellery,
                    Gemstones and Rudraksha, which is providing its service in
                    many cities in India.{" "}
                  </p>

                  <p>
                    The company has achieved a good footing of growth in a few
                    years. We have endeavoured to provide seamless convenience
                    to our customers, prices displayed are Cash on Delivery and
                    our 100% refund policy is highly appreciated. We
                    continuously strive to expand and make our service more
                    convenient than ever before.
                  </p>

                  <p>
                    My goal is to connect with every small and big city to reach
                    the right things at the right price.
                  </p>
                  <p>
                    {" "}
                    Your suggestion can be helpful for us, we look forward to
                    your suggestion. We are committed to quality and loyalty to
                    our customers.
                  </p>
                  {/* <h5>ABOUT US</h5>
                                <p>Ratanvihar is a trusted name in the world of Gems & Diamond Jewellery dedicated to serving you since 2011 and is an ISO-9001: 2015 Certified Company.
                                Which is famous for gems, rudraksha, and diamond jewellery. We can solve any challenge with ease of our 11 years of working experience and skilled team.
                                A similar ornament can be made based on any photo in a very short period of time for which we have taken the initiative to reach you within 7 week days.
                                We constantly strive to make our services the best for all.
                                Our return policy is very simple and easy to buy and order as compared to other sellers who can create and deliver the piece of jewellery you love.
                                Accuracy is important, so after your order is completely prepared, after checking by the expert - Lab Certified and hallmark certified by BIS and  then provided to you.
                                We have many fans. We are known for our best quality and reasonable price.
                                Our Quality Design / Exchange Policy / Transparency Rating / Best Certified Report / Cash on Delivery & 7 Days 100% Return Guarantee are highly appreciated.
                                The Ratnavihar family thanks you from the bottom of my heart for choosing us and showing faith in me.
Note -: In our place jewellery is made by applying gold, silver and diamond in PLATINIUM. 
                                </p>
                                <h5>Why choose us</h5>
                                <p>Ratnavihar is an ISO - 9001:2015 certified company registered by the Government of MSME, known for high quality and reasonable prices.
                                You can choose us for the best quality, genuineness and cooperative consideration.
                                </p> */}
                </div>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div className="login-form-wrapper shadow">
                <h2 className="text-danger text-center">Forgot Password</h2>
                <hr />
                <span className="h5">Forgot your password?</span>
                {forgotError ? (
                  <Alert variant="danger">{forgotError}</Alert>
                ) : null}
                <form onSubmit={this.onSubmit}>
                  <Form.Group
                    className="mb-4 mt-3"
                    controlId="formEmailAddress"
                  >
                    <Form.Control
                      name="mobile"
                      onChange={(e) => this.handleChange(e)}
                      value={formValaues.mobile}
                      type="text"
                      className="rounded"
                      placeholder="Enter Mobile Number"
                      required
                    />
                    <span type="invalid" style={{ color: "red" }}>
                      {" "}
                      {formErrors.mobile}{" "}
                    </span>
                  </Form.Group>

                  
                  <div className="login-button mb-0 mt-3">
                    <Button variant="primary" type="submit" className="rounded">
                      SEND PASSWORD
                    </Button>
                  </div>
                  <p className="login-text mt-2 mb-2">
                    Already Have an Account?{" "}
                    <a href="/login">Login</a>
                  </p>
                  <hr />
                  <div className="login-button-mob mb-4 mt-0">
                    <Button
                      variant="primary"
                      href="/login"
                      className="rounded"
                    >
                      LOGIN
                    </Button>
                  </div>
                  
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isLoggedIn: "isLoggedIn" in state.auth ? state.auth.isLoggedIn : false,
  forgotError: "forgotError" in state.auth ? state.auth.forgotError : "",
  forgotSuccess: "forgotSuccess" in state.auth ? state.auth.forgotSuccess : "",
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ forgotPassword }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));

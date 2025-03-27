import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoginImage from "src/assets/images/login.png";
import axios from "axios";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Loader from "../../pages/Customer/Loader";
import { bindActionCreators } from "redux";
import { signup } from "actions/Customer/auth.actions";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupErr: this.props.signupErr,
      isLoggedIn: this.props.isLoggedIn,
      formValaues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
      },
      formErrors: {
        name: null,
        email: null,
        mobile: null,
        password: null,
      },
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

    if (props.signupErr !== state.signupErr) {
      update.signupErr = props.signupErr;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.state.isLoggedIn) {
      toast.success("Signup Successfully!");
      this.props.navigate("/");
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
    fetch("http://localhost:8089/signup/customer")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      });
    if (this.formValidate()) {
      this.props.actions.signup(this.state.formValaues);
    }
  };

  formValidate = () => {
    let formValaues = this.state.formValaues;
    let formErrors = this.state.formErrors;
    let hasErr = false;
    if (!formValaues.name) {
      formErrors.name = "Name is required.";
      hasErr = true;
    } else {
      formErrors.name = null;
    }
    if (!formValaues.mobile) {
      formErrors.mobile = "Mobile # is required.";
      hasErr = true;
    } else {
      formErrors.mobile = null;
    }
    if (!formValaues.password) {
      formErrors.password = "Password # is required.";
      hasErr = true;
    } else {
      formErrors.password = null;
    }
    this.setState({
      formErrors: formErrors,
    });
    return !hasErr;
  };

  render() {
    const { signupErr, formValaues, formErrors } = this.state;
    return (
      <div className="login-wrapper p-0">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col xs={12} md={4} className="d-none d-sm-block ">
              <div className="login-image">
                <span className="login-pro-inner rounded">
                  {" "}
                  <img src={LoginImage} className="login-profile" alt="" />
                </span>
                <div className="login-header">
                  <h5>Mission</h5>
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
              <div className="login-form-wrapper">
                <h2 className="text-center text-danger">SignUp</h2>
                <hr />
                {signupErr ? <Alert variant="danger">{signupErr}</Alert> : null}
                <form onSubmit={this.onSubmit}>
                  <div className="row align-items-baseline">
                    <Form.Group
                      className="mb-3  col"
                      controlId="formEmailAddress"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        className="rounded"
                        name="name"
                        onChange={(e) => this.handleChange(e)}
                        value={formValaues.name}
                        type="text"
                        placeholder="Enter your name"
                      />
                      <span type="invalid" style={{ color: "red" }}>
                        {" "}
                        {formErrors.name}{" "}
                      </span>
                    </Form.Group>
                    <Form.Group
                      className="mb-2 col"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        className="rounded"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        value={formValaues.email}
                        type="email"
                        placeholder="Enter your Email"
                      />
                      <span type="invalid" style={{ color: "red" }}>
                        {" "}
                        {formErrors.email}{" "}
                      </span>
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formEmailAddress">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      className="rounded"
                      name="mobile"
                      onChange={(e) => this.handleChange(e)}
                      value={formValaues.mobile}
                      type="text"
                      placeholder="Enter Mobile Number"
                    />
                    <span type="invalid" style={{ color: "red" }}>
                      {" "}
                      {formErrors.mobile}{" "}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="rounded"
                      name="password"
                      onChange={(e) => this.handleChange(e)}
                      value={formValaues.password}
                      type="password"
                      placeholder="Enter Password"
                      autoComplete="new-password"
                    />
                    <span type="invalid" style={{ color: "red" }}>
                      {" "}
                      {formErrors.password}{" "}
                    </span>
                  </Form.Group>
                  <div className="signup-policy-wrapper">
                    <Form.Group
                      className="mt-2 d-flex"
                      controlId="formBasicCheckbox"
                    >
                      <Form.Check type="checkbox" label="" />
                      <span>
                        I accept Prakriti{" "}
                        <a href="/terms-condition" target="_blank">
                          {" "}
                          Terms of Service{" "}
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" target="_blank">
                          {" "}
                          Privacy Policy
                        </a>
                      </span>
                    </Form.Group>
                  </div>
                  <div className="login-button mb-3 mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="rounded "
                    >
                      SIGNUP
                    </Button>
                  </div>
                  <p className="login-text mt-2 mb-2">
                    Already Have an Account? <a href="/login">Login</a>
                  </p>
                  <hr />
                </form>
                <div className="login-button-mob mb-4 mt-0">
                  <Button variant="primary rounded">CREATE ACCOUNT</Button>
                </div>
                <div className="login-footer-button">
                  <Button
                    variant="primary"
                    className="email-btn rounded"
                    href=""
                  >
                    <i class="bi bi-google me-2"></i> SIGNUP WITH GOOGLE
                  </Button>
                  <Button variant="primary" className="fb-btn rounded" href="">
                    <FaFacebookF /> &nbsp; SIGNUP WITH FACEBOOK
                  </Button>
                </div>
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
  signupErr: "signupErr" in state.auth ? state.auth.signupErr : "",
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ signup }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));

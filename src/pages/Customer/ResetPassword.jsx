import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoginImage from "src/assets/images/login.png";
import { connect } from "react-redux";
import withRouter from "src/helpers/withRouter";
import { resetPassword } from "actions/Customer/auth.actions";
import { toast } from "react-toastify";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    // token + email come from the emailed link:
    // /reset-password?token=...&email=...
    const params = new URLSearchParams(props.location.search);

    this.state = {
      token: params.get("token") || "",
      email: params.get("email") || "",
      isLoggedIn: this.props.isLoggedIn,
      resetError: null,
      resetSuccess: null,
      submitting: false,
      formValaues: {
        new_password: "",
        confirm_new_password: "",
      },
      formErrors: {
        new_password: null,
        confirm_new_password: null,
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValaues: {
        ...this.state.formValaues,
        [name]: value,
      },
    });
  };

  formValidate = () => {
    let formValaues = this.state.formValaues;
    let formErrors = { new_password: null, confirm_new_password: null };
    let hasErr = false;

    if (!formValaues.new_password) {
      formErrors.new_password = "New password is required.";
      hasErr = true;
    } else if (formValaues.new_password.length < 8) {
      formErrors.new_password = "Password must be at least 8 characters.";
      hasErr = true;
    }

    if (!formValaues.confirm_new_password) {
      formErrors.confirm_new_password = "Please confirm your new password.";
      hasErr = true;
    } else if (formValaues.new_password !== formValaues.confirm_new_password) {
      formErrors.confirm_new_password =
        "Password and confirm password doesn't match.";
      hasErr = true;
    }

    this.setState({ formErrors: formErrors });
    return !hasErr;
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.formValidate() || this.state.submitting) {
      return;
    }

    this.setState({ submitting: true, resetError: null });

    resetPassword({
      token: this.state.token,
      email: this.state.email,
      ...this.state.formValaues,
    })
      .then((response) => {
        if (response.data.success) {
          this.setState({ resetSuccess: response.data.message });
          toast.success(response.data.message);
          setTimeout(() => this.props.navigate("/login"), 2500);
        } else {
          this.setState({ resetError: response.data.message });
        }
      })
      .catch((err) => {
        let message =
          err && err.response && err.response.data
            ? err.response.data.message
            : null;
        this.setState({
          resetError: message || "Something went wrong. Please try again.",
        });
      })
      .finally(() => this.setState({ submitting: false }));
  };

  render() {
    const {
      token,
      email,
      resetError,
      resetSuccess,
      submitting,
      formValaues,
      formErrors,
    } = this.state;
    const invalidLink = !token || !email;

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
                </div>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div className="login-form-wrapper shadow">
                <h2 className="text-danger text-center">Reset Password</h2>
                <hr />

                {invalidLink ? (
                  <Alert variant="danger">
                    This password reset link is invalid or incomplete. Please
                    request a new one from the{" "}
                    <a href="/forgot-password">Forgot Password</a> page.
                  </Alert>
                ) : (
                  <>
                    <span className="h5">
                      Set a new password for <strong>{email}</strong>.
                    </span>
                    {resetError ? (
                      <Alert variant="danger">{resetError}</Alert>
                    ) : null}
                    {resetSuccess ? (
                      <Alert variant="success">{resetSuccess}</Alert>
                    ) : null}
                    <form onSubmit={this.onSubmit}>
                      <Form.Group className="mb-3 mt-3" controlId="formNewPassword">
                        <Form.Control
                          name="new_password"
                          onChange={(e) => this.handleChange(e)}
                          value={formValaues.new_password}
                          type="password"
                          className="rounded"
                          placeholder="Enter New Password"
                          disabled={!!resetSuccess}
                        />
                        <span type="invalid" style={{ color: "red" }}>
                          {" "}
                          {formErrors.new_password}{" "}
                        </span>
                      </Form.Group>

                      <Form.Group
                        className="mb-4"
                        controlId="formConfirmNewPassword"
                      >
                        <Form.Control
                          name="confirm_new_password"
                          onChange={(e) => this.handleChange(e)}
                          value={formValaues.confirm_new_password}
                          type="password"
                          className="rounded"
                          placeholder="Confirm New Password"
                          disabled={!!resetSuccess}
                        />
                        <span type="invalid" style={{ color: "red" }}>
                          {" "}
                          {formErrors.confirm_new_password}{" "}
                        </span>
                      </Form.Group>

                      <div className="login-button mb-0 mt-3">
                        <Button
                          variant="primary"
                          type="submit"
                          className="rounded"
                          disabled={submitting || !!resetSuccess}
                        >
                          {submitting ? "SAVING..." : "RESET PASSWORD"}
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                <p className="login-text mt-2 mb-2">
                  Already Have an Account? <a href="/login">Login</a>
                </p>
                <hr />
                <div className="login-button-mob mb-4 mt-0">
                  <Button variant="primary" href="/login" className="rounded">
                    LOGIN
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
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword),
);

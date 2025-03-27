import React from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginImage from 'src/assets/images/login.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
const ForgotPassword = () => {
    return (
        <>
            <div className='forgot-password-desktop'>
                <div className='login-header-wrapper create-account-header pb-4 pt-4 d-none d-sm-block'>
                    <Container>
                        <span className='d-flex justify-content-end'>
                            <Button variant="primary">Login</Button>
                        </span>
                    </Container>

                </div>
                <div className='login-wrapper'>
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <div className='login-form-wrapper forgot-wrapper'>
                                    <h2 className='mb-5'><HiArrowNarrowLeft /> Forgot Password <span>Enter Email or phone number, we will verify your details</span></h2>
                                    <Form.Group className="mb-2" controlId="formPhone">
                                        <Form.Control type="text" placeholder="Enter Email or Phone" />
                                    </Form.Group>

                                    <div className='login-button mb-4 mt-4'>
                                        <Button variant="primary">PROCEED</Button>
                                    </div>
                                    <div className='login-button-mob mb-4 mt-0'>
                                        <Button variant="primary">LOGIN</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </div>
            <div className='forgot-password-mobile'>
                <div className='mobile-checkout-header mb-4'>
                    <HiArrowNarrowLeft /> <h3>Forgot Password</h3>
                </div>

                <div className='forgot-wrapper-mobile position-relative'>
                    <div className='login-wrapper'>
                        <Container>
                            <span>Enter Email or phone number, we will verify your details</span>
                            <Form.Group className="mb-2 mt-4" controlId="formPhone">
                                <Form.Control type="text" placeholder="Enter Email or Phone" />
                            </Form.Group>
                            <div className='forget-pass-mob-footer'>
                            <Button variant="primary">PROCEED</Button>
                            </div>
                        </Container>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword
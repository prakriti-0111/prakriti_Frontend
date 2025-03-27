import React from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginImage from 'src/assets/images/login.png';
const CreateAccount = () => {
    return (
        <>
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
                        <Col xs={12} md={8} className='d-none d-sm-block'>
                            <div className='login-image'>
                                <img src={LoginImage} alt='' />
                            </div>

                            <div className='login-header'>
                                <h5>FLAT 40% OFF on Women’s Jewelry on AXIS Bank Debit & Credit Card</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className='login-form-wrapper'>
                                <h2>Create Account <span>Let’s Sign you up</span></h2>
                                <Form.Group className="mb-4 mt-4" controlId="formFullName">
                                    <Form.Control type="name" placeholder="Enter Full Name" />
                                </Form.Group>
                                <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                    <Form.Control type="text" placeholder="Enter Email Address" />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formPhone">
                                    <Form.Control type="text" placeholder="Enter Phone" />
                                </Form.Group>
                                <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter Password" />
                                </Form.Group>
                                <Form.Group className="mb-4 mt-4" controlId="formBasicRePassword">
                                    <Form.Control type="password" placeholder="Retype Password" />
                                </Form.Group>
                                <Form.Group className="mt-2 d-flex justify-content-between forgot-password" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember Me" />
                                    <a href=''>Forgot Password?</a>
                                </Form.Group>

                                <div className='login-button mb-4 mt-4'>
                                    <Button variant="primary">CREATE ACCOUNT</Button>
                                </div>
                                <div className='login-button-mob mb-4 mt-0'>
                                    <Button variant="primary">LOGIN</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>

        </>
    )
}

export default CreateAccount
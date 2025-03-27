import React from 'react'
import { Container } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiArrowNarrowLeft } from "react-icons/hi";
const Contact = () => {
    return (
        <>
            <div className='contact-wrapper'>
                <Container>
                    <div className='breadcrumb-wrapper mb-5'>
                        <Breadcrumb>
                            <Breadcrumb.Item href=''>Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='mobile-checkout-header mb-4'>
                    <HiArrowNarrowLeft /> <h3>Our Vision</h3>
                </div>
                    <Row>
                        <Col xs={12} md={8}>
                            <div className='contact-info'>
                                <h2 className=''>Contact Us</h2>
                                <p>You can contact us on below details or fill the form.</p>
                                <ul>
                                    <li>
                                        <span><IoMdCall /></span>
                                        <span>1800-839-3279, +91-87823826883</span>
                                    </li>
                                    <li>
                                        <span><MdEmail /></span>
                                        <span>info@Prakriti.com</span>
                                    </li>
                                    <li>
                                        <span><FaMapMarkerAlt /></span>
                                        <span>435, Block-2, Mahatma Gandhi
                                            Circle,Phase -5, Sector 65A,
                                            Noida, Gurugram</span>
                                    </li>
                                </ul>
                            </div>

                        </Col>
                        <Col xs={12} md={4}>
                            <div className='contact-form bg-white'>
                                <h2>Fill the form <span>to Contact Us</span></h2>
                                <Form.Group className="mb-4 mt-4" controlId="formName">
                                    <Form.Control type="text" placeholder="Enter your Name" />
                                </Form.Group>
                                <Form.Group className="mb-4 mt-4" controlId="formEmail">
                                    <Form.Control type="password" placeholder="Enter Email" />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter Password" />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3 mt-5"
                                    controlId="exampleForm.ControlTextarea1"
                                >

                                    <Form.Control as="textarea" placeholder='Enter your message' rows={5} />
                                </Form.Group>
                                <div className='login-button mb-4 mt-5'>
                                    <Button variant="primary">SUBMIT</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Contact
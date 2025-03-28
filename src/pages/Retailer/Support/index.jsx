import React from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion';
import { BiSearchAlt2 } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiArrowNarrowLeft } from "react-icons/hi";
const Support = () => {
    return (
        <>
            <div className='support-wrapper'>
                <div className='mobile-checkout-header mb-4'>
                    <HiArrowNarrowLeft /> <h3>Order Summary</h3>
                </div>
                <Container>
                    <div className='support-content'>
                        <h4 className='mb-3'>How can we help you?</h4>
                        <InputGroup className="">
                            <Form.Control
                                placeholder="Search anything for help..."
                                aria-label="Search anything for help..."
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2"><BiSearchAlt2 /></InputGroup.Text>
                        </InputGroup>
                    </div>
                </Container>
            </div>
            <div className='support-contact'>
                <p>For any Queries Conatct Us @ </p>
                <p><FaPhoneAlt /> +91-7827293791 </p>
                <p><MdEmail /> customer.support@prakriti.one </p>
            </div>
            <div className='faq-wrapper'>
                <Container>
                    <div className='faq-header mt-5'>
                        <h4>FAQs</h4>
                    </div>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>What is estimated delivery time?</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What is estimated delivery time?</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>What is estimated delivery time?</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>What is estimated delivery time?</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>What is estimated delivery time?</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
        </>
    )
}

export default Support
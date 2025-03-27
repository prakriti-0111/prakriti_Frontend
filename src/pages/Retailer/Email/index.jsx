import React from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import email from 'src/assets/images/email.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
const Email = () => {
    return (
        <>
        <div className='email-desktop'>
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
                            <div className='login-form-wrapper email-wrapper'>
                            <img src={email} alt='' />
                                <h2 className='mb-5'>Check your Email! <span>We have sent an link to reset password on ******7813 & ravi****@gmal.com.</span></h2>

                                <div className='login-button mb-4 mt-4'>
                                    <Button variant="primary">GO HOME</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            </div>
            <div className='email-mobile'>
            <div className='mobile-checkout-header mb-4'>
                    <HiArrowNarrowLeft /> <h3>Forgot Password</h3>
                </div>
            </div>

        </>
    )
}

export default Email
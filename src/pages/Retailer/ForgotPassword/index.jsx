import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { forgotPasswordSendLink } from 'actions/Retailer/auth.actions';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fieldError, setFieldError] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        if (!email.trim()) {
            setFieldError('Email is required.');
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            setFieldError('Please enter a valid email address.');
            return false;
        }
        setFieldError(null);
        return true;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validate() || submitting) {
            return;
        }

        setSubmitting(true);
        forgotPasswordSendLink({ email: email.trim() })
            .then((response) => {
                if (response.data.success) {
                    setSuccess(response.data.message);
                } else {
                    setError(response.data.message);
                }
            })
            .catch((err) => {
                let message = err && err.response && err.response.data
                    ? err.response.data.message
                    : null;
                setError(message || 'Something went wrong. Please try again.');
            })
            .finally(() => setSubmitting(false));
    }

    /**
     * The desktop and mobile blocks below are the two layouts this page has
     * always shipped with (toggled by the forgot-password-desktop /
     * forgot-password-mobile CSS). Both are wired to the same handler.
     */
    const formFields = (idPrefix) => (
        <>
            {error ? <Alert variant="danger">{error}</Alert> : null}
            {success ? <Alert variant="success">{success}</Alert> : null}
            <Form.Group className="mb-2" controlId={`${idPrefix}Email`}>
                <Form.Control
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Registered Email"
                    disabled={!!success}
                />
                <span type="invalid" style={{ color: "red" }}> {fieldError} </span>
            </Form.Group>
        </>
    );

    return (
        <>
            <div className='forgot-password-desktop'>
                <div className='login-header-wrapper create-account-header pb-4 pt-4 d-none d-sm-block'>
                    <Container>
                        <span className='d-flex justify-content-end'>
                            <Button variant="primary" onClick={() => navigate('/retailer/login')}>Login</Button>
                        </span>
                    </Container>

                </div>
                <div className='login-wrapper'>
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <div className='login-form-wrapper forgot-wrapper'>
                                    <h2 className='mb-5'>
                                        <HiArrowNarrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate('/retailer/login')} />
                                        {' '}Forgot Password <span>Enter your registered email and we'll send you a link to reset your password</span>
                                    </h2>
                                    <form onSubmit={onSubmit}>
                                        {formFields('desktop')}

                                        <div className='login-button mb-4 mt-4'>
                                            <Button variant="primary" type="submit" disabled={submitting || !!success}>
                                                {submitting ? 'SENDING...' : 'PROCEED'}
                                            </Button>
                                        </div>
                                    </form>
                                    <div className='login-button-mob mb-4 mt-0'>
                                        <Button variant="primary" href="/retailer/login">LOGIN</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </div>
            <div className='forgot-password-mobile'>
                <div className='mobile-checkout-header mb-4'>
                    <HiArrowNarrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate('/retailer/login')} /> <h3>Forgot Password</h3>
                </div>

                <div className='forgot-wrapper-mobile position-relative'>
                    <div className='login-wrapper'>
                        <Container>
                            <span>Enter your registered email and we'll send you a link to reset your password</span>
                            <form onSubmit={onSubmit}>
                                <div className="mt-4">
                                    {formFields('mobile')}
                                </div>
                                <div className='forget-pass-mob-footer'>
                                    <Button variant="primary" type="submit" disabled={submitting || !!success}>
                                        {submitting ? 'SENDING...' : 'PROCEED'}
                                    </Button>
                                </div>
                            </form>
                        </Container>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword

import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { resetPassword } from 'actions/Retailer/auth.actions';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // token + email come from the emailed link:
    // /retailer/reset-password?token=...&email=...
    const params = new URLSearchParams(location.search);
    const token = params.get('token') || '';
    const email = params.get('email') || '';

    const [values, setValues] = useState({ new_password: '', confirm_new_password: '' });
    const [formErrors, setFormErrors] = useState({ new_password: null, confirm_new_password: null });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const invalidLink = !token || !email;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    const validate = () => {
        let errors = { new_password: null, confirm_new_password: null };
        let hasErr = false;

        if (!values.new_password) {
            errors.new_password = 'New password is required.';
            hasErr = true;
        } else if (values.new_password.length < 8) {
            errors.new_password = 'Password must be at least 8 characters.';
            hasErr = true;
        }

        if (!values.confirm_new_password) {
            errors.confirm_new_password = 'Please confirm your new password.';
            hasErr = true;
        } else if (values.new_password !== values.confirm_new_password) {
            errors.confirm_new_password = "Password and confirm password doesn't match.";
            hasErr = true;
        }

        setFormErrors(errors);
        return !hasErr;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError(null);

        if (!validate() || submitting) {
            return;
        }

        setSubmitting(true);
        resetPassword({ token, email, ...values })
            .then((response) => {
                if (response.data.success) {
                    setSuccess(response.data.message);
                    setTimeout(() => navigate('/retailer/login'), 2500);
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

    const body = (idPrefix) => {
        if (invalidLink) {
            return (
                <Alert variant="danger">
                    This password reset link is invalid or incomplete. Please request a new one from the
                    {' '}<a href="/retailer/forgot-password">Forgot Password</a> page.
                </Alert>
            );
        }

        return (
            <>
                {error ? <Alert variant="danger">{error}</Alert> : null}
                {success ? <Alert variant="success">{success}</Alert> : null}
                <p className="mb-3">Set a new password for <strong>{email}</strong>.</p>
                <Form.Group className="mb-2" controlId={`${idPrefix}NewPassword`}>
                    <Form.Control
                        name="new_password"
                        type="password"
                        value={values.new_password}
                        onChange={handleChange}
                        placeholder="Enter New Password"
                        disabled={!!success}
                    />
                    <span type="invalid" style={{ color: "red" }}> {formErrors.new_password} </span>
                </Form.Group>
                <Form.Group className="mb-2" controlId={`${idPrefix}ConfirmPassword`}>
                    <Form.Control
                        name="confirm_new_password"
                        type="password"
                        value={values.confirm_new_password}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        disabled={!!success}
                    />
                    <span type="invalid" style={{ color: "red" }}> {formErrors.confirm_new_password} </span>
                </Form.Group>
            </>
        );
    }

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
                                        {' '}Reset Password <span>Choose a new password for your account</span>
                                    </h2>
                                    <form onSubmit={onSubmit}>
                                        {body('desktop')}

                                        {!invalidLink ? (
                                            <div className='login-button mb-4 mt-4'>
                                                <Button variant="primary" type="submit" disabled={submitting || !!success}>
                                                    {submitting ? 'SAVING...' : 'RESET PASSWORD'}
                                                </Button>
                                            </div>
                                        ) : null}
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
                    <HiArrowNarrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate('/retailer/login')} /> <h3>Reset Password</h3>
                </div>

                <div className='forgot-wrapper-mobile position-relative'>
                    <div className='login-wrapper'>
                        <Container>
                            <form onSubmit={onSubmit}>
                                <div className="mt-4">
                                    {body('mobile')}
                                </div>
                                {!invalidLink ? (
                                    <div className='forget-pass-mob-footer'>
                                        <Button variant="primary" type="submit" disabled={submitting || !!success}>
                                            {submitting ? 'SAVING...' : 'RESET PASSWORD'}
                                        </Button>
                                    </div>
                                ) : null}
                            </form>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword

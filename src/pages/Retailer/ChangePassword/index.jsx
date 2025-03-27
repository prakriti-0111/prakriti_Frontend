import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { changePassword } from "actions/Retailer/changePassword.actions";
import { toast } from 'react-toastify';
import { RETAILER_RESET_CHANGE_PASSWORD } from 'actionTypes/Retailer/changePassword.types';

class ChangePassword extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            submitting: false,
            changePass: {
                formValues: {
                    confirm_password: '',
                    old_password: '',
                    new_password: ''
                },
                formErros: {
                    confirm_password: false,
                    old_password: false,
                    new_password: false
                }
            },
            ch_actionCalled: this.props.ch_actionCalled,
            changePasswordSuccess: this.props.changePasswordSuccess,
            ch_successMessage: this.props.ch_successMessage,
            ch_errorMessage: this.props.ch_errorMessage
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
       
        if (props.ch_actionCalled !== state.ch_actionCalled) {
            update.ch_actionCalled = props.ch_actionCalled;
        }
        if (props.changePasswordSuccess !== state.changePasswordSuccess) {
            update.changePasswordSuccess = props.changePasswordSuccess;
        }
        if (props.ch_successMessage !== state.ch_successMessage) {
            update.ch_successMessage = props.ch_successMessage;
        }
        if (props.ch_errorMessage !== state.ch_errorMessage) {
            update.ch_errorMessage = props.ch_errorMessage;
        }
        
        return update;
    }

    handleChange = (e, key) => {
        let changePass = this.state.changePass;
        changePass.formValues[key] = e.target.value;
        this.setState({
            changePass: changePass
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();

        if(this.p_formValidate()){
            let data = {...this.state.changePass.formValues};
            this.props.actions.changePassword(data)
        }
    }

    p_formValidate = () => {
        let changePass = this.state.changePass;
        let formValues = this.state.changePass.formValues;
        let formErros = this.state.changePass.formErros;
        let hasErr = false;
        if(!formValues.confirm_password){
            formErros.confirm_password = true;
            hasErr = true;
        }else{
            formErros.confirm_password = false;
        }
        if(!formValues.old_password){
            formErros.old_password = true;
            hasErr = true;
        }else{
            formErros.old_password = false;
        }
        if(!formValues.new_password){
            formErros.new_password = true;
            hasErr = true;
        }else{
            formErros.new_password = false;
        }
        changePass.formValues = formValues;
        changePass.formErros = formErros;
        this.setState({
            changePass: changePass
        });
        return !hasErr;
    }

    componentDidUpdate(prevProps){
        if(this.state.ch_actionCalled){
            if(this.state.changePasswordSuccess){
                toast.success(this.state.ch_successMessage);
                this.setState({
                    changePass: {
                        formValues: {
                            confirm_password: '',
                            old_password: '',
                            new_password: ''
                        },
                        formErros: {
                            confirm_password: false,
                            old_password: false,
                            new_password: false
                        }
                    }
                })
            }else{
                toast.error(this.state.ch_errorMessage);
            }
            this.props.dispatch({
                type: RETAILER_RESET_CHANGE_PASSWORD
            });
        }
    }


    render() {
        const {changePass} = this.state;
        return (
            <div className='edit-profile-wrapper'>
                <Container>
                    <h2 className='mb-4'>Change Password</h2>
                    <Form onSubmit={this.onSubmit}>
                        <Container>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-4 mt-0" controlId="formEmailAddress">
                                        <Form.Label>Old Password : </Form.Label>
                                        <Form.Control name='old_password'  className={changePass.formErros.old_password ? 'is-invalid' : ''} value={changePass.formValues.old_password} onChange={(e) => this.handleChange(e, 'old_password')} type="password" placeholder="Enter old password" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Old password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-4 " controlId="formBasicPassword">
                                        <Form.Label>New Password : </Form.Label>
                                        <Form.Control name='new_password'  className={changePass.formErros.new_password ? 'is-invalid' : ''} value={changePass.formValues.new_password} onChange={(e) => this.handleChange(e, 'new_password')} type="password" placeholder="Enter new password" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid New password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-4 " controlId="formBasicPassword">
                                        <Form.Label>Confirm Password : </Form.Label>
                                        <Form.Control name='confirm_password'  className={changePass.formErros.confirm_password ? 'is-invalid' : ''} value={changePass.formValues.confirm_password} onChange={(e) => this.handleChange(e, 'confirm_password')} type="password" placeholder="Enter confirm password" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <div className='login-button'>
                            <Button variant="primary" type="submit">SAVE CHANGES</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    ch_actionCalled: state.retailer.changePassword.actionCalled,
    changePasswordSuccess: state.retailer.changePassword.changePasswordSuccess,
    ch_successMessage: state.retailer.changePassword.successMessage,
    ch_errorMessage: state.retailer.changePassword.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ changePassword }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));


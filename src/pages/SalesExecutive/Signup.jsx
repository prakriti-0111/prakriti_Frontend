import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginImage from 'src/assets/images/login.png';
import axios from 'axios';
import withRouter from "helpers/withRouter";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {signup} from "actions/Sales/auth.actions";
import { toast } from 'react-toastify';


class Signup extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            signupErr: this.props.signupErr,
            isLoggedIn: this.props.isLoggedIn,
            formValaues: {
                name: '',
                email: '',
                mobile: '',
                password: ''
            },
            formErrors: {
                name: null,
                email: null,
                mobile: null,
                password: null
            },
        }
    }
  
    componentDidMount() {
        if (this.state.isLoggedIn) {
            setTimeout(() => {
                this.props.navigate("/sales-executive")
            })
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
    
        if(props.auth !== state.auth){
          update.auth = props.auth;
        }
    
        if(props.isLoggedIn !== state.isLoggedIn){
          update.isLoggedIn = props.isLoggedIn;
        }
    
        if(props.signupErr !== state.signupErr){
          update.signupErr = props.signupErr;
        }
    
        return update;
    }
    
    componentDidUpdate(prevProps) {
        if (!prevProps.isLoggedIn && this.state.isLoggedIn) {
            toast.success('Signup Successfully!');
            this.props.navigate('/sales-executive');
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            formValaues: {
                ...this.state.formValaues,
                [name] : value
            }
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if(this.formValidate()){
            this.props.actions.signup(this.state.formValaues)
        }
    }

    formValidate = () => {
        let formValaues = this.state.formValaues;
        let formErrors = this.state.formErrors;
        let hasErr = false;
        if(!formValaues.name){
            formErrors.name = "Name is required.";
            hasErr = true;
        }else{
            formErrors.name = null;
        }
        if(!formValaues.mobile){
            formErrors.mobile = "Mobile # is required.";
            hasErr = true;
        }else{
            formErrors.mobile = null;
        }
        if(!formValaues.password){
            formErrors.password = "Password # is required.";
            hasErr = true;
        }else{
            formErrors.password = null;
        }
        this.setState({
            formErrors: formErrors
        });
        return !hasErr;
    }

    render() {
        const { signupErr, formValaues, formErrors } = this.state;
        return (
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
                                <h2>Sign up <span>Welcome </span></h2>
                                {
                                    signupErr ? 
                                    <Alert variant="danger">
                                        {signupErr}
                                    </Alert>
                                    : null
                                }
                                <form onSubmit={this.onSubmit} >
                                    <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control name='name' onChange={(e)=>this.handleChange(e)} value={formValaues.name} type="text" placeholder="Enter your name"/>
                                        <span type='invalid' style={{color:"red"}}> { formErrors.name } </span>
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name="email" onChange={(e)=>this.handleChange(e)} value={formValaues.email} type="email" placeholder="Enter your Email" />
                                        <span type='invalid' style={{color:"red"}}> { formErrors.email } </span>
                                    </Form.Group>
                                    <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control name='mobile' onChange={(e)=>this.handleChange(e)} value={formValaues.mobile} type="text" placeholder="Enter Mobile Number"/>
                                        <span type='invalid' style={{color:"red"}}> { formErrors.mobile } </span>
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control name="password" onChange={(e)=>this.handleChange(e)} value={formValaues.password} type="password" placeholder="Enter Password" autoComplete="new-password" />
                                        <span type='invalid' style={{color:"red"}}> { formErrors.password } </span>
                                    </Form.Group>

                                    <div className='login-button mb-4 mt-4'>
                                        <Button variant="primary" type="submit">SIGNUP</Button>
                                    </div>
                                </form>
                                <div className='login-button-mob mb-4 mt-0'>
                                    <Button variant="primary">CREATE ACCOUNT</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isLoggedIn: 'isLoggedIn' in state.auth ? state.auth.isLoggedIn : false,
    signupErr: 'signupErr' in state.auth ? state.auth.signupErr : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ signup }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));


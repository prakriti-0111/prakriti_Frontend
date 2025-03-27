import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginImage from 'src/assets/images/login.png';
import axios from 'axios';
import withRouter from "helpers/withRouter";
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {signup} from "actions/Retailer/auth.actions";

const Signup = (props) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth)

    const [successUser,setSuccessUser]=React.useState('')
    const [customerData,setCustomerData]=React.useState({
        name:"",
        email:"",
        mobile:"",
        password:""
    })
    const [ errors, setErrors ] = React.useState({})

    const handleChange=(e)=>{
        const {name,value}=e.target
        setCustomerData({...customerData,[name]:value})
    }

    const validation = (name, value) => {
        switch (name) {
            case 'name':
                if (!value) {
                    return "'Please input name!'"
                } else {
                    return '';
                }
             case 'email':
                if (!value) {
                    return "'Please input email!'"
                } else {
                    return '';
                }
            case 'mobile':
                if (!value) {
                    return "'Please input Mobile!'"
                } else {
                    return '';
                }
            case 'password':
                if (!value) {
                    return "'Please input password!'"
                } else {
                    return '';
                }    
                default: {
                    return null;
                }
    }
    }
    useEffect(()=>{
        if(auth.isLoggedIn===true){
            navigate("/retailer")
                setCustomerData({
                    name:"",
                    email:"",
                    mobile:"",
                    password:""
                })
            setSuccessUser('')
        }else{
            setSuccessUser(auth.loginError)
        }
    },[auth])

    const onSubmit=async()=>{
        let  allErrors={}
        Object.keys(customerData).forEach(key => {
        const error = validation(key, customerData[key])
        if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
        return setErrors(allErrors)
        }
        else{
            props.actions.signup(customerData);

        }
        
    }

    const onMove = ()=>{
        navigate('/retailer/login')
    }
    
    return (
        <>
            <div className='login-header-wrapper pb-4 pt-4 d-none d-sm-block'>
                <Container>
                    <span className='d-flex justify-content-end'>
                        <Button variant="primary" onClick={onMove}>Login</Button>
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
                                <h2>Sign up <span>Welcome </span></h2>
                                <span style={{color:"red"}}>{successUser}</span>
                                <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                    <Form.Control name='name' onChange={(e)=>handleChange(e)} value={customerData.name} type="text" placeholder="Enter your name" required/>
                                    <span type='invalid' style={{color:"red"}}> { errors.name } </span>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Control name="email" onChange={(e)=>handleChange(e)} value={customerData.email} type="email" placeholder="Enter your Email" required />
                                    <span type='invalid' style={{color:"red"}}> { errors.email } </span>
                                </Form.Group>
                                <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                    <Form.Control name='mobile' onChange={(e)=>handleChange(e)} value={customerData.mobile} type="text" placeholder="Enter Mobile Number" required/>
                                    <span type='invalid' style={{color:"red"}}> { errors.mobile } </span>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Control name="password" onChange={(e)=>handleChange(e)} value={customerData.password} type="password" placeholder="Enter Password" required />
                                    <span type='invalid' style={{color:"red"}}> { errors.password } </span>
                                </Form.Group>

                                <div className='login-button mb-4 mt-4'>
                                    <Button variant="primary" onClick={onSubmit}>SIGNUP</Button>
                                </div>
                                <div className='login-button-mob mb-4 mt-0'>
                                    <Button variant="primary">CREATE ACCOUNT</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>

        </>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ signup }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));

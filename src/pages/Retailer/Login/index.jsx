import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoginImage from 'src/assets/images/login.png';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import withRouter from 'src/helpers/withRouter';
import { login } from 'actions/Retailer/auth.actions';
import { toast } from 'react-toastify';

class Login extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            loginError: this.props.loginError,
            isLoggedIn: this.props.isLoggedIn,
            formValaues: {
                mobile: '',
                password: ''
            },
            formErrors: {
                mobile: null,
                password: null
            },
        }
    }
  
    componentDidMount() {
        if (this.state.isLoggedIn) {
            setTimeout(() => {
                this.props.navigate("/retailer")
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
    
        if(props.loginError !== state.loginError){
          update.loginError = props.loginError;
        }
    
        return update;
    }
    
    componentDidUpdate(prevProps) {
        if (!prevProps.isLoggedIn && this.state.isLoggedIn) {
            toast.success('Login Successfully!');
            window.location.href = process.env.BASE_URL + 'retailer';
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
            this.props.actions.login(this.state.formValaues)
        }
    }

    formValidate = () => {
        let formValaues = this.state.formValaues;
        let formErrors = this.state.formErrors;
        let hasErr = false;
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
        const { loginError, formValaues, formErrors } = this.state;
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
                                <h2>Login <span>Welcome Back</span></h2>
                                {
                                    loginError ? 
                                    <Alert variant="danger">
                                        {loginError}
                                    </Alert>
                                    : null
                                }
                                <form onSubmit={this.onSubmit}>
                                    <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                        <Form.Control name='mobile' onChange={(e)=>this.handleChange(e)} value={formValaues.mobile} type="text" placeholder="Enter Mobile Number" required/>
                                        <span type='invalid' style={{color:"red"}}> { formErrors.mobile } </span>
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="formBasicPassword">
                                        <Form.Control name="password" onChange={(e)=>this.handleChange(e)} value={formValaues.password} type="password" placeholder="Enter Password" required />
                                        <span type='invalid' style={{color:"red"}}> { formErrors.password } </span>

                                    </Form.Group>
                                    <Form.Group className="mt-2 d-flex justify-content-between forgot-password" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember Me" />
                                        <a href=''>Forgot Password?</a>
                                    </Form.Group>

                                    <div className='login-button mb-0 mt-4'>
                                        <Button variant="primary" type="submit">LOGIN</Button>
                                    </div>
                                </form>
                                <div className='login-button-mob mb-4 mt-0'>
                                    <Button variant="primary" href="/signup">CREATE ACCOUNT</Button>
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
    loginError: 'loginError' in state.auth ? state.auth.loginError : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));


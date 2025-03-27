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
import { login } from 'actions/Sales/auth.actions';
import { toast } from 'react-toastify';

class Login extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            loginError: this.props.loginError,
            isLoggedIn: this.props.isLoggedIn,
            formValaues: {
                mobile: '',
                password: '',
                lat: '',
                lng: '',
                city: '',
                state: '',
                country: '',
                zipcode: '',
                type: 'login'
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
                this.props.navigate("/sales-executive")
            })
        }

        this.loadLocation();
        
    }

    loadLocation = async() => {
        try {
            let position = await this.fetchCoordinates();

            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let latlng = new google.maps.LatLng(lat, lng);
            let _this = this;
            let geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                let city = '', state = '', country = '', zip = '';
                if (status == google.maps.GeocoderStatus.OK && (results[0])) {
                    zip = results[0].address_components[results[0].address_components.length - 1].long_name;
                    country = results[0].address_components[results[0].address_components.length - 2].long_name;
                    state = results[0].address_components[results[0].address_components.length - 3].long_name;
                    city = results[0].address_components[results[0].address_components.length - 4].long_name;
                }
                _this.setState({
                    formValaues: {
                        ..._this.state.formValaues,
                        city: city,
                        state: state,
                        country: country,
                        zipcode: zip,
                        lat: lat,
                        lng: lng
                    }
                })
            });

        }catch(err){

        }
    }

    fetchCoordinates = async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
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
        if(this.state.isLoggedIn){
            toast.success('Login Successfully!');
            this.props.navigate('/sales-executive');
            //window.location.href = process.env.BASE_URL;
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

    getCurrentAddress = () => {
        let address = [];
        let formValaues = this.state.formValaues;
        if(formValaues.city){
            address.push(formValaues.city);
        }
        if(formValaues.state){
            address.push(formValaues.state);
        }
        if(formValaues.country){
            address.push(formValaues.country);
        }
        if(formValaues.zipcode){
            address.push(formValaues.zipcode);
        }
        return address.join(", ");
    }

    getCurrentDateTime = () => {
        const dt = new Date();
        const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
        let date_str = `${padL(dt.getMonth()+1)}/${padL(dt.getDate())}/${dt.getFullYear()} ${dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;

        return date_str;
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
                                    <Form.Group className="mb-2">
                                        {
                                            (!formValaues.lat || !formValaues.lng) ? 
                                            <Alert variant="danger">
                                                Please allow location permission.
                                            </Alert>
                                            :
                                            <Form.Control value={this.getCurrentAddress()} disabled />
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-0">
                                        <Form.Control value={this.getCurrentDateTime()} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-2 mt-2" controlId="formEmailAddress">
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
                                        <Button variant="primary" type="submit" disabled={(!formValaues.lat || !formValaues.lng)}>LOGIN</Button>
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


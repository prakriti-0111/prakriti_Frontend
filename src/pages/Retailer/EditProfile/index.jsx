import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { AiOutlineCamera } from "react-icons/ai";
import { ProfileUpdate } from "actions/Retailer/profile.actions"
import { toast } from 'react-toastify';
import { RETAILER_RESET_PROFILE } from 'actionTypes/Retailer/profile.types';
import {UPDATE_GLOBAL_AUTH} from 'actionTypes/global.types';
import {isEmpty, toBase64} from 'src/helpers/helper';

class EditProfile extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            auth: this.props.auth,
            submitting: false,
            new_image_url: this.props.new_image_url,
            profile: {
                formValues: {
                    name: this.props.auth.user.name,
                    mobile: this.props.auth.user.mobile,
                    email: this.props.auth.user.email,
                    profile_image: '',
                    imageUrl: this.props.auth.user.image
                },
                formErros: {
                    name: false,
                    mobile: false
                },
            },
            p_actionCalled: this.props.p_actionCalled,
            editProfileSuccess: this.props.editProfileSuccess,
            p_successMessage: this.props.p_successMessage,
            p_errorMessage: this.props.p_errorMessage
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
    
        if (props.new_image_url !== state.new_image_url) {
            update.new_image_url = props.new_image_url;
        }
        if (props.p_actionCalled !== state.p_actionCalled) {
            update.p_actionCalled = props.p_actionCalled;
        }
        if (props.editProfileSuccess !== state.editProfileSuccess) {
            update.editProfileSuccess = props.editProfileSuccess;
        }
        if (props.p_successMessage !== state.p_successMessage) {
            update.p_successMessage = props.p_successMessage;
        }
        if (props.p_errorMessage !== state.p_errorMessage) {
            update.p_errorMessage = props.p_errorMessage;
        }
        
        return update;
    }

    handleChangeImage = (e) => {
        let profile = this.state.profile;
        profile.formValues.profile_image = e.target.files[0];
        profile.formValues.imageUrl = URL.createObjectURL(e.target.files[0]);
        this.setState({
            profile: profile
        })
    }

    handleProfileChange = (e, key) => {
        let profile = this.state.profile;
        profile.formValues[key] = e.target.value;
        this.setState({
            profile: profile
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();

        if(this.p_formValidate()){
            let data = {...this.state.profile.formValues};
            if(!isEmpty(data.profile_image)){
                data.profile_image = await toBase64(data.profile_image);
            }
            this.props.actions.ProfileUpdate(data)
        }
    }

    p_formValidate = () => {
        let profile = this.state.profile;
        let formValues = this.state.profile.formValues;
        let formErros = this.state.profile.formErros;
        let hasErr = false;
        if(!formValues.name){
            formErros.name = true;
            hasErr = true;
        }else{
            formErros.name = false;
        }
        if(!formValues.mobile){
            formErros.mobile = true;
            hasErr = true;
        }else{
            formErros.mobile = false;
        }
        profile.formValues = formValues;
        profile.formErros = formErros;
        this.setState({
            profile: profile
        });
        return !hasErr;
    }

    componentDidUpdate(prevProps){
        if(this.state.p_actionCalled){
            if(this.state.editProfileSuccess){
                toast.success(this.state.p_successMessage);
                this.props.dispatch({
                    type: UPDATE_GLOBAL_AUTH,
                    payload: {
                        name: this.state.profile.formValues.name,
                        mobile: this.state.profile.formValues.mobile,
                        email: this.state.profile.formValues.email,
                        image: this.state.new_image_url
                    }
                });
            }else{
                toast.error(this.state.p_errorMessage);
            }
            this.props.dispatch({
                type: RETAILER_RESET_PROFILE
            });
        }
    }


    render() {
        const {profile} = this.state;
        return (
            <div className='edit-profile-wrapper'>
                <Container>
                    <h2 className='mb-4'>My Account</h2>
                    <div className='edit-profile-picture position-relative mt-5 mt-md-0' style={{backgroundImage : `url(${profile.formValues.imageUrl})`}}>
                        <div className='camera-icon'><label htmlFor='files'><AiOutlineCamera /></label></div>
                        <input type='file' id='files' accept="image/*" onChange={(e) => this.handleChangeImage(e)} style={{ display: "none" }} />
                    </div>
                    <Form onSubmit={this.onSubmit}>
                        <Container>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mt-4" controlId="formBasicPassword">
                                        <Form.Label>Name : </Form.Label>
                                        <Form.Control name='name' value={profile.formValues.name} onChange={(e) => this.handleProfileChange(e, 'name')} type="text" placeholder="Enter Name" className={profile.formErros.name ? 'is-invalid' : ''} />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mt-4" controlId="formBasicPassword">
                                        <Form.Label>Mobile : </Form.Label>
                                        <Form.Control name='mobile' value={profile.formValues.mobile} className={profile.formErros.mobile ? 'is-invalid' : ''} onChange={(e) => this.handleProfileChange(e, 'mobile')} type="text" placeholder="Enter Mobile" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mobile.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                        <Form.Label>Email : </Form.Label>
                                        <Form.Control name='email' value={profile.formValues.email} onChange={(e) => this.handleProfileChange(e, 'email')} type="email" placeholder="Enter Email Address" />
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
    auth: state.auth,
    p_actionCalled: state.retailer.profile.actionCalled,
    editProfileSuccess: state.retailer.profile.editProfileSuccess,
    p_successMessage: state.retailer.profile.successMessage,
    p_errorMessage: state.retailer.profile.errorMessage,
    new_image_url: state.retailer.profile.image_url
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ ProfileUpdate }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));

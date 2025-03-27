import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineLock, AiOutlineCamera } from "react-icons/ai";
import { ProfileUpdate } from "actions/Customer/profile.actions"
import { AddressUpdate, AddressFetch } from "actions/Customer/address.actions";
import { changePassword } from "actions/Customer/changePassword.actions";
import Loader from '../Loader';
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify';

const EditProfile = (props) => {
    const [load, setLoad] = useState(true);
    const profile = useSelector((state) => state.customer.profile)
    const address = useSelector((state) => state.customer.address)
    const change_Password = useSelector((state) => state.customer.changePassword)
    const auth = useSelector((state) => state.auth)
    const [userData, setUserData] = React.useState({
        email: auth.email || '',
        name:  auth.name || '',
        mobile:  auth.mobile || '',
        image:  auth.image || ''
    })
    const [changePassword, setChangePassword] = React.useState({
        old_password: "",
        new_password: "",
        confirm_password: ""
    })
    const [userAddress, setUserAddress] = React.useState({
        name: "",
        landmark: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        contact: "",
        email: "",
        type: ''
    })
    const [apiCall, setApicall] = React.useState({})
    const [validated, setValidated] = React.useState(false);
    const [validatedProfile, setValidatedProfile] = React.useState(false);
    const [validatedPassword, setValidatedPassword] = React.useState(false);
    const [checkAddressCall, setCheckAddressCall] = React.useState({})

    const [errors, setErrors] = React.useState({})
    const [changePasswordErrors, setChangePasswordError] = React.useState({})

    const [userAddressError, setUserAddressError] = React.useState({
        nameError: "",
        lastNameError: "",
        landmarkError: "",
        streetError: "",
        cityError: "",
        stateError: "",
        countryError: "",
        zipcodeError: "",
        contactError: "",
        emailError: "",
        typeError: "",
        err: true
    })
    // const access_token = localStorage.getItem('auth')
    // let user_id=JSON.parse(access_token).user
    let user_id = auth?.user.id
    const handleChange = (e) => {

        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleChangeImage = (e) => {

        const image = URL.createObjectURL(e.target.files[0])
        setUserData({ image: image })
    }
    const handlePasswordChange = (e) => {

        const { name, value } = e.target
        setChangePassword({ ...changePassword, [name]: value })
    }
    const handleAddressChange = (e) => {

        const { name, value } = e.target;
        setUserAddress({ ...userAddress, [name]: value })
    }

    const ValidationForm = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return "'Please input email!'"
                } else {
                    return '';
                }
            case 'name':
                if (!value) {
                    return "'Please input name!'"
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

    const ValidationChangePassword = (name, value) => {
        switch (name) {
            case 'old_password':
                if (!value) {
                    return "'Please input old_password!'"
                } else {
                    return '';
                }
            case 'new_password':
                if (!value) {
                    return "'Please input new_password!'"
                } else {
                    return '';
                }
            case 'confirm_password':
                if (!value) {
                    return "'Please input confirm_password!'"
                } else {
                    return '';
                }
            default: {

                return null;
            }
        }
    }
    const ValidationAddress = () => {
        userAddress.name === '' ? setUserAddressError((prev) => ({ ...prev, err: true, nameError: "please Enter name" })) : setUserAddressError((prev) => ({ ...prev, err: false, nameError: '' }))
        userAddress.lastName === '' ? setUserAddressError((prev) => ({ ...prev, err: true, lastNameError: "please Enter Last name" })) : setUserAddressError((prev) => ({ ...prev, err: false, lastNameError: '' }))
        userAddress.landmark === '' ? setUserAddressError((prev) => ({ ...prev, err: true, landmarkError: "please Enter landmark" })) : setUserAddressError((prev) => ({ ...prev, err: false, landmarkError: '' }))
        userAddress.street === '' ? setUserAddressError((prev) => ({ ...prev, err: true, streetError: "please Enter street adreess" })) : setUserAddressError((prev) => ({ ...prev, err: false, streetError: '' }))
        userAddress.city === '' ? setUserAddressError((prev) => ({ ...prev, err: true, cityError: "please Enter city" })) : setUserAddressError((prev) => ({ ...prev, err: false, cityError: '' }))
        userAddress.state === '' ? setUserAddressError((prev) => ({ ...prev, err: true, stateError: "please Enter state" })) : setUserAddressError((prev) => ({ ...prev, err: false, stateError: '' }))
        userAddress.country === '' ? setUserAddressError((prev) => ({ ...prev, err: true, countryError: "please Enter country" })) : setUserAddressError((prev) => ({ ...prev, err: false, countryError: '' }))
        userAddress.zipcode === '' ? setUserAddressError((prev) => ({ ...prev, err: true, zipcodeError: "please Enter zipcode" })) : setUserAddressError((prev) => ({ ...prev, err: false, zipcodeError: '' }))
        userAddress.contact === '' ? setUserAddressError((prev) => ({ ...prev, err: true, contactError: "please Enter phone" })) : setUserAddressError((prev) => ({ ...prev, err: false, contactError: '' }))
        userAddress.email === '' ? setUserAddressError((prev) => ({ ...prev, err: true, emailError: "please Enter email" })) : setUserAddressError((prev) => ({ ...prev, err: false, emailError: '' }))
        userAddress.type === '' ? setUserAddressError((prev) => ({ ...prev, err: true, typeError: "please Enter type" })) : setUserAddressError((prev) => ({ ...prev, err: false, typeError: '' }))
    }

    useEffect(() => {
        if (profile.editSuccess === true) {
            toast.success(profile.successMessage)
            setValidatedProfile(false)
            setUserData({
                email: "",
                name: "",
                mobile: ""
            })
        } else {

            toast.error(profile.errorMessage)
        }

    }, [profile])

    useEffect(() => {
        if (address.editSuccess === true) {
            toast.success(address.successMessage)
            setValidated(false)
            setUserAddress({
                name: "",
                lastName: "",
                landmark: "",
                street: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
                contact: "",
                email: ""
            })
        } else {

            toast.error(address?.errorMessage)
        }
    }, [address])


    const onSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            setValidatedProfile(true)
            let allErrors = {}
            Object.keys(userData).forEach(key => {
                const error = ValidationForm(key, userData[key])
                if (error && error.length) {
                    allErrors[key] = error
                }

            });
            if (Object.keys(allErrors).length) {
                return setErrors(allErrors)
            }
            else {
                setLoad(false)
                props.actions.ProfileUpdate(userData)
            }
        }
    }

    useEffect(() => {
        if (change_Password.changedPassword) {
            toast.success(change_Password?.successMessage)
            setValidatedPassword(false)
            setChangePassword({
                old_password: "",
                new_password: "",
                confirm_password: ""
            })
        } else {

            toast.error(change_Password?.errorMessage)
        }
    }, [change_Password])

    const onPasswordSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            setValidatedPassword(true)
            let allErrors = {}
            Object.keys(changePassword).forEach(key => {
                const error = ValidationChangePassword(key, changePassword[key])
                if (error && error.length) {
                    allErrors[key] = error
                }
            });
            if (Object.keys(allErrors).length) {
                return setChangePasswordError(allErrors)
            }
            else {
                setLoad(false)
                props.actions.changePassword(changePassword)
            }
        }
    }

    // useEffect(()=>{
    // if(address.getSuccess){
    //     setUserAddress({
    //                 name:address?.items?.name,
    //                 lastName:address?.items?.lastName,
    //                 landmark:address?.items?.landmark,
    //                 street:address?.items?.street,
    //                 city:address?.items.city,
    //                 state:address?.items?.state,
    //                 country:address?.items?.country,
    //                 zipcode:address?.items?.zipcode,
    //                 contact:address?.items?.contact,
    //                 email:address?.items?.email
    //     })
    // }else{
    //     setUserAddress([])
    // }
    // },[address])

    const onAddressSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            setValidated(true)
            ValidationAddress()
            if (!userAddressError.err) {
                setLoad(false)
                props.actions.AddressUpdate(user_id.id, userAddress)
            }
        }
    }
    const fetchUserAddress = async () => {
        setLoad(false)
        props.actions.AddressFetch(user_id.id);
    }

    React.useEffect(() => {
        setLoad(false)
        fetchUserAddress()
    }, [])



    return (
        <>
            {load ? <Loader /> :

                <div className='edit-profile-wrapper'>
                    <Container>
                        <div className='mobile-checkout-header mb-4'>
                            <HiArrowNarrowLeft /> <h3>Edit Profile</h3>
                        </div>
                        <h2 className='mb-4'>My Account</h2>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                            <Row>
                                <Col sm={4} className="acconunt_bg">

                                    <Nav variant="pills" className="flex-column">

                                        <Nav.Item>
                                            <Nav.Link eventKey="profile"> <FaUser /> Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="address"> <FiMapPin /> My Address</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="password"> <AiOutlineLock /> Change Password</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="profile">
                                            <div className='edit-profile-picture position-relative mt-5 mt-md-0'>
                                                <div className='camera-icon'><label htmlFor='files'><AiOutlineCamera /></label></div>
                                                <input type='file' id='files' onChange={(e) => handleChangeImage(e)} style={{ display: "none" }} />
                                            </div>
                                            <Form noValidate validated={validatedProfile}>
                                                <Container>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <Form.Group className="mb-4 mt-4" controlId="formEmailAddress">
                                                                <Form.Label>Email : </Form.Label>
                                                                <Form.Control name='email' value={userData.email} required onChange={(e) => handleChange(e)} type="email" placeholder="Enter Email Address" />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide a valid Email.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
                                                                <Form.Label>Name : </Form.Label>
                                                                <Form.Control name='name' value={userData.name} required onChange={(e) => handleChange(e)} type="text" placeholder="Enter Name" />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide a valid Name.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                                                <Form.Label>Mobile : </Form.Label>
                                                                <Form.Control name='mobile' value={userData.mobile} required onChange={(e) => handleChange(e)} type="text" placeholder="Enter Mobile" />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide a valid Password.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                </Container>




                                                <div className='login-button'>
                                                    <Button variant="primary" onClick={onSubmit}>SAVE CHANGES</Button>
                                                </div>
                                            </Form>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="address">
                                            {/*<Form noValidate validated={validated}>

                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Name : </Form.Label>
                                                            <Form.Control required name='name' value={userAddress.name} onChange={(e) => handleAddressChange(e)} placeholder="Enter your Name*" controlId="validationCustom01" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a name.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Landmark : </Form.Label>
                                                            <Form.Control required name='landmark' value={userAddress.landmark} onChange={(e) => handleAddressChange(e)} placeholder="landmark. *" controlId="validationCustom03" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a landmark, Suite, House No.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Address : </Form.Label>
                                                            <Form.Control required name='street' value={userAddress.street} onChange={(e) => handleAddressChange(e)} placeholder="Street Address*" controlId="validationCustom04" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Street Address.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>City : </Form.Label>
                                                            <Form.Control required name='city' value={userAddress.city} onChange={(e) => handleAddressChange(e)} placeholder="Town/ City*" controlId="validationCustom05" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Town/city.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>State : </Form.Label>
                                                            <Form.Control required name='state' value={userAddress.state} onChange={(e) => handleAddressChange(e)} placeholder="state*" controlId="validationCustom06" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a state.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Country : </Form.Label>
                                                            <Form.Control required name='country' value={userAddress.country} onChange={(e) => handleAddressChange(e)} placeholder="country **" controlId="validationCustom07" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a country.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Pin Code : </Form.Label>
                                                            <Form.Control required name='zipcode' value={userAddress.zipcode} onChange={(e) => handleAddressChange(e)} placeholder="PIN Code*" controlId="validationCustom08" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Pin code.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Mobile : </Form.Label>
                                                            <Form.Control required name='contact' value={userAddress.contact} onChange={(e) => handleAddressChange(e)} placeholder="Phone Number*" controlId="validationCustom09" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid mobile Number.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Email : </Form.Label>
                                                            <Form.Control required name='email' value={userAddress.email} onChange={(e) => handleAddressChange(e)} placeholder="Email Address" controlId="validationCustom010" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a Valid Email.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label>Choose Type : </Form.Label>
                                                            <Form.Select name='type' required value={userAddress.type} onChange={(e) => handleAddressChange(e)} aria-label="Default select example" controlId="validationCustom11">
                                                                <option>Select type</option>
                                                                <option value="Office">Office</option>
                                                                <option value="Home">Home</option>
                                                                <option value="Other">Other</option>
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a type.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>










                                                <div className='login-button '>
                                                    <Button variant="primary" onClick={onAddressSubmit}>SAVE & CONTINUE</Button>
                                                </div>
                                            </Form>*/}
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="password">
                                            {/*<Form noValidate validated={validatedPassword}>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4 mt-0" controlId="formEmailAddress">
                                                            <Form.Label>Old Password : </Form.Label>
                                                            <Form.Control name='old_password' required value={changePassword.old_password} onChange={(e) => handlePasswordChange(e)} type="password" placeholder="Enter old password" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Old password.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4 " controlId="formBasicPassword">
                                                            <Form.Label>New Password : </Form.Label>
                                                            <Form.Control name='new_password' required value={changePassword.new_password} onChange={(e) => handlePasswordChange(e)} type="password" placeholder="Enter new password" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid New password.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <Form.Group className="mb-4 " controlId="formBasicPassword">
                                                            <Form.Label>Confirm Password : </Form.Label>
                                                            <Form.Control name='confirm_password' required value={changePassword.confirm_password} onChange={(e) => handlePasswordChange(e)} type="password" placeholder="Enter confirm password" />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please provide a valid Confirm password.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <div className='login-button'>
                                                    <Button variant="primary" onClick={onPasswordSubmit}>SAVE CHANGES</Button>
                                                </div>
                                        </Form>*/}
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                </div>

            }

        </>
    )
}

const mapStateToProps = (state) => ({
    actionCalled: state.customer.profile.actionCalled,
    createSuccess: state.customer.profile.createSuccess,
    editSuccess: state.customer.profile.editSuccess,
    successMessage: state.customer.profile.successMessage,
    errorMessage: state.customer.profile.errorMessage,
    //--------------------Address---------
    itemsAddress: state.customer.address.items,
    totalAddress: state.customer.address.total,
    actionCalledAddress: state.customer.address.actionCalled,
    createSuccessAddress: state.customer.address.createSuccess,
    editSuccessAddress: state.customer.address.editSuccess,
    deleteSuccessAddress: state.customer.address.deleteSuccess,
    successMessageAddress: state.customer.address.successMessage,
    errorMessageAddress: state.customer.address.errorMessage
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ ProfileUpdate, AddressUpdate, AddressFetch, changePassword }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));

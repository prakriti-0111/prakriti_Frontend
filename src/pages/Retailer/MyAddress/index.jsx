import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal  from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { AddressUpdate, AddressList, AddressDelete, AddressCreate } from "actions/Retailer/address.actions";
import { toast } from 'react-toastify';
import { RETAILER_ADDRESS_RESET } from 'actionTypes/Retailer/address.types';
import Autocomplete from "react-google-autocomplete";

class MyAddress extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            processing: false,
            addressList: this.props.addressList,
            addressListTotal: this.props.addressListTotal,
            addrs_queryParams: {
                page: 1,
                limit: 15
            },
            adrs_actionCalled: this.props.adrs_actionCalled,
            adrs_createSuccess: this.props.adrs_createSuccess,
            adrs_editSuccess: this.props.adrs_editSuccess,
            adrs_deleteSuccess: this.props.adrs_deleteSuccess,
            adrs_successMessage: this.props.adrs_successMessage,
            adrs_errorMessage: this.props.adrs_errorMessage,
            showDialog: false,
            modalTitle: '',
            isEdit: false,
            actionRow: null,
            deleteDialog: false,
            ...this.defaultFormValues()
        }

        this.address_ref = React.createRef();
    }

    componentDidMount(){
        this.loadListData();
    }

    loadListData = () => {
        this.props.actions.AddressList(this.state.addrs_queryParams);
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
       
        if (props.addressList !== state.addressList) {
            update.addressList = props.addressList;
        }
        if (props.addressListTotal !== state.addressListTotal) {
            update.addressListTotal = props.addressListTotal;
        }
        if (props.adrs_actionCalled !== state.adrs_actionCalled) {
            update.adrs_actionCalled = props.adrs_actionCalled;
        }
        if (props.adrs_createSuccess !== state.adrs_createSuccess) {
            update.adrs_createSuccess = props.adrs_createSuccess;
        }
        if (props.adrs_editSuccess !== state.adrs_editSuccess) {
            update.adrs_editSuccess = props.adrs_editSuccess;
        }
        if (props.adrs_deleteSuccess !== state.adrs_deleteSuccess) {
            update.adrs_deleteSuccess = props.adrs_deleteSuccess;
        }
        if (props.adrs_successMessage !== state.adrs_successMessage) {
            update.adrs_successMessage = props.adrs_successMessage;
        }
        if (props.adrs_errorMessage !== state.adrs_errorMessage) {
            update.adrs_errorMessage = props.adrs_errorMessage;
        }
        
        return update;
    }

    handleChange = (e, key) => {
        let address = this.state.address;
        address.formValues[key] = e.target.value;
        this.setState({
            address: address
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();

        if(this.p_formValidate()){
            let data = {...this.state.address.formValues};
            if(this.state.isEdit){
                this.props.actions.AddressUpdate(this.state.actionRow.id, data);
            }else{
                this.props.actions.AddressCreate(data);
            }
            
        }
    }

    p_formValidate = () => {
        let address = this.state.address;
        let formValues = this.state.address.formValues;
        let formErros = this.state.address.formErros;
        let hasErr = false;
        if(!this.state.isEdit){
            if(!formValues.address){
                formErros.address = true;
                hasErr = true;
            }else{
                formErros.address = false;
            }
        }
        if(!formValues.name){
            formErros.name = true;
            hasErr = true;
        }else{
            formErros.name = false;
        }
        if(!formValues.contact){
            formErros.contact = true;
            hasErr = true;
        }else{
            formErros.contact = false;
        }
        if(!formValues.street){
            formErros.street = true;
            hasErr = true;
        }else{
            formErros.street = false;
        }
        if(!formValues.city){
            formErros.city = true;
            hasErr = true;
        }else{
            formErros.city = false;
        }
        if(!formValues.state){
            formErros.state = true;
            hasErr = true;
        }else{
            formErros.state = false;
        }
        if(!formValues.country){
            formErros.country = true;
            hasErr = true;
        }else{
            formErros.country = false;
        }
        if(!formValues.landmark){
            formErros.landmark = true;
            hasErr = true;
        }else{
            formErros.landmark = false;
        }
        if(!formValues.zipcode){
            formErros.zipcode = true;
            hasErr = true;
        }else{
            formErros.zipcode = false;
        }
        if(!formValues.type){
            formErros.type = true;
            hasErr = true;
        }else{
            formErros.type = false;
        }
        address.formValues = formValues;
        address.formErros = formErros;
        this.setState({
            address: address
        });
        return !hasErr;
    }

    defaultFormValues = () => {
        return {
            address: {
                formValues: {
                    address: "",
                    name: "",
                    landmark: "",
                    street: "",
                    city: "",
                    state: "",
                    country: "",
                    zipcode: "",
                    contact: "",
                    email: "",
                    type: '',
                    lat: '',
                    lng: ''
                },
                formErros: {
                    name: false,
                    landmark: false,
                    street: false,
                    city: false,
                    state: false,
                    country: false,
                    zipcode: false,
                    contact: false,
                    email: false,
                    type: false,
                    address: false
                }
            }
        }
    }

    handleDeleteClose = () => {

    }

    componentDidUpdate(prevProps){
        if(this.state.adrs_actionCalled){
            if(this.state.deleteDialog){
                if(this.state.adrs_deleteSuccess){
                    toast.success(this.state.adrs_successMessage);
                    this.setState({
                        deleteDialog: false
                    });
                    this.loadListData();
                }else{
                    toast.error(this.state.adrs_errorMessage);
                }
            }else{
                if(this.state.isEdit){
                    if(this.state.adrs_editSuccess){
                        toast.success(this.state.adrs_successMessage);
                        this.setState({
                            ...this.defaultFormValues(),
                            showDialog: false,
                            processing: false
                        });
                        this.loadListData();
                    }else{
                        toast.error(this.state.adrs_errorMessage);
                        this.setState({
                            processing: false
                        })
                    }
                }else{
                    if(this.state.adrs_createSuccess){
                        toast.success(this.state.adrs_successMessage);
                        this.setState({
                            ...this.defaultFormValues(),
                            showDialog: false,
                            processing: false
                        });
                        this.loadListData();
                    }else{
                        toast.error(this.state.adrs_errorMessage);
                        this.setState({
                            processing: false
                        })
                    }
                }
            }
            this.props.dispatch({
                type: RETAILER_ADDRESS_RESET
            });
        }
    }

    hanldeEdit = (item) => {
        this.setState({
            address: {
                formValues: {
                    address: "",
                    name: item.name,
                    landmark: item.landmark,
                    street: item.street,
                    city: item.city,
                    state: item.state,
                    country: item.country,
                    zipcode: item.zipcode,
                    contact: item.contact,
                    type: item.type,
                    lat: item.lat,
                    lng: item.lng
                },
                formErros: {
                    name: false,
                    landmark: false,
                    street: false,
                    city: false,
                    state: false,
                    country: false,
                    zipcode: false,
                    contact: false,
                    email: false,
                    type: false,
                    address: false
                }
            },
            showDialog: true,
            isEdit: true,
            modalTitle: 'Edit Address',
            actionRow: item
        })
    }

    hanldeDelete = (item) => {
        this.setState({
            deleteDialog: true,
            actionRow: item
        })
    }

    hanldeAddNew = () => {
        this.setState({
            showDialog: true,
            modalTitle: 'Add New Address',
            isEdit: false
        })
    }

    handleClose = () => {
        this.setState({
            showDialog: false
        })
    }

    onPlaceSelected = (place) => {
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        var latlng = new google.maps.LatLng(latitude, longitude);
        var geocoder = geocoder = new google.maps.Geocoder();
        let _this = this;
        geocoder.geocode({ 'latLng': latlng },  (results, status) => {
            let city = '', state = '', country = '', zip = '';
            if (status == google.maps.GeocoderStatus.OK && (results[0])) {
                zip = results[0].address_components[results[0].address_components.length - 1].long_name;
                country = results[0].address_components[results[0].address_components.length - 2].long_name;
                state = results[0].address_components[results[0].address_components.length - 3].long_name;
                city = results[0].address_components[results[0].address_components.length - 4].long_name;
            }
            let address_input = document.getElementById('address_input');
            let address = _this.state.address;
            address.formValues['city'] = city;
            address.formValues['state'] = state;
            address.formValues['country'] = country;
            address.formValues['zipcode'] = zip;
            address.formValues['lat'] = latitude;
            address.formValues['lng'] = longitude;
            address.formValues['address'] = address_input.value;
            _this.setState({
                address: address
            })
        });
    }

    handleDeleteClose = () => {
        this.setState({
            deleteDialog: false,
            actionRow: null
        })
    }

    hanldeDeleteSumit = () => {
        this.props.actions.AddressDelete(this.state.actionRow.id);
    }

    render() {
        console.log(this.state)
        const {addressList, address} = this.state;
        return (
            <div className='edit-profile-wrapper'>
                <Container>
                    <h2 className='mb-4'>My Address <Button variant="primary" onClick={(e) => this.hanldeAddNew()}>Add New</Button></h2>
                    <Form onSubmit={this.onSubmit}>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>Street</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Zip</th>
                                                <th>Country</th>
                                                <th>Landmark</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                addressList.length == 0 ?
                                                <tr>
                                                    <td colSpan={9}> <p className='text-center'>No address found.</p></td>
                                                </tr>
                                                :
                                                <>
                                                    {
                                                        addressList.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.contact}</td>
                                                                <td>{item.street}</td>
                                                                <td>{item.city}</td>
                                                                <td>{item.state}</td>
                                                                <td>{item.zipcode}</td>
                                                                <td>{item.country}</td>
                                                                <td>{item.landmark}</td>
                                                                <td>
                                                                    <Button variant="primary" onClick={(e) => this.hanldeEdit(item)}>Edit</Button>
                                                                    &nbsp;
                                                                    <Button variant="danger" onClick={(e) => this.hanldeDelete(item)}>Delete</Button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </>
                                            }
                                            <tr>

                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                
                            </Row>
                        </Container>
                    </Form>

                    <Modal
                        show={this.state.showDialog}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Form.Group>
                                        <Form.Label>Address : </Form.Label>
                                        <Autocomplete
                                            apiKey={"AIzaSyDQJx-KDJUimSyyVUwOBRrrzTG22-rvz18"}
                                            onPlaceSelected={this.onPlaceSelected}
                                            className={"form-control" + (address.formErros.address ? ' is-invalid' : '')}
                                            id="address_input"
                                        />
                                        
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Address.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Name : </Form.Label>
                                        <Form.Control className={address.formErros.name ? 'is-invalid' : ''} name='name' value={address.formValues.name} onChange={(e) => this.handleChange(e, 'name')} placeholder="Enter your Name*" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Mobile : </Form.Label>
                                        <Form.Control className={address.formErros.contact ? 'is-invalid' : ''} name='contact' value={address.formValues.contact} onChange={(e) => this.handleChange(e, 'contact')} placeholder="Phone Number*"  />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mobile Number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Street : </Form.Label>
                                        <Form.Control className={address.formErros.street ? 'is-invalid' : ''} name='street' value={address.formValues.street} onChange={(e) => this.handleChange(e, 'street')} placeholder="Street Address*" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Street Address.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>City : </Form.Label>
                                        <Form.Control className={address.formErros.city ? 'is-invalid' : ''} name='city' value={address.formValues.city} onChange={(e) => this.handleChange(e, 'city')} placeholder="Town/ City*"  />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Town/city.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>State : </Form.Label>
                                        <Form.Control className={address.formErros.state ? 'is-invalid' : ''} name='state' value={address.formValues.state} onChange={(e) => this.handleChange(e, 'state')} placeholder="state*"  />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a state.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Country : </Form.Label>
                                        <Form.Control className={address.formErros.country ? 'is-invalid' : ''} name='country' value={address.formValues.country} onChange={(e) => this.handleChange(e, 'country')} placeholder="country **" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a country.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Pin Code : </Form.Label>
                                        <Form.Control className={address.formErros.zipcode ? 'is-invalid' : ''} name='zipcode' value={address.formValues.zipcode} onChange={(e) => this.handleChange(e, 'zipcode')} placeholder="PIN Code*" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Pin code.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Landmark : </Form.Label>
                                        <Form.Control className={address.formErros.landmark ? 'is-invalid' : ''} name='landmark' value={address.formValues.landmark} onChange={(e) => this.handleChange(e, 'landmark')} placeholder="landmark. *" />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a landmark, Suite, House No.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Address Type : </Form.Label>
                                        <Form.Select name='type' className={address.formErros.type ? 'is-invalid' : ''} value={address.formValues.type} onChange={(e) => this.handleChange(e, 'type')} aria-label="Default select example">
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
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onSubmit}>Save</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.deleteDialog} onHide={this.handleDeleteClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure want delete this address?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.hanldeDeleteSumit}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    addressList: state.retailer.address.items,
    addressListTotal: state.retailer.address.total,
    adrs_actionCalled: state.retailer.address.actionCalled,
    adrs_createSuccess: state.retailer.address.createSuccess,
    adrs_editSuccess: state.retailer.address.editSuccess,
    adrs_deleteSuccess: state.retailer.address.deleteSuccess,
    adrs_successMessage: state.retailer.address.successMessage,
    adrs_errorMessage: state.retailer.address.errorMessage
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ AddressDelete, AddressList, AddressUpdate, AddressCreate }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAddress));


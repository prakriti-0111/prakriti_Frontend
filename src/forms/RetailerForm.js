import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import {isEmpty, toBase64} from 'src/helpers/helper';
import {Container, Button, Spinner, Row, Col, Form, ButtonToolbar} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import withRouter from 'src/helpers/withRouter';
import {CUSTOMER_RESET_RETAILER} from 'actionTypes/Customer/retailer.types';
import { retailerCreate, retailerUpdate } from 'actions/Customer/retailer.actions';
import _ from 'lodash';
import FilePreview from 'src/utils/FilePreview';
import noImage from 'src/assets/images/no_image.jpg';
import { getCountries, getStates, getDistricts } from "actions/Customer/address.actions";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getNextUserName } from "actions/Customer/home.actions";


class RetailerForm extends React.Component {

    constructor(props) {
        super(props);

        let formData = 'formData' in this.props ? this.props.formData : null;
        this.state = {
			auth: this.props.auth,
            formData: formData,
            isCreateFrom: !formData,
            countryList: [],
            stateList: [],
            p_stateList: [],
            districtList: [],
            submitting: false,
            formValues: {
                name: '',
                email: '',
                mobile: '',
                adhar: '',
                pan: '',
                address: '',
                city: '',
                pincode: '',
                district_id: '',
                state_id: '',
                country_id: '',
                p_address: '',
                p_city: '',
                p_pincode: '',
                p_district_id: '',
                p_state_id: '',
                p_country_id: '',
                company_name: '',
                gst: '',
                bank_name: '',
                branch_name: '',
                bank_account_no: '',
                bank_ifsc: '',
                status: true,
                landmark: '',
                user_name: '',
                password: ''
            },
            formErros: {
                name: false,
                email: false,
                mobile: false,
                adhar: false,
                pan: false,
                address: false,
                city: false,
                pincode: false,
                district_id: false,
                state_id: false,
                country_id: false,
                p_address: false,
                p_city: false,
                p_pincode: false,
                p_district_id: false,
                p_state_id: false,
                p_country_id: false,
                company_name: false,
                gst: false,
                bank_name: false,
                branch_name: false,
                bank_account_no: false,
                bank_ifsc: false,
                landmark: false,
                password: false,
            },
            actionCalled: this.props.actionCalled,
            createSuccess: this.props.createSuccess,
            editSuccess: this.props.editSuccess,
            successMessage: this.props.successMessage,
            errorMessage: this.props.errorMessage,

            profile_image: null,
            pan_image: null,
            adhar_image: null,
            company_logo: null,
            documents: [],

            existing_profile_image: null,
            existing_pan_image: null,
            existing_adhar_image: null,
            existing_company_logo: null,
            existing_documents: [],

            remove_profile_image: false,
            remove_pan_image: false,
            remove_adhar_image: false,
            remove_company_logo: false,
            remove_documents: []
        }
        
        this.profile_imageRef = React.createRef();
        this.pan_imageRef = React.createRef();
        this.adhar_imageRef = React.createRef();
        this.company_logoRef = React.createRef();
        this.documentRef = React.createRef();
    }

    componentDidMount(){
        this.loadCountryList();
        if (this.state.formData) {
          this.initializeFormData();
        }else{
            this.loadUserName('')
        }
        
    }

    loadCountryList = async () => {
        const res = await getCountries();
        if (res.data.success) {
            this.setState({
                countryList: res.data.data
            })
        }
    }

    loadUserName = async(id) => {
        let res = await getNextUserName();
        if(res.data.success){
            this.setState({
                formValues: {
                    ...this.state.formValues,
                    user_name: res.data.data
                }
            })
        }
    }
    
    initializeFormData(){
        if(this.state.formData){
            let formValues = this.state.formValues;
            _.each(this.state.formData, function(value, index) {
                if (index in formValues) {
                    formValues[index] = value;
                }
            });

            this.setState({
                formValues: formValues,
                existing_profile_image: this.state.formData.profile_image,
                existing_pan_image: this.state.formData.pan_image,
                existing_adhar_image: this.state.formData.adhar_image,
                existing_company_logo: this.state.formData.company_logo,
                existing_documents: this.state.formData.documents,
            }, () => {
                if(!formValues.user_name){
                    this.loadUserName(formValues.id)
                }
            });

            
            this.loadSelectList(formValues);
        }
    }

    loadSelectList = async(formValues) => {
        let response = await getStates({all: 1, country_id: formValues.country_id});
        if(response.data.success){
            this.setState({
                stateList: response.data.data
            });
        }

        let response3 = await getDistricts({all: 1, state_id: formValues.state_id});
        if(response3.data.success){
            this.setState({
                districtList: response3.data.data
            });
        }
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        
        if (props.formData !== state.formData) {
            update.formData = props.formData;
        }
        if(props.actionCalled !== state.actionCalled){
            update.actionCalled = props.actionCalled;
        }
        if(props.createSuccess !== state.createSuccess){
            update.createSuccess = props.createSuccess;
        }
        if(props.editSuccess !== state.editSuccess){
            update.editSuccess = props.editSuccess;
        }
        if(props.successMessage !== state.successMessage){
            update.successMessage = props.successMessage;
        }
        if(props.errorMessage !== state.errorMessage){
            update.errorMessage = props.errorMessage;
        }
        return update;
    }

    componentDidUpdate(prevProps){
        if (this.props.formData != prevProps.formData) {
            this.initializeFormData();
        }


        if(this.state.actionCalled){
            if(this.state.isCreateFrom){
                if(this.state.createSuccess){
                    toast.success(this.state.successMessage);
                    this.props.dispatch({
                        type: CUSTOMER_RESET_RETAILER
                    });
                    this.props.navigate("/checkout?new_created=1");
                }else{
                    this.setState({
                        submitting: false
                    })
                    toast.error(this.state.errorMessage);
                    this.props.dispatch({
                        type: CUSTOMER_RESET_RETAILER
                    });
                }
            }else{
                if(this.state.editSuccess){
                    toast.success(this.state.successMessage);
                    this.props.dispatch({
                        type: CUSTOMER_RESET_RETAILER
                    });
                    this.props.navigate(-1);
                }else{
                    this.setState({
                        submitting: false
                    })
                    toast.error(this.state.errorMessage);
                    this.props.dispatch({
                        type: CUSTOMER_RESET_RETAILER
                    });
                }
            }
        }
    }

    handleDefaultChange = (event, key) => {
        this.updateFormValues(event.target.value, key);
    }

    updateFormValues = (val, key) => {
        let formValues = this.state.formValues;
        formValues[key] = val;
        this.setState({
            formValues: formValues
        })
    }

    handleSubmit = async () => {
        let hasErr = this.formValidate();
        if(!hasErr){
            this.setState({
                submitting: true
            });

            let postData = {...this.state.formValues};
            if(this.state.profile_image){
                postData.profile_image = await toBase64(this.state.profile_image);
            }
            if(this.state.pan_image){
                postData.pan_image = await toBase64(this.state.pan_image);
            }
            if(this.state.adhar_image){
                postData.adhar_image = await toBase64(this.state.adhar_image);
            }
            if(this.state.company_logo){
                postData.company_logo = await toBase64(this.state.company_logo);
            }
            postData.remove_profile_image = this.state.remove_profile_image;
            postData.remove_pan_image = this.state.remove_pan_image;
            postData.remove_adhar_image = this.state.remove_adhar_image;
            postData.remove_company_logo = this.state.remove_company_logo;

            let thisDocuments = [...this.state.documents];
            for (let i = 0; i < thisDocuments.length; i++) {
                thisDocuments[i] = await toBase64(thisDocuments[i]);
            }
            postData.documents = thisDocuments;
            postData.remove_documents = this.state.remove_documents;

            if(this.state.isCreateFrom){
                this.props.actions.retailerCreate(postData);
            }else{
                this.props.actions.retailerUpdate(this.state.formData.id, postData);
            }
        }
    }

    formValidate = () => {
        let formErros = this.state.formErros;
        let formValues = this.state.formValues;
        let hasErr = false;
        if(isEmpty(formValues.name)){
            formErros.name = true;
            hasErr = true;
        }else{
            formErros.name = false;
        }
        if(isEmpty(formValues.mobile)){
            formErros.mobile = true;
            hasErr = true;
        }else{
            formErros.mobile = false;
        }
        if(this.state.isCreateFrom){
            if(isEmpty(formValues.password)){
                formErros.password = true;
                hasErr = true;
            }else{
                formErros.password = false;
            }
        }
        if(isEmpty(formValues.country_id)){
            formErros.country_id = true;
            hasErr = true;
        }else{
            formErros.country_id = false;
        }
        if(isEmpty(formValues.state_id)){
            formErros.state_id = true;
            hasErr = true;
        }else{
            formErros.state_id = false;
        }

        if(isEmpty(formValues.company_name)){
            formErros.company_name = true;
            hasErr = true;
        }else{
            formErros.company_name = false;
        }
        if(isEmpty(formValues.address)){
            formErros.address = true;
            hasErr = true;
        }else{
            formErros.address = false;
        }
        
        this.setState({
            formErros: formErros
        });
        return hasErr;
    }

    handleStateChange = async(e, key) => {
        this.handleDefaultChange(e, 'state_id');
        this.updateFormValues('', 'district_id');
        let response = await getDistricts({all: 1, state_id: e.target.value});
        if(response.data.success){
            this.setState({
                districtList: response.data.data
            });

        }
    }

    onImageChange = (e, key) => {
        let existingKey = 'existing_' + key;
        this.setState({
            [key]: e.target.files[0],
            [existingKey]: null
        });
        let refName = key + 'Ref';
        if (this[refName]) {
            this[refName].current.value = null;
        }
    }

    deleteExistingImage = (key) => {
        let removeKey = 'remove_' + key;
        let existingKey = 'existing_' + key;
        this.setState({
            [existingKey]: null,
            [removeKey] : true
        });
    }

    deleteImage = (key) => {
        this.setState({
            [key]: null
        });
    }

    getImageSrc = (item) => {
        return URL.createObjectURL(item);
    }

    handleCountryChange = async(e) => {
        this.handleDefaultChange(e, 'country_id');
        this.updateFormValues('', 'state_id');
        this.updateFormValues('', 'district_id');
        this.setState({
            districtList: []
        });
        let response = await getStates({all: 1, country_id: e.target.value});
        if(response.data.success){
            this.setState({
                stateList: response.data.data
            });
        }
    }

    onDocumentChange = (e) => {
        let documents = this.state.documents;
        let totalDoc = this.state.existing_documents.length + documents.length + e.target.files.length;
        if (totalDoc > 10) {
            toast.error('Maximum 5 document are allowed.');
            return;
        }
        for(let i = 0; i < e.target.files.length; i++){
            documents.push(e.target.files[i]);
        }
        
        this.setState({
            documents: documents
        });
    
        if (this.documentRef) {
          this.documentRef.current.value = null;
        }
    
    }
    
    deleteDocument = (i) => {
        let documents = this.state.documents;
        documents.splice(i, 1);
        this.setState({
            documents: documents
        })
        if (this.documentRef) {
          this.documentRef.current.value = null;
        }
    
    }

    deleteExistingDocument = (index) => {
        let remove_documents = this.state.remove_documents;
        let existing_documents = this.state.existing_documents;
        remove_documents.push(existing_documents[index]);
        existing_documents.splice(index, 1);
        this.setState({
            remove_documents: remove_documents,
            existing_documents: existing_documents
        })
    }

    getAllDocuments = (isSingle) => {
        let arr = [];
        for(let item of this.state.existing_documents){
          arr.push({
            path: item.path,
            type: 'existing'
          })
        }
        for(let item of this.state.documents){
          arr.push({
            path: item,
            type: 'new'
          })
        }
        let x = arr.length;
        for(let i = x; i < 5; i++){
          arr.push({
            path: noImage,
            type: 'no_image'
          })
        }
        if(isSingle){
          return arr[0];
        }else{
          arr.shift();
          return arr;
        }
    }

    render() {
        const { formValues, formErros, submitting } = this.state;
        let firstDocument = this.getAllDocuments(true);
        return (
            <Container className='ratn-dialog-wrapper'>
                <form autoComplete="off" className='ratn-dialog-inner'>
                <Row className='loans_view p_view'>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control 
                                className={formErros.company_name ? 'is-invalid' : ''} 
                                name='company_name' 
                                value={formValues.company_name}
                                onChange={(event) => this.handleDefaultChange(event, 'company_name')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control 
                                className={formErros.name ? 'is-invalid' : ''} 
                                name='name' 
                                value={formValues.name}
                                onChange={(event) => this.handleDefaultChange(event, 'name')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                   
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Contact No</Form.Label>
                            <Form.Control 
                                className={formErros.mobile ? 'is-invalid' : ''} 
                                name='mobile' 
                                value={formValues.mobile}
                                onChange={(event) => this.handleDefaultChange(event, 'mobile')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                className={formErros.email ? 'is-invalid' : ''} 
                                name='email' 
                                value={formValues.email}
                                onChange={(event) => this.handleDefaultChange(event, 'email')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Full Address</Form.Label>
                            <Form.Control 
                                className={formErros.address ? 'is-invalid' : ''} 
                                name='address' 
                                value={formValues.address}
                                onChange={(event) => this.handleDefaultChange(event, 'address')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control 
                                className={formErros.landmark ? 'is-invalid' : ''} 
                                name='landmark' 
                                value={formValues.landmark}
                                onChange={(event) => this.handleDefaultChange(event, 'landmark')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>GST</Form.Label>
                            <Form.Control 
                                className={formErros.gst ? 'is-invalid' : ''} 
                                name='gst' 
                                value={formValues.gst}
                                onChange={(event) => this.handleDefaultChange(event, 'gst')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Country</Form.Label>
                            <Form.Select 
                                className={formErros.country_id ? 'error_input' : ''}
                                value={formValues.country_id}
                                onChange={this.handleCountryChange}
                            >
                                <option value=""></option>
                                {
                                    this.state.countryList.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>State</Form.Label>
                            <Form.Select 
                                className={formErros.state_id ? 'error_input' : ''}
                                value={formValues.state_id}
                                onChange={(event) => this.handleStateChange(event, 'state_id')}
                            >
                                <option value=""></option>
                                {
                                    this.state.stateList.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>District</Form.Label>
                            <Form.Select 
                                className={formErros.district_id ? 'error_input' : ''}
                                value={formValues.district_id}
                                onChange={(event) => this.handleDefaultChange(event, 'district_id')}
                            >
                                <option value=""></option>
                                {
                                    this.state.districtList.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.name}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                                className={formErros.city ? 'is-invalid' : ''} 
                                name='city' 
                                value={formValues.city}
                                onChange={(event) => this.handleDefaultChange(event, 'city')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={2} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control 
                                className={formErros.pincode ? 'is-invalid' : ''} 
                                name='pincode' 
                                value={formValues.pincode}
                                onChange={(event) => this.handleDefaultChange(event, 'pincode')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control 
                                className={formErros.bank_name ? 'is-invalid' : ''} 
                                name='bank_name' 
                                value={formValues.bank_name}
                                onChange={(event) => this.handleDefaultChange(event, 'bank_name')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Control 
                                className={formErros.branch_name ? 'is-invalid' : ''} 
                                name='branch_name' 
                                value={formValues.branch_name}
                                onChange={(event) => this.handleDefaultChange(event, 'branch_name')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control 
                                className={formErros.bank_account_no ? 'is-invalid' : ''} 
                                name='bank_account_no' 
                                value={formValues.bank_account_no}
                                onChange={(event) => this.handleDefaultChange(event, 'bank_account_no')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>IFSC Code</Form.Label>
                            <Form.Control 
                                className={formErros.bank_ifsc ? 'is-invalid' : ''} 
                                name='bank_ifsc' 
                                value={formValues.bank_ifsc}
                                onChange={(event) => this.handleDefaultChange(event, 'bank_ifsc')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row className='pl-0'>
                    <Col md="2">
                        <div className="admin-buttons">
                            <div className='p-single-image-wrapper'>
                                <div className='p-single-image'>
                                {
                                    this.state.existing_company_logo ?
                                    <>
                                        <button className='close_img' onClick={() => this.deleteExistingImage('company_logo')}>x</button>
                                        <img src={this.state.existing_company_logo} />
                                    </>
                                    :
                                    <>
                                    {
                                        this.state.company_logo ?
                                        <>
                                            <button className='close_img' onClick={() => this.deleteImage('company_logo')}>x</button>
                                            <img src={this.getImageSrc(this.state.company_logo)} />
                                        </>
                                        :
                                        <img src={noImage} />
                                    }
                                    </>
                                }
                                </div>
                                <Button variant="primary" className='image-button' onClick={() => this.company_logoRef.current.click()}>
                                    <BsFillCloudUploadFill /> Company Logo
                                    <input
                                        name="company_logo"
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={(e) => this.onImageChange(e, 'company_logo')}
                                        ref={this.company_logoRef}
                                    />
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md="2">
                        <div className="admin-buttons">
                            <div className='p-single-image-wrapper'>
                                <div className='p-single-image'>
                                {
                                    this.state.existing_profile_image ?
                                    <>
                                        <button className='close_img' onClick={() => this.deleteExistingImage('profile_image')}>x</button>
                                        <img src={this.state.existing_profile_image} />
                                    </>
                                    :
                                    <>
                                    {
                                        this.state.profile_image ?
                                        <>
                                            <button className='close_img' onClick={() => this.deleteImage('profile_image')}>x</button>
                                            <img src={this.getImageSrc(this.state.profile_image)} />
                                        </>
                                        :
                                        <img src={noImage} />
                                    }
                                    </>
                                }
                                </div>
                                <Button variant="primary" className='image-button' onClick={() => this.profile_imageRef.current.click()}>
                                    <BsFillCloudUploadFill /> Profile Photo 
                                    <input
                                        name="profile_image"
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={(e) => this.onImageChange(e, 'profile_image')}
                                        ref={this.profile_imageRef}
                                    />
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md="8">
                        <div className='all-image-wrapper'>
                            <div className='all-single-image'>
                                <div>
                                    {
                                        firstDocument.type != "no_image" ?
                                        <>
                                            {
                                                firstDocument.type == "existing" ?
                                                <button className='close_img' onClick={() => this.deleteExistingDocument(0)}>x</button>
                                                :
                                                <button className='close_img' onClick={() => this.deleteDocument(0)}>x</button>
                                            }
                                        </>
                                        : null
                                    }
                                    <FilePreview file={firstDocument.path} viewImage={firstDocument.type == "no_image" ? false : true} />
                                </div>
                                <Button variant="primary" className='image-button' onClick={() => this.documentRef.current.click()}>
                                    <BsFillCloudUploadFill /> Documents
                                    <input
                                        name="documents"
                                        hidden
                                        type="file"
                                        onChange={this.onDocumentChange}
                                        ref={this.documentRef}
                                        accept="application/pdf, image/*"
                                        multiple
                                    />
                                </Button>
                            </div>
                            {
                                this.getAllDocuments().map((item, index) => (
                                    <div className='all-single-image' key={index}>
                                        <div>
                                            {
                                            item.type != "no_image" ?
                                            <>
                                                {
                                                item.type == "existing" ?
                                                <button className='close_img' onClick={() => this.deleteExistingDocument(index+1)}>x</button>
                                                :
                                                <button className='close_img' onClick={() => this.deleteDocument(index+1)}>x</button>
                                                }
                                            </>
                                            : null
                                            }
                                            <FilePreview file={item.path} viewImage={item.type == "no_image" ? false : true} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
                <Row className='loans_view p_view'>
                    <Col md={3} className='create-input'>
                        <Form.Group className="mb-2">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                name='user_name' 
                                value={formValues.user_name}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3} className='create-input mb-2'>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                className={formErros.password ? 'is-invalid' : ''} 
                                name='password' 
                                value={formValues.password}
                                autoComplete="new-password"
                                type="password"
                                onChange={(event) => this.handleDefaultChange(event, 'password')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4} className='create-input d-none d-sm-block'>
                        &nbsp;
                    </Col>
                    <Col md={2} className="mb-2">
                        <Form.Group>
                            <Form.Label className='d-none d-sm-block'>&nbsp;</Form.Label>
                            <ButtonToolbar className='float-right'>
                                <Button variant="secondary" className='close-button mr-2' onClick={() => this.props.navigate(-1) }>Cancel</Button>
                                <Button variant="primary" className='conf-button' disabled={submitting} onClick={this.handleSubmit}>
                                    {
                                        submitting ?
                                        <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                        </>
                                        :
                                        "Submit"
                                    }
                                </Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Col>
                    </Row>
                </form>
            </Container>
        )

    }

}

const mapStateToProps = (state) => ({
    actionCalled: state.customer.retailer.actionCalled,
    createSuccess: state.customer.retailer.createSuccess,
    editSuccess: state.customer.retailer.editSuccess,
    successMessage: state.customer.retailer.successMessage,
    errorMessage: state.customer.retailer.errorMessage,
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators({
    retailerUpdate,
    retailerCreate
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetailerForm));

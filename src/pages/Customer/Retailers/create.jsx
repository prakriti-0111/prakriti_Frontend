import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import cartImage from 'src/assets/images/cartImage.png';
import { MdOutlineDelete } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { CartList, CartDelete, CartUpdate, CartUpdateSizeMaterial, CartApplyPromocode } from "actions/Customer/addcart.actions";
import { checkoutList } from 'actions/Customer/checkout.actions'
import { ToastContainer, toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";
import Modal from 'react-bootstrap/Modal';
import Loader from '../Loader';
import { RESET_ADDCART } from 'actionTypes/Customer/addcart.types';
import _ from 'lodash';
import { isEmpty, priceFormat, displayAmount, convertUnitToGram, weightFormat, isSalesExecutive, isRetailer } from 'src/helpers/helper';
import { promocodeList } from "actions/Customer/home.actions";
import { WishListAdd } from "actions/Customer/wishlist.actions";
import { UPDATE_WISHLIST_COUNT } from 'actionTypes/Customer/wishlist.type';
import RetailerForm from 'forms/RetailerForm';
import LoadingOverlay from 'react-loading-overlay';
LoadingOverlay.propTypes = undefined

class RetailerCreatePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
        this.isSalesExecutive = isSalesExecutive();
        this.isRetailer = isRetailer();
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        let update = {};

        return update;
    }

    componentDidUpdate(prevProps) {
       
    }

   

    render() {
        return (
            <>
                <div className='cart-wrapper'>
                    <Container>
                        <h3>Create Retailer</h3>
                        <RetailerForm />
                    </Container>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({  }, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RetailerCreatePage));
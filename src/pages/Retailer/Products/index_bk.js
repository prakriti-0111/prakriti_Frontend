import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col, Alert, Form, Button, Dropdown, InputGroup} from 'react-bootstrap';
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilterLeft, BsFillPlayFill } from "react-icons/bs";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { productList } from "actions/Retailer/product.actions";
import withRouter from 'src/helpers/withRouter';
import Loader from '../Loader';
import { BiHeart } from "react-icons/bi";
import NoProduct from 'src/assets/images/no-product.png';

class ProductsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            processing: this.props.processing,
            products: this.props.products,
            total: this.props.total,
        }
    }

    componentDidMount(){
        let params = {
            category: this.props.query.get('category') || '',
            subcategory: this.props.query.get('subcategory') || '',
        }
        this.props.actions.productList(params);
    }

    static getDerivedStateFromProps(props, state){
        let update = {};
        if(props.processing !== state.processing){
            update.processing = props.processing;
        }
        if(props.products !== state.products){
            update.products = props.products;
        }
        if(props.total !== state.total){
            update.total = props.total;
        }
        return update;
    }

    handleSearch = () => {

    }

    handleProductDetails = (product) => {
        this.props.navigate(product.slug);
    }

    render() {
        return (
            <div className='search-wrapper'>
                <Container>
                <div className='breadcrumb-wrapper'>
                            <Breadcrumb>
                                <Breadcrumb.Item href=''>Search</Breadcrumb.Item>
                                <Breadcrumb.Item active>Pendants</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    <div className='search-area desktop-search'>
                        <InputGroup className="">
                            <Form.Control
                                placeholder="Search here..."
                                name='search'
                            />
                            <InputGroup.Text id="basic-addon2" onClick={this.handleSearch}><BiSearchAlt2 /></InputGroup.Text>
                        </InputGroup>
                        <div className='filter-button'>

                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className='filter-icon'>
                                    Sort & Filter <BsFilterLeft />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <h5>Filter</h5>
                                    <Dropdown.Item href="#/action-1" name='By_price'>By Price</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" name='By_type'>By Type</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3" name='By_metal'>By Metal</Dropdown.Item>
                                    <h5>Sort By</h5>
                                    <Dropdown.Item href="#/action-1" name='popular'>Popular</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" name='price_low_to_high'>Price Low to High</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3" name='price_high_to_low'>Price High to Low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='search_header'>
                        {/*<h1>Jewellery <span>| 2103 DESIGNS </span></h1> */}
                    </div>
                    <div className='mobile-search'>
                        <InputGroup className="">
                            <Form.Control
                                placeholder="Pendants"
                                aria-label="Pendants"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2"><BiSearchAlt2 /></InputGroup.Text>
                        </InputGroup>

                    </div>
                    <div className='mobile-dropdown'>
                        <div className='mobile-dropdown-wrapper'>
                            <h5>showing 564 results</h5>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className='filter-icon'>
                                    Sort & Filter <BsFilterLeft />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <h5>Filter</h5>
                                    <Dropdown.Item href="#/action-1">By Price</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">By Type</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">By Metal</Dropdown.Item>
                                    <h5>Sort By</h5>
                                    <Dropdown.Item href="#/action-1">Popular</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Price Low to High</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Price High to Low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    {
                        this.state.processing ? 
                        <Loader />
                        :
                        <>
                            {
                                this.state.products.length == 0 ?
                                <div className='no-product mt-3'>
                                    <img src={NoProduct} alt='' />
                                    <h1 className='mb-0'>Products Not Found</h1>
                                </div>
                                :
                                <div className='search-slider mt-3'>
                                {
                                    this.state.products.map((product, index) => (
                                        <div className='search-inner' key={index}>
                                            <div className='s-slider-image'>
                                                <img className="swap-on-hover__front-image" src={product.images[0].path} alt='feature product' onClick={() => this.handleProductDetails(product)} />
                                                <div className='swap-on-hover__back-image'>
                                                    <img src={product.images.length > 1 ? product.images[1].path : product.images[0].path} />
                                                    <div className='wishlist'>
                                                        <BiHeart />
                                                    </div>
                                                    <div className='video_button'>
                                                        <BsFillPlayFill  />
                                                    </div>
                                                </div>
                                                {/*<div className='making-chrg-offer'>
                                                    <h4>10% Off on Making Charges</h4>
                                                </div>*/}
                                            </div>
                                            <div className='s-slider-content' onClick={() => this.handleProductDetails(product)}>
                                                <h2>{product.name}</h2>
                                                <div className='ring-price'>
                                                    <span className='offer-price'> {product.stocks[0].total_price_display} </span>
                                                    {/*<span className='item-price'>  3999</span>*/}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            }
                        </>
                    }
                    <div>

                    </div>
                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.retailer.product.items,
    total: state.retailer.product.total,
    processing: state.retailer.product.processing,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ productList }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsPage));
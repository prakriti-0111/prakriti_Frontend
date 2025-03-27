import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoDiamondOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { BiHeart, BiShareAlt } from "react-icons/bi";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
// import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper";
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import dollar from 'src/assets/images/dollar.png';
import currency from 'src/assets/images/currency.png';
import membership from 'src/assets/images/membership.png';
import certify from 'src/assets/images/cert-sprite.png';
import discount from 'src/assets/images/discount.png';
import sImage from 'src/assets/images/s-product-1.png';
import { BiSearchAlt2 } from "react-icons/bi";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productFetch } from "actions/Customer/product.actions";
import { AddToCart } from "actions/Customer/addcart.actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import { toast } from "react-toastify";
import Loader from '../Loader';
import BeatLoader from "react-spinners/BeatLoader";

const ProductDetails = (props) => {
    const [load, setLoad] = useState(true);
    const productList = useSelector((state) => state.product)
    const addCart = useSelector((state) => state.addCart)
    let params = useParams();
    const navigate = useNavigate();

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [thumbsSwiper2, setThumbsSwiper2] = useState(null);
    const [productDetail, setProductDetail] = useState([])
    const [size, setSize] = React.useState(1)

    useEffect(() => {
        if (productList?.getItemsSuccess) {
            setProductDetail(productList?.items)
        }

    }, [productList])
    const getProductView = async (id) => {
        setLoad(false)
        return props.actions.productFetch(id)
    }
    const onHome = () => {
        setLoad(true)
        navigate('/')
    }

    React.useEffect(() => {
        getProductView(parseInt(params.id))
    }, [])

    const handleSizeChange = (key, event) => {
        setSize(key)
    }

    useEffect(() => {
        if (addCart?.createSuccess) {
            toast.success(addCart?.successMessage)
        }

    }, [addCart])
    const onCart = () => {
        const data = {
            product_id: productDetail.id,
            size_id: parseInt(size),
            stock_id: productDetail?.stocks[0]?.id,
            type: productDetail?.type,
            material_id: productDetail?.materials[0]?.id || 1
        }
        setLoad(false)
        props.actions.AddToCart(data)
    }



    return (
        <>

            {load ? <Loader /> :
                <div>
                    <div className='product-details-wrapper desktop-view'>
                        <Container>
                            <div className='breadcrumb-wrapper'>
                                <Breadcrumb>
                                    <Breadcrumb.Item href=''>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item href=''>Diamond</Breadcrumb.Item>
                                    <Breadcrumb.Item active>{productDetail?.name}</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <Row>

                                <Col xs={12} md={5}>
                                    <div className='product-slider'>
                                        <Swiper
                                            style={{
                                                "--swiper-navigation-color": "#fff",
                                                "--swiper-pagination-color": "#fff",
                                            }}
                                            loop={true}
                                            spaceBetween={10}
                                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper2"
                                        >
                                            <SwiperSlide className='p_details_slider_wrapper'>
                                                <img className='p_details_slider' src={productDetail?.default_image || "https://swiperjs.com/demos/images/nature-1.jpg"} />
                                            </SwiperSlide>
                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop={true}
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            navigation={true}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper"
                                        >
                                            {
                                                productDetail?.images?.map((item, index) => (
                                                    <SwiperSlide className='slider-thumbnail' key={index}>
                                                        <img className='thumnail-slider' src={item?.path || "https://swiperjs.com/demos/images/nature-1.jpg"} />
                                                    </SwiperSlide>

                                                ))
                                            }

                                        </Swiper>
                                    </div>
                                    <div className='gap-30'></div>
                                    <div className='price-breakup'>
                                        <h2>Price Breakup</h2>
                                        <div className='underline'></div>
                                        <div className='breakup-content'>
                                            <div className='breakup-item'>
                                                <span>Gold</span>  <span>₹6770</span>
                                            </div>
                                            <div className='breakup-item'>
                                                <span>Diamond</span>  <span>₹6770</span>
                                            </div>
                                            <div className='breakup-item'>
                                                <span>Making Charge</span>  <span>₹6770</span>
                                            </div>
                                            <div className='breakup-item'>
                                                <span>GST</span>  <span>₹6770</span>
                                            </div>
                                            <hr style={{ margin: '8px 0' }} />
                                            <div className='breakup-item'>
                                                <span><strong>Total</strong> </span>  <span><strong>₹6770</strong> </span>
                                            </div>
                                        </div>
                                    </div>



                                   


                                        <div className='p-customize-design-product product-details-items'>
                                            <Accordion defaultActiveKey="0" alwaysOpen>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header><div className='header'>
                                                        <h2>Product Details</h2>
                                               
                                                    </div></Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className='product-details-items-content'>
                                                            <div className='product-details-items-item'>
                                                                <span>Product Code</span>  <span>{productDetail?.product_code}</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Height</span>  <span>16.2mm</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Width</span>  <span>16.2mm</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Product Weight</span>  <span>4.1453 gram</span>
                                                            </div>
                                                            <div className='product-details-items-item details-header'>
                                                                <span>DIAMOND DETAILS</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Total Weight</span>  <span>0.244 ct</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Total No of Diamonds</span>  <span>34</span>
                                                            </div>
                                                            <div className='product-details-items-item details-header'>
                                                                <span>METAL DETAILS</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Total Weight</span>  <span>0.244 ct</span>
                                                            </div>
                                                            <div className='product-details-items-item'>
                                                                <span>Total No of Diamonds</span>  <span>34</span>
                                                            </div>

                                                        </div>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>

                                       

                                    
                                </Col>
                                <Col xs={12} md={7}>
                                    <div className='product-details-container'>
                                        <div className='righ-side-wrapper'>
                                            <div className='p-container-header'>
                                                <span>
                                                    <h3>{productDetail?.name}</h3>
                                                    <div>
                                                        {productDetail?.description}
                                                    </div>
                                                    <div>
                                                        <ul>
                                                            <li> <BsStarFill /></li>
                                                            <li> <BsStarFill /></li>
                                                            <li> <BsStarFill /></li>
                                                            <li> <BsStarFill /></li>
                                                            <li className='blank-star'> <BsStarFill /></li>
                                                            <li className='rating'> 4.5</li>
                                                        </ul>

                                                    </div>
                                                </span>
                                                <span className='share-icons'>
                                                    <p><BiHeart /> </p><p> <BiShareAlt /></p>
                                                </span>
                                            </div>
                                            <div className='p-header-price'>
                                                <h3> ₹ {productDetail?.discount || 2000}</h3>
                                            </div>
                                            <div className='p-headder-offer-price'>
                                                <span> <h2> {productDetail?.display_price}</h2></span>
                                                <span className='disc'><img src={discount} alt='discount' /> <strong>{productDetail?.display_discount || '30% OFF'}</strong></span>
                                            </div>
                                            <div className='p-item-delivery'>
                                                <h4> Check Delivery</h4>
                                                <Form.Control
                                                    placeholder="Enter PIN Code"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />
                                                <Button variant="primary">Check</Button>
                                            </div>
                                            <div className='delivery-date'>
                                                <p>Usually Delivered in 7 days</p>
                                            </div>
                                            <div className='p-customize-design mb-4'>
                                                <Accordion defaultActiveKey="0" alwaysOpen>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Customize this Design</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className='p-size'>
                                                                {
                                                                    productDetail?.sizes?.length > 0 ?
                                                                        <>
                                                                            <span>Select Ring Size :</span>
                                                                            <DropdownButton title={size || 1} name='size'
                                                                                key={'Secondary'}
                                                                                id={`dropdown-variants-Secondary`}
                                                                                variant={'Secondary'}
                                                                                value={size} onSelect={handleSizeChange}>
                                                                                {
                                                                                    productDetail?.sizes?.map((item, index) =>
                                                                                    (<div key={index}>
                                                                                        <Dropdown.Item key={item.id}
                                                                                            eventKey={item.id}>{item.name}</Dropdown.Item>
                                                                                    </div>)
                                                                                    )}
                                                                            </DropdownButton>
                                                                        </>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                            <div className='p-purity'>

                                                                <span>purities:
                                                                    <Form >
                                                                        <div key={`inline-radio`}>
                                                                            {
                                                                                productList?.items?.purities?.map((val, index) => (
                                                                                    <Form.Check
                                                                                        key={index}
                                                                                        inline
                                                                                        label={val.name}
                                                                                        name="group1"
                                                                                        type={'radio'}
                                                                                        id={`inline-radio-1`}
                                                                                    />
                                                                                ))
                                                                            }

                                                                        </div>
                                                                    </Form>

                                                                </span>
                                                            </div>
                                                            <div className='p-variant'>
                                                                <span><h2><IoDiamondOutline />Diamond:</h2>
                                                                    <Form>
                                                                        {['radio'].map((type) => (
                                                                            <div key={`inline-${type}`}>
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="1SI IJ"
                                                                                    name="group1"
                                                                                    type={type}
                                                                                    id={`inline-${type}-1`}
                                                                                />
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="SI GH"
                                                                                    name="group1"
                                                                                    type={type}
                                                                                    id={`inline-${type}-2`}
                                                                                />
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="VS GH"
                                                                                    name="group1"
                                                                                    type={type}
                                                                                    id={`inline-${type}-3`}
                                                                                />
                                                                                <Form.Check
                                                                                    inline
                                                                                    label="VVS EF"
                                                                                    name="group1"
                                                                                    type={type}
                                                                                    id={`inline-${type}-4`}
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                    </Form>
                                                                </span>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        </div>
                                        <div className='product-buttons'>
                                            <Button variant="secondary" onClick={onCart}>ADD to cart</Button>
                                        </div>
                                        <div className='p-authenticity p-4 mt-3 p-details-authenticity'>
                                                            <h4 className='text-center'>CERTIFICATE OF AUTHENTICITY</h4>
                                                                <ul className="authenticity_list">
                                                                <li><img src={au1} alt='' /></li>
                                                                <li><img src={au2} alt='' /></li>
                                                                <li><img src={au3} alt='' /></li>
                                                                <li><img src={au4} alt='' /></li>
                                                                <li><img src={au5} alt='' /></li>
                                                                </ul>
                                                                <ul className='cart-authenticity'>
                                                                    <li> <img src={shipping} alt='' /> Free Delivery </li>
                                                                    <li> <img src={jewelleryHome} alt='' /> Genuine Price </li>
                                                                </ul>
                                        <div className='p-policy mt-4 p-3 mb-3'>
                                            <ul>
                                                <li> <img src={dollar} alt='' /> 30 Day Money Back</li>
                                                <li> <img src={currency} alt='' /> 30 Day Money Back</li>
                                                <li> <img src={membership} alt='' /> Certified Jewellery</li>
                                            </ul>
                                            <p className='mt-2 m-0 text-center'>Any Questions? Please feel free to reach us at: 1800 641 0327</p>
                                        </div>
                                        <div className='p-authenticity p-4'>
                                            <h4 className='text-center'>CERTIFICATE OF AUTHENTICITY</h4>
                                            <p className='mt-2 m-0 text-center'>Every piece of jewellery that we make is certified for authenticity by third-party international laboratories like SGL, IGI, BIS, GIA, and HKD.</p>
                                        </div>
                                        <div className='p-certified p-2 text-center'>
                                            CERTIFIED BY <img src={certify} alt='' />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                    <div className='product-details-wrapper mobile-view'>
                        <Container>
                            <div className='p-mobile-search'>
                                <InputGroup>
                                    <HiArrowNarrowLeft />
                                    <Form.Control
                                        placeholder="Gold Plated 24 carat Ri.."
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2"><BiSearchAlt2 /></InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1"><BiShareAlt /> Share</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                            </div>
                            <Row>

                                <Col xs={12} md={5}>

                                    <div className='product-slider'>
                                        <Swiper
                                            style={{
                                                "--swiper-navigation-color": "#fff",
                                                "--swiper-pagination-color": "#fff",
                                            }}
                                            loop={true}
                                            spaceBetween={10}

                                            thumbs={{ swiper: thumbsSwiper2 && !thumbsSwiper2.destroyed ? thumbsSwiper2 : null }}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper2"
                                        >
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                                            </SwiperSlide>
                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper2}
                                            loop={true}
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            navigation={true}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                    <div className='gap-30'></div>
                                    <div className='righ-side-wrapper'>
                                        <div className='p-container-header'>
                                            <span>
                                                <h3>Gold Plated 24 carat Ring</h3>
                                                <div>
                                                    <ul>
                                                        <li> <BsStarFill /></li>
                                                        <li> <BsStarFill /></li>
                                                        <li> <BsStarFill /></li>
                                                        <li> <BsStarFill /></li>
                                                        <li className='blank-star'> <BsStarFill /></li>
                                                        <li className='rating'> 4.5</li>
                                                    </ul>

                                                </div>
                                            </span>
                                        </div>
                                        <div className='p-header-price'>
                                            <h3>₹ 11,199</h3>
                                        </div>
                                        <div className='p-headder-offer-price'>
                                            <span> <h2>₹ 9,999</h2></span>
                                            <span className='disc'><img src={discount} alt='discount' /> <strong>{productDetail?.display_discount}</strong></span>
                                        </div>
                                        <div className='p-item-delivery'>
                                            <h4> Check Delivery</h4>
                                            <Form.Control
                                                placeholder="Enter PIN Code"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                            <Button variant="primary">Check</Button>
                                        </div>
                                        <div className='delivery-date'>
                                            <p>Usually Delivered in 7 days</p>
                                        </div>
                                        <div className='p-customize-design mb-4'>
                                            <Accordion defaultActiveKey="0" alwaysOpen>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Customize this Design</Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className='p-size'>
                                                            <span>Select Size
                                                                <Form.Select aria-label="Default select example">
                                                                    <option>12</option>
                                                                    <option value="1">14</option>
                                                                    <option value="2">16</option>
                                                                    <option value="3">13</option>
                                                                </Form.Select>
                                                            </span>
                                                            <span className='gold-type'>Gold Type
                                                                <Form.Select aria-label="Default select example">
                                                                    <option value="1">Yellow Gold</option>
                                                                    <option value="2">Yellow Gold</option>
                                                                    <option value="3">Yellow Gold</option>
                                                                </Form.Select>
                                                            </span>
                                                            <span>Gold Purity
                                                                <Form.Select aria-label="Default select example">
                                                                    <option value="1">14kt</option>
                                                                    <option value="2">18kt</option>
                                                                    <option value="3">22kt</option>
                                                                </Form.Select>

                                                            </span>
                                                            <span>Diamond
                                                                <Form.Select aria-label="Default select example">
                                                                    <option value="1">1SI IJ</option>
                                                                    <option value="2">SI GH</option>
                                                                    <option value="3">VS GH</option>
                                                                    <option value="3">VVS EF</option>
                                                                </Form.Select>
                                                            </span>
                                                        </div>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                    <div className='price-breakup'>
                                        <h2>Price Breakup</h2>
                                        <div className='underline'></div>
                                        <div className='breakup-content'>
                                            <div className='breakup-item'>
                                                <span>Gold</span>  <span>₹6770</span>
                                            </div>
                                            <div className='breakup-item'>
                                                <span>Diamond</span>  <span>₹6770</span>
                                            </div>
                                            <div className='breakup-item'>
                                                <span>Making Charge</span>  <span>₹6770</span>
                                            </div>
                                            <div className='breakup-item'>
                                                <span>GST</span>  <span>₹6770</span>
                                            </div>
                                            <hr style={{ margin: '8px 0' }} />
                                            <div className='breakup-item'>
                                                <span><strong>Total</strong> </span>  <span><strong>₹6770</strong> </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-details-items mt-4'>
                                        <div className='header'>
                                            <h2>Product Details</h2>
                                            <a href=''><MdKeyboardArrowDown /></a>
                                        </div>
                                        <div className='underline'></div>
                                        <div className='product-details-items-content'>
                                            <div className='product-details-items-item'>
                                                <span>Product Code</span>  <span>{productDetail?.product_code}</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Height</span>  <span>16.2mm</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Width</span>  <span>16.2mm</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Product Weight</span>  <span>4.1453 gram</span>
                                            </div>
                                            <div className='product-details-items-item details-header'>
                                                <span>DIAMOND DETAILS</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Total Weight</span>  <span>0.244 ct</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Total No of Diamonds</span>  <span>34</span>
                                            </div>
                                            <div className='product-details-items-item details-header'>
                                                <span>METAL DETAILS</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Total Weight</span>  <span>0.244 ct</span>
                                            </div>
                                            <div className='product-details-items-item'>
                                                <span>Total No of Diamonds</span>  <span>34</span>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={7}>
                                    <div className='product-details-container'>


                                        <div className='p-policy mt-4 p-3 mb-3'>
                                            <ul>
                                                <li> <img src={dollar} alt='' /> 30 Day Money Back</li>
                                                <li> <img src={currency} alt='' /> 30 Day Money Back</li>
                                                <li> <img src={membership} alt='' /> Certified Jewellery</li>
                                            </ul>
                                            <p className='mt-2 m-0 text-center'>Any Questions? Please feel free to reach us at: 1800 641 0327</p>
                                        </div>
                                        <div className='p-certified p-2 text-center'>
                                            CERTIFIED BY <img src={certify} alt='' />
                                        </div>
                                        <div className='similar-product-slider'>
                                            <h4>You may also like</h4>
                                            <Swiper
                                                slidesPerView={1}
                                                spaceBetween={20}
                                                onSlideChange={() => console.log('slide change')}
                                                onSwiper={(swiper) => console.log(swiper)}
                                            >
                                                <SwiperSlide className='similar-slider-inner'>
                                                    <div className='s-slider-image'>
                                                        <img src={sImage} alt='selling product' />

                                                    </div>
                                                    <div className='s-slider-content'>
                                                        <div className='similar-slider-header'>
                                                            <h2>Gold Plated Ring</h2>
                                                            <div className='wishlist'>
                                                                <BiHeart />
                                                            </div>
                                                        </div>
                                                        <div className="p-header-price"><h3>₹ 11,199</h3></div>
                                                        <div className="p-headder-offer-price"><span> <h2>₹ 9,999</h2></span><span className="disc"><img src={discount} alt='discount' /> <strong>{productDetail?.display_discount}</strong></span></div>
                                                        <span className='rating-wrapper'>
                                                            <ul>
                                                                <li> <BsStarFill /></li>
                                                                <li> <BsStarFill /></li>
                                                                <li> <BsStarFill /></li>
                                                                <li> <BsStarFill /></li>
                                                                <li className='blank-star'> <BsStarFill /></li>
                                                                <li className='rating'> 4.5</li>
                                                            </ul>

                                                        </span>
                                                    </div>
                                                </SwiperSlide>

                                            </Swiper>
                                        </div>
                                        <div className='gap-70'></div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className='product-float-buttons'>
                            <BiHeart />
                            <Button variant="success">Try at home</Button>
                            <Button variant="secondary" onClick={onCart}>ADD to cart</Button>

                        </div>
                    </div>
                </div>

            }

        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    categoryList: state.categories,
    productList: state.product,

    addCart: state.addCart
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ productFetch, AddToCart }, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));

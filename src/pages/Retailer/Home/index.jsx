import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'src/helpers/withRouter';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import { BiHeart } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { CgArrowLongRight } from "react-icons/cg";
import { IoMdMail } from "react-icons/io";
import bannerImage from 'src/assets/images/banner1.png';
import bannerImage2 from 'src/assets/images/banner2.png';
import bannerImage3 from 'src/assets/images/banner3.png';
import sImage from 'src/assets/images/s-product-1.png';
import pearlBlue from 'src/assets/images/pearl-blue.png';
import pearlBlue2 from 'src/assets/images/pearl-blue-earring.png';
import certificate from 'src/assets/images/certificate.png';
import refund from 'src/assets/images/refund.png';
import exchange from 'src/assets/images/exchange.png';
import shipping from 'src/assets/images/shipping.png';
import jewelleryHome from 'src/assets/images/jewelleryHome.png';
import physicalStore from 'src/assets/images/physicalStore.png';
import rings from 'src/assets/images/rings.png';
import ring from 'src/assets/images/ring.png';
import ring2 from 'src/assets/images/ring2.png';
import ring3 from 'src/assets/images/ring3.png';
import ring4 from 'src/assets/images/ring4.png';
import client from 'src/assets/images/client.png';
import review from 'src/assets/images/review-mark.png';
import ratnBanner from 'src/assets/images/banner.png';
import facebookBg from 'src/assets/images/fb_bg.png';
import fb from 'src/assets/images/facebook.png';
import insta from 'src/assets/images/insta.png';
import getSlider from 'src/json/slider_data';
import { Navigation } from "swiper";
import { HiHome } from "react-icons/hi";
import { BiShoppingBag } from "react-icons/bi";
import { TbUserCircle } from "react-icons/tb";

class HomePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      slider: getSlider
    }
  }

  render() {
    return (
      <>

      <section className='banner'>
      {/* <Container className='position-relative'>
      <Row>
          <Col xs={7} md={7}>
              <div className='header pt-7 pb-7'>
                  <h1>FLAT 40% OFF on
                      Tanishq Jewelery</h1>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                  <a href='' className='shop-now'>Shop Now</a>
              </div>
          </Col>
          <Col xs={5} md={5}>
              <div className='banner-image'>
                  <img src={bannerImage} alt='' />
              </div>
          </Col>
      </Row>
</Container> */}
      <Carousel>
          <Carousel.Item>
              <div className='slider-banner'>
                  <img
                      className="d-block w-100"
                      src={bannerImage2}
                      alt=''
                  />
              </div>
              {/*<Carousel.Caption>
<h3>First slide label</h3>
<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
</Carousel.Caption>*/}
          </Carousel.Item>
          <Carousel.Item>
              <div className='slider-banner'>
                  <img
                      className="d-block w-100"
                      src={bannerImage3}
                      alt=''
                  />
              </div>


          </Carousel.Item>
          <Carousel.Item>
              <div className='slider-banner'>
                  <img
                      className="d-block w-100"
                      src={bannerImage}
                      alt=''
                  />
              </div>

          </Carousel.Item>
      </Carousel>
  </section>
            {/*---- only mob screen -----*/}
            <section className='ornament-slider'>
                <Container>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        <SwiperSlide>
                            <div className='ornament-image'>
                                <img src={ring} alt='' />
                                <h4>Rings</h4>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ornament-image'>
                                <img src={ring2} alt='' />
                                <h4>Pendants</h4>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ornament-image'>
                                <img src={ring3} alt='' />
                                <h4>Earrings</h4>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ornament-image'>
                                <img src={ring4} alt='' />
                                <h4>Gold Coins</h4>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </Container>
            </section>
            <section className='diamond-offer'>
                <Container className='diamond-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative'>
                    <div className='offer-header'>
                        <h2>Diamond Rings at
                            30% OFF</h2>
                        <a href='' className='shop-now'>Shop Now</a>
                    </div>

                </Container>
            </section>
            <section className='earring-offer'>
                <Container className='earring-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative'>
                    <div className='earring-header'>
                        <h2>Earrings at 40% OFF at AXIS
                            Bank Debit & Credit Cards</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</p>
                        <a href='' className='shop-now'>Explore <CgArrowLongRight /></a>
                    </div>

                </Container>
            </section>
            <section className='pendant-offer'>
                <Container className='pendant-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative'>
                    <div className='pendant-header'>
                        <h2>Get Beautiful Pendants at only ₹8999</h2>
                        <a href='' className='shop-now'>Shop Now</a>
                    </div>

                </Container>
            </section>
            <section className='affordable-earring'>
                <Container className='affordable-earring-inner mt-3 mb-3 mt-md-5 mb-md-5 position-relative'>
                    <div className='affordable-earring-header'>
                        <h2>Affordable Earrings at ₹9,999</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <a href='' className='shop-now'>Explore <CgArrowLongRight /></a>
                    </div>

                </Container>
            </section>
            <section className='selling-product'>
                <Container>
                    <div className='selling-product-header'>
                        <h1>Best Selling Products</h1>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                width: 320,
                                slidesPerView: 2,
                            },
                            // when window width is >= 768px
                            768: {
                                width: 768,
                                slidesPerView: 2,
                            },
                            // when window width is >= 1024px
                            1024: {
                                width: 1024,
                                slidesPerView: 3,
                            },
                            // when window width is >= 1024px
                            1440: {
                                width: 1440,
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {this.state.slider && this.state.slider.map(slideItem => {
                            return (
                                <SwiperSlide key={slideItem.id}>
                                    <div className='s-slider-image'>
                                        <img src={slideItem.image} alt='selling product' />
                                        <div className='wishlist'>
                                            <BiHeart />
                                        </div>
                                    </div>
                                    <div className='s-slider-content'>
                                        <h2>{slideItem.title}</h2>
                                        <div className='ring-price'>
                                            <span className='offer-price'>  {slideItem.discount_price} </span>
                                            <span className='item-price'>   {slideItem.price}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                        )}

                      { /*---- <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                                <div className='wishlist'>
                                    <BiHeart />
                                </div>
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                                <div className='wishlist'>
                                    <BiHeart />
                                </div>
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                    </SwiperSlide> ---*/} 
                    </Swiper>
                </Container>
            </section>
            <div className='gap-100'></div>
            <section className='feature-product'>
                <Container>
                    <div className='feature-product-header'>
                        <h1>Featured Products</h1>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                width: 320,
                                slidesPerView: 2,
                            },
                            // when window width is >= 768px
                            768: {
                                width: 768,
                                slidesPerView: 2,
                            },
                            // when window width is >= 1024px
                            1024: {
                                width: 1024,
                                slidesPerView: 3,
                            },
                            // when window width is >= 1024px
                            1440: {
                                width: 1440,
                                slidesPerView: 4,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='feature product' />
                                <div className='wishlist'>
                                    <BiHeart />
                                </div>
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                                <div className='wishlist'>
                                    <BiHeart />
                                </div>
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                                <div className='wishlist'>
                                    <BiHeart />
                                </div>
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='s-slider-image'>
                                <img src={sImage} alt='selling product' />
                            </div>
                            <div className='s-slider-content'>
                                <h2>Gold Plated Ring</h2>
                                <div className='ring-price'>
                                    <span className='offer-price'> ₹2999 </span>
                                    <span className='item-price'> ₹2999 </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </Container>
            </section>
            <section className='blue-pearl mt-3 mb-3 mt-md-5 mb-md-5'>
                <Container>
                    <Row>
                        <Col xs={4} md={4}>
                            <div className='blue-pearl-image'>
                                <img src={pearlBlue} alt='' />
                            </div>
                        </Col>
                        <Col xs={8} md={8}>
                            <div className='blue-pearl-inner position-relative'>
                                <img src={pearlBlue2} alt='' />
                                <div className='blue-pearl-content'>
                                    <h2>Pearl Blue Diamond Earring</h2>
                                    <p>₹9,726 only</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='promise'>
                <Container>
                    <h2 className='text-center'>Our Promise</h2>
                    <div className='gap-40'></div>
                    <Row>
                        <Col xs={12} md={4}>
                            <div className='promise-box'>
                                <img src={certificate} alt='' />
                                <div className='promise-content'>
                                    <h4 className='text-center'>100% Certified Jewelry</h4>
                                </div>
                            </div>

                        </Col>
                        <Col xs={12} md={4}>
                            <div className='promise-box'>
                                <img src={refund} alt='' />
                                <div className='promise-content'>
                                    <h4 className='text-center'>100% Refund</h4>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className='promise-box'>
                                <img src={exchange} alt='' />
                                <div className='promise-content'>
                                    <h4 className='text-center'>Lifetime Exchange & Buyback</h4>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className='promise-box'>
                                <img src={shipping} alt='' />
                                <div className='promise-content'>
                                    <h4 className='text-center'>Free Shipping & Insurance</h4>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className='promise-box'>
                                <img src={jewelleryHome} alt='' />
                                <div className='promise-content'>
                                    <h4 className='text-center'>Try Jewelry at Home</h4>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className='promise-box'>
                                <img src={physicalStore} alt='' />
                                <div className='promise-content'>
                                    <h4 className='text-center'>Physical Store Near You</h4>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
            <div className='gap-100'></div>
            <section className="browse-rings position-relative">
                <Container fluid>
                    <Row>
                        <Col xs={6} md={4}>
                            <div className='browse-ring-header'>
                                <h3>Browse all Rings</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                                <a href='' className='browse-now'>Explore <CgArrowLongRight /></a>
                            </div>
                        </Col>
                        <Col xs={6} md={8}>
                        </Col>
                    </Row>
                </Container>
                <div className='browse-rings-banner'>
                    <img src={rings} alt='' />
                </div>
            </section>
            <section className='reviews'>
                <Container>
                    <div className='review-header'>
                        <h3 className='text-center'>Our Reviews</h3>
                    </div>
                    <Row>
                        <Col md={12}>
                            <Swiper
                                // install Swiper modules
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation={{ clickable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                <SwiperSlide className='position-relative'>
                                    <div className='client-area'>
                                        <div className='client-content'>
                                            <div className='c-image'>
                                                <img src={client} alt='' />
                                            </div>
                                            <div className='c-content'>
                                                <h5>Maria Sarapavoo</h5>
                                                <h6>Senior Designer</h6>
                                            </div>
                                        </div>
                                        <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using letters Ipsum is that it has a more-or-less normal distribution of letter.</p>

                                    </div>
                                    <div className='review-mark'>
                                        <img src={review} alt='' />
                                    </div>
                                </SwiperSlide>

                            </Swiper>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='ratn-banner'>
                <Container>
                    <div className='ratn-banner-image position-relative'>
                        <img src={ratnBanner} alt='' />
                        <div className='banner-overlay'>
                            <p>Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been</p>
                            <a href='' className='learn-more'>Learn More</a>
                        </div>
                    </div>
                </Container>
            </section>
            <section className='address-map'>
                <Container>
                    <div className='map-wrapper'>
                        <div className='single-map'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0522482851015!2d88.43010321616899!3d22.5771490980532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f2322ee5%3A0xdedead47930ad6ab!2sWebapps%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1661413322272!5m2!1sen!2sin" width="100%" height="100%" loading="lazy"></iframe>
                        </div>
                        <div className='single-map'>
                            <div className='address-header'>
                                <h3>Office Address</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                                <ul className='address-info'>
                                    <li> <FaPhoneAlt /> 92732926392 </li>
                                    <li> <IoMdMail /> info@prakriti.one </li>
                                </ul>
                                <div className='gap-100'></div>
                                <a href='' className='view-more'>Learn More Branches</a>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <section className='socialmedia-wrapper'>
                <Container>
                    <div className='social-container-wrapper'>
                        <div className='social-single-container'>
                            <div className='social-single-header'>
                                <img src={fb} alt='' />
                                <h4>Facebook</h4>
                            </div>
                            <img src={facebookBg} className="fb_bg" alt='' />
                        </div>
                        <div className='social-single-container'>
                            <div className='social-single-header'>
                                <img src={insta} alt='' />
                                <h4>Instagram</h4>

                            </div>

                            <ul className='social-info'>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </section>
{ /*---- only mob screen -----*/}
<section className='float-f-menu'>
<ul>
    <li className='active'> <HiHome /> Home</li>
    <li> <BiShoppingBag /> Cart</li>
    <li> <BiHeart /> Wishlist</li>
    <li> <TbUserCircle /> Profile</li>
</ul>
</section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));

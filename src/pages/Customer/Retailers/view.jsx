import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Row, Col, OverlayTrigger, Tooltip, Nav, Tab, Tabs } from "react-bootstrap";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Swiper, SwiperSlide } from "swiper/react";

import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper";
import InputGroup from "react-bootstrap/InputGroup";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  retailerFetch,
} from "actions/Customer/retailer.actions";

import { toast } from "react-toastify";
import Loader from "../Loader";
import NoProduct from "src/assets/images/no-product.png";

import {
  isEmpty,
 
  displayAmount,
 
  setLastVisitPage,
} from "src/helpers/helper";
import _ from "lodash";
import { Helmet } from "react-helmet";

import "./style.css";

class RetailerDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      processing: true,
      retailer: null,
      imageIndex: 0,
    };

  }

  componentDidMount() {
    this.loadRetailer();
  }

  loadRetailer = async () => {
    let response = await retailerFetch({
      id: this.props.params.id
    });
    if (response.data.success) {
      this.setState({
        retailer: response.data.data,
        processing: false
      });
    } else {
      this.setState({
        processing: false,
      });
    }
  };

  componentDidUpdate(prevProps) {
    
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }

    return update;
  }

  render() {
    const { retailer } = this.state;
    
    return (
      <div>
        {this.state.processing ? (
          <Loader />
        ) : (
          <>
            {!retailer ? (
              <>
                <div className="no-product">
                  <img src={NoProduct} alt="" />
                  <h1 className="mb-0">Retailer Not Found</h1>
                  <Button variant="primary" className="mt-3">
                    BACK
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Helmet>
                  {!isEmpty(retailer.name) ? (
                    <title>{retailer.name}</title>
                  ) : null}
                  {!isEmpty(retailer.name) ? (
                    <meta name="description" content={retailer.name} />
                  ) : null}
                  {!isEmpty(retailer.name) ? (
                    <meta name="keywords" content={retailer.name} />
                  ) : null}
                </Helmet>
                <div className="product-details-wrapper desktop-view">
                  <Container>
                    <div className="breadcrumb-wrapper">
                      <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                          {'Our Partners'}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{retailer.name}</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <Row>
                      <Col xs={12} md={5}>
                        <div className="product-slider">
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                            }}
                            spaceBetween={10}
                            // loop={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            <SwiperSlide
                              className="p_details_slider_wrapper border rounded"
                              style={{ maxHeight: "100px" }}
                            >
                              <img
                                  className="p_details_slider rounded"
                                  src={retailer.image}
                                />
                            </SwiperSlide>
                          </Swiper>
                          
                        </div>
                      </Col>
                      <Col xs={12} md={7} className="rounded bg-light p-4">
                        <div className="product-details-container">
                          <div className="righ-side-wrapper">
                            <div className="p-container-header">
                              <span>
                                <h3>{retailer.name}</h3>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: retailer.company_name,
                                  }}
                                ></div>
                                
                              </span>
                              
                            </div>
                            
                            <div className="price-breakup mt-3 rounded bg-white shadow">
                              <h2>Contact Details</h2>
                              <div className="underline"></div>
                              <div className="breakup-content">
                                
                                  <div className="breakup-item" >
                                  <span>
                                      {`Email :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.email}
                                  </span>
                                  </div>

                                  <div className="breakup-item" >
                                  <span>
                                      {`Contact Number :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.mobile}
                                  </span>
                                  </div>

                                  <div className="breakup-item" >
                                  <span>
                                      {`Addeess :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.address}
                                  </span>
                                  </div>

                                  <div className="breakup-item" >
                                  <span>
                                      {`Landmark :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.landmark}
                                  </span>
                                  </div>
                              
                                  <div className="breakup-item" >
                                  <span>
                                      {`City :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.city}
                                  </span>
                                  </div>

                                  <div className="breakup-item" >
                                  <span>
                                      {`District :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.district_name}
                                  </span>
                                  </div>

                                  <div className="breakup-item" >
                                  <span>
                                      {`State :`}
                                  </span>{" "}
                                  <span>
                                      {retailer.state_name}
                                  </span>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="product-details-wrapper mobile-view">
                  <Container>
                    <div className="breadcrumb-wrapper">
                      <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item>
                          {`Our Partners`}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{retailer.name}</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    
                    <Row>
                      <Col xs={12} md={5}>
                        <div className="product-slider">
                          <Swiper
                            style={{
                              "--swiper-navigation-color": "#fff",
                              "--swiper-pagination-color": "#fff",
                            }}
                            spaceBetween={10}
                            // loop={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                          >
                            
                              <SwiperSlide
                                key={1}
                                className="p_details_slider_wrapper border rounded"
                                style={{ maxHeight: "100px" }}
                              >
                                <img
                                    className="p_details_slider rounded"
                                    src={retailer.image}
                                  />
                              </SwiperSlide>
                           
                          </Swiper>
                          
                        </div>

                        <div className="righ-side-wrapper mt-3">
                          <div className="p-container-header">
                            <span>
                              <div className="p-name-wrapper">
                                <h3>{retailer.name}</h3>
                              </div>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: retailer.company_name,
                                }}
                              ></div>
                              
                            </span>
                            
                          </div>

                          <div className="price-breakup mt-3 rounded bg-light shadow">
                            <h2>Contact Details</h2>
                            <div className="underline"></div>
                            <div className="breakup-content">

                                <div className="breakup-item" >
                                <span>
                                    {`Email :`}
                                </span>{" "}
                                <span>
                                    {retailer.email}
                                </span>
                                </div>

                                <div className="breakup-item" >
                                <span>
                                    {`Contact Number :`}
                                </span>{" "}
                                <span>
                                    {retailer.mobile}
                                </span>
                                </div>

                                <div className="breakup-item" >
                                <span>
                                    {`Addeess :`}
                                </span>{" "}
                                <span>
                                    {retailer.address}
                                </span>
                                </div>

                                <div className="breakup-item" >
                                <span>
                                    {`Landmark :`}
                                </span>{" "}
                                <span>
                                    {retailer.landmark}
                                </span>
                                </div>
                            
                                <div className="breakup-item" >
                                <span>
                                    {`City :`}
                                </span>{" "}
                                <span>
                                    {retailer.city}
                                </span>
                                </div>

                                <div className="breakup-item" >
                                <span>
                                    {`District :`}
                                </span>{" "}
                                <span>
                                    {retailer.district_name}
                                </span>
                                </div>

                                <div className="breakup-item" >
                                <span>
                                    {`State :`}
                                </span>{" "}
                                <span>
                                    {retailer.state_name}
                                </span>
                                </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //product: state.customer.product.product,
  //processing: state.customer.product.processing,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  actions: bindActionCreators({ retailerFetch }, dispatch),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RetailerDetails)
);

import { UPDATE_WISHLIST_COUNT } from "actionTypes/Customer/wishlist.type";
import {
    allCounts,
    bannerList,
    bestRetailerList,
    promocodeList,
} from "actions/Customer/home.actions";
import {
    current_stock,
    productFetch,
    productListRaw,
} from "actions/Customer/product.actions";
import { WishListAdd } from "actions/Customer/wishlist.actions";
import _ from "lodash";
import React, { Component } from "react";
import { Accordion, Button, Col, Placeholder, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import CountUp from "react-countup";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { CgArrowLongRight } from "react-icons/cg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import ratnBanner from "src/assets/images/banner.png";
import certificate from "src/assets/images/certificate.png";
import exchange from "src/assets/images/exchange.png";
import fb from "src/assets/images/facebook.png";
import facebookBg from "src/assets/images/fb_bg.png";
import insta from "src/assets/images/insta.png";
import jewelleryHome from "src/assets/images/jewelleryHome.png";
import pearlBlue2 from "src/assets/images/pearl-blue-earring.png";
import pearlBlue from "src/assets/images/pearl-blue.png";
import physicalStore from "src/assets/images/physicalStore.png";
import refund from "src/assets/images/refund.png";
import ring from "src/assets/images/ring.png";
import rings from "src/assets/images/rings.png";
import shipping from "src/assets/images/shipping.png";
import {
    convertUnitToGram,
    isEmpty,
    objectToQuery,
    setLastVisitPage,
    weightFormat
} from "src/helpers/helper";
import withRouter from "src/helpers/withRouter";
import getSlider from "src/json/slider_data";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// import { current_stock } from "../../../actions/Customer/product.actions";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PromiseData: {
        image: { jewelleryHome },
        title: "demo",
        description: "demo",
      },
      slider: getSlider,
      details: false,
      categories: this.props.categories,
      featured_products: [],
      best_selling_products: [],
      current_stock_products: [],
      banners: [],
      promocodes: [],
      auth: this.props.auth,
      bestRetailers: [],
      counts: null,
      promise_box: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    return update;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.loadBestSellingProducts();
    this.loadCurrentStockProducts();
    this.loadFeaturedProducts();
    this.loadBanners();
    this.loadPromocodes();
    this.loadBestReatailers();
    this.loadCounts();
  };

  loadBestSellingProducts = async () => {
    let res = await productListRaw({ best_selling: 1 });
    if (res.data.success) {
      this.setState({
        best_selling_products: res.data.data.items,
      });
    }
  };

  loadCurrentStockProducts = async () => {
    let res = await current_stock({
      page: 1,
      limit: 10,
      category_id: "",
      sub_category_id: "",
      search: "",
      all: 0,
      by_specific: 1,
      own_distributor: "",
      own_admin: "",
      own_se: "",
      total_avl_stock: 1,
      manager: "",
    });

    if (res.data.success) {
      console.log(res.data.data.items);
      this.setState({
        current_stock_products: res.data.data.items,
      });
    }
  };

  loadFeaturedProducts = async () => {
    let res = await productListRaw({ is_featured: 1 });
    if (res.data.success) {
      this.setState({
        featured_products: res.data.data.items,
      });
    }
  };

  loadBanners = async () => {
    let res = await bannerList();
    if (res.data.success) {
      this.setState({
        banners: res.data.data.items,
      });
    }
  };

  loadPromocodes = async () => {
    let res = await promocodeList();
    if (res.data.success) {
      this.setState({
        promocodes: res.data.data.items,
      });
    }
  };

  loadBestReatailers = async () => {
    let res = await bestRetailerList();
    if (res.data.success) {
      this.setState({
        bestRetailers: res.data.data,
      });
    }
  };

  loadCounts = async () => {
    let res = await allCounts();
    if (res.data.success) {
      this.setState({
        counts: res.data.data,
      });
    }
  };
  handlePromise = (type) => {
    this.setState({
      promise_box: this.state.promise_box == type ? "" : type,
    });
  };

  getBannerLink = (item) => {
    return item.url.replace(process.env.BASE_URL + "/", "/");
  };

  wishlistHandler = async (product) => {
   if (isEmpty(this.state.auth)) {
       setLastVisitPage();
        this.props.navigate("/login");
       return;
    }

      console.log("this is the products ", product?.certificate_no)
     
      let response = await productFetch(product.slug);
      const product1 = product
      var materials = [];
      if (response.data.success) {
          let product = product1?.certificate_no === undefined ? response.data.data : product1;
          if (product1?.certificate_no === undefined) {
              var selected_materials = product.size_materials[0].materials;
              var size_id = product.size_materials[0].size_id;
              var rate = product.size_materials[0].sale_price;
              var total_weight = 0;
            
              for (let i = 0; i < selected_materials.length; i++) {
                  let thisM = selected_materials[i];
                  let m = _.filter(thisM.purities, { is_selected: true });

                  let total_gram = convertUnitToGram(thisM.unit_name, thisM.weight);
                  total_gram = weightFormat(total_gram);
                  total_weight += parseFloat(total_gram);

                  materials.push({
                      material_id: thisM.material_id,
                      purity_id: m[0].id,
                      weight: thisM.weight,
                      unit_id: thisM.unit_id,
                      quantity: thisM.quantity,
                     
                  });
              }
          } else {

              for (let i = 0; i < product.stock_materials.length; i++) {

                  materials.push({
                      material_id: product.stock_materials[i].material_id,
                      purity_id: product.stock_materials[i].purity_id,
                      weight: product.stock_materials[i].weight,
                      unit_id: product.stock_materials[i].unit_id ,
                      quantity: product.stock_materials[i].quantity,
                      current_image: product.current_image
                  });
              }
          }

          let data = product1?.certificate_no === undefined ? {
              product_id: product.id,
              stock_id: null,
              total_weight: total_weight,
              size_id: product.type !=="material" ? size_id : null,
              type: product.type,
              rate: rate,
              materials: materials,
          } : {
                  product_id: product.product_id,
                  stock_id: null,
                  total_weight: product.total_weight,
                  size_id: product.type !== "material" ? product.size_id : null,
                  type: product.type,
                  rate: product.mrp,
                  materials: materials,
                  current_image: product.current_image
          };


      let res = await WishListAdd(data);
      if (res.data.success) {
        let best_selling_products = this.state.best_selling_products;
        let featured_products = this.state.featured_products;
        best_selling_products = best_selling_products.map((item) =>
          item.id === product.id
            ? { ...item, has_wishlist: res.data.data.status }
            : item
        );
        featured_products = featured_products.map((item) =>
          item.id === product.id
            ? { ...item, has_wishlist: res.data.data.status }
            : item
        );
        this.setState({
          best_selling_products: best_selling_products,
          featured_products: featured_products,
        });
        this.props.dispatch({
          type: UPDATE_WISHLIST_COUNT,
          payload: res.data.data.total,
        });
      }
    }
  };

  render() {
    const {
      featured_products,
      best_selling_products,
      current_stock_products,
      banners,
      promocodes,
      bestRetailers,
      counts,
    } = this.state;

    return (
      <>
        <section className=" pt-5">
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
          <div className="" style={{ padding: "0" }}>
            <Carousel className="rounded-4">
              {banners.map((item, key) => (
                <Carousel.Item key={key}>
                  <Link to={this.getBannerLink(item)}>
                    <div className="slider-banner">
                      <img className="d-block w-100" src={item.image} alt="" />
                    </div>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
            {!banners.length ? (
              <Placeholder animation="glow">
                <Placeholder xs={12} className="slider-banner" />
              </Placeholder>
            ) : null}
          </div>
        </section>
        {/*---- only mob screen -----*/}
        <section className="ornament-slider">
          <Container>
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {this.state.categories.map((item, key) => (
                <SwiperSlide key={key}>
                  <Link to={"/products?category=" + item.slug}>
                    <div className="ornament-image">
                      <Dropdown>
                        <img
                          src={item.icon ? item.icon : ring}
                          alt=""
                          className="border shadow"
                          width={80}
                        />
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <h4>{item.name}</h4>
                        </Dropdown.Toggle>
                        {/*<Dropdown.Menu>
                                                    {
                                                        item.subCategories.map((sub, i) => (
                                                            <Dropdown.Item href={`/products?category=${item.slug}&subcategory=${sub.slug}`} key={i}>{sub.name}</Dropdown.Item>
                                                        ))
                                                    }
                        </Dropdown.Menu>*/}
                      </Dropdown>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </section>
        {promocodes.map((item, key) => (
          <section
            className={key % 2 == 0 ? "diamond-offer" : "pendant-offer"}
            key={key}
          >
            <Link
              to={
                isEmpty(item.products)
                  ? "/products" +
                    objectToQuery(
                      {
                        category: item.category_slug,
                        subcategory: item.sub_category_slug,
                      },
                      true
                    )
                  : "/products?offer=" + item.products
              }
            >
              <Container
                className={
                  (key % 2 == 0 ? "diamond-inner" : "pendant-inner") +
                  " mt-2 mb-3 mt-md-4 mb-md-2 position-relative rounded"
                }
                style={{
                  backgroundImage: `url(${item.banner}) `,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "cover",
                }}
              >
                {/*<div className={(key%2==0) ? 'offer-header' : 'pendant-header'}>
                                    <h2>{item.title}</h2>
                                    <span className='shop-now'>Shop Now</span>
                                </div>*/}
              </Container>
              <Container style={{ padding: 0 }} className="mt-3">
                <div className="banner-heading-content text-primary-emphasis ">
                  <h2 className="bg-light rounded px-xl-5">{item.title}</h2>
                  <Link
                    className="ratn-shop-now bg-primary-emphasis rounded"
                    to={
                      isEmpty(item.products)
                        ? "/products" +
                          objectToQuery(
                            {
                              category: item.category_slug,
                              subcategory: item.sub_category_slug,
                            },
                            true
                          )
                        : "/products?offer=" + item.products
                    }
                  >
                    Shop Now
                  </Link>
                </div>
              </Container>
            </Link>
          </section>
        ))}
        {/*<section className='diamond-offer'>
                    <Container className='diamond-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${diamond}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='offer-header'>
                            <h2>Diamond Rings at
                                30% OFF</h2>
                            <a href='/products' className='shop-now'>Shop Now</a>
                        </div>

                    </Container>
                </section>
                <section className='earring-offer'>
                    <Container className='earring-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${earring}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='earring-header'>
                            <h2>Earrings at 40% OFF at AXIS
                                Bank Debit & Credit Cards</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</p>
                            <a href='/products' className='shop-now'>Explore <CgArrowLongRight /></a>
                        </div>

                    </Container>
                </section>
                <section className='pendant-offer'>
                    <Container className='pendant-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${pendant}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='pendant-header'>
                            <h2>Get Beautiful Pendants at only ₹8999</h2>
                            <a href='/products' className='shop-now'>Shop Now</a>
                        </div>

                    </Container>
                </section>
                <section className='affordable-earring'>
                    <Container className='affordable-earring-inner mt-3 mb-3 mt-md-4 mb-md-4 position-relative' style={{ backgroundImage:`url(${affordableearring}) `, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: 'auto 100%'  }}>
                        <div className='affordable-earring-header'>
                            <h2>Affordable Earrings at ₹9,999</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                            <a href='/products' className='shop-now'>Explore <CgArrowLongRight /></a>
                        </div>

                    </Container>
                </section>*/}
        <section className="selling-product">
          <Container>
            <div className="selling-product-header d-flex justify-content-between mb-4">
              <h2>Current Stock Products | {current_stock_products.length}</h2>
              <Link className="ratn-shop-now bg-primary-emphasis rounded ">
                Shop Now
              </Link>
            </div>
            <Swiper
              spaceBetween={20}
              onSlideChange={() => console.log("slide change")}
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
              {current_stock_products.map((product, key) => (
                <SwiperSlide key={key}>
                  <div className="slide-swipe-inner rounded overflow-hidden">
                    <div className="s-slider-image rounded-top">
                      <Link to={"products/" + product.slug}>
                        <img
                          src={product.current_image==null?product.image:product.current_image}
                          className="rounded-top Scale_on_hover"
                          alt="selling product"
                        />
                      </Link>
                      <div className="wishlist rounded-circle ">
                        {product.has_wishlist ? (
                          <BsHeartFill
                            onClick={() => this.wishlistHandler(product)}
                            className="wishlist_active"
                            role="button"
                          />
                        ) : (
                          <BsHeart
                            onClick={() => this.wishlistHandler(product)}
                            role="button"
                          />
                        )}
                      </div>
                    </div>
                    <div className="s-slider-content rounded-bottom">
                      <div className="d-flex justify-content-between">
                        <h2>{product.mrp_display}</h2>
                        <Button variant="primary">Add to Cart</Button>
                      </div>
                      <div>
                        <Accordion flush>
                          <Accordion.Item
                            eventKey={key}
                            className=""
                          >
                            <Accordion.Button className="p-0 w-auto m-auto"></Accordion.Button>
                            <Accordion.Body className="p-0">
                              <h6 className="d-flex justify-content-between">
                                <span className="fw-bold">
                                  size:
                                </span>
                                <span>
                                  {product.size_name}
                                </span>
                              </h6>
                              {
                                    product.stock_materials.map((items,index)=>{
                                        return (
                                          <h6 key={index} className="d-flex justify-content-between">
                                            <span  className="fw-bold">{items.material_name}</span>
                                            <span>{items.quantity} x {(Number(items.weight)).toFixed(2)}{items.unit_name}</span>
                                          </h6>
                                        )
                                    })
                                  }
                                  <h6 className="d-flex justify-content-between">
                                    <span className="fw-bold">Total Weight:</span>
                                    <span>{product .total_weight_display}</span>
                                  </h6>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                      <div className="ring-price">
                        <span className="offer-price">
                          {" "}
                          {product.sale_price_display}{" "}
                        </span>
                        {product.have_offer ? (
                          <>
                            {" "}
                            <span className="me-2 text-danger">Save</span>{" "}
                            <span className="item-price text-primary-emphasis">
                              {" "}
                              {product.mrp_display}{" "}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/*---- <SwiperSlide>
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
        {best_selling_products.length ? (
          <section className="selling-product">
            <Container>
              <div className="selling-product-header">
                <h1>Best Selling Products</h1>
              </div>
              <Swiper
                spaceBetween={20}
                onSlideChange={() => console.log("slide change")}
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
                {best_selling_products.map((product, key) => (
                  <SwiperSlide key={key}>
                    <div className="slide-swipe-inner rounded overflow-hidden">
                      <div className="s-slider-image rounded-top">
                        <Link to={"products/" + product.slug}>
                          <img
                            src={product.default_image}
                            className="rounded-top Scale_on_hover"
                            alt="selling product"
                          />
                        </Link>
                        <div className="wishlist rounded-circle ">
                          {product.has_wishlist ? (
                            <BsHeartFill
                              onClick={() => this.wishlistHandler(product)}
                              className="wishlist_active"
                              role="button"
                            />
                          ) : (
                            <BsHeart
                              onClick={() => this.wishlistHandler(product)}
                              role="button"
                            />
                          )}
                        </div>
                      </div>
                      <div className="s-slider-content rounded-bottom">
                        <h2>{product.name}</h2>
                        <div className="ring-price">
                          <span className="offer-price">
                            {" "}
                            {product.sale_price_display}{" "}
                          </span>
                          {product.have_offer ? (
                            <>
                              {" "}
                              <span className="me-2 text-danger">
                                Save
                              </span>{" "}
                              <span className="item-price text-primary-emphasis">
                                {" "}
                                {product.mrp_display}{" "}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/*---- <SwiperSlide>
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
        ) : null}
        {/*<div className='gap-100'></div>*/}
        {featured_products.length ? (
          <section className="feature-product bg-white ">
            <Container className="bg-light py-3">
              <div className="feature-product-header">
                <h1 style={{ color: "#001e38" }}>Featured Products</h1>
              </div>
              <Swiper
                spaceBetween={20}
                onSlideChange={() => console.log("slide change")}
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
                {featured_products.map((product, key) => (
                  <SwiperSlide className=" rounded" key={key}>
                    <div className="slide-swipe-inner rounded overflow-hidden">
                      <div className="s-slider-image rounded-top">
                        <Link to={"products/" + product.slug}>
                          <img
                            src={product.default_image}
                            className="rounded-top Scale_on_hover"
                            alt="feature product"
                          />
                        </Link>
                        <div className="wishlist rounded-circle ">
                          {product.has_wishlist ? (
                            <BsHeartFill
                              onClick={() => this.wishlistHandler(product)}
                              className="wishlist_active"
                              role="button"
                            />
                          ) : (
                            <BsHeart
                              onClick={() => this.wishlistHandler(product)}
                              role="button"
                            />
                          )}
                        </div>
                      </div>
                      <div className="s-slider-content rounded-bottom">
                        <h2>{product.name}</h2>
                        <div className="ring-price">
                          <span className="offer-price">
                            {" "}
                            {product.sale_price_display}{" "}
                          </span>
                          {product.have_offer ? (
                            <span>
                              <span className="me-2 text-danger">Save</span>
                              <span className="item-price text-primary-emphasis">
                                {" "}
                                {product.mrp_display}{" "}
                              </span>
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Container>
          </section>
        ) : null}
        <section className="blue-pearl mt-3 mb-3 mt-md-4 mb-md-4 position-relative">
          <Container>
            <Row>
              <Col xs={4} md={4} className="blue-pearl-image-div">
                <div className="blue-pearl-image  shadow rounded">
                  <img src={pearlBlue} className="rounded" alt="" />
                </div>
              </Col>
              <Col md={8} className="blue-pearl-div">
                {/* <div className="blue-pearl-inner position-relative">
                  <img src={pearlBlue2} alt="" />
                  <div className="overlay"></div>
                  <div className="blue-pearl-content">
                    <h2>Pearl Blue Diamond Earring</h2>
                    <p>₹9,726 only</p>
                  </div>
                </div> */}
                <div id="carouselExampleCaptions" class="carousel slide">
                  <div class="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="0"
                      class="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src={pearlBlue2} class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>
                          Some representative placeholder content for the first
                          slide.
                        </p>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img src={pearlBlue2} class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>
                          Some representative placeholder content for the second
                          slide.
                        </p>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <img src={pearlBlue2} class="d-block w-100" alt="..." />
                      <div class="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>
                          Some representative placeholder content for the third
                          slide.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="promise promise-desktop bg-light">
          <Container>
            <h2 className="text-center ">Our Promise</h2>

            <Row>
              <Col xs={6} md={4}>
                <div className="promise-box rounded-4">
                  <img src={certificate} alt="" />
                  <div className="promise-content">
                    <h4 className="text-center">
                      100% Certified <br /> Jewellery
                    </h4>
                  </div>
                  <div className="promise-overlay-content">
                    <h2>Certificate Authentication</h2>
                    <div className="overlay-underline"></div>
                    <p>Importance of Certification</p>
                    <p>
                      Discover the allure of Prakriti Jewels, where every
                      diamond is 100% certified for brilliance and authenticity.
                      Our collection showcases exquisite craftsmanship and
                      timeless elegance, ensuring each piece radiates
                      unparalleled beauty and quality. Elevate your style with
                      confidence, knowing that your jewelry is not only stunning
                      but also authentically certified. Choose Prakriti Jewels
                      for perfection you can trust.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="promise-box rounded-4">
                  <img src={refund} alt="" />
                  <div className="promise-content">
                    <h4 className="text-center">
                      100% <br />
                      Refund Policy
                    </h4>
                  </div>
                  <div className="promise-overlay-content">
                    <h2>100% Refund Policy</h2>
                    <div className="overlay-underline"></div>
                    <p>
                      At Prakriti Jewels, we stand by the quality of our pieces
                      with a 100% refund policy. If you're not completely
                      satisfied, return your jewelry within 7 days for a full
                      refund. Our commitment is to your complete satisfaction
                      and confidence in every purchase. Shop with peace of mind,
                      knowing your satisfaction is guaranteed.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="promise-box rounded-4">
                  <img src={exchange} alt="" />
                  <div className="promise-content">
                    <h4 className="text-center">Free Trial</h4>
                  </div>
                  <div className="promise-overlay-content">
                    <h2>Free Trial</h2>
                    <div className="overlay-underline"></div>
                    <p>
                      Experience the elegance of Prakriti Jewels with our free
                      trial offer. Try on our exquisite jewelry pieces at home,
                      with no obligation to buy. Discover how our stunning
                      designs complement your style and make a confident choice.
                      Enjoy the luxury of a personal trial and find your perfect
                      match, all from the comfort of your own space.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="promise-box rounded-4">
                  <img src={shipping} alt="" />
                  <div className="promise-content">
                    <h4 className="text-center">
                      Free <br /> Delivery
                    </h4>
                  </div>
                  <div className="promise-overlay-content">
                    <h2>Free Delivery</h2>
                    <div className="overlay-underline"></div>
                    <p>
                      Enjoy free delivery with every purchase from Prakriti
                      Jewels. We ensure your exquisite jewelry arrives at your
                      doorstep swiftly and securely, without any added cost.
                      Experience the luxury of our elegant designs delivered
                      right to you, with no shipping fees. Shop with ease and
                      confidence, knowing that exceptional service is part of
                      your Prakriti Jewels experience.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="promise-box rounded-4">
                  <img src={jewelleryHome} alt="" />
                  <div className="promise-content">
                    <h4 className="text-center">
                      Genuine <br />
                      Price
                    </h4>
                  </div>
                  <div className="promise-overlay-content">
                    <h2>Genuine Price</h2>
                    <div className="overlay-underline"></div>
                    <p>
                      At Prakriti Jewels, we pride ourselves on offering genuine
                      prices for our stunning jewelry. Each piece is crafted
                      with exceptional quality and transparent pricing, ensuring
                      you receive true value for your investment. Enjoy
                      exquisite designs and authentic beauty without hidden
                      costs. Shop confidently, knowing that our prices reflect
                      both integrity and the finest craftsmanship.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="promise-box rounded-4">
                  <img src={physicalStore} alt="" />
                  <div className="promise-content">
                    <h4 className="text-center">
                      Near <br />
                      By Store
                    </h4>
                  </div>
                  <div className="promise-overlay-content">
                    <h2>Near By Store</h2>
                    <div className="overlay-underline"></div>
                    <p>
                      <strong>Corp. Office:</strong>
                    </p>
                    <p>
                      P210 Strand Bank Road, East Bengal Market, Barabazar,
                      Kolkata - 700 007
                    </p>
                    <p>
                      <strong>Branch Office:</strong>
                    </p>
                    <p>
                      3rd Floor - G100 PC colony Near (Sri Ram Hospital),
                      Kankarbag Patna - 800 020
                    </p>
                    <p>
                      <strong>Contact:</strong>
                    </p>
                    <p> +91 98744 45878</p>
                    <p>
                      <strong>Email:</strong>
                    </p>
                    <p>support@Prakriti.com</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="staticBackdrop"
          // data-bs-backdrop="static"
          // data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="false"
        >
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content ">
              <div class="modal-body p-2">
                <h5 className="text-center mb-4 mx-auto">
                  <img
                    src={this.state.PromiseData.image}
                    alt={this.state.PromiseData.title}
                    width={50}
                    className="me-2"
                  />
                  <span>{this.state.PromiseData.title}</span>
                </h5>
                <h6 className="lh-base">
                  {this.state.PromiseData.description}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <section className="promise promise-mobile">
          <Container>
            <h2 className="text-center">Our Promise</h2>

            <Row>
              <Col
                xs={4}
                className="p-0"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <div
                  className={
                    "promise-box" +
                    (this.state.promise_box == "gemsjewellry1" ? " active" : "")
                  }
                  onClick={() => {
                    this.handlePromise("gemsjewellry1");
                    this.setState({
                      PromiseData: {
                        image: certificate,
                        title: "100% Certified jewellery",
                        description:
                          "Discover the allure of Prakriti Jewels, where every diamond is 100% certified for brilliance and authenticity. Our collection showcases exquisite craftsmanship and timeless elegance, ensuring each piece radiates unparalleled beauty and quality. Elevate your style with confidence, knowing that your jewelry is not only stunning but also authentically certified. Choose Prakriti Jewels for perfection you can trust.",
                      },
                    });
                  }}
                >
                  <div className=" border rounded ">
                    <img src={certificate} alt="" className="m-auto" />
                    <h6
                      className="text-center fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      100% Certified Jewellery
                    </h6>
                  </div>
                </div>
              </Col>
              <Col
                xs={4}
                className="p-0"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <div
                  className={
                    "promise-box" +
                    (this.state.promise_box == "gemsjewellry2" ? " active" : "")
                  }
                  onClick={() => {
                    this.handlePromise("gemsjewellry2");
                    this.setState({
                      PromiseData: {
                        image: refund,
                        title: " 100% Refund Policy",
                        description:
                          "At Prakriti Jewels, we stand by the quality of our pieces with a 100% refund policy. If you're not completely satisfied, return your jewelry within 7 days for a full refund. Our commitment is to your complete satisfaction and confidence in every purchase. Shop with peace of mind, knowing your satisfaction is guaranteed.",
                      },
                    });
                  }}
                >
                  <div className=" border rounded ">
                    <img src={refund} alt="" className="m-auto" />
                    <h6
                      className="text-center fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      100% Refund <br /> Policy
                    </h6>
                  </div>
                </div>
              </Col>
              <Col
                xs={4}
                className="p-0"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <div
                  className={
                    "promise-box" +
                    (this.state.promise_box == "gemsjewellry3" ? " active" : "")
                  }
                  onClick={() => {
                    this.handlePromise("gemsjewellry3");
                    this.setState({
                      PromiseData: {
                        image: exchange,
                        title: "Free Trial",
                        description:
                          "Experience the elegance of Prakriti Jewels with our free trial offer. Try on our exquisite jewelry pieces at home, with no obligation to buy. Discover how our stunning designs complement your style and make a confident choice. Enjoy the luxury of a personal trial and find your perfect match, all from the comfort of your own space.",
                      },
                    });
                  }}
                >
                  <div className="border rounded ">
                    {" "}
                    <img src={exchange} alt="" className="m-auto" />
                    <h6
                      className="text-center fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      Free Trial <br />
                      <br />
                    </h6>
                  </div>
                </div>
              </Col>
              <Col
                xs={4}
                className="p-0"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <div
                  className={
                    "promise-box" +
                    (this.state.promise_box == "gemsjewellry4" ? " active" : "")
                  }
                  onClick={() => {
                    this.handlePromise("gemsjewellry4");
                    this.setState({
                      PromiseData: {
                        image: shipping,
                        title: "Free  Delivery",
                        description:
                          "Enjoy free delivery with every purchase from Prakriti Jewels. We ensure your exquisite jewelry arrives at your doorstep swiftly and securely, without any added cost. Experience the luxury of our elegant designs delivered right to you, with no shipping fees. Shop with ease and confidence, knowing that exceptional service is part of your Prakriti Jewels experience. ",
                      },
                    });
                  }}
                >
                  <div className="border rounded ">
                    <img src={shipping} alt="" className="m-auto" />
                    <h6
                      className="text-center fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      Free <br /> Delivery
                    </h6>
                  </div>
                </div>
              </Col>
              <Col
                xs={4}
                className="p-0"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <div
                  className={
                    "promise-box" +
                    (this.state.promise_box == "gemsjewellry5" ? " active" : "")
                  }
                  onClick={() => {
                    this.handlePromise("gemsjewellry5");
                    this.setState({
                      PromiseData: {
                        image: jewelleryHome,
                        title: " Genuine Price",
                        description:
                          "At Prakriti Jewels, we pride ourselves on offering genuine prices for our stunning jewelry. Each piece is crafted with exceptional quality and transparent pricing, ensuring you receive true value for your investment. Enjoy exquisite designs and authentic beauty without hidden costs. Shop confidently, knowing that our prices reflect both integrity and the finest craftsmanship.",
                      },
                    });
                  }}
                >
                  <div className="border rounded ">
                    <img src={jewelleryHome} alt="" className="m-auto" />
                    <h6
                      className="text-center fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      Genuine <br />
                      Price
                    </h6>
                    {/* <span className="pro-icon">
                      <RiArrowDownSLine />
                    </span> */}
                  </div>
               
                </div>
              </Col>
              <Col
                xs={4}
                className="p-0"
                // data-bs-toggle="modal"
                // data-bs-target="#staticBackdrop"
              >
                <div
                  className={
                    "promise-box" +
                    (this.state.promise_box == "gemsjewellry6" ? " active" : "")
                  }
                  onClick={() => this.handlePromise("gemsjewellry6")}
                >
                  <div className="border rounded ">
                    <img src={physicalStore} alt="" className="m-auto" />
                    <h6
                      className="text-center fw-bold"
                      style={{ fontSize: "10px" }}
                    >
                      Near <br />
                      By Store
                    </h6>
                    {/* <span className="pro-icon">
                      <RiArrowDownSLine />
                    </span> */}
                  </div>
                 
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/*<div className='gap-100'></div>*/}
        <section className="browse-rings position-relative">
          <Container fluid>
            <Row>
              <Col xs={6} md={4}>
                <div className="browse-ring-header">
                  <h6 style={{ color: "#001e38" }}>Browse all Rings</h6>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever.
                  </p>
                  <a href="/products" className="browse-now rounded">
                    Explore <CgArrowLongRight />
                  </a>
                </div>
              </Col>
              <Col xs={6} md={8}></Col>
            </Row>
          </Container>
          <div className="browse-rings-banner rounded-start">
            <img src={rings} alt="" className="rounded-start" />
          </div>
        </section>

        {bestRetailers.length ? (
          <section className="feature-product best-retailer">
            <Container>
              <div className="feature-product-header">
                <h1>Best Retailers</h1>
              </div>
              <Swiper
                spaceBetween={20}
                onSlideChange={() => console.log("slide change")}
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
                    slidesPerView: 4,
                  },
                  // when window width is >= 1024px
                  1440: {
                    width: 1440,
                    slidesPerView: 4,
                  },
                }}
              >
                {bestRetailers.map((item, key) => (
                  <SwiperSlide key={key}>
                    <div className="slide-swipe-inner rounded overflow-hidden">
                      <div className="b-slider-image">
                        <img
                          src={item.image}
                          className=""
                          alt="feature product"
                        />
                      </div>
                      <div className="b-slider-content">
                        <h2>{item.name}</h2>
                        <span className="seller-description">
                          <ul>
                            <li>
                              <FaMapMarkerAlt />
                            </li>
                            <li>{item.address}</li>
                          </ul>
                        </span>
                        <div className="ring-price">
                          {/* <span className='offer-price'> {item.since} </span> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Container>
          </section>
        ) : null}

      
        <section className="ratn-banner">
          <Container>
            <div className="ratn-banner-image position-relative">
              <img src={ratnBanner} alt="" />
              <div className="banner-overlay">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been
                </p>
                {/* <a href='' className='learn-more'>Learn More</a> */}
              </div>
            </div>
          </Container>
        </section>
        <section className="address-map">
          <Container>
            <div className="review-header">
              <h3 className="text-center">The Prakriti Store</h3>
              <p>
                Our stores are cool and contemporary spaces that offer an
                immersive jewellery browsing and shopping experience, and
                encourage you to linger as long as you like.
              </p>
            </div>
          
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
               

                <Col sm={12}>
                  <Nav
                    variant="pills"
                    className="flex-row justify-content-center"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="first" className="rounded me-3">
                        Kolkata
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="second"
                        className="rounded btn btn-outline-dark"
                      >
                        Patna
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Container>
                        <Row>
                          <Col xs={12} md={12}>
                            <div className="map-wrapper-list rounded">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8728946666283!2d88.34720051427394!3d22.583856738250365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b918617de7%3A0xe6c77375f9def3eb!2sP-210%2C%20Strand%20Bank%20Rd%2C%20Fairley%20Place%2C%20B.B.D.%20Bagh%2C%20Kolkata%2C%20West%20Bengal%20700001!5e0!3m2!1sen!2sin!4v1675867314000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: "0" }}
                                allowFullScreen
                                loading="lazy"
                              ></iframe>
                              <div className="list-wrapper">
                                <div className="list-name">
                                  <h1> Corp. Office</h1>
                                  <p>
                                    {" "}
                                    P210 Strand Bank Road, East Bengal Market,
                                    Barabazar, Kolkata - 700 007
                                  </p>
                                  <p>
                                    Contact: +91 98744 00341, Email:
                                    support@Prakriti.com
                                  </p>
                                </div>
                                <div className="list-name right-para">
                                  <p> Store Timings: 11am to 9pm </p>
                                  <p> Contact Number: 9874400341</p>
                                  <div className="list-name margin-right">
                                    <a
                                      href="https://goo.gl/maps/Lvo98VSdiUdkVWKA6"
                                      target="_blank"
                                    >
                                      <Button
                                        variant="primary"
                                        className="rounded"
                                      >
                                        GET DIRECTION
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} md={12}>
                            
                          </Col>
                        </Row>
                      </Container>
                    </Tab.Pane>

                    <Tab.Pane eventKey="second">
                      <Container>
                        <Row className="overflow-tabs">
                          <Col xs={12} md={12}>
                            <div className="map-wrapper-list">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.1377741388105!2d85.15243301433607!3d25.600337721510222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed597b97b8094b%3A0x4c2050111692585f!2sSpeckarts.com!5e0!3m2!1sen!2sin!4v1675866191579!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: "0" }}
                                allowFullScreen
                                loading="lazy"
                              ></iframe>
                              <div className="list-wrapper">
                                <div className="list-name">
                                  <p>
                                    All types of gemstones, diamond jewelry,
                                    rudraksha, and sphatik are provided to
                                    retail our partners at wholesale rates. We
                                    assure you that we will deliver all your
                                    orders in a short period of time. There may
                                    be a difference in the current price from
                                    the order & catalog price, as per the
                                    current rate.
                                  </p>
                                  <h1> Branch Office</h1>
                                  <p>
                                    {" "}
                                    3rd Floor - G100 PC colony Near (Sri Ram
                                    Hospital), Kankarbag Patna - 800 020{" "}
                                  </p>
                                  <p>
                                    Contact: +91 98744 45878, Email:
                                    support@Prakriti.com
                                  </p>
                                </div>
                                <div className="list-name right-para">
                                  <p>
                                    {" "}
                                    WE PROVIDE THE SERVICE OF DISTRIBUTORSHIP TO
                                    YOU.{" "}
                                  </p>
                                  <p>
                                    On order, we can make customized jewelry as
                                    per your designs. For all orders and
                                    inquiries, contact us.
                                  </p>
                                  <p> Store Timings: 11am to 9pm </p>
                                  <p> WEBSITE: www.Prakriti.com </p>
                                  <p> Contact Number: 9874445878</p>
                                  <div className="list-name margin-right">
                                    <a
                                      href="https://goo.gl/maps/6ZfV7dNiGwG6ZAJQ8"
                                      target="_blank"
                                    >
                                      <Button variant="primary">
                                        GET DIRECTION
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xs={12} md={12}>
                          
                          </Col>
                        </Row>
                      </Container>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </section>

        <section className="socialmedia-wrapper">
          <Container>
            <div className="social-container-wrapper">
              <div className="social-single-container">
                <div className="social-single-header">
                  <a href="https://www.facebook.com/profile.php?id=61562684953886">
                    <img src={fb} alt="" />
                    <h4>Facebook</h4>
                  </a>
                </div>
                <a href="https://www.facebook.com/profile.php?id=61562684953886"></a>
                <img src={facebookBg} className="fb_bg" alt="" />
              </div>
              <div className="social-single-container">
                <div className="social-single-header">
                  <a href="https://www.instagram.com/prakritidiamonds/">
                    <img src={insta} alt="" />
                    <h4>Instagram</h4>
                  </a>
                </div>

                <ul className="social-info">
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
        {counts ? (
          <section className="socialmedia-wrapper">
            <Container>
              <ul id="counter">
                <li className="rounded">
                  <span className="count percent">
                    <CountUp end={counts.products} suffix="+" duration={5} />
                  </span>
                  <div className="counter_header">
                    <h1>Products</h1>
                  </div>
                </li>
                <li className="rounded">
                  <span className="count percent">
        
                    <CountUp end={250} suffix="+" duration={5} />
                  </span>
                  <div className="counter_header">
                    <h1>Retailers</h1>
                  </div>
                </li>
                <li className="rounded team_count">
                  <span className="count percent">
                    <CountUp
                      end={counts.team_members}
                      suffix="+"
                      duration={5}
                    />
                  </span>
                  <div className="counter_header ">
                    <h1>Team Members</h1>
                  </div>
                </li>
              </ul>
            </Container>
          </section>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.customer.categories.items,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);

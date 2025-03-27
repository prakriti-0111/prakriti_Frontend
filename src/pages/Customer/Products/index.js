import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  Button,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { BsFilterLeft, BsFillPlayFill, BsCheck2 } from "react-icons/bs";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { productList, productFetch } from "actions/Customer/product.actions";
import { WishListAdd } from "actions/Customer/wishlist.actions";
import withRouter from "src/helpers/withRouter";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import Loader from "../Loader";
import { BiHeart } from "react-icons/bi";
import NoProduct from "src/assets/images/no-product.png";
import { toast } from "react-toastify";
import {
  isEmpty,
  priceFormat,
  displayAmount,
  setLastVisitPage,
  convertUnitToGram,
  weightFormat,
} from "src/helpers/helper";
import Searchbanner from "src/assets/images/ratn_banner.png";
import { CUSTOMER_PRODUCT_WISHLIST_UPDATE } from "actionTypes/Customer/product.types";
import { UPDATE_WISHLIST_COUNT } from "actionTypes/Customer/wishlist.type";
import _ from "lodash";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      processing: false,
      products: [],
      categories: this.props.categories,
      total: 0,
      is_added_wishlist: "black",
      wl_actionCalled: this.props.wl_actionCalled,
      wl_createSuccess: this.props.wl_createSuccess,
      wl_successMessage: this.props.wl_successMessage,
      search_inpt: "",
      video_product: null,
      videoDialog: false,
      sort_by: "popular",
    };

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.loadProducts(this.props.query.get("search"));
  }
  componentDidUpdate(prevProps) {
    if (this.state.wl_actionCalled) {
      if (this.state.wl_createSuccess) {
        toast.success(this.state.wl_successMessage);
      }
    }
    if (
      this.props.query.get("category") != prevProps.query.get("category") ||
      this.props.query.get("subcategory") !=
        prevProps.query.get("subcategory") ||
      this.props.query.get("search") != prevProps.query.get("search") ||
      this.props.query.get("offer") != prevProps.query.get("offer") ||
      this.props.query.get("recent_view") != prevProps.query.get("recent_view")
    ) {
      if (this.props.query.get("search")) {
        this.setState(
          {
            search_inpt: this.props.query.get("search"),
          },
          () => {
            this.loadProducts();
          }
        );
      } else {
        this.loadProducts();
      }
    }
  }
  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.auth !== state.auth) {
      update.auth = props.auth;
    }
    // if (props.processing !== state.processing) {
    //     update.processing = props.processing;
    // }
    // if (props.products !== state.products) {
    //     update.products = props.products;
    // }
    if (props.categories !== state.categories) {
      update.categories = props.categories;
    }
    // if (props.total !== state.total) {
    //     update.total = props.total;
    // }
    if (props.wl_actionCalled !== state.wl_actionCalled) {
      update.wl_actionCalled = props.wl_actionCalled;
    }
    if (props.wl_createSuccess !== state.wl_createSuccess) {
      update.wl_createSuccess = props.wl_createSuccess;
    }
    if (props.wl_successMessage !== state.wl_successMessage) {
      update.wl_successMessage = props.wl_successMessage;
    }
    return update;
  }

  handleSearchChange = (event) => {
    this.setState({
      search_inpt: event.target.value,
    });
  };

  loadProducts = (search) => {
    let thisSearchText = search === undefined ? this.state.search_inpt : search;
    if (search) {
      this.setState({
        search_inpt: search,
      });
    }
    let limit = 20;
    let params = {
      category: this.props.query.get("category") || "",
      subcategory: this.props.query.get("subcategory") || "",
      offer: this.props.query.get("offer") || "",
      recent_view: this.props.query.get("recent_view") || "",
      search: thisSearchText,
      sort_by: this.state.sort_by,
    };
    this.setState({
      processing: true,
    });
    productList({ ...params, page: 1, limit: limit }).then((res) => {
      if (res.data.success) {
        this.setState(
          {
            products: res.data.data.items,
            total: res.data.data.total,
            processing: false,
          },
          () => {
            this.softLoadProducts(
              { ...params, page: 2, limit: limit },
              res.data.data.total
            );
          }
        );
      }
    });
  };

  softLoadProducts = (params, total) => {
    let totalPage = Math.ceil(total / params.limit);
    if (totalPage >= params.page) {
      productList(params).then((res) => {
        if (res.data.success) {
          this.setState(
            {
              products: this.state.products.concat(res.data.data.items),
            },
            () => {
              if (totalPage >= params.page + 1) {
                this.softLoadProducts(
                  { ...params, page: params.page + 1 },
                  res.data.data.total
                );
              }
            }
          );
        }
      });
    }
  };

  handleSearch = () => {
    this.setState(
      {
        sort_by: "",
      },
      () => {
        this.loadProducts();
      }
    );
  };
  handlesortBy = (event) => {
    let sort_by = event.target.name;
    this.setState(
      {
        sort_by: sort_by,
      },
      () => {
        if (sort_by == "popular" || sort_by == "whats_new") {
          this.loadProducts();
        }
      }
    );
  };

  wishlistHandler = async (product) => {
    if (isEmpty(this.state.auth)) {
      setLastVisitPage();
      this.props.navigate("/login");
      return;
    }

    let response = await productFetch(product.slug);
    if (response.data.success) {
      let product = response.data.data;
      let selected_materials = product.size_materials[0].materials;
      let size_id = product.size_materials[0].size_id;
      let rate = product.size_materials[0].sale_price;
      let total_weight = 0;
      let materials = [];

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

      let data = {
        product_id: product.id,
        stock_id: null,
        total_weight: total_weight,
        size_id: product.type != "material" ? size_id : null,
        type: product.type,
        rate: rate,
        materials: materials,
      };

      let res = await WishListAdd(data);
      if (res.data.success) {
        this.props.dispatch({
          type: CUSTOMER_PRODUCT_WISHLIST_UPDATE,
          payload: res.data.data,
        });
        this.props.dispatch({
          type: UPDATE_WISHLIST_COUNT,
          payload: res.data.data.total,
        });
      }
    }
  };
  handleProductDetails = (product) => {
    this.props.navigate(product.slug);
  };

  openVideo = (product) => {
    this.setState(
      {
        video_product: product,
        videoDialog: true,
      },
      () => {
        setTimeout(() => {
          if (this.videoRef) {
            this.videoRef.current?.load();
          }
        }, 200);
      }
    );
  };

  handleVideoClose = () => {
    this.setState({
      videoDialog: false,
    });
  };

  getProducts = () => {
    let products = [...this.state.products];
    if (this.state.sort_by == "price_low_high") {
      products.sort(
        (a, b) => parseFloat(a.sale_price) - parseFloat(b.sale_price)
      );
    } else if (this.state.sort_by == "price_high_low") {
      products.sort(
        (a, b) => parseFloat(b.sale_price) - parseFloat(a.sale_price)
      );
    } else if (this.state.sort_by == "discount") {
      products.sort(
        (a, b) => parseFloat(b.total_save) - parseFloat(a.total_save)
      );
    }
    return products;
  };

  getSearchBy = () => {
    if (
      this.props.query.get("category") &&
      this.props.query.get("subcategory")
    ) {
      let category = _.filter(this.state.categories, (s) => {
        return s.slug == this.props.query.get("category");
      });
      if (category.length) {
        let subcategory = _.filter(category[0].subCategories, (s) => {
          return s.slug == this.props.query.get("subcategory");
        });
        if (subcategory.length) {
          return subcategory[0].name;
        }
      }
    } else if (this.props.query.get("category")) {
      let category = _.filter(this.state.categories, (s) => {
        return s.slug == this.props.query.get("category");
      });
      if (category.length) {
        return category[0].name;
      }
    } else if (this.props.query.get("offer")) {
      return "Offer";
    } else if (this.props.query.get("recent_view")) {
      return "Recently Viewed";
    }

    return "Search";
  };

  getBanner = () => {
    if (this.props.query.get("category")) {
      let category = _.filter(this.state.categories, (s) => {
        return s.slug == this.props.query.get("category");
      });
      if (category.length) {
        return category[0].banner;
      }
    }
    return "";
  };

  getMobile = () => {
    if (this.props.query.get("category")) {
      let category = _.filter(this.state.categories, (s) => {
        return s.slug == this.props.query.get("category");
      });
      if (category.length) {
        return category[0].Mobile;
      }
    }
    return "";
  };

  render() {
    let productList = this.getProducts();
    let banner = this.getBanner();
    let mobile = this.getMobile();
    let searchBy = this.getSearchBy();
    return (
      <div className="search-wrapper">
        <div className="search_wrapper_header ">
          <div className="breadcrumb-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>
                {searchBy} |{this.state.total} DESIGNS
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {window.innerWidth > 750 ? (
            banner ? (
              <div
                className="banner-search rounded mb-3 "
                style={{ height: "100px" }}
              >
                <img src={banner} className="rounded" alt="" />
              </div>
            ) : null
          ) : mobile ? (
            <div className=" rounded" style={{ height: "100px" }}>
              <img src={mobile} className="rounded" alt="" />
            </div>
          ) : null}
        </div>
        <Container>
          {/* <div className="products_header_title">
            <ul>
              <li>
                <h1>{searchBy}</h1>
              </li>
              <li>|</li>
              <li>
                <span> {this.state.total} </span> DESIGNS
              </li>
            </ul>
          </div> */}
          <div className="search-area desktop-search rounded bg-light">
            <InputGroup className=" rounded bg-light">
              <Form.Control
                placeholder="Search here..."
                name="search"
                value={this.state.search_inpt}
                onChange={this.handleSearchChange}
              />
              <InputGroup.Text
                id="basic-addon2"
                style={{ cursor: "pointer" }}
                onClick={this.handleSearch}
              >
                <BiSearchAlt2 />
              </InputGroup.Text>
            </InputGroup>
            <div className="filter-button">
              <Dropdown className="rounded">
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  className="filter-icon rounded-end "
                >
                  Sort By <BsFilterLeft />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="whats_new"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "whats_new" ? <BsCheck2 /> : ""}{" "}
                    What's New
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="popular"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "popular" ? <BsCheck2 /> : ""}{" "}
                    Popular
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="price_low_high"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "price_low_high" ? <BsCheck2 /> : ""}{" "}
                    Price Low to High
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="price_high_low"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "price_high_low" ? <BsCheck2 /> : ""}{" "}
                    Price High to Low
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="discount"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "discount" ? <BsCheck2 /> : ""}{" "}
                    Discount
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="search_header">
            {/*<h1>Jewellery <span>| 2103 DESIGNS </span></h1> */}
          </div>
          <div className="mobile-search">
            <InputGroup className="">
              <Form.Control
                placeholder="Search here..."
                name="search"
                value={this.state.search_inpt}
                onChange={this.handleSearchChange}
              />
              <InputGroup.Text id="basic-addon2" onClick={this.handleSearch}>
                <FiSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="mobile-dropdown">
            <div className="mobile-dropdown-wrapper">
              <h5>showing {this.state.total} results</h5>
              <Dropdown>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  className="filter-icon"
                >
                  Sort By <BsFilterLeft />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="whats_new"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "whats_new" ? <BsCheck2 /> : ""}{" "}
                    What's New
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="popular"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "popular" ? <BsCheck2 /> : ""}{" "}
                    Popular
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="price_low_high"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "price_low_high" ? <BsCheck2 /> : ""}{" "}
                    Price Low to High
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="price_high_low"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "price_high_low" ? <BsCheck2 /> : ""}{" "}
                    Price High to Low
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="discount"
                    onClick={(e) => this.handlesortBy(e)}
                  >
                    {this.state.sort_by == "discount" ? <BsCheck2 /> : ""}{" "}
                    Discount
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {this.state.processing ? (
            <Loader />
          ) : (
            <>
              {productList.length == 0 ? (
                <div className="no-product mt-3">
                  <img src={NoProduct} alt="" />
                  <h1 className="mb-0">Products Not Found</h1>
                </div>
              ) : (
                <div className="search-slider my-3">
                  {productList.map((product, index) => (
                    <div className="search-inner rounded" key={index}>
                      <div className="s-slider-image">
                        <img
                          className="swap-on-hover__front-image rounded-top"
                          src={product.default_image}
                          alt="feature product"
                          onClick={() => this.handleProductDetails(product)}
                        />
                        <div className="swap-on-hover__back-image">
                          <img
                            src={product.default_image}
                            className="rounded-top"
                          />
                          <div className="wishlist">
                            {product.has_wishlist ? (
                              <BsHeartFill
                                onClick={() => this.wishlistHandler(product)}
                                className="wishlist_active"
                              />
                            ) : (
                              <BsHeart
                                onClick={() => this.wishlistHandler(product)}
                              />
                            )}
                          </div>
                          {product.video != "" ? (
                            <div className="video_button">
                              <BsFillPlayFill
                                onClick={() => this.openVideo(product)}
                              />
                            </div>
                          ) : null}
                        </div>
                        {product.making_charge_dis_percent > 0 ||
                        product.discount_percent > 0 ? (
                          <div className="offers-wrapper">
                            <div className="offer rounded p-1">
                              <div className="making-chrg-offer">
                                {product.making_charge_dis_percent > 0 ? (
                                  <h4>
                                    {product.making_charge_dis_percent}% Off
                                  </h4>
                                ) : (
                                  <>
                                    {product.discount_percent > 0 ? (
                                      <h4>{product.discount_percent}% Off</h4>
                                    ) : null}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div className="search-button">
                          <Button
                            variant="primary"
                            className="rounded "
                            onClick={() => this.handleProductDetails(product)}
                          >
                            <i class="bi bi-cart-plus-fill me-2 h6"></i> ADD TO
                            CART
                          </Button>{" "}
                          <Button
                            variant="secondary"
                            className="rounded "
                            onClick={() => this.handleProductDetails(product)}
                          >
                            <i class="bi bi-eye me-2 h6"></i> VIEW DETAILS
                          </Button>{" "}
                        </div>
                      </div>
                      <div
                        className="s-slider-content"
                        onClick={() => this.handleProductDetails(product)}
                      >
                        <h2>{product.name}</h2>
                        <div className="ring-price">
                          {product.have_offer ? (
                            <>
                              <div className="ring-price-wrapper">
                                <span className="offer-price">
                                  {" "}
                                  {product.sale_price_display}{" "}
                                </span>
                                <span className="item-price">
                                  {product.mrp_display}
                                </span>
                              </div>
                              <div>
                                <span className="item-saving-price">
                                  {" "}
                                  Save
                                  <h4>{displayAmount(product.total_save)}</h4>
                                </span>
                              </div>
                              {/*<div className='making-chrg-mob'>
                                                                                <div className='making-chrg-offer'>
                                                                                    <h4>{product.making_charge_dis_percent}% Off on Making Charges</h4>
                                                                                </div>
                                                                </div>*/}
                            </>
                          ) : (
                            <span className="offer-price">
                              {product.sale_price_display}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          <div></div>
        </Container>

        <Modal
          show={this.state.videoDialog}
          onHide={this.handleVideoClose}
          centered
          className="popup-product"
        >
          <Modal.Body>
            {this.state.video_product ? (
              <video
                style={{ objectFit: "contain", width: "100%" }}
                controls
                autoPlay
                ref={this.videoRef}
              >
                <source src={this.state.video_product.video} />
              </video>
            ) : null}
            <div className="modal-video-buttons">
              <Button
                variant="secondary"
                onClick={() =>
                  this.handleProductDetails(this.state.video_product)
                }
              >
                VIEW DETAILS
              </Button>
            </div>
            <span className="close-popup" onClick={this.handleVideoClose}>
              X
            </span>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  //products: state.customer.product.items,
  categories: state.customer.categories.items,
  //total: state.customer.product.total,
  //processing: state.customer.product.processing,
  wl_actionCalled: state.customer.wishlist.actionCalled,
  wl_createSuccess: state.customer.wishlist.createSuccess,
  wl_successMessage: state.customer.wishlist.successMessage,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ productList }, dispatch),
  dispatch,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
);

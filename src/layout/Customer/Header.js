import React, { useEffect, useState } from "react";
import { useNavigate, Link, useMatch } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSupport, BiShoppingBag, BiHeart } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import Logo from "src/assets/images/logo.png";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "actions/Customer/auth.actions";
import { categoryList } from "actions/Customer/categories.actions";
import { WishListData } from "actions/Customer/wishlist.actions";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { CartList } from "actions/Customer/addcart.actions";
import { isSalesExecutive } from "helpers/helper";
import "src/App.css";
import Loader from "../../pages/Customer/Loader";
import { GrHistory } from "react-icons/gr";
import { HiHome } from "react-icons/hi";
import { TbUserCircle } from "react-icons/tb";
import { BsCart3, BsClock } from "react-icons/bs";
import { useLocation, matchPath } from "react-router";
import { BiSearch } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import Offcanvas from "react-bootstrap/Offcanvas";
const Header = (props) => {
  //const getLoad=useSelector((state)=>state.loader.loading)
  const [load, setLoad] = useState(true);
  const auth = useSelector((state) => state.auth);
  const categoriesList = useSelector((state) => state.customer.categories);
  const cartLength = useSelector((state) => state.customer.cart.items.length);
  const wishList = useSelector((state) => state?.customer.wishlist);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isWishlistPage = useMatch("/wishlist");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  //const isCartPath = matchPath("/cart*", pathname);
  const toggleClass = () => {
    setIsSearchActive(!isSearchActive);
  };

  useEffect(() => {
    if (auth.isLoggedIn === true) {
      //setLoad(true)
      //navigate("/login")
    }
  }, [auth.isLoggedIn]);

  const navigate = useNavigate();
  const onLogout = async () => {
    //setLoad(false)
    props.actions.logout();
    //navigate('/')
  };

  const onCart = () => {
    navigate("/cart");
  };
  const onWishList = () => {
    window.location.href = "/wishlist";
  };
  const onOrderHistory = () => {
    window.location.href = "/orders";
  };
  const onMyProfile = () => {
    navigate("/edit-profile");
  };
  const onChangePassword = () => {
    navigate("/change-password");
  };
  const onAddress = () => {
    navigate("/my-address");
  };

  useEffect(() => {
    if (categoriesList?.getItemsSuccess) {
      setCategories(categoriesList.items);
    } else {
      setCategories([]);
    }
  }, [categoriesList]);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 160);
    });
  }, []);

  React.useEffect(() => {
    // if (categoriesList?.getItemsSuccess) {
    //setLoad(false)
    //props.actions.WishListData()

    //props.actions.CartList();

    // }
    props.actions.categoryList();
    //if(!isCartPath){
    //props.actions.CartList();
    // }
    props.actions.CartList();
    if (!isWishlistPage) {
      props.actions.WishListData();
    }
  }, []);

  const _isSalesExecutive = isSalesExecutive();

  const handleSearch = () => {
    navigate("/products?search=" + searchText);
  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  const handleSingup = () => {
    handleClose();
    navigate("/signup");
  };

  const handleCategoryClick = (item) => {
    navigate(`/products?category=${item.slug}`);
  };

  return (
    <>
      <div className={`desktop_menu menubar ${scroll >= 0 ? "fixed-top" : ""}`}>
        <div className="topbar-account-wrapper">
          <div className="container" style={{ padding: "0px" }}>
            <ul>
              {!auth.isLoggedIn ? (
                <li>
                  <IoCallOutline /> +91 98744 45878
                </li>
              ) : null}
              {!auth.isLoggedIn ? (
                <li>
                  <span> | </span>
                </li>
              ) : null}
              {!auth.isLoggedIn ? (
                <li>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </li>
              ) : null}
              {!auth.isLoggedIn ? (
                <li>
                  <span> | </span>
                </li>
              ) : null}
              {!auth.isLoggedIn ? (
                <li>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </li>
              ) : null}
            </ul>
            {auth.isLoggedIn ? (
              <>
                <div className="topbar-number-content">
                  <span className="header-phone mobile-header-phone">
                    <IoCallOutline /> +91 98744 45878
                  </span>
                  <Dropdown className="my-account-button">
                    <span className="header-phone desktop-header-phone">
                      <IoCallOutline /> +91 98744 45878
                    </span>
                    <span className="header-phone"> | </span>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {auth.user.name}{" "}
                      <img
                        src={auth.user.image}
                        width={50}
                        alt="profile image"
                      ></img>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={onMyProfile}>
                        My Profile{" "}
                      </Dropdown.Item>
                      {!_isSalesExecutive ? (
                        <Dropdown.Item onClick={onAddress}>
                          My Addresses
                        </Dropdown.Item>
                      ) : null}
                      <Dropdown.Item onClick={onAddress}>
                        My Voucher
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onChangePassword}>
                        Change Password
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onOrderHistory}>
                        Order History
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/*<li>
                            <Button variant="primary" onClick={onMyProfile}>My Profile</Button>
                        </li>
                        <li>
                            <Button variant="primary" onClick={onLogout}>Log out</Button>
                </li>*/}
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="topbar-wrapper-container">
          <div className="topbar-wrapper">
            <div className="logo-container">
              <a href="/">
                <img src={Logo} alt="" />
              </a>
            </div>
            <div className="support">
              <div className="s-inner rounded shadow">
                <div className="s-content">
                  <InputGroup className="">
                    <Form.Control
                      placeholder="Search for Jewellery"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon2" onClick={handleSearch}>
                      <BiSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </div>
            <div className="details">
              <ul>
                <li>
                  <div className="c-icon" onClick={onCart}>
                    <BsClock />
                  </div>
                  <div className="c-content">
                    <Link to="/products?recent_view=1">
                      <span>
                        Recently <br /> Viewed
                      </span>
                    </Link>
                  </div>
                </li>
                <li>
                  <span> | </span>
                </li>

                <li>
                  <div className="c-content"></div>
                  <div className="c-icon" onClick={onCart}>
                    <BsCart3 />
                    <span className="c-price" onClick={onCart}>
                      {cartLength}
                    </span>
                  </div>
                </li>
                <li>
                  <span> | </span>
                </li>
                <li>
                  <div className="c-content"></div>

                  <div className="c-icon" onClick={onWishList}>
                    <BiHeart />
                    <span className="c-price" onClick={onWishList}>
                      {wishList?.total}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="menu-wrapper">
          <Navbar bg="light" expand="lg">
            <Container
              fluid
              className="position-relative justify-content-center"
            >
              <Navbar.Brand>
                <div className="mob-logo-container">
                  <a href="/">
                    {" "}
                    <img src={Logo} alt="" />{" "}
                  </a>
                </div>
              </Navbar.Brand>
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="mx-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  {categories?.length > 0 &&
                    categories?.map((val, index) => (
                      <div key={index}>
                        <NavDropdown
                          title={val.name}
                          renderMenuOnMount={true}
                          id="basic-nav-dropdown"
                          onClick={() => handleCategoryClick(val)}
                        >
                          {val.subCategories.map((sub, index) => (
                            <div key={index}>
                              <NavDropdown.Item
                                href={`/products?category=${val.slug}&subcategory=${sub.slug}`}
                              >
                                {sub.name}
                              </NavDropdown.Item>
                            </div>
                          ))}
                        </NavDropdown>
                      </div>
                    ))}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
      <div className={`mobile_menu menubar ${scroll >= 0 ? "fixed-top" : ""}`}>
        <div className="topbar-wrapper-container">
          <div className="topbar-wrapper">
            <div className="logo-container">
              <a href="/">
                <img src={Logo} alt="" />
              </a>
            </div>
            <div className="support">
              <div className="s-inner rounded shadow">
                <div className="s-content">
                  <InputGroup className="">
                    <Form.Control
                      placeholder="Search for Jewellery"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon2" onClick={handleSearch}>
                      <BiSearch />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-wrapper ">
          {[false].map((expand) => (
            <Navbar key={expand} bg="light" expand={false}>
              <Container fluid>
                <Navbar.Brand
                  className="justify-content-between "
                  style={{ width: "inherit" }}
                >
                  <div className="d-flex ">
                    <Navbar.Toggle
                      aria-controls={`offcanvasNavbar-expand-${expand}`}
                      onClick={toggleMenu}
                      className=""
                    />
                    <div className="mob-logo-container">
                      <a href="/">
                        <img src={Logo} alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="details">
                    <ul>
                      <li>
                        <div className="c-content"></div>

                        <div className="c-icon" onClick={onWishList}>
                          {/* <BiHeart /> */}
                          <i class="bi bi-suit-heart text-primary-emphasis"></i>
                          <span
                            className={`c-price ${
                              wishList?.total == 0 ? "d-none" : null
                            }`}
                            onClick={onWishList}
                          >
                            {wishList?.total}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="c-content"></div>
                        <div className="c-icon" onClick={onCart}>
                          {/* <BsCart3 /> */}
                          <i class="bi bi-cart3 text-primary-emphasis"></i>
                          <span
                            className={`c-price ${
                              cartLength == 0 ? "d-none" : null
                            }`}
                            onClick={onCart}
                          >
                            {cartLength}
                          </span>
                        </div>
                      </li>
                      <li>
                        <Navbar.Brand>
                          <span className="mob-search-icon ">
                            <Link to="/search">
                              {" "}
                              {/* <FiSearch /> */}
                              <i class="bi bi-search text-primary-emphasis"></i>
                            </Link>
                          </span>
                        </Navbar.Brand>
                      </li>
                    </ul>
                  </div>
                </Navbar.Brand>

                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="start"
                  restoreFocus={false}
                  show={menuOpen}
                  onHide={handleClose}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      <div className="topbar-account-wrapper topbar-account-inner">
                        <div className="container">
                          <div className="mobile-menu-inner-wrapper">
                            {!auth.isLoggedIn ? <h1>Guest User</h1> : null}
                            <ul>
                              {!auth.isLoggedIn ? (
                                <li>
                                  <Button
                                    variant="primary"
                                    onClick={handleLogin}
                                  >
                                    Login
                                  </Button>
                                </li>
                              ) : null}
                              {!auth.isLoggedIn ? (
                                <li>
                                  <span> | </span>
                                </li>
                              ) : null}
                              {!auth.isLoggedIn ? (
                                <li>
                                  <Button
                                    variant="primary"
                                    onClick={handleSingup}
                                  >
                                    Signup
                                  </Button>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {auth.isLoggedIn ? (
                        <>
                          <div className="topbar-number-content">
                            <Dropdown className="my-account-button">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                <img
                                  src={auth.user.image}
                                  className="rounded-circle me-3"
                                  alt="profile"
                                  width={30}
                                />
                                {auth.user.name}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item onClick={onMyProfile}>
                                  My Profile{" "}
                                </Dropdown.Item>
                                {!_isSalesExecutive ? (
                                  <Dropdown.Item onClick={onAddress}>
                                    My Addresses
                                  </Dropdown.Item>
                                ) : null}
                                <Dropdown.Item onClick={onAddress}>
                                  My Voucher
                                </Dropdown.Item>
                                <Dropdown.Item onClick={onChangePassword}>
                                  Change Password
                                </Dropdown.Item>
                                <Dropdown.Item onClick={onOrderHistory}>
                                  Order History
                                </Dropdown.Item>
                                <Dropdown.Item onClick={onLogout}>
                                  Logout
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </>
                      ) : null}
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1">
                      <Nav className="my-2 my-lg-0">
                      
                        {categories?.length > 0 &&
                          categories?.map((val, index) => (
                            <div key={index} className="">
                              
                              <NavDropdown
                              // className="inline"
                                title={<><img
                                  className="rounded"
                                    src={val.icon}
                                    alt="menu image "
                                    width={30}
                                    height={30}
                                  /> <span>{val.name}</span>
                                  </>}
                                renderMenuOnMount={true}
                                id="basic-nav-dropdown"
                              >
                                {val.subCategories.map((sub, index) => (
                                  <div key={index}>
                                    <NavDropdown.Item
                                      href={`/products?category=${val.slug}&subcategory=${sub.slug}`}
                                    >
                                      {sub.name}
                                    </NavDropdown.Item>
                                  </div>
                                ))}
                              </NavDropdown>
                            </div>
                          ))}
                      </Nav>
                      <li className="b_mobile_icon">
                        <div className="c-icon" onClick={onCart}>
                          {/* <BsClock /> */}
                        </div>
                        <div className="c-content">
                          <a href="/products?recent_view=1">
                            <span>Recently Viewed</span>
                          </a>
                        </div>
                      </li>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </div>
      </div>
      {/*---- only mob screen -----*/}
      {/* <section className='float-f-menu'>
                <ul>
                    <li className='active' onClick={event => window.location.href = '/'}> <HiHome /> Home</li>
                    <li onClick={onCart}> <BiShoppingBag /> Cart</li>
                    <li onClick={onWishList}> <BiHeart /> Wishlist</li>
                    <li onClick={onMyProfile}> <TbUserCircle /> Profile</li>
                </ul>
                                </section>*/}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categoryList: state.customer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    { logout, categoryList, CartList, WishListData },
    dispatch
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
//val.subCategories.map((sub,index)=>(<div key={index}>

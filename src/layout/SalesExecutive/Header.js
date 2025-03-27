import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearchAlt2, BiSupport, BiShoppingBag, BiHeart } from "react-icons/bi";
import Logo from 'src/assets/images/logo.png';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "actions/Sales/auth.actions";
import { categoryList } from "actions/Sales/categories.actions"
import { WishListData } from "actions/Sales/wishlist.actions"
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { CartList } from "actions/Sales/addcart.actions";
import 'src/App.css'
import Loader from '../../pages/SalesExecutive/Loader';

const Header = (props) => {
    //const getLoad=useSelector((state)=>state.loader.loading)
    const [load, setLoad] = useState(true);
    const auth = useSelector((state) => state.auth)
    const categoriesList = useSelector((state) => state.sales.categories)
    const cartLength = useSelector((state) => state.sales.cart.items.length)
    const wishList = useSelector((state) => state?.sales.wishlist)
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [categories, setCategories] = useState([])
    const toggleClass = () => {
        setIsSearchActive(!isSearchActive);
    }

    useEffect(() => {
        if (auth.isLoggedIn === true) {
            //setLoad(true)
            //navigate("/login")
        }
    }, [auth.isLoggedIn])

    const navigate = useNavigate();
    const access_token = localStorage.getItem('auth')
    const onLogout = async () => {
        props.actions.logout();
        navigate('/sales-executive')
    }

    const onCart = () => {
        navigate('/sales-executive/cart')
    }
    const onWishList = () => {
        window.location.href = '/sales-executive/wishlist'
    }
    const onOrderHistory = () => {
        window.location.href = '/sales-executive/orders'
    }
    const onAttendence = () => {
        window.location.href = '/sales-executive/attendence'
    }
    const onMyProfile = () => {
        navigate('/sales-executive/edit-profile');
    }
    const onChangePassword = () => {
        navigate('/sales-executive/change-password');
    }
    const onAddress = () => {
        navigate('/sales-executive/my-address');
    }
    const onleaveApply = () => {
        navigate('/sales-executive/my-leaves');
    }
    useEffect(() => {
        if (categoriesList?.getItemsSuccess) {
            setCategories(categoriesList.items)
        } else {
            setCategories([])
        }
    }, [categoriesList])



    React.useEffect(() => {
       // if (categoriesList?.getItemsSuccess) {
            //setLoad(false)
            //props.actions.WishListData()

            //props.actions.CartList();

       // }
        props.actions.categoryList();
        if (auth.isLoggedIn === true) {
            props.actions.CartList();
        }
        props.actions.WishListData()
    }, [categoriesList?.getItemsSuccess]);

    

    return (
        <>
          

                <div className='menubar'>
                    <div className='topbar-wrapper'>
                        <div className='support'>
                            <div className='s-inner'>
                                <div className='s-icon'>
                                    <BiSupport />
                                </div>
                                <div className='s-content'>
                                    <span>SUPPORT</span>
                                    <span className='s-number'>7329392723</span>
                                </div>
                            </div>
                        </div>
                        <div className='logo-container'>
                            <a href='/'>
                                <img src={Logo} alt='' />
                            </a>
                        </div>
                        <div className='details'>
                            <ul>


                                <li>
                                    <div className='c-content'>
                                        <span>Cart</span>
                                        <span className='c-price ' onClick={onCart}>{cartLength}</span>
                                    </div>
                                    <div className='c-icon' onClick={onCart}>

                                        <BiShoppingBag />

                                    </div>
                                </li>


                                {/* <li>
                                    <div className='c-content'>
                                        <span>wishlist</span>
                                        <div style={{ display: "flex" }}>
                                            <span className='c-price' onClick={onWishList}>{wishList?.data?.items?.length || 0}</span>
                                            <div className='c-icon' onClick={onWishList}>
                                                <BiHeart />
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                                <li>
                                    <div className='c-content'>
                                        <span>wishlist</span>
                                        <span className='c-price' onClick={onWishList}>{wishList?.items?.items?.length || 0}</span>
                                        </div>
                                    
                                            
                                            <div className='c-icon' onClick={onWishList}>
                                                <BiHeart />
                                            </div>
                                       
                                    
                                </li>
                                {
                                    !access_token?.length > 0 &&
                                    <li>
                                        <Button variant="primary" onClick={()=>{navigate('/sales-executive/signup')}}>Signup</Button>
                                    </li>
                                }
                                {
                                    !access_token?.length > 0 &&
                                    <li>
                                        <Button variant="primary" onClick={()=>{navigate('/sales-executive/login')}}>Login</Button>
                                    </li>
                                }

                                {
                                    access_token?.length > 0 &&
                                    <>
                                    <Dropdown className='my-account-button'>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            My Account
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={onMyProfile}>Profile </Dropdown.Item>
                                            <Dropdown.Item onClick={onAddress}>My Addresses</Dropdown.Item>
                                            <Dropdown.Item onClick={onChangePassword}>Change Password</Dropdown.Item>
                                            <Dropdown.Item onClick={onOrderHistory}>Order History</Dropdown.Item>
                                            <Dropdown.Item onClick={onleaveApply}>Leave Application</Dropdown.Item>
                                            <Dropdown.Item onClick={onAttendence}>Attendence</Dropdown.Item>
                                            <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/*<li>
                                            <Button variant="primary" onClick={onMyProfile}>My Profile</Button>
                                        </li>
                                        <li>
                                            <Button variant="primary" onClick={onLogout}>Log out</Button>
                                </li>*/}
                                </>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='menu-wrapper'>
                        <Navbar bg="light" expand="lg">
                            <Container fluid className='position-relative'>
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Brand href="#"><div className='mob-logo-container'>
                                    <img src={Logo} alt='' />
                                </div></Navbar.Brand>
                                <Navbar.Brand href="#"><span className="mob-search-icon">
                                    <BiSearchAlt2 />
                                </span></Navbar.Brand>
                                <Navbar.Collapse id="navbarScroll" >
                                    <Nav
                                        className="mx-auto my-2 my-lg-0"
                                        style={{ maxHeight: '100px' }}
                                        navbarScroll
                                    >
                                        {
                                            categories?.length > 0 && categories?.map((val, index) => (
                                                <div key={index}>
                                                    {/*--<Nav.Link href={`/search-result/${val.slug}`}>{val.name}
                                                </Nav.Link>---*/}
                                                    <NavDropdown
                                                        title={val.name}
                                                        renderMenuOnMount={true}
                                                        id="basic-nav-dropdown"
                                                        
                                                    >
                                                        {val.subCategories.map((sub,index)=>(<div key={index}>
                                                        <NavDropdown.Item href={`/sales-executive/products?category=${val.slug}&subcategory=${sub.slug}`}>{sub.name}</NavDropdown.Item></div>))}
                                                    </NavDropdown>
                                                </div>
                                            ))
                                        }
                                    </Nav>

                                </Navbar.Collapse>
                                <Form id='search-icon' className={isSearchActive ? 'custom-search' : ''} >

                                    <div>

                                        <InputGroup>

                                            <Form.Control
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                            />
                                            <InputGroup.Text id="basic-addon1" onClick={toggleClass}><BiSearchAlt2 /></InputGroup.Text>
                                        </InputGroup>

                                    </div>
                                </Form>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            


        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    categoryList: state.sales.categories,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ logout, categoryList, CartList, WishListData }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
//val.subCategories.map((sub,index)=>(<div key={index}>

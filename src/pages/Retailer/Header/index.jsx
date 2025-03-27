import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiSearchAlt2, BiSupport, BiShoppingBag, BiHeart } from "react-icons/bi";
import Logo from 'src/assets/images/logo.png';
const Header = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const toggleClass = () => {
        setIsSearchActive(!isSearchActive);
    }

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
                        <img src={Logo} alt='' />
                    </div>
                    <div className='details'>
                        <ul>
                            <li>
                                <div className='c-content'>
                                    <span>Cart</span>
                                    <span className='c-price'>₹0.00</span>
                                </div>
                                <div className='c-icon'>

                                    <BiShoppingBag />

                                </div>
                            </li>
                            <li>
                                <BiHeart />
                            </li>
                            <li>
                                <Button variant="primary">Signup</Button>
                            </li>
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
                                    <Nav.Link href="#action1">Diamond</Nav.Link>
                                    <Nav.Link href="#action2">Gems</Nav.Link>
                                    <Nav.Link href="#action2">Gemstone</Nav.Link>
                                    <Nav.Link href="#action2">Rudraksh</Nav.Link>
                                    <Nav.Link href="#action2">Pooja Items</Nav.Link>

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

export default Header
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";



const Footer = () => {
    const today = new Date();
  return (
    <>
    <section className='footer'>
                <Container>
                    <Row>
                        <Col xs={12} md={3}>
                            <div className='f-header'>
                                <h3>Product</h3>
                                <ul className='f-list'>
                                    <li><a href=''>Email Row</a></li>
                                    <li><a href=''>Free Tools</a></li>
                                    <li><a href=''>Agents</a></li>
                                    <li><a href=''>Blog</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='f-header'>
                                <h3>Resources</h3>
                                <ul className='f-list'>
                                    <li><a href=''>Our Agents</a></li>
                                    <li><a href=''>Member Stories</a></li>
                                    <li><a href=''>Video</a></li>
                                    <li><a href=''>Free trial</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='f-header'>
                                <h3>Company</h3>
                                <ul className='f-list'>
                                    <li><a href=''>Patnerships</a></li>
                                    <li><a href=''>Terms of use</a></li>
                                    <li><a href=''>Privacy</a></li>
                                    <li><a href=''>Sitemap</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='f-header'>
                                <h3>Get in touch</h3>
                                <ul className='f-list'>
                                    <li>You’ll find your next Marketing value you prefer.</li>
                                </ul>
                                <div className='gap-30'></div>
                                <ul className='f-social-media'>
                                    <li><a href=''><FaFacebookF /></a> </li>
                                    <li><a href=''> <FaTwitter /></a></li>
                                    <li><a href=''> <FaLinkedinIn /></a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='copyright'>
                <h5>Copyright {today.getFullYear()} prakriti.one, All rights reserved.</h5>
            </section>
            
    </>
  )
}

export default Footer
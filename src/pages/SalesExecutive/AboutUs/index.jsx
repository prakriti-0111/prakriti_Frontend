import React from 'react'
import { Container } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import aboutImage from 'src/assets/images/about.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
const AboutUs = () => {
    return (
        <>
            <div className='about-wrapper'>
                <Container>
                    <div className='about-header'>
                        <div className='breadcrumb-wrapper'>
                            <Breadcrumb>
                                <Breadcrumb.Item href=''>Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <h2 className='mt-5'>About Us</h2>
                    </div>
                    <div className='mobile-checkout-header mb-4'>
                        <HiArrowNarrowLeft /> <h3>Our Vision</h3>
                    </div>
                </Container>
            </div>
            <div className='about-wrapper-content position-relative'>
                <Container>
                    <Row>
                        <Col xs={12} md={7}>
                            <div className='content-paragraph bg-white p-3'>
                                <p className='mb-4'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p> <p className='m-0'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={5}>
                            <div className='about-banner'>
                                <img src={aboutImage} alt='' />
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div className='about-mission'>
                <Container>
                    <h3>Our Mission</h3>
                    <p className='m-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
                    <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                </Container>
            </div>
            <div className='about-gallery'>
                <Container>
                    <h3 className='mb-4'>Our Store Gallery</h3>
                    <div className="grid-item">
                        <div className="item1">
                        </div>
                        <div className="item2">
                        </div>
                        <div className="item3">
                        </div>
                        <div className="item4">
                        </div>
                        <div className="item5">
                        </div>
                        <div className="item6">
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default AboutUs
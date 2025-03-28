import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import Ft_image from "src/assets/images/ft_image.png";
import {
  subscribersStore,
  retailerRequest,
} from "actions/Customer/home.actions";
import { toast } from "react-toastify";

const Footer = () => {
  const today = new Date();
  const [submitting1, setSubmitting1] = useState(false);
  const [submitting2, setSubmitting2] = useState(false);
  const [email, setEmail] = useState("");
  const [email_err, setEmailErr] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [notes, setNotes] = useState("");
  const [name_err, setNameErr] = useState(false);
  const [mobile_err, setMobileErr] = useState(false);

  const handleSubscriber = async () => {
    if (!email) {
      setEmailErr(true);
      return;
    }
    setSubmitting1(true);
    let res = await subscribersStore({ email: email });
    if (res.data.success) {
      toast.success(res.data.message);
      setEmail("");
    }
    setSubmitting1(false);
  };

  const handleRetailerReq = async () => {
    let hasErr = false;
    if (!name) {
      setNameErr(true);
      hasErr = true;
    } else {
      setNameErr(true);
    }
    if (!mobile) {
      setMobileErr(true);
      hasErr = true;
    } else {
      setMobileErr(true);
    }
    if (!hasErr) {
      setSubmitting2(true);
      let res = await retailerRequest({
        name: name,
        mobile: mobile,
        notes: notes,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setMobile("");
        setNotes("");
      }
      setSubmitting2(false);
    }
  };

  return (
    <>
      <section className="footer">
        <Container>
          <Row>
            <Col xs={12} md={7} className="ft-header-border">
              <div className="f-header-title">
                <h3>Suggestion & Request</h3>
              </div>
              <Form>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-xs-2 mb-4  "
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className={name_err ? "error_input" : "" + "rounded"}
                        placeholder=" Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group
                      className="mb-xs-2 mb-4 "
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        className={mobile_err ? "error_input" : "" + "rounded"}
                        placeholder="Contact Number"
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={8} md={9}>
                    <Form.Group
                      className=" "
                      controlId="exampleForm.ControlTextarea1"
                    >
                      {/*<Form.Label>Note</Form.Label>*/}
                      <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Note"
                        className="rounded"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} md={3}>
                    <button
                      type="button"
                      variant="primary"
                      className="footer-submit rounded"
                      disabled={submitting2}
                      onClick={handleRetailerReq}
                    >
                      {submitting2 ? "Processing" : "Submit"}
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col xs={12} md={5}>
              <div className="f-header">
                <h6>Subscribe Our Newsletter</h6>
                <InputGroup className="mb-1">
                  <Form.Control
                    placeholder="Enter Email For Our Newsletter"
                    className={email_err ? "error_input" : "" + "rounded-start"}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <InputGroup.Text
                    id="basic-addon2"
                    role="button"
                    className="rounded-end"
                    onClick={handleSubscriber}
                    disabled={submitting1}
                  >
                    {submitting1 ? "Processing" : "Subscribe"}
                  </InputGroup.Text>
                </InputGroup>
                {/*<div className='copyright-center desktop-copyright-center'>
                                    <span><img src={Ft_image} alt='/' /></span>
    </div>*/}
                <div className="social-wrapper">
                  <div>
                    <div className="copyright-center payment-option-mob">
                      <span>
                        <img src={Ft_image} alt="/" />
                      </span>
                    </div>
                    <h5>Follow Us On : </h5>
                    <ul className="f-social-media">
                      <li>
                        <a href="">
                          <FaFacebookF />
                        </a>{" "}
                      </li>
                      <li>
                        <a href="">
                          {" "}
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a href="">
                          {" "}
                          <AiFillYoutube />{" "}
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <AiOutlineInstagram />
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <BsPinterest />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="copyright-center payment-option-desktop">
                    <span>
                      <img src={Ft_image} alt="/" />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="copyright">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <div className="copyright-header">
                <h4>GST IN 10CIUPK2654L1ZY </h4>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="f-header terms-sec">
                <ul className="f-list">
                  <li>
                    <a href="/terms-condition">Terms of use</a>
                  </li>
                  <li> | </li>
                  <li>
                    <a href="/privacy-policy">Privacy</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="copyright-right">
                <h5>
                  Copyright {today.getFullYear()} prakriti.one, All rights
                  reserved.
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Footer;

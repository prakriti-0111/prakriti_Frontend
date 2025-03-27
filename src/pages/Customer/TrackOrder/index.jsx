import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiShoppingBag } from "react-icons/bi";
import { FcAlarmClock } from "react-icons/fc";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Track from "src/assets/images/track.png";
import NoProduct from "src/assets/images/no-product.png";
import Loader from "../Loader";
import withRouter from "helpers/withRouter";
import { OrderList } from "actions/Customer/placeOrder.actions";
import { FcProcess } from "react-icons/fc";
import { FcAcceptDatabase } from "react-icons/fc";

const TrackOrder = (props) => {
  const orders = useSelector((state) => state.customer.order.items);
  const [load, setLoad] = useState(true);
  const [helpDialog, setHelpDialog] = useState(false);
  const order = orders.length ? orders[0] : null;
  useEffect(() => {
    props.actions.OrderList({ order_id: props.params.id });
  }, [props.params.id]);

  useEffect(() => {
    setLoad(false);
  }, [order]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <BiShoppingBag />;
        break;
      case "shipped":
        return <MdOutlineInventory2 />;
        break;
      case "out_for_delivery":
        return <BsTruck />;
        break;
      case "delivered":
        return <TiTick />;
        break;
      case "is_ready":
        return <FcAcceptDatabase />;
        break;
      case "on_process":
        return <FcProcess />;
        break;
    }
  };

  const handleHelpcenter = () => {
    setHelpDialog(true);
  };

  const handleHelpDialogClose = () => {
    setHelpDialog(false);
  };

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <>
          {!order ? (
            <div className="no-product">
              <img src={NoProduct} alt="" />
              <h1 className="mb-0">Order Not Found</h1>
            </div>
          ) : (
            <>
              <div className="track-order desktop-track-order">
                <Container>
                  <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/orders">My Orders</Breadcrumb.Item>
                    <Breadcrumb.Item active>Track Order</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="track-header-wrapper">
                    <h1>
                      Track Order{" "}
                      {order.status != "delivered" ? (
                        <span>
                          Estimated Delivery: {order.expected_delivery_date}
                        </span>
                      ) : null}
                    </h1>
                  </div>
                  <div className="p-order mt-2 mb-1">
                    Order ID : #{order.order_no}
                  </div>
                  <div className="vertical timeline">
                    <div className="steps">
                      {order.status_progress.map((item, index) => {
                        return (
                          <div
                            className={
                              "step" + (item.is_active ? " active" : "")
                            }
                            key={index}
                          >
                            <span className="icon">
                              {getStatusIcon(item.status)}
                            </span>
                            <div>
                              <h1>
                                {item.status_display}
                                {item.status == "pending" ? (
                                  <span className="timer">
                                    <FcAlarmClock />
                                    Usually takes 30-40 mins
                                  </span>
                                ) : null}
                              </h1>{" "}
                              {item.is_active ? <h3>{item.date}</h3> : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-order-footer mt-3 d-flex justify-content-between">
                    <div className="track-f-content">
                      <h3>Have Issues? Need Help?</h3>
                      <p>
                        Lord Ipsum sed non diam eget lord molestie facilisis.
                        Fusce rutrum, arcu eu dignissim malesuada, massa eli
                      </p>
                      <Button variant="primary" onClick={handleHelpcenter}>
                        VISIT HELP CENTER
                      </Button>
                    </div>
                    <div className="track-f-image">
                      <img src={Track} alt="" />
                    </div>
                  </div>
                </Container>
              </div>
              <div className="track-order mobile-track-order">
                <Container>
                  <Breadcrumb>
                    <Breadcrumb.Item href="">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/orders">My Orders</Breadcrumb.Item>
                    <Breadcrumb.Item active>Track Order</Breadcrumb.Item>
                  </Breadcrumb>
                  {/*<div className='mobile-checkout-header mb-2'>
                                <HiArrowNarrowLeft /> <h3>Order Summary</h3>
                            </div>*/}
                  <div className="p-order mb-2">
                    Order ID : #{order.order_no}
                  </div>
                  {order.status != "delivered" ? (
                    <div className="track-header-wrapper mb-3">
                      <h1>
                        {" "}
                        <span>
                          Estimated Delivery: {order.expected_delivery_date}
                        </span>
                      </h1>
                    </div>
                  ) : null}

                  <div className="vertical timeline">
                    <div className="steps">
                      {order.status_progress.map((item, index) => {
                        return (
                          <div
                            className={
                              "step" + (item.is_active ? " active" : "")
                            }
                            key={index}
                          >
                            <span className="icon">
                              {getStatusIcon(item.status)}
                            </span>
                            <div>
                              <h1>
                                {item.status_display}
                                {item.status == "pending" ? (
                                  <span className="timer">
                                    <FcAlarmClock />
                                    Usually takes 30-40 mins
                                  </span>
                                ) : null}
                              </h1>{" "}
                              {item.is_active ? <h3>{item.date}</h3> : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="line"></div>
                  </div>
                  <div className="track-order-footer mt-3 d-flex justify-content-between">
                    <div className="track-f-content">
                      <h3>Have Issues? Need Help?</h3>
                      <p>
                        Lord Ipsum sed non diam eget lord molestie facilisis.
                        Fusce rutrum, arcu eu dignissim malesuada, massa eli
                      </p>
                      <Button variant="primary" onClick={handleHelpcenter}>
                        VISIT HELP CENTER
                      </Button>
                    </div>
                    <div className="track-f-image">
                      <img src={Track} alt="" />
                    </div>
                  </div>
                </Container>
              </div>
              <Modal
                show={helpDialog}
                onHide={handleHelpDialogClose}
                centered
                className="popup-product"
              >
                <Modal.Body>
                  <div className="help_dialog">
                    {order ? (
                      <>
                        <div>
                          {order.help_mobile} | {order.help_email}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <span className="close-popup" onClick={handleHelpDialogClose}>
                    X
                  </span>
                </Modal.Body>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ OrderList }, dispatch),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TrackOrder)
);

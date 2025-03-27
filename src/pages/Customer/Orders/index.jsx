import React from "react";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import { bindActionCreators } from "redux";
import { OrderList, OrderDelete } from "actions/Customer/placeOrder.actions";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader";

class OrdersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      total: this.props.total,
      loading: true,
      queryParams: {
        page: 1,
        limit: 15,
      },
    };
  }

  componentDidMount() {
    this.loadOrders();
  }

  loadOrders = () => {
    this.props.actions.OrderList(this.state.queryParams);
  };

  static getDerivedStateFromProps(props, state) {
    let update = {};
    if (props.items !== state.items) {
      update.items = props.items;
      update.loading = false;
    }
    if (props.item_total !== state.item_total) {
      update.item_total = props.item_total;
    }
    return update;
  }

  viewOrder = (id) => {
    this.props.navigate("/orders/" + id);
  };

  render() {
    return (
      <div className="my-order order-desktop">
        <Container>
          <div className="breadcrumb-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item href="">My Account</Breadcrumb.Item>
              <Breadcrumb.Item active>My Orders</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/*<div className='my-order-header position-relative'>
                        <h1 className=''>My Orders</h1>
        </div>*/}
          {this.state.loading ? (
            <Loader />
          ) : (
            <>
              {this.state.items.length > 0 ? (
                this.state.items.map((item, index) => (
                  <div key={index}>
                    <div className="bg-light border mb-2 my-order-wrapper px-4 rounded">
                      <div className="order-id mb-2 d-block">
                        <div className="d-flex align-items-center justify-content-between  ">
                          <div>
                            <div className="id-no">
                              <h2 className="mb-0">
                                <span className="fw-bold me-2">Order ID:</span>{" "}
                                <span>#PRA{item.order_no}</span>
                              </h2>
                              {/*<h3>Gold Plated Ring + 1 Item</h3>*/}
                            </div>
                            <div className="id-no">
                              <h2 className="mb-0">
                                <span className="fw-bold">Order Payment:</span>{" "}
                                <span>{item.order_date}</span>
                              </h2>
                              {/*<h3>Gold Plated Ring + 1 Item</h3>*/}
                            </div>
                          </div>
                          <div className="tracker">
                            <div className="order-status rounded ">
                              <h4 className="text-warning-emphasis">
                                Status: <span> {item.status_display}</span>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex  align-items-center justify-content-between flex-wrap">
                          <div className="d-flex ">
                            <img
                              src={item.orderProducts[0].image}
                              alt=""
                              srcset=""
                              width={`100px`}
                              className="rounded me-3"
                            />
                            <div className="total">
                              <h5 className="text-primary-emphasis">
                                {item.orderProducts[0].product_name}
                              </h5>
                              <h6 className="my-2">{item.total_amount}</h6>
                              <h6>
                                Quantity :{" "}
                                <span>{item.orderProducts[0].quantity}</span>
                              </h6>
                            </div>
                          </div>
                          
                        </div>
                        
                      </div>
                      <div className="tracker sm:mb-2">
                            {/*<Button variant="primary" onClick={onTrack}>TRACK ORDER</Button>*/}
                            <Button
                              variant="primary"
                              className="mb-0 rounded"
                              onClick={() => this.viewOrder(item.id)}
                            >
                              VIEW ORDER
                            </Button>
                            {item.status != "cancelled" &&
                            item.status != "declined" ? (
                              <Button
                                variant="primary"
                                className="mb-0 rounded"
                              >
                                {" "}
                                <Link to={"/track-order/" + item.id}>
                                  TRACK ORDER{" "}
                                </Link>
                              </Button>
                            ) : null}
                          </div>
                      <hr />
                      <div className="my-order-footer">
                        <div className="order-address">
                          <span className="h6">
                            Expected Delivery:
                            <span className="text-success">
                              {item.expected_delivery_date}
                            </span>
                          </span>
                          {/* <div className="order-content">
                            <h6>
                              Expected Delivery Date :
                              <span>{item.expected_delivery_date}</span>
                            </h6>
                            <h6>
                              Order Date :<span>{item.order_date}</span>
                            </h6>
                            <h6>
                              Address <span>{item.delivery_address}</span>
                            </h6>
                          </div> */}
                        </div>
                      </div>

                      {/*<Container>*/}
                      {/*    <div className='mobile-checkout-header mb-4'>*/}
                      {/*        <HiArrowNarrowLeft /> <h3>Forgot Password</h3>*/}
                      {/*    </div>*/}
                      {/*    <div className='my-order-wrapper mb-3'>*/}
                      {/*        <div className='order-id'>*/}
                      {/*            <div className='id-no'>*/}
                      {/*                <h2 className='mb-1'>Order ID <span>#RTN3893890230</span></h2>*/}
                      {/*                <h3>Gold Plated Ring + 1 Item</h3>*/}
                      {/*            </div>*/}
                      {/*            <div className='order-address d-flex justify-content-end'>*/}
                      {/*                <h6><span>23rd March 2021</span></h6>*/}
                      {/*            </div>*/}
                      {/*            <div className='tracker d-flex justify-content-between align-items-end'>*/}
                      {/*                <div className='total'>*/}
                      {/*                    <h5>Total:<span> ₹6999 </span></h5>*/}
                      {/*                </div>*/}
                      {/*                <div className='order-status'>*/}
                      {/*                    <h4>Out for Delivery</h4>*/}
                      {/*                </div>*/}
                      {/*            </div>*/}
                      {/*        </div>*/}
                      {/*    </div>*/}

                      {/*</Container>*/}
                    </div>
                  </div>
                ))
              ) : (
                <center>
                  <h4>No order found.</h4>
                </center>
              )}
            </>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.customer.order.items,
  total: state.customer.order.total,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ OrderList, OrderDelete }, dispatch),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
);

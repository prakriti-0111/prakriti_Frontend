import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Row, Col, Modal, Form, FloatingLabel, Table, InputGroup  } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import bag from 'src/assets/images/bag.png';
import orderItem from 'src/assets/images/order-item.png';
import flatImage from 'src/assets/images/flat-off.png';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { BsStarFill } from "react-icons/bs";
import { OrderFetchRaw, OrderReturnRequest } from "actions/Customer/placeOrder.actions";
import Loader from '../../Loader';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import NoProduct from 'src/assets/images/no-product.png';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { isEmpty, priceFormat, displayAmount, convertUnitToGram, weightFormat, setLastVisitPage } from 'src/helpers/helper';

class OrderReturn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            order: null,
            loading: true,
            processing: false,
            return_products: [],
            materialReturnDialog: false,
            return_amount: 0,
            product_amount: 0,
            return_charge: 0,
            actionProductIndex: 0,
            return_weight_error: false,
            return_qty_error: false,
            view_open: {},
            reason: '',
            reason_err: '',
            returnDialog: false
        }
    }

    componentDidMount() {
        this.loadOrder();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.id != this.props.params.id) {
            this.loadOrder();
        }
    }

    loadOrder = async() => {
        let res = await OrderFetchRaw(this.props.params.id);
        if (res.data.success) {
            let items = res.data.data.items;
            if (items.length == 0) {
                toast.error("Order not found.");
                this.props.navigate('/orders');
            } else {
                let order = items[0];
                let return_products = [];
                for (let i = 0; i < order.orderProducts.length; i++) {
                    return_products.push({
                        id: order.orderProducts[i].id,
                        is_return: false
                    })
                }
                this.setState({
                    order: order,
                    return_products: return_products,
                    loading: false
                })
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
        return update;
    }

    handleCheckBox = (e, index) => {
        let products = this.state.order.orderProducts;
        let return_products = this.state.return_products;
        let product = products[index];
        if (product.product_type == "material") {
            this.setState({
                materialReturnDialog: true,
                actionProductIndex: index
            })
            return_products[index].is_return = false;
        }else{
            return_products[index].is_return = e.target.checked;
        }
        
        this.setState({
            return_products: return_products
        }, () => {
            this.calculateReturnAmount();
        })
    }

    calculateReturnAmount = () => {
        let { order } = this.state;
        let return_products = this.state.return_products;
        let return_amount = 0, return_charge = 0, product_amount = 0;
        for (let i = 0; i < return_products.length; i++) {
            if (return_products[i].is_return) {
                if (order.orderProducts[i].product_type == "material") {
                    let thisAmt = priceFormat(parseFloat(order.orderProducts[i].materials[0].return_weight) * parseFloat(order.orderProducts[i].materials[0].rate));
                    let thisReturnCharge = order.is_due ? 0 : (parseFloat(order.orderProducts[i].return_charge_percent) > 0 ? priceFormat(thisAmt * parseFloat(order.orderProducts[i].return_charge_percent) / 100) : 0);
                    order.orderProducts[i].return_amount = thisAmt;
                    order.orderProducts[i].return_charge = thisReturnCharge;
                    return_amount += (thisAmt - thisReturnCharge);
                    return_charge += thisReturnCharge;
                    product_amount += thisAmt;
                } else {
                    let thisAmt = parseFloat(order.orderProducts[i].total);
                    let thisReturnCharge = order.is_due ? 0 : (parseFloat(order.orderProducts[i].return_charge_percent) > 0 ? (thisAmt * parseFloat(order.orderProducts[i].return_charge_percent) / 100) : 0);
                    order.orderProducts[i].return_amount = thisAmt;
                    order.orderProducts[i].return_charge = thisReturnCharge;
                    return_amount += (thisAmt - thisReturnCharge);
                    return_charge += thisReturnCharge;
                    product_amount += thisAmt;
                }
            }
        }
        this.setState({
            return_amount: priceFormat(return_amount, true),
            product_amount: priceFormat(product_amount, true),
            return_charge: priceFormat(return_charge, true),
            order: order
        })
    }

    handleReturnMaterial = (val, key) => {
        let { order, actionProductIndex } = this.state;
        order.orderProducts[actionProductIndex].materials[0][key] = val;
        this.setState({
            order: order
        })
    }

    setOpen = (id) => {
        let view_open = this.state.view_open;
        view_open[id] = !this.checkOpen(id);
        this.setState({
            view_open: view_open
        })
    }

    checkOpen = (id) => {
        let view_open = this.state.view_open;
        return (id in view_open && view_open[id]) ? true : false;
    }

    handleMaterialReturnClose = () => {
        this.setState({
            materialReturnDialog: false
        })
    }

    handleReturnMaterialSubmit = () => {
        let { order, actionProductIndex } = this.state;
        const actionProduct = order.orderProducts[actionProductIndex];
        let err = false;
        if (!actionProduct.materials[0].return_weight || parseFloat(actionProduct.materials[0].return_weight) > parseFloat(actionProduct.materials[0].avl_weight)) {
            err = true;
            this.setState({
                return_weight_error: true
            })
            if (parseFloat(actionProduct.materials[0].return_weight) > parseFloat(actionProduct.materials[0].avl_weight)) {
                toast.error("Weight can't be more than available weight.");
            }
        } else {
            this.setState({
                return_weight_error: false
            })
        }
        if (!actionProduct.materials[0].return_qty || parseFloat(actionProduct.materials[0].return_qty) > parseFloat(actionProduct.materials[0].avl_qty)) {
            err = true;
            this.setState({
                return_qty_error: true
            })
            if (parseFloat(actionProduct.materials[0].return_qty) > parseFloat(actionProduct.materials[0].avl_qty)) {
                toast.error("Quantity can't be more than available quantity.");
            }
        } else {
            this.setState({
                return_qty_error: false
            })
        }
        if (!err) {
            let return_products = this.state.return_products;
            return_products[actionProductIndex].is_return = true;
            this.setState({
                materialReturnDialog: false,
                return_products: return_products
            }, () => {
                this.calculateReturnAmount();
            })
        }
    }

    hasReturn = () => {
        let isReturn = false;
        for (let i = 0; i < this.state.return_products.length; i++) {
            if (this.state.return_products[i].is_return) {
                isReturn = true;
                break;
            }
        }
        return isReturn;
    }

    handleReturnConfirm = () => {
        this.setState({
            returnDialog: true
        })
    }

    handleReturnSubmit = async() => {
        let order = this.state.order;
        if(!this.isEmptyOrSpaces(this.state.reason)){
            this.setState({
                reason_err: "",
                processing: true
            })
            let res = await OrderReturnRequest(order.id, {
                notes: this.state.reason,
                return_products: this.state.return_products,
                order_products: this.state.order.orderProducts,
                return_amount: this.state.return_amount,
                product_amount: this.state.product_amount,
                return_charge: this.state.return_charge
            });
            if(res.data.success){
                toast.success(res.data.message);
                this.props.navigate("/orders/" + order.id)
            }else{
                toast.error(res.data.message);
                this.setState({
                    processing: false
                })
            }
        }else{
            this.setState({
                processing: false,
                reason_err: "Please write valid reason."
            })
        }
    }

    handleReturnClose = () => {
        this.setState({
            returnDialog: false
        })
    }

    isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    render() {
        let {order, actionProductIndex, return_products} = this.state;
        let actionProduct = order ? order.orderProducts[actionProductIndex] : null;
        return (
            <>
                {
                    this.state.loading ?
                    <Loader />
                    :
                    <>
                        {
                            !order || order.status != "delivered" ?
                            <>
                                <div className='no-product'>
                                    <img src={NoProduct} alt='' />
                                    <h1 className='mb-0'>Order Not Found</h1>
                                </div>
                            </>
                            :
                            <>
                                <div className='order-summary-wrapper desktop-summary-wrapper'>
                                    <Container>
                                        <Breadcrumb>
                                            <Breadcrumb.Item href='/'>My Account</Breadcrumb.Item>
                                            <Breadcrumb.Item href='/orders'>My Orders</Breadcrumb.Item>
                                            <Breadcrumb.Item active>Order Return</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <h2 className='mb-1'> #{order.order_no}</h2>
                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Product Name</th>
                                                            <th>Size</th>
                                                            <th>Materials</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            order.orderProducts.map((item, key) => (
                                                                <tr key={key}>
                                                                    <td>
                                                                        <Form.Group>
                                                                            <Form.Check type="checkbox" value={item.is_return} label="" id={`product_${item.id}`} checked={return_products[key].is_return} onChange={(e) => this.handleCheckBox(e, key)} />
                                                                        </Form.Group>
                                                                        {
                                                                            (item.product_type == "material" && item.materials[0].return_weight) ?
                                                                            <Button variant="light">
                                                                                {this.checkOpen(item.id) ? <BiUpArrow /> : <BiDownArrow />}
                                                                            </Button>
                                                                            : null
                                                                        }

                                                                    </td>
                                                                    <td>
                                                                        {item.product_name}
                                                                    </td>
                                                                    <td>{item.size_name}</td>
                                                                    <td>
                                                                        <Table striped bordered hover responsive>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Weight</th>
                                                                                    <th>Quantity</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    item.materials.map((m, index) => (
                                                                                        <tr key={index}>
                                                                                            <td>
                                                                                                {m.material_name}
                                                                                            </td>
                                                                                            <td>
                                                                                                {m.weight} {m.unit_name}
                                                                                            </td>
                                                                                            <td>
                                                                                                {m.quantity}
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))
                                                                                }
                                                                            </tbody>
                                                                        </Table>
                                                                    </td>
                                                                    <td>{item.rate}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col xs={12} sm={12} md={4}>
                                                <h2 className='mb-1'>&nbsp;</h2>
                                                <div className='summary-content-right mb-4'>
                                                    <ul>
                                                        <li>
                                                            <span>Return Product Amount:</span>
                                                            <span>{displayAmount(this.state.product_amount)}</span>
                                                        </li>
                                                        <li>
                                                            <span>Return Charge:</span>
                                                            <span>{displayAmount(this.state.return_charge)}</span>
                                                        </li>
                                                        <li>
                                                            <span>Return Amount:</span>
                                                            <span>{displayAmount(this.state.return_amount)}</span>
                                                        </li>
                                                        {
                                                            this.hasReturn() ?
                                                            <li className='place-order-button mt-4'>
                                                                <Button variant="primary" className='dark_button' onClick={this.handleReturnConfirm}>Return Request</Button>
                                                            </li>
                                                            : null
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                <div className='order-summary-wrapper mobile-summary-wrapper'>
                                    <Container>
                                        <Breadcrumb>
                                            <Breadcrumb.Item href='/'>My Account</Breadcrumb.Item>
                                            <Breadcrumb.Item href='/orders'>My Orders</Breadcrumb.Item>
                                            <Breadcrumb.Item active>Order Return</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <h2 className='mb-1'> #{order.order_no}</h2>
                                                <Table striped bordered hover responsive>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Product Name</th>
                                                            <th>Size</th>
                                                            <th>Materials</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            order.orderProducts.map((item, key) => (
                                                                <tr key={key}>
                                                                    <td>
                                                                        <Form.Group>
                                                                            <Form.Check type="checkbox" value={item.is_return} label="" id={`product_${item.id}`} checked={return_products[key].is_return}  onChange={(e) => this.handleCheckBox(e, key)} />
                                                                        </Form.Group>
                                                                        {/*{
                                                                            (item.product_type == "material" && return_products[key].is_return) ?
                                                                            <Button variant="light">
                                                                                {this.checkOpen(item.id) ? <BiUpArrow /> : <BiDownArrow />}
                                                                            </Button>
                                                                            : null
                                                                        }*/}

                                                                    </td>
                                                                    <td>
                                                                        {item.product_name}
                                                                    </td>
                                                                    <td>{item.size_name}</td>
                                                                    <td>
                                                                        <Table striped bordered hover responsive>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Name</th>
                                                                                    <th>Weight</th>
                                                                                    <th>Quantity</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    item.materials.map((m, index) => (
                                                                                        <tr key={index}>
                                                                                            <td>
                                                                                                {m.material_name}
                                                                                            </td>
                                                                                            <td>
                                                                                                {m.weight} {m.unit_name}
                                                                                            </td>
                                                                                            <td>
                                                                                                {m.quantity}
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))
                                                                                }
                                                                            </tbody>
                                                                        </Table>
                                                                    </td>
                                                                    <td>{item.rate}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col xs={12} sm={12} md={4}>
                                                <h2 className='mb-1'>&nbsp;</h2>
                                                <div className='summary-content-right mb-4'>
                                                    <ul>
                                                        <li>
                                                            <span>Return Product Amount:</span>
                                                            <span>{displayAmount(this.state.product_amount)}</span>
                                                        </li>
                                                        <li>
                                                            <span>Return Charge:</span>
                                                            <span>{displayAmount(this.state.return_charge)}</span>
                                                        </li>
                                                        <li>
                                                            <span>Return Amount:</span>
                                                            <span>{displayAmount(this.state.return_amount)}</span>
                                                        </li>
                                                        {
                                                            this.hasReturn() ?
                                                            <li className='place-order-button mt-4'>
                                                                <Button variant="primary" className='dark_button' onClick={this.handleReturnConfirm}>Return Request</Button>
                                                            </li>
                                                            : null
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>

                                <Modal
                                    show={this.state.materialReturnDialog}
                                    onHide={this.handleMaterialReturnClose}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Return Product</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Row>
                                            <Col xs={12} md={6} className='mt-2'>
                                                <InputGroup>
                                                    <FloatingLabel
                                                        label="Product Name"
                                                    >
                                                        <Form.Control 
                                                            value={actionProduct.product_name}
                                                            disabled
                                                        />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6} className='mt-2'>
                                                <InputGroup>
                                                    <FloatingLabel
                                                        label="Purity"
                                                    >
                                                        <Form.Control 
                                                            value={actionProduct.materials[0].purity_name}
                                                            disabled
                                                        />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6} className='mt-2'>
                                                <InputGroup>
                                                    <FloatingLabel
                                                        label="Avl Qty"
                                                    >
                                                        <Form.Control 
                                                            value={actionProduct.materials[0].avl_qty}
                                                            disabled
                                                        />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6} className='mt-2'>
                                                <InputGroup>
                                                    <FloatingLabel
                                                        label="Avl Weight"
                                                    >
                                                        <Form.Control 
                                                            value={actionProduct.materials[0].avl_weight + " " + actionProduct.materials[0].unit_name}
                                                            disabled
                                                        />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6} className='mt-2'>
                                                <InputGroup>
                                                    <FloatingLabel
                                                        label="Quantity"
                                                        className={(this.state.return_qty_error ? ' error_input' : '')}
                                                    >
                                                        <Form.Control 
                                                            value={actionProduct.materials[0].return_qty}
                                                            onChange={(event) => this.handleReturnMaterial(event.target.value, 'return_qty')}
                                                        />
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6} className='mt-2'>
                                                <InputGroup>
                                                    <FloatingLabel
                                                        label="Weight"
                                                        className={(this.state.return_weight_error ? ' error_input' : '')}
                                                    >
                                                        <Form.Control 
                                                            value={actionProduct.materials[0].return_weight}
                                                            onChange={(event) => this.handleReturnMaterial(event.target.value, 'return_weight')}
                                                        />
                                                        {/*<InputGroup.Text>{actionProduct.materials[0].unit_name}</InputGroup.Text>*/}
                                                    </FloatingLabel>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleMaterialReturnClose}>
                                        Close
                                    </Button>
                                        <Button variant="primary" onClick={this.handleReturnMaterialSubmit} disabled={this.state.processing}>Submit</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal
                                    show={this.state.returnDialog}
                                    onHide={this.handleReturnClose}
                                    backdrop="static"
                                    keyboard={false}
                                >
                                    <Modal.Header closeButton>
                                    <Modal.Title>Return Order</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Row>
                                            <Col xs={12} md={12} className="mt-3">
                                                <Form.Group>
                                                    <FloatingLabel controlId="floatingTextarea3" label="Reason" className={this.state.reason_err ? 'is-invalid' : ''}>
                                                        <Form.Control
                                                            as="textarea"
                                                            style={{ height: '100px' }}
                                                            onChange={(e) => this.setState({
                                                                reason: e.target.value
                                                            })}
                                                        />
                                                    </FloatingLabel>
                                                    <Form.Control.Feedback type="invalid">
                                                        {this.state.reason_err}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleReturnClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.handleReturnSubmit} disabled={this.state.processing}>Submit</Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        }

                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderReturn));
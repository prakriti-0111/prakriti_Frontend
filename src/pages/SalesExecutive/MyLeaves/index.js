import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal  from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { LeaveData, LeaveDelete, LeaveAdd } from "actions/Sales/leave.actions";
import { LEAVE_RESET} from "actionTypes/Sales/leaves.types";

class MyLeaves extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            processing: false,
            leaveList: this.props.leaveList,
            leaveListTotal: this.props.leaveListTotal,
            leave_queryParams: {
                page: 1,
                limit: 15
            },
            lvs_actionCalled: this.props.lvs_actionCalled,
            lvs_createSuccess: this.props.lvs_createSuccess,
            lvs_editSuccess: this.props.lvs_editSuccess,
            lvs_deleteSuccess: this.props.lvs_deleteSuccess,
            lvs_successMessage: this.props.lvs_successMessage,
            lvs_errorMessage: this.props.lvs_errorMessage,
            showDialog: false,
            modalTitle: '',
            isEdit: false,
            actionRow: null,
            deleteDialog: false,
            leave_reason:''
        }
    }

    componentDidMount(){
        this.loadListData();
    }

    loadListData = () => {
        this.props.actions.LeaveData(this.state.leave_queryParams);
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
       
        if (props.leaveList !== state.leaveList) {
            update.leaveList = props.leaveList;
        }
        if (props.leaveListTotal !== state.leaveListTotal) {
            update.leaveListTotal = props.leaveListTotal;
        }
        if (props.lvs_actionCalled !== state.lvs_actionCalled) {
            update.lvs_actionCalled = props.lvs_actionCalled;
        }
        if (props.lvs_createSuccess !== state.lvs_createSuccess) {
            update.lvs_createSuccess = props.lvs_createSuccess;
        }
        // if (props.lvs_editSuccess !== state.lvs_editSuccess) {
        //     update.lvs_editSuccess = props.lvs_editSuccess;
        // }
        if (props.lvs_deleteSuccess !== state.lvs_deleteSuccess) {
            update.lvs_deleteSuccess = props.lvs_deleteSuccess;
        }
        if (props.lvs_successMessage !== state.lvs_successMessage) {
            update.lvs_successMessage = props.lvs_successMessage;
        }
        if (props.lvs_errorMessage !== state.lvs_errorMessage) {
            update.lvs_errorMessage = props.lvs_errorMessage;
        }
        
        return update;
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            leave_reason: e.target.value
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        if(this.state.leave_reason == ''){
            toast.error('Please provide a leave reason.');
        }else{
            if(this.state.isEdit){
                //this.props.actions.leaveUpdate(this.state.actionRow.id, data);
            }else{
                this.props.actions.LeaveAdd({title:this.state.leave_reason,status:'pending',message:null});
            }
        }
    }

    

    

    // handleDeleteClose = () => {

    // }

   componentDidUpdate(prevProps){
        if(this.state.lvs_actionCalled){
            if(this.state.lvs_createSuccess){
                toast.success(this.state.lvs_successMessage);
                this.setState({
                    showDialog: false,
                    processing: false
                }); 
                
                this.loadListData();
                 this.props.dispatch({
                    type: LEAVE_RESET
                }); 
            }else if(this.state.lvs_deleteSuccess){
                toast.success(this.state.lvs_successMessage);
                this.setState({
                    deleteDialog: false,
                    processing: false
                });    
                this.loadListData();
                    this.props.dispatch({
                    type: LEAVE_RESET
                }); 
            }
        }
    }

    // hanldeEdit = (item) => {
    //     this.setState({
    //         leave: {
    //             formValues: {
    //                 leave_reason:''
    //             },
    //             formErros: {
    //                 leave_reason: false,
    //             }
    //         },
    //         showDialog: true,
    //         isEdit: true,
    //         modalTitle: 'Edit leave',
    //         actionRow: item
    //     })
    // }

    hanldeDelete = (item) => {
        this.setState({
            deleteDialog: true,
            actionRow: item
        })
    }

    hanldeAddNew = () => {
        this.setState({
            showDialog: true,
            modalTitle: 'Add New leave',
            isEdit: false
        })
    }

    handleClose = () => {
        this.setState({
            showDialog: false
        })
    }

    // onPlaceSelected = (place) => {
        
    // }

    handleDeleteClose = () => {
        this.setState({
            deleteDialog: false,
            actionRow: null
        })
    }

    hanldeDeleteSumit = () => {
        this.props.actions.LeaveDelete({id:this.state.actionRow.id});
    }

    render() {
        console.log(this.state.leaveList);
        return (
            <div className='edit-profile-wrapper'>
                <Container>
                    <h2 className='mb-4'>My leave <Button variant="primary" onClick={(e) => this.hanldeAddNew()}>Add New</Button></h2>
                    <Form onSubmit={this.onSubmit}>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Leave Reason</th>
                                                <th>Status</th>
                                                <th>Message</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.leaveList.length == 0 ?
                                                <tr>
                                                    <td colSpan={9}> <p className='text-center'>No leave found.</p></td>
                                                </tr>
                                                :
                                                <>
                                                    {
                                                        this.state.leaveList.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.title}</td>
                                                                <td>{item.status}</td>
                                                                <td>{item.message}</td>
                                                                <td>
                                                                    {/* <Button variant="primary" onClick={(e) => this.hanldeEdit(item)}>Edit</Button> */}
                                                                    &nbsp;
                                                                    <Button variant="danger" onClick={(e) => this.hanldeDelete(item)}>Delete</Button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </>
                                            }
                                            <tr>

                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                
                            </Row>
                        </Container>
                    </Form>

                    <Modal
                        show={this.state.showDialog}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group>
                                        <Form.Label>Leave Reason : </Form.Label>
                                        <Form.Control className='' name='leave_reason' value={this.state.leave_reason} onChange={(e) => this.handleChange(e)} placeholder="Enter leave reason*" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onSubmit}>Save</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.deleteDialog} onHide={this.handleDeleteClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Delete leave</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure want delete this leave?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleDeleteClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.hanldeDeleteSumit}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    leaveList: state.sales.leaveItem.items,
    leaveListTotal: state.sales.leaveItem.total,
    lvs_actionCalled: state.sales.leaveItem.actionCalled,
    lvs_createSuccess: state.sales.leaveItem.createSuccess,
    lvs_editSuccess: state.sales.leaveItem.editSuccess,
    lvs_deleteSuccess: state.sales.leaveItem.deleteSuccess,
    lvs_successMessage: state.sales.leaveItem.successMessage,
    lvs_errorMessage: state.sales.leaveItem.errorMessage
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ LeaveDelete, LeaveData, LeaveAdd }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyLeaves));


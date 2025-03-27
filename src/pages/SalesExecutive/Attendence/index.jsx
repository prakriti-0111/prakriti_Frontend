import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { getAttendence } from "actions/Sales/profile.actions";
import { toast } from 'react-toastify';
import { SALES_RESET_CHANGE_PASSWORD } from 'actionTypes/Sales/changePassword.types';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

class Attendence extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            calendar_value: new Date(),
            year: (new Date()).getFullYear(),
            month: ((new Date()).getMonth() + 1),
            attendance: {
                present: 0,
                absent: 0,
                days: []
            }
        }
    }

    componentDidMount(){
        this.loadAttendence();
    }

    static getDerivedStateFromProps(props, state) {
        let update = {};
        
        return update;
    }

    handleMonthAndYearChange = (event) => {
        const year = event.activeStartDate.getFullYear();
        const month = event.activeStartDate.getMonth() + 1 ;
        const queryParams = {
            year: year,
            month: month
        };
    };

    onChange = (p) => {
        this.setState({
            calendar_value: p
        })
    }

    loadAttendence = async() => {
        let res = await getAttendence({month: this.state.month, year: this.state.year});
        if(res.data.success){
            this.setState({
                attendance: res.data.data
            })
        }
    }

    onClickDay = (value, event) => {
        let date = moment(value).format("YYYY-MM-DD");
        console.log(date)
    }

    render() {
        const {attendance} = this.state;
        return (
            <div className='edit-profile-wrapper'>
                <Container>
                    <h2 className='mb-4'>Attendence</h2>
                    <div className='calender-wrapper'>
                        <Calendar 
                            onChange={this.onChange} 
                            onActiveStartDateChange={this.handleMonthAndYearChange}
                            value={this.state.calendar_value}
                            tileClassName={({ date, view }) => {
                                let data = attendance.days.find(x=> x.date == moment(date).format("YYYY-MM-DD"));
                                if(data){
                                    return data.status;
                                }
                            }}
                            onClickDay={this.onClickDay}
                        />
                    </div>
                </Container>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators({ }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Attendence));


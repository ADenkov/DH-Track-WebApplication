
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import nfsForm from './nfs-modal-form.component'

export class Datepic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: "",
            formattedDate: moment().format("DD-MM-YYYY")
        }
    }

    Changedate = (e) => {
        var newDate = moment(e).format("DD-MM-YYYY");
        console.log(newDate);
        this.state.formattedDate = newDate;
        this.setState({
            date: e
        });
        console.log(this.state.formattedDate);

        let _date = this.state.formattedDate;
        this.props.onChangeDate(_date);
    };


    render() {
        return (

            <div className="container">
                <div class="row" style={{ marginTop: "10px" }}>
                    <div class="col-sm-4">
                        <DatePicker className="form-control"
                            selected={this.state.date} placeholderText="Select Date" showPopperArrow={false}
                            onChange={this.Changedate} minDate={moment().toDate()}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default Datepic  

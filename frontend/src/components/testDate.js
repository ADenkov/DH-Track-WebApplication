import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

const testDate = {
    render() {
        return (
            <div className="container">
                <div class="row" style={{ marginTop: "10px" }}>
                    <div class="col-sm-4">
                        <DatePicker className="form-control"
                            selected={this.state.date} placeholderText="Select Date" showPopperArrow={false}
                            onChange={this.Changedate}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


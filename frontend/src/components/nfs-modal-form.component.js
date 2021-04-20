import Button from 'react-bootstrap/Button';
import AuthService from "../services/auth.service";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { Component } from "react";
import UserService from '../services/users.service';
import Datepic from './datepic.component'
import Datefce from "./datefce.component";
import moment from 'moment';
import GenerateRandomCode from "d3-random";
import DatePicker from "react-datepicker";

class TicketForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeNrOfDays = this.onChangeNrOfDays.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);

        this.state = {
            date: "",
            age: "",
            nrOfDays: 0,
            track: "Need for Speed",
            successful: false,
            approved: undefined,
            message: "",
            code: "",
            price: 0,
            email: "",
            currentClient: {
                id: null,
                name: "",
                username: "",
                email: "",
            },
            riderPass: {
                approvedForTrack: ""
            }

        };
    }

    componentDidMount() {
        const client = AuthService.getCurrentClient();
        if (client) {
            this.setState({
                currentClient: client,
                email: client.email
            });
        }
        this.getRiderPass(client.email);

    }

    getRiderPass(email) {
        UserService.getRiderPassByEmail(email)
            .then(response => {
                this.setState({
                    riderPass: response.data
                });
                console.log(this.state.riderPass.approvedForTrack);
            })
            .catch(e => {
                console.log(e);
            });
    }

    genetrateCode() {

        var _code = "";
        for (var i = 0; i < 6; i++) {
            _code += Math.floor(Math.random() * Math.floor(9));
        }
        console.log(_code);
        var strCode = "T" + this.state.currentClient.username[0] + _code.toString();
        console.log(strCode);

        this.state.code = strCode;
        // this.setState({
        //     code: strCode
        // });
    }

    onChangeDate(e) {
        const newDate = this.props.date
        // var newDate = moment(e.target.value).format("DD-MM-YYYY");
        // console.log(newDate);
        this.setState({
            date: e.target.value
        });
        console.log(this.state.date);
    }

    onChangeNrOfDays(e) {
        this.setState({
            nrOfDays: parseInt(e.target.value)
        });
        console.log(this.state.nrOfDays);

    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
        this.calculatePrice();
    }


    calculatePrice() {

        console.log("age: " + this.state.age + "; nrOfDays: " + this.state.nrOfDays)

        if (this.state.age === "adult" && this.state.nrOfDays < 4) {
            if (this.state.nrOfDays === 1) {
                this.state.price = 80;
            }
            else if (this.state.nrOfDays === 2) {
                this.state.price = 150;
            }
            else if (this.state.nrOfDays === 3) {
                this.state.price = 200;
            }
        }
        else if (this.state.age === "teen" && this.state.nrOfDays < 4) {
            if (this.state.nrOfDays === 1) {
                this.state.price = 72;
            }
            else if (this.state.nrOfDays === 2) {
                this.state.price = 133;
            }
            else if (this.state.nrOfDays === 3) {
                this.state.price = 186;
            }
        }
        else if (this.state.age === "child" && this.state.nrOfDays < 4) {
            if (this.state.nrOfDays === 1) {
                this.state.price = 46;
            }
            else if (this.state.nrOfDays === 2) {
                this.state.price = 80;
            }
            else if (this.state.nrOfDays === 3) {
                this.state.price = 144;
            }
        }

        console.log("set price: " + this.state.price);
    }

    onHandleDateChange = (date) => {
        this.setState({
            date: date
        })
        console.log(date);
    }

    handleSubmission(e) {
        e.preventDefault();

        this.calculatePrice();
        this.genetrateCode();




        var data = {
            ageGroup: this.state.age,
            duration: this.state.nrOfDays,
            date: this.state.date,
            approved: this.state.approved,
            track: this.state.track,
            price: this.state.price,
            code: this.state.code,
            currentClient: this.state.currentClient
        };


        if (this.state.riderPass.approvedForTrack === "Need for Speed" || this.state.riderPass.approvedForTrack === "All Tracks" && this.state.age !== "" && this.state.nrOfDays !== "" && this.state.price !== 0 && this.state.date !== "") {
            UserService.addNewTicket(
                this.state.email, data
            ).then(
                response => {
                    this.setState({
                        ageGroup: this.state.age,
                        duration: this.state.nrOfDays,
                        email: this.state.email,
                        date: this.state.date,
                        track: this.state.track,
                        code: this.state.code,
                        approved: false,
                        currentClient: this.state.currentClient,
                        message: response.data.message,
                        successful: true
                    });
                    console.log(this.state.message + " - stana be");
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
        else if (this.state.riderPass.approvedForTrack !== "Need for Speed" || this.state.riderPass.approvedForTrack !== "All Tracks") {
            alert("Your Rider Pass is does not permit you to purchase this ticket. Please try buying a ticket that corresponds to your Rider Pass.");
        }
        else {
            alert("   You haven't filled the required fields!\nPlease go back and fill them to continue.");
        }
        console.log("riderPass: " + this.state.riderPass.approvedForTrack);

    }

    // newRiderPass() {
    //   this.setState({
    //     id: null,
    //     name: "",
    //     email: "",
    //     skillClarification: "",
    //     skill: "",
    //     approved: undefined,
    //     successful: false,
    //   });
    // }




    render() {
        const { riderPass, date } = this.state;
        return (
            <Form>
                {!this.state.successful && (
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Chosen Track</Form.Label>
                        <Form.Control
                            type="text"
                            value={"Need for Speed"}
                            readOnly
                        >
                        </Form.Control>
                        <Form.Label>RiderPass</Form.Label>
                        <Form.Control
                            type="email"
                            value={riderPass.approvedForTrack}
                            readOnly
                        >
                        </Form.Control>
                        <div><small>This indicates for which tracks you qualify for buying a ticket</small></div>

                        <Form.Label>Date</Form.Label>
                        <InputGroup>
                            <Datepic onChangeDate={this.onHandleDateChange} date={this.state.formattedDate}></Datepic>
                        </InputGroup>

                        <Form.Label>For how many days are you buying your ticket for?</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={this.onChangeNrOfDays}>
                            <option value="" disabled selected>Choose an option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Control>
                        <Form.Label>What's your age group?</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={this.onChangeAge}>
                            <option value="" disabled selected>Choose an option</option>
                            <option value="adult">Adult (18-64)</option>
                            <option value="teen">Teen (13-17)</option>
                            <option value="child">Child (5-12)</option>
                        </Form.Control>
                        <br />
                        <Button variant="dark" onClick={this.handleSubmission}>
                            Purchase
                        </Button>
                    </Form.Group>


                )}

                {this.state.message === undefined && (
                    <div className="form-group">
                        <div class="alert alert-success" role="alert">
                            <center>
                                Thank you for your purchase! <br />
                            You bought a(n) {this.state.age} ticket for <strong>{this.state.nrOfDays}</strong> day(s) for <strong>${this.state.price}</strong>.<br />
                            Your ticket code is: <strong>{this.state.code}</strong>. Keep it for a reference!<br />
                            Valid for use at the <strong>{this.state.track}</strong> track from <strong>{this.state.date}</strong>.<br /> <br />
                            Ride safe!
                            </center>
                        </div>
                    </div>
                )}

            </Form>
        );
    }
}

export default TicketForm;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';

import UserService from "../services/users.service";

export default class Manager extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveRiderPasses = this.retrieveRiderPasses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRiderPass = this.setActiveRiderPass.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      riderPasses: [],
      tickets: [],
      revenue: 0,
      currentTicket: null,
      currentTicketIndex: -1,
      currentPass: null,
      currentIndex: -1,
      searchName: "",
      content: "",
      decision: ""
    };
  }

  componentDidMount() {
    this.retrieveRiderPasses();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  decideRiderPass(decision1) {
    UserService.riderPassDecide(this.state.currentPass.email, decision1)
      .then(response => {
        this.setState(prevState => ({
          decision: decision1,
          currentPass: {
            ...prevState.currentPass
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("email is: " + this.state.currentPass.decision);

    console.log("decision is: " + this.state.decision);

  }

  retrieveRiderPasses() {
    UserService.getAllRiderPasses()
      .then(response => {
        this.setState({
          riderPasses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveTickets() {
    var _tickets = [];
    UserService.getAllTickets()
      .then(response => {
        this.setState({
          tickets: response.data
        });
        console.log(response.data);
        this.calculateRevenue(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // calculateRevenue(tickets = []) {
  //   let _ticket = null;
  //   if (tickets !== null && tickets.length !== 0) {
  //     for (let i = 0; i < tickets.length; i++) {
  //       _revenue += tickets[i].price;
  //     }
  //     this.setState({
  //       revenue: _revenue
  //     })
  //     console.log("revenue: " + _revenue);
  //   }
  // }

  calculateRevenue(tickets = []) {
    let _revenue = 0
    if (tickets !== null && tickets.length !== 0) {
      for (let i = 0; i < tickets.length; i++) {
        _revenue += tickets[i].price;
      }
      this.setState({
        revenue: _revenue
      })
      console.log("revenue: " + _revenue);
    }
  }

  refreshTicketList() {
    this.retrieveTickets();
    this.calculateRevenue();
    this.setState({
      currentTicket: null,
      currentTicketIndex: -1
    });
  }

  setActiveTicket(ticket, index) {
    this.setState({
      currentTicket: ticket,
      currentTicketIndex: index
    });
  }

  refreshList() {
    this.retrieveRiderPasses();
    this.setState({
      currentPass: null,
      currentIndex: -1
    });
  }

  setActiveRiderPass(riderPass, index) {
    this.setState({
      currentPass: riderPass,
      currentIndex: index
    });
    this.calculateRevenue();
  }

  searchName() {
    UserService.getRiderPass(this.state.searchName)
      .then(response => {
        this.setState({
          riderPasses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  componentDidMount() {
    this.retrieveRiderPasses();
    this.retrieveTickets();
    this.calculateRevenue();

    UserService.getManagerBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { searchName, riderPasses, currentPass, currentIndex, tickets, currentTicket, currentTicketIndex, revenue } = this.state;

    return (
      <div>
        <Tabs className="managerTabs" defaultActiveKey="Manager" transition={false} id="noanim-tab-example">
          <Tab eventKey="RiderPasses" title="Rider Passes">
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchName}
                    onChange={this.onChangeSearchName}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchName}
                    >
                      Search
              </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Rider Passes</h4>

                <ul className="list-group">
                  {riderPasses &&
                    riderPasses.map((riderPass, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveRiderPass(riderPass, index)}
                        key={index}
                      >
                        Candidate: <b>{riderPass.name}</b>
                      </li>
                    ))}
                </ul>

              </div>
              <div className="col-md-6">
                {currentPass ? (
                  <div>
                    <h4>Rider Pass</h4>
                    <div>
                      <label>
                        <strong>Name:</strong>
                      </label>{" "}
                      {currentPass.name}
                    </div>
                    <div>
                      <label>
                        <strong>email:</strong>
                      </label>{" "}
                      {currentPass.email}
                    </div>
                    <div>
                      <label>
                        <strong>Skill:</strong>
                      </label>{" "}
                      {currentPass.skill}
                    </div>
                    <div>
                      <label>
                        <strong>Skill Clarification:</strong>
                      </label>{" "}
                      {currentPass.skillClarification}
                    </div>
                    <div>
                      <label>
                        <strong>Approval Status:</strong>
                      </label>{" "}
                      {currentPass.approvedForTrack}
                    </div>
                    <br></br>
                    <button
                      className="btn btn-success mr-3"
                      onClick={() => this.decideRiderPass("Need for Speed")}>
                      Approve for Easy Track
              </button>

                    <button
                      className="btn btn-warning mr-3"
                      onClick={() => this.decideRiderPass("All Tracks")}>
                      Approve for All tracks
              </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => this.decideRiderPass("Rejected")}>
                      Reject
              </button>
                  </div>

                ) : (
                    <div>
                      <br />
                      <p>Please click on a rider pass</p>
                    </div>
                  )}
                <br />
                {this.state.decision === "All Tracks" && (
                  <div className="form-group">
                    <div class="alert alert-success" role="alert">
                      You have successfully given the following decision to the applicant: {this.state.decision}
                    </div>
                  </div>
                )}
                {this.state.decision === "Need for Speed" && (
                  <div className="form-group">
                    <div class="alert alert-success" role="alert">
                      You have successfully given the following decision to the applicant: {this.state.decision}
                    </div>
                  </div>
                )}
                {this.state.decision === "Rejected" && (
                  <div className="form-group">
                    <div class="alert alert-danger" role="alert">
                      You have successfully given the following decision to the applicant: {this.state.decision}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey="Tickets" title="Tickets">
            <Card>
              <Card.Body>Total Lift Revenue: <strong>${revenue}</strong></Card.Body>
            </Card>
            <div className="list row">
              <div className="col-md-6">
                <h4>Tickets</h4>

                <ul className="list-group">
                  {tickets &&
                    tickets.map((ticket, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentTicketIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTicket(ticket, index)}
                        key={index}
                      >
                        Ticket code: <b>{ticket.code}</b>
                      </li>
                    ))}
                </ul>

              </div>
              <div className="col-md-6">
                {currentTicket ? (
                  <div>
                    <h4>Ticket</h4>
                    <div>
                      <label>
                        <strong>Ticket ID:</strong>
                      </label>{" "}
                      {currentTicket.ticketId}
                    </div>
                    <div>
                      <label>
                        <strong>Code:</strong>
                      </label>{" "}
                      {currentTicket.code}
                    </div>
                    <div>
                      <label>
                        <strong>Track:</strong>
                      </label>{" "}
                      {currentTicket.track}
                    </div>
                    <div>
                      <label>
                        <strong>Age Group:</strong>
                      </label>{" "}
                      {currentTicket.ageGroup}
                    </div>
                    <div>
                      <label>
                        <strong>Valid for Date:</strong>
                      </label>{" "}
                      {currentTicket.date}
                    </div>
                    <div>
                      <label>
                        <strong>Duration:</strong>
                      </label>{" "}
                      {currentTicket.duration + " days"}
                    </div>
                    <div>
                      <label>
                        <strong>Price:</strong>
                      </label>{" "}
                      {"$" + currentTicket.price}
                    </div>
                    {/* <br></br>
                    <button
                      className="btn btn-success mr-3"
                      onClick={() => this.decideRiderPass("Need for Speed")}>
                      Approve for Easy Track
              </button>

                    <button
                      className="btn btn-warning mr-3"
                      onClick={() => this.decideRiderPass("All Tracks")}>
                      Approve for All tracks
              </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => this.decideRiderPass("Rejected")}>
                      Reject
              </button> */}
                  </div>

                ) : (
                    <div>
                      <br />
                      <p>Please click on a ticket</p>
                    </div>
                  )}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
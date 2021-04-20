import React, { Component } from "react";
import PermissionModal from "./application-modal.component"
import Tickets from "./tickets.component";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

export default class Home extends Component {

  render() {
    return (
      <Router>

        <body>
          <header>
            <img className="homescreenImg" src="/images/homepage2.jpg" />

            <nav class="navbar navbar-expand-sm navbar-dark">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a id="botnav-item" class="nav-link" href="#">Pass Permission</a>
                </li>
                <li class="nav-item">
                  <a id="botnav-item" class="nav-link" href="/tickets">Tickets</a>
                </li>
                <li class="nav-item">
                  <a id="botnav-item" class="nav-link" href="/trackinfo">Trails</a>
                </li>
                {/* <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li> */}
              </ul>
            </nav>

          </header>
          <center>
            <header className="jumbotron jumbotron-fluid">
              <div className="container">
                <h3>Apply for a RiderPass in order to purchase a lift ticket.</h3>
                <br></br>
                <p>Riders need a permission to ride on the tracks in order to ensure everyone's safety and to avoid accidents. This permission is called a <b>RiderPass</b>. The RiderPass indicates which track(s) you're allowed to use, so you can buy lift tickets for the tracks accordingly.</p>
                <p>Use the button below to fulfill the <b>RiderPass Application</b></p>
                <br></br>
                <button className="btn btn-dark" ><PermissionModal /></button>
              </div>
            </header>
          </center>
        </body>


        <Switch>
          <Route path="/tickets" component={Tickets} />
        </Switch>
      </Router>
    );
  }
}
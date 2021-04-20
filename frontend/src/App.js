import React, { Component, useState, useEffect } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import { useDispatch, useSelector } from "react-redux";
import AuthService from "./services/auth.service";
import RegisterClient from "./components/register.component";
import Clients from "./components/client.component";
import ClientsList from "./components/clients-list.component";
import BoardManager from "./components/manager.component";
import loginComp from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Tickets from "./components/tickets.component";
import TrackInfo from "./components/track-info";
// import Websocket from "./Websocket";
// import { clearMessage } from "./actions/message";
// import { history } from "./helpers/history";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showManagerBoard: false,
      currentClient: undefined,
    };
  }


  componentDidMount() {
    const client = AuthService.getCurrentClient();
    if (client) {
      this.setState({
        currentClient: client,
        showManagerBoard: client.roles.includes("ROLE_MANAGER"),
        showUserBoard: client.roles.includes("ROLE_USER"),

      });
    }
  }

  logOut() {
    AuthService.logout();
  }


  render() {
    const { currentClient, showManagerBoard, showUserBoard } = this.state;
    return (

      <Router>
        <nav className="navbar navbar-expand navbar-dark" id="navi">
          <a className="navbar-brand" href="/">
            <div class="logo-image">
              <img src="/images/logo.png" class="img-fluid"></img>
            </div>
          </a>
          <div className="navbar-nav mr-auto">


            <li id="topnav-item" className="nav-item">
              <a href="/trackinfo" className="nav-link">
                Trail Info
              </a>
            </li>
            {showUserBoard && (
              <li id="topnav-item" className="nav-item">
                <a href="/tickets" className="nav-link">
                  Lift Tickets
              </a>
              </li>
            )}

            {/* <li id="topnav-item" className="nav-item">
              <a href="/websocket" className="nav-link">
                Websocket
              </a>
            </li> */}
            {showManagerBoard && (
              <li id="topnav-item" className="nav-item">
                <Link to={"/manager"} className="nav-link">
                  Manager Board
              </Link>
              </li>
            )}
            {showManagerBoard && (
              <li id="topnav-item" className="nav-item">
                <Link to={"/clients"} className="nav-link">
                  Users
              </Link>
              </li>
            )}
          </div>

          {/* {currentClient && (
              <li className="nav-item">
                <Link to={"/client"} className="nav-link">
                  Client
              </Link>
              </li>
            )}
          </div> */}

          {currentClient ? (
            <div className="navbar-nav ml-auto">
              <li id="topnav-item" className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentClient.username}
                </Link>
              </li>
              <li id="topnav-item" className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
              </a>
              </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li id="topnav-item" className="nav-item">
                  <Link to={"/login"} className="nav-link" id="btnLogin">
                    Login
              </Link>
                </li>

                <li id="topnav-item" className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
              </Link>
                </li>
              </div>
            )}
        </nav>



        <Switch>
          <Route exact path="/clients" component={ClientsList} />
          <Route exact path="/register" component={RegisterClient} />
          <Route path="/clients/:id" component={Clients} />
          <Route path="/login" component={loginComp} />
          <Route path="/profile" component={Profile} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/manager" component={BoardManager} />
          <Route path="/trackinfo" component={TrackInfo} />
          <Route exact path={["/", "/home"]} component={Home} />
        </Switch>
      </Router>

    );
  };
}

export default App;
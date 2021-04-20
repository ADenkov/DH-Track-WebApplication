import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/users.service";
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.getClient = this.getClient.bind(this);
    this.saveUpdate = this.saveUpdate.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentClient(),
      currentClient: {
        id: null,
        name: "",
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        published: false
      },
      message: "",
      riderPass: {
        id: null,
        approvedForTrack: "",
      },
    };
  }

  componentDidMount() {
    const client = AuthService.getCurrentClient();
    this.getClient(client.email);

  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function (prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          username: username
        }
      };
    });
  }

  onChangePhoneNumber(e) {
    const phoneNumber = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        phoneNumber: phoneNumber
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        email: email
      }
    }));
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        password: password
      }
    }));
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        id: id
      }
    }));
  }

  getClient(id) {
    UserService.get(id)
      .then(response => {
        this.setState({
          currentClient: response.data
        });
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  saveUpdate(status) {
    var data = {
      id: this.state.currentClient.id,
      username: this.state.currentClient.username,
      email: this.state.currentClient.email,
      password: this.state.currentClient.password,
      phoneNumber: this.state.currentClient.phoneNumber,
      published: status
    };

    var data_noPass = {
      id: this.state.currentClient.id,
      username: this.state.currentClient.username,
      email: this.state.currentClient.email,
      phoneNumber: this.state.currentClient.phoneNumber,
      published: status
    };

    if (this.state.currentClient.password !== undefined ) {
      UserService.update(this.state.currentClient.email, data)
        .then(response => {
          this.setState(prevState => ({
            currentClient: {
              ...prevState.currentClient,
              published: status
            }
          }));
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      UserService.update(this.state.currentClient.email, data_noPass)
        .then(response => {
          this.setState(prevState => ({
            currentClient: {
              ...prevState.currentClient,
              published: status
            }
          }));
          console.log(response.data_noPass);
        })
        .catch(e => {
          console.log(e);
        });    }
  }

  updateClient() {
    UserService.update(
      this.state.currentClient.name,
      this.state.currentClient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Your profile was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClient() {
    UserService.delete(this.state.currentClient.email)
      .then(response => {
        console.log(response.data);
        AuthService.logout();
        this.props.history.push('/')
        window.location.reload(false);
      })
      .catch(e => {
        console.log(e);
      });
  }


  getClient(email) {
    UserService.get(email)
      .then(response => {
        this.setState({
          currentClient: response.data,
        });
      })
      .catch(e => {
        console.log(e);
      });


    UserService.getRiderPassByEmail(email)
      .then(response => {
        this.setState({
          riderPass: response.data,
        });
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });
    console.log(this.state.riderPass);
  }
  render() {
    const { currentUser, currentClient, riderPass } = this.state;
    console.log(riderPass);

    return (

      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}'s</strong> Profile
          </h3>
        </header>
        <Tabs className="profileTabs" defaultActiveKey="Profile" transition={false} id="noanim-tab-example">
          <Tab eventKey="Profile" title="Profile">

            <p>
              <strong>User ID:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {currentClient.name}
            </p>
            <p>
              <strong>RiderPass:</strong>{" "}
              {riderPass.approvedForTrack}
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              {currentClient.phoneNumber}
            </p>


            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>

            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>  </Tab>
          <Tab eventKey="Edit" title="Edit">
            <div>
              <div className="edit-form">
                <h4>Tap to edit your profile details</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={currentClient.username}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={currentClient.name}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={currentClient.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={currentClient.phoneNumber}
                      onChange={this.onChangePhoneNumber}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      onChange={this.onChangePassword}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentClient.published ? "Updated" : "Pending"}
                  </div>
                </form>

                {currentClient.published ? (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => 
                      window.confirm("Are you sure you wish to update your profile with the details specified?") &&
                      this.saveUpdate(true)}
                  >
                    Save
                  </button>
                ) : (
                    <button
                      className="btn btn-dark mr-3"
                      onClick={() => 
                        window.confirm("Are you sure you wish to update your profile with the details specified?") &&
                        this.saveUpdate(true)}
                    >
                      Save
                    </button>
                  )}

                <button
                  className="btn btn-danger mr-3"
                  onClick={e =>
                    window.confirm("Are you sure you wish to delete your profile?") &&
                    this.deleteClient(e)}
                >
                  Delete
            </button>
                <p>{this.state.message}</p>
              </div>
            </div>

          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
          </Tab>
        </Tabs>

        {/* 
        <Link
          to={"/clients/" + currentClient.email}
          className="btn btn-warning">
          Edit Profile
      </Link> */}

      </div>
    );
  }
}

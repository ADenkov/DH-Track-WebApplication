import React, { Component } from "react";
import authService from "../services/auth.service";
import ClientDataService from "../services/users.service";

export default class Client extends Component {
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
      currentClient: {
        id: null,
        name: "",
        username: "", 
        email: "",
        password: "",
        phoneNumber: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getClient(this.props.match.params.id);
  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
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
    ClientDataService.get(id)
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

    console.log(this.state.currentClient.password);
    if (this.state.currentClient.password !== undefined)
    {
    ClientDataService.update(this.state.currentClient.email, data)
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
    else
    {
      alert("You haven't specified a valid password");
    }
  }

  updateClient() {
    ClientDataService.update(
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
    ClientDataService.delete(this.state.currentClient.email)
      .then(response => {
        console.log(response.data);
        authService.logout();
        this.props.history.push('/')
        window.location.reload(false);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div>
        {currentClient ? (
          <div className="edit-form">
            <h4>Tap to Edit User Profile</h4>
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
                onClick={() => this.saveUpdate(false)}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-dark mr-3"
                onClick={() => this.saveUpdate(true)}
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

            {/* <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateClient}
            >
              Update
            </button> */}
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a client...</p>
          </div>
        )}
      </div>
    );
  }
}

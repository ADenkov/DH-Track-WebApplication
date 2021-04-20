import Button from 'react-bootstrap/Button';
import AuthService from "../services/auth.service";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { Component } from "react";
import UserService from '../services/users.service';
import Axios from 'axios';

class PermissionForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSkill = this.onChangeSkill.bind(this);
    this.onChangeSkillClarification = this.onChangeSkillClarification.bind(this);

    this.state = {
      name: "",
      email: "",
      skill: { level: "" },
      skillClarification: "",
      approved: undefined,
      successful: false,
      skills: [],
      message: "",
      currentClient: {
        id: null,
        name: "",
        username: "",
        email: "",
      },
    };
  }

  componentDidMount() {
    const client = AuthService.getCurrentClient();
    console.log(client);
    if (client) {
      this.setState({
        currentClient: client,
      });
      console.log("yes");
      this.getClient(client.email);
    }
    else if (client === null) {
      alert("   You have to log into your account before applying for a Rider Pass!");
      // <div className="form-group">
      //       <div class="alert alert-danger" role="alert">
      //         You have to log into your account before applying for a Rider Pass!
      //         </div>
      //     </div>
    }

  }

  getClient(email) {
    UserService.get(email)
      .then(response => {
        this.setState({
          currentClient: response.data
        });

      })
      .catch(e => {
        console.log(e);
      });
  }


  onChangeSkill(e) {
    this.setState({
      skill: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeSkillClarification(e) {
    this.setState({
      skillClarification: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }



  handleSubmission(e) {

    var data = {
      name: this.state.name,
      skill: this.state.skill,
      email: this.state.email,
      skillClarification: this.state.skillClarification,
      approved: this.state.approved
    };


    if (this.state.email !== "" && this.state.skill !== "" && this.state.skillClarification !== "") {
      UserService.createRiderPassApplication(
        data
      ).then(
        response => {
          this.setState({
            name: this.state.currentClient.name,
            skill: this.state.skill,
            email: this.state.email,
            skillClarification: this.state.skillClarification,
            approved: false,
            message: response.data.message,
            successful: true
          });
          console.log(this.state.message + "kur");
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
    else {
      alert("   You haven't filled the required fields!\nPlease go back and fill them to continue.");
    }

  }





  render() {
    const { currentClient } = this.state;
    console.log(currentClient);
    return (
      
      <Form>
          {!this.state.successful && (
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="name"
                placeholder={currentClient.name}
                value={currentClient.name}
                onChange={this.state.name = currentClient.name}
                readOnly
              />
            </InputGroup>

            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={currentClient.email}
              onChange={this.state.email = currentClient.email}
              readOnly
            />
            <Form.Label>Estimate your mountain biking skill level from the selection below</Form.Label>
            <Form.Control
              as="select"
              onChange={this.onChangeSkill}>
              <option value="" disabled selected>Choose an option</option>
              <option value="Rookie">Rookie</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </Form.Control>
            <Form.Label>Provide clarification of your skill level choice</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.skillClarification}
              onChange={this.onChangeSkillClarification}
              placeholder="Clarify your skill level, if possible include examples..."
            />
            <br />
            <Button variant="dark" onClick={this.handleSubmission}>
              Confirm and Send
            </Button>
          </Form.Group>


        )}

        {this.state.message === undefined && (
          <div className="form-group">
            <div class="alert alert-success" role="alert">
              We have received your application!
              A manager is going to review it shortly and you'll be notified about the decision.
              </div>
          </div>
        )}

      </Form>
    );
  }
}

export default PermissionForm;

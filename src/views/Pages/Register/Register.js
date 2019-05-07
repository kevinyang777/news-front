import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from "axios";
import config from "../../../config";
import { encrypt } from "../../../utils/crypto";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      error:"",
    };
  }

  handleFieldChange = (e, field) => {
    if (field === "email") {
      this.setState({
        email: e.target.value
      });
    } else if (field === "password") {
      this.setState({
        password: e.target.value
      });
    } else if (field === "username") {
      this.setState({
        username: e.target.value
      });
    }
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email !== "" && password !== "") {
      axios
        .post(`${config.EndpointRestAPI}/auth/getToken`, {
          email,
          password
        })
        .then(resp => {
          // console.log('resp', resp)
          if (resp.status === 200) {
            localStorage.setItem(
              "fake-detik-authorization",
              resp.data.data.access_token
            );
            localStorage.setItem(
              "fake-detik-retoken",
              resp.data.data.refresh_token
            );
            localStorage.setItem(
              "fake-detik-profile",
              encrypt(resp.data.data.user, config.SecretKey)
            );
            window.location.reload();
          } else {
            this.setState({
                error:resp.message
            })
            console.log(resp)
          }
        })
        .catch(error => {
          this.setState({
              error:error.message
          })
        });
    } else {
        this.setState({
            error:"email or password empty"
        })
    }
  };

  handleRegister = e => {
    e.preventDefault();
    const { email, password, username } = this.state;
    if (email !== "" && password !== "" && username !== "") {
      axios
        .post(`${config.EndpointRestAPI}/auth/register`, {
          email,
          password,
          username: username,
          role: "admin"
        })
        .then(resp => {
            this.setState({
                error:"registration success"
            })
        })
        .catch(error => {
            this.setState({
                error:error.message
            })
        });
    } else {
        this.setState({
            error:"email, username or password empty"
        })
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
      {!localStorage.getItem('fake-detik-authorization') ? (
              <Container>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <Form>
                        <h1>Register</h1>
                        <p className="text-muted">
                        Login : input email and password
                        </p>
                        <p className="text-muted">
                        Register : input email, username and password
                        </p>
                        <p className="text-muted">
                        Registered acc automatically become admin
                        </p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Username" autoComplete="username" onChange={e => this.handleFieldChange(e, "username")} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Email" autoComplete="email" onChange={e => this.handleFieldChange(e, "email")} />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Password" autoComplete="new-password" onChange={e => this.handleFieldChange(e, "password")}/>
                        </InputGroup>
                        <Button color="success" block onClick={e => this.handleRegister(e)}>Create Account</Button>
                        <Button color="success" block onClick={e => this.handleLogin(e)}>Login</Button>
                        {this.state.error}
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            ) : (
              <Button onClick={e=>{
                localStorage.removeItem("fake-detik-authorization")
                localStorage.removeItem("fake-detik-retoken")
                localStorage.removeItem("fake-detik-profile")
                window.location.reload()
            }}>logout</Button>
            )}
        
      </div>
    );
  }
}

export default Register;

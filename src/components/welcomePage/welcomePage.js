import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import helpers from "../../helpers";
import store from "../../helperData/store";
class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnUserName: "",
      loginPassword: "",
      newUserName: "",
      newUserPassword: "",
      repeatPassword: "",
      hasError: false,
      errorLocation: "",
      errorMessage: ""
    };
  }

  loginError(location) {
    if (location === this.state.errorLocation && this.state.hasError) {
      return <p id="error">{this.state.errorMessage}</p>;
    }
  }

  setError = () => {
    this.setState({ hasError: true });
  };

  registerForm() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();

          helpers
            .postNewUser(
              this.state.newUserName,
              this.state.newUserPassword,
              this.state.repeatPassword
            )
            .then(response => {
              if (response.error || !response.authToken) {
                this.setState({ errorLocation: "register" });
                this.setState({ hasError: true });
                this.setState({
                  errorMessage: response.error || "Sorry, an error occurred"
                });
              } else {
                sessionStorage.setItem("authToken", response.authToken);
                return this.props.login(response.username, "add");
              }
            });
        }}
      >
        <fieldset>
          <legend>Sign up</legend>
          <label htmlFor="username">Username(must be unique)</label>
          <input
            required
            className="signUpform"
            id="username"
            type="text"
            onChange={e => {
              this.setState({ newUserName: e.target.value });
            }}
          ></input>
          <br></br>
          <label className="signUpLabel" htmlFor="password">
            Password
          </label>
          <input
            required
            className="signhtmlForm"
            id="password"
            type="password"
            onChange={e => {
              this.setState({ newUserPassword: e.target.value });
            }}
          ></input>
          <br></br>
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            required
            className="signUpform"
            id="repeatPassword"
            type="password"
            onChange={e => {
              this.setState({ repeatPassword: e.target.value });
            }}
          ></input>
          <br></br>
          {this.loginError("register")}
          <button>Register</button>
        </fieldset>
      </form>
    );
  }
  loginForm() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          helpers
            .validateAndGetReturningUser(
              this.state.returnUserName,
              this.state.loginPassword
            )
            .then(loginResponse => {
              if (loginResponse.error) {
                this.setState({ hasError: true });
                this.setState({ errorMessage: loginResponse.error });
                this.setState({ errorLocation: "login" });
              } else {
                sessionStorage.setItem("authToken", loginResponse.authToken);

                this.props.login(this.state.returnUserName);
              }
            });
        }}
      >
        <fieldset>
          <legend>Sign in</legend>
          <label htmlFor="loginUsername">Username:</label>
          <input
            required
            type="text"
            id="loginUsername"
            onChange={e => {
              this.setState({
                returnUserName: e.target.value,
                hasError: false
              });
            }}
          ></input>
          <label htmlFor="loginPassword">Password</label>
          <input
            required
            type="password"
            id="loginPassword"
            onChange={e => {
              this.setState({
                loginPassword: e.target.value,
                hasError: false
              });
            }}
          ></input>
          {this.loginError("login")}
          <button type="submit">Login</button>
          <button
            onClick={e => {
              e.preventDefault();
              helpers
                .validateAndGetReturningUser("Demo", "password")
                .then(loginResponse => {
                  if (loginResponse.error || !loginResponse.authToken) {
                    this.setState({ hasError: true });
                    this.setState({
                      errorMessage:
                        loginResponse.error || "Sorry, an error occurred"
                    });
                    this.setState({ errorLocation: "login" });
                  } else {
                    sessionStorage.setItem(
                      "authToken",
                      loginResponse.authToken
                    );

                    this.props.login("Demo");
                  }
                });
            }}
          >
            Login as guest
          </button>
        </fieldset>
      </form>
    );
  }
  render() {
    return (
      <div>
        <h2>Welcome!</h2>
        <br></br>
        <p>
          Bookmark! is an app designed to help avid readers keep track of their
          books. using Bookmark! you can keep track of books you are currently
          reading, books you would like to read, or books you have already
          finished!
        </p>
        <br></br>
        <h2>New?</h2>
        {this.registerForm()}
        <br></br>
        <h2>Returning?</h2>
        <br></br>
        {this.loginForm()}
      </div>
    );
  }
}

export default withRouter(WelcomePage);

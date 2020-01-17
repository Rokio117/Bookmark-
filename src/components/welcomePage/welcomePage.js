import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import helpers from "../../helpers";
import store from "../../helperData/store";
import "./welcomePage.css";
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
          <div id="usernameLabelAndInput" className="inputCombo">
            <label htmlFor="username" className="signUpLabel">
              Username(must be unique)
            </label>
            <input
              required
              className="signUpForm"
              id="username"
              type="text"
              onChange={e => {
                this.setState({ newUserName: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
          <div id="passwordLabelAndInput" className="inputCombo">
            <label className="signUpLabel" htmlFor="password">
              Password
            </label>
            <input
              required
              className="signUpForm"
              id="password"
              type="password"
              onChange={e => {
                this.setState({ newUserPassword: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
          <div id="repeatPWLabelAndInput" className="inputCombo">
            <label htmlFor="repeatPassword" className="signUpLabel">
              Repeat Password:
            </label>
            <input
              required
              className="signUpForm"
              id="repeatPassword"
              type="password"
              onChange={e => {
                this.setState({ repeatPassword: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
          {this.loginError("register")}
          <div id="registerOptions">
            <button className="registerFormButton">Register</button>
            <div>Or</div>
            <button
              className="registerFormButton"
              id="loginAsGuestButton"
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
          </div>
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
          <div id="loginInputs">
            <div className="loginLabelandInput">
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
            </div>
            <div className="loginLabelandInput">
              <label htmlFor="loginPassword">Password:</label>
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
            </div>
          </div>
          <br></br>
          <button type="submit" id="loginButton">
            Login
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

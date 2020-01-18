import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import helpers from "../../helpers";
import store from "../../helperData/store";
import "./welcomePage.css";
import { loader } from "../loader";
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
      errorMessage: "",
      isLoading: false
    };
  }

  loginError(location) {
    if (location === this.state.errorLocation && this.state.hasError) {
      return (
        <>
          <br></br>
          <p id="error">{this.state.errorMessage}</p>
        </>
      );
    }
  }
  setLoading() {
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    } else this.setState({ isLoading: true });
  }

  setError = () => {
    this.setState({ hasError: true });
  };

  registerForm() {
    return (
      <form
        className="welcomeForm"
        onSubmit={e => {
          e.preventDefault();
          this.setLoading(); //loading set to true
          helpers
            .postNewUser(
              this.state.newUserName,
              this.state.newUserPassword,
              this.state.repeatPassword
            )
            .then(response => {
              if (response.error || !response.authToken) {
                this.setLoading(); //loading set to false
                this.setState({ errorLocation: "register" });
                this.setState({ hasError: true });
                this.setState({
                  errorMessage: response.error || "Sorry, an error occurred"
                });
              } else {
                this.setLoading(); //loading set to false
                sessionStorage.setItem("authToken", response.authToken);
                return this.props.login(response.username, "add");
              }
            });
        }}
      >
        <fieldset>
          <legend className="welcomeLegend">Sign up</legend>
          <div id="usernameLabelAndInput" className="inputCombo">
            <input
              required
              placeholder="User name"
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
            <input
              required
              placeholder="Password"
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
            <input
              required
              placeholder="Confirm Password"
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
            <div id="Or">Or</div>
            <button
              className="registerFormButton"
              id="loginAsGuestButton"
              onClick={e => {
                e.preventDefault();
                this.setLoading();
                helpers
                  .validateAndGetReturningUser("Demo", "password")
                  .then(loginResponse => {
                    if (loginResponse.error || !loginResponse.authToken) {
                      this.setLoading();
                      this.setState({ hasError: true });
                      this.setState({
                        errorMessage:
                          loginResponse.error || "Sorry, an error occurred"
                      });
                      this.setState({ errorLocation: "login" });
                    } else {
                      this.setLoading();
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
        className="welcomeForm"
        onSubmit={e => {
          e.preventDefault();
          this.setLoading();
          helpers
            .validateAndGetReturningUser(
              this.state.returnUserName,
              this.state.loginPassword
            )
            .then(loginResponse => {
              if (loginResponse.error) {
                this.setLoading();
                this.setState({ hasError: true });
                this.setState({ errorMessage: loginResponse.error });
                this.setState({ errorLocation: "login" });
              } else {
                this.setLoading();
                sessionStorage.setItem("authToken", loginResponse.authToken);

                this.props.login(this.state.returnUserName);
              }
            });
        }}
      >
        <fieldset>
          <legend className="welcomeLegend">Sign in</legend>
          <div id="loginInputs">
            <div className="loginLabelandInput">
              <input
                className="signUpForm"
                placeholder="Username"
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
              <input
                className="signUpForm"
                placeholder="Password"
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
              <br></br>
            </div>
            <div id="errorDiv">{this.loginError("login")}</div>
          </div>
          <br></br>
          <button type="submit" id="loginButton" className="registerFormButton">
            Login
          </button>
        </fieldset>
      </form>
    );
  }
  render() {
    return (
      <div>
        {loader.displayLoading(this.state.isLoading)}
        <h2 id="welcomeHeader">Welcome!</h2>

        <p id="welcomeParagraph">
          Bookmark! is an app designed to help avid readers keep track of their
          books. using Bookmark! you can keep track of books you are currently
          reading, books you would like to read, or books you have already
          finished!
        </p>

        <h2 className="formHeader">Returning?</h2>

        {this.loginForm()}

        <h2 className="formHeader">New?</h2>
        {this.registerForm()}
      </div>
    );
  }
}

export default withRouter(WelcomePage);

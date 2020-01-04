import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import helpers from "../../helpers";
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

  registerForm() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.setState({ errorLocation: "register" });
        }}
      >
        <fieldset>
          <legend>Sign up</legend>
          <label htmlFor="username">Username(must be unique)</label>
          <input
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
            className="signUpform"
            id="repeatPassword"
            type="password"
            onChange={e => {
              this.setState({ repeatPassword: e.target.value });
            }}
          ></input>
          <br></br>
          {this.loginError("register")}
          <button>Submit</button>
        </fieldset>
      </form>
    );
  }
  loginForm() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          const response = helpers.validateAndGetReturningUser(
            this.state.returnUserName,
            this.state.loginPassword
          );

          if (response.message) {
            this.setState({ hasError: true });
            this.setState({ errorMessage: response.message });
            this.setState({ errorLocation: "login" });
          } else this.props.login(response);
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
          <button type="submit">Submit</button>
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

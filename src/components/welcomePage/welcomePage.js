import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  registerForm() {
    return (
      <fieldset>
        <legend>Sign up</legend>
        <label htmlFor="username">Username(must be unique)</label>
        <input class="signUpform" id="username" type="text"></input>
        <br></br>
        <label class="signUpLabel" for="password">
          Password
        </label>
        <input class="signUpform" id="password" type="password"></input>
        <br></br>
        <label htmlFor="repeatPassword">Repeat Password:</label>
        <input class="signUpform" id="repeatPassword" type="password"></input>
        <br></br>
        <button>Submit</button>
      </fieldset>
    );
  }
  loginForm() {
    return (
      <form>
        <fieldset>
          <legend>Sign in</legend>
          <label for="loginUsername">Username:</label>
          <input type="text" id="loginUsername"></input>
          <label for="loginPassword">Password</label>
          <input type="password" id="loginPassword"></input>
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

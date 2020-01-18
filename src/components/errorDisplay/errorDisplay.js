import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";

import "./errorDisplay.css";
class ErrorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    return (
      <bookMarkContext.Consumer>
        {value => {
          let hasError = this.props.error;
          if (this.state.hasError || hasError) {
            return (
              <div>
                <h2 id="errorMessage">
                  Oops! Somethings went wrong. If this problem persists try
                  loggin out and back in.
                </h2>
                <button
                  id="gotErrorButton"
                  onClick={e => {
                    e.preventDefault();
                    hasError = false;
                    this.setState({ hasError: false });
                    this.props.history.push("/");
                    value.logout();
                    window.location.reload(true);
                    // const sessionInfo = JSON.parse(
                    //   sessionStorage.getItem("state")
                    // );
                    // if (sessionInfo) {
                    //   if (Object.keys(sessionInfo.user).length) {
                    //     value.refresh(
                    //       sessionInfo.user.username,
                    //       sessionInfo.tab
                    //     );
                    //   } else this.props.history.push("/");
                    //} else
                  }}
                >
                  Got it
                </button>
              </div>
            );
          } else return this.props.children;
        }}
      </bookMarkContext.Consumer>
    );
  }
}

export default withRouter(ErrorDisplay);

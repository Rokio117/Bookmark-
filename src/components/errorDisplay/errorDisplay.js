import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";

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
          if (this.state.hasError) {
            return (
              <div>
                <h2>
                  Oops! Somethings went wrong. If this problem persists try
                  loggin out and back in.
                </h2>
                <button
                  onClick={e => {
                    this.setState({ hasError: false });

                    const sessionInfo = JSON.parse(
                      sessionStorage.getItem("state")
                    );
                    console.log(sessionInfo, "sessioninfo");
                    if (sessionInfo) {
                      if (Object.keys(sessionInfo.user).length) {
                        console.log(sessionInfo.user.username, sessionInfo.tab);
                        value.refresh(
                          sessionInfo.user.username,
                          sessionInfo.tab
                        );
                      } else this.props.history.push("/");
                    } else this.props.history.push("/");
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

import React, { Component } from "react";
import bookMarkContext from "./context";
import "./App.css";
import Tab from "./components/tab/tab";
import MainPage from "./components/mainPage/mainPage";
import WelcomePage from "./components/welcomePage/welcomePage";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import ErrorDisplay from "./components/errorDisplay/errorDisplay";
import { loader } from "./components/loader";
import helpers from "./helpers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      hasError: false,
      isLoading: false,
      user: {},
      books: [],
      tab: "welcome",
      userProfile: {}
    };
  }

  setError = () => {
    this.setState({ hasError: true });
  };
  removeError = () => {
    this.setState({ hasError: false });
  };
  setLoading = () => {
    this.state.isLoading
      ? this.setState({ isLoading: false })
      : this.setState({ isLoading: true });
  };
  componentDidMount() {
    const sessionInfo = JSON.parse(sessionStorage.getItem("state"));

    if (!this.state.loggedIn && sessionInfo) {
      this.setState(sessionInfo);
    } else this.props.history.push("/");
  }
  changeTab = tab => {
    this.setState({ tab: tab });
  };
  login = (username, tab) => {
    this.setLoading();

    const jwt = sessionStorage.getItem("authToken");
    helpers
      .getUserInfo(username, jwt)
      .then(userProfile => {
        console.log(userProfile, "userProfile after login");
        const user = {
          username: userProfile.username,
          id: userProfile.id
        };
        const books =
          userProfile.books || sessionStorage.getItem("state").books;

        const appState = {
          user: user,
          books: books,
          tab: tab || "current",
          userProfile: userProfile,
          loggedIn: true,
          hasError: false,
          isLoading: false
        };
        return appState;
      })
      .then(appState => {
        this.props.history.push("/home");

        sessionStorage.setItem("state", JSON.stringify(appState));
        return this.setState(appState);
      });
  };

  logout = () => {
    this.props.history.push("/");
  };

  errorDisplay() {
    if (this.state.hasError) {
      return <ErrorDisplay error={true} />;
    } else
      return (
        <Switch>
          <Route
            exact
            path="/"
            component={props => {
              return <WelcomePage login={this.login} />;
            }}
          ></Route>
          <Route
            exact
            path="/home"
            component={props => {
              return (
                <>
                  <Tab changeTab={this.changeTab} tab={this.state.tab} />
                  <MainPage state={this.state} />
                </>
              );
            }}
          ></Route>
        </Switch>
      );
  }
  render() {
    return (
      <bookMarkContext.Provider
        value={{
          user: this.state.user,
          books: this.state.books,
          tab: this.state.tab,
          refresh: this.login,
          userProfile: this.state.userProfile,
          setError: this.setError,
          setLoading: this.setLoading,
          logout: this.logout,
          removeError: this.removeError
        }}
      >
        <ErrorDisplay>
          {loader.displayLoading(this.state.isLoading)}
          {this.errorDisplay()}
        </ErrorDisplay>
      </bookMarkContext.Provider>
    );
  }
}

export default withRouter(App);

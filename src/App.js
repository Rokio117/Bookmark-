import React, { Component } from "react";
import bookMarkContext from "./context";
import AddBook from "./components/addBook/AddBook";
import "./App.css";
import config from "./config";
import Tab from "./components/tab/tab";
import MainPage from "./components/mainPage/mainPage";
import WelcomePage from "./components/welcomePage/welcomePage";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import ErrorDisplay from "./components/errorDisplay/errorDisplay";
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
  componentDidMount() {
    const sessionInfo = JSON.parse(sessionStorage.getItem("state"));

    if (!this.state.loggedIn && sessionInfo) {
      console.log(sessionInfo, "sessionInfo on did mount");
      this.setState(sessionInfo);
    } else this.props.history.push("/");
  }
  changeTab = tab => {
    this.setState({ tab: tab });
  };
  login = (username, tab) => {
    //does props need to call the function itself?
    console.log("loggedIn");
    const jwt = sessionStorage.getItem("authToken");
    helpers
      .getUserInfo(username, jwt)
      .then(userProfile => {
        console.log(userProfile, "userprofile after getUserinfo in login");
        const user = {
          username: userProfile.username,
          id: userProfile.id
          //password: userProfile.password
        };
        const books = userProfile.books;

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
        //  this.setState({
        //   user: user,
        //   books: books,
        //   tab: tab || "current",
        //   userProfile: userProfile,
        //   loggedIn: true,
        //   hasError: false,
        //   isLoading: false
        // });
      })
      .then(appState => {
        this.props.history.push("/home");

        sessionStorage.setItem("state", JSON.stringify(appState));
        return this.setState(appState);
      });
  };

  refresh = (username, tab) => {
    console.log("refresh ran");
    const userProfile = helpers.getUserInfo(username);
    const user = {
      username: userProfile.username,
      password: userProfile.password
    };
    const books = userProfile.books;

    const appState = {
      user: user,
      books: books,
      tab: tab || "current",
      userProfile: userProfile,
      loggedIn: true,
      hasError: false,
      isLoading: false
    };
    sessionStorage.setItem("state", JSON.stringify(appState));
    this.setState({
      user: user,
      books: books,
      tab: tab || "current",
      userProfile: userProfile,
      loggedIn: true,
      hasError: false,
      isLoading: false
    });
  };
  render() {
    return (
      <bookMarkContext.Provider
        value={{
          user: this.state.user,
          books: this.state.books,
          tab: this.state.tab,
          refresh: this.login,
          userProfile: this.state.userProfile
        }}
      >
        <ErrorDisplay>
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
        </ErrorDisplay>
      </bookMarkContext.Provider>
    );
  }
}

export default withRouter(App);

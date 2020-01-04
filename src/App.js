import React, { Component } from "react";
import bookMarkContext from "./context";
import AddBook from "./components/addBook/addBook";
import "./App.css";
import config from "./config";
import Tab from "./components/tab/tab";
import MainPage from "./components/mainPage/mainPage";
import WelcomePage from "./components/welcomePage/welcomePage";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: false,
      user: {},
      books: [],
      tab: "welcome"
    };
  }

  setError = () => {
    this.setState({ hasError: true });
  };
  componentDidMount() {}
  changeTab = tab => {
    this.setState({ tab: tab });
  };
  login = userProfile => {
    console.log("login Ran");
    //all information about user
    //sent after login auth
    //auth and validation handled by login screen fetch requests
    //historyu.push will also be handled in login screen
    const user = {
      username: userProfile.username,
      password: userProfile.password
    };
    const books = userProfile.books;
    const appState = { ...user, books };
    sessionStorage.setItem("state", JSON.stringify(appState));
    this.setState({ user: user, books: books, tab: "current" });
    this.props.history.push("/home");
  };
  render() {
    return (
      <bookMarkContext.Provider
        value={{
          user: this.state.user,
          books: this.state.books,
          tab: this.state.tab
        }}
      >
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
                  <MainPage />
                </>
              );
            }}
          ></Route>
        </Switch>
      </bookMarkContext.Provider>
    );
  }
}

export default withRouter(App);

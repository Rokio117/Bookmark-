import React, { Component } from "react";
import bookMarkContext from "./context";
import "./App.css";
import config from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isLoading: false,
      user: {},
      books: [],
      page: "welcome"
    };
  }

  setError() {
    this.setState({ hasError: true });
  }
  componentDidMount() {
    console.log(config.API_KEY, "config.API_KEY");
  }
  render() {
    return (
      <bookMarkContext.Provider
        value={{
          user: this.state.user,
          books: this.state.books,
          page: this.state.page
        }}
      ></bookMarkContext.Provider>
    );
  }
}

export default App;

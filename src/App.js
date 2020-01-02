import React, { Component } from "react";
import bookMarkContext from "./context";
import "./App.css";

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

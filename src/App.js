import React, { Component } from "react";
import bookMarkContext from "./context";
import AddBook from "./components/addBook/addBook";
import "./App.css";
import config from "./config";
import Tab from "./components/tab/tab";
import MainPage from "./components/mainPage/mainPage";

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
  changePage(page) {
    this.setState({ page: page });
  }
  render() {
    return (
      <bookMarkContext.Provider
        value={{
          user: this.state.user,
          books: this.state.books,
          page: this.state.page
        }}
      >
        <Tab changePage={this.changePage.bind(this)} />
        <MainPage />
      </bookMarkContext.Provider>
    );
  }
}

export default App;

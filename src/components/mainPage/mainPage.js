import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";
import List from "../list/list";
import AddBook from "../addBook/addBook";
import Accordion from "../accordion/accordion";
import bookInfo from "../bookInfo/bookInfo";
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  bookDisplay(value) {
    if (value === "add") {
      return <AddBook />;
    }
  }
  render() {
    return (
      <bookMarkContext.Consumer>
        {value => {
          return (
            <>
              <h2>{value.page}</h2>
              {this.bookDisplay(value.page)}
            </>
          );
        }}
      </bookMarkContext.Consumer>
    );
  }
}

export default withRouter(MainPage);

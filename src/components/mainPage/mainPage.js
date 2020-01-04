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
  addBookDisplay(value) {
    console.log(value, "value in addBookDisplay");
    if (value.tab === "add") {
      return <AddBook />;
    } else return <List books={this.bookSorter(value.books, value)} />;
  }
  bookSorter(userBooks, value) {
    let currentBooks = [];
    let finishedBooks = [];
    let upcomingBooks = [];
    userBooks.forEach(book => {
      if (book.onTab === "current") {
        currentBooks.push(book);
      }
      if (book.onTab === "finished") {
        finishedBooks.push(book);
      }
      if (book.onTab === "upcoming") {
        upcomingBooks.push(book);
      }
    });
    const sortedBooks = {
      current: currentBooks,
      finished: finishedBooks,
      upcoming: upcomingBooks
    };

    if (value.tab === "current") {
      return sortedBooks.current;
    } else if (value.tab === "finished") {
      return sortedBooks.finished;
    } else return sortedBooks.upcoming;
  }
  render() {
    return (
      <bookMarkContext.Consumer>
        {value => {
          return (
            <>
              <h2>{value.tab}</h2>
              {this.addBookDisplay(value)}
            </>
          );
        }}
      </bookMarkContext.Consumer>
    );
  }
}

export default withRouter(MainPage);

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
    if (value === "add") {
      return <AddBook />;
    }
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
      } else upcomingBooks.push(book);
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
              <h2>{value.page}</h2>
              {this.addBookDisplay(value.page)}
              <List books={this.bookSorter(value.books, value)} />
            </>
          );
        }}
      </bookMarkContext.Consumer>
    );
  }
}

export default withRouter(MainPage);

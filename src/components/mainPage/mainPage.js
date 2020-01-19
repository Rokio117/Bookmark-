import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";
import List from "../list/list";
import AddBook from "../addBook/AddBook";

import defaultProps from "../defaultProps";
import "./mainPage.css";
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: this.props.tab };
  }
  AddBookDisplay(props) {
    if (props.tab === "add") {
      return <AddBook />;
    } else return <List books={this.bookSorter(props.books, props)} />;
  }
  bookSorter(userBooks, value) {
    //sorts books by their tab and returns list of books for current tab
    let currentBooks = [];
    let finishedBooks = [];
    let upcomingBooks = [];
    userBooks.forEach(book => {
      if (book.ontab === "current") {
        currentBooks.push(book);
      }
      if (book.ontab === "finished") {
        finishedBooks.push(book);
      }
      if (book.ontab === "upcoming") {
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
          const newProps = {
            user: this.props.state.user,
            books: this.props.state.books,
            tab: this.props.state.tab,
            refresh: value.refresh,
            userProfile: this.props.state.userProfile
          };

          return (
            <div className="mainPage">
              <h2 className="tabTitle">{this.props.tab}</h2>
              {this.AddBookDisplay(newProps, this.props.state)}
            </div>
          );
        }}
      </bookMarkContext.Consumer>
    );
  }
}

MainPage.defaultProps = defaultProps.mainPage();

export default withRouter(MainPage);

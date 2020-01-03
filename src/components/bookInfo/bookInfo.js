import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import Accordion from "../accordion/accordion";
import List from "../list/list";
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  bookInfoDisplay(books, tab) {
    if (!tab === "upcoming") {
      return <List books={books} />;
    }
  }

  formatAuthors(authors) {
    //authors is either an array or null, depending on if the book had a listed author
    let result = [];
    let formattedAuthors = [];
    if (authors) {
      if (authors.length > 1) {
        authors.forEach(author => {
          formattedAuthors.unshift(author);
        });
        result = <p>{`Authors: ${formattedAuthors}`}</p>;
      } else {
        result = <p>{`Author: ${authors[0]}`}</p>;
        return result;
      }
    } else
      return <p>{`Author: Sorry, we could not find an author for this`}</p>;
  }

  formatData(dataObject) {
    //takes currentPage, startedOn, finishedOn and changes 'null' to ~
    const value = Object.values(dataObject)[0];
    const key = Object.keys(dataObject)[0];
    if (value === null) {
      return <p>{`${key}: ~`}</p>;
    } else {
      return <p>{`${key}: ${value}`}</p>;
    }
  }

  render() {
    return (
      //props will be individual sorted book object
      <bookmarkContext.Consumer>
        {value => {
          const book = this.props.book;
          return (
            <div>
              <p>{`Title: ${book.title}`}</p>
              <p>{`: ${book.title}`}</p>
              {this.formatAuthors(book.authors)}
              {this.formatData(book.currentPage)}
              {this.formatData(book.startedOn)}
              {this.formatData(book.finishedOn)}
              {this.bookInfoDisplay(book, value.tab)}
            </div>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}

export default withRouter(BookInfo);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import Accordion from "../accordion/accordion";
import List from "../list/list";
import PropTypes from "prop-types";
import defaultProps from "../defaultProps";
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  bookNotesDisplay(book, tab) {
    if (!tab === "upcoming") {
      return <List notes={book.notes} />;
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
          const fullBookInfo = (
            <div>
              <p>{`Title: ${book.title}`}</p>
              <br></br>
              <img
                src={book.coverArt}
                alt={`Cover art for ${book.title}`}
              ></img>
              {this.formatAuthors(book.authors)}
              <br></br>
              {this.formatData(book.currentPage)}
              <br></br>
              {this.formatData(book.startedOn)}
              <br></br>
              {this.formatData(book.finishedOn)}
              <br></br>
              {this.bookNotesDisplay(book, value.tab)}
            </div>
          );
          const upcomingInfo = (
            <div>
              <p>{`Title: ${book.title}`}</p>
              <img
                src={book.coverArt}
                alt={`Cover art for ${book.title}`}
              ></img>
              <br></br>
              {this.formatAuthors(book.authors)}
              <br></br>
              <p>{`Description: ${book.description}`}</p>
            </div>
          );

          function displayInfo(tab) {
            if (tab === "upcoming") {
              return upcomingInfo;
            } else return fullBookInfo;
          }
          return <div>{displayInfo(value.tab)}</div>;
        }}
      </bookmarkContext.Consumer>
    );
  }
}

BookInfo.defaultProps = defaultProps.bookInfoProps();

export default withRouter(BookInfo);

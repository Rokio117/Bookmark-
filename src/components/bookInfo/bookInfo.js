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
    if (tab !== "upcoming") {
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

  formatData(key, value) {
    //takes currentPage, startedOn, finishedOn and changes 'null' to ~

    if (value === null) {
      return <p>{`${key}: ~`}</p>;
    } else {
      return <p>{`${key}: ${value}`}</p>;
    }
  }
  fullBookInfo(book, tab) {
    //needs this.props.book
    //and value.tab
    return (
      <div>
        <p>{`Title: ${book.title}`}</p>
        <br></br>
        <img src={book.coverArt} alt={`Cover art for ${book.title}`}></img>
        {this.formatAuthors(book.authors)}
        <br></br>
        {this.formatData("Current page", book.currentPage)}
        <br></br>
        {this.formatData("Started on", book.startedOn)}
        <br></br>
        {this.formatData("Finished on", book.finishedOn)}
        <br></br>
        {this.bookNotesDisplay(book, tab)}
      </div>
    );
  }
  upcomingInfo(book) {
    //requires this.props.book
    return (
      <div>
        <p>{`Title: ${book.title}`}</p>
        <img src={book.coverArt} alt={`Cover art for ${book.title}`}></img>
        <br></br>
        {this.formatAuthors(book.authors)}
        <br></br>
        <p>{`Description: ${book.description}`}</p>
      </div>
    );
  }
  noteInfo(note) {
    return (
      <>
        <p>{note.noteTitle}</p>
        <p>{`Date: ${note.noteDate}`}</p>
        <br></br>
        <p>{note.noteContent}</p>
      </>
    );
  }

  displayInfo(tab, props) {
    //requires value.tab
    //requires this.props
    if (tab === "upcoming") {
      return this.upcomingInfo(props.book);
    }
    if (this.props.note) {
      return this.noteInfo(this.props.note);
    } else return this.fullBookInfo(props.book, tab);
  }

  render() {
    return (
      //props will be individual sorted book object
      <bookmarkContext.Consumer>
        {value => {
          return <div>{this.displayInfo(value.tab, this.props)}</div>;
        }}
      </bookmarkContext.Consumer>
    );
  }
}

BookInfo.defaultProps = defaultProps.bookInfoProps();

export default withRouter(BookInfo);

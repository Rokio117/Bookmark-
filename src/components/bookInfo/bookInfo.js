import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import Accordion from "../accordion/accordion";
import List from "../list/list";
import PropTypes from "prop-types";
import defaultProps from "../defaultProps";
import helpers from "../../helpers";
import store from "../../helperData/store";
import "./bookInfo.css";
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      newCurrentPage: undefined,
      newStartDate: undefined,
      newEndDate: undefined,
      addNoteMode: false,
      newNoteTitle: "",
      newNoteDate: null,
      newNoteContent: ""
    };
  }

  bookNotesDisplay(book, tab) {
    console.log(book.notes, "book.notes in bookNotesDisplay");
    if (tab !== "upcoming") {
      return <List notes={book.notes} />;
    }
  }

  formatAuthors(authors) {
    console.log(authors, "authors in formatAuthors");
    //authors is either an array or null, depending on if the book had a listed author
    let result = [];
    let formattedAuthors = [];
    if (authors) {
      if (authors.length > 1) {
        authors.forEach(author => {
          formattedAuthors.unshift(author);
        });

        return (result = <p>{`Authors: ${formattedAuthors}`}</p>);
      } else {
        result = <p>{`Author: ${authors[0]}`}</p>;
        return result;
      }
    } else
      return <p>{`Author: Sorry, we could not find an author for this`}</p>;
  }

  formatData(key, value) {
    //takes currentpage, startedon, finishedon and changes 'null' to ~
    console.log(key, value, "kay and value in format data");
    if (value === null) {
      return <p>{`${key}: ~`}</p>;
    } else {
      return <p>{`${key}: ${value}`}</p>;
    }
  }
  editBookInfo(book, value) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          const newBookInfo = [
            { currentpage: this.state.newCurrentPage || book.currentpage },
            { startedon: this.state.newStartDate || book.startedon },
            { finishedon: this.state.newEndDate || book.finishedon }
          ];
          if (
            helpers.patchBookInfo(book.id, newBookInfo, value.user.username) ===
            "ok"
          ) {
            value.refresh(value.user.username, value.tab);
          }
        }}
      >
        <label htmlFor="currentpageInput">Current page:</label>
        <input
          type="number"
          onChange={e => this.setState({ newCurrentPage: e.target.value })}
          className="currentpageInput"
          defaultValue={book.currentpage}
        ></input>
        <br></br>
        <label htmlFor="startedonInput">Started on:</label>
        <input
          onChange={e => this.setState({ newStartDate: e.target.value })}
          type="date"
          className="startedonInput"
          defaultValue={book.startedon}
        ></input>
        <br></br>
        <label htmlFor="finishedonInput">Finished on:</label>
        <input
          onChange={e => this.setState({ newEndDate: e.target.value })}
          type="date"
          className="finishedonInput"
          defaultValue={book.finishedon}
        ></input>
        <br></br>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={e => {
            if (helpers.deleteBook(value.user.username, book.id) === "ok") {
              value.refresh(value.user.username, value.tab);
            }
          }}
        >
          Delete
        </button>
      </form>
    );
  }
  editAndCancelButtons() {
    if (!this.state.editMode) {
      return (
        <button
          onClick={e => {
            this.setState({ editMode: true });
          }}
        >
          Edit
        </button>
      );
    } else
      return (
        <>
          <button onClick={e => this.setState({ editMode: false })}>
            Cancel
          </button>
        </>
      );
  }
  bookDisplayInfo(book) {
    return (
      <>
        {this.formatData("Current page", book.currentpage)}
        <br></br>
        {this.formatData("Started on", book.startedon)}
        <br></br>
        {this.formatData("Finished on", book.finishedon)}
      </>
    );
  }
  displayMode(book, value) {
    if (this.state.editMode) {
      return this.editBookInfo(book, value);
    } else return this.bookDisplayInfo(book);
  }
  addNoteForm(value, book) {
    if (this.state.addNoteMode) {
      return (
        <form
          id="addNoteForm"
          onSubmit={e => {
            e.preventDefault();
            const newNoteObject = {
              notetitle: this.state.newNoteTitle,
              notedate: this.state.newNoteDate,
              notecontent: this.state.newNoteContent
            };
            console.log(newNoteObject, "note object before being submitted");

            const res = helpers.postNewNote(
              value.user.username,
              book.id,
              newNoteObject
            );
            if (res === "ok") {
              value.refresh(value.user.username, value.tab);
            }
          }}
        >
          <h3>Add note</h3>
          <label htmlFor="dateSelector">Date: </label>

          <input
            type="date"
            className="dateSelector"
            onChange={e => {
              this.setState({ newNoteDate: e.target.value });
            }}
          ></input>
          <br></br>
          <label htmlFor="notetitleSelector">Title:</label>
          <input
            required
            type="text"
            className="notetitleSelector"
            onChange={e => {
              this.setState({ newNoteTitle: e.target.value });
            }}
          ></input>
          <br></br>
          <label for="notecontentSelector">Content:</label>
          <textarea
            required
            className="notecontentSelector"
            rows="8"
            cols="35"
            onChange={e => {
              this.setState({ newNoteContent: e.target.value });
            }}
          ></textarea>
          <br></br>
          <button id="addNoteSubmitButton" type="submit">
            submit
          </button>
        </form>
      );
    }
  }

  addNoteButtonChoice() {
    if (!this.state.addNoteMode) {
      return (
        <button
          className="addNoteButton"
          id="addNoteButton"
          onClick={e => {
            this.setState({ addNoteMode: true });
          }}
        >
          Add note
        </button>
      );
    } else
      return (
        <button
          className="addNoteButton"
          id="cancelAddNoteButton"
          onClick={e => {
            this.setState({ addNoteMode: false });
          }}
        >
          Cancel
        </button>
      );
  }

  fullBookInfo(book, tab, value) {
    //needs this.props.book
    //and value.tab
    return (
      <div>
        <p>{`Title: ${book.title}`}</p>
        {this.editAndCancelButtons()}
        <br></br>
        <img src={book.coverart} alt={`Cover art for ${book.title}`}></img>
        {this.formatAuthors(book.authors)}
        <br></br>
        {this.displayMode(book, value)}
        <br></br>
        <h2>Notes:</h2>
        {this.bookNotesDisplay(book, tab)}

        {this.addNoteForm(value, book)}
        {this.addNoteButtonChoice()}
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
    console.log(note.notedate, "note.notedate in noteinfo");
    return (
      <>
        <p>{note.notetitle}</p>
        {this.formatData("Date", note.notedate)}
        <br></br>
        <p>{note.notecontent}</p>
      </>
    );
  }

  displayInfo(props, value) {
    const tab = value.tab;
    //requires value.tab
    //requires this.props
    if (tab === "upcoming") {
      return this.upcomingInfo(props.book);
    }
    if (this.props.note) {
      return this.noteInfo(this.props.note);
    } else return this.fullBookInfo(props.book, tab, value);
  }

  render() {
    return (
      //props will be individual sorted book object
      <bookmarkContext.Consumer>
        {value => {
          return <div>{this.displayInfo(this.props, value)}</div>;
        }}
      </bookmarkContext.Consumer>
    );
  }
}

BookInfo.defaultProps = defaultProps.bookInfoProps();

export default withRouter(BookInfo);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";

import List from "../list/list";

import defaultProps from "../defaultProps";
import helpers from "../../helpers";

import "./bookInfo.css";
class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      newCurrentPage: null,
      newStartDate: null,
      newEndDate: null,
      addNoteMode: false,
      newNoteTitle: "",
      newNoteDate: null,
      newNoteContent: "",
      hasError: false,
      errorMessage: ""
    };
  }
  //this class displays info for both books and notes, depending on the props

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

        return (result = <p>{` ${formattedAuthors}`}</p>);
      } else {
        result = <p>{` ${authors[0]}`}</p>;
        return result;
      }
    } else return <p>{` Sorry, we could not find an author for this`}</p>;
  }

  formatData(key, value) {
    if (value === null) {
      return <p>{`${key}: ~`}</p>;
    } else {
      return <p>{`${key}: ${value}`}</p>;
    }
  }
  displayError() {
    if (this.state.hasError) {
      return <p className="error">{this.state.errorMessage}</p>;
    }
  }
  editBookInfo(book, value) {
    return (
      <form
        id="patchBookForm"
        onSubmit={e => {
          e.preventDefault();
          if (this.state.newCurrentPage && this.state.newCurrentPage < 0) {
            return this.setState({
              hasError: true,
              errorMessage: "page number must be positive"
            });
          }
          value.setLoading();
          const newBookInfo = {
            currentpage: this.state.newCurrentPage || book.currentpage,
            startedon: this.state.newStartDate || book.startedon,
            finishedon: this.state.newEndDate || book.finishedon
          };
          helpers
            .patchBookInfo(book.id, newBookInfo, value.user.username)
            .then(response => {
              if (response.error) {
                value.setLoading();
                value.setError();
              } else value.refresh(value.user.username, value.tab);
            });
        }}
      >
        <div className="labelAndInput">
          <label htmlFor="currentpageInput" className="inputLabel">
            Current page:
          </label>
          <input
            type="number"
            onChange={e => this.setState({ newCurrentPage: e.target.value })}
            className="currentpageInput"
            defaultValue={book.currentpage}
          ></input>
        </div>
        <br></br>
        <div className="labelAndInput">
          <label htmlFor="startedonInput" className="inputLabel">
            Started on:
          </label>
          <input
            onChange={e => this.setState({ newStartDate: e.target.value })}
            type="date"
            className="startedonInput"
            defaultValue={book.startedon}
          ></input>
        </div>
        <br></br>
        <div className="labelAndInput">
          <label htmlFor="finishedonInput" className="inputLabel">
            Finished on:
          </label>
          <input
            onChange={e => this.setState({ newEndDate: e.target.value })}
            type="date"
            className="finishedonInput"
            defaultValue={book.finishedon}
          ></input>
        </div>
        <br></br>
        <div id="saveAndDeleteButtons">
          <button type="submit" id="saveButton">
            Save
          </button>
          <button
            id="deleteButton"
            type="button"
            onClick={e => {
              value.setLoading();
              helpers
                .deleteBook(value.user.username, book.id)
                .then(response => {
                  if (response.error) {
                    value.setLoading();
                    value.setError();
                  } else value.refresh(value.user.username, value.tab);
                });
            }}
          >
            Delete
          </button>
        </div>
        {this.displayError()}
      </form>
    );
  }
  editAndCancelButtons() {
    if (!this.state.editMode) {
      return (
        <button
          id="editButton"
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
          <button
            id="cancelEditButton"
            onClick={e => this.setState({ editMode: false })}
          >
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
            value.setLoading();
            const newNoteObject = {
              notetitle: this.state.newNoteTitle,
              notedate: this.state.newNoteDate,
              notecontent: this.state.newNoteContent
            };
            helpers
              .postNewNote(value.user.username, book.id, newNoteObject)
              .then(response => {
                if (response.error) {
                  value.setLoading();
                  value.setError();
                } else value.refresh(value.user.username, value.tab);
              });
          }}
        >
          <h3>Add note</h3>
          <div id="titleSelector">
            <label htmlFor="notetitleSelector">Title: </label>
            <input
              required
              type="text"
              className="notetitleSelector noteInput"
              onChange={e => {
                this.setState({ newNoteTitle: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
          <div id="dateSelector">
            <label htmlFor="dateSelector">Date: </label>

            <input
              type="date"
              className="dateSelector noteInput"
              onChange={e => {
                this.setState({ newNoteDate: e.target.value });
              }}
            ></input>
          </div>
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
            Submit
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
    //displays on 'current' and 'finished' tabs
    return (
      <div id="fullBookContainer">
        <h2 id="bookInfoHeader">Info</h2>
        <br></br>
        <div id="bookInfoContainer">
          <div id="bookTextContainer">{this.displayMode(book, value)}</div>
          <br></br>
          <img
            className="fullBookImage"
            src={book.coverart}
            alt={`Cover art for ${book.title}`}
          ></img>
        </div>
        {this.editAndCancelButtons()}
        <br></br>
        <h2 id="noteInfoHeader">Notes:</h2>
        {this.bookNotesDisplay(book, tab)}

        {this.addNoteForm(value, book)}
        {this.addNoteButtonChoice()}
      </div>
    );
  }
  upcomingInfo(book) {
    //displays on 'upcoming' tab
    return (
      <div id="upcomingExtendedInfo">
        <div id="descriptionContainer">
          <p id="descriptionParagraph">{` ${book.description}`}</p>
        </div>
        <img
          id="upcomingPicture"
          src={book.coverart}
          alt={`Cover art for ${book.title}`}
        ></img>
      </div>
    );
  }
  noteInfo(note) {
    return (
      <>
        <p id="noteContent">{note.notecontent}</p>
      </>
    );
  }

  displayInfo(props, value) {
    const tab = value.tab;
    if (tab === "upcoming") {
      return this.upcomingInfo(props.book);
    }
    if (this.props.note) {
      return this.noteInfo(this.props.note);
    } else return this.fullBookInfo(props.book, tab, value);
  }

  render() {
    return (
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

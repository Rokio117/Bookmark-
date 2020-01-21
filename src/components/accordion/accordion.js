import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";
import BookInfo from "../bookInfo/bookInfo";
import defaultProps from "../defaultProps";
import helpers from "../../helpers";
import "./accordion.css";
class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: true
    };
  }
  //this class is used for both book and note info

  buttonRender(prop, value) {
    //if Accordion is displaying a book it shows the 'move book' button
    //if it is displaying a note it shows the 'delete note' button

    let tabOptions = [];
    if (value.tab === "upcoming") {
      tabOptions = ["current", "finished"];
    } else tabOptions = ["current", "finished"];
    const moveOptions = tabOptions
      .filter(tab => tab !== value.tab)
      .map(filteredTab => {
        return (
          <option id="moveOption" value={filteredTab} className="moveOption">
            {filteredTab}
          </option>
        );
      });
    if (prop.note) {
      return (
        <button
          className="deleteNoteButton"
          onClick={e => {
            e.preventDefault();
            value.setLoading();
            helpers
              .deleteNote(value.user.username, prop.note.id)
              .then(response => {
                value.refresh(value.user.username, value.tab);
              });
          }}
        >
          Delete
        </button>
      );
    } else {
      return (
        <select
          className="moveBookButton"
          onChange={e => {
            e.preventDefault();

            const newTab = e.target.value;
            if (e.target.value) {
              value.setLoading();
              helpers
                .patchBookTab(prop.book.id, e.target.value)
                .then(response => {
                  if (response.error) {
                    value.setError();
                  } else return value.refresh(value.user.username, newTab);
                });
            }
          }}
        >
          <option
            id="selectDisplay"
            selected
            disabled
            value=""
            className="moveOption"
          >
            Move
          </option>
          {moveOptions}
        </select>
      );
    }
  }

  buttonDisplay = extended => {
    if (extended) {
      return "▲";
    } else return "▼";
  };

  renderContent(props) {
    //Switches display for book or note depending on props
    // (BookInfo displays both book info and note info)
    if (this.state.extended) {
      if (props.book) {
        return <BookInfo book={props.book} />;
      } else return <BookInfo note={props.note} />;
    }
  }

  accordionClass(props) {
    if (props.book) {
      return "bookAccordion";
    }
    if (props.note) {
      return "noteAccordion";
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

        return (result = (
          <p className="accordionAuthor">{` ${formattedAuthors}`}</p>
        ));
      } else {
        result = <p className="accordionAuthor">{` ${authors[0]}`}</p>;
        return result;
      }
    } else
      return (
        <p className="accordionAuthor">{` Sorry, we could not find an author for this`}</p>
      );
  }

  displaySubheader(props) {
    if (props.book) {
      return this.formatAuthors(props.book.authors);
    }
    if (props.note) {
      return <p>{props.note.notedate}</p>;
    }
  }

  imageDisplay(props) {
    if (props.book) {
      return (
        <img
          src={props.book.coverart}
          alt={`coverart for ${props.book.title}`}
          id="thumbnailPicture"
        ></img>
      );
    }
  }

  accordionTopSelector(props) {
    if (props.note) {
      return "accordionNoteTop";
    } else return "accordionTop";
  }

  extenderButtonClass(prop, location) {
    if (prop.book && location === "note") {
      return "hidden";
    } else if (prop.note && location === "book") {
      return "hidden";
    }
  }

  noteHeaderClass(props) {
    if (props.note) {
      return "noteHeaderDisplay";
    }
  }

  render() {
    return (
      <bookMarkContext.Consumer>
        {value => {
          const title = this.props.book
            ? this.props.book.title
            : this.props.note.notetitle;
          return (
            <div className={this.accordionClass(this.props)}>
              <div className={this.accordionTopSelector(this.props)}>
                <button
                  className={`extenderButton ${this.extenderButtonClass(
                    this.props,
                    "book"
                  )}`}
                  onClick={e => {
                    !this.state.extended
                      ? this.setState({ extended: true })
                      : this.setState({ extended: false });
                  }}
                >
                  <div>{this.buttonDisplay(this.state.extended)}</div>
                </button>
                <div
                  id="headerDisplay"
                  className={this.noteHeaderClass(this.props)}
                >
                  <button
                    className={`extenderButton ${this.extenderButtonClass(
                      this.props,
                      "note"
                    )}`}
                    onClick={e => {
                      !this.state.extended
                        ? this.setState({ extended: true })
                        : this.setState({ extended: false });
                    }}
                  >
                    <div>{this.buttonDisplay(this.state.extended)}</div>
                  </button>
                  {this.imageDisplay(this.props)}
                  <div id="headerTextDisplay">
                    <h3 className="bookTitle">{title}</h3>
                    {this.displaySubheader(this.props)}
                  </div>
                  {this.buttonRender(this.props, value)}
                </div>
              </div>
              {this.renderContent(this.props)}
            </div>
          );
        }}
      </bookMarkContext.Consumer>
    );
  }
}

Accordion.defaultProps = defaultProps.accordionProps();

export default withRouter(Accordion);

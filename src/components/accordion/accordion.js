import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";
import BookInfo from "../bookInfo/bookInfo";
import PropTypes from "prop-types";
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

  buttonRender(prop, value) {
    //value.tab

    let tabOptions = [];
    if (value.tab === "upcoming") {
      tabOptions = ["current", "finished"];
    } else tabOptions = ["current", "finished"];
    const moveOptions = tabOptions
      .filter(tab => tab !== value.tab)
      .map(filteredTab => {
        return <option value={filteredTab}>{filteredTab}</option>;
      });
    if (prop.note) {
      return (
        <button
          className="deleteNoteButton"
          onClick={e => {
            e.preventDefault();

            helpers
              .deleteNote(value.user.username, prop.note.id)
              .then(response => {
                value.refresh(value.user.username, value.tab);
              });
            // .catch(error => {
            //   value.setError();
            // });
            //make fetch request to delete note
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
            if (e.target.value) {
              helpers
                .patchBookTab(prop.book.id, e.target.value)
                .then(response => {
                  if (response.error) {
                    value.setError();
                  } else return value.refresh(value.user.username, value.tab);
                });
            }
          }}
        >
          <option selected disabled value="">
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

  render() {
    return (
      //returns wither props.notes or props.book
      <bookMarkContext.Consumer>
        {value => {
          const title = this.props.book
            ? this.props.book.title
            : this.props.note.notetitle;
          return (
            <div className={this.accordionClass(this.props)}>
              <div className="accordionTop">
                <button
                  className="extenderButton"
                  onClick={e => {
                    !this.state.extended
                      ? this.setState({ extended: true })
                      : this.setState({ extended: false });
                  }}
                >
                  {this.buttonDisplay(this.state.extended)}
                </button>
                <h2 className="bookTitle">{title}</h2>
                {this.buttonRender(this.props, value)}
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

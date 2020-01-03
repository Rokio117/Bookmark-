import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";
import BookInfo from "../bookInfo/bookInfo";
import PropTypes from "prop-types";
import defaultProps from "../defaultProps";
class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false
    };
  }

  buttonRender(prop, currentTab) {
    let tabOptions = [];
    currentTab === "upcoming"
      ? (tabOptions = ["current", "finished"])
      : (tabOptions = ["current", "finished"]);
    const moveOptions = tabOptions
      .filter(tab => !tab === currentTab)
      .map(filteredTab => {
        return <option value={filteredTab}>{filteredTab}</option>;
      });
    if (prop.notes) {
      return (
        <button
          onClick={e => {
            e.preventDefault();
            //make fetch request to delete note
          }}
        >
          Delete
        </button>
      );
    } else {
      return (
        <select
          onClick={e => {
            e.preventDefault();
          }}
        >
          <option selected disabled>
            Move
          </option>
          {moveOptions}
        </select>
      );
    }
  }

  renderContent(props) {
    if (props.book) {
      return <BookInfo book={props.book} />;
    } else return <BookInfo note={props.note} />;
  }

  render() {
    return (
      //returns wither props.notes or props.book
      <bookMarkContext.Consumer>
        {value => {
          const title = this.props.book
            ? this.props.book.title
            : this.props.note.title;
          return (
            <div className="accordion">
              <button
                onClick={e => {
                  !this.state.extended
                    ? this.setState({ extended: true })
                    : this.setState({ extended: false });
                }}
              >
                {"&#8964"}
              </button>
              <h2>{title}</h2>
              {this.buttonRender(this.props, value.tab)}
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

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import PropTypes from "prop-types";
import defaultProps from "../defaultProps";
import Accordion from "../accordion/accordion";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createBookList(bookList) {
    return bookList.map(book => {
      //this will use book info
      return <Accordion book={book} />;
    });
  }
  createNoteList(noteList) {
    return noteList.map(note => {
      return <Accordion note={note} />;
    });
  }
  listToRender(props) {
    if (props.book) {
      return this.createBookList(props.books);
    } else return this.createNoteList(props.notes);
  }
  render() {
    //recieves either books or notes as props
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            //props are sorted books depending on the current tab
            //will also need tab from value to know what to render
            <>{this.listToRender(this.props)}</>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}
List.defaultProps = defaultProps.listProps();

export default withRouter(List);

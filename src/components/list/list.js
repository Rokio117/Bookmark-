import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import defaultProps from "../defaultProps";
import Accordion from "../accordion/accordion";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: this.props.tab };
  }
  //this displays both lists of books and notes, both of which are held in the Accordion class

  createBookList(bookList) {
    return bookList.map(book => {
      //this will use book info
      return <Accordion book={book} tab={this.props.tab} />;
    });
  }
  createNoteList(noteList) {
    if (noteList) {
      return noteList.map(note => {
        return <Accordion note={note} tab={this.props.tab} />;
      });
    }
  }
  listToRender(props) {
    if (props.books) {
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

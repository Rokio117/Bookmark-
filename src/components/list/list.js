import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createList(bookList) {
    return bookList.map(book => {
      //this will use book info
      return <div></div>;
    });
  }
  render() {
    //recieves either books or notes as props
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            //props are sorted books depending on the current tab
            //will also need tab from value to know what to render
            <div></div>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}

export default withRouter(List);

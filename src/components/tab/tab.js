import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import "./tab.css";
class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedPage: "current" };
  }

  currentPageSelect(page) {
    if (page === this.state.selectedPage) {
      return "selected tab-button";
    } else return "not-selected tab-button";
  }

  changeTab(page) {
    this.setState({ selectedPage: page });
  }

  render() {
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            <div id="tabBorder">
              <h1>Bookmark!</h1>
              <button
                className={this.currentPageSelect("upcoming")}
                onClick={e => {
                  this.changeTab("upcoming");
                  this.props.changePage("upcoming");
                }}
              >
                Upcoming
              </button>
              <button
                className={this.currentPageSelect("current")}
                onClick={e => {
                  this.changeTab("current");
                  this.props.changePage("current");
                }}
              >
                Current
              </button>
              <button
                className={this.currentPageSelect("finished")}
                onClick={e => {
                  this.changeTab("finished");
                  this.props.changePage("finished");
                }}
              >
                Finished
              </button>
              <button
                className={this.currentPageSelect("add")}
                onClick={e => {
                  this.changeTab("add");
                  this.props.changePage("add");
                }}
              >
                Add
              </button>
            </div>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}

export default withRouter(Tab);

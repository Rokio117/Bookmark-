import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import "./tab.css";
class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: "current" };
  }

  currentPageSelect(activeTab, displayTab) {
    if (displayTab === activeTab) {
      return "selected tab-button";
    } else return "not-selected tab-button";
  }

  changeActiveTab(page) {
    this.setState({ selectedTab: page });
  }

  render() {
    return (
      <bookmarkContext.Consumer>
        {value => {
          const tab = this.props.tab;

          return (
            <div id="tabBorder">
              <h1>Bookmark!</h1>
              <button
                className={this.currentPageSelect(tab, "upcoming")}
                onClick={e => {
                  this.props.changeTab("upcoming");
                  this.changeActiveTab("upcoming");
                }}
              >
                Upcoming
              </button>
              <button
                className={this.currentPageSelect(tab, "current")}
                onClick={e => {
                  this.props.changeTab("current");
                  this.changeActiveTab("current");
                }}
              >
                Current
              </button>
              <button
                className={this.currentPageSelect(tab, "finished")}
                onClick={e => {
                  this.props.changeTab("finished");
                  this.changeActiveTab("finished");
                }}
              >
                Finished
              </button>
              <button
                className={this.currentPageSelect(tab, "add")}
                onClick={e => {
                  this.props.changeTab("add");
                  this.changeActiveTab("add");
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

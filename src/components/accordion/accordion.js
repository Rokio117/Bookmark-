import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookMarkContext from "../../context";
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
              <h2></h2>
            </div>
          );
        }}
      </bookMarkContext.Consumer>
    );
  }
}

export default withRouter(Accordion);

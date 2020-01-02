import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import helpers from "../../helpers";
class addBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTo: "upcoming",
      bookToSearch: "",
      chosenBook: {},
      searchResults: [],
      //searchResults is the list of items from the query
      startedOn: undefined,
      finishedOn: undefined,
      currentPage: undefined
    };
  }

  componentDidMount() {}

  findBookClickHandler(event) {
    helpers.getBook(this.state.bookToSearch).then(results => {
      const searchResults = results.items;
      this.setState({ searchResults: searchResults });
    });
  }

  results(resultList) {
    //needs to be sent results.items
    if (resultList.length) {
      return resultList.map(result => {
        //where is authors coming from?
        let authors = [];
        let formattedAuthors = [];
        if (result.authors.length === 1) {
          authors = <p>{`Author: ${result.volumeInfo.authors[0]}`}</p>;
        } else {
          result.volumeInfo.authors.forEach(author => {
            formattedAuthors.unshift(author);
          });

          authors = <p>{`Authors: ${formattedAuthors}`}</p>;
        }
        const bookObject = {
          title: result.volumeInfo.title,
          authors: result.volumeInfo.authors,
          published: result.volumeInfo.publishedDate,
          coverArt: result.volumeInfo.imageLinks
            ? result.volumeInfo.imageLinks.smallThumbnail
            : "No Picture available",
          bookDescription: result.volumeInfo.description
            ? JSON.parse(result.volumeInfo.description)
            : "No description available"
        };
        return (
          <li id="bookResult">
            <img
              src={bookObject.coverArt}
              alt={`Cover art for ${bookObject.title}`}
            ></img>
            <p>{`Title: ${bookObject.title}`}</p>
            <br></br>
            {authors}
            <br></br>
            <p>{`Published on: ${result.volumeInfo.publishedDate}`}</p>
            <button onClick={e => this.setState({ chosenBook: bookObject })}>
              Choose
            </button>
          </li>
        );
      });
    }
  }

  bookDetailsToRender(state) {
    if (state === "current") {
      return (
        <>
          <label htmlFor="startOnSelector"></label>
          <input
            type="date"
            id="startOnSelector"
            onChange={e => {
              this.setState({ startedOn: e.target.value });
            }}
          ></input>
          <br></br>
          <label htmlFor="currentPageSelector">Current Page</label>
          <input
            type="number"
            id="currentPageSelector"
            onChange={e => {
              this.setState({ currentPage: e.target.value });
            }}
          ></input>
        </>
      );
    }
    if (state === "finished") {
      return (
        <>
          <label htmlFor="startOnSelector"></label>
          <input
            type="date"
            id="startOnSelector"
            onChange={e => {
              this.setState({ startedOn: e.target.value });
            }}
          ></input>
          <br></br>
          <label htmlFor="finishedOnSelector"></label>
          <input
            type="date"
            id="finishedOnSelector"
            onChange={e => {
              this.setState({ finishedOn: e.target.value });
            }}
          ></input>
          <br></br>
        </>
      );
    }
  }

  render() {
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            <form>
              <fieldset>
                <legend id="findBookFieldset">Find Book</legend>
                <input type="text" required></input>
                <button
                  type="button"
                  placeholder="Pride and Prejudice"
                ></button>
                <h2>Results</h2>
                <ul>{this.results(this.state.searchResults)}</ul>
              </fieldset>
              <fieldset id="bookDetailsFieldset">
                <legend>Book Details</legend>
                <label htmlFor="pageSelect">Add to:</label>
                <select
                  id="pageSelect"
                  onChange={e => {
                    this.setState({ addingTo: e.target.value });
                  }}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="current">Current</option>
                  <option value="finished">Finished</option>
                </select>
                <br></br>
                {this.bookDetailsToRender(this.state.addingTo)}
              </fieldset>
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}

export default withRouter(addBook);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import helpers from "../../helpers";
import "./addBook.css";
class addBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTo: "upcoming",
      bookToSearch: "",
      chosenBook: undefined,
      searchResults: [],
      //searchResults is the list of items from the query
      startedOn: undefined,
      finishedOn: undefined,
      currentPage: undefined,
      noBookEntered: false,
      noBookSelected: false
    };
  }

  componentDidMount() {}

  findBookClickHandler(event) {
    //add case where only blank space is entered
    //it will throw a 400 if thats the case
    const noSpaces = this.state.bookToSearch.replace(/\s/g, "");

    if (noSpaces === "") {
      this.setState({ noBookEntered: true });
    } else
      helpers.getBook(this.state.bookToSearch).then(results => {
        //totalItems
        let searchResults = results.items;
        if (results.totalItems === 0) {
          searchResults = ["No results found"];
        }
        this.setState({ searchResults: searchResults });
      });
  }

  results(resultList) {
    //needs to be sent results.items
    if (resultList[0] !== "No results found") {
      return resultList.map(result => {
        //where is authors coming from?

        let authors = [];
        let formattedAuthors = [];
        if (result.volumeInfo.authors) {
          if (result.volumeInfo.authors.length === 1) {
            authors = <p>{`Author: ${result.volumeInfo.authors[0]}`}</p>;
          } else {
            result.volumeInfo.authors.forEach(author => {
              formattedAuthors.unshift(author);
            });

            authors = <p>{`Authors: ${formattedAuthors}`}</p>;
          }
        } else
          authors = (
            <p>{`Author: Sorry, we could not find an author for this`}</p>
          );

        const bookObject = {
          title: result.volumeInfo.title,
          authors: result.volumeInfo.authors,
          published: result.volumeInfo.publishedDate,
          coverArt: result.volumeInfo.imageLinks
            ? result.volumeInfo.imageLinks.smallThumbnail
            : "No Picture available",
          bookDescription: result.volumeInfo.description
            ? result.volumeInfo.description
            : "No description available"
        };
        return (
          <li id="bookResult" key={result.volumeInfo.id}>
            <img
              src={bookObject.coverArt}
              alt={`Cover art for ${bookObject.title}`}
            ></img>
            <p>{`Title: ${bookObject.title}`}</p>
            <br></br>
            {authors}
            <br></br>
            <p>{`Description: ${bookObject.description}`}</p>
            <br></br>
            <p>{`Published on: ${result.volumeInfo.publishedDate}`}</p>
            <button
              onClick={e => {
                e.preventDefault();

                this.setState({ chosenBook: bookObject });
              }}
            >
              Choose
            </button>
          </li>
        );
      });
    } else return <p>No results found</p>;
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

  noBookEntered(state) {
    if (state) {
      return <p className="error">Please Enter A Book</p>;
    }
  }

  noBookSelected(state) {
    if (state) {
      return <p className="error">Please select a book</p>;
    }
  }

  render() {
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (!this.state.chosenBook) {
                  this.setState({ noBookSelected: true });
                }
              }}
            >
              <fieldset>
                <legend id="findBookFieldset">Find Book</legend>

                <input
                  type="text"
                  required
                  placeholder="Pride and Prejudice"
                  onChange={e => {
                    this.setState({
                      bookToSearch: e.target.value,
                      noBookEntered: false
                    });
                  }}
                ></input>
                <button
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.state.bookToSearch
                      ? this.findBookClickHandler(this.state.bookToSearch)
                      : this.setState({ noBookEntered: true });
                  }}
                >
                  Search
                </button>
                {this.noBookEntered(this.state.noBookEntered)}
                <br></br>
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
                {this.noBookSelected(this.state.noBookSelected)}
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

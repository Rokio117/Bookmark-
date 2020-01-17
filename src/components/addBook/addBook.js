import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import helpers from "../../helpers";
import "./AddBook.css";
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTo: "upcoming",
      bookToSearch: "",
      chosenBook: undefined,
      searchResults: [],
      //searchResults is the list of items from the query
      startedOn: null,
      finishedOn: null,
      currentPage: null,
      noBookEntered: false,
      noBookSelected: false,
      resultId: "",
      hasError: false,
      errorMessage: ""
    };
  }

  componentDidMount() {}

  findBookClickHandler(event, value) {
    //add case where only blank space is entered
    //it will throw a 400 if thats the case
    const noSpaces = this.state.bookToSearch.replace(/\s/g, "");

    if (noSpaces === "") {
      this.setState({ noBookEntered: true });
    } else value.setLoading();
    helpers.getBook(this.state.bookToSearch).then(results => {
      console.log(results, "results of find book");
      //totalItems

      let searchResults = results.items;
      if (results.totalItems === 0) {
        searchResults = ["No results found"];
      }
      value.setLoading();
      this.setState({ searchResults: searchResults });
    });
  }

  selectedBook(id) {
    if (id === this.state.resultId) {
      return "selected-book";
    } else return "not-selected-book";
  }

  results(resultList) {
    console.log(resultList, "resultList in add book");
    //needs to be sent results.items
    if (resultList[0] !== "No results found") {
      return resultList.map(result => {
        //where is authors coming from?

        let authors = [];
        let formattedAuthors = [];
        if (result.volumeInfo.authors) {
          if (result.volumeInfo.authors.length === 1) {
            authors = (
              <p className="foundInfo">{` ${result.volumeInfo.authors[0]}`}</p>
            );
          } else {
            result.volumeInfo.authors.forEach(author => {
              formattedAuthors.unshift(author);
            });

            authors = <p className="foundInfo">{` ${formattedAuthors}`}</p>;
          }
        } else
          authors = (
            <p className="foundInfo">{` Sorry, we could not find an author for this`}</p>
          );

        const bookObject = {
          googleId: result.id,
          title: result.volumeInfo.title,
          authors: result.volumeInfo.authors,
          published: result.volumeInfo.publishedDate,
          coverart: result.volumeInfo.imageLinks
            ? result.volumeInfo.imageLinks.smallThumbnail
            : "No Picture available",
          bookDescription: result.volumeInfo.description
            ? result.volumeInfo.description
            : "No description available"
        };

        return (
          <li
            className={`bookResult ${this.selectedBook(bookObject.googleId)}`}
            key={result.volumeInfo.id}
          >
            <button
              id="smallSelectButton"
              onClick={e => {
                e.preventDefault();

                this.setState({
                  chosenBook: bookObject,
                  resultId: bookObject.googleId
                });
              }}
            >
              <img
                className="searchImage"
                src={bookObject.coverart}
                alt={`Cover art for ${bookObject.title}`}
              ></img>
              <div id="resultsInfo">
                <h3
                  className="foundInfo"
                  id="foundTitle"
                >{` ${bookObject.title}`}</h3>
                <br></br>
                {authors}
                <br></br>
                <p id="description">{`Description: ${result.volumeInfo.description}`}</p>
                <br></br>
                <p className="foundInfo">{`${result.volumeInfo.publishedDate}`}</p>
              </div>
              <button
                id="selectButton"
                onClick={e => {
                  e.preventDefault();

                  this.setState({
                    chosenBook: bookObject,
                    resultId: bookObject.googleId
                  });
                }}
              >
                Choose
              </button>
            </button>
          </li>
        );
      });
    } else return <p>No results found</p>;
  }

  bookDetailsToRender(state) {
    if (state === "current") {
      return (
        <div className="detailSelector">
          <div className="smallDetailSelector">
            <label htmlFor="startOnSelector" className="detailLabel">
              Started on:
            </label>
            <input
              type="date"
              id="startOnSelector"
              onChange={e => {
                this.setState({ startedOn: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
          <div className="smallDetailSelector">
            <label htmlFor="currentPageSelector" className="detailLabel">
              Current Page
            </label>
            <input
              type="number"
              id="currentPageSelector"
              onChange={e => {
                this.setState({ currentPage: e.target.value });
              }}
            ></input>
          </div>
        </div>
      );
    }
    if (state === "finished") {
      return (
        <div className="detailSelector">
          <div className="smallDetailSelector">
            <label htmlFor="startOnSelector" className="detailLabel">
              Started on:
            </label>
            <input
              type="date"
              id="startOnSelector"
              onChange={e => {
                this.setState({ startedOn: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
          <div className="smallDetailSelector">
            <label htmlFor="finishedOnSelector" className="detailLabel">
              Finished on:
            </label>
            <input
              type="date"
              id="finishedOnSelector"
              onChange={e => {
                this.setState({ finishedOn: e.target.value });
              }}
            ></input>
          </div>
          <br></br>
        </div>
      );
    }
  }
  formatBook(foundDetails, value) {
    const formattedBook = {
      googleid: foundDetails.googleId,
      title: foundDetails.title,
      authors: foundDetails.authors,
      coverart: foundDetails.coverart,
      ontab: this.state.addingTo,
      currentpage: this.state.currentPage,
      startedon: this.state.startedOn,
      finishedon: this.state.finishedOn,
      description: foundDetails.bookDescription,
      userid: value.user.id
    };
    return formattedBook;
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
  duplicateBookMessage() {
    if (this.state.hasError) {
      return <p className="error">{this.state.errorMessage}</p>;
    }
  }

  render() {
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            <form
              id="AddBookForm"
              onSubmit={e => {
                e.preventDefault();
                if (!this.state.chosenBook) {
                  this.setState({ noBookSelected: true });
                } else {
                  value.setLoading();
                  return helpers
                    .AddBook(
                      this.formatBook(this.state.chosenBook, value),
                      value.user.username
                    )
                    .then(response => {
                      if (response.error) {
                        this.setState({
                          hasError: true,
                          errorMessage: response.error
                        });
                      } else
                        value.refresh(value.user.username, this.state.addingTo);
                    });
                }
              }}
            >
              <fieldset className="AddBookFieldset" id="findBookFieldset">
                <legend id="findBookLegend">Find Book</legend>

                <input
                  id="findBookInputButton"
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
                  id="searchButton"
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.state.bookToSearch
                      ? this.findBookClickHandler(
                          this.state.bookToSearch,
                          value
                        )
                      : this.setState({ noBookEntered: true });
                  }}
                >
                  Search
                </button>
                {this.noBookEntered(this.state.noBookEntered)}
                <br></br>
                <h2>Results</h2>
                <ul id="resultsList">
                  {this.results(this.state.searchResults)}
                </ul>
              </fieldset>
              <fieldset id="bookDetailsFieldset" className="AddBookFieldset">
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
                {this.duplicateBookMessage()}
                <button type="submit" id="bookSubmitButton">
                  Submit
                </button>
              </fieldset>
            </form>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}

export default withRouter(AddBook);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import bookmarkContext from "../../context";
import src from "*.bmp";
class addBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTo: "",
      bookToSearch: "",
      chosenBook: {},
      searchResults: [],
      startedOn: undefined,
      finishedOn: undefined,
      currentPage: undefined
    };
  }

  componentDidMount() {}

  results(resultList) {
    //needs to be sent results.items
    if (resultList.length) {
      return resultList.map(result => {
        //make authors section
        //if one author return <p>{`Author: {author}`}</P
        //if more than one author return in format:
        //<p>{`Authors: ${author1} and ${author2}}
        let authors = [];
        let formattedAuthors = [];
        if (authors.length === 1) {
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

  render() {
    return (
      <bookmarkContext.Consumer>
        {value => {
          return (
            <form>
              <fieldset>
                <legend>Find Book</legend>
                <input type="text" required></input>
                <button
                  type="submit"
                  placeholder="Pride and Prejudice"
                ></button>
                <h2>Results</h2>
                <ul>{this.results(this.state.searchResults)}</ul>
              </fieldset>
            </form>
          );
        }}
      </bookmarkContext.Consumer>
    );
  }
}

export default withRouter(addBook);

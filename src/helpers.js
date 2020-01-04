import config from "./config";
import store from "./helperData/store";
const helpers = {
  getBook(title) {
    return fetch(
      `${config.BOOK_ENDPOINT}${title}&maxResults=5&key=${config.API_KEY}`
    )
      .then(results => {
        return results.json();
      })
      .catch(error => {
        const errorMessage = {
          message: "An Error occurred. Please try again later"
        };
        return errorMessage;
      });
  },
  validateAndGetReturningUser(username, password) {
    const user = store.find(userObject => userObject.username === username);

    const serverError = new Error({
      message: "Incorrect username or password"
    });
    try {
      if (!user) {
        throw serverError;
      }
      if (user.password !== password) {
        throw serverError;
      }
      return user;
    } catch (error) {
      console.log("supposed to return error");
      return { message: "Incorrect username or password" };
    }
  },
  getUserInfo(username) {
    return store.find(user => user.username === username);
  },
  patchBookTab(username, bookId, newTab) {
    console.log("patchBookTab ran");
    store
      .find(user => user.username === username)
      .books.find(book => book.id === bookId).onTab = newTab;
  },
  addBook() {
    //will also need to give it ID
    //1 retrieve all ids of all books
    //2 find largest one
    //3 largest++
    //4 assign new largest to new book
  }
};

export default helpers;

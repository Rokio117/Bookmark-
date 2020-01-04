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
  getUserInfo() {
    store.find();
  }
};

export default helpers;

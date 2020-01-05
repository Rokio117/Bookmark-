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
      return { message: "Incorrect username or password" };
    }
  },
  getUserInfo(username) {
    return store.find(user => user.username === username);
  },
  patchBookTab(username, bookId, newTab) {
    store
      .find(user => user.username === username)
      .books.find(book => book.id === bookId).onTab = newTab;
  },
  AddBook(bookObject, username) {
    const duplicate = store
      .find(user => user.username === username)
      .books.find(book => book.googleId === bookObject.googleId);
    if (duplicate) {
      return { message: "Already in collection" };
    } else {
      let allIds = [];
      store.forEach(user => user.books.forEach(book => allIds.push(book.id)));
      const id = Math.max(...allIds) + 1;
      const bookToAdd = { id: id, ...bookObject };
      store.find(user => user.username === username).books.push(bookToAdd);

      return "ok";
    }
    //  for(let num=0; num < allIds.length; num++ ){
    //   let currentHighestId = allIds[0]
    //   let currentNumber = allIds[num]
    //   if(currentHighestId < currentNumber){
    //     currentHighestId = currentNumber
    //   }
    //   return currentHighestId
    // }

    //will also need to give it ID
    //1 retrieve all ids of all books
    //2 find largest one
    //3 largest++
    //4 assign new largest to new book
  },
  patchBookInfo(bookId, newBookInfo, username) {
    newBookInfo.forEach(infoObject => {
      const keyToChange = Object.keys(infoObject)[0];
      const valueToChange = Object.values(infoObject)[0];
      store
        .find(user => user.username === username)
        .books.find(book => book.id === bookId)[keyToChange] = valueToChange;
    });

    return "ok";
  },
  deleteBook(username, bookId) {
    const userBooks = store.find(user => user.username === username).books;
    const trimmedBooks = userBooks.filter(book => book.id !== bookId);
    store.find(user => user.username === username).books = trimmedBooks;
    return "ok";
  },
  postNewUser(username, password, repeatPassword) {
    const newUser = {
      username: username,
      password: password,
      books: []
    };
    const usernames = store.map(users => users.username);
    if (password !== repeatPassword) {
      return { message: "passwords must match" };
    } else if (usernames.includes(username)) {
      return { message: "username is taken" };
    } else {
      store.push(newUser);
      return "ok";
    }
  },
  postNewNote(username, bookId, noteObject) {
    console.log(bookId, "bookId in postNewNote");
    const noteIds = [];
    store.forEach(user =>
      user.books.forEach(book =>
        book.notes.forEach(note => noteIds.push(note.noteId))
      )
    );

    let maxId = Math.max(...noteIds) + 1;
    const noteWithId = { noteId: maxId, bookId: bookId, ...noteObject };

    store
      .find(user => user.username === username)
      .books.find(book => book.id === bookId)
      .notes.push(noteWithId);

    return "ok";
  },
  deleteNote(username, bookId, noteId) {
    const filteredNotes = store
      .find(user => user.username === username)
      .books.find(book => book.id === bookId)
      .notes.filter(note => note.noteId !== noteId);

    store
      .find(user => user.username === username)
      .books.find(book => book.id === bookId).notes = filteredNotes;
    return "ok";
  }
};

export default helpers;

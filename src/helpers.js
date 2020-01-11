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
    //middleware required: validate user exists, key validator, correct password
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
    //
    //middleware required: jwt validator
    return store.find(user => user.username === username);
  },
  patchBookTab(username, bookId, newTab) {
    //middleware required: key validator, validate book exists,user validator,bookvalidator
    //protected endpoint
    store
      .find(user => user.username === username)
      .books.find(book => book.id === bookId).onTab = newTab;
  },
  AddBook(bookObject, username) {
    //middleware required: key validator,
    //user validator
    //
    //protected endpoint
    //1 find or add book
    //2 find or add author
    //3 post bookmark_user_info
    //4 post bookmark_notes
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
  },
  patchBookInfo(bookId, newBookInfo, username) {
    //this will also need bookInfoid, and not the id for a specific book
    //key validator, bookInfo exists(?),bookvalidator,uservalidator
    //username might be able to be swapped for JWT for recognition purposes
    //protected endpoint
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
    //key validator, user validator, book validator
    //this delets a users relationship to that book, not the book itself
    //also deletes the notes for that book
    const userBooks = store.find(user => user.username === username).books;
    const trimmedBooks = userBooks.filter(book => book.id !== bookId);
    store.find(user => user.username === username).books = trimmedBooks;
    return "ok";
  },
  postNewUser(username, password, repeatPassword) {
    //password encrypt,validate user(doesn't exist),new passwords compare
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
    //bookId would be book_user_info id
    //protected endpooint
    //key validator, bookid validator if necessary
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
    //protected endpoint
    //validate user
    //bookId would be book_user_info id
    //validate note exists if necessary
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

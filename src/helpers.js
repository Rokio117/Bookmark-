import config from "./config";
import store from "./helperData/store";

const endpoint = config.API_ENDPOINT;
const authToken = sessionStorage.getItem("authToken");
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
    //POST /api/auth/login

    return fetch(`${endpoint}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        user_name: username,
        password: password
      })
    })
      .then(response => {
        console.log(response, "response in fetch request");
        return response.json();
      })
      .catch(response => {
        return response;
      });
    // const user = store.find(userObject => userObject.username === username);

    // const serverError = new Error({
    //   message: "Incorrect username or password"
    // });
    // try {
    //   if (!user) {
    //     throw serverError;
    //   }
    //   if (user.password !== password) {
    //     throw serverError;
    //   }
    //   return user;
    // } catch (error) {
    //   return { message: "Incorrect username or password" };
    // }
  },
  getUserInfo(username, jwt) {
    //GET /api/bookmark/userInfo/:username
    //require auth

    return fetch(`${endpoint}/bookmark/userInfo/${username}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${jwt}`
      }
    })
      .then(response => {
        console.log(response, "ressponse in fetch");
        return response.json();
      })
      .catch(error => {
        return error;
      });
  },
  patchBookTab(bookInfoId, ontab) {
    //PATCH/api/bookmark/book/changeTab
    //body needs keys "bookInfoId" and "ontab"
    return fetch(`${endpoint}/bookmark/book/changeTab`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${authToken}`
      },
      body: JSON.stringify({
        bookInfoId,
        ontab
      })
    });
  },
  AddBook(bookObject, username) {
    // POST /api/bookmark/userinfo/:username/books/add
    //requires keys
    //"ontab" "currentpage" "startedon" "finishedon" "userid" "title" "coverart" "description" "googleid"
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
    // PATCH /api/bookmark/:username/book/update
    //needs keys "currentpage" "startedon" "finishedon" "bookInfoId"
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
    // DELETE /api/bookmark/:username/book/delete
    //required keys "bookInfoId"
    const userBooks = store.find(user => user.username === username).books;
    const trimmedBooks = userBooks.filter(book => book.id !== bookId);
    store.find(user => user.username === username).books = trimmedBooks;
    return "ok";
  },
  postNewUser(username, password, repeatPassword) {
    // POST /api/auth/register
    // required keys "user_name" "password" "repeat_password"
    return fetch(`${endpoint}/auth/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user_name: username,
        password: password,
        repeat_password: repeatPassword
      })
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  },
  postNewNote(username, bookId, noteObject) {
    //POST /api/bookmark/:username/notes
    // required keys "notetitle" "notedate" "notecontent" "bookInfoId"
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
    // DELETE /api/bookmark/:username/notes
    //required keys "noteId"
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

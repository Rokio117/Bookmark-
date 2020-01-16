import config from "./config";
import store from "./helperData/store";

const endpoint = config.LIVE_ENDPOINT;
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
        return response.json();
      })
      .catch(response => {
        return response;
      });
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
    return fetch(`${endpoint}/bookmark/userinfo/${username}/books/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${authToken}`
      },
      body: JSON.stringify({
        googleid: bookObject.googleid,
        title: bookObject.title,
        authors: bookObject.authhors,
        coverart: bookObject.coverart,
        ontab: bookObject.ontab,
        currentpage: bookObject.currentpage,
        startedon: bookObject.startedon,
        finishedon: bookObject.finishedon,
        description: bookObject.description,
        userid: bookObject.userid
      })
    });
  },
  patchBookInfo(bookId, newBookInfo, username) {
    return fetch(`${endpoint}/bookmark/${username}/book/update`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${authToken}`
      },
      body: JSON.stringify({
        currentpage: newBookInfo.currentpage,
        startedon: newBookInfo.startedon,
        finishedon: newBookInfo.finishedon,
        bookInfoId: bookId
      })
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error;
      });
  },
  deleteBook(username, bookId) {
    // DELETE /api/bookmark/:username/book/delete
    //required keys "bookInfoId"
    return fetch(`${endpoint}/bookmark/${username}/book/delete`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${authToken}`
      },
      body: JSON.stringify({
        bookInfoId: bookId
      })
    })
      .then(response => {
        return response.json(response);
      })
      .catch(error => {
        return error;
      });
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
    return fetch(`${endpoint}/bookmark/${username}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${authToken}`
      },
      body: JSON.stringify({
        notetitle: noteObject.notetitle,
        notedate: noteObject.notedate,
        notecontent: noteObject.notecontent,
        bookInfoId: bookId
      })
    })
      .then(response => {
        return response.json(response);
      })
      .catch(error => {
        return error;
      });
  },
  deleteNote(username, noteId) {
    // DELETE /api/bookmark/:username/notes
    //required keys "noteId"
    return fetch(`${endpoint}/bookmark/:${username}/notes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer=${authToken}`
      },
      body: JSON.stringify({
        noteId: noteId
      })
    }).then(response => {
      return response.json(response);
    });
  }
};

export default helpers;

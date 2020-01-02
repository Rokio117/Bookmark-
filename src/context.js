import React from "react";

const bookMarkContext = React.createContext({
  user: {},
  books: [],
  page: ""
});

export default bookMarkContext;

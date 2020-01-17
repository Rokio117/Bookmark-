import React from "react";
import ReactDOM from "react-dom";
import Accordion from "./components/accordion/accordion";
import AddBook from "./components/addBook/AddBook";
import BookInfo from "./components/bookInfo/bookInfo";
import ErrorDisplay from "./components/errorDisplay/errorDisplay";
import List from "./components/list/list";
import MainPage from "./components/mainPage/mainPage";
import Tab from "./components/tab/tab";
import WelcomePage from "./components/welcomePage/welcomePage";
import defaultProps from "./components/defaultProps";
import { BrowserRouter } from "react-router-dom";

describe("smoke tests", () => {
  const components = [
    {
      name: "Accordion",
      component: <Accordion book={defaultProps.accordionProps()} />
    },
    { name: "AddBook", component: <AddBook /> },
    {
      name: "BookInfo",
      component: <BookInfo book={defaultProps.bookInfoProps()} />
    },
    { name: "ErrorDisplay", component: <ErrorDisplay /> },
    { name: "List", component: <List book={defaultProps.listProps()} /> },
    {
      name: "MainPage",
      component: (
        <MainPage
          state={{
            user: "",
            books: [],
            tab: "",

            userProfile: {}
          }}
        />
      )
    },
    { name: "Tab", component: <Tab /> },
    { name: "WelcomePage", component: <WelcomePage /> }
  ];

  components.map(component => {
    return it(`${component.name} renders without crashing`, () => {
      const div = document.createElement("div");
      ReactDOM.render(
        <BrowserRouter>{component.component}</BrowserRouter>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});

import React from "react";
import Accordion from "./components/accordion/accordion";
import AddBook from "./components/addBook/AddBook";
import BookInfo from "./components/bookInfo/bookInfo";
import ErrorDisplay from "./components/errorDisplay/errorDisplay";
import List from "./components/list/list";
import MainPage from "./components/mainPage/mainPage";
import Tab from "./components/tab/tab";
import WelcomePage from "./components/welcomePage/welcomePage";

describe("smoke tests", () => {
  const components = [
    <Accordion />,
    <AddBook />,
    <BookInfo />,
    <ErrorDisplay />,
    <List />,
    <MainPage />,
    <Tab />,
    <WelcomePage />
  ];
});

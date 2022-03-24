import "bulmaswatch/solar/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ReactDOM from "react-dom";
import CellList from "./components/cell-list";
import Header from "./components/header";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./state";
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <CellList />
      </div>
    </Provider>
  );
};

document.title = "JSBook";
ReactDOM.render(<App />, document.querySelector("#root"));

import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ReactDOM from "react-dom";
// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";
import CellList from "./components/cell-list";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./state";
const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `Now try running your own code!`,
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//     newId: "4",
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `> Import packages from NPM

// Let's try again, with React this time!`,
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//     newId: "3",
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `> Import CSS from NPM

// Yup, as easy as that!`,
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//     newId: "2",
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `> Run JS in the DOM

// Access the DOM directly or use the provided "root" div to add elements`,
//   },
// });
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `Let's look at a few code snippets to see what we can do!

// 1. Run JS in the DOM

// 1. Import CSS from NPM

// 1. Import packages from NPM`,
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//     newId: "1",
//   },
// });
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `Check out the console! (F12)`,
//   },
// });
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//     content: `## Welcome to my JSBook project
// Please modify the code snippets slightly to execute them!`,
//   },
// });

// setTimeout(() => {
//   store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//       id: "1",
//       content: `console.log('Hi there!');`,
//     },
//   });

//   store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//       id: "2",
//       content: `document.querySelector('#root').innerHTML += \`
//     <pre id="counter">0</pre>
//   \`;

//   const counter = document.querySelector('#counter');

//   const incBtn = document.createElement('button');
//   const decBtn = document.createElement('button');

//   incBtn.innerHTML = '+';
//   decBtn.innerHTML = '-';

//   incBtn.addEventListener('click', () => (counter.innerHTML -= -1));
//   decBtn.addEventListener('click', () => (counter.innerHTML -= 1));

//   document.querySelector('#root').appendChild(incBtn);
//   document.querySelector('#root').appendChild(decBtn);`,
//     },
//   });

//   store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//       id: "3",
//       content: `import 'bulmaswatch/minty/bulmaswatch.min.css';

//     document.querySelector('#root').innerHTML += \`
//       <pre id="counter">0</pre>
//     \`;

//     const counter = document.querySelector('#counter');

//     const incBtn = document.createElement('button');
//     const decBtn = document.createElement('button');

//     incBtn.innerHTML = '+';
//     decBtn.innerHTML = '-';

//     incBtn.className = 'button is-rounded is-primary is-small';
//     decBtn.className = 'button is-rounded is-small';

//     incBtn.addEventListener('click', () => (counter.innerHTML -= -1));
//     decBtn.addEventListener('click', () => (counter.innerHTML -= 1));

//     document.querySelector('#root').appendChild(incBtn);
//     document.querySelector('#root').appendChild(decBtn);`,
//     },
//   });

//   store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//       id: "4",
//       content: `import 'bulmaswatch/minty/bulmaswatch.min.css';
//     import React, { useState } from 'react';
//     import ReactDOM from 'react-dom';

//     const Counter = ({ count }) => {
//       return <pre>{count}</pre>;
//     };
//     const Button = ({ text, primary, setCount }) => {
//       return (
//         <button
//           className={\`button is-rounded is-small \${
//             primary ? "is-primary" : ""
//           }\`}
//           onClick={() => {
//             setCount();
//           }}
//         >
//           {text}
//         </button>
//       );
//     };

//     const App = () => {
//       [count, setCount] = useState(0);
//       return (
//         <>
//           <Counter count={count} />
//           <Button
//             text="+"
//             primary={true}
//             setCount={() => {
//               setCount(count + 1);
//             }}
//           />
//           <Button
//             text="-"
//             primary={false}
//             setCount={() => {
//               setCount(count - 1);
//             }}
//           />
//         </>
//       );
//     };

//     ReactDOM.render(<App />, document.querySelector('#root'));`,
//     },
//   });
// }, 1000);

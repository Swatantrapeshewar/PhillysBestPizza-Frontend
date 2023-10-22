import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux"
import App from "./App/app";
import './Styles/styles.css';
import store from './App/store'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

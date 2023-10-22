import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import Router from "../Routes";
import i18n from "../translation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Router />
        <ToastContainer />
      </I18nextProvider>
    </BrowserRouter>
  );
}
export default App;

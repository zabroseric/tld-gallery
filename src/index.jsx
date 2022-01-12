import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import "lightgallery.js/dist/css/lightgallery.css";
import {insertCssLink, isDev} from "./services/Utils";
import {HashRouter} from "react-router-dom";
import {cssHref} from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App/>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// Load the relevant css file into the page.
if ( !isDev()) { insertCssLink('gallery-css', cssHref); }
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import "lightgallery.js/dist/css/lightgallery.css";
import {isDev} from "./services/Utils";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const cssId = 'gallery-css';
if (!document.getElementById(cssId) && !isDev()) {
  const head  = document.getElementsByTagName('head')[0];
  const link  = document.createElement('link');
  link.id   = cssId;
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = '/gallery-assets/css/main.css';
  link.media = 'all';
  head.appendChild(link);
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
// @ts-ignore
import {store} from "./redux/reducers";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
   <Provider store={store}>
           <App />
   </Provider>
);


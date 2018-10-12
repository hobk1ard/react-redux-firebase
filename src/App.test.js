import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router } from "react-router-dom";
import reducers from "./reducers";
import {fbServer} from "./config/keys";

import {App} from './App';

const store = createStore(reducers, {}, applyMiddleware(logger, reduxThunk));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

//fbServer.close();
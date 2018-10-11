import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-css-only/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { BrowserRouter as Router } from "react-router-dom";
import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, {}, applyMiddleware(logger, reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

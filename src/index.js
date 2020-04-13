import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {createStore} from 'redux'

import "antd/dist/antd.css";
import './style/index.css'
import './style/classification.css'
import './style/tab.css'

import App from './components/App'


import getInitialState from './reducers/initial-state';
import reducer from './reducers'
import {Provider} from "react-redux";

const state = getInitialState();
const store = createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

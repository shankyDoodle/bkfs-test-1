import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'

import './style/index.css'
import Root from './components/Root'


import getInitialState from './reducers/initial-state';
import reducer from './reducers'

const state = getInitialState();
const store = createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
)

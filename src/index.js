import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {createStore} from 'redux'

import { pdfjs } from 'react-pdf';


import "antd/dist/antd.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import './style/style-index.scss'
import './style/style-classification.scss'
import './style/style-extraction.scss'
import './style/style-extraction-details-view.scss'
import './style/style-tab.scss'

import './libraries/editabletable/style-editable-table.scss'
import './libraries/PDFView/style-pdf-viewer.scss'

import App from './components/App'


import {getInitialState} from './reducers/initial-state';
import reducer from './reducers/reducer-index'
import {Provider} from "react-redux";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const state = getInitialState();
const store = createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

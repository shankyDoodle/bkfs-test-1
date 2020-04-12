import React from 'react'
import PropTypes from 'prop-types'
import Home from './Home'

import Classification from './Classification'
import Extraction from './Extraction'
import NavBar from './NavBar'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    getScreenToRender = () => {
        let sScreenName = this.props.currentScreen;
        switch (sScreenName) {
            case "CLASSIFICATION":
                return <Classification/>
            case "EXTRACTION":
                return <Extraction/>
            default:
                return <Home/>
        }
    }

    render() {
        return (
            <div className={"appContainer"}>
                <NavBar/>
                {this.getScreenToRender()}
            </div>
        )
    }
}

export default App

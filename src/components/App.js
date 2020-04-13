import React from 'react'
import PropTypes from 'prop-types'

import {screenNames} from "../constants/appConstants";
import Home from './Home'

import Classification from './ClassificationView'
import Extraction from './Extraction'
import NavBar from './NavBar'
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    getScreenToRender = () => {
        let sScreenName = this.props.currentScreen;
        switch (sScreenName) {
            case screenNames.CLASSIFICATION:
                return <Classification/>
            case screenNames.EXTRACTION:
                return <Extraction/>
            default:
                return <Home/>
        }
    }

    render() {
        return (
            <div className={"appContainer"}>
                <NavBar/>
                <div className={"screenContainer"}>
                    {this.getScreenToRender()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    // let appActions = bindActionCreators({ homeButtonClicked: myActions.handleScreenChanged });
    // return { ...appActions, dispatch };
    return {}
}

const ConnectedView = connect(mapStateToProps, null)(App);
export default ConnectedView


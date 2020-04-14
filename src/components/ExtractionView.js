import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as myActions from "../actions";

import TabView from "../libraries/TabView";
import ExtractionSelectionView from "./ExtractionSelectionView"
import ExtractionDetailsView from "./ExtractionDetailsView"

class ExtractionView extends React.Component {

    getTabBody() {
        return (
            <div className={"extractionScreen"}>
                <div className={"leftPanel"}>
                    <ExtractionSelectionView/>
                </div>
                <div className={"rightPanel"}>
                    <ExtractionDetailsView />
                </div>
            </div>
        )
    }

    render() {
        return (
            <TabView
                label={"Extraction"}
                body={this.getTabBody()}
            />
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({homeButtonClicked: myActions.handleScreenChanged});
    return {...actions, dispatch};
}

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(ExtractionView);
export default ConnectedView

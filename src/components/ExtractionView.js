import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as myActions from "../actions";

import TabView from "../libraries/tabview/TabView";
import ExtractionSelectionView from "./ExtractionSelectionView"
import ExtractionDetailsView from "./ExtractionDetailsView"

export class ExtractionView extends React.Component {

    componentDidMount() {
        this.props.dispatch(myActions.fetchExtractionScreenData());
    }

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

import React from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'

import * as myActions from '../actions/index';
import {CSVLink} from "react-csv";
import {Button, Empty} from 'antd';


class ExtractionDetailsView extends React.Component {

    getExtractionButtonsView(){
        let aButtons = [];
        let oExportView = (
            <div className={"exportButton buttonClass"}>
                <Button><CSVLink data={this.props.csvData}>Export</CSVLink></Button>
            </div>
        );
        aButtons.push(oExportView);

        return aButtons;
    }

    getExtractionListViewPanel(){
        return <Empty />
    }

    getPDFView(){

    }

    render() {
        let oView;
        if(!false){
            oView = <div className={"emptyExtractionDetailView"}><Empty /></div>
        }else{
            oView = [
                <div className={"extractionButtonContainer"}>
                    {this.getExtractionButtonsView()}
                </div>,
                <div className={"extractionDetailViewBodyContainer"}>
                    <div className={"extractionListViewPanel"}>
                        {this.getExtractionListViewPanel()}
                    </div>
                    <div className={"extractionPdfViewContainer"}>
                        {this.getPDFView()}
                    </div>
                </div>
            ]
        }

        return (
            <div className="extractionDetailsContainer">
                {oView}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ homeButtonClicked: myActions.handleScreenChanged });
    return { ...actions, dispatch };
}

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(ExtractionDetailsView);
export default ConnectedView

import React from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'

import * as myActions from '../actions/index';
import {CSVLink} from "react-csv";
import {Button, Empty} from 'antd';

import DraggableListGroupView from "../libraries/draggablelistgroup/DraggableListGroupView";
import TextExportButtonView from "../libraries/textexport/TextExportButtonView";

class ExtractionDetailsView extends React.Component {

    handleExtractionListDragEnd=(source, destination)=>{
        this.props.dispatch(myActions.handleExtractionListDragEnd(source, destination));
    }

    getExtractionButtonsView(){
        let aButtons = [];
        let oExportView = (
            <div className={"exportSingleButton buttonClass"}>
                <TextExportButtonView data={this.props.textData} />
            </div>
        );
        aButtons.push(oExportView);

        return aButtons;
    }

    getExtractionListViewPanel(){
        let aGroupedData = this.props.groupedDocumentElements;
        let aLists = []
        for(let i=0; i<aGroupedData.length; i++){
            let oGroup = aGroupedData[i];
            let oList = {};
            oList.id = oGroup.groupId;
            oList.label = "Group "+ oGroup.groupId;
            oList.items = oGroup.dataElements.map(el=>{ return {id:el, label:el}})
            aLists.push(oList)
        }

        return <DraggableListGroupView
            lists={aLists}
            onDragEnd={this.handleExtractionListDragEnd}
        />
    }

    getPDFView(){
        return <div className={"emptyExtractionDetailView"}><Empty /></div>
    }

    render() {
        let oView;
        if(!this.props.selectedDocuments || !this.props.selectedDocuments.length){
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

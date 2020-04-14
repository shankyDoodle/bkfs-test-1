import React from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'

import * as myActions from '../actions/index';
import {Button, Empty} from 'antd';

import DraggableListGroupView from "../libraries/draggablelistgroup/DraggableListGroupView";
import TextExportButtonView from "../libraries/textexport/TextExportButtonView";
import PDFView from "../libraries/PDFView/PDFView";

class ExtractionDetailsView extends React.Component {

    handleExtractionListDragEnd=(source, destination)=>{
        this.props.dispatch(myActions.handleExtractionListDragEnd(source, destination));
    }

    getExtractionButtonsView(){
        let aButtons = [];
        let oExportTextView = (
            <div className={"exportSingleButton buttonClass"}>
                <TextExportButtonView data={this.props.textData} />
            </div>
        );
        aButtons.push(oExportTextView);

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
            oList.items = oGroup.dataElements.map(el=>{ return {id:el+Math.random(), label:el}})
            aLists.push(oList)
        }

        return <DraggableListGroupView
            lists={aLists}
            onDragEnd={this.handleExtractionListDragEnd}
        />
    }

    getPDFView(){
        return <PDFView document={this.props.extractedSampleFile}/>
    }

    render() {
        let oView;
        if(!this.props.groupedDocumentElements || !this.props.groupedDocumentElements.length){
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

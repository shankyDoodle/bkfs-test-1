import React from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

import * as myActions from '../actions/index';
import {Button, Empty} from 'antd';

import DraggableListGroupView from "../libraries/draggablelistgroup/DraggableListGroupView";
import TextExportButtonView from "../libraries/textexport/TextExportButtonView";
import PDFView from "../libraries/PDFView/PDFView";
import {CSVDownload, CSVLink} from "react-csv";
import axios from "axios";
import URLMappings from "../actions/axios-url-mappings";

export class ExtractionDetailsView extends React.Component {
    state ={
        exportAllClicked: false,
        exportAllData:null
    }

    handleExtractionListDragEnd=(source, destination)=>{
        this.props.dispatch(myActions.handleExtractionListDragEnd(source, destination));
    }

    handleExportAllClicked = () => {
        let _this = this;
        axios.get(URLMappings.GetAllGroupsCSVData)
            .then((res) => {
                let data = res.data;
                _this.setState({exportAllData: data, exportAllClicked: true})
            }).catch(e => console.log());
    }

    handleExtractionSaveClicked=(actionType)=>{
        let docId = this.props.selectedDocuments[0];
        this.props.dispatch(myActions.handleExtractionSaveClicked(this.props.groupedDocumentElements, docId, actionType));
    }

    handleExtractionDiscardClicked=()=>{
        this.props.dispatch(myActions.handleExtractionDiscardClicked());
    }

    csvDownloadDOM(){
        if(!this.state.exportAllClicked) return null;

        return <CSVDownload key={Math.random()} data={this.state.exportAllData} target="_blank" />
    }

    getExtractionButtonsView(){
        let aButtons = [];
        let oExportTextView = (
            <div className={"exportSingleButton buttonClass"}>
                <TextExportButtonView data={this.props.textData} />
            </div>
        );
        aButtons.push(oExportTextView);

        let oExportAllCSVView = (
            <div className={"exportAllButton buttonClass"}>
                <Button onClick={this.handleExportAllClicked}>Export All{this.csvDownloadDOM()}</Button>
            </div>
        );
        aButtons.push(oExportAllCSVView);

        if(this.props.isExtractionListDirty){
            let oSaveButtonView = (
                <div className={"saveButton buttonClass"}>
                    <Button onClick={this.handleExtractionSaveClicked.bind(this, "save")}>Save</Button>
                </div>
            );
            aButtons.push(oSaveButtonView);

            let oDiscardButtonView = (
                <div className={"saveButton buttonClass"}>
                    <Button onClick={this.handleExtractionDiscardClicked}>Discard</Button>
                </div>
            );
            aButtons.push(oDiscardButtonView);
        }

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
        let docId = this.props.selectedDocuments[0]
        return <PDFView key={docId} documentId={docId}/>
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

ExtractionDetailsView.propTypes={
    selectedDocuments:PropTypes.array,
    groupedDocumentElements:PropTypes.array,
    isExtractionListDirty:PropTypes.bool,
    textData:PropTypes.string,

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

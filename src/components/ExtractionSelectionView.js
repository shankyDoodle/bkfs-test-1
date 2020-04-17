import React from 'react';

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {Button, Divider, Popover} from 'antd';

import {dropdownTypes} from "../constants/appConstants";
import _ from "lodash";

export class ExtractionSelectionView extends React.Component {

    createDropDownListModel(data) {
        let list = []
        for (let key in data) {
            let oData = data[key];
            list.push({id: oData.id, label: oData.label})
        }
        return list;
    }

    handleExtractionDropDownOnBlur=(dropdownButtonType, selectedItems)=>{
        if(!selectedItems.length) return;
        this.props.dispatch(myActions.handleExtractionDropDownOnBlur(dropdownButtonType, selectedItems));
    }

    handleCreateButtonClicked=()=>{
        let documentId = this.props.selectedDocuments[0];
        this.props.dispatch(myActions.handleExtractionCreateButtonClickedFetchData(documentId));
    }

    getDocumentDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.documentTypes)
        return <MSSView
            key={dropdownTypes.DOCUMENT_TYPES}
            label={"Document Types"}
            childElements={aDropDownListModel}
            disabled={this.props.isExtractionListDirty}
            onChange={this.handleExtractionDropDownOnBlur.bind(this, dropdownTypes.DOCUMENT_TYPES)}/>
    }

    getCreateButtonView(){
        let bIsCreateButtonDisabled = this.props.isExtractionListDirty || ! this.props.selectedDocuments || !this.props.selectedDocuments.length;
        if(bIsCreateButtonDisabled){
            let content = this.props.isExtractionListDirty ? "There are unsaved changes in the list order. Please save or discard them first." :
                "Please select at least one document type.";
            return <Popover content={content}>
                <Button onClick={this.handleCreateButtonClicked} disabled={true}>Create</Button>
            </Popover>
        }

        return <Button onClick={this.handleCreateButtonClicked}
                       disabled={bIsCreateButtonDisabled}>Create</Button>
    }
    render() {
        return (
            <div className={"extractionSelectionContainer"}>
                <div className={"dropDownsContainer"}>
                    <div className={"documentTypeDropdown"}>
                        {this.getDocumentDropdownView()}
                    </div>
                    <Divider/>
                </div>
                <div className={"buttonFooter"}>
                    {this.getCreateButtonView()}
                </div>
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

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(ExtractionSelectionView);
export default ConnectedView

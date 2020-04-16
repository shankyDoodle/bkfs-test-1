import React from 'react';

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {Button, Divider} from 'antd';

import {dropdownTypes} from "../constants/appConstants";

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
            onBlur={this.handleExtractionDropDownOnBlur.bind(this, dropdownTypes.DOCUMENT_TYPES)}/>
    }

    render() {
        let bIsCreateButtonDisabled = this.props.isExtractionListDirty || ! this.props.selectedDocuments || !this.props.selectedDocuments.length;
        return (
            <div className={"extractionSelectionContainer"}>
                <div className={"dropDownsContainer"}>
                    <div className={"documentTypeDropdown"}>
                        {this.getDocumentDropdownView()}
                    </div>
                    <Divider/>
                </div>
                <div className={"buttonFooter"}>
                    <Button onClick={this.handleCreateButtonClicked}
                            disabled={bIsCreateButtonDisabled}>Create</Button>
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

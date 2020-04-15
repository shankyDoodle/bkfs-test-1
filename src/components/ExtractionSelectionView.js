import React from 'react';

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {Button, Divider} from 'antd';

import {dropdownTypes} from "../constants/appConstants";

class ExtractionSelectionView extends React.Component {

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
        this.props.dispatch(myActions.handleExtractionCreateButtonCLicked());
    }

    getDocumentDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.documentTypes)
        return <MSSView
            key={dropdownTypes.DOCUMENT_TYPES}
            label={"Document Types"}
            childElements={aDropDownListModel}
            onBlur={this.handleExtractionDropDownOnBlur.bind(this, dropdownTypes.DOCUMENT_TYPES)}/>
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
                    <Button onClick={this.handleCreateButtonClicked}>Create</Button>
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

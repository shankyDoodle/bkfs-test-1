import React from 'react';

import TabView from "../libraries/TabView";
import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {Button, Divider} from 'antd';

import {dropdownTypes} from "../constants/appConstants";

class ClassificationSelectionView extends React.Component {

    createDropDownListModel(data) {
        let list = []
        for (let key in data) {
            let oData = data[key];
            list.push({id: oData.id, label: oData.label})
        }
        return list;
    }

    handleClassificationDropDownOnBlur=(dropdownButtonType, selectedItems)=>{
        this.props.dispatch(myActions.handleClassificationDropDownOnBlur(dropdownButtonType, selectedItems));
    }

    handleCreateButtonClicked=()=>{
        let selectedCustomerIds = this.props.selectedCustomers
        let selectedDocumentTypeIds = this.props.selectedDocuments;
        this.props.dispatch(myActions.handleClassificationCreateButtonCLickedServerCall(selectedCustomerIds, selectedDocumentTypeIds));
    }

    getCustomerDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.customerList)
        return <MSSView
            key={dropdownTypes.CUSTOMER_NAMES}
            label={"Customer Names"}
            childElements={aDropDownListModel}
            onBlur={this.handleClassificationDropDownOnBlur.bind(this, dropdownTypes.CUSTOMER_NAMES)}
            isMultiple={true}
            allowClear={true}
            selectAll={true}/>
    }

    getDocumentDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.documentTypes)
        return <MSSView
            key={dropdownTypes.DOCUMENT_TYPES}
            label={"Document Types"}
            childElements={aDropDownListModel}
            onBlur={this.handleClassificationDropDownOnBlur.bind(this, dropdownTypes.DOCUMENT_TYPES)}
            isMultiple={true}
            allowClear={true}
            selectAll={true}/>
    }

    render() {
        return (
            <div className={"classificationSelectionContainer"}>
                <div className={"dropDownsContainer"}>
                    <div className={"customerDropdown"}>
                        {this.getCustomerDropdownView()}
                    </div>
                    <Divider/>
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

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(ClassificationSelectionView);
export default ConnectedView

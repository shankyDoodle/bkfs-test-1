import React from 'react';
import _ from 'lodash'

import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {Button, Divider, Popover} from 'antd';

import {dropdownTypes, screenNames} from "../constants/appConstants";

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

    handleNewCustomerAdded=(sCustomerName)=>{
        this.props.dispatch(myActions.handleNewCustomerAdded(sCustomerName));
    }

    handleNewDocumentTypeAdded=(sDocTypeName)=>{
        this.props.dispatch(myActions.handleNewDocumentTypeAdded(sDocTypeName));
    }

    getCustomerDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.customerList)
        let isDisabled = this.props.customerData.hasOwnProperty("clonedObject")
        return <MSSView
            key={dropdownTypes.CUSTOMER_NAMES}
            label={"Customer Names"}
            childElements={aDropDownListModel}
            onChange={this.handleClassificationDropDownOnBlur.bind(this, dropdownTypes.CUSTOMER_NAMES)}
            isMultiple={true}
            allowClear={true}
            disabled={isDisabled}
            selected={this.props.selectedCustomers}
            onEnterPress={this.handleNewCustomerAdded}
            selectAll={false}/>
    }

    getDocumentDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.documentTypes)
        let isDisabled = this.props.customerData.hasOwnProperty("clonedObject")
        return <MSSView
            key={dropdownTypes.DOCUMENT_TYPES}
            label={"Document Types"}
            childElements={aDropDownListModel}
            onChange={this.handleClassificationDropDownOnBlur.bind(this, dropdownTypes.DOCUMENT_TYPES)}
            isMultiple={true}
            allowClear={true}
            disabled={isDisabled}
            selected={this.props.selectedDocuments}
            onEnterPress={this.handleNewDocumentTypeAdded}
            selectAll={false}/>
    }

    getFooterButtonView(){
        if(_.isEmpty(this.props.selectedDocuments) || this.props.customerData.hasOwnProperty("clonedObject")){
            let content = _.isEmpty(this.props.selectedDocuments) ? "Please select at least one document type." :
                "There are unsaved changes in table. Please save or discard them first.";
            return <Popover content={content}>
                <Button disabled onClick={this.handleCreateButtonClicked}>Create</Button>
            </Popover>
        }

        return <Button onClick={this.handleCreateButtonClicked}>Create</Button>
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
                    {this.getFooterButtonView()}
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

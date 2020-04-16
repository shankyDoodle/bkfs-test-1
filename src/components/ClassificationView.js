import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as myActions from "../actions";

import TabView from "../libraries/TabView";
import MSSView from "../libraries/MSS/MSSView";
import ClassificationSelectionView from "./ClassificationSelectionView"
import EditableTable from "../libraries/editabletable/EditableTableView";

class ClassificationView extends React.Component {

    componentDidMount() {
        this.props.dispatch(myActions.fetchClassificationScreenData());
    }

    handleTableCellDataChanged=(customerName, docName, newVal)=>{
        this.props.dispatch(myActions.handleTableCellDataChanged(customerName, docName, newVal));
    }

    handleTableSaveDiscardClicked=(buttonType)=>{
        if(buttonType === "save"){
            //handle save
            this.props.dispatch(myActions.handleTableSaveServerData(this.props.customerData.clonedObject));
        }
        this.props.dispatch(myActions.handleTableSaveDiscardClicked(buttonType));
    }

    handleFileUpload=(docId, base64File)=>{
        this.props.dispatch(myActions.handleDocumentSampleUpload(docId, base64File));
    }

    getTabBody() {
        let tableData = this.props.classificationTableData.isDirty ?
            this.props.classificationTableData.clonedObject : this.props.classificationTableData

        return (
            <div className={"classificationScreen"}>
                <div className={"leftPanel"}>
                    <ClassificationSelectionView/>
                </div>
                <div className={"rightPanel"}>
                    <EditableTable
                        headerData={tableData.headerData}
                        tableData={tableData.bodyData}
                        onTableCellDataChanged={this.handleTableCellDataChanged}
                        onSave={this.handleTableSaveDiscardClicked.bind(this, "save")}
                        onDiscard={this.handleTableSaveDiscardClicked.bind(this, "discard")}
                        handleFileUpload={this.handleFileUpload}
                        csvData={this.props.csvData}
                    />
                </div>
            </div>
        )
    }

    render() {
        return (
            <TabView
                label={"Classification"}
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

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(ClassificationView);
export default ConnectedView

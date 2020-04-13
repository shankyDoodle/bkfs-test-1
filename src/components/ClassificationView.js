import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as myActions from "../actions";

import TabView from "../libraries/TabView";
import MSSView from "../libraries/MSS/MSSView";
import ClassificationSelectionView from "./ClassificationSelectionView"
import EditableTable from "../libraries/editabletable/EditableTableView";


class ClassificationView extends React.Component {

    handleTableCellDataChanged=(customerName, docName, newVal)=>{
        this.props.dispatch(myActions.handleTableCellDataChanged(customerName, docName, newVal));
    }

    handleTableSaveDiscardClicked=(buttonType)=>{
        this.props.dispatch(myActions.handleTableSaveDiscardClicked(buttonType));
    }

    getTabBody() {
        let tableData = this.props.classificationTableDataCloned ?
            this.props.classificationTableDataCloned : this.props.classificationTableData

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

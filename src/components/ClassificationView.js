import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as myActions from "../actions";

import TabView from "../libraries/TabView";
import MSSView from "../libraries/MSS/MSSView";
import ClassificationSelectionView from "./ClassificationSelectionView"
import EditableTable from "../libraries/editabletable/EditableTableView";


class ClassificationView extends React.Component {

    getTableViewData(){
        let oTableData = this.props.classificationTableData

    }

    getTabBody() {
        let oTableViewData = this.getTableViewData();
        return (
            <div className={"classificationScreen"}>
                <div className={"leftPanel"}>
                    <ClassificationSelectionView/>
                </div>
                <div className={"rightPanel"}>
                    <EditableTable
                        headerData={this.props.classificationTableData.headerData}
                        tableData={this.props.classificationTableData.bodyData}
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

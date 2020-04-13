import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, Empty, Popover} from 'antd';
import { CSVLink, CSVDownload } from "react-csv";

const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

class EditableTable extends React.Component {

    getTableHeader() {
        let aHeaderList = this.props.headerData
        let aTds = [];

        aHeaderList.forEach( oHeader =>{
            aTds.push(<th>
                <div className="gridViewHeaderWrapper">
                    <div className="gridViewHeaderText">{oHeader.label}</div>
                </div>
            </th>)
        });

        return <tr>{aTds}</tr>;
    }


    handleMouseOver=(docName, e)=>{

    }

    handleTextChanged=(customerName, docName, e)=>{
        let newVal = e.target.value;
        this.props.onTableCellDataChanged(customerName, docName, newVal);
    }

    getPDFViewerView=(docName)=>{

    }

    getTableBody(){

        let aTableData = this.props.tableData;
        let aColumnsToRender = this.props.headerData;

        let aTrs = [];
        for(let doc of aTableData){
            let aTds = [];
            let docName = doc.documentName;
            let oTableData = doc.rowData;

            for(let i=0;i<aColumnsToRender.length;i++){
                let customerName = aColumnsToRender[i].label
                let val = oTableData[customerName];

                let oView = null;
                if(i===0){
                    oView = (
                        <Popover content={this.getPDFViewerView(docName)}>
                            <div key={i} className={"tableFixedColumn"}
                                 onMouseOver={this.handleMouseOver.bind(this, docName)}>{docName}</div>
                        </Popover>
                    )
                }else{
                    oView = (
                        <input  key={i} value={val}
                               onChange={this.handleTextChanged.bind(this, customerName, docName)}/>);
                }

                aTds.push(<td key={Math.random()}>
                    <div>{oView}</div>
                </td>);
            }
            aTrs.push(<tr key={Math.random()} className={"rowTest"}>{aTds}</tr>)
        }

        return aTrs;
    }

    handleSaveButtonCLicked=()=>{
        this.props.onSave();
    }

    handleDiscardButtonClicked=()=>{
        this.props.onDiscard();
    }

    getSaveDiscardButtons(){
        let aButtons = [];
        let oExportView = (
            <div className={"exportButton buttonClass"}>
                <Button><CSVLink data={this.props.csvData}>Export</CSVLink></Button>
            </div>
        );
        aButtons.push(oExportView);

        let oSaveView = (
            <div className={"saveButton buttonClass"}>
                <Button onClick={this.handleSaveButtonCLicked}>Save</Button>
            </div>
        )
        aButtons.push(oSaveView);

        if(this.props.classificationTableData.isDirty){
            let oDiscardView = (
                <div className={"discardButton buttonClass"}>
                    <Button onClick={this.handleDiscardButtonClicked}>Discard</Button>
                </div>
            )
            aButtons.push(oDiscardView)
        }
        return aButtons;
    }
    render() {
        if(!this.props.headerData || !this.props.headerData.length){
            return <div className={"empty"}><Empty /></div>
        }
        return (
            <div className={"gridTableContainer"}>
                <div className={"gridSaveDiscardContainer"}>
                    {this.getSaveDiscardButtons()}
                </div>
                <div className={"gridTableContainerWrapper"}>
                    <table className="gridTableContainer">
                        <thead className="gridTableHeader">{this.getTableHeader()}</thead>
                        <tbody className="gridTableBody">{this.getTableBody()}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}


EditableTable.propTypes={
    tableData:PropTypes.array,
    headerData:PropTypes.array,
    csvData:PropTypes.array,
    onTableCellDataChanged:PropTypes.func,
    onSave:PropTypes.func,
    onDiscard:PropTypes.func,
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    // let appActions = bindActionCreators({ homeButtonClicked: myActions.handleScreenChanged });
    // return { ...appActions, dispatch };
    return {}
}

const ConnectedView = connect(mapStateToProps, null)(EditableTable);
export default ConnectedView
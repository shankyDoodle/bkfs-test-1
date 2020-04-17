import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, Empty, Popover} from 'antd';
import { CSVLink, CSVDownload } from "react-csv";
import PDFView from "../PDFView/PDFView";

export class EditableTable extends React.Component {

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


    handleTextChanged=(customerName, docName, e)=>{
        let newVal = e.target.value;
        this.props.onTableCellDataChanged(customerName, docName, newVal);
    }

    getPDFViewerView=(docId)=>{
        return (
            <div className={"gridPDFViewWrapper"}>
                <PDFView documentId={docId} enableFileUpload={true}/>
            </div>
        )

    }

    getTableBody(){

        let aTableData = this.props.tableData;
        let aColumnsToRender = this.props.headerData;

        let aTrs = [];
        for(let doc of aTableData){
            let aTds = [];
            let docName = doc.documentName;
            let docId = doc.documentId;
            let docFile = doc.file;
            let oTableData = doc.rowData;

            for(let i=0;i<aColumnsToRender.length;i++){
                let customerName = aColumnsToRender[i].label
                let customerId = aColumnsToRender[i].id;
                let val = oTableData[customerId];

                let oView = null;
                if(i===0){
                    oView = (
                        <Popover title={docName} content={this.getPDFViewerView(docId)}>
                            <div key={i} className={"tableFixedColumn"}>{docName}</div>
                        </Popover>
                    )
                }else{
                    oView = (
                        <input className={"tableCellInput"} key={customerId+"%$$%"+docId} value={val}
                               onChange={this.handleTextChanged.bind(this, customerId, docId)}/>);
                }

                aTds.push(<td>
                    <div>{oView}</div>
                </td>);
            }
            aTrs.push(<tr className={"tableRow"}>{aTds}</tr>)
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

        if(this.props.classificationTableData.isDirty){
            let oSaveView = (
                <div className={"saveButton buttonClass"}>
                    <Button onClick={this.handleSaveButtonCLicked}>Save</Button>
                </div>
            )
            aButtons.push(oSaveView);

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
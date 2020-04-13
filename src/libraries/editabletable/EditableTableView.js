import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Empty } from 'antd';

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
                        <div className={"tableFixedColumn"}
                             onMouseOver={this.handleMouseOver.bind(this, docName)}>{docName}</div>
                    )
                }else{
                    oView = (
                        <input value={val}
                               onChange={this.handleTextChanged.bind(this, customerName, docName)}/>);
                }

                aTds.push(<td>
                    <div>{oView}</div>
                </td>);
            }
            aTrs.push(<tr className={"rowTest"}>{aTds}</tr>)
        }

        return aTrs;
    }

    render() {
        if(!this.props.headerData || !this.props.headerData.length){
            return <div className={"empty"}><Empty /></div>
        }
        return (
            <div className={"gridTableContainerWrapper"}>
                <table className="gridTableContainer">
                    <thead className="gridTableHeader">{this.getTableHeader()}</thead>
                    <tbody className="gridTableBody">{this.getTableBody()}</tbody>
                </table>
            </div>
        )
    }
}


EditableTable.propTypes={
    tableData:PropTypes.array,
    headerData:PropTypes.array,
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
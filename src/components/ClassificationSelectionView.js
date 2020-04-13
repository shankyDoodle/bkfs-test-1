import React from 'react';

import TabView from "../libraries/TabView";
import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";
import {Button, Divider} from 'antd';

class ClassificationSelectionView extends React.Component {

    createDropDownListModel(data) {
        let i = 0;
        let list = []
        for (let key in data) {
            list.push({id: i, label: key})
            i++;
        }
        return list;
    }

    handleClassificationDropDownOnBlur=(dropdownButtonType, selectedItems)=>{
        console.log(dropdownButtonType, selectedItems);
    }

    getCustomerDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.customerList)
        return <MSSView
            label={"Customer Names"}
            childElements={aDropDownListModel}
            onBlur={this.handleClassificationDropDownOnBlur.bind(this, "customerList")}
            isMultiple={true}
            allowClear={true}
            selectAll={true}/>
    }

    getDocumentDropdownView(){
        let aDropDownListModel = this.createDropDownListModel(this.props.customerData)
        return <MSSView
            label={"Document Types"}
            childElements={aDropDownListModel}
            onBlur={this.handleClassificationDropDownOnBlur.bind(this, "customerData")}
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
                </div>

                <Divider/>
                <div className={"buttonFooter"}>
                    <Button>Create</Button>
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

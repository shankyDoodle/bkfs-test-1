import React from 'react';

import TabView from "../libraries/TabView";
import MSSView from "../libraries/MSS/MSSView";
import {bindActionCreators} from "redux";
import * as myActions from "../actions";
import {connect} from "react-redux";

class Classification extends React.Component {

    createDropDownListModel() {
        let customerList = this.props.customerList;
        let i = 0;
        let list = []
        for (let key in customerList) {
            list.push({id: i, label: key})
            i++;
        }
        return list;
    }

    handleDropDownOnBlur=(selectedItems)=>{
        console.log(selectedItems);
    }
    getMultiSelectionView() {
        let aDropDownListModel = this.createDropDownListModel()
        return <MSSView
            childElements={aDropDownListModel}
            onBlur={this.handleDropDownOnBlur}
            isMultiple={true}
            allowClear={true}
            selectAll={true}/>

    }

    getTabBody() {
        let isDropDownSelected = false;
        if (isDropDownSelected) {
            //do table view
        } else {
            return this.getMultiSelectionView();
        }
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
    let actions = bindActionCreators({ homeButtonClicked: myActions.handleScreenChanged });
    return { ...actions, dispatch };
}

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(Classification);
export default ConnectedView

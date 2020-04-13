import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;


class MSSView extends React.Component {

    constructor(props) {
        super(props);
        this.selected = []
    }

    handleChange=(values)=>{
        console.log(`selected ${values}`);
        this.selected = values
        // if(values.includes("selectAll")){
        //     this.handleBlur();
        // }
    }

    handleBlur=()=>{
        this.props.handleBlur(this.selected);
    }

    getChildren(){
        const children = [];
        if(this.props.selectAll){
            children.push(<Option key={"selectAll"}>{"Select All"}</Option>);
        }

        for (let item of this.props.childElements) {
            children.push(<Option key={item.id}>{item.label}</Option>);
        }
        return children;
    }

    render() {
        return (
            <div className={"mssViewWrapper"}>
                <Select
                    allowClear={!!this.props.allowClear}
                    mode={!!this.props.isMultiple}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={this.props.selected || []}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                >
                    {this.getChildren()}
                </Select>
            </div>
        )
    }
}


MSSView.propTypes={
    onBlur: PropTypes.func.isRequired,
    childElements: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string,
        label:PropTypes.string
    })).isRequired,
    selected: PropTypes.array,
    isMultiple: PropTypes.bool,
    allowClear: PropTypes.bool,
    selectAll: PropTypes.bool,
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    // let actions = bindActionCreators({ homeButtonClicked: myActions.handleScreenChanged });
    // return { ...actions, dispatch };
    return {}
}

const ConnectedView = connect(mapStateToProps, null)(MSSView);
export default ConnectedView
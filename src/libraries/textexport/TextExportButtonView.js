import React from "react";
import PropTypes from 'prop-types'
import {Button} from "antd";
import {connect} from "react-redux";

export class TextExportButtonView extends React.Component {
    downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([this.props.data], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "exportedTextFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        return (<Button onClick={this.downloadTxtFile}>Export</Button>);
    }
}

TextExportButtonView.propTypes = {
    data: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return state;
}

const ConnectedView = connect(mapStateToProps, null)(TextExportButtonView);
export default ConnectedView
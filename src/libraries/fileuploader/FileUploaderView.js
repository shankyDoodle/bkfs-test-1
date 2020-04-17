import React from 'react'
import PropTypes from 'prop-types'
import {Button} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import URLMappings from "../../actions/axios-url-mappings";

class FileUploaderView extends React.Component {
    constructor(props) {
        super(props);
    }

    uploadFile= (oEvent)=>{
        let oFile = oEvent.target.files[0]
        const data = new FormData()
        data.append('file', oFile)
        data.append('documentId', this.props.documentId)
        axios.post(URLMappings.AddNewDocumentSample, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            this.props.handleFileUploadSuccess(res.data);
        })
    }

    render() {
        return (
            <div className={"pdfUploadContainer"}>
                <Button icon={<UploadOutlined/>} className={"pdfUploadAntBtn"} size={"small"}>Upload
                    <input className={"pdfUploadInput"}
                           type="file"
                           name="file"
                           accept="application/pdf"
                           onChange={this.uploadFile}/>
                </Button>
            </div>
        )
    }
}

FileUploaderView.propTypes = {
    documentId:PropTypes.string,
    handleFileUploadSuccess:PropTypes.func
}

export default FileUploaderView



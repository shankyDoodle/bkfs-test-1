import React from 'react'
import PropTypes from 'prop-types'
import {Button} from "antd";
import { UploadOutlined } from '@ant-design/icons';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

class FileUploaderView extends React.Component {
    constructor(props) {
        super(props);
    }

    getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    uploadFile= async (oEvent)=>{
        let oFile = this.uploadInput.files[0]
        let base64File = this.getBase64(oFile)
        let trimmed= base64File.replace("data:application/pdf;base64,", "");
        // Create an object of formData
        // const formData = new FormData();
        // formData.append('file', oFile);
        // formData.append('filename', oFile.value);

        // Details of the uploaded file
        this.props.handleFileUpload(trimmed)
    }

    render() {
        return (
            <div className={"pdfUploadContainer"}>
                {/*<div className="fileDropZoneContainer">*/}
                {/*    <form id="dropFileForm" className="dropzone" encType="multipart/form-data" onChange={this.uploadFile}>*/}
                {/*        <input id="file" className="inputDropzone" name="file" type="file" ref={this.dropRef} title={""}/>*/}
                {/*        <Button onClick={this.inputDropClicked} icon={<UploadOutlined/>}>Upload PDF</Button>*/}
                {/*    </form>*/}
                {/*</div>*/}
                <form onSubmit={this.uploadFile}>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    <button>Upload</button>
                </form>
            </div>
        )
    }
}

FileUploaderView.propTypes = {
    handleFileUpload: PropTypes.func
}

export default FileUploaderView



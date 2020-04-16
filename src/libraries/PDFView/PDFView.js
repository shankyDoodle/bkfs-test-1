import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Document, Page} from "react-pdf";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Button, Empty} from 'antd'
import axios from "axios";
import URLMappings from "../../actions/axios-url-mappings";

class PDFView extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
        fileData:null
    };

    constructor(props) {
        super(props);
        this.navRef = React.createRef();
    }

    componentDidMount() {
        axios.get(URLMappings.GetSampleDocumentByDocId, {params:{documentId:this.props.documentId}})
            .then((res) => {
                let base64 = res.data;
                this.setState({fileData:`data:application/pdf;base64,${base64}`});
            }).catch(e => console.log());
    }

    onDocumentLoadSuccess = ({numPages}) => {
        this.setState({numPages});
    };

    goToPrevPage = () =>{
        let currentPageNum = this.state.pageNumber
        let newPageNumber = currentPageNum - 1 === 0 ? this.state.numPages : currentPageNum - 1 ;
        this.setState({pageNumber: newPageNumber});
    }

    goToNextPage = () =>{
        let currentPageNum = this.state.pageNumber
        let newPageNumber = currentPageNum === this.state.numPages ? 1 : currentPageNum + 1 ;
        this.setState({pageNumber: newPageNumber});
    }

    showNoDataDiv=()=>{
        if(this.navRef && this.navRef.current && this.navRef.current.classList){
            this.navRef.current.classList.add("noDisplay");
        }
        return <div className={"emptyPdf"}><Empty/></div>
    }

    showErrorDiv=()=>{
        if(this.navRef && this.navRef.current && this.navRef.current.classList){
            this.navRef.current.classList.add("noDisplay");
        }
        return <div className={"emptyPdf"}><Empty/></div>
    }

    getNavigationDOM=()=>{
        if(!this.state.fileData){
            return null;
        }
        const {pageNumber, numPages} = this.state;
        return (
            <div className={"navigationWrapper"} ref={this.navRef}>
                <div className={"navChild prev"}>
                    <Button icon={<LeftOutlined/>} size={"small"} onClick={this.goToPrevPage}/>
                </div>
                <div className={"navChild pageNumber"}>  {pageNumber} / {numPages}</div>
                <div className={"navChild next"}>
                    <Button icon={<RightOutlined/>} size={"small"} onClick={this.goToNextPage}/>
                </div>
            </div>
        )
    }

    render() {
        const {pageNumber} = this.state;

        let oNavigationDOM = this.getNavigationDOM();
        return (
            <div className={"pdfViewerContainer"}>
                <div className={"documentWrapper"}>
                    <Document
                        file={this.state.fileData}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        noData={this.showNoDataDiv}
                        error={this.showErrorDiv}
                        onLoadError={console.error}
                    >
                        <Page pageNumber={pageNumber} width={600}/>
                    </Document>
                </div>
                {oNavigationDOM}
            </div>
        );
    }
}

PDFView.propTypes = {
    documentId: PropTypes.string
}

export default PDFView


import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Document, Page} from "react-pdf";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Button, Empty} from 'antd'

class PDFView extends Component {
    state = {numPages: null, pageNumber: 1};
    constructor(props) {
        super(props);
        this.navRef = React.createRef();
    }

    onDocumentLoadSuccess = ({numPages}) => {
        this.setState({numPages});
    };

    goToPrevPage = () =>{
        this.setState(state => ({pageNumber: state.pageNumber - 1}));
    }

    goToNextPage = () =>
        this.setState(state => ({pageNumber: state.pageNumber + 1}));

    showNoDataDiv=()=>{
        this.navRef.current.classList.add("noDisplay");
        return <div className={"emptyPdf"}><Empty/></div>
    }

    showErrorDiv=()=>{
        this.navRef.current.classList.add("noDisplay");
        return <div className={"emptyPdf"}><Empty/></div>
    }

    render() {
        const {pageNumber, numPages} = this.state;

        return (
            <div className={"pdfViewerContainer"}>
                <div className={"documentWrapper"}>
                    <Document
                        file={this.props.document}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        noData={this.showNoDataDiv}
                        error={this.showErrorDiv}
                    >
                        <Page pageNumber={pageNumber} width={600}/>
                    </Document>
                </div>

                <div className={"navigationWrapper"} ref={this.navRef}>
                    <div className={"navChild prev"}>
                        <Button icon={<LeftOutlined/>} size={"small"} onClick={this.goToPrevPage}/>
                    </div>
                    <div className={"navChild pageNumber"}>  {pageNumber} / {numPages}</div>
                    <div className={"navChild next"}>
                        <Button icon={<RightOutlined/>} size={"small"} onClick={this.goToNextPage}/>
                    </div>
                </div>
            </div>
        );
    }
}

PDFView.propTypes = {
    document: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])

}

export default PDFView


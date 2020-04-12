import React from 'react';

import ModalWrapper from "../libraries/ModalWrapper";

import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const theme = createMuiTheme();
const styles = {
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
};

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: null,
        }
    }
    handleButtonClicked=(buttonName,oEvent)=>{
        this.setState({
            openModal:buttonName
        })
    }

    handleModalClose=()=>{
        this.setState({
            openModal:null
        })
    }

    getModalView=()=>{
        let body = null;
        if(this.state.openModal === "classifications"){
            body=<div> class body </div>
        }else if(this.state.openModal === "classifications"){
            body=<div> ext body </div>
        }

        return (
            <ModalWrapper
                open={!!body}
                onClose={this.handleModalClose}>
                {body}
            </ModalWrapper>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="buttonWrapper">

                {this.getModalView()}
                <Button variant="contained"
                        size="large"
                        className={classes.margin}
                        onClick={this.handleButtonClicked.bind(this, "classifications")}
                >
                    Classification
                </Button>
                <Button variant="contained"
                        size="large"
                        className={classes.margin}
                        onClick={this.handleButtonClicked.bind(this, "extractions")}
                >
                    Extraction
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Home);

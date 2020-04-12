import React from "react";
import Modal from "@material-ui/core/Modal";

import {createMuiTheme, withStyles} from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}
const theme = createMuiTheme(getModalStyle);
const styles = {
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
};

class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    handleModalClose=()=>{
        this.props.onClose()
    }

    render() {
        console.log("here")
        return (
            <div>
                <Modal
                    open={this.props.open}
                    onClose={this.handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {this.props.body}
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(ModalWrapper);

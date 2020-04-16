import React from 'react';
import { bindActionCreators } from 'redux'

import * as myActions from '../actions/index';
import {screenNames} from "../constants/appConstants";


import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
const theme = createMuiTheme();
const styles = {
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
};

export class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    handleButtonClicked=(sScreenName,oEvent)=>{
        oEvent.stopPropagation();
        this.props.dispatch(myActions.handleScreenChanged(sScreenName));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="buttonWrapper">
                <Button variant="contained"
                        size="large"
                        className={classes.margin}
                        onClick={this.handleButtonClicked.bind(this, screenNames.CLASSIFICATION)}
                >
                    Classification
                </Button>
                <Button variant="contained"
                        size="large"
                        className={classes.margin}
                        onClick={this.handleButtonClicked.bind(this, screenNames.EXTRACTION)}
                >
                    Extraction
                </Button>
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

const ConnectedView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default withStyles(styles)(ConnectedView)

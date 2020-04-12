import React from 'react';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myActions from '../actions/index';

import {withStyles, createMuiTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const theme = createMuiTheme();
const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar:{

    }
};

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    handleHomeClicked = (oEvent) => {
        oEvent.stopPropagation();
        this.props.dispatch(myActions.homeButtonClicked("HOME"));
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={"appContainer"} style={{ backgroundColor: 800 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            BKFS
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="home"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleHomeClicked}
                        >
                            <HomeRoundedIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ homeButtonClicked: myActions.homeButtonClicked });
    return { ...actions, dispatch };
}

const ConnectedAppBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default withStyles(styles)(ConnectedAppBar)

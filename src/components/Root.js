import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Home from './Home'

import Classification from './Classification'
import Extraction from './Extraction'
import NavBar from './NavBar'

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.myState = this.props.store.getState();
    }
    render(){

        return (
            <Provider store={this.props.store}>
                <div>
                    <NavBar />
                    <Route path="/" exact={true} component={Home} />
                    {/*<Route path="/classification" exact={true} component={Classification} />*/}
                    {/*<Route path="/extraction" exact={true} component={Extraction} />*/}
                </div>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
}
export default Root

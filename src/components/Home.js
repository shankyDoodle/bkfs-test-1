import React from 'react';
import {NavLink} from 'react-router-dom'

class Home extends React.Component {

    render(){
        return (
            <div className="App">
                <div>
                    <NavLink exact={true} to={`/classification`}>{"Classification"}</NavLink>
                    <br/>
                    <NavLink exact={true} to={`/extraction`}>{"Extraction"}</NavLink>
                </div>
            </div>
        );
    }
}

export default Home;

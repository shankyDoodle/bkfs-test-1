import React from 'react';

import TabView from "../libraries/TabView";

class Classification extends React.Component{


    getMultiSelectionView(){
        return <div>MMS View</div>
    }

    getTabBody(){
        let isDropDownSelected = false;
        if( isDropDownSelected){
            //do table view
        }else{
            return this.getMultiSelectionView();
        }
    }

    render() {
        return (
            <TabView
                label={"Classification"}
                body={this.getTabBody()}
            />
        );
    }
}

export default Classification;

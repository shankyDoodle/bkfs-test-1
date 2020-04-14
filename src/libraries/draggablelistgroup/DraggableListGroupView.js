import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {DragDropContext} from 'react-beautiful-dnd';

import DraggableListView from './DraggableListView'

class DraggableListGroupView extends Component {

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        let oSource = {
            groupId:source.droppableId,
            index: source.index
        }
        let oDest = {
            groupId:destination.droppableId,
            index: destination.index
        }

        this.props.onDragEnd(oSource, oDest);
    };

    getGroupedLists() {
        let aLists = this.props.lists;
        let aDOMs = [];
        for (let listData of aLists) {
            aDOMs.push(
                <DraggableListView
                    key={listData.id}
                    droppableId={listData.id}
                    label={listData.label}
                    items={listData.items}
                />
            )
        }

        return aDOMs
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.getGroupedLists()}
            </DragDropContext>
        );
    }
}

DraggableListGroupView.propTypes={
    lists:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        label:PropTypes.string,
        items:PropTypes.arrayOf(PropTypes.shape({
            id:PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            label:PropTypes.string,
        }))
    })).isRequired,
    onDragEnd: PropTypes.func
}

export default DraggableListGroupView
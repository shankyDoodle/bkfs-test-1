import React, {Component} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

import DraggableListView from './DraggableListView'

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));


class DraggableListGroupView extends Component {
    state = {
        items: getItems(10),
        selected: getItems(5, 10)
    };

    onDragEnd = result => {
        const {source, destination} = result;
        console.log("inside onDragEnd:", source, destination)
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            //update state for same list dnd
        } else {
            //update state for different lists
        }
    };

    getGroupedLists() {
        let aLists = [this.state.items, this.state.selected];

        let count = 1
        let aDOMs = [];
        for (let listData of aLists) {

            aDOMs.push(
                <DraggableListView
                    key={"droppable" + count++}
                    droppableId={"droppable" + count++}
                    label={"listData.label"}
                    items={listData}
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

export default DraggableListGroupView
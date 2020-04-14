import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {Draggable, Droppable} from "react-beautiful-dnd";

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#fff',
});

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? 'lightgreen' : '#fff',
    // styles we need to apply on draggables
    ...draggableStyle
});

class DraggableListView extends React.Component {
    constructor(props) {
        super(props);
    }

    getDraggableListNodes() {
        return this.props.items.map((item, index) => (
            <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                        className={"draggableListNode"}
                    >
                        {item.content}
                    </div>
                )}
            </Draggable>
        ))
    }

    getGroupLabelView(){
        return <div className={"groupListLabel"}>{this.props.label}</div>
    }

    render() {
        return (
            <Droppable droppableId={this.props.droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className={"draggableListGroup"}
                    >
                        {this.getGroupLabelView()}
                        {this.getDraggableListNodes()}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

const ConnectedView = connect(mapStateToProps, null)(DraggableListView);
export default ConnectedView


import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {Draggable, Droppable} from "react-beautiful-dnd";
import { Tooltip } from 'antd';

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
                        <Tooltip title={item.label} mouseEnterDelay={0.5}>
                            {item.label}
                        </Tooltip>
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

DraggableListView.propTypes={
    droppableId:PropTypes.oneOfType([
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
}

function mapStateToProps(state) {
    return state;
}

const ConnectedView = connect(mapStateToProps, null)(DraggableListView);
export default ConnectedView


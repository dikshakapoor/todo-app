import React from "react";

import completeButtonImg from "./_ionicons_svg_md-checkmark-circle.svg";
import removeButtonImg from "./_ionicons_svg_md-trash.svg";
import editButtonImg from "./_ionicons_svg_md-create.svg";

class TodoItemList extends React.Component {

  taskDescription = (discription, completedTaskStatus, id, updatedTaskStatus) => {
    if (updatedTaskStatus) {
      return (
        <div className="updatedtask" ><input className="editedTaskInput" onKeyPress={(event) => { this.props.handleEditedTask(event, id) }} /> </div>
      )
    }
    return (
      <div className="task" ><b className={completedTaskStatus ? "taskCompleted" : ""}> {discription}</b></div>)
  }
  renderItem = task => {
    const { id, discription, completedTaskStatus, updatedTaskStatus } = task;
    return (
      <div className="card" id={id} key={id}>
        {this.taskDescription(discription, completedTaskStatus, id, updatedTaskStatus)}
        <div className="icon" >
          <button className='completd' onClick={() => { this.props.handleCompletedItem(id) }}>
            <img src={completeButtonImg} alt="complete" style={{ width: "20px", heigth: "20px" }} /></button>
          <button className="removed" onClick={() => { this.props.handleDeltedItem(id) }} >
            <img src={removeButtonImg} alt="delete" style={{ width: "20px", height: "20px" }} /></button>
          <button className="edited" onClick={() => { this.props.updatedTaskList(id) }} >
            <img src={editButtonImg} alt="edit" style={{ width: "20px", heigth: "20px" }} /></button>
        </div>
      </div>
    )
  }

  render() {
    const { entries } = this.props;
    const items = entries && entries.map((task) => this.renderItem(task));
    return (
      <div>
        {items}
      </div>
    )
  }
}

export default TodoItemList;
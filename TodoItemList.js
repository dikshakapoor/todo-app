import React from "react";
import Card from "./Card";

class TodoItemList extends React.Component {

  // constructor(props) {
  //   super(props)
  //   // this.state = {
  //   //   editedTaskValue: '',
  //   //   task: []
  // }



  // onInputSubmit = () => {
  //   const { editedTaskValue, task } = this.state; // destructure
  //   const textValue = editedTaskValue.trim();
  //   if (!textValue) return;

  //   const newTask = {
  //     id: Date.now(),
  //     discription: textValue,
  //   };

  //   this.setState({
  //     currentInputValue: '',
  //     task: [...task, newTask],
  //   }, this.editedTaskValue)
  // }

  // handleUpdatedTask(event) {
  //   if (event.which === 13) {
  //     this.onInputSubmit();
  //   }
  // }


  renderItem = task => {

    return (
      <Card key={task.id} task={task} handleDeltedItem={this.props.handleDeltedItem} handleCompletedItem={this.props.handleCompletedItem}
        handleEditedTask={this.props.handleEditedTask}
        updatedTaskList={this.props.updatedTaskList} />

      // <div className="card" id={id} key={id}>
      //   {this.taskDescription(discription, completedTaskStatus, id, updatedTaskStatus)}
      //   <div className="icon" >
      //     <button className='completd' onClick={() => { this.props.handleCompletedItem(id) }}>
      //       <img src={completeButtonImg} alt="complete" style={{ width: "20px", heigth: "20px" }} /></button>
      //     <button className="removed" onClick={() => { this.props.handleDeltedItem(id) }} >
      //       <img src={removeButtonImg} alt="delete" style={{ width: "20px", height: "20px" }} /></button>
      //     <button className="edited" onClick={() => { this.props.updatedTaskList(id) }} >
      //       <img src={editButtonImg} alt="edit" style={{ width: "20px", heigth: "20px" }} /></button>
      //   </div>
      // </div>
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
import React, { memo } from 'react';
import './TodoManager.css';
import NavigationBar from "./NavigationBar";
import TodoItemList from "./TodoItemList";
import Form from "./Form";
class TodoManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
      currentInputValue: '',
    }
  }

  inputTask = (currentValue, currentInputValue) => {
    const { taskList } = this.state; // destructure


    const newTask = {
      id: Date.now(),
      discription: currentValue,
      completedTaskStatus: false,
      updatedTaskStatus: false,
    };
    this.setState({
      currentInputValue: '',
      taskList: [...taskList, newTask],
    }, this.createNewTask)
  }

  // keyPressHandle = (event) => {
  //   if (event.which === 13) {
  //     this.onInputSubmit();
  //   }
  // }

  // handleInputChange = (ev) => {
  //   let task = ev.target.value;
  //   this.setState({
  //     currentInputValue: task,
  //   })
  // }

  // this is to update the state after deleting a id

  // inputValue = (taskList) => {
  //   this.setState({ taskList })
  // }
  // inputTask = (currentValue) => {

  // }

  handleDeltedItem = (itemToBeDeleted) => {
    const updatedList = this.state.taskList.filter(function (taskList) {
      return taskList.id !== itemToBeDeleted;
    })
    this.setState({ taskList: updatedList })

  }

  handleCompletedItem = (itemToBeCompleted) => {
    const updatedList = this.state.taskList.map((task) => {
      if (task.id === itemToBeCompleted) {
        task.completedTaskStatus = !task.completedTaskStatus;
        return task;
      }
      return task;
    })
    this.setState({ taskList: updatedList })
  }

  handleEditedTask = (editedTask, id) => {
    const updatedList = this.state.taskList.map((task) => {
      if (task.id === id) {

        task.discription = editedTask;
        task.updatedTaskStatus = false;
        task.completedTaskStatus = false;
        return task
      }
      return task
    })
    this.setState({ taskList: updatedList })
  }

  markAllCompelte = () => {
    const updatedList = this.state.taskList.map((task) => {
      task.completedTaskStatus = true;
      return task;
    })
    this.setState({ taskList: updatedList })
  }

  deleteAll = () => {
    this.setState({ taskList: [] })
  }

  updatedTaskList = (id) => {
    const updatedList = this.state.taskList.map((task) => {
      if (task.id === id) {
        task.updatedTaskStatus = true;
        return task
      }
      return task
    }
    )
    this.setState({ taskList: updatedList })
  }


  render() {
    const { taskList } = this.state;
    return (
      <div className="container">
        <NavigationBar markAllCompelte={this.markAllCompelte} deleteAll={this.deleteAll} />
        <h2>TODO LIST</h2>
        <Form inputTask={this.inputTask} currnetInputValue={this.state.currentInputValue} />

        {/* <Form currentInputValue={this.currentInputValue} keyPressHandle={this.keyPressHandle} handleInputChange={this.handleInputChange} /> */}
        <ul className="taskList_wrapper">
          <TodoItemList entries={taskList} handleDeltedItem={this.handleDeltedItem} handleCompletedItem={this.handleCompletedItem}
            handleEditedTask={this.handleEditedTask}
            updatedTaskList={this.updatedTaskList} />
        </ul>
      </div>
    );
  }
}

export default TodoManager;



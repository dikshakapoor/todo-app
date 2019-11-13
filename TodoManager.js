import React, { memo } from 'react';
import './TodoManager.css';
import NavigationBar from "./NavigationBar";
import TodoItemList from "./TodoItemList";

class TodoManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskList: [],
      currentInputValue: '',
    }
  }

  onInputSubmit = () => {
    const { taskList, currentInputValue } = this.state; // destructure
    const textValue = currentInputValue.trim();
    if (!textValue) return;

    const newTask = {
      id: Date.now(),
      discription: textValue,
      completedTaskStatus: false,
      updatedTaskStatus: false,
    };
    this.setState({
      currentInputValue: '',
      taskList: [...taskList, newTask],
    }, this.createNewTask)
  }

  keyPressHandle = (event) => {
    if (event.which === 13) {
      this.onInputSubmit();
    }
  }

  handleInputChange = (ev) => {
    let task = ev.target.value;
    this.setState({
      currentInputValue: task,
    })
  }

  // this is to update the state after deleting a id
  handleDeltedItem = (itemToBeDeleted) => {
    let updatedList = this.state.taskList.filter(function (taskList) {
      return taskList.id !== itemToBeDeleted;
    })
    this.setState({ taskList: updatedList })

  }

  handleCompletedItem = (itemToBeCompleted) => {
    let updatedList = this.state.taskList.map((task) => {
      if (task.id === itemToBeCompleted) {
        task.completedTaskStatus = !task.completedTaskStatus;
        return task;
      }
      return task;
    })
    this.setState({ taskList: updatedList })
  }

  handleEditedTask = (event, id) => {
    let updatedList = this.state.taskList.map((task) => {
      if (event.which === 13 && task.id === id) {

        task.discription = event.currentTarget.value;
        task.updatedTaskStatus = false;
        task.completedTaskStatus = false;
        return task
      }
      return task

    })

    this.setState({ taskList: updatedList })

  }

  markAllCompelte = () => {
    let updatedList = this.state.taskList.map((task) => {
      task.completedTaskStatus = true;
      return task;
    })
    this.setState({ taskList: updatedList })
  }

  deleteAll = () => {
    let updatedList = [];
    this.setState({ taskList: updatedList })
  }

  updatedTaskList = (id) => {
    let updatedList = this.state.taskList.map((task) => {
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
    const { currentInputValue, taskList } = this.state;
    return (
      <div className="container">
        <NavigationBar markAllCompelte={this.markAllCompelte} deleteAll={this.deleteAll} />
        <h2>TODO LIST</h2>
        <div className="input-container">
          <input
            className="inputfield" type="text"
            value={currentInputValue}
            placeholder="Type here.."
            onKeyPress={this.keyPressHandle}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="wrapper">
          <button onClick={this.onInputSubmit} className="addTaskButton">
            <strong>ADD </strong>
          </button>
        </div>
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



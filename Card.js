import React from "react";
import completeButtonImg from "./_ionicons_svg_md-checkmark-circle.svg";
import removeButtonImg from "./_ionicons_svg_md-trash.svg";
import editButtonImg from "./_ionicons_svg_md-create.svg";

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editedTask: props.task.discription,
            // taskList: [],
            // currentInputValue: '',
        }
    }
    updateTask(event) {
        debugger;
        const editedTask = event.target.value.trim();
        this.setState({ editedTask })
    }

    keyPress = (event, id) => {
        if (event.which === 13) {
            const { editedTask } = this.state;
            this.props.handleEditedTask(editedTask, id);
        }
    }

    taskDescription = (discription, completedTaskStatus, id, updatedTaskStatus) => {
        const { editedTask } = this.state;

        if (updatedTaskStatus) {
            return (
                <div className="updatedtask"><input value={editedTask} key={id} className="editedTaskInput"
                    onChange={(event) => { this.updateTask(event) }}

                    // onKeyPress={(event) => { this.props.handleUpdatedTask(event); this.props.handleEditedTask(event, id) }} />
                    onKeyPress={(event) => { this.keyPress(event, id) }} />

                </div>
            )
        }
        return (
            <div className="task" ><b className={completedTaskStatus ? "taskCompleted" : ""}> {discription}</b></div>)
    }

    render() {
        const { id, discription, completedTaskStatus, updatedTaskStatus } = this.props.task;
        return (<div className="card" id={id} key={id}>
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
}

export default Card;
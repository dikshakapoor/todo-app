import React from "react";


class Form extends React.Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     taskList: [],
    //     //     currentInputValue: '',
    // }



    keyPressHandle = (event) => {
        if (event.which === 13) {
            // this.onInputSubmit(event);
            const textValue = event.currentTarget.value.trim();
            event.currentTarget.value = " ";

            // const textValue = currentInputValue.trim();
            if (!textValue) return;
            return this.props.inputTask(textValue, this.props.currentInputValue);
        }

    }

    // handleInputChange = (ev) => {
    //     let task = ev.target.value.trim();
    //     return this.props.inputTask(task, this.props.currentInputValue);
    //     //send task to manager
    //     // this.setState({
    //     //     currentInputValue: task,
    //     // })
    // }
    onInputSubmit = (event) => {

        // const { taskList, currentInputValue } = this.state; // destructure
        // console.log(document.querySelector("data-new-task = newTask"));

        const textValue = document.querySelector('[data-new-task = "newTask"]').value.trim();;

        // const textValue = currentInputValue.trim();
        if (!textValue) return;
        return this.props.inputTask(textValue, this.props.currentInputValue);

        // const newTask = {
        //     id: Date.now(),
        //     discription: textValue,
        //     completedTaskStatus: false,
        //     updatedTaskStatus: false,
        // };
        // this.setState({
        //     currentInputValue: '',
        //     taskList: [...taskList, newTask],
        // });

        // this.props.inputValue(taskList);
        // { console.log(this.taskLsit) };
    }

    render() {
        // const currentInputValue = "";
        // const { currentInputValue, taskList } = this.state;
        return (
            < div >
                <div className="input-container">
                    <input
                        className="inputfield" data-new-task="newTask"
                        value={this.props.currentInputValue}
                        placeholder="Type here.."
                        onKeyPress={(event) => { this.keyPressHandle(event); }}
                    // onChange={(event) => { this.handleInputChange(event); console.log(event) }}

                    />
                </div>
                <div className="wrapper">
                    <button onClick={() => { this.onInputSubmit() }} className="addTaskButton">
                        <strong>ADD </strong>
                    </button>
                </div>
            </div >
        )
    }
}


export default Form;
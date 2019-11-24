let controller = (function (dataCtr, UICtr) {
  let task, addItem;
  let fetchNewTask = function () {
    task = UICtr.getInput().trim();
    if (!task) return;
    // add item to datacontroller
    addItem = dataCtr.addNewTask(task);
    //add item to UIController
    UICtr.renderItems(addItem);
    // clearing input field
    UICtr.clearInputField();
  };
  let setEventListeners = function (updateItemId) {
    debugger;
    document
      .getElementById("addTaskButton")
      .addEventListener("click", fetchNewTask);
    document
      .getElementById("taskList_wrapper")
      .addEventListener("click", getTypeOfEvent);
    document
      .getElementById("inputfield")
      .addEventListener("keypress", addTaskOnEnter);
    document
      .getElementById("markAllComplete")
      .addEventListener("click", markAllComplete);
    document
      .getElementById("deleteAll")
      .addEventListener("click", deleteAll);
    // if (updateItemId) {

    //   document
    //     .getElementById("editedTaskInputField")
    //     .addEventListener("keyup", editTaskOnEnter(updateItemId)(event));
    // }
  };
  debugger;
  // function taskModifierFromConrollerCallback ()
  function editTaskOnEnter(id) {
    return function (ev) {
      if (ev.keyCode !== 13 || ev.which !== 13) return null;
      element = document.getElementById("editedTaskInputField");
      element.classList.add("removeFocus");
      let task = element.value;
      // element.setAttribute("contenteditable", false);
      updateEditedTask(task, id);
    };
  }

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      fetchNewTask();
    }
  }

  function getTypeOfEvent(event) {
    let fetchEventType = event.target.parentNode.className;
    if (
      fetchEventType == "completed" ||
      fetchEventType == "removed" ||
      fetchEventType == "edited"
    ) {
      itemId = parseInt(
        parseInt(event.target.parentNode.parentNode.previousSibling.id)
      );

      switch (fetchEventType) {
        case "completed": {
          let taskList = dataCtr.setStatusCompeleted(itemId);
          UICtr.renderItems(taskList);
          break;
        }
        case "removed": {
          let taskList = dataCtr.deleteTask(itemId);
          UICtr.renderItems(taskList);
          break;
        }
        case "edited": {
          let taskList = dataCtr.setStatusEdited(itemId);
          taskObj = UICtr.renderItems(taskList);

          dataCtr.setEditedTask(taskObj, itemId);
          setEventListeners(itemId.toString());
          break;
        }
      }
    }
  }

  function updateEditedTask(task, Id) {
    Id = Number(Id);
    dataCtr.setEditedTask(task, Id);
  }

  function markAllComplete() {
    let taskList = dataCtr.markListCompleted();
    UICtr.renderItems(taskList);
  }

  function deleteAll() {
    let taskList = dataCtr.deleteTodoList();
    UICtr.renderItems(taskList);
  }
  return {
    init: function () {
      setEventListeners();
    }
  };
})(dataController, UIController);

controller.init();

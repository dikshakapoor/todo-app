let controller = (function(dataCtr, UICtr) {
  let task, addItem;
  let ctrlAddItem = function() {
    task = UICtr.getInput().replace(/^\s+|\s+$/gm, "");
    if (task !== "" && task !== undefined) {
      // add item to datacontroller
      addItem = dataCtr.addNewTask(task);
      //add item to UIController
      UICtr.renderItems(addItem);
      // clearing input field
      UICtr.clearInputField();
    }
  };
  let setEventListeners = function() {
    document
      .getElementsByClassName("addTaskButton")[0]
      .addEventListener("click", ctrlAddItem);
    document
      .getElementsByClassName("taskList_wrapper")[0]
      .addEventListener("click", getTypeOfEvent);
    document.addEventListener("keypress", addTaskOnEnter(event));
    document
      .getElementsByClassName("markAllComplete")[0]
      .addEventListener("click", markAllComplete);
    document
      .getElementsByClassName("deleteAll")[0]
      .addEventListener("click", deleteAll);
  };

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      ctrlAddItem();
    }
  }

  function getTypeOfEvent(event) {
    let fetchEventType = event.target.parentNode.className;
    if (
      fetchEventType == "completed" ||
      fetchEventType == "removed" ||
      fetchEventType == "edited"
    ) {
      itemId = parseInt(event.target.parentNode.parentNode.previousSibling.id);
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
          UICtr.renderItems(taskList);
          break;
        }
      }
    }
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
    init: function() {
      setEventListeners();
    },
    updateEditedTask: function(task, id) {
      dataCtr.updateTask(task, id);
    }
  };
})(dataController, UIController);

controller.init();

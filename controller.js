let controller = (function(dataCtr, UICtr) {
  let task, addItem;
  let fetchNewTask = function() {
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
  let setEventListeners = function(updateItemId) {
    document
      .getElementsByClassName("addTaskButton")[0]
      .addEventListener("click", fetchNewTask);
    document
      .getElementsByClassName("taskList_wrapper")[0]
      .addEventListener("click", getTypeOfEvent);
    document
      .getElementsByClassName("inputfield")[0]
      .addEventListener("keypress", addTaskOnEnter);
    document
      .getElementsByClassName("markAllComplete")[0]
      .addEventListener("click", markAllComplete);
    document
      .getElementsByClassName("deleteAll")[0]
      .addEventListener("click", deleteAll);
    if (updateItemId) {
      document
        .getElementById(updateItemId)
        .addEventListener("keyup", editTaskOnEnter(updateItemId));
    }
  };
  function editTaskOnEnter(id) {
    return function(ev) {
      if (ev.keyCode !== 13 || ev.which !== 13) return null;
      element = document.getElementById(id);
      element.classList.add("edit");
      let task = element.textContent;
      element.setAttribute("contenteditable", false);

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
          UICtr.renderItems(taskList);
          setEventListeners(itemId.toString());
          break;
        }
      }
    }
  }

  function updateEditedTask(task, Id) {
    Id = Number(Id);
    dataCtr.updateTask(task, Id);
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
    }
  };
})(dataController, UIController);

controller.init();

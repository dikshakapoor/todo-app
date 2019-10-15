let dataController = (function() {
  let TaskObject = function(task) {
    this.text = task;
    this.id = Date.now();
    this.status = "";
  };
  let taskMap = new Map();
  return {
    addNewTask: function(task) {
      let newTask;
      newTask = new TaskObject(task);
      taskMap.set(newTask.id, newTask);
      return taskMap;
    },
    setStatusCompeleted: function(itemId) {
      taskMap.get(itemId).status = "completed";
      return taskMap;
    },
    deleteTask: function(itemId) {
      taskMap.delete(itemId);
      return taskMap;
    },
    setStatusEdited: function(itemId) {
      taskMap.get(itemId).status = "edited";
      return taskMap;
    },
    updateTask: function(updatedTask, id) {
      taskMap.get(id).text = updatedTask;
    },
    markListCompleted: function() {
      taskMap.forEach(function(task) {
        task.status = "completed";
      });
      return taskMap;
    },
    deleteTodoList: function() {
      taskMap.clear();
      return taskMap;
    }
  };
})();

let UIController = (function() {
  function editTaskOnEnter(id) {
    return function(ev) {
      if (ev.keyCode !== 13) return null;
      element = document.getElementById(id);
      element.classList.add("edit");
      let task = element.textContent;
      task.text = task;
      element.setAttribute("contenteditable", false);
      controller.updateEditedTask(task, id);
    };
  }
  return {
    getInput: function() {
      return document.querySelector(".inputfield").value;
    },
    editTask: function(task) {
      let element = document.getElementById(task.id);
      element.classList.remove("edit");
      element.setAttribute("contenteditable", true);
      element.focus();
      element.addEventListener("keyup", editTaskOnEnter(task.id));
    },
    renderItems: function(taskList) {
      let element = document.getElementsByClassName("taskList_wrapper");
      element[0].innerHTML = "";
      taskList.forEach(function(task) {
        let html;
        html =
          '<div class = "card"><div class = "task" id = %id%><b>%text%</b>' +
          '</div><div class = "icon"><button class = "completed"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
          '</button><button class = "removed"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edited">' +
          '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>';
        html = html.replace("%text%", task.text);
        html = html.replace("%id%", task.id);
        element[0].insertAdjacentHTML("beforeend", html);
        switch (task.status) {
          case "edited":
            UIController.editTask(task);
            break;
          case "completed":
            document.getElementById(task.id).classList.add("checked");
            break;
        }
      });
    },
    clearInputField: function() {
      document.getElementsByClassName("inputfield")[0].value = "";
    }
  };
})();

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

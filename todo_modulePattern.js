// module for data storage 
let dataController = (function () {
  let TaskObject = function (task) {
    this.text = task;
    this.id = Date.now();
    this.status = "";
  };
  let taskMap = new Map();
  return {
    addTask: function (task) {
      let newTask;
      newTask = new TaskObject(task);
      taskMap.set(newTask.id, newTask);
      return taskMap;
    },
    markTaskCompeleted: function (itemId) {
      taskMap.get(itemId).status = "completed";
      return taskMap;
    },
    deleteTask: function (itemId) {
      taskMap.delete(itemId);
      return taskMap;
    },
    markTaskEdited: function (itemId) {
      taskMap.get(itemId).status = "edited";
      return taskMap;
    },
    updateTask: function (updatedTask, id) {
      taskMap.get(id).text = updatedTask;
    },
    completeAll: function () {
      taskMap.forEach(function (task) {
        task.status = "completed";
      })
      return taskMap;
    },
    removeAll: function () {
      taskMap.clear();
      return taskMap;
    },
  }
})();

// module for UI 
let UIController = (function () {
  function editTaskOnEnter(id) {
    return function (ev) {
      if (ev.keyCode !== 13) return null;
      element = document.getElementById(id);
      element.classList.add("edit");
      let task = element.textContent;
      task.text = task;
      element.setAttribute("contenteditable", false);
      controller.editedTodoTask(task, id);
    }
  }
  return {
    getEditedTask(task) {
      this.todoTask = task;
      return todoTask;

    },
    getInput: function () {
      return document.querySelector(".inputfield").value;
    },
    editTask: function (task) {
      let element = document.getElementById(task.id);
      element.classList.remove("edit");
      element.setAttribute("contenteditable", true);
      element.focus();
      element.addEventListener("keyup", editTaskOnEnter(task.id))
    },
    renderItems: function (taskList) {
      let element = document.getElementsByClassName('taskList_wrapper');
      element[0].innerHTML = "";
      taskList.forEach(function (task) {
        let html;
        // create html string with placeholder tag
        html = '<div class = "card"><div class = "task" id = %id%><b>%text%</b>' +
          '</div><div class = "icon"><button class = "completed"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
          '</button><button class = "removed"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edited">' +
          '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>'
        //repclace palceholder with html text;
        html = html.replace('%text%', task.text);
        html = html.replace('%id%', task.id);
        element[0].insertAdjacentHTML('beforeend', html);
        switch (task.status) {
          case "edited":
            UIController.editTask(task);
            break;
          case "completed":
            document.getElementById(task.id).classList.add("checked");
            break;
        }
      })
    },
    clearFields: function () {
      document.getElementsByClassName("inputfield")[0].value = "";
    },
  }
})();

//  global app controller
let controller = (function (dataCtr, UICtr) {
  let task, addItem;
  let ctrlAddItem = function () {
    task = UICtr.getInput().replace(/^\s+|\s+$/gm, '');
    if ((task !== "") && (task !== undefined)) { // add item to datacontroller
      addItem = dataCtr.addTask(task);
      //add item to UIController
      UICtr.renderItems(addItem);
      // clearing input field
      UICtr.clearFields();
    }
  }
  let setEventListeners = function () {
    document.getElementsByClassName("addTaskButton")[0].addEventListener('click', ctrlAddItem);
    document.getElementsByClassName("taskList_wrapper")[0].addEventListener('click', typeOfEvent);
    document.addEventListener('keypress', addTaskOnEnter(event));
    document.getElementsByClassName("markAllComplete")[0].addEventListener('click', markAllComplete);
    document.getElementsByClassName("deleteAll")[0].addEventListener('click', deleteAll);
  }

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      ctrlAddItem();
    }
  }

  function typeOfEvent(event) {
    let eventType = event.target.parentNode.className;
    if (eventType == "completed" || eventType == "removed" || eventType == "edited") {
      itemId = parseInt(event.target.parentNode.parentNode.previousSibling.id);
      switch (eventType) {
        case "completed": {
          let taskList = dataCtr.markTaskCompeleted(itemId);
          UICtr.renderItems(taskList);
          break;
        }
        case "removed": {
          let taskList = dataCtr.deleteTask(itemId);
          UICtr.renderItems(taskList);
          break;
        }
        case "edited": {
          let taskList = dataCtr.markTaskEdited(itemId);
          UICtr.renderItems(taskList);
          break;
        }
      }
    }
  }

  function markAllComplete() {
    let taskList = dataCtr.completeAll();
    UICtr.renderItems(taskList);
  };

  function deleteAll() {
    let taskList = dataCtr.removeAll();
    UICtr.renderItems(taskList);
  };
  return {
    init: function () {
      setEventListeners();
    },
    editedTodoTask: function (task, id) {
      dataCtr.updateTask(task, id);
    }
  }

})(dataController, UIController);

controller.init();
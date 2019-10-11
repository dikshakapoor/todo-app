// module for data storage 
let dataController = (function () {
  let TaskObject = function (task) {
    this.text = task;
    this.id = Date.now();
    this.completed = false;
    this.deleted = false;
    this.edited = false;
    this.taskStatus = "";
  };
  let taskMap = new Map();
  return {
    addTask: function (task) {
      let newTask;
      newTask = new TaskObject(task);
      taskMap.set(newTask.id, newTask);
      console.log(taskMap);
      return taskMap;
    },
    markTaskCompelete: function (itemId) { // name change 
      taskMap.get(itemId).completed = true;
      taskMap.get(itemId).taskStatus = "completed";
      //  console.log(taskMap);
      return taskMap;
    },
    deleteTask: function (itemId) {
      taskMap.get(itemId).deleted = true;
      taskMap.get(itemId).taskStatus = "deleted"; // dont need this just setting 
      console.log("the deleteselectd works");
      taskMap.delete(itemId);
      return taskMap;
    },
    markTaskEdit: function (itemId) {
      taskMap.get(itemId).edited = true;
      taskMap.get(itemId).taskStatus = "edited";
      return taskMap;
    },
    completeAll: function () {
      taskMap.forEach(function (task) {
        task.completed = true;
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
  function editTaskOnEnter(element) {
    return function (ev) {
      if (ev.keyCode !== 13) return null;
      element.classList.add("edit");
      let task = element.textContent;
      element.setAttribute("contenteditable", false);
      task.text = task;
    }
  }
  return {
    getInput: function () {
      return document.querySelector(".inputfield").value;
    },
    editTask: function (task) {
      let element = document.getElementById(task.id);
      element.classList.remove("edit");
      element.setAttribute("contenteditable", true);
      element.focus();
      element.addEventListener("keyup", editTaskOnEnter(element)) // changed
    },
    renderItems: function (taskList) {
      let element = document.getElementsByClassName('taskList_wrapper');
      element[0].innerHTML = "";
      taskList.forEach(function (task) {
        let html;
        // create html string with placeholder tag
        html = '<div class = "card"><div class = "task" id = %id%><b>%value%</b>' +
          '</div><div class = "icon"><button class = "completed"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
          '</button><button class = "removed"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edited">' +
          '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>'
        //repclace palceholder with html text;
        html = html.replace('%value%', task.text);
        // place the it into DOM
        html = html.replace('%id%', task.id);
        element[0].insertAdjacentHTML('beforeend', html);

        //switch(task)
        switch (task.taskStatus) {
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
      document.getElementsByClassName("inputfield").value = "";
      console.log("it works");
    },
  }
})();

//  global app controller
let controller = (function (dataCtr, UICtr) {
  let task, addItem;
  let ctrlAddItem = function () {
    task = UICtr.getInput().replace(/^\s+|\s+$/gm, '');
    if ((task !== "") && (task !== undefined)) // checking input is present
    { // add item to datacontroller
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
  }

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      ctrlAddItem();
    }
  }

  function typeOfEvent(event) {
    console.log("working");
    let eventType = event.target.parentNode.className;
    console.log("the event is ", eventType);
    if (eventType == "completed" || eventType == "removed" || eventType == "edited") {
      itemId = parseInt(event.target.parentNode.parentNode.previousSibling.id);
      console.log("this is item id ", itemId);
      switch (eventType) {
        case "completed": {
          let taskList = dataCtr.markTaskCompelete(itemId);
          UICtr.renderItems(taskList);
          break;
        }
        case "removed": {
          console.log("type of event works for remove");
          let taskList = dataCtr.deleteTask(itemId);
          UICtr.renderItems(taskList);
          break;
        }
        case "edited": {
          let taskList = dataCtr.markTaskEdit(itemId);
          UICtr.renderItems(taskList);
          break;
        }
      }
    }
  }
  document.getElementsByClassName("markAllComplete")[0].addEventListener('click', function () {
    let taskList = dataCtr.completeAll();
    console.log(taskList);
    UICtr.renderItems(taskList);
    dataCtr.resetTaskProperties();
  });
  // delete all task for UI
  document.getElementsByClassName("deleteAll")[0].addEventListener('click', function () {
    let taskList = dataCtr.removeAll();
    console.log(taskList);
    UICtr.renderItems(taskList);
  });
  return {
    init: function () {
      console.log("Application has Started ");
      setEventListeners();
    }
  }
})(dataController, UIController);

controller.init();
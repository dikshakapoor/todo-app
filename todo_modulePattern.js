// module for data storage 
var dataController = (function () {
  var TaskObject = function (task) {
    this.text = task;
    this.id = Date.now();
    this.completed = false;
    this.deleted = false;
    this.edited = false;
    this.taskStatus = "";
    // this.property = null;
  };
  var taskMap = new Map();
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
      //  console.log(taskMap);
      return taskMap;
    },
    deleteTask: function (itemId) {
      taskMap.get(itemId).deleted = true;
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
var UIController = (function () {
  var editTaskOnEnter = function (e, element) {
    if (e.keyCode === 13) {
      element.classList.add("edit");
      let task = element.textContent;
      console.log(task); // add to data module
      element.setAttribute("contenteditable", false);
      console.log("the text edited", task);
      // editing the map of task
      task.text = task;
      console.log(task.text);
      console.log(taskList);
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
      element.addEventListener("keydown", editTaskOnEnter(event, element)) // chnaged
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
        task.taskStatus
        if (task.edited == true) {
          UIController.editTask(task);
        } else if (task.completed == true)
          document.getElementById(task.id).classList.add("checked");
      })
    },
    clearFields: function () {
      document.getElementsByClassName("inputfield").value = "";
      console.log("it works");
    },
  }
})();

//  global app controller
var controller = (function (dataCtr, UICtr) {
  var task, addItem;

  // var typeOfEvent = function (event) {
  //   console.log("working");
  //   var eventType = event.target.parentNode.className;
  //   console.log("the event is ", eventType);
  //   if (eventType == "completed" || eventType == "removed" || eventType == "edited") {
  //     itemId = parseInt(event.target.parentNode.parentNode.previousSibling.id);
  //     console.log("this is item id ", itemId);
  //     if (eventType == "completed") {
  //       let taskList = dataCtr.markTaskCompelete(itemId);
  //       UICtr.renderItems(taskList);
  //       //UICtr.displayCompletedTask(taskEdited);
  //     } else if (eventType == "removed") {
  //       console.log("type of event works for remove");
  //       let taskList = dataCtr.deleteTask(itemId);
  //       UICtr.renderItems(taskList);
  //     } else if (eventType == "edited") {
  //       let taskList = dataCtr.markTaskEdit(itemId);
  //       UICtr.renderItems(taskList);
  //     }
  //   }
  // }
  var ctrlAddItem = function () {
    // get input data
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
  var setEventListeners = function () {
    document.getElementsByClassName("addTaskButton")[0].addEventListener('click', ctrlAddItem);

    document.getElementsByClassName("taskList_wrapper")[0].addEventListener('click', typeOfEvent);
    document.addEventListener('keypress', addTaskOnEnter(event));
  }

  function addTaskOnEnter(event) {
    if (event != undefined && (event.keyCode === 13 || event.which === 13)) {
      ctrlAddItem();
    }
  }
  // document.getElementsByClassName("taskList_wrapper")[0].addEventListener('click', typeOfEvent);

  function typeOfEvent(event) {
    console.log("working");
    var eventType = event.target.parentNode.className;
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

        // if (eventType == "completed") {
        //   let taskList = dataCtr.markTaskCompelete(itemId);
        //   UICtr.renderItems(taskList);
        //   //UICtr.displayCompletedTask(taskEdited);
        // } else if (eventType == "removed") {
        //   console.log("type of event works for remove");
        //   let taskList = dataCtr.deleteTask(itemId);
        //   UICtr.renderItems(taskList);
        // } else if (eventType == "edited") {
        //   let taskList = dataCtr.markTaskEdit(itemId);
        //   UICtr.renderItems(taskList);
        // }
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
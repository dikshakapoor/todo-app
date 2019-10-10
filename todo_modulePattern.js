// module for data storage 
var dataController = (function () {
  var TaskObject = function (task) {
    this.text = task;
    this.id = Date.now();
    this.completed = false;
    this.deleted = false;
    this.edit = false;
  };


  //creating data structure if input
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
      taskMap.get(itemId).edit = true;
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

    resetTaskProperties: function () {

      // taskMap.forEach(function(task) {
      // task.edit = "false";
      // task.completed = "false";
      //} 
      //)
    }

  }
})();



// module for UI 
var UIController = (function () {

  return {
    getInput: function () {
      return document.querySelector(".inputfield").value;
    },

    editTask: function (task) {
      let element = document.getElementById(task.id);
      element.classList.remove("edit");
      element.setAttribute("contenteditable", true);
      element.focus();
      element.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
          element.classList.add("edit");
          var value = element.textContent;
          element.setAttribute("contenteditable", false);
          // editing the map of task
          task.text = value;
          console.log(taskList);

        }
      })

    },
    renderItems: function (taskList) {


      let element = document.getElementsByClassName('taskList_wrapper');
      element[0].innerHTML = "";
      taskList.forEach(function (task) {

        let html;
        // create html string with placeholder tag;

        html = '<div class = "card"><div class = "task" id = %id%><b>%value%</b>' +
          '</div><div class = "icon"><button class = "complete"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
          '</button><button class = "remove"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edit">' +
          '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>'

        //repclace palceholder with html text;

        html = html.replace('%value%', task.text);

        // place the it into DOM
        html = html.replace('%id%', task.id);

        element[0].insertAdjacentHTML('beforeend', html); //just checking
        if (task.edit == true) {
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
  var ctrlAddItem = function () {
      // get input data
      task = UICtr.getInput().replace(/^\s+|\s+$/gm, '');
      if ((task !== "") && (task !== undefined)) // checking input is present
      {
        // add item to datacontroller
        addItem = dataCtr.addTask(task);

        //add item to UIController
        UICtr.renderItems(addItem);

        // clearing input field
        UICtr.clearFields();
      }
    },


    setEventListeners = function () {
      document.getElementsByClassName("addTaskButton")[0].addEventListener('click', ctrlAddItem);
      document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }
      });
    }
  document.getElementsByClassName("taskList_wrapper")[0].addEventListener('click', typeOfEvent);


  function typeOfEvent(event) {
    console.log("working");
    var eventType = event.target.parentNode.className;
    console.log("the event is ", eventType);
    if (eventType == "complete" || eventType == "remove" || eventType == "edit") {
      itemId = parseInt(event.target.parentNode.parentNode.previousSibling.id);

      console.log("this is item id ", itemId);
      if (eventType == "complete") {
        let taskEdited = dataCtr.markTaskCompelete(itemId);

        UICtr.renderItems(taskEdited);

        //UICtr.displayCompletedTask(taskEdited);
      } else if (eventType == "remove") {
        console.log("type of event works for remove");
        let taskEdited = dataCtr.deleteTask(itemId);
        UICtr.renderItems(taskEdited);
      } else if (eventType == "edit") {
        let taskEdited = dataCtr.markTaskEdit(itemId);
        UICtr.renderItems(taskEdited);
      }

    }
    dataCtr.resetTaskProperties();
  }


  document.getElementsByClassName("markAllComplete")[0].addEventListener('click', function () {
    let taskCompelete = dataCtr.completeAll();
    console.log(taskCompelete);
    UICtr.renderItems(taskCompelete);
    dataCtr.resetTaskProperties();

  });

  // delete all task for UI
  document.getElementsByClassName("deleteAll")[0].addEventListener('click', function () {
    let taskRemoved = dataCtr.removeAll();
    console.log(taskRemoved);
    UICtr.renderItems(taskRemoved);

  });

  return {
    init: function () {
      console.log("Application has Started ");
      setEventListeners();
    }
  }
})(dataController, UIController);

controller.init();
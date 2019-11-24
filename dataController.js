let dataController = (function () {
  let TaskObject = function (task) {
    this.text = task;
    this.id = Date.now();
    this.status = "";
  };
  let taskMap = new Map();
  return {
    addNewTask: function (task) {
      let newTask;
      newTask = new TaskObject(task);
      taskMap.set(newTask.id, newTask);
      return taskMap;
    },
    setStatusCompeleted: function (itemId) {
      taskMap.get(itemId).status = "completed";
      return taskMap;
    },
    deleteTask: function (itemId) {
      taskMap.delete(itemId);
      return taskMap;
    },
    setStatusEdited: function (itemId) {
      taskMap.get(itemId).status = "edited";
      return taskMap;
    },
    setEditedTask: function (editedTask, id) {
      taskMap.get(id).text = editedTask;
      taskMap.get(id).status = "";
    },
    markListCompleted: function () {
      taskMap.forEach(function (task) {
        task.status = "completed";
      });
      return taskMap;
    },
    deleteTodoList: function () {
      taskMap.clear();
      return taskMap;
    },
    setEditedTask: function (taskListObj, itemId) {
      taskMap.get(itemId).text = taskListObj.editedTaskDescription;
      return taskMap;


    }
  };
})();
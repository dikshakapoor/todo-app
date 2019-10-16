let UIController = (function() {
  return {
    getInput: function() {
      return document.querySelector(".inputfield").value;
    },
    editTask: function(task) {
      let element = document.getElementById(task.id);
      element.classList.remove("edit");
      element.setAttribute("contenteditable", true);
      element.focus();
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
            {
              let element = document.getElementById(task.id);
              element.classList.remove("edit");
              element.setAttribute("contenteditable", true);

              element.focus();
            }
            break;
          case "completed":
            document.getElementById(task.id).classList.add("checked");
            break;
        }
      });
      return taskList;
    },
    clearInputField: function() {
      document.getElementsByClassName("inputfield")[0].value = "";
    }
  };
})();

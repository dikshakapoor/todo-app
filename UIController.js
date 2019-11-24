let UIController = (function () {

  // function handleKeyPress(element) {
  //   return function (event) {
  //     if (event.keyCode !== 13 || event.which !== 13) return null;
  //     console.log(element.value);

  //   };
  // }
  function setEditedInput(editedText, id, element) {

    return {
      editedText: editedText,
      taskId: id,
      domElement: element,
    }

  }
  let editedTaskDescription = "";

  return {
    getInput: function () {
      return document.querySelector("#inputfield").value;
    },
    editTask: function (task) {
      let element = document.getElementById(task.id);
      element.setAttribute("contenteditable", true);
      element.focus();
    },

    clearInputField: function () {
      document.getElementById("inputfield").value = "";
    },

    renderItems: function (taskList) {

      debugger;
      let element = document.getElementById("taskList_wrapper");
      element.innerHTML = "";
      taskList.forEach(function (task) {
        let html;
        html =
          '<div class = "card"><div class = "task" id = %id%><b>%text%</b>' +
          '</div><div class = "icon"><button class = "completed"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">' +
          '</button><button class = "removed"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edited">' +
          '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>';

        html = html.replace("%text%", task.text);
        html = html.replace("%id%", task.id);
        element.insertAdjacentHTML("beforeend", html);
        let selectedElement = document.getElementById(task.id);

        switch (task.status) {
          case "edited":
            {
              selectedElement.innerHTML = "";

              let element = document.createElement("input");
              selectedElement.appendChild(element);
              debugger;
              element.value = task.text;
              element.addEventListener("keydown", handleKeyPress);
              function handleKeyPress(event) {
                if (event.keyCode !== 13 || event.which !== 13) return null;
                editedTaskDescription = element.value;
                // setEditedInput(element.value, task.id, element)
                debugger;
              }

              break;
            }
          case "completed":
            selectedElement.classList.add("checked");
            break;
        }
      });

      return {
        allTask: taskList,
        editedTaskDescription: editedTaskDescription


      }

    },

  };
})();


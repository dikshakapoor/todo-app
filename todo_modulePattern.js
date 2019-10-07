// modular pattern






// module for data storage 
var dataController = (function(){
   var TaskObject = function(task){
       this.text = task;
       this.id = Date.now();
       this.completed = false;
   };

   
//creating data structure if input
    var taskMap = new Map();
    
  

return  {
    
    addTask : function(task){
        let newTask; 
        newTask = new TaskObject(task);
        taskMap.set(newTask.id, newTask );

        console.log(taskMap);
        return newTask;
        
    },
    testing : function (){
        console.log (taskMap);
    }

}
})(); 



// module for UI 
var UIController  = (function(){

    DOMStrings = {
        inputValue: "#inputfield",
        inputButton: "#btn",
        incomeContainer:"#taskList_wrapper",
    }

 return {getInput: function (){
        return document.querySelector(DOMStrings.inputValue).value;
            },
        getDOMString: function (){
            return DOMStrings ;
        },
        addListItem: function(task) {
        var html,newhtml,element;
        // create html string with placeholder tag;

        html =  '<div class = "card"><div class = "task" id = %id%><b>%Value%</b>'+
        '</div><div class = "icon"><button class = "complete"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">'+
        '</button><button class = "remove"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edit">'+
        '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>'
        
        //repclace palceholder with html text;
        newhtml = html.replace('%Value%',task.text);
        
        // place the it into DOM
        newhtml = newhtml.replace('%id%',task.id);
        element = DOMStrings.incomeContainer;
       
        document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);

        },
        clearFields: function (){
        document.getElementById("inputfield").value = "";
        console.log("it works");
        }
      }
 })();





//  global app controller
var controller = (function(dataCtr, UICtr){    // changing the name of data and UI controller
var input, addItem;

var DOM = UICtr.getDOMString();
console.log(DOM);
var ctrlAddItem = function (){
    // get input data
     input = UICtr.getInput();
    
// add item to datacontroller
    addItem = dataCtr.addTask(input);

//add item to UIController
    UICtr.addListItem(addItem);

// clearing input field
    UICtr.clearFields();
}
var setEventListeners = function () {
document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

document.addEventListener('keypress', function(event){
    if (event.keyCode === 13 || event.which === 13){
       ctrlAddItem ();
    }
});
}
return {
    init : function(){
     console.log ("Application has Started ");
     setEventListeners();
    }
}
})(dataController, UIController);

controller.init();  // this line of code triggers the event listener and start the application 
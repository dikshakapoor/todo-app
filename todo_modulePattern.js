

// module for data storage 
var dataController = (function(){
        var TaskObject = function(task){
            this.text = task;
            this.id = Date.now();
            this.completed = false;
            this.deleted = false;
            this.edit = false;
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
    },
   
    compeleteSelectedItem: function(itemID){
       
         
         taskMap.get(itemID).completed = true;
         console.log(taskMap);
         return taskMap;
    },
    deleteSelectedItem: function(itemID ){
       
         taskMap.get(itemID).deleted = true;
         console.log("the deleteselectd works");
         return taskMap;   
    
    },
    editSelectedItem: function(itemID){
         taskMap.get(itemID).edit = true;
         return taskMap;
    
    }, 
    completeAll: function() {
         taskMap.forEach(function(task){
         task.completed = true;
          
    })
    return taskMap;},

    removeAll: function(){
         taskMap.forEach(function(task){
         task.deleted = true;
         
    
    })
    return taskMap;},
    
}
})(); 



// module for UI 
var UIController  = (function(){

    DOMStrings = {
         inputValue: "#inputfield",
         inputButton: "#btn",
         inputContainer:"#taskList_wrapper",
    }

 return { getInput: function (){
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
            element = DOMStrings.inputContainer;
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);

        },

        clearFields: function (){
            document.getElementById("inputfield").value = "";
            console.log("it works");
        },
       
        displayCompletedTask: function(taskMap){
            taskMap.forEach(function (task)
            {if (task.completed == true)
            document.getElementById(task.id).classList.add("checked");
        })
        },
            
        deletedTask: function(taskMap){ 
            taskMap.forEach(function(task)
            {if (task.deleted == true)
                {let element = document.getElementById(task.id);
                console.log("element",element.parentNode);
                let element1= document.getElementById('taskList_wrapper');
                element1.removeChild(element.parentNode);
                taskMap.delete(task.id);}
            }
            )},
        
        displayEditedTask: function(taskMap){
            taskMap.forEach ( function(task)
            {if (task.edit == true)
                    { let element = document.getElementById(task.id);
                    element.classList.remove("edit");
                    element.setAttribute("contenteditable", true);
                    element.focus();
                    element.addEventListener("keydown", function (e)
                    { if (e.keyCode === 13){  
                        element.classList.add("edit");
                        var value = element.textContent;  
                        element.setAttribute("contenteditable", false);
                        task.text = value;
                            }})
                    } 
            }
            )},

            
                    // if (task.completed == true) {
                    //     document.getElementById(task.id).classList.add("checked");
                    // }
        //            if (task.deleted == true){
        //             console.log("task need to be deleted");
        //             let element = document.getElementById(task.id);
        //             console.log("element",element.parentNode);
        //             let element1= document.getElementById('taskList_wrapper');
        //             element1.removeChild(element.parentNode);
        //             taskMap.delete(task.id);
        //             console.log(taskMap);
        //             }
        //            if (task.edit == true){
                    
        //             let element = document.getElementById(task.id);
        //             element.classList.remove("edit");
        //             element.setAttribute("contenteditable", true);
        //             element.focus();
        //             element.addEventListener("keydown", function (e)
        //             { if (e.keyCode === 13){  
        
        //             element.classList.add("edit");
        //             var value = element.textContent;  
        //             element.setAttribute("contenteditable", false);
                    
        //             // editing the array of task
        //             task.text = value;
        //             console.log (taskMap);
        //         }
        //     });
              
        // }
 
     // }
      
    }
    
}
)();





//  global app controller
var controller = (function(dataCtr, UICtr){    // changing the name of data and UI controller
     var input, addItem;

     var DOM = UICtr.getDOMString();
     console.log(DOM);
     var ctrlAddItem = function (){
        // get input data
         input = UICtr.getInput();

         if ((input !== "") &&  (input !== undefined)) // checking input is present
         {
         // add item to datacontroller
         addItem = dataCtr.addTask(input);

         //add item to UIController
         UICtr.addListItem(addItem);

         // clearing input field
         UICtr.clearFields();
}
}
     var setEventListeners = function () {
         document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

         document.addEventListener('keypress', function(event){
         if (event.keyCode === 13 || event.which === 13){
         ctrlAddItem ();
            }
        });
        }
    document.querySelector("#taskList_wrapper").addEventListener('click', typeOfEvent  );


     function typeOfEvent (event){
         console.log("working");
         var eventType = event.target.parentNode.className;
         console.log("the event is ",eventType);
         if (eventType == "complete" || eventType == "remove"||eventType == "edit")
            {  itemID = parseInt(event.target.parentNode.parentNode.previousSibling.id);
                console.log(itemID);
                console.log("this is item id ", itemID);
                if (eventType == "complete") 
                {  let taskEdited = dataCtr.compeleteSelectedItem(itemID );
                   UICtr.displayCompletedTask(taskEdited);}
                else if (eventType == "remove") 
                {  console.log("type of event works for remove");
                    let taskEdited = dataCtr.deleteSelectedItem(itemID);
                    UICtr.deletedTask(taskEdited);}
                else if(eventType == "edit") 
                {   let taskEdited = dataCtr.editSelectedItem(itemID );
                    UICtr.displayEditedTask(taskEdited);}

            }
     }    

    document.getElementById("markAllComplete").addEventListener ('click', function ()
    { 
         let taskCompelete = dataCtr.completeAll();
         console.log(taskCompelete);
         UICtr.displayCompletedTask(taskCompelete);
    
    });

// delete all tast for UI
    document.getElementById("deleteAll").addEventListener ('click', function ()  
    {  
         let  taskRemoved = dataCtr.removeAll();
         console.log(taskRemoved);
         UICtr.deletedTask(taskRemoved);
         
    });

    return {
         init : function(){
         console.log ("Application has Started ");
         setEventListeners();
    }
}
})(dataController, UIController);

controller.init();  
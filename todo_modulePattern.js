

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
         return taskMap;
        
    },
    testing : function (){
         console.log (taskMap);
    },
   
    compeleteSelectedItem: function(itemID){
       
         
         taskMap.get(itemID).completed = true;
        //  console.log(taskMap);
         return taskMap;
    },
    deleteSelectedItem: function(itemID ){
       
         taskMap.get(itemID).deleted = true;
         console.log("the deleteselectd works");
         taskMap.delete((taskMap.get(itemID)).id);
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
        
    taskMap.clear();
    return taskMap;},
    
}
})(); 



// module for UI 
var UIController  = (function(){

    // DOMStrings = {
    //      inputValue: "#inputfield",
    //      inputButton: "#btn",
    //      inputContainer:"#taskList_wrapper",
    // }

 return { getInput: function (){
         return document.querySelector("#inputfield").value;
            },
        //  getDOMString: function (){
        //      return DOMStrings ;
        // },
        addListItem: function(task) {
            
            
            let element = document.getElementById('taskList_wrapper');
            var child = element.firstElementChild;  
             while (child) { 
                 element.removeChild(child); 
                 child = element.lastElementChild; 
                 }

            
           
            task.forEach(function(list) {

             var html,newhtml,element1;
                 // create html string with placeholder tag;
             
             html =  '<div class = "card"><div class = "task" id = %id%><b>%Value%</b>'+
             '</div><div class = "icon"><button class = "complete"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">'+
             '</button><button class = "remove"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edit">'+
             '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>'
              
             //repclace palceholder with html text;
         
             newhtml = html.replace('%Value%',list.text);
     
             // place the it into DOM
             newhtml = newhtml.replace('%id%',list.id);
             element1 = "#taskList_wrapper";
             document.querySelector(element1).insertAdjacentHTML('beforeend',newhtml);
            
             if (list.edit == true)
             { let element = document.getElementById(list.id);
                element.classList.remove("edit");
                element.setAttribute("contenteditable", true);
                element.focus();
                element.addEventListener("keydown", function (e)
                    { if (e.keyCode === 13){  
                
                    element.classList.add("edit");
                    var value = element.textContent;  
                    element.setAttribute("contenteditable", false);
                            
                    // editing the map of task
                    list.text = value;
                    console.log (task);

                        }
                    }
                )}
            else if (list.completed == true)
            {  
                document.getElementById(list.id).classList.add("checked");
            }
            
        })
    },
            
        clearFields: function (){
            document.getElementById("inputfield").value = "";
            console.log("it works");
        },
    }
      
    }
)();





//  global app controller
var controller = (function(dataCtr, UICtr){    // changing the name of data and UI controller
     var input, addItem;

    //  var DOM = UICtr.getDOMString();
    //  console.log(DOM);
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
         document.querySelector("#btn").addEventListener('click', ctrlAddItem);

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
                    
                   UICtr.addListItem(taskEdited);

                   //UICtr.displayCompletedTask(taskEdited);
                }
                else if (eventType == "remove") 
                {  console.log("type of event works for remove");
                    let taskEdited = dataCtr.deleteSelectedItem(itemID);
                    UICtr.addListItem(taskEdited);}

                else if(eventType == "edit") 
                {   let taskEdited = dataCtr.editSelectedItem(itemID );
                    UICtr.addListItem(taskEdited);}

            }
     }    

    document.getElementById("markAllComplete").addEventListener ('click', function ()
    { 
         let taskCompelete = dataCtr.completeAll();
         console.log(taskCompelete);
         UICtr.addListItem(taskCompelete);
    
    });

// delete all task for UI
    document.getElementById("deleteAll").addEventListener ('click', function ()  
    {  
         let  taskRemoved = dataCtr.removeAll();
         console.log(taskRemoved);
         UICtr.addListItem(taskRemoved);
         
    });

    return {
         init : function(){
         console.log ("Application has Started ");
         setEventListeners();
    }
}
})(dataController, UIController);

controller.init();  
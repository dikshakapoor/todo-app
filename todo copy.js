var arr = []; var ids = [];
document.getElementById("btn").addEventListener ('click', inputFromUser);
function addingTaskByEnter (e){
    if (e.keyCode === 13)          //checks whether the pressed key is "Enter"
        inputFromUser();
    return false;
};
function inputFromUser (){
    
        var value = document.getElementById("inputfield").value;
       
         if (value) {
            var task = createNewTask(value);
            console.log ("this is task", task);
            taskArray(task);
            addingTaskInUI(task);
         }
            document.getElementById("inputfield").value = null;
    }


function createNewTask(text){

   
   var  task = {
        text: text,
        id : Date.now(),
        Completed : false,
       
    };

    console.log(`this is inside create object`,task);
    
    return task;
    }
    
    function taskArray(task){
        
        arr.push(task);
        console.log(arr);
         //called here, now the taskObject is not empty
    }
 //changing DOM and inserting new task on click at add button
 
    function addingTaskInUI (task){
        var html,newhtml;
        html =  '<div class = "card"><div class = "task" id = %id%><b>%Value%</b>'+
        '</div><div class = "icon"><button class = "complete"><img src =_ionicons_svg_md-checkmark-circle.svg width = "20px" heigth = "20px">'+
        '</button><button class = "remove"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></button><button class = "edit">'+
        '<img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></button></button></div></div>'
        
        newhtml = html.replace('%Value%',task.text);
        
        newhtml = newhtml.replace('%id%',task.id);// over ridding newhtml
        
        
        document.querySelector("#taskList_wrapper").insertAdjacentHTML('beforeend',newhtml);
    }
 //deleting item from UI and datastructure  
        document.querySelector("#taskList_wrapper").addEventListener('click', typeOfEvent  );

function typeOfEvent(event){
    console.log("working");
        var eventType = event.target.parentNode.className;
        console.log("the event is ",eventType);
        if (eventType == "complete") 
        compeleteSelectedItem(event);
        else if (eventType == "remove") 
        deleteSelectedItem(event);
        else if(eventType == "edit") 
        editSelectedItem(event);
    
}
function deleteSelectedItem (event) // event is need to know target element
    {
                itemID = parseInt(event.target.parentNode.parentNode.previousSibling.id); // to get the unique id of object to be removed form list
                console.log("target for delete",event.target.parentNode.parentNode.previousSibling);
                if (itemID){
                
                    //creating array of Id to find the indexof id to be delted
                    ids = arr.map(function(task){
                    return task.id;
        
                        });

                index = ids.indexOf(itemID);
          
                    if (index !== -1){
              
                    deletingIdFromUI(itemID);
                    arr.splice(index,1);
             
                                     }
                            }
    }
  
function deletingIdFromUI(selectorID) {

    var element = document.getElementById(selectorID);

    console.log("element",element.parentNode);
    var element1= document.getElementById('taskList_wrapper');
    element1.removeChild(element.parentNode);
  // element.parentNode.parentNode.removeChild(element.parentNode);
   
}

// complete the selected task from the todo list and mark the compelete property as true

// document.querySelector("#taskList_wrapper").addEventListener('click', compeleteSelectedItem );

function compeleteSelectedItem (event) {
    
    itemID = parseInt(event.target.parentNode.parentNode.previousSibling.id); // to get the unique id of object to be removed form list
    
    if (itemID)

    {  
         ids = arr.map(function(task){
        return task.id;});
         var indexComplete = ids.indexOf(itemID);
         
    }
   if ( indexComplete !== -1 && indexComplete !== undefined) 
         { arr[indexComplete].Completed = "true";
           var completeTask = document.getElementById(itemID);
           completeTask.classList.add("checked");}
                                        }               
// editing the selected item 

// document.querySelector("#taskList_wrapper").addEventListener('click', editSelectedItem );

function editSelectedItem(event){
    
    var itemID;
    itemID = parseInt(event.target.parentNode.parentNode.parentNode.firstChild.id); // removed parseInt form here
    
    var editTask = document.getElementById(itemID);
     editTask.classList.remove("edit");
    if (itemID) {
        console.log(event.target.parentNode.parentNode.parentNode.firstChild.id);
    
        ids = arr.map(function(task){
            return task.id;});
        indexEdit = ids.indexOf(itemID);
     
    {  // editing the UI 
            document.getElementById(itemID).setAttribute("contenteditable", true);
            document.getElementById(itemID).focus();
            document.getElementById(itemID).addEventListener("keydown", function (e)
     {
                if (e.keyCode === 13){  
       
                    editTask.classList.add("edit");
                    var value = document.getElementById(itemID).textContent;  
                    document.getElementById(itemID).setAttribute("contenteditable", false);
                    console.log(value);
                    // editing the array of task
                    arr[indexEdit].text = value;
                                     } 
    });
    }
                }
                                }


// mark all complete
document.getElementById("markAllComplete").addEventListener ('click', function ()
    {var allTaskInUI=  document.getElementsByClassName("card");
    for (let i =0; i< arr.length; i++)
        { arr[i].Completed = "true";
        allTaskInUI[i].classList.add("checked")};
 });

// delete all tast for UI
document.getElementById("deleteAll").addEventListener ('click', function ()  

    {var allTaskInUI=  document.getElementsByClassName("card"); // deleting objects from UI
    console.log(allTaskInUI);
    while (allTaskInUI[0]){
        allTaskInUI[0].parentNode.removeChild(allTaskInUI[0]);
                         }
// resetting the todo list
    arr= [];

    });

//edit all
// document.getElementById("editAll").addEventListener ('click', function () 
// { var allTaskToEdit = document.getElementsByClassName("value"); // setting edit in the UI
//   for (let i = 0; i < arr.length; i++){
//     allTaskToEdit[i].setAttribute("contenteditable", true);
//   }

// });


/* function refershList(){

 }*/
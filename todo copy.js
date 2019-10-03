var arr = []; var ids = [];
document.getElementById("btn").addEventListener ('click', inputFromUser);
document.getElementById("inputfield").addEventListener("keydown", function(e)
    {
    if (e.keyCode === 13)          //checks whether the pressed key is "Enter"
        inputFromUser();
    
});
function inputFromUser (){
    
        var value = document.getElementById("inputfield").value;
         if (value) {
         var task = createNewTask(value);
         console.log ("this is task", task);
         taskArray(task);
         addingTaskInUI(task);
         }
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
      html = ' <li   class = "taskList" id = "%id%" > %Value%  <span class= "complete_button" ><img src = "_ionicons_svg_md-checkmark-circle.svg" width = "20px" heigth = "20px"></span><span class = "edit_button" ><img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></span><span class = "delete_button" ><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></span></li>'
     
     newhtml = html.replace('%Value%',task.text);
     
     newhtml = newhtml.replace('%id%',task.id);// over ridding newhtml
     
     
     document.querySelector("#taskList_wrapper").insertAdjacentHTML('beforeend',newhtml);
    }
 //deleting item form UI and datastructure  
    document.querySelector("#taskList_wrapper").addEventListener('click', typeOfEvent  );

function typeOfEvent(event){
    var eventType = event.target.parentNode.className;
    console.log("the event is ",eventType);
    if (eventType == "complete_button") 
       compeleteSelectedItem(event);
    else if (eventType == "delete_button") 
       deleteSelectedItem(event);
    else if(eventType == "edit_button") 
      editSelectedItem(event);
    
}
function deleteSelectedItem (event) // event is need to know target element
    {
      itemID = parseInt(event.target.parentNode.parentNode.id); // to get the unique id of object to be removed form list

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

   console.log("element",document.getElementById(selectorID))
   element.parentNode.removeChild(element);
}

// complete the selected task from the todo list and mark the compelete property as true

// document.querySelector("#taskList_wrapper").addEventListener('click', compeleteSelectedItem );

function compeleteSelectedItem (event) {
    
    itemID = parseInt(event.target.parentNode.parentNode.id); // to get the unique id of object to be removed form list
    
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
    itemID = parseInt(event.target.parentNode.parentNode.id); // removed parseInt form here
    if (itemID) {
        console.log(event.target.parentNode.parentNode.id);
    if (itemID)
    {ids = arr.map(function(task){
    return task.id;});
     indexEdit = ids.indexOf(itemID);

    {  // editing the UI 
        document.getElementById(itemID).setAttribute("contenteditable", true);
        document.getElementById(itemID).addEventListener("keydown", function (e)
     {
     if (e.keyCode === 13){  
   
      
     var value = document.getElementById(itemID).textContent;  
     console.log(value);
     // editing the array of task
     arr[indexEdit].text.textContent = value;
    }  });
    }
}
}
}

// mark all complete
document.getElementById("markAllComplete").addEventListener ('click', function ()
 { var allTaskInUI=  document.getElementsByClassName("taskList");
 for (let i =0; i< arr.length; i++)
   { arr[i].Completed = "true";
    allTaskInUI[i].classList.add("checked")};

  
 });

// delete all tast for UI
document.getElementById("deleteAll").addEventListener ('click', function ()  

{var allTaskInUI=  document.getElementsByClassName("taskList"); // deleting objects from UI
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
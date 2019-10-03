var arr = []; var ids = [];
document.getElementById("btn").addEventListener ('click', function ()
{
    var value = document.getElementById("inputfield").value;
     if (value) {
     var task = createNewObject(value);
     console.log ("this is task", task);
     objectArray(task);
     chnageInDOM(task);
     }
});

function createNewObject(text){
//innerHtml is not efficent, it takes a lot of memory
    
   var  task = {
        text: text,
        id : new Date().getUTCMilliseconds(),
        Completed : false,
       
    };

    console.log(`this is inside create object`,task);
    
    return task;
    }
    
    function objectArray(task){
        
        arr.push(task);
        console.log(arr);
         //called here because now the taskObject is not empty
    }
 //changing DOM and inserting new task on click at add button
    function chnageInDOM (task){
    
        var html,newhtml;
      html = ' <li  class = "value" id = "%id%" > %Value% <div class = "icons"><div class = "complete_button"><img src = "_ionicons_svg_md-checkmark-circle.svg" width = "20px" heigth = "20px"><div class = "edit_button"><img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"><div class = "delete_button"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px"></div></div></div> </div> </li>'
     
     newhtml = html.replace('%Value%',task.text);
     
     newhtml = newhtml.replace('%id%',task.id);// over ridding newhtml
     
     
     document.querySelector("#taskList_wrapper").insertAdjacentHTML('beforeend',newhtml);
    }
 //deleting item form UI and datastructure  
    document.querySelector("#taskList_wrapper").addEventListener('click', deleteSelectedItem );


function deleteSelectedItem (event) // event is need to know target element
    {
      itemID = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id); // to get the unique id of object to be removed form list

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
   element.parentNode.removeChild(element);
}

// complete the selected task from the todo list and mark the compelete property as true

document.querySelector("#taskList_wrapper").addEventListener('click', compeleteSelectedItem );

function compeleteSelectedItem (event) {
    
    itemID = parseInt(event.target.parentNode.parentNode.parentNode.id); // to get the unique id of object to be removed form list
    
    if (itemID)
    {   ids = arr.map(function(task){
        return task.id;});
         var indexComplete = ids.indexOf(itemID);
         
        }
   if ( indexComplete !== -1 && indexComplete !== undefined) 
            { arr[indexComplete].Completed = "true";
        
    var completeTask = document.getElementById(itemID);
    completeTask.classList.add("checked");}
}
// editing the selected item 

document.querySelector("#taskList_wrapper").addEventListener('click', editSelectedItem );

function editSelectedItem(event){

    itemID = parseInt (event.target.parentNode.parentNode.parentNode.parentNode.id);
    console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);

    if (itemID)
    {   ids = arr.map(function(task){
        return task.id;});
         var indexEdit = ids.indexOf(itemID);
         
        }
    if (indexEdit !== -1 && indexEdit !== undefined)  
        { var editTask = document.getElementById(itemID);
            editTask.setAttribute("contenteditable", true);
           
        }

}

// mark all complete
// document.getElementById("markAllComplete").addEventListener ('click', function ()
// {

// }

// delete all
//edit all

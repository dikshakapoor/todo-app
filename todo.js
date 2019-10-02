var arr = [];
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
        Deleted : false,
    };

    console.log(`this is inside create object`,task);
    
    return task;
    }
    
    function objectArray(task){
        
        arr.push(task);
        console.log(arr);
         //called here because now the taskObject is not empty
    }

    function chnageInDOM (task){
    
        var html,newhtml;
      html = ' <li  id = "%id%"> %Value% <div class = "icons"><div class = "complete_button"><img src = "_ionicons_svg_md-checkmark-circle.svg" width = "20px" heigth = "20px"></div><div class = "edit_button"><img src = "_ionicons_svg_md-create.svg" width = "20px" heigth = "20px"></div> <div class = "delete_button"><img src = "_ionicons_svg_md-trash.svg"  width = "20px" height = "20px" </div></div></li>'
     
     newhtml = html.replace('%Value%',task.text);
     
     newhtml = newhtml.replace('%id%',task.id);// over ridding newhtml
     
     
     document.querySelector("#taskList_wrapper").insertAdjacentHTML('beforeend',newhtml);
    }
var arr = []; 
// document.getElementById("btn").addEventListener("click",console.log("Hello"));


// document.getElementById("btn").addEventListener("click",function(){
//     let value = document.getElementById("input-field").value;
//     console.log(`the data store in array is ${value}`);
    
// }); 

let value = null;
console.log(value);
debugger;

function addItem(){ // module pattern
   
   value = document.getElementById("inputfield").value;
   if (value){
   var task = new Object();
   
   task = {
       text: value,
       id : new Date().getUTCMilliseconds(),
       Completed : false
   }
  
   arr.push(task);
   console.log(arr);
   addItemList(value);
   return console.log(task); // making task public object by returning it
}
}

// const node = document.getElementbyId("#intputfield");
// node.addEventListener('inputfield', function (event) {
//     if (event.keyCode === 13|| event.which ===13){
//    addItem();
//     }
// });
function addItemList(value){
    // var text = document.createElement('li');
    document.getElementById("taskList").innerHTML = value;
   
    addItem.innerHtml = value;
    focusOnInput = document.getElementById("inputfield").focus();
}



// console.log(`the data store in array is ${value}`);
// function getInput (){
// console.log(document.getElementsByClassName("input-field").value);
//     var value = document.getElementsByClassName("input-field").value;
//     console.log(`the data store in array is ${value}`);
// }

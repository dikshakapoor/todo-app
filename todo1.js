var arr = []; 
// document.getElementById("btn").addEventListener("click",console.log("Hello"));


// document.getElementById("btn").addEventListener("click",function(){
//     let value = document.getElementById("input-field").value;
//     console.log(`the data store in array is ${value}`);
    
// }); 

let value = null;


function myFunction(){
   
   value = document.getElementById("inputfield").value;
   
   var task = new Object();
   task = {
       text: value,
       id : new Date().getUTCMilliseconds(),
       Completed : false
   }
   document.getElementById("button1").innerHTML = task.text;
   arr.push(task);
   console.log(arr);
}




// console.log(`the data store in array is ${value}`);
// function getInput (){
// console.log(document.getElementsByClassName("input-field").value);
//     var value = document.getElementsByClassName("input-field").value;
//     console.log(`the data store in array is ${value}`);
// }

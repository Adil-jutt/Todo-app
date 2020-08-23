var list = document.getElementById('list')
var database = firebase.database().ref('ToDo-List')

database.on('child_added',function(data){
  // ================= LIST TEXT ===================
  var todo = document.getElementById('todo')
  var li = document.createElement('li')
  var text = document.createTextNode(data.val().value)
  li.appendChild(text)
 
// EDIT BUTTON
var editBtn = document.createElement('button')
var editText = document.createTextNode("EDIT")
editBtn.appendChild(editText)
li.appendChild(editBtn)
editBtn.setAttribute("id",data.val().key)    
editBtn.setAttribute("onclick","editItem(this)")

// DELETE BUTTON
var delBtn = document.createElement('button')
var delText = document.createTextNode("DELETE")
delBtn.appendChild(delText)
li.appendChild(delBtn)
delBtn.setAttribute("id",data.val().key)    
delBtn.setAttribute("onclick","DelItem(this)")    


     list.appendChild(li)
     todo.value = "";
     li.setAttribute("class","Items")
     var line = document.createElement('hr')
     li.appendChild(line)
})

function addTodo(){

    // // ================= LIST TEXT ===================
        var todo = document.getElementById('todo')
    //     var li = document.createElement('li')
    //     var text = document.createTextNode(todo.value)
    //     li.appendChild(text)
       
        // database
       var key = database.push().key
       var toDo = {
           value : todo.value,
           key : key
       } 
       database.child(key).set(toDo)

//     // EDIT BUTTON
//      var editBtn = document.createElement('button')
//      var editText = document.createTextNode("EDIT")
//      editBtn.appendChild(editText)
//      li.appendChild(editBtn)
//      editBtn.setAttribute("onclick","editItem(this)")

//     // DELETE BUTTON
//      var delBtn = document.createElement('button')
//      var delText = document.createTextNode("DELETE")
//      delBtn.appendChild(delText)
//      li.appendChild(delBtn)
//      delBtn.setAttribute("onclick","DelItem(this)")
     

// if(todo.value != ""){
//      list.appendChild(li)
//      todo.value = "";
//      li.setAttribute("class","Items")
//      var line = document.createElement('hr')
//      li.appendChild(line)
// } 
// else{alert("Enter Title of Todo")}
}

function DelItem(e){
   e.parentNode.remove();
database.child(e.id).remove()
}
function editItem(e){
     var editVal = prompt("Enter New Title", e.parentNode.firstChild.nodeValue)
    var editTodo= {
        value : editVal,
        key : e.id
    }
    database.child(e.id).set(editTodo)
      e.parentNode.firstChild.nodeValue = editVal
    
}
function delAll(){
    list.innerHTML = "";
}







const taskList = document.querySelector('#taskList')
const taskL = Array.from(taskList)
const tasks = document.querySelector("#taskAddText")
const addBtn = document.querySelector("#taskAdd")
const list = document.createElement("ul")
taskList.appendChild(list);


addBtn.addEventListener('click',(e)=>{
        if(tasks.value === ""){
            return;
        }
        taskL.push({text:tasks.value.trim(),completed:false,editing:false});
        tasks.value = "";
        console.log(taskL);
        handleTasks();  
})

function handleTasks(){
    list.innerHTML = "";
    taskL.forEach((task,index)=>{
            toDoTask = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = task.text;
            const editBtn = document.createElement("button")
            editBtn.textContent = "Edit";
            const delBtn = document.createElement("button")
            delBtn.textContent = "Delete";
            const tickBtn = document.createElement("input");
            tickBtn.type = "checkbox";
            delBtn.id = "delete";
            tickBtn.id = "check"
            toDoTask.appendChild(tickBtn);
            toDoTask.appendChild(span);
            toDoTask.appendChild(editBtn);
            toDoTask.appendChild(delBtn);
            list.appendChild(toDoTask);
            delBtn.addEventListener('click',(e)=>{
                taskL.splice(index,1);
                handleTasks();
            })
            if(task.editing === true){

                const newT = document.createElement("input");
                const saveBtn = document.createElement("button");
                saveBtn.textContent = "Save";
                newT.value = task.text;
                toDoTask.replaceChild(newT,span)
                toDoTask.appendChild(saveBtn);
                saveBtn.addEventListener('click',(e)=>{
                    if(newT.value !== ""){
                        taskL[index].text = newT.value.trim();
                        taskL[index].editing = false;
                        handleTasks();
                    }    
                })    
            }
            editBtn.addEventListener('click',(e)=>{
                task.editing = true;
                handleTasks();

            })
            tickBtn.checked = task.completed;
            if(task.completed){
                span.style.textDecoration = "line-through"
            }
            else{
                span.style.textDecoration = "none" 
            }
            tickBtn.addEventListener('change',(e)=>{
               task.completed = tickBtn.checked;
               handleTasks();
            })
})
}



const postData = async (data) => {
    let req = await fetch("http://localhost:8090/tasks", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    let res = await req.json();
    console.log(res);
    getTask();  
};

const handleData = (e) => {
    e.preventDefault();
    let data = {
        task: document.getElementById('task').value,
    };
    postData(data);
    document.getElementById('task').value = '';
};

document.getElementById("taskData").addEventListener("submit", handleData);

const mapper = (data) => {
    document.getElementById("taskList").innerHTML = "";  

    data.forEach((ele) => {
        let h1 = document.createElement("h1");
        h1.innerHTML = ele.task;
        h1.style.textDecoration = ele.status ? "line-through" : "none";  

        let h2 = document.createElement("h2");
        h2.innerHTML = ele.status ? "Completed" : "Pending";
        h2.style.color = ele.status ? "#4CAF50" : "#FF6347";  

        let div = document.createElement("div");
        div.append(h1, h2);

     
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.style.padding = "5px 10px";
        deleteBtn.style.border = "none";
        deleteBtn.style.backgroundColor = "#f44336";
        deleteBtn.style.color = "white";
        deleteBtn.style.borderRadius = "4px";
        deleteBtn.style.cursor = "pointer";

    
        let completeBtn = document.createElement("button");
        completeBtn.innerHTML = ele.status ? "Undo" : "Complete";
        completeBtn.style.padding = "5px 10px";
        completeBtn.style.border = "none";
        completeBtn.style.backgroundColor = "#4CAF50";
        completeBtn.style.color = "white";
        completeBtn.style.borderRadius = "4px";
        completeBtn.style.cursor = "pointer";
        completeBtn.style.marginLeft = "10px";

        div.append(deleteBtn, completeBtn);
        document.getElementById("taskList").append(div);

      
        deleteBtn.addEventListener("click", () => deleteTask(ele._id));

     
        completeBtn.addEventListener("click", () => toggleComplete(ele._id, ele.status));
    });
};


const getTask = async () => {
    let req = await fetch("http://localhost:8090/tasks");
    let data = await req.json();
    mapper(data);
};
getTask();


const deleteTask = async (id) => {
    let req = await fetch(`http://localhost:8090/tasks/${id}`, {
        method: 'DELETE',
    });
    let res = await req.json();
    console.log(res);
    getTask(); 
};


const toggleComplete = async (id, currentStatus) => {
    let updatedData = { status: !currentStatus };  
    let req = await fetch(`http://localhost:8090/tasks/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    let res = await req.json();
    console.log(res);
    getTask();  
};

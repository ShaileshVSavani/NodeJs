

const postData = async () => {
    let req = await fetch("http://localhost:8090/tasks", {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    })
    let res = await req.json()
    console.log(res);

}

const handleData = (e) => {
    e.preventDefault();
    let data = {
        task: document.getElementById('task').value,
      
    }
   
    postData(data)
}
document.getElementById("taskData").addEventListener("submit", handleData)


const mapper = (data) => {
    document.getElementById("taskList").innerHTML = ""


    data.map((ele) => {
        let h1 = document.createElement("h1");
        h1.innerHTML = ele.task
        let h2 = document.createElement("h2");
        h2.innerHTML = ele.status
        let div = document.createElement("div")
        div.append(h1, h2)


        document.getElementById("taskList").append(div)

    })
}

const getTask = async () => {
    let req = await fetch(`http://localhost:8090/tasks`)
    let data = await req.json()

    mapper(data)

}
getTask()
const express = require('express');

const app = express();

app.use(express.json());
let db =[]
app.get('/', (req, res) => {
  res.send(db);
})

app.post('/', (req, res) => {
    let {name, email, password} = req.body
    let user ={
        name: name,
        email: email,
        password: password,
        id: db.length + 1
    }
    db.push(user)
    // res.send(user)
    res.send("Data saved successfully")
})

app.delete('/:index', (req, res) => {
    let {index} = req.params
    db.splice(index, 1)
    res.send("Data deleted successfully where index is " + req.params.index)
})

app.listen(8090, ()=>{
    console.log('Server is running on port 8090');  
})
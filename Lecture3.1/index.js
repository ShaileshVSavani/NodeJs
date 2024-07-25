const express = require('express');
const app = express();
app.use(express.json());

let data = [];

app.get('/', (req, res) => {
    res.send(data);
});

app.post('/', (req, res) => { 
    let { name, email, password } = req.body;
    let user = {
        name: name,
        email: email,
        password: password
    }
    data.push(user);
    res.send(data);
})


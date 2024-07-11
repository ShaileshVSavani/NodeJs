


const express = require('express');
const app = express();

app.use(express.json());

let db = [];

app.get('/', (req, res) => {
    res.send(db);
});

app.post('/:index', (req, res) => {
    const { name, email, password } = req.body;
    // const id = db.length === 0 ? 1 : db[db.length - 1].id + 1; 
    // const id = db.length === 0 ? 1 : db.length + 1; 
    const id = db.length + 1;
    const user = {
        id: id,
        name: name,
        email: email,
        password: password
    };
    db.push(user);
    res.send("Data saved successfully");
});

app.delete('/:index', (req, res) => {
    const index = parseInt(req.params.index); 
    // console.log(req.params);
    if (index >= 0 && index < db.length) {
        db.splice(index, 1); 
        res.send(`Data deleted successfully at index ${index}`);
    } else {
        res.status(404).send("The user with the given index is not found");
    }
});

app.listen(8090, () => {
    console.log('Server is running on port 8090');
});

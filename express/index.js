const express = require('express');
const app = express();

let data = [];

// Middleware to parse JSON request bodies

app.use(express.json());

// GET all data
app.get('/', async (req, res) => { 
    
    res.send(data);
})

// POST new data

app.post('/', async (req, res) => { 

    let user = {
        id: Date.now(),
        ...req.body
        // username,
        // email, 
        // password 
    }
    data.push(user);
    res.send(data);;
})

// PUT update existing data
app.patch('/', async (req, res) => { 
    let { id } = req.params
    let updatedData = data.map(item => item.id === parseInt(id) ? { ...item, ...req.body } : item);
    data = updatedData;
    res.send(data);
});

// DELETE data by id

app.delete('/:id', async (req, res) => { 
    let { id } = req.params
    data = data.filter(item => item.id!== parseInt(id));
    res.send(data);
});



app.listen(8090, () => { 
    console.log('Server is running on port 8090');
})
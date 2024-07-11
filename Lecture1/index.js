
/*
npm init -y
npm install express
*/

const express = require('express');

const app = express();

// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});



app.listen(8090, () => { 
    console.log('Server running on port 8090');
})


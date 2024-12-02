
const express = require('express');
const path = require('path');
const upload = require('./utils/uploadImage');


const app = express();

// Serve static files from the 'view' directory
app.use(express.static(path.join(__dirname, 'view')));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded: /uploads/${req.file.filename}`);
});



// Start the server
app.listen(8090, () => {
    console.log('Server is running on http://localhost:8090');
});

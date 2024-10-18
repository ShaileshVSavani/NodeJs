
const express = require('express')
const dbConnect = require('./config/db')
const cors = require('cors');

const taskRoute = require('./routes/Task.route')

const app = express()
app.use(cors());
app.use(express.json())



app.use("/tasks", taskRoute)
app.listen(8090, () => {
    console.log("listening  on port 8090");
    dbConnect()
})
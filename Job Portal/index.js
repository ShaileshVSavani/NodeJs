const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require("dotenv").config()
const appRoutes = require('./routes/index')

const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", appRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB()
})
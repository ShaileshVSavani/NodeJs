const express = require('express')
const DB = require('./db')
const Student = require('./studentschema')

const app = express()

app.use(express.json())

app.get('/', (req, res) => { 
    res.send('Hello, World!')
})

app.get('/students', async (req, res) => { 
    const students = await Student.find()
    res.send(students)
})

app.post('/student', async (req, res) => { 
    const newStudent = await Student.create(req.body)
    res.send(newStudent)
})

app.put('/student/:id', async (req, res) => { 
    let { id } = req.params
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true })
    res.send(updatedStudent)
})

app.patch('/student/:id', async (req, res) => { 
    let { id } = req.params
    const updatedStudent = await Student.findByIdAndUpdate(id, {...req.body, _id: id }, { new: true })
    res.send(updatedStudent)
})

app.delete('/student/:id', async (req, res) => { 
    let { id } = req.params
    const deletedStudent = await Student.findByIdAndDelete(id)
    res.send(deletedStudent)
   
})




app.listen(8090, () => { 
    console.log('Server is running on port 8090')
    DB()
})
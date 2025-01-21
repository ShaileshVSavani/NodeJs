
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DbConnection = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');
;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    DbConnection()
    console.log(`Server running on port ${PORT}`)
});

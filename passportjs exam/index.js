const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const initializer = require('./middlewares/passportConfig');
const connectDB = require('./config/db');

const app = express();

// Passport Configuration
initializer(passport);

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({secret: 'secret'})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start Server
const PORT = 8090;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Connect to the database
    connectDB();
});

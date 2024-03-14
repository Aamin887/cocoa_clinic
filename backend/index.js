const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const dbConnect = require('./config/db');
const corsOptions = require('./config/corsOptions');
const root = require('./Routes/root');
const login = require('./Routes/authRoute');
const register = require('./Routes/registerAuth');
const userRoute = require('./Routes/api/userRoute');
const adminRoute = require('./Routes/api/adminRoute');

const PORT = process.env.PORT || 5001;

//database connection
dbConnect();

const app = express();

// cors options middleware
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// built-in middleware urlencoded form data
app.use(express.urlencoded({
    extended: true
}));

// serving static files
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', root)
app.use('/login', login)
app.use('/register', register)

app.use('/', userRoute)
app.use('/admin', adminRoute)

// 404 page
app.use('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ 'message ': '404, page not found' });
    } else {
        res.type('txt').send('404, page not found')
    }
})

// error handler middleware
app.use(errorHandler)

app.listen(PORT, function () {
    console.log(`Server running on PORT: ${PORT}`);
}) 

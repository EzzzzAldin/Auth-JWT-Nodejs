require('dotenv').config();

// Inite Express
const express = require('express');
const mongoose = require('mongoose');

// DB connect
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
// Check DB IS Connected
mongoose.connection.once('open', () => console.log('DB Is Connected'));

// Build Server
const app = express();

// MiddelWare
app.use(express.json());

// Routers
const authRouter = require('./router/auth.route');
const testRouter = require('./router/test.route');


// PORT From dotenv
const PORT = process.env.PORT || 5000;


// Use Routers
app.use('/api/user', authRouter);
app.use('/api/test', testRouter);


// Listen Server
app.listen(PORT, () => {
    console.log(`Server Is Run In POR ${PORT}`);
});
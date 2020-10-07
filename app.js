const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//Import routes
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const mailRoute = require('./routes/mail');
const itemsRoute = require('./routes/items');
const suppliersRoute = require('./routes/suppliers');

//Middle-Wares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes by Router
app.use('/users', usersRoute);
app.use('/users', authRoute);
app.use('/mail', mailRoute);
app.use('/items', itemsRoute);
app.use('/suppliers', suppliersRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send("Hey! REST API 🤖");
})

//Connect to DB
mongoose.connect(process.env.DB_AUTH,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('connected to DB'));

//START LISTENING
app.listen(8000);
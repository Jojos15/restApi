const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


//Import routes
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

//Middle-Wares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', usersRoute);
app.use('/users', authRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send("Kalosirthes Malaka");
})

//Connect to DB
mongoose.connect(process.env.DB_AUTH,
            {useNewUrlParser: true, useUnifiedTopology: true},
            () => console.log('connected to DB'));

//START LISTENING
app.listen(8000);
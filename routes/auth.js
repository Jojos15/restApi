const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerSchema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (request, response) => {
    const { error } = registerSchema.validate(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();

        // Sending the salt is dangerous. Don't send the entire object.

        response.send({ username: savedUser.username });
    } catch (error) {
        response.status(400).send(error);
    }
});

const loginSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
});

router.post('/login', async (request, response) => {
    const { error } = loginSchema.validate(request.body);
    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    // Checking if the username exists
    const user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).send("Wrong username or password.");
    }

    // Check for matching passwords
    const correctPassword = await bcrypt.compare(request.body.password, user.password);
    if (!correctPassword) {
        return response.status(400).send("Wrong username or password.");
    }

    const token = jwt.sign(
        { username: user.username },
        process.env.TOKEN_SECRET
    )

    response.header('auth-token', token).send(token);
})

module.exports = router;
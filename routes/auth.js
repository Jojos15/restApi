const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginVal = require('../middlewares/LogIn');
const registerVal = require('../middlewares/Register');
const LoggedInUser = require('../models/LoggedInUser');

router.post('/register', registerVal, async (request, response) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();

        response.send({ username: savedUser.username });
    } catch (error) {
        response.status(400).send(error);
    }
});

router.post('/login', loginVal, async (request, response) => {

    let userId;

    const user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).send("Wrong username or password.");
    }
    else userId = user._id;

    const correctPassword = await bcrypt.compare(request.body.password, user.password);
    if (!correctPassword) {
        return response.status(400).send("Wrong username or password.");
    }

    const token = jwt.sign(
        { userId: userId },
        process.env.TOKEN_SECRET
    )

    tokenData = jwt.verify(token, process.env.TOKEN_SECRET)
    const loggedInUser = new LoggedInUser({
        userId: tokenData.userId,
        iat: tokenData.iat
    });

    try {
        const savedLoggedInUser = await loggedInUser.save();
        response.send({ userId: savedLoggedInUser.userId });
    } catch (error) {
        response.status(400).send(error);
    }

    response.header('auth-token', token).send(token);
})

module.exports = router;
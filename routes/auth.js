const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
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
        return response.status(400).send({ message: "Wrong username or password." });
    }
    else userId = user._id;

    const correctPassword = await bcrypt.compare(request.body.password, user.password);
    if (!correctPassword) {
        return response.status(400).send({ message: "Wrong username or password." });
    }

    const token = jwt.sign(
        { userId: userId },
        process.env.TOKEN_SECRET
    )

    tokenData = jwt.verify(token, process.env.TOKEN_SECRET)

    // find if user is logged in
    const foundLoggedInUser = await LoggedInUser.findOne({ userId: userId });
    if (!foundLoggedInUser) {
        // if user is not logged in add user to loggedIn list
        const loggedInUser = new LoggedInUser({
            userId: userId,
            iat: tokenData.iat
        });
        try {
            await loggedInUser.save();
        } catch (error) {
            response.status(500).send({ error: error });
        }
    }
    else {
        // if user is logged in update user's iat
        console.log("user is logged in already")
        foundLoggedInUser.iat = tokenData.iat
        foundLoggedInUser.save()
    }

    response.header('auth-token', token).send({ token: token })
})

module.exports = router;
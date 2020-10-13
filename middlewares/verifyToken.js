const jwt = require('jsonwebtoken');
const LoggedInUser = require('../models/LoggedInUser');

module.exports = async function (request, response, next) {
    const token = request.header('auth-token');
    if (!token) {
        return response.status(401).send("Access Denied 😈");
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Verified user:");
        console.log(verified);
        request.userId = verified;

        const user = await LoggedInUser.findOne({ userId: verified.userId, iat: verified.iat });
        if (!user) {
            response.status(400).send("User is not logged in.");
        }
        next();

    } catch (err) {
        response.status(400).send("Access Denied 😈");
    }
}
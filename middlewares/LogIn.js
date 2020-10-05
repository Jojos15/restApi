module.exports = function (request, response, next) {

    let usernameIsValid = false;
    let passwordIsValid = false;

    if (request.body.username != null) {
        usernameIsValid = /^([a-z0-9]{6,})$/.test(request.body.username);
    }

    if (request.body.password != null) {
        passwordIsValid = /^([a-z0-9]{6,})$/.test(request.body.password);
    }

    if (usernameIsValid && passwordIsValid) next();
    else {

        let output = [];

        if (!usernameIsValid) {
            output.push({ message: "Username is Invalid" });
        }
        if (!passwordIsValid) {
            output.push({ message: "Password is Invalid" });
        }

        response.status(401).send({ output });
    }
}

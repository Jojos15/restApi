module.exports = function (request, response, next) {

    let usernameIsValid = false;
    let passwordIsValid = false;
    let emailIsValid = false;

    if (request.body.email != null) {
        emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(request.body.email);
    }

    if (request.body.username != null) {
        usernameIsValid = /^([a-z0-9]{6,})$/.test(request.body.username);
    }

    if (request.body.password != null) {
        passwordIsValid = /^([a-z0-9]{6,})$/.test(request.body.password);
    }

    if (request.body.role != null) {
        userRoleIsValid = roles.includes(request.body.role);
    }

    if (usernameIsValid && emailIsValid && passwordIsValid) next();
    else {

        let output = [];

        if (!usernameIsValid) {
            output.push({ message: "Username is Invalid" });
        }
        if (!emailIsValid) {
            output.push({ message: "Email is Invalid" });
        }
        if (!passwordIsValid) {
            output.push({ message: "Password is Invalid" });
        }

        response.status(401).send({ output });
    }
}

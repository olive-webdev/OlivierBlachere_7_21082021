const validator = require("email-validator");

module.exports = (req, res, next) => {
    const email     = req.body.email;
    console.log(email)
    const emailIsValid = validator.validate(req.body.email);
    if (email == undefined || email == "") {
         res.status(400).json({ 'error': "veuillez renseigner une adresse email" });
    } else if (!emailIsValid) {
        res.status(400).json({ 'error': "erreur = Le format de l'email est incorrect" });
    } else {
        next();
    }
};

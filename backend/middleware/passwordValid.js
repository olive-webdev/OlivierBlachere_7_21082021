const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                   
.is().max(16)                                  
.has().uppercase()                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces()                           

module.exports = (req, res, next) => {
    const password = req.body.password;
    if(password == "" || password == undefined) {
        res.status(400).json({ 'error': "veuillez renseigner un mot de passe" });
    }
    else if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ 'error': "Le format du mot de passe est incorrect.",
         'message' : 'Le mot de passe doit contenir entre 8 et 16 caractères, sans espaces avec 1 chiffre minimum, des majuscules et minuscules' });
    } else {
        next();
    }
};
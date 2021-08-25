const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const models = require("../models/");
// const multer = require('../middleware/multer');

exports.signup = (req, res) => {
    // récupération des informations entrées par l'utilisateur
    const email    = req.body.email;
    const password = req.body.password;
    const name     = req.body.name;
    const surname  = req.body.surname;
    const service  = req.body.service;

    models.User.findOne({ //on cherche dans la base de données si l'utilisateur existe déjà
        attributes: ['email'],
        where: { email: email }
    })
    .then((User) => {
        if(User){ //utiliser findOrCreate //gestion des erreurs
            return res.status(409).json({ 'error': 'utilisateur déjà existant'});
        }
        else if(name == undefined || name == "") {
            res.status(400).json({ 'error': 'veuillez renseigner un prénom' });
        }
        else if(surname == undefined || surname == "") {
            res.status(400).json({ 'error': 'veuillez renseigner un nom' });
        }
        else{ //création du compte dans la base de données
            bcrypt.hash(password, 2, function( err, bcryptedPassword ){
                const newUser = models.User.create({ name: name, surname: surname, email: email, password: bcryptedPassword, service: service })
                .then((newUser) => res.status(201).json({
                    'message': "Utilisateur créé !",
                    'userId' : newUser.id,
                    'nom'    : newUser.name,
                    'prénom' : newUser.surname,
                    'email'  : newUser.email,
                    'service': newUser.service,
                    'créé le': newUser.createdAt}))
                .catch(() => res.status(400).json({ 'error': 'erreur = utilisateur non créé' }))
            })
        }      
    })
    .catch(() => res.status(500).json({ 'error': "oops, impossible de vérifier l'utilisateur" }));
};

exports.login = (req, res) => {
    // récupération des informations entrées par l'utilisateur
    const email    = req.body.email;
    const password = req.body.password;

    models.User.findOne({ //on cherche dans la base de données si l'utilisateur existe
        where: { email: email }
    })
    .then((User) => { //si l'utilisateur est introuvable dans la base de données
        if(!User){
            res.status(400).send("utilisateur introuvable");
        }
        else{
            bcrypt.compare(password, User.password) //comparaison des mots de passe
                .then(function(result){
                    if(result === true)
                        {res.status(200).json( //renvoie de l'ID utilisateur et du TOKEN
                            { userId: User.id, token: jwt.sign({userId: User.id}, "privateKey", { expiresIn: "9h"})});}
                    else{res.status(400).send("mauvais mot de passe")}
                })
                .catch(() => res.status(400).json({ error: 'connexion impossible' }))
        }
        })
    .catch(() => res.status(400).json({ error: "utilisateur introuvable" }));
};

exports.getAllUsers = (req, res) => {
    models.User.findAll()
    .then((Users) => res.status(200).json(Users))
    .catch(() => res.status(500).json({ 'error': "Pas encore d'utilisateur" }));
};

exports.getOneUser = (req, res) => {
    const id = req.params.id;
    models.User.findOne({
        where: { id: id }
    })
    .then((User) => {
        if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
        else{res.status(200).json(User)}
        
    })
    .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
};

exports.modifyUser = (req, res) => {

    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "privateKey");
    const userId = decodedToken.userId;
    if(userId != id){
        models.User.findOne({
            where: { id : userId }
            })
        .then((User) => {
            if(User.admin === true){
                models.User.findOne({
                    where: { id: id }
                    })
                    .then((User) => {
                        if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
                        else{
                            const newEmail = req.body.email;
                            const newPassword = req.body.password;
                            const newName     = req.body.name;
                            const newSurname  = req.body.surname;
                            const newService  = req.body.service;
                            const newPpicture = req.body.Ppicture;
            
                            User.name = newName;
                            User.surname = newSurname;
                            User.service = newService;
                            User.Ppicture = newPpicture;
                            User.email = newEmail;
                            bcrypt.hash(newPassword, 2, function(err, bcryptedPassword){
                                User.password = bcryptedPassword;
                                User.save();
                            });
                            res.status(200).json({ 'message': "données de l'utilisateur modifié par l'administrateur"});
                        }
                    })
                    .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
            }
            else{
                res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
        .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
    }
    else{
        models.User.findOne({
        where: { id: id }
        })
        .then((User) => {
            if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
            else{
                const newEmail = req.body.email;
                const newPassword = req.body.password;
                const newName     = req.body.name;
                const newSurname  = req.body.surname;
                const newService  = req.body.service;
                const newPpicture = req.body.Ppicture;

                User.name = newName;
                User.surname = newSurname;
                User.service = newService;
                User.Ppicture = newPpicture;
                User.email = newEmail;
                bcrypt.hash(newPassword, 2, function(err, bcryptedPassword){
                    User.password = bcryptedPassword;
                    User.save();
                });
                res.status(200).json({ 'message': "données de l'utilisateur modifié"});
            }
        })
        .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
    }
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "privateKey");
    const userId = decodedToken.userId;   
    if(userId != id){
        models.User.findOne({
            where: { id : userId }
            })
        .then((User) => {
            if(User.admin === true){
                models.User.findOne({
                    where: { id: id }
                    })
                    .then((User) => {
                        if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
                        else{
                            models.Posting.destroy(
                                {where: {UserId : id}}
                            )
                            .then(() => {
                                models.User.destroy(
                                    {where: { id : id }}
                                )
                                .then(() => res.status(200).json({'message' : "utilisateur supprimé par l'utilisateur"}))
                                .catch((error) => res.status(500).json(error));
                            })
                            .catch(() => res.status(500).json({ 'error': "erreur à la suppression des messages" }));
                        }
                    })
                    .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
            }
            else{
                res.status(500).json({ 'error': "vous n'avez pas les droits pour supprimer ce compte" })}})
        .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))}

    else{
        models.Posting.destroy(
            {where: {UserId : id}}
        )
        .then(() => {
            models.User.destroy(
                {where: { id : id }}
            )
            .then(() => res.status(200).json({'message' : "utilisateur supprimé par l'utilisateur"}))
            .catch((error) => res.status(500).json(error));
        })
        .catch(() => res.status(500).json({ 'error': "erreur à la suppression des messages" }));}
};
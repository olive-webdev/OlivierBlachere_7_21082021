const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const models = require("../models/");
const multer = require('../middleware/multer');
const fs     = require('fs');

exports.signup = (req, res) => { // récupération des informations entrées par l'utilisateur
    const email    = req.body.email;
    const password = req.body.password;
    const name     = req.body.name;
    const surname  = req.body.surname;
    models.User.findOne({attributes: ['email'],where: { email: email }})//on cherche dans la base de données si l'utilisateur existe déjà
    .then((User) => {
        if(User){
            res.status(409).json({ 'error': 'utilisateur déjà existant'});
        }
        else if(name == undefined || name == "") {
            res.status(400).json({ 'error': 'veuillez renseigner un prénom' });
        }
        else if(surname == undefined || surname == "") {
            res.status(400).json({ 'error': 'veuillez renseigner un nom' });
        }
        else{ // création du compte dans la base de données
            bcrypt.hash(password, 2, function( err, bcryptedPassword ){
                const newUser = models.User.create({ name: name, surname: surname, email: email, password: bcryptedPassword})
                .then((newUser) => res.status(201).json({
                    'message': "Utilisateur créé !",
                    'userId' : newUser.id,
                    'prénom' : newUser.name,
                    'nom'    : newUser.surname,
                    'email'  : newUser.email,
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
    models.User.findOne({where: { email: email }})//on cherche dans la base de données si l'utilisateur existe
    .then((User) => { //si l'utilisateur est introuvable dans la base de données
        if(!User){res.status(400).send("utilisateur introuvable");}
        else{
            bcrypt.compare(password, User.password) //comparaison des mots de passe
                .then(function(result){
                    if(result === true)
                        {res.status(200).json( //renvoie de l'ID utilisateur et du TOKEN
                            { userId: User.id, token: jwt.sign({userId: User.id}, process.env.TOKEN_PRIVATE_KEY, { expiresIn: "9h"}),
                             name: User.name, 
                             surname: User.surname, 
                             email: User.email, 
                             service: User.service, 
                             Ppicture: User.Ppicture, 
                             admin: User.admin, 
                             creation: User.createdAt});}
                    else{res.status(400).send("mauvais mot de passe")}
                })
                .catch(() => res.status(400).json({ error: 'connexion impossible' }))
        }
    })
    .catch(() => res.status(400).json({ error: "utilisateur introuvable" }));
};

exports.getAllUsers = (req, res) => { //renvoie un tableau de tous les utilisateurs
    models.User.findAll()
    .then((Users) => res.status(200).json(Users))
    .catch(() => res.status(500).json({ 'error': "Pas encore d'utilisateur" }));
};

exports.getOneUser = (req, res) => { //renvoie les information d'un utilisateur
    const id = req.params.id;
    models.User.findOne({where: { id: id }})
    .then((User) => {
        if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
        else{res.status(200).json(User)}
    })
    .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
};

exports.modifyUser = (req, res) => { // modifie les informations d'un utilisateur
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId = decodedToken.userId;
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.User.findOne({where: { id: id }})
                .then((User) => {
                    if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
                    else{
                        User.name = req.body.name;
                        User.surname = req.body.surname;
                        User.service = req.body.service;
                        User.email = req.body.email;
                        bcrypt.hash(req.body.password, 2, function(err, bcryptedPassword){User.password = bcryptedPassword;User.save()});
                        res.status(200).json({ 'message': "données de l'utilisateur modifiées"});
                    }
                })
                .catch(() => res.status(500).json({ 'error': "erreur à la modification des données utilisateur" }));
        }
        else{res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération" })}})
    .catch((error) => console.log(error))
};

exports.modifyPhoto = (req, res) => { // modifie la photo d'un utilisateur
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId = decodedToken.userId;
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.User.findOne({where: { id: id }})
                .then((User) => {
                    if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
                    else{
                        if(User.Ppicture != null){
                            const filename = User.Ppicture.split('/images/')[1];
                            fs.unlink(`images/${filename}`, (err) => {
                                if (err) {
                                    console.log("impossible de supprimer l'image:"+err);
                                } else {
                                    console.log('image supprimée');                                
                                }})}
                            User.Ppicture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                            User.save()
                            .then(()=>{res.status(200).json({ 'message': "données de l'utilisateur modifié par l'utilisateur"});})
                            .catch(()=>{res.status(500).json({ 'error': "impossible de modifier la photo" })})
                        }
                    })
                    .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
            }
        else{res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
    .catch(() => res.status(500).json({ 'error': "erreur lors du changement d'image"}))  
};

exports.deletePhoto = (req, res) => { // supprime la photo d'un utilisateur
    const id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId = decodedToken.userId;
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.User.findOne({where: { id: id }})
                .then((User) => {
                    if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
                    else{
                        const filename = User.Ppicture.split('/images/')[1];// suppression de l'ancienne image
                        fs.unlink(`./images/${filename}`, () => {
                        User.Ppicture = null
                        User.save()
                        .then(()=>{res.status(200).json({ 'message': "photo supprimée par l'administrateur"});})
                        .catch(()=>{res.status(500).json({ 'error': "impossible de supprimer la photo" })})})
                        }
                    })
                    .catch(() => res.status(500).json({ 'error': "pas d'utilisateur trouvé" }));
            }
            else{res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
    .catch(() => res.status(500).json({ 'error': "impossible de supprimer la photo"}))
};

exports.deleteUser = (req, res) => { // supprime le compte d'un utilisateur
    const id           = req.params.id;
    const token        = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId       = decodedToken.userId;   
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.User.findOne({where: { id: id }})
                .then((User) => {
                    if(User === null){res.status(500).json({ 'error': "pas d'utilisateur trouvé" })}
                    else{
                        if(User.Ppicture != null){
                        const filename = User.Ppicture.split('/images/')[1];// suppression de la photo de profil
                        fs.unlink(`./images/${filename}`, (err) =>{console.log(err)})}
                        models.Posting.findAll({where: { userId: id }})
                            .then((Postings) => {
                                Postings.forEach((Posting) => {
                                    console.log(Posting.image)
                                    if(Posting.image != null){
                                    const filename = Posting.image.split('/images/')[1]; // suppression de l'image de la publication
                                    fs.unlink(`images/${filename}`, (err) =>{console.log('suppression image '+err)})
                                    }
                                })
                            })
                            .catch(() => res.status(500).json({ 'error': "erreur à la suppression de l'image de la publication" }))

                        models.User.destroy({where: { id : id }})
                            .then(() => res.status(200).json({'message' : "utilisateur supprimé par l'utilisateur"}))
                            .catch((error) => res.status(500).json(error));
                    }
                })
                .catch(() => res.status(500).json({ 'error': "impossible de supprimé l'utilisateur" }));
        }
        else{res.status(500).json({ 'error': "vous n'avez pas les droits pour supprimer ce compte" })}})
    .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
};
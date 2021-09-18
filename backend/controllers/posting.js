const models = require("../models/");
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPosting = (req, res) => {
    const text   = req.body.text;
    const userId = req.body.userId;
    let image
    req.file != undefined ? image  = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : image = null
    models.Posting.create({ userId: userId, text: text, image: image })
    .then(() => res.status(201).json({'message' : "publication créée !"}))
    .catch((error) => res.status(500).json({ 'error': "erreur à la création de la publication" }))
};

exports.getAllPostings = (req, res) => {
    models.Posting.findAll(
        {include: [
            {model: models.User},
            {model: models.Comment, include:[models.Like, models.Report, models.User, {model: models.Comment, include:[models.User, models.Like, models.Report], order:[[models.Comment, 'createdAt', 'DESC']]}]},
            {model: models.Like, include:[models.User]},
            {model: models.Report, include:[models.User]}
        ], order:[[models.Comment, 'createdAt', 'ASC']]}
    )
    .then((Postings) => res.status(200).json(Postings))
    .catch(() => res.status(500).json({ 'error': "erreur à l'obtention des posts" }));
};

exports.getAllPostingsBy = (req, res) => {
    const userId = req.params.id;
    models.Posting.findAll({where: {UserId : userId}})
    .then((Postings) => res.status(200).json(Postings))
    .catch(() => res.status(500).json({ 'error': "Pas encore de publication" }));
};

exports.getOnePostingBy = (req, res) => {
    const userId = req.params.id;
    const idPosting = req.params.idPosting;
    models.Posting.findOne({where: {UserId : userId, id : idPosting}})
    .then((Posting) => {
        Posting === null ? res.status(500).json({ 'error': "pas de publication trouvée" }) : res.status(200).json(Posting)
    })
    .catch(() => res.status(500).json({ 'error': "Pas encore de publication" }));
};

exports.getOnePosting = (req, res) => {
    const id = req.params.id;
    models.Posting.findOne({where: { id: id }})
    .then((Posting) => {
        Posting === null ? res.status(500).json({ 'error': "pas de publication trouvée" }) : res.status(200).json(Posting)
    })
    .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }));
};

exports.modifyPosting = (req, res) => {
    const id = req.params.id;
    const idPosting = req.params.idPosting;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId = decodedToken.userId;
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.Posting.findOne({where: { id: idPosting }})
                .then((Posting) => {
                    if(Posting === null){res.status(500).json({ 'error': "pas de publication trouvée" })}
                    else{
                        if(Posting.image != null){
                            const filename = Posting.image.split('/images/')[1]; // suppression de l'ancienne image
                            fs.unlink(`images/${filename}`, (err) =>{console.log(err)})
                        }
                        req.file === undefined ? Posting.image = null : Posting.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                        Posting.text = req.body.text;
                        Posting.save();
                        res.status(200).json({ 'message': "publication avec image modifiée par l'utilisateur"});
                    }
                })
                .catch(() => res.status(500).json({ 'error': "erreur modification impossible" }));
        }
        else{res.status(500).json({ 'error': "erreur" })}
    })
};

exports.deletePosting = (req, res) => {
    const id           = req.params.id;
    const idPosting    = req.params.idPosting;
    const token        = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId       = decodedToken.userId;
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.Posting.findOne({where: { id: idPosting }})
                .then((Posting) => {
                    if(Posting === null){res.status(500).json({ 'error': "pas de publication trouvée" })}
                    else{
                        if(Posting.image != null){
                            const filename = Posting.image.split('/images/')[1]; // suppression de l'ancienne image
                            fs.unlink(`images/${filename}`, (err) =>{console.log(err)})}
                            models.Posting.destroy({where: { id : idPosting }})
                            .then(() => {res.status(200).json({'message' : "publication supprimée"})})
                            .catch(() => res.status(500).json({ 'error': "erreur à la suppression de la publication" }))
                        }
                    })
                .catch(() => res.status(500).json({ 'error': "erreur à la suppression gjghfjde la publication" }))
            }
        else{res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
    .catch((error) => res.status(500).json({ 'error': error }))
};
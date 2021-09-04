const models = require("../models/");
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createPosting = (req, res) => {
    const text   = req.body.text;
    const userId = req.body.userId;
    console.log(req.file)
    if(req.file != undefined)
    {const image  = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    models.Posting.create({ userId: userId, text: text, image: image })
    .then((newPosting) => res.status(201).json({
        'message'    : "publication créée !",
        'userId'     : newPosting.userId,
        'text'       : newPosting.text,
        'image'      : newPosting.image,
        'créé le'    : newPosting.createdAt}))
    .catch((error) => {  console.log(error) })}    
    else{const image = null;
    models.Posting.create({ userId: userId, text: text, image: image })
        .then((newPosting) => res.status(201).json({
            'message'    : "publication créée !",
            'userId'     : newPosting.userId,
            'text'       : newPosting.text,
            'créé le'    : newPosting.createdAt}))
        .catch((error) => {  console.log(error) })}
};

exports.getAllPostings = (req, res) => {
    models.Posting.findAll({include: models.User,order: [['createdAt', 'DESC']]})
    .then((Postings) => res.status(200).json(Postings))
    .catch(() => res.status(500).json({ 'error': "Pas encore de publication" }));
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
        if(Posting === null){res.status(500).json({ 'error': "pas de publication trouvée" })}
        else{res.status(200).json(Posting)}
    })
    .catch(() => res.status(500).json({ 'error': "Pas encore de publication" }));
};

exports.getOnePosting = (req, res) => {
    const id = req.params.id;
    models.Posting.findOne({
        where: { id: id }
    })
    .then((Posting) => {
        if(Posting === null){res.status(500).json({ 'error': "publication non trouvée" })}
        else{res.status(200).json(Posting)}
        
    })
    .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }));
};

exports.modifyPosting = (req, res) => {
    const id = req.params.id;
    const idPosting = req.params.idPosting;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "privateKey");
    const userId = decodedToken.userId;
    if(userId != id){
        models.User.findOne({
            where: { id : userId }
            })
        .then((User) => {
            if(User.admin === true){
                models.Posting.findOne({
                    where: { UserId : id, id : idPosting }
                    })
                    .then((Posting) => {
                            const newText = req.body.text;
                            const newImage = req.body.image;
            
                            Posting.text = newText;
                            Posting.image = newImage;
                            Posting.save();
                            res.status(200).json({ 'message': "publication modifiée par l'administrateur"});
                        })
                    
                    .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }))
            }
            else{
                res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
        .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
    }
    else{
        models.Posting.findOne({
        where: { UserId : id , id: idPosting }
        })
        .then((Posting) => {
            if(Posting.userId !== userId){
                res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"})
            }
            else{
                const newText = req.body.text;
                const newImage = req.body.image;

                Posting.text = newText;
                Posting.image = newImage;
                Posting.save();
                };
                res.status(200).json({ 'message': "publication modifiée par l'utilisateur"});
            }
        )
        .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }));
    }
};

exports.deletePosting = (req, res) => {
    const id           = req.params.id;
    const idPosting    = req.params.idPosting;
    const token        = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "privateKey");
    const userId       = decodedToken.userId;
    console.log(id, userId)
    if(userId != id){
        models.User.findOne({
            where: { id : userId }
            })
        .then((User) => {
            if(User.admin === true){
                models.Posting.findOne({
                    where: { id : idPosting }
                    })
                    .then((Posting) => {
                        if(Posting === null){res.status(500).json({ 'error': "pas de publication trouvée" })}
                        else{
                            if(Posting.image != null){
                                const filename = Posting.image.split('/images/')[1]; // suppression de l'ancienne image
                                fs.unlink(`images/${filename}`, () =>{
                                models.Posting.destroy({where: { id : idPosting }})
                                .then(() => {res.status(200).json({'message' : "publication supprimée par l'utilisateur"})})
                                .catch(() => res.status(500).json({ 'error': "erreur à la suppression de la publication" }))
                                })}
                                else{
                                    models.Posting.destroy({where: { id : idPosting }})
                                    .then(() => {res.status(200).json({'message' : "publication supprimée par l'utilisateur"})})
                                    .catch(() => res.status(500).json({ 'error': "erreur à la suppression de la publication" }))
                                }}
                    })
                    .catch(() => res.status(500).json({ 'error': "erreur à la suppression de la publication" }))
            }
            else{
                res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
        .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
    }
    else{
        models.Posting.findOne({
            where: { UserId : id, id : idPosting }
            })
            .then((Posting) => {
                if(Posting === null){res.status(500).json({ 'error': "pas de publication trouvée" })}
                else{
                    if(Posting.image != null){
                    const filename = Posting.image.split('/images/')[1]; // suppression de l'ancienne image
                    fs.unlink(`images/${filename}`, () =>{
                    models.Posting.destroy({where: { id : idPosting }})
                    .then(() => {res.status(200).json({'message' : "publication supprimée par l'utilisateur"})})
                    .catch(() => res.status(500).json({ 'error': "erreur à la suppression de la publication" }))
                    })}
                    else{
                        models.Posting.destroy({where: { id : idPosting }})
                        .then(() => {res.status(200).json({'message' : "publication supprimée par l'utilisateur"})})
                        .catch(() => res.status(500).json({ 'error': "erreur à la suppression de la publication" }))
                    }
                }
            })
            .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }))
    }
};
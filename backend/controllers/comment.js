const models = require("../models/");
const jwt = require('jsonwebtoken');


exports.createComment = (req, res) => {
    const text   = req.body.text;
    const userId = req.body.userId;
    const postingId = req.body.postingId
    const commentId = req.body.commentId
    models.Comment.create({ userId: userId, postingId: postingId, commentId: commentId, text: text })
        .then((newComment) => res.status(201).json({
            'message'    : "commentaire créé !",
            'créé le'    : newComment.createdAt}))
        .catch((error) => {  console.log(error) })
};

// exports.getAllPostings = (req, res) => {
//     models.Posting.findAll({include: [{model: models.User},{model: models.Like, include:[models.User]},{model: models.Report, include:[models.User]}] , order: [['createdAt', 'DESC']]})
//     .then((Postings) => res.status(200).json(Postings))
//     .catch(() => res.status(500).json({ 'error': "erreur à l'obtention des posts" }));
// };

// exports.getAllPostingsBy = (req, res) => {
//     const userId = req.params.id;
//     models.Posting.findAll({where: {UserId : userId}})
//     .then((Postings) => res.status(200).json(Postings))
//     .catch(() => res.status(500).json({ 'error': "Pas encore de publication" }));
// };

// exports.getOnePostingBy = (req, res) => {
//     const userId = req.params.id;
//     const idPosting = req.params.idPosting;
//     models.Posting.findOne({where: {UserId : userId, id : idPosting}})
//     .then((Posting) => {
//         if(Posting === null){res.status(500).json({ 'error': "pas de publication trouvée" })}
//         else{res.status(200).json(Posting)}
//     })
//     .catch(() => res.status(500).json({ 'error': "Pas encore de publication" }));
// };

// exports.getOnePosting = (req, res) => {
//     const id = req.params.id;
//     models.Posting.findOne({
//         where: { id: id }
//     })
//     .then((Posting) => {
//         if(Posting === null){res.status(500).json({ 'error': "publication non trouvée" })}
//         else{res.status(200).json(Posting)}
        
//     })
//     .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }));
// };

// exports.modifyPosting = (req, res) => {
//     const id = req.params.id;
//     const idPosting = req.params.idPosting;
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, "privateKey");
//     const userId = decodedToken.userId;
//     if(userId != id){
//         models.User.findOne({where: { id : userId }})
//         .then((User) => {
//             if(User.admin === true){
//                 models.Posting.findOne({
//                     where: { UserId : id, id : idPosting }
//                     })
//                     .then((Posting) => {
//                         if(req.file != undefined){
//                             const newText = req.body.text;
//                             Posting.text = newText;
//                             const newImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//                             Posting.image = newImage;
//                             Posting.save();
//                             res.status(200).json({ 'message': "publication avec image modifiée par l'administrateur"});
//                         }
//                         else if (req.file == undefined && req.body.image == undefined){
//                             const filename = Posting.image.split('/images/')[1];
//                             fs.unlink(`images/${filename}`, (err) => {
//                             if (err) {
//                             console.log("impossible de supprimer l'image:"+err);
//                             }
//                             else {
//                                 console.log("image deleted")
//                                 const newText = req.body.text;
//                                 Posting.image = null
//                                 Posting.text = newText;
//                                 Posting.save();
//                                 res.status(200).json({ 'message': "publication sans image modifiée par l'administrateur"});                                
//                             }})   
//                         }
//                         else if(req.body.image == "noChange"){
//                             console.log("no change")
//                             const newText = req.body.text;
//                             Posting.text = newText;
//                             Posting.save();
//                             res.status(200).json({ 'message': "publication identique modifiée par l'administrateur"});
//                         }
//                         })
                    
//                     .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }))
//             }
//             else{
//                 res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
//         })
//         .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
//     }
//     else{
//         models.Posting.findOne({
//         where: { UserId : id , id: idPosting }
//         })
//         .then((Posting) => {
//             if(Posting.userId != userId){
//                 res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"})
//             }
//             else{
//                 if(req.file != undefined){
//                     const newText = req.body.text;
//                     Posting.text = newText;
//                     const newImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//                     Posting.image = newImage;
//                     Posting.save();
//                     res.status(200).json({ 'message': "publication avec image modifiée par l'utilisateur"});
//                 }
//                 else if (req.file == undefined && req.body.image == undefined){
//                     const filename = Posting.image.split('/images/')[1];
//                     fs.unlink(`images/${filename}`, (err) => {
//                     if (err) {
//                     console.log("impossible de supprimer l'image:"+err);
//                     }
//                     else {
//                         console.log("image deleted")
//                         const newText = req.body.text;
//                         Posting.image = null
//                         Posting.text = newText;
//                         Posting.save();
//                         res.status(200).json({ 'message': "publication sans image modifiée par l'utilisateur"});                                
//                     }})   
//                 }
//                 else if(req.body.image == "noChange"){
//                     console.log("no change")
//                     const newText = req.body.text;
//                     Posting.text = newText;
//                     Posting.save();
//                     res.status(200).json({ 'message': "publication identique modifiée par l'utilisateur"});
//                 }
//             }
//         })
//         .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }));
//     }
// };

exports.deleteComment = (req, res) => {
    const id           = req.params.id;
    const idComment    = req.params.idcomment;
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
                models.Comment.findOne({
                    where: { id : idComment }
                    })
                    .then((Comment) => {
                        if(Comment === null){res.status(500).json({ 'error': "pas de commentaire trouvé" })}
                        else{
                                models.Comment.destroy({where: { id : idComment }})
                                .then(() => {res.status(200).json({'message' : "commentaire supprimé par l'utilisateur"})})
                                .catch(() => res.status(500).json({ 'error': "erreur à la suppression du commentaire" }))
                            }
                    })
                    .catch(() => res.status(500).json({ 'error': "erreur à la suppression du commentaire" }))
            }
            else{
                res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
        .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
    }
    else{
        models.Comment.findOne({
            where: {id : idComment }
            })
            .then((Comment) => {
                if(Comment === null){res.status(500).json({ 'error': "pas de commentaire trouvé" })}
                else{
                    models.Comment.destroy({where: { id : idComment }})
                    .then(() => {res.status(200).json({'message' : "commentaire supprimé par l'utilisateur"})})
                    .catch(() => res.status(500).json({ 'error': "erreur à la suppression du commentaire" }))
                }
                
            })
            .catch(() => res.status(500).json({ 'error': "pas de publication trouvée" }))
    }
};
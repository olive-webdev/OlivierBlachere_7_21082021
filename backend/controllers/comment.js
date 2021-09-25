const models = require("../models/");
const jwt    = require('jsonwebtoken');

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

exports.deleteComment = (req, res) => {
    const id           = req.params.id;
    const idComment    = req.params.idcomment;
    const token        = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    const userId       = decodedToken.userId;
    models.User.findOne({where: {id : userId}})
    .then((User) => {
        let administrator = User.admin ? true : false;
        if(userId == id || administrator === true){
            models.Comment.findOne({where: { id: idComment }})
                .then((Comment) => {
                    if(Comment === null){res.status(500).json({ 'error': "pas de commentaire trouvé" })}
                    else{
                        models.Comment.destroy({where: { id : idComment }})
                        .then(() => {res.status(200).json({'message' : "commentaire supprimé"})})
                        .catch(() => res.status(500).json({ 'error': "erreur à la suppression du commentaire" }))
                    }
                })
                .catch(() => res.status(500).json({ 'error': "erreur à la suppression du commentaire" }))
        }
        else{res.status(500).json({ 'error': "vous devez être administrateur pour effectuer cette opération"});}
        })
    .catch(() => res.status(500).json({ 'error': "vous n'avez pas les droits pour effectuer cette opération"}))
};
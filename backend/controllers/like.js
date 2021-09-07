const models = require("../models/");

exports.likePosting = (req, res) => {
    models.Like.findOne({where:{userId: req.body.userId, postingId: req.params.postingId}})
    .then((Like) => {
        if(Like){
            models.Like.destroy({where:{userId: req.body.userId, postingId: req.params.postingId}})
            .then(() => res.status(201).json({message : "like supprimé"}))
            .catch(() => res.status(500).json({ 'error': "impossible de supprimé le like" }))
        }
        else{
            models.Like.create({userId: req.body.userId, postingId: req.params.postingId,})
            .then((Like) => res.status(201).json({message : "like créé", Like}))
            .catch(() => res.status(500).json({ 'error': "impossible de liké" }));
        }
    })
    .catch(() => res.status(500).json({ 'error': "impossible de liker" }))
}
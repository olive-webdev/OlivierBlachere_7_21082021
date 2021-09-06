const jwt    = require("jsonwebtoken");
const models = require("../models/");

exports.likePosting = (req, res) => {
        models.Like.create({userId: req.body.userId,likeToPostingId: req.params.postingId,})
            .then((Like) => {console.log(Like)})
            .catch(() => res.status(500).json({ 'error': "impossible de liké" }));
    }

exports.getLikeFromPosting = (req, res) => {
    models.Like.findAll()
    .then((Likes) => res.status(200).json(Likes))
    .catch()
}
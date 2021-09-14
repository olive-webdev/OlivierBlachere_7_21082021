const models = require("../models/");

exports.reportPosting = (req, res) => {
    models.Report.findOne({where:{userId: req.body.userId, postingId: req.params.postingId}})
    .then((Report) => {
        if(Report){
            models.Report.destroy({where:{userId: req.body.userId, postingId: req.params.postingId}})
            .then(() => res.status(201).json({message : "signalement supprimé"}))
            .catch(() => res.status(500).json({ 'error': "impossible de supprimé le signalement" }))
        }
        else{
            models.Report.create({userId: req.body.userId, postingId: req.params.postingId,})
            .then((Report) => res.status(201).json({message : "signalement créé", Report}))
            .catch(() => res.status(500).json({ 'error': "impossible de signaler le post" }));
        }
    })
    .catch(() => res.status(500).json({ 'error': "impossible de signaler" }))
}

exports.reportComment = (req, res) => {
    models.Report.findOne({where:{userId: req.body.userId, commentId: req.params.commentId}})
    .then((Report) => {
        if(Report){
            models.Report.destroy({where:{userId: req.body.userId, commentId: req.params.commentId}})
            .then(() => res.status(201).json({message : "signalement supprimé"}))
            .catch(() => res.status(500).json({ 'error': "impossible de supprimé le signalement" }))
        }
        else{
            models.Report.create({userId: req.body.userId, commentId: req.params.commentId,})
            .then((Report) => res.status(201).json({message : "signalement créé", Report}))
            .catch(() => res.status(500).json({ 'error': "impossible de signaler le post" }));
        }
    })
    .catch(() => res.status(500).json({ 'error': "impossible de signaler" }))
}

exports.getAllReports = (req, res) => {
    models.Report.findAll({include: [{model: models.User},{model: models.Posting, include:[models.User]},{model: models.Comment, include:[models.User]}] , order: [['createdAt', 'DESC']]})
    .then((Reports) => {res.status(200).json(Reports)})
    .catch((error) => res.status(500).json({ 'error': error }))
}

exports.deleteReport = (req, res) => {
        if(req.params.postingId != null){
        models.Report.destroy({where:{postingId: req.params.postingId}})
        .then(() => res.status(201).json({message : "signalement du post supprimé"}))
        .catch(() => res.status(500).json({ 'error': "impossible de supprimé le signalement" }))
        }
        else{
        models.Report.destroy({where:{commentId: req.params.commentId}})
        .then(() => res.status(201).json({message : "signalement du commentaire supprimé"}))
        .catch(() => res.status(500).json({ 'error': "impossible de supprimé le signalement" }))
        }
}
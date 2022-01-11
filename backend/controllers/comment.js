const db = require("../models");
/*
exports.saveComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    db.Comment.create({
        UtilisateurId: commentObject.creatorId,
        PublicationId: commentObject.publicationId,
        textContent: commentObject.textContent,
    })
      .then(() => res.status(201).json({ message: 'Commentaire publié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  */

exports.getListOfComments = (req, res, next) => {
db.Comment.findAll({
    order: [
        ['updatedAt', 'DESC'],
    ]
})
.then((comments) => {
    res.status(200).json(comments);
    })
    .catch(
    (error) => {
    res.status(404).json({
        error: error
    });
    }
);
};
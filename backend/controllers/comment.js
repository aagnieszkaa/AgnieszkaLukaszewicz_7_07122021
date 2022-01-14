const db = require("../models");

exports.saveComment = (req, res, next) => {
    db.Comment.create({
        UtilisateurId: req.body.creatorId,
        PublicationId: req.body.publicationId,
        textComment: req.body.textComment,
    })
      .then(() => res.status(201).json({ message: 'Commentaire publié !'}))
      .catch(error => res.status(400).json({ error }));
    
  };

exports.getOneComment = (req, res, next) => {
  db.Comment.findOne({ where: { id: req.params.id } }).then(
    (comment) => {
      res.status(200).json(comment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({ where: { id: req.params.id }})
      .then(comment => {
        db.Comment.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    console.log(req.body);
    db.Comment.findOne({ where: { id: req.params.id } })
      .then(comment => {
        db.Comment.update({ ...req.body }, { where: { id: req.params.id } })
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};


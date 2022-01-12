
const db = require("../models");
const fs = require('fs');

exports.savePublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.publication);
  db.Publication.create({
      UtilisateurId: publicationObject.creatorId,
      title: publicationObject.title, 
      post_image: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`,
      textContent: publicationObject.textContent,
  })
    .then(() => res.status(201).json({ message: 'Publication enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};
  
exports.getListOfMemes = (req, res, next) => {
    db.Publication.findAll({
        order: [
            ['updatedAt', 'DESC'],
        ],
        include: [
          {model: db.Utilisateur},
          {model: db.Comment}
        ]
    })
    .then((publications) => {
        res.status(200).json(publications);
        })
        .catch(
        (error) => {
        res.status(404).json({
            error: error
        });
        }
    );
};

exports.deletePublication = (req, res, next) => {
  db.Publication.findOne({ where: { id: req.params.id }})
    .then(publication => {
      const filename = publication.post_image.split('/images/post/')[1];
      fs.unlink(`images/post/${filename}`, () => {
        db.Publication.destroy({ where: { id: req.params.id }})
          .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyPublication = (req, res, next) => {
  const publicationObject = req.file ?
    {
      ...JSON.parse(req.body.publication),
      post_image: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`,
    } : { ...JSON.parse(req.body.publication) };
  db.Publication.findOne({ where: { id: req.params.id } })
    .then(publication => {
      const filename = publication.post_image.split('/images/post/')[1];
      console.log('siema');
        fs.unlink(`images/post/${filename}`, () => {
          db.Publication.update({ ...publicationObject }, { where: { id: req.params.id } })
          .then(publication => res.status(200).json({ publication }))
          .catch(error => res.status(400).json({ error }))
        });
  })
  .catch(error => res.status(500).json({ error }));
}
/*
exports.modifyPublication = (req, res, next) => {
  const publicationObject = req.file ?
    {
      ...JSON.parse(req.body.publication),
      post_image: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
    } : { ...req.body };
  db.Publication.findOne({ where: { id: req.params.id } })
    .then(publication => {
      const filename = publication.post_image.split('/images/post/')[1];
      console.log('siema');
        fs.unlink(`images/post/${filename}`, () => {
          db.Publication.update({ ...publicationObject }, { where: { id: req.params.id } })
          .then(publication => res.status(200).json({ publication }))
          .catch(error => res.status(400).json({ error }))
        });
  })
  .catch(error => res.status(500).json({ error }));
}
*/
/*
exports.modifyPublication = (req, res, next) => {
  const publicationObject = req.file 
    ? {
        ...JSON.parse(req.body.publication),
        post_image: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
      }
    : { ...req.body }

  db.Publication.findOne({ where: { id: req.params.id } })
  .then(publication => {
    if (!publication) {
      res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
    } else {
      publication.update(publicationObject).then(publication => res.status(200).json({ publication }))
    }
  })
}
*/
/*
exports.getOneMeme = (req, res, next) => {
  db.Publication.findOne({
      where: { UtilisateurId: req.params.id },
      include: [db.Utilisateur]
  })
  .then((publications) => {
      res.status(200).json(publications);
      })
      .catch(
      (error) => {
      res.status(404).json({
          error: error
      });
    }
  );}
  */
/*
exports.getListOfMemes = (req, res, next) => {
    db.Publication.findAll({
        order: [
            ['updatedAt', 'DESC'],
        ],
        where: { creatorId: req.params.id },
        include: [db.Author]
    })
    .then((publications) => {
        res.status(200).json(publications);
        })
        .catch(
        (error) => {
        res.status(404).json({
            error: error
        });
        }
    );

/*
router.get("/:id", (req, res) => {
    db.Post.findAll({
      where: { creatorId: req.params.id },
      include: [db.Author]
    }).then(dbPost => {
      res.json(dbPost);
    });
  });*/
/*
  exports.getUserMemes = (req, res, next) => {
    db.Post.findAll({
      where: { creatorId: req.params.id },
      include: [db.Utilisateur]
    }).then(dbPost => {
      res.json(dbPost);
    });
  };
  */
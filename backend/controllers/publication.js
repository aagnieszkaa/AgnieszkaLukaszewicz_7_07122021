
const db = require("../models");
//const fs = require('fs');

exports.savePublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication);
    db.Publication.create({
        creatorId: publicationObject.creatorId, 
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
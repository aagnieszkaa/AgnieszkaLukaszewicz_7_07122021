
const db = require("../models");
//const fs = require('fs');

exports.savePublication = (req, res, next) => {
    //conversion de la chaîne en objet JSON
    const publicationObject = JSON.parse(req.body.publication);
    console.log(req.body.publication);
    //créer une instance du modèle sauce
    db.Publication.create({
        creatorId: publicationObject.creatorId, //infos recues du frontend
        title: publicationObject.title, 
        post_image: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`,
        textContent: publicationObject.textContent,
    })

      //réponse de réussite avec un code 201 (création de la ressource)
      .then(() => res.status(201).json({ message: 'Publication enregistrée !'}))
      //réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400 (bad request)
      .catch(error => res.status(400).json({ error }));
  };
  
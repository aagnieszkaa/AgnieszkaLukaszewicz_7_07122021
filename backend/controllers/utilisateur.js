const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Utilisateur } = require('../models');
const db = require("../models");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.mot_de_passe, 10)
        .then(hash => {
            db.Utilisateur.create({
                nom: req.body.nom, //infos recues du frontend
                prenom: req.body.prenom, 
                email: req.body.email,
                mot_de_passe: hash,
                image_chemin: req.body.image_chemin,
                fonction: req.body.fonction
            })
            .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  Utilisateur.findOne({ email: req.body.email })
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.mot_de_passe, utilisateur.mot_de_passe)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            utilisateurId: utilisateur.id,
            token: jwt.sign(
              { utilisateurId: utilisateur.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.infos = (req, res, next) => {
  Utilisateur.findOne({
    _id: req.params.id
  }).then(
    (utilisateur) => {
      res.status(200).json(utilisateur);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
/*
exports.deleteUser = (req, res, next) => {
  Utilisateur.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  //si le fichier est renseigne, le premier block, s'il n'est pas la, deuxieme block
  const utilisateurObject = req.file ?
    {
      ...JSON.parse(req.body.utilisateur),
      //ajout d'une image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body };
  Utilisateur.findOne({ _id: req.params.id })
    .then(utilisateur => {
      const filename = utilisateur.imageUrl.split('/images/')[1];
      //supprimer l'image lors de la modification
      fs.unlink(`images/${filename}`, () => {
        //mettre à jour la sauce (remplacer le premier argument par le deuxième)
        Utilisateur.updateOne({ _id: req.params.id }, { ...utilisateurObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });
  })
  .catch(error => res.status(500).json({ error }));
};*/
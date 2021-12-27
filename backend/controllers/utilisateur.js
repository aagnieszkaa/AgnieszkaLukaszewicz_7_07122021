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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.mot_de_passe, 10)
        .then(hash => {
            db.Utilisateur.create({
                nom: req.body.nom,
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


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const fs = require('fs');
const dbConfig = require("../config/db.config.js");

exports.signup = (req, res, next) => {
    const utilisateurObject = JSON.parse(req.body.utilisateur)
    db.Utilisateur.findOne({ where: { email: utilisateurObject.email }})
    .then(utilisateur => {
      if(!utilisateur){
        if(utilisateurObject.fonction == 1 && utilisateurObject.mot_de_passe_RH != dbConfig.mot_de_passe_RH) {
          fs.unlink(`images/profil/${req.file.filename}`, () => {});
          return res.status(400).json({ error: 'Mot de passe RH incorrect !' });
        }
        bcrypt.hash(utilisateurObject.mot_de_passe, 10)
        .then(hash => {
            db.Utilisateur.create({
                nom: utilisateurObject.nom, //infos recues du frontend
                prenom: utilisateurObject.prenom, 
                email: utilisateurObject.email,
                mot_de_passe: hash,
                image_chemin: `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}`,
                fonction: utilisateurObject.fonction,
            })
            .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
            .catch(error => res.status(400).json({ error }))
        })
      } else {
        fs.unlink(`images/profil/${req.file.filename}`, () => {});
        return res.status(400).json({ error: 'Email déjà utilisé !' });
      }
    })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log(req.body);
  db.Utilisateur.findOne({ where: { email: req.body.email } })
    .then(utilisateur => {
      console.log(utilisateur);
      if (!utilisateur) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      if (utilisateur.enabled == 0){
        return res.status(403).json({ error: 'Votre compte est desactivé !' });
      }else{
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
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.infos = (req, res, next) => {
  db.Utilisateur.findOne({ where: { id: req.params.id } }).then(
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

  exports.deleteUser = (req, res, next) => {
    db.Utilisateur.update(
       {
        enabled: 0
       },
       {
          where: {
             id: req.params.id,
          },
       }
    )
       .then((utilisateur) =>
          res.status(201).json({ message: "Compte supprimé" })
       )
       .catch((error) => res.status(500).json(error));
 };


/*
 exports.modifyUser = (req, res, next) => {
  const utilisateurObject = req.file ?
    {
      ...JSON.parse(req.body.utilisateur),

      image_chemin: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body };
  db.Utilisateur.findOne({ where: { id: req.params.id } })
    .then(utilisateur => {
      const filename = utilisateur.image_chemin.split('/images/')[1];

      fs.unlink(`images/${filename}`, () => {

        db.Utilisateur.update({ ...utilisateurObject }, { where: { id: req.params.id } })
        .then(utilisateur => res.status(200).json({ utilisateur }))
      });
  })
  .catch(error => res.status(500).json({ error }));
};*/

/*
exports.modifyUser = (req, res, next) => {
  const utilisateurObject = JSON.parse(req.file);
  db.Utilisateur.findOne({ where: { id: req.params.id }})
      bcrypt.hash(utilisateurObject.mot_de_passe, 10)
      .then(hash => {
        fs.unlink(`images/${req.file.filename}`, () => {
          db.Utilisateur.update({
            ...utilisateurObject,
              mot_de_passe: hash,
              image_chemin: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          })
          .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
          .catch(error => res.status(400).json({ error }))
        });   
      })
      .catch(error => res.status(500).json({ error }));
};
*/

exports.modifyUser = (req, res, next) => {
  const utilisateurObject = req.file ?
    {
      ...JSON.parse(req.body.utilisateur),
      image_chemin: `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}`,
    } : { ...JSON.parse(req.body.utilisateur) };
    console.log(utilisateurObject);

  db.Utilisateur.findOne({ where: { id: req.params.id } })
    .then(utilisateur => {
      const filename = utilisateur.image_chemin.split('/images/profil/')[1];
      if(req.file) {
        fs.unlink(`images/profil/${filename}`, () => {
        });
      }    
      db.Utilisateur.update({ ...utilisateurObject }, { where: { id: req.params.id } })
      .then(utilisateur => res.status(200).json({ utilisateur }))
      .catch(error => res.status(400).json({ error }))
  })
  .catch(error => res.status(500).json({ error }));
}
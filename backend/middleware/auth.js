const jwt = require('jsonwebtoken');
const db = require("../models");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const utilisateurId = decodedToken.utilisateurId;
    db.Utilisateur.findOne({ where: { id: utilisateurId } })
        .then(utilisateur => {
            if(!utilisateur) {
                throw 'User ID non valable !';
            } else {
                next();
            }
        })
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};
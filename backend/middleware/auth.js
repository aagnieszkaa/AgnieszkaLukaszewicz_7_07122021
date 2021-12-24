const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const utilisateurId = decodedToken.utilisateurId;
    if (req.body.utilisateurId && req.body.utilisateurId !== utilisateurId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};
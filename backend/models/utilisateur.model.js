module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mot_de_passe: {
        type: Sequelize.STRING
      },
      image_chemin: {
        type: Sequelize.STRING
      },
      fonction: {
        type: Sequelize.STRING
      }
    });
  
    return Utilisateur;
};

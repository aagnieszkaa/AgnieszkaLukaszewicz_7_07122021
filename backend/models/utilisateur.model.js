module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateurs", {
      nom: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      mot_de_passe: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      image_chemin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fonction: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: 'utilisateur',
      freezeTableName: true
    });
    return Utilisateur;
};
module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define('Utilisateur', {
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
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
      {
        tableName: 'utilisateur'
      }
    );
    Utilisateur.associate = models => {
      Utilisateur.hasMany(models.Publication, {
        onDelete: "cascade"
      });
    };
    return Utilisateur;
};
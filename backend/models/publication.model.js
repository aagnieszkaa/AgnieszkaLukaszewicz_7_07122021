module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("Publication", {
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      post_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      textContent: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    },
      {
        tableName: 'publication'
      }
    );
    Publication.associate = models => {
      Publication.belongsTo(models.Utilisateur, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    Publication.associate = models => {
      Publication.hasMany(models.Comment, {
        onDelete: "cascade"
      });
    };
    return Publication;
};

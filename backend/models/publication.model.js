module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("Publication", {
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      post_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      textContent: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
      {
        tableName: 'publication'
      }
    );
    Publication.associate = models =>
    {
    
          Publication.belongsTo(models.Utilisateur,
    {
    
            foreignKey: {
    
              allowNull: false
    
            }
    
          });
    
          Publication.hasMany(models.Comment,
    {
    
            onDelete: "cascade"
    
          });
    
        };
    return Publication;
};

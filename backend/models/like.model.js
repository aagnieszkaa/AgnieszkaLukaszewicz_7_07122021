module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define(
        "Like", 
        {},
        {
            tableName: 'likes'
        }
    );
    Like.associate = models => {
      Like.belongsTo(models.Utilisateur, {
        foreignKey: {
          allowNull: false
        }});
      Like.belongsTo(models.Publication, {
        foreignKey: {
          allowNull: false
        },
        constraints: false
      });
    };
    return Like;
};

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
      textContent: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
      {
        tableName: 'comment'
      }
    );
    Comment.associate = models => {
        Comment.belongsTo(models.Utilisateur, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    Comment.associate = models => {
        Comment.belongsTo(models.Publication, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Comment;
};

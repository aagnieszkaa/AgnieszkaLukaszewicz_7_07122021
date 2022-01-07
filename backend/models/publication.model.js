module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publication", {
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
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
        freezeTableName: true
      }
    );
    return Publication;
};
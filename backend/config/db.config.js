module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "jupijup2",
    DB: "groupomania",
    dialect: "mysql",
    // configuration connexion sequelize - essayer de se connecter avant de lancer une erreur
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

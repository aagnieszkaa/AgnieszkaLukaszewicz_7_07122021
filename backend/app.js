const express = require('express');
const cors = require("cors");
//const path = require('path');


const utilisateurRoutes = require('./routes/utilisateur');
//const sauceRoutes = require('./routes/sauce');*/
const app = express();

// CORS
var corsOptions = {
  	    origin: "*"
	};
  app.use(cors(corsOptions));
	
// parse requests of content-type - application/json
	app.use(express.json());
	
	// parse requests of content-type - application/x-www-form-urlencoded
	app.use(express.urlencoded({ extended: true }));
	
	// USE ROUTES
    app.use('/api/auth', utilisateurRoutes);
    //app.use('/api/sauces', sauceRoutes);
	// simple route de test
	app.get("/", (req, res) => {
	    res.json({ message: "Welcome to my application." });
});


//app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
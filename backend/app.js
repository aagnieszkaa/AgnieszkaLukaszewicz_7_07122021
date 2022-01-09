const express = require('express');
const cors = require("cors");
const path = require('path');


const utilisateurRoutes = require('./routes/utilisateur');
const publicationRoutes = require('./routes/publication');

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
    app.use('/api/publications', publicationRoutes);



app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
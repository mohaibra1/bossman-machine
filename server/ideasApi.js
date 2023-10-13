const express = require('express');
const ideasRouter = express.Router();
const morgan = require('morgan')

//import database functions
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('./db.js')


// Logging Middleware
ideasRouter.use(morgan('dev'));

//body-parser
ideasRouter.use(bodyParser.json())  

//GET /api/ideas to get an array of all ideas.

//POST /api/ideas to create a new idea and save it to the database.
//GET /api/ideas/:ideaId to get a single idea by id.
//PUT /api/ideas/:ideaId to update a single idea by id.
//DELETE /api/ideas/:ideaId to delete a single idea by id.




module.exports = ideasRouter;

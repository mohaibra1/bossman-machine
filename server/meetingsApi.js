const express = require('express');
const apiRouter = express.Router();

//import database functions
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('./db.js')


module.exports = apiRouter;

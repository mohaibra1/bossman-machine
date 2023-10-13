const express = require('express');
const minionsRouter = express.Router();
const morgan = require('morgan')
const cors = require('cors')

minionsRouter.use(cors({
    origin: '*'
}))

//import database functions
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, } = require('./db.js');
const bodyParser = require('body-parser');

//body-parser
minionsRouter.use(bodyParser.json())  

// Logging Middleware
minionsRouter.use(morgan('dev'));  

//GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
})

//POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    if(newMinion){
        res.send(newMinion);
    }else {
        res.status(404).send('Nothing to add')
    }
})

//GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(getFromDatabaseById('minions', req.params.minionId))
})

//PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    res.send(createMeeting('minions'))
})

//DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if(isDeleted){
        res.status(204).send('Minion Deleted Successful.')
    }else{
        res.status(404).send('Nothing to delete')
    }
})


module.exports = minionsRouter;

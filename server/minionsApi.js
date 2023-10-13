const express = require('express');
const minionsRouter = express.Router();
const morgan = require('morgan')
const cors = require('cors')
const workRouter = require('./workApi') 

minionsRouter.use(cors({
    origin: '*'
}))

//import database functions
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
     } = require('./db.js');
const bodyParser = require('body-parser');

//body-parser
minionsRouter.use(bodyParser.json())  

// Logging Middleware
minionsRouter.use(morgan('dev'));  

//nest work router api
//work router
minionsRouter.use('/:minionId/work', workRouter)

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
    res.send(updateInstanceInDatabase('minions', req.body))
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

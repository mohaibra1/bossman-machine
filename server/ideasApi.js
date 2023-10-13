const express = require('express');
const ideasRouter = express.Router();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

ideasRouter.use(cors({
    origin: '*'
}))

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
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})
//POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    if(newIdea){
        res.send(newIdea)
    }else{
        res.status(404)
    }
})
//GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(getFromDatabaseById('minions', req.params.ideaId))
})
//PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    res.send(updateInstanceInDatabase('ideas', req.body))
})
//DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('ideas', req.params.ideaId)
    if(isDeleted){
        res.status(204).send()
    }
})




module.exports = ideasRouter;

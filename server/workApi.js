const express = require('express')
const workRouter = express.Router()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

//database functions
const {
    getAllFromDatabase,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db')

//configure cors, allow all servers 
workRouter.use(cors({
    origin: '*'
}))


//configure morgan
workRouter.use(morgan('dev'))

//configure bodyparse for body requests
workRouter.use(bodyParser.json())


//GET /api/minions/:minionId/work to get an array of all work for the specified minion.
workRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('work'))
})
//POST /api/minions/:minionId/work to create a new work object and save it to the database.
workRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', req.body)
    if(newWork){
        res.send(newWork)
    }
})
//PUT /api/minions/:minionId/work/:workId to update a single work by id.
workRouter.put('/:workId', (req, res, next) => {
    const updateWork = updateInstanceInDatabase('work', req.body)
    res.send(updateWork)
})
//DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workRouter.delete('/:workId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('work', req.id)
    res.send('Deleted')
})

module.exports = workRouter


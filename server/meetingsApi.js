const express = require('express');
const meetingsRouter = express.Router();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

meetingsRouter.use(cors({
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


//body-parser
meetingsRouter.use(bodyParser.json())

//logging middleware
meetingsRouter.use(morgan('dev'))


//GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req,res,next) => {
    res.send(getAllFromDatabase('meetings'))
})
//POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req,res,next) => {
    const newMeeting = createMeeting()
    if(newMeeting){
        res.send(newMeeting)
    }
})
//DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req,res,next) => {
    res.send(deleteFromDatabasebyId('meetings'))
})


module.exports = meetingsRouter;

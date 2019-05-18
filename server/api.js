const express = require('express');
const apiRouter = express.Router();

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db.js');
const minionType = 'minions';

apiRouter.get('/minions', (req, res, next) => {
    res.send(getAllFromDatabase(minionType));
    next();
});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = req.body;
    const minionAddedToDatabase = addToDatabase(minionType, newMinion);
    if (minionAddedToDatabase) {
        res.status(201).send(minionAddedToDatabase);
    }
});


module.exports = apiRouter;

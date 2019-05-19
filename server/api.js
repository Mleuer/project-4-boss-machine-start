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

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minionID = req.params.minionId;
    const minion = getFromDatabaseById(minionType, minionID);
    if (minion) {
        res.send(minion)
    }else {
        res.status(404).send();
    }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updatedMinion = req.body;
    const minionUpdatedInDatabase = updateInstanceInDatabase(minionType, updatedMinion);
    if (minionUpdatedInDatabase) {
        res.send(minionUpdatedInDatabase);
    }else {
        res.status(404).send();
    }

});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = req.body;
    const minionAddedToDatabase = addToDatabase(minionType, newMinion);
    if (minionAddedToDatabase) {
        res.status(201).send(minionAddedToDatabase);
    }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionID = req.params.minionId;
    const successfullyDeletedMinion = deleteFromDatabasebyId(minionType, minionID);
    if (!successfullyDeletedMinion) {
        res.status(404).send();
    }
});


module.exports = apiRouter;

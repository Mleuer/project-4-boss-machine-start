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
const ideaType = 'ideas';

function getObjectFromDatabaseWithID(req, res, objectID, objectType) {
    const object = getFromDatabaseById(objectType, objectID);
    if (object) {
        res.send(object)
    } else {
        res.status(404).send();
    }
}

function updateObjectInDatabaseWithID(req, res, objectType) {
    const object = req.body;
    const objectUpdatedInDatabase = updateInstanceInDatabase(objectType, object);
    if (objectUpdatedInDatabase) {
        res.send(objectUpdatedInDatabase);
    } else {
        res.status(404).send();
    }
}

function addObjectToDatabase(req, res, objectType) {
    const object = req.body;
    const objectAddedToDatabase = addToDatabase(objectType, object);
    if (objectAddedToDatabase) {
        res.status(201).send(objectAddedToDatabase);
    }
}

function deleteObjectFromDatabaseWithID(req, res, objectID, objectType) {
    const successfullyDeletedObject = deleteFromDatabasebyId(objectType, objectID);
    if (!successfullyDeletedObject) {
        res.status(404).send();
    } else {
        res.status(204).send();
    }
}

apiRouter.get('/minions', (req, res, next) => {
    res.send(getAllFromDatabase(minionType));
    next();
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
    getObjectFromDatabaseWithID(req, res, req.params.minionId, minionType);
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
    updateObjectInDatabaseWithID(req, res, minionType);
});

apiRouter.post('/minions', (req, res, next) => {
    addObjectToDatabase(req, res, minionType);
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    deleteObjectFromDatabaseWithID(req, res, req.params.minionId, minionType);
});

apiRouter.get('/ideas', (req, res, next) => {
    res.send(getAllFromDatabase(ideaType));
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    getObjectFromDatabaseWithID(req, res, req.params.ideaId, ideaType);
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    updateObjectInDatabaseWithID(req, res, ideaType);
});

apiRouter.post('/ideas', (req, res, next) => {
    addObjectToDatabase(req, res, ideaType);
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    deleteObjectFromDatabaseWithID(req, res, req.params.ideaId, ideaType);
});

module.exports = apiRouter;

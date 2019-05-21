const express = require('express');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
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
const meetingType = 'meetings';

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

apiRouter.get('/meetings', (req, res, next) => {
    res.send(getAllFromDatabase(meetingType));
});

apiRouter.post('/meetings', (req, res, next) => {
    const meeting = createMeeting();
    const objectAddedToDatabase = addToDatabase(meetingType, meeting);
    if (objectAddedToDatabase) {
        res.status(201).send(objectAddedToDatabase);
    }
});

apiRouter.delete('/meetings', (req, res, next) => {
    const successfullyDeletedMeetings = deleteAllFromDatabase(meetingType);

    if (successfullyDeletedMeetings.length !== 0) {
        res.status(404).send();
    } else {
        res.status(204).send();
    }
});

module.exports = apiRouter;

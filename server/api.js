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

// apiRouter.post('/minions', (req, res, next) => {
//     const newMinion = req.params.minion;
//     const successfulAddToDatabase = addToDatabase(minionType, newMinion);
//     if (successfulAddToDatabase) {
//         res.status(201).send();
//     }
// });


module.exports = apiRouter;

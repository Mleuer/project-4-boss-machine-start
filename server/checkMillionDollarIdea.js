const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body;
    const weeks = parseInt(idea.numWeeks);
    const weeklyRevenue = parseInt(idea.weeklyRevenue);

    if (!idea.numWeeks || !idea.weeklyRevenue || isNaN(weeks) || isNaN(weeklyRevenue)) {
        res.status(400).send();
        return;
    }
    const ideaWorth = weeks * weeklyRevenue;
    if (ideaWorth <= 1000000) {
        res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

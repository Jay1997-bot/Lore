const HistoricalFigure = require('../models/historicalFigure.models');

// Fetch all historical figures
module.exports.findAllFigures = (req, res) => {
    HistoricalFigure.find()
        .then(allFigures => res.json({ figures: allFigures }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Fetch a batch of 20 figures sorted by DOB based on page scroll 
module.exports.findPaginatedFigures = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const figures = await HistoricalFigure.find()
            .sort({ 'lifeSpan.birthEra': 1, 'lifeSpan.birthYear': 1 })
            .skip(skip)
            .limit(limit);

        const total = await HistoricalFigure.countDocuments();

        res.json({
            figures,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err });
    }
};


// Fetch a single historical figure by ID
module.exports.findOneSingleFigure = (req, res) => {
    HistoricalFigure.findOne({ _id: req.params.id })
        .then(oneSingleFigure => res.json({ figure: oneSingleFigure }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

// Create a new historical figure
module.exports.createNewFigure = (req, res) => {
    HistoricalFigure.create(req.body)
        .then(newlyCreatedFigure => res.json({ figure: newlyCreatedFigure }))
        .catch(err => res.status(400).json(err)); // Return validation errors with 400 status
};

// Delete a historical figure by ID
module.exports.deleteAnExistingFigure = (req, res) => {
    HistoricalFigure.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
};

const HistoricalFigureController = require('../controllers/historicalFigure.controllers');

module.exports = app => {
    app.get('/api/historical-figures', HistoricalFigureController.findAllFigures);
    app.get('/api/historical-figures/paginate', HistoricalFigureController.findPaginatedFigures);
    app.get('/api/historical-figures/:id', HistoricalFigureController.findOneSingleFigure);
    app.post('/api/historical-figures', HistoricalFigureController.createNewFigure);
    app.delete('/api/historical-figures/:id', HistoricalFigureController.deleteAnExistingFigure);
};


